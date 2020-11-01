import React from 'react';
import { getToken, isUserSet } from '../auth';
import { API } from '../utils/axios';
import { 
  Select, 
  InputLabel, 
  MenuItem, 
  Container, 
  Grid,
  Card,
  CardContent, 
  CardActions,
  Button,
  FormControl, 
  TextField,
  CircularProgress,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const favours = ['coffee', 'chips', 'chocolate', 'tea', 'cupcake'];

const styles = (theme) => ({
  container: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  card: {
    marginTop: theme.spacing(10),
    width: '100%',
    marginBottom: theme.spacing(10),
  },
  cardButtons: {
    justifyContent: 'center',
  },
  radioGroup: {
    display: 'inline-block'
  },
  select: {
    minWidth: '350px',
    textAlign: 'left',
  },
  textfield: {
    minWidth: '350px',
    textAlign: 'left',
  },
  button: {
    fontWeight: 500,
    minWidth: '90px',
  },
  buttonProgress: {
    color: 'white',
  },
});

class CreateFavour extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          userInputs: {
            owing: 'true',
            userId: '',
            favour: '',
            amount: null,
            fileSelected: true,
          },
          users: [],
          spinner: false,
          dialog: false,
      }; 
    }
    componentDidMount(){
      this.getUsers();
    }

    getUsers = async () => {
      if (!isUserSet()) {
        this.props.history.push('/');
        return;
      }
      try {
        const request = await API.get('/users', { headers: {Authorization: getToken()} });
        this.setState({users: request.data});
      } catch (error) {      
        this.props.history.push('/');
        alert('server error, unable to create favour at the moment');    
      }      
    }

    radioButtonChange = (event) => {
      const userInputs = {...this.state.userInputs};
      userInputs.owing = event.target.value;
      if (userInputs.owing === 'true') {
        userInputs.fileSelected = true;
      } else {
        userInputs.fileSelected = false;
      }
      this.setState({userInputs});
    }

    userChange = (event) => {
      const userInputs = {...this.state.userInputs};
      userInputs.userId = event.target.value;
      this.setState({userInputs});
    }

    favorChange = (event) => {
      const userInputs = {...this.state.userInputs};
      userInputs.favour = event.target.value;
      this.setState({userInputs});
    }

    amountChange = (event) => {
      const userInputs = {...this.state.userInputs};
      userInputs.amount = event.target.value;
      this.setState({userInputs});
    }

    fileUpload = (event) => {
      const userInputs = {...this.state.userInputs};
      userInputs.fileSelected = true;
      this.setState({userInputs});
    }

    handleCloseDialog = () => {
      this.setState({ dialog: false });
      this.props.history.push('/');
    }

    handleGoBack = () => {
      this.props.history.push('/');
    }

    handleSubmit = async (event) => {
      const formdata = new FormData();
      this.setState({spinner: true});
      try {   
        const owing = JSON.parse(this.state.userInputs.owing);
        if (!owing) {
          const file = document.querySelector('input[type=file]').files[0];
          formdata.append('file', file);
        }        
        formdata.append('otherParty', this.state.userInputs.userId);
        formdata.append('noOfItems', this.state.userInputs.amount);
        formdata.append('owing', owing);
        formdata.append('favourItem', this.state.userInputs.favour);
        await API.post('/favour', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: getToken(),
          },
        });
        this.setState({
          userInputs: {
            owing: 'true',
            userId: '',
            favour: '',
            amount: 0,
            fileSelected: true,
          },
        });
        this.setState({spinner: false});
        this.setState({dialog: true});
      } catch (error) {
        console.error(error);
        this.setState({spinner: false});
        alert('unable to create favour');
      }
    }

    render() {
      const { classes } = this.props;
      return (
        <Container className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              <Grid className={classes.grid} container spacing={2} >
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Do you owe the favour</FormLabel>
                    <RadioGroup 
                      className={classes.radioGroup} 
                      row 
                      aria-label="owing" 
                      name="owing1" 
                      value={this.state.userInputs.owing} 
                      onChange={this.radioButtonChange}>
                      <FormControlLabel value="true" control={<Radio/>} label="Yes" />
                      <FormControlLabel value="false" control={<Radio/>} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel id="user-label">User</InputLabel>
                    <Select 
                      className={classes.select}
                      labelId="user-label" 
                      id="user-select"
                      value={this.state.userInputs.userId}
                      onChange={this.userChange}>
                      {this.state.users.map((user) => 
                        <MenuItem key={user.id} value={user.id}>{user.name} | {user.email}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel id="favour-label">Favour</InputLabel>
                    <Select 
                      className={classes.select}
                      labelId="favour-label" 
                      id="favour-select"
                      value={this.state.userInputs.favour}
                      onChange={this.favorChange}>
                      {favours.map((favour,index) => 
                        <MenuItem key={index} value={favour}>{favour}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                  <TextField
                      className={classes.textfield}
                      value={this.state.userInputs.amount}
                      onChange={this.amountChange}
                      type="number"
                      InputProps={{ inputProps: { min: 1, } }}
                      required
                      fullWidth
                      id="amount"
                      label="Number of favour items"
                      name="amount"
                    />
                  </FormControl>
                </Grid>
                {this.state.userInputs.owing === 'false' ?
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    >
                      Upload Proof
                    <input
                      accept="image/*"
                      onChange={this.fileUpload}
                      type="file"
                      style={{ display: "none" }}
                    />
                  </Button>
                  {this.state.userInputs.fileSelected ? <InputLabel id="favour-label">file uploaded</InputLabel> : null}
                </Grid> : null
                }  
                <Grid item xs={12}>
                  <CardActions className={classes.cardButtons}>
                    <Button 
                      variant="contained" 
                      className={classes.button} 
                      onClick={this.handleSubmit} 
                      disabled={!this.state.userInputs.userId.length ||
                                !this.state.userInputs.favour.length ||
                                !this.state.userInputs.fileSelected ||
                                this.state.userInputs.amount <= 0}>
                      {this.state.spinner ? <CircularProgress size={24} className={classes.buttonProgress} /> : 'Submit'}
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
              <Dialog open={this.state.dialog} onClose={this.handleCloseDialog}>
                <DialogContent>
                  <DialogContentText>
                    Favour created
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          <Button variant="contained" onClick={this.handleGoBack}>Go Back</Button>
        </Container>
      );      
    }
}

export default withStyles(styles, { withTheme: true })(CreateFavour)