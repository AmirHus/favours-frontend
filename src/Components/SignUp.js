import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Container,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { API } from '../utils/axios';
import { Link } from 'react-router-dom';
import imgURL  from '../img/homepage.jpg'

const styles = (theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  card: {
    marginTop: theme.spacing(10),
    width: '40%',
    marginBottom: theme.spacing(10),
  },
  cardContent: {
    textAlign: 'center',
  },
  cardButtons: {
    justifyContent: 'center',
  },
  form: {
    textAlign: '-webkit-center',
  },
  grid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    alignContent: 'center',
    width: '100%',
  },
  buttonProgress: {
    color: 'white',
  },
  button: {
    fontWeight: 500,
    minWidth: '90px',
  },
  textfield: {
    textAlign: 'left',
  },
});
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
      },
      spinner: false,
      dialog: false,
      dialogMessage: '',
    };
  }

  handleName = (event) => {
    const user = { ...this.state.user }
    user.name = event.target.value;
    this.setState({ user })
  }

  handleEmail = (event) => {
    const user = { ...this.state.user }
    user.email = event.target.value;
    this.setState({ user })
  }

  handlePassword = (event) => {
    const user = { ...this.state.user }
    user.password = event.target.value;
    this.setState({ user })
  }

  handleCloseDialog = () => {
    this.setState({ dialog: false });
  }

  handleSubmit = async () => {
    this.setState({ spinner: true });
    try {
      await API.post('/user', this.state.user);
      const clearedUserState = { name: '', email: '', password: '' };
      this.setState({ user: clearedUserState });
      this.setState({ spinner: false });
      this.setState({ dialogMessage: 'User successfully created' });
      this.setState({ dialog: true });
      setTimeout(() => {
        this.props.history.push('/login');
          localStorage.setItem("isLogin",true);
          // this.props.history.push('/newIndex');
      }, 2000);
    } catch (error) {
      let message;
      if (error.response.status === 400) message = `Error: ${error.response.data}`;
      else message = 'Error: could not process request';
      this.setState({ dialogMessage: message });
      this.setState({ dialog: true });
      this.setState({ spinner: false });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div display='flex' flex='1' height='100%' backgroundImg={imgURL}>
        <div>sdfhsdhflhs</div>
        <Container className={classes.container}>
          <Card className={classes.card} raised>
            <CardContent className={classes.cardContent}>
            <img
                  src='https://i.pinimg.com/originals/4e/e5/77/4ee57739e8b92831035172e78ba8e45b.jpg'
                  alt='logo'
                  width='30%'
                  height='30%'/>  
            </CardContent>
            <CardContent>
              <form className={classes.form}>
                <Grid className={classes.grid} container spacing={2} >
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textfield}
                      value={this.state.user.name}
                      onChange={this.handleName}
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textfield}
                      value={this.state.user.email}
                      onChange={this.handleEmail}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.textfield}
                      value={this.state.user.password}
                      onChange={this.handlePassword}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                  </Grid>
                </Grid>
              </form>
            </CardContent>
            <CardActions className={classes.cardButtons}>
              <Button variant="contained" className={classes.button} onClick={this.handleSubmit} >
                {this.state.spinner ? <CircularProgress size={24} className={classes.buttonProgress} /> : 'Submit'}
              </Button>
            </CardActions>
          </Card>
          <li> <Link to="/login">Already have an account? Click here to login.</Link></li>
          <Dialog open={this.state.dialog} onClose={this.handleCloseDialog}>
            <DialogContent>
              <DialogContentText>
                {this.state.dialogMessage}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Container>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(SignUp)



