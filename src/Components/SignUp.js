import React from 'react';
import { Card, Grid, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    topMargin: theme.spacing(1),
    width: '100%',
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    marginTop: theme.spacing(10),
    width: '500px',
    marginBottom: '100px',
    flexDirection: 'column',
    alignText: 'center',
  },
  grid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    alignItems: 'center',
    width: '400px',
  },
  textfiled: {
    width: "100%",
  },
});

class SignUp extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Card className={classes.card} raised>
          <form>
            <Grid className={classes.grid} container spacing={2} alignItems="center" direction="column">
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textfiled}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
            </Grid>
            </Grid>
          </form>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SignUp)