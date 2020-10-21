import React from 'react';
import { Link } from "react-router-dom";
import { logout } from '../../auth';
import img from '../../img/homepage.jpg'
import { withStyles } from '@material-ui/core/styles';
import { Divider } from 'antd';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import {
    Input,
    Grid,
    Container,
    Button,
    Checkbox,
} from '@material-ui/core';

const styles = ((theme) => ({
    root: {
        flexGrow: 1,
        padding: '35px 100px 50px 50px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    sideTop: {
        backgroundColor: '#d4e7fe',
        borderRadius: '20px',
        padding: '10px',
        height: '100%',
        boxSizing: 'border-Box'
    },
    name: {
        textAlign:'center',
        borderBottom: '2px solid #c6dffb',
        height: '50px'
    },
    btnAll: {
        // backgroundColor: '#d4e7fe',
        borderRadius: '20px'
    },
    btnFlex: {
        display: 'flex',
        justifyContent:  'space-between'
    },
    btn: {
        width: '150px'
    },
    left: {
        width: '130px',
        textAlign: 'center'
    },
    content: {
        flex: '1'
    },
    right: {
        width: '50px',
        color: '#bcbfc2',
        fontSize: '12px'
    },
    contentHeight: {
        height: '160px'
    },
    contentBtn: {

    },
    card: {
        display: 'flex',
        justifyContent:  'space-between',
        backgroundColor: '#d4e7fe',
        height: '80px',
        borderRadius: '15px',
        position: 'relative',
        alignItems: 'center',
        padding: '16px'
    },
    float: {
        width: '2px',
        height: '40px',
        background: '#02bcc9',
        position: 'absolute',
        left: '1px',
        top: '20px'
    },
    pic: {
        width: '176px',
        height: '43px'
    },
    overflow: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
         lineClamp: '2',
        WebkitBoxOrient: "vertical",
        fontSize: '12px'
    },
    rightCard: {
        height: '130px',
        backgroundColor: '#bfeef1',
        borderRadius: '20px'
    },
    rightContainer: {
        borderRadius: '20px',
        height: '90vh',
        backgroundColor: '#f6feff'
    },
    neiCard: {
        height: '80%',
        backgroundColor: '#e1fcff',
        borderRadius: '20px',
        padding: '10px',
        boxSizing: 'border-Box'
    },
    search: {
        border: '1px solid #eee',
        background: '#d4e7fe',
        borderRadius: '15px', padding: '0 15px'
    },
    signOut: {
        backgroundColor: '#d4e7fe',
        width: '100%',
        fontSize: '12px',
        color: '#4592e9',
        height: '40px',
        borderRadius: '20px'
    }
}));

 class Index extends React.Component {
     constructor(props) {
         super(props);
     }
  render() {
      const { classes } = this.props;
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Container style={{ fontSize: '14px',height: 'calc(100% - 60px)'}}>
                        <div className={classes.sideTop}>
                            <Grid item xs={12} className={classes.name}>
                                Favours
                            </Grid>
                            <Grid item xs={12} style={{textAlign:'center', height: 'calc(100% - 50px)'}}>
                                <div className={classes.contentHeight}>Yuri</div>
                                <div className={classes.contentHeight}>
                                    <Button className={`${classes.contentBtn}  ${classes.btnAll}`} variant="contained" color="secondary">
                                        Create public request
                                    </Button>
                                </div>
                                <div>
                                    <Button className={`${classes.contentBtn}  ${classes.btnAll}`}   variant="contained" color="secondary">
                                        Create I owe/other
                                    </Button>

                                </div>
                            </Grid>
                        </div>
                    </Container>
                    <Container style={{height: '50px'}}>
                        <Button className={classes.signOut} variant="contained" color="secondary">
                            Sign out
                        </Button>
                    </Container>
                </Grid>

                <Grid item xs={5}>
                    <div>
                        <Input variant="outlined" autoFocus fullWidth={true} placeholder={'Search'} className={classes.search}></Input>
                    </div>
                    <div className={classes.btnFlex} style={{margin: '20px 0'}}>
                            <Button
                                className={`${classes.btnAll}  ${classes.btn}`}
                                variant="contained"
                            >All</Button>
                            <Button
                                className={`${classes.btnAll}  ${classes.btn}`}
                                variant="outlined"
                                color="primary"
                            >Owe</Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={`${classes.btnAll}  ${classes.btn}`}
                                variant="contained"
                            >Oweing</Button>
                    </div>
                    <div className={classes.card} style={{backgroundColor:'#ecfdff'}}>
                        <div className={classes.float}></div>
                        <div className={classes.left} style={{color: '#02bcc9', fontWeight: 'bold'}}>James</div>
                      <div className={classes.content}>
                        <div style={{marginBottom : '10px'}}>Oew me something</div>
                        <img className={classes.pic} src={img} alt=""/>
                      </div>
                        <div className={classes.right}>
                           <div>2 Jun</div>
                           <div>
                               <Checkbox
                                   defaultChecked
                                   color="default"
                                   inputProps={{ 'aria-label': 'checkbox with default color' }}
                               />
                           </div>
                        </div>
                    </div>

                    <div className={classes.card} style={{marginTop: '10px',backgroundColor:'#ffeef6'}}>
                        <div className={classes.float}></div>
                        <div className={classes.left} style={{color: '#ef408b', fontWeight: 'bold'}}>Nick</div>
                        <div className={classes.content}>
                            <div>I owe something</div>
                        </div>
                        <div className={classes.right}>
                            <div>2 Jun</div>
                            <div>
                                <Checkbox
                                    defaultChecked
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={classes.card} style={{marginTop: '10px'}}>
                        <div className={classes.float}></div>
                        <div className={classes.left}>
                            <div style={{color: '#1f69bc', fontWeight: 'bold'}}>Antony</div>
                            <div style={{color: '#9fc3ec', fontSize:'6px'}}>HR-How-jok</div>
                        </div>
                        <div className={classes.content}>
                            <div style={{fontSize: '16px'}}>New joinee to your Team - Newyork</div>
                            <div  className={classes.overflow}>
                                Hi, All just introducue our new young smartest and
                                talented employee to you. He is Mr. Vincent who isdsfsdfsdfsd
                            </div>
                            <div>
                                <div style={{backgroundColor: '#d4e7fe', width: '30px',fontSize: '12px', color: '#4592e9', textAlign: 'center', borderRadius: '5px'}}>
                                    1
                                </div>
                            </div>
                        </div>
                        <div className={classes.right}>
                            <div>2 Jun</div>
                        </div>
                    </div>

                    <div className={classes.card} style={{marginTop: '10px', backgroundColor: '#fff6e3'}}>
                        <div className={classes.float}></div>
                        <div className={classes.left}>
                            <div style={{color: '#ffeea8', fontWeight: 'bold'}}>Ferick</div>
                        </div>
                        <div className={classes.content}>
                            <div style={{fontSize: '16px'}}>New joinee to your Team - Newyork</div>
                            <div  className={classes.overflow}>
                                Hi, All just introducue our new young smartest and
                                talented employee to you. He is Mr. Vincent who isdsfsdfsdfsd
                            </div>
                            <div>
                                <div style={{backgroundColor: '#ffeea8',marginTop: '5px', width: '30px',fontSize: '12px', color: '#4592e9', textAlign: 'center', borderRadius: '5px'}}>
                                    1
                                </div>
                            </div>
                        </div>
                        <div className={classes.right}>
                            <div>2 Jun</div>
                        </div>
                    </div>

                    <div className={classes.card} style={{marginTop: '10px', backgroundColor: '#ececec'}}>
                        <div className={classes.float}></div>
                        <div className={classes.left}>
                            <div style={{color: '#ffeea8', fontWeight: 'bold'}}>Ferick</div>
                        </div>
                        <div className={classes.content}>
                            <div style={{fontSize: '16px'}}>New joinee to your Team - Newyork</div>
                            <div  className={classes.overflow}>
                                Hi, All just introducue our new young smartest and
                                talented employee to you. He is Mr. Vincent who isdsfsdfsdfsd
                            </div>
                            <div>
                                <div style={{backgroundColor: '#ffeea8',marginTop: '5px', width: '30px',fontSize: '12px', color: '#4592e9', textAlign: 'center', borderRadius: '5px'}}>
                                    1
                                </div>
                            </div>
                        </div>
                        <div className={classes.right}>
                            <div>2 Jun</div>
                        </div>
                    </div>
                    <div className={classes.card} style={{marginTop: '10px', backgroundColor: '#ececec'}}>
                        <div className={classes.float}></div>
                        <div className={classes.left}>
                            <div style={{color: '#ffeea8', fontWeight: 'bold'}}>Ferick</div>
                        </div>
                        <div className={classes.content}>
                            <div style={{fontSize: '14px', marginBottom: '5px'}}>New joinee to your Team - Newyork</div>
                            <div  className={classes.overflow}>
                                Hi, All just introducue our new young smartest and
                                talented employee to you. He is Mr. Vincent who isdsfsdfsdfsd
                            </div>
                            <div>
                                <div style={{backgroundColor: '#ffeea8',marginTop: '5px', width: '30px',fontSize: '12px', color: '#4592e9', textAlign: 'center', borderRadius: '5px'}}>
                                    1
                                </div>
                            </div>
                        </div>
                        <div className={classes.right}>
                            <div>2 Jun</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={classes.rightContainer}>
                        <div className={classes.rightCard}>
                            <div className={classes.neiCard}>
                                <div style={{height: '70%', display: 'flex', justifyContent:  'space-between'}}>
                                    <span>Public Request</span>
                                    <span>...</span>
                                </div>
                                <div style={{height: '30%', color: '#bcbfc2', fontSize: '12px', textAlign: 'right'}}>
                                   <span> 2 Jun 2020 8:55</span>
                                </div>
                            </div>
                        </div>

                        <div className={classes.rightCard} style={{backgroundColor: '#bdddff'}}>
                            <div className={classes.neiCard} style={{backgroundColor: '#ecf5ff'}}>
                                <div style={{height: '70%', display: 'flex', justifyContent:  'space-between'}}>
                                    <span>
                                        <span style={{color: '#545bf8'}}>Yuri</span>
                                        needs help cleaning the office. The
                                        <span  style={{color: '#545bf8'}}>reward</span>
                                        is coffee.
                                    </span>
                                </div>
                                <div style={{height: '30%', color: '#bcbfc2', fontSize: '12px', textAlign: 'right'}}>
                                    <span style={{backgroundColor:'#fff', borderRadius:'10px', height:'16px',lineHeight: '16px',fontSize:'12px', padding: '0 10px'}}>
                                        done
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.rightCard} style={{backgroundColor: '#ecf5ff'}}>
                            <div className={classes.neiCard} style={{backgroundColor: '#bfeef1'}}>
                                <div style={{height: '70%', display: 'flex', justifyContent:  'space-between'}}>
                                    <span>
                                        <span style={{color: '#545bf8'}}>Yuri</span>
                                        needs help cleaning the office. The
                                        <span  style={{color: '#545bf8'}}>reward</span>
                                        is coffee.
                                    </span>
                                </div>
                                <div style={{height: '30%', color: '#bcbfc2', fontSize: '12px', textAlign: 'right'}}>
                                    <span style={{backgroundColor:'#fff', borderRadius:'10px', height:'16px',lineHeight: '16px',fontSize:'12px', padding: '0 10px'}}>
                                        need help
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
  }
}
export default withStyles(styles, { withTheme: true })(Index)
