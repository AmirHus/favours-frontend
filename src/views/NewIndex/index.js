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



const ownList = [
    // {
    //     title: 'owing',
    //     dataIndex: 'owing',
    //     key: 'owing',
    // },
    {
        title: 'Created by',
        dataIndex: 'created_by',
        key: 'created_by',
    },
    {
        title: 'Other party',
        dataIndex: 'other_party',
        key: 'other_party',
    },
    {
        title: 'Favour',
        dataIndex: 'favour_item',
        key: 'favour_item',
    },
    
    {
        title: 'Numbers',
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


const boardTable = [
    {
        title: 'Name',
        dataIndex: 'accepted_by_name',
        key: 'accepted_by_name',
    },
    {
        title: 'Email',
        dataIndex: 'accepted_by_email',
        key: 'accepted_by_email',
    },
    {
        title: 'Completed requests',
        dataIndex: 'requests_completed',
        key: 'requests_completed',
    }
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
            isOwn: '1',
            isShowReward: false,
            setRewardValue: [],
            board: [],
            isNowId: null
        }


        this.publistRequire = [
            {
                title: 'Creater email',
                dataIndex: 'created_by_email',
                key: 'created_by_email',
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Creater name',
                dataIndex: 'created_by_name',
                key: 'created_by_name',
            },
            {
                title: 'accept',
                key: '',
                render: (text, record) => (
                    localStorage.getItem("isLogin")?  <div style={{display: 'flex'}}>
                         <Button
                            disabled={ls.get(TOKEN_NAME)? false : true}
                            type="primary"
                            style={btn}
                        >
                            accept
                        </Button>
                        <Button
                            onClick={()=> {
                                this.getReward(record.id)
                            }}
                            disabled={ls.get(TOKEN_NAME)? false : true}
                            type="primary"
                            style={btn}
                        >
                            Add Reward
                        </Button>
                       
                    </div>: null
                ),
            }

        ];
    }

    FormSizeDemo = () => {

    }

    showModal = () => {
        this.setState({
            visibleModel: true
        });
    };

    getReward = async (id) => {
        //
        console.log(id)
        this.setState({
            isShowReward: true,
            isNowId: id
        });
        // console.log(id)
        const {data} = await API.get('/publicRequest/' + id + '/reward');
        this.setState({
            setRewardValue: data
        })
    };

    getBoard = async () => {
        // console.log(id)
        const {data} = await API.get('/publicRequest/leaderboard');
        this.setState({
            board: data
        })
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
            // let message;
            // if (error.response.status === 400) message = `Error: ${error.response.data}`;
            // else message = 'Error: could not process request';
            // this.setState({ dialogMessage: message });
            // this.setState({ dialog: true });
            // this.setState({ spinner: false });
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


    onSetReward = async (values) => {
        console.log(values)
        this.setState({
            isShowReward: true
        });

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
            "rewards": reward
        }

        try {
            const {data} = await API.put('/publicRequest/' + this.state.isNowId + '/reward',params);
            this.setState({
                isShowReward: false
            });
        } catch (error) {
        }
    };



    onSetRewardFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        this.setState({
            isShowReward: false
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


     goToLogIn = () => {
         this.props.history.push('/login');
     }

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
            // let message;
            // if (error.response.status === 400) message = `Error: ${error.response.data}`;
            // else message = 'Error: could not process request';
            // this.setState({ dialogMessage: message });
            // this.setState({ dialog: true });
            // this.setState({ spinner: false });
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

    handleCreateFavour = (e) => {
        this.props.history.push('/create');
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
            // let message;
            // if (error.response.status === 400) message = `Error: ${error.response.data}`;
            // else message = 'Error: could not process request';
            // this.setState({ dialogMessage: message });
            // this.setState({ dialog: true });
            // this.setState({ spinner: false });
        }
    }

    componentDidMount() {
       this.availablePublic()
       this.getAllPublic()
        this.getOen()
        this.getBoard()
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
                           onClick={this.goToLogIn}
                           variant="contained"
                           >Log in
                             </Button>
                          }
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
                                   Log Out
                               </Button> : null
                           }

                       </Col>
                   </div>
                   <div  style={topBtn}>
                       <Radio.Group value={this.state.visible} onChange={this.handleVisible}>
                           <Radio.Button value="1">Home</Radio.Button>
                           <Radio.Button value="2" disabled={ls.get(TOKEN_NAME)? false : true}>Favours</Radio.Button>
                           <Radio.Button value="3">Public Request</Radio.Button>
                       </Radio.Group>
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
                                   {/*<Table columns={columns} dataSource={data} />*/}
                                   <Table columns={this.publistRequire} dataSource={this.state.publicRequire} />
                               </div>
                           </div>
                       </Col>
                       <Col  span={10} offset={1}  style={{background: '#fff', boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.4)', borderRadius: 8}}>
                           <div style={{color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center'}}>
                               Leaderboard
                           </div>
                           <div>
                               {/*<Table columns={columns} dataSource={data} />*/}
                               <Table columns={boardTable} dataSource={this.state.board} />
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
                               <Col>
                                <Button onClick={this.handleCreateFavour}>Create Favour</Button>
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
                                     <Table columns={this.publistRequire} dataSource={this.state.publicRequire} />
                                 </Col>
                                 <Col>
                                     {
                                             <Button
                                                 disabled={ls.get(TOKEN_NAME)? false : true}
                                             onClick={this.showModal}
                                             style={{margin: '0 20px'}}
                                         >
                                             Create public request
                                         </Button>
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
                           <Button type="primary"  htmlType="submit" >
                               Submit
                           </Button>
                       </Form.Item>
                   </Form>
               </Modal>

               <Modal
                   title="Modal"
                   visible={this.state.isShowReward}
                   onCancel={this.onSetRewardFailed}
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
                       onFinish={this.onSetReward}
                       onFinishFailed={this.onSetRewardFailed}
                   >
                       {
                           this.state.setRewardValue.map((item,key) => {
                               return (<Form.Item key={key}
                                                  initialValue={item.no_of_rewards}
                                   name={item.reward_item}
                                   label={item.reward_item}>
                                   <InputNumber  min={0}/>
                               </Form.Item>)
                           })
                       }
                       {/*<Form.Item*/}
                       {/*    name="tea"*/}
                       {/*    label="tea">*/}
                       {/*    <InputNumber min={0}/>*/}
                       {/*</Form.Item>*/}
                       {/*<Form.Item*/}
                       {/*    name="coffee"*/}
                       {/*    label="coffee">*/}
                       {/*    <InputNumber min={0}/>*/}
                       {/*</Form.Item>*/}
                       {/*<Form.Item*/}
                       {/*    name="chips"*/}
                       {/*    label="chips">*/}
                       {/*    <InputNumber min={0}/>*/}
                       {/*</Form.Item>*/}
                       {/*<Form.Item*/}
                       {/*    name="cupcake"*/}
                       {/*    label="cupcake">*/}
                       {/*    <InputNumber min={0}/>*/}
                       {/*</Form.Item>*/}
                       {/*<Form.Item*/}
                       {/*    label="chocolate"*/}
                       {/*    name="chocolate"*/}
                       {/*>*/}
                       {/*    <InputNumber min={0}/>*/}
                       {/*</Form.Item>*/}
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


