import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import { logout } from '../../auth';
import {Form, InputNumber, Table,  Select,
    Input, Switch, List, Row, Col, Button, Modal, Radio } from "antd";
import {API} from "../../utils/axios";
import {loginRedirectUri, logout} from "../../auth";
import * as ls from "local-storage";
import {TOKEN_NAME} from "../../config";


const container = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px',
    boxSizing: 'border-box',
    height: '80px',
    border: '1px solid #eee'
}

const topBtn = {
    width: '100%',
    boxSizing: 'border-box',
    height: '80px',
    lineHeight: '80px',
    border: '1px solid #eee'
}

const btn = {
    marginRight: '50px'
}

const onChange =  (value) => {
    console.log('changed', value);
}




const left = {
    marginLeft: '40px',
    padding: '10px'
}

const styles = (theme) => ({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
    }
});

const columns = [
    {
        title: 'Reward type',
        dataIndex: 'type',
        key: 'age',
    },
    // {
    //     title: 'num',
    //     dataIndex: 'num',
    //     key: 'num',
    // },
    {
        title: 'describe',
        dataIndex: 'describe',
        key: 'describe',
    },
    {
        title: 'num',
        key: 'action',
        render: (text, record) => (
            <div>
                <InputNumber style={btn} min={1} max={10} defaultValue={3} onChange={onChange}/>
                {
                    <Button
                        disabled={ls.get(TOKEN_NAME)? false : true}
                        type="primary"
                        style={btn}
                    >
                        accept
                    </Button>
                }
            </div>
        ),
    },
];

const publistRequire = [
    {
        title: 'created_by_email',
        dataIndex: 'created_by_email',
        key: 'created_by_email',
    },
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'created_by_name',
        dataIndex: 'created_by_name',
        key: 'created_by_name',
    },
    {
        title: 'accept',
        key: '',
        render: (text, record) => (
            localStorage.getItem("isLogin")?  <div>
                <Button
                    disabled={ls.get(TOKEN_NAME)? false : true}
                    type="primary"
                    style={btn}
                >
                    accept
                </Button>
            </div>: null
        ),
    }

];


const ownList = [
    // {
    //     title: 'owing',
    //     dataIndex: 'owing',
    //     key: 'owing',
    // },
    {
        title: 'created_by',
        dataIndex: 'created_by',
        key: 'created_by',
    },
    {
        title: 'other_party',
        dataIndex: 'other_party',
        key: 'other_party',
    },
    {
        title: 'favour_item',
        dataIndex: 'favour_item',
        key: 'favour_item',
    },
    {
        title: 'repaid',
        dataIndex: 'repaid',
        key: 'repaid',
    },
    {
        title: 'no_of_items',
        dataIndex: 'no_of_items',
        key: 'no_of_items',
    },
    {
        title: 'proof',
        dataIndex: 'proof',
        key: 'proof',
    }
];

const data = [
    {
        key: '1',
        describe: 'John Brown',
        type: 'coffe',
        num: '4',
    },
    {
        key: '2',
        describe: 'Jim Green',
        type: 'coffe',
        num: '2',
    },
    {
        key: '3',
        describe: 'Joe Black',
        type: 'coffe',
        num: '5',
    },
];


const { Option } = Select;

