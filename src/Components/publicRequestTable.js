import React, { Component } from 'react';
import { message,  Table, Button } from "antd";
import * as ls from "local-storage";
import {TOKEN_NAME} from "../config";
import {API} from "../utils/axios";

// import modal
import FormModal from "./RewardFormModal"

// style
const btn = {
    marginRight: '50px'
}


class PublicRequestTable extends Component{
	
	constructor(props, context) {
	    super(props);
		
	    this.state = {
			publicRequire: [],
			isShowReward: false
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
        const {data} = await API.put('/publicRequest/' + id + '/accept');
        message.info('accept success');
	}
	
	getBoard = async () => {
        const {data} = await API.get('/publicRequest/leaderboard');
        this.setState({
			board: data,
			isShowReward: false
        })
	};
	
	showView = async (record) => {
		const {data} = await API.get('/publicRequest/' + record.id + '/reward');
		
		
	    const rewardList = data.map(item=> {
	        return ('Rewards: '+item.reward_item+',Quantity: '+item.no_of_rewards)
		})
		
	    const alertMsg = 'Description: ' + record.description+'   '+rewardList.join("。");
	  
	    alert(alertMsg)
	};
	
	
	
	getReward = async (id) => {

	    this.setState({
	        isShowReward: true,
	        isNowId: id
	    });

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

	componentDidMount() {
		this.availablePublic()

		 this.getBoard()
	 }
	
    render(){
        return(
            <div>
                <Table columns={this.publistRequire} dataSource={this.state.publicRequire} />
				<FormModal show={this.state.isShowReward} id={this.state.isNowId}/>
			</div>
        )
    }
}


export default PublicRequestTable
