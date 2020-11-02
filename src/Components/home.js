import React, { Component } from 'react';
import {Form, InputNumber,message,  Table,  Select,
    Input, Switch, List, Row, Col, Button, Modal, Radio } from "antd";
import * as ls from "local-storage";
import {TOKEN_NAME} from "../config";
import {API} from "../utils/axios";


import FormModal from "./RewardFormModal"

import PublicRequestTable from '../Components/publicRequestTable';

// style
const btn = {
    marginRight: '50px'
}

// board data
const boardTable = [
    {
        title: 'Name',
        dataIndex: 'accepted_by_name',
        key: 'accepted_by_name',
    },
    {
        title: 'Email',
        dataIndex: 'accepted_by_email',
        key: 'accepted_by_name',
    },
    {
        title: 'Completed requests',
        dataIndex: 'requests_completed',
        key: 'requests_completed',
    }
];




class HomeComtent extends Component{
	
	constructor(props, context) {
	    super(props);
		
	    this.state = {
			isShowReward: false
		}
		
	}

	
	getBoard = async () => {
        const {data} = await API.get('/publicRequest/leaderboard');
        this.setState({
			board: data,
			isShowReward: false
        })
	};
	



	componentDidMount() {
		
		 this.getBoard()
	 }
	
    render(){
        return(
			<div>
				<Row>
				   <Col  span={10} offset={1}>
					   <div  style={{boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.4)', borderRadius: 8}}>
						   <div style={{color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center'}}>
							   Public requests
						   </div>
						   <PublicRequestTable /> 
					   </div>
				   </Col>
				   <Col  span={10} offset={1}  style={{background: '#fff', boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.4)', borderRadius: 8}}>
					   <div style={{color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center'}}>
						   Leaderboard
					   </div>
					   <div>
						   <Table columns={boardTable} dataSource={this.state.board} />
					   </div>
				   </Col>
				</Row>
				<FormModal show={this.state.isShowReward} id={this.state.isNowId}/>
			</div>
        )
    }
}


export default HomeComtent