export default class NewIndex extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            visible: '1',
            visibleModel: false,
            publicRequire: [],
            setRequest: 1,
            allPublic: [],
            favours:{},
            isOwn: '1'
        }
    }

    FormSizeDemo = () => {

    }

    showModal = () => {
        this.setState({
            visibleModel: true
        });
    };

    hideModal = (values) => {
        this.setState({
            visibleModel: false
        });
        console.log('Success:', values);
    };

    onFinish = async (values) => {

        let reward = []
        for(let value in values) {
            console.log(value)
            if(value != 'title' && value != 'description' && values[value] != undefined && values[value] != 0) {
                reward.push({
                    rewardItem: value,
                    noOfRewards: values[value]
                })
            }
        }
        console.log(reward)
        let params = {
            title: values.title,
            description: values.description,
            rewards: reward
        }
        try {
            const {data} = await API.post('/publicRequest',params);
        } catch (error) {
            let message;
            if (error.response.status === 400) message = `Error: ${error.response.data}`;
            else message = 'Error: could not process request';
            this.setState({ dialogMessage: message });
            this.setState({ dialog: true });
            this.setState({ spinner: false });
        }

        this.setState({
            visibleModel: false
        });
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        this.setState({
            visibleModel: false
        });
    };

    getData = async () => {
    // , {owing:false, name:'tian', favourItme: 'coffee'}
        try {
            const { data } = await API.get('/favour');
            console.log(data)
        } catch (error) {
            // let message;
            // if (error.response.status === 400) message = `Error: ${error.response.data}`;
            // else message = 'Error: could not process request';
            // this.setState({ dialogMessage: message });
            // this.setState({ dialog: true });
            // this.setState({ spinner: false });
        }
    }

    logUserOut = () => {
        logout();
    }


    // goToLoogin = () => {
    //     this.props.history.push('/login');
    // }

    goToSignUp = () => {
        this.props.history.push('/signup');
    }

    getAllPublic = async () => {
        try {
            const {data} = await API.get('/publicRequest');
            this.setState({
                allPublic: data
            });
        } catch (error) {
            let message;
            if (error.response.status === 400) message = `Error: ${error.response.data}`;
            else message = 'Error: could not process request';
            this.setState({ dialogMessage: message });
            this.setState({ dialog: true });
            this.setState({ spinner: false });
        }
    }

    getOen = async () => {
        this.setState({
            favours: {
                "owed": [
                    {
                        "owing": false,
                        "id": 29,
                        "created_by": "auth0",
                        "other_party": "autho",
                        "favour_item": "tea",
                        "repaid": false,
                        "no_of_items": 2,
                        "proof": null
                    },
                    {
                        "owing": false,
                        "id": 30,
                        "created_by": "auth0",
                        "other_party": "autho",
                        "favour_item": "tea",
                        "repaid": false,
                        "no_of_items": 2,
                        "proof": "favour-poor/01EMFSFS"
                    }
                ],
                "owing": [
                    {
                        "owing": false,
                        "id": 31,
                        "created_by": "auth0",
                        "other_party": "autho",
                        "favour_item": "tea",
                        "repaid": false,
                        "no_of_items": 3,
                        "proof": "favour-poor/01EMFSFSS"
                    }
                ]
            }
        })
        // try {
        //     const {data} = await API.get('/publicRequest');
        //     this.setState({
        //         allPublic: data
        //     });
        // } catch (error) {
        //     let message;
        //     if (error.response.status === 400) message = `Error: ${error.response.data}`;
        //     else message = 'Error: could not process request';
        //     this.setState({ dialogMessage: message });
        //     this.setState({ dialog: true });
        //     this.setState({ spinner: false });
        // }
    }


    handleRequest = e => {
        this.setState({ setRequest: e.target.value });
    };
    handleOwn = e => {
        console.log(typeof e.target.value)
        console.log(e.target.value)
        this.setState({ isOwn: e.target.value.slice(0) });
    };

    handleVisible = e => {
        console.log(typeof e.target.value)
        console.log(e.target.value)
        this.setState({ visible: e.target.value.slice(0) });
    }
    //
    // goToLogin = () => {
    //     this.props.history.push('/homeIndex');
    // }
    //
    // logUserOut = () => {
    //     logout();
    // }
    //
    // goToSignUp = () => {
    //     this.props.history.push('/signup');
    // }

     availablePublic = async () => {
        try {
            const { data } = await API.get('/publicRequest/available');
            this.setState({
                publicRequire: data
            });
        } catch (error) {
            let message;
            if (error.response.status === 400) message = `Error: ${error.response.data}`;
            else message = 'Error: could not process request';
            this.setState({ dialogMessage: message });
            this.setState({ dialog: true });
            this.setState({ spinner: false });
        }
    }

    componentDidMount() {
         console.log('1111')
         console.log(ls.get(TOKEN_NAME))
         console.log(localStorage.getItem("isLogin"))
       this.availablePublic()
       this.getAllPublic()
        this.getOen()
    }

    render() {
        const { classes } = this.props;
        const { visible } = this.state;

        return (
           <div>
                   <div style={container}>
                       <Col  style={{ fontSize: '24px', paddingLeft: '50px'}}>
                           Favtrack
                           <Button />
                       </Col>
                       <Col>
                           {
                               ls.get(TOKEN_NAME)? null : <Button style={btn}
                               onClick={this.goToSignUp}
                               variant="contained"
                               >Sign Up
                               </Button>
                           }

                           {/*<Button style={btn}*/}
                           {/*        onClick={this.goToLoogin}*/}
                           {/*        variant="contained"*/}
                           {/*>*/}
                           {/*Loogind*/}
                           {/*</Button>*/}
                           {
                               ls.get(TOKEN_NAME)? <Button
                                   style={btn}
                                   variant="contained"
                                   onClick={this.logUserOut}
                               >
                                   logUserOut
                               </Button> : null
                           }

                       </Col>
                   </div>
                   <div  style={topBtn}>
                       <Button
                           style={{margin: '0 20px'}}
                           onClick={
                               () => {
                               this.setState({
                                   visible: 2
                               })
                               this.getOen()
                           }
                       }
                       >
                           {/*onClick={this.goToSignUp}*/}
                            Favours
                       </Button>
                       <Button
                           onClick={() => {
                               this.setState({
                                   visible: 3
                               })
                           }}
                           style={btn}
                       >
                           Public Request
                       </Button>

                       <div style={{color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center'}}>
                           <Radio.Group value={this.state.visible} onChange={this.handleVisible}>
                               <Radio.Button value="2">Favours</Radio.Button>
                               <Radio.Button value="3">Public Request</Radio.Button>
                           </Radio.Group>
                       </div>
                   </div>

                    <div gutter={20} style={{padding: '100px 0'}}>
                        {
                         this.state.visible == 1 ?
                             <Row>
                       <Col  span={10} offset={1}>
                           <div  style={{boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.4)', borderRadius: 8}}>
                               <div style={{color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center'}}>
                                   Public requests
                               </div>
                               <div>
                                   <Table columns={columns} dataSource={data} />
                               </div>
                           </div>
                       </Col>
                       <Col  span={10} offset={1}  style={{background: '#fff', boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.4)', borderRadius: 8}}>
                           <div style={{color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center'}}>
                               Leaderboard
                           </div>
                           <div>
                           <List
                               bordered
                               dataSource={[
                                   'Racing car sprays burning fuel into crowd.',
                                   'Japanese princess to wed commoner.',
                                   'Australian walks 100km after outback crash.',
                                   'Man charged over missing wedding girl.',
                                   'Los Angeles battles huge wildfires.',
                               ]}
                               renderItem={item => (
                                   <List.Item>
                                        {item}
                                   </List.Item>
                               )}
                           />
                           </div>
                       </Col>

                       </Row>
                             : this.state.visible == 2 ?
                                 <Row gutter={20} style={{padding: '100px 0'}}>
                               <Col  offset={7} style={{boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.4)', borderRadius: 8}}>
                                           <div style={{color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center'}}>
                                               <Radio.Group value={this.state.isOwn} onChange={this.handleOwn}>
                                                   <Radio.Button value="1">I owe</Radio.Button>
                                                   <Radio.Button value="2">others owe me</Radio.Button>
                                               </Radio.Group>
                                           </div>
                                           <Table columns={ownList} dataSource={this.state.isOwn == '1' ? this.state.favours.owed :this.state.favours.owing} />
                               </Col>
                           </Row>
                                 :
                             <Row gutter={20} style={{padding: '100px 0'}}>
                                 <Col  span={10} offset={7} style={{boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.4)', borderRadius: 8}}>
                                     <div style={{color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center'}}>
                                         <Radio.Group value={this.state.setRequest} onChange={this.handleRequest}>
                                             <Radio.Button value="large">Public Requests</Radio.Button>
                                             <Radio.Button value="default">Accepted request</Radio.Button>
                                         </Radio.Group>
                                     </div>
                                     <Table columns={publistRequire} dataSource={this.state.publicRequire} />
                                 </Col>
                                 <Col>
                                     {
                                         localStorage.getItem("isLogin")?                                     <Button
                                             onClick={this.showModal}
                                             style={{margin: '0 20px'}}
                                         >
                                             Create public request
                                         </Button>: null
                                     }

                                 </Col>
                             </Row>
                        }
                   </div>
               <Modal
                   title="Modal"
                   visible={this.state.visibleModel}
                   onCancel={this.onFinishFailed}
                   footer={
                       [] // 设置footer为空，去掉 取消 确定默认按钮
                   }
                       >
                   <Form
                       labelCol={{ span: 4 }}
                       wrapperCol={{ span: 14 }}
                       layout="horizontal"
                       initialValues={{
                           remember: true,
                       }}
                       onFinish={this.onFinish}
                       onFinishFailed={this.onFinishFailed}
                   >
                       <Form.Item label="title"
                                  name="title"
                                  rules={[
                                      {
                                          required: true,
                                          message: 'Please input your username!',
                                      }
                                  ]}
                       >
                           <Input />
                       </Form.Item>
                       <Form.Item label="description"
                                  name="description"
                                  rules={[
                                      {
                                          required: true,
                                          message: 'Please input your username!',
                                      }
                                  ]}
                       >
                           <Input />
                       </Form.Item>
                       <Form.Item
                           name="tea"
                           label="tea">
                           <InputNumber min={0}/>
                       </Form.Item>
                       <Form.Item
                           name="coffee"
                           label="coffee">
                           <InputNumber min={0}/>
                       </Form.Item>
                       <Form.Item
                           name="chips"
                           label="chips">
                           <InputNumber min={0}/>
                       </Form.Item>
                       <Form.Item
                           name="cupcake"
                           label="cupcake">
                           <InputNumber min={0}/>
                       </Form.Item>
                       <Form.Item
                           label="chocolate"
                           name="chocolate"
                       >
                           <InputNumber min={0}/>
                       </Form.Item>
                       <Form.Item>
                           <Button type="primary"  htmlType="submit">
                               Submit
                           </Button>
                       </Form.Item>
                   </Form>
               </Modal>

           </div>
        )
    }
}


