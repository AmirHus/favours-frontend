
import React, { Component } from 'react';
import {Form, InputNumber,message,  Table,  Select,
    Input, Switch, List, Row, Col, Button, Modal, Radio } from "antd";

import {TOKEN_NAME} from "../config.js";
import * as ls from "local-storage";
import {API} from "../utils/axios";

import FormModal from "./createPublicRequestModal"

// 引入PublicRequest内容组件
import PublicRequestTable from '../Components/publicRequestTable';

// 表格数据

const btn = {
    marginRight: '50px'
}




class Favours extends Component{

	
	constructor(props, context) {
	    super(props);
	    this.state = {
			publicRequire: [],
            setRequest: 'large',
            visibleModel: false,

		}
		this.publistRequire = [
            {
                title: 'Email',
                dataIndex: 'created_by_email',
                key: 'created_by_email',
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: 'Name',
                dataIndex: 'created_by_name',
                key: 'created_by_name',
            },
            {
                title: 'Accept',
                key: 'Accept',
                render: (text, record) => (
                    localStorage.getItem("isLogin")?  <div style={{display: 'flex'}}>
                         <Button
                                onClick={()=> {
                                    this.accept(record.id)
                                }}
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
                        <Button
                            onClick={()=> {                
                                console.log(record)       
                                this.showView(record)

                            //    alert( 'Description: ' + record.description,'Rewards: ')
                            }}
                            disabled={ls.get(TOKEN_NAME)? false : true}
                            type="primary"
                            style={btn}
                        >
                            View
                        </Button>
                       
                    </div>: null
                ),
            }

        ];
    }
    
    accept = async (id) => {
        // console.log(id)
        const {data} = await API.put('/publicRequest/' + id + '/accept');
        message.info('accept success');
    }
    
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

    availablePublic = async () => {
        try {
            const { data } = await API.get('/publicRequest/available');
            this.setState({
                publicRequire: data
            });
        } catch (error) {
        }
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

	handleRequest = e => {
		console.log(e,">>>>???")
        this.setState({ setRequest: e.target.value });
	};
	
	componentDidMount() {
		   this.availablePublic()
	}
	
	
    render(){
        return(
			<div>
				<Row gutter={20} style={{padding: '100px 0'}}>
					<Col  span={10} offset={7} style={{boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.4)', borderRadius: 8}}>
						<div style={{color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center'}}>
							<Radio.Group value={this.state.setRequest} onChange={this.handleRequest}>
								<Radio.Button value="large">Public Requests</Radio.Button>
								<Radio.Button value="default">Accepted request</Radio.Button>
							</Radio.Group>
						</div>
                        {this.state.setRequest == 'large'?
                            (
                            <PublicRequestTable /> )
                            : null
                        }
						{/* <Table columns={this.publistRequire} dataSource={this.state.publicRequire} /> */}
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
				{/*模态框*/}
                <FormModal show={this.state.visibleModel} />

			</div>
        )
    }
}


export default Favours


 