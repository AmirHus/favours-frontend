import React, { Component } from 'react';
import {Form, InputNumber,message,  Table,  Select,
    Input, Switch, List, Row, Col, Button, Modal, Radio } from "antd";
import {API} from "../utils/axios";




class FormModal extends Component{
    
	constructor(props, context) {
        super(props);
	    this.state = {
            setRewardValue: [],
            isShowReward: false
		}
	}
    
    getReward = async (id) => {
        
        const {data} = await API.get('/publicRequest/' + id + '/reward');
        this.setState({
            setRewardValue: data
        })
    };

	onSetRewardFailed = (errorInfo) => {
	    this.setState({
	        isShowReward: false
	    });
	};
	
	onSetReward = async (values) => {
	    this.setState({
	        isShowReward: true
	    });
	
	    let reward = []
	    for(let value in values) {
	        if(value != 'title' && value != 'description' && values[value] != undefined && values[value] != 0) {
	            reward.push({
	                rewardItem: value,
	                noOfRewards: values[value]
	            })
	        }
        }
        
	    let params = {
	        "rewards": reward
	    }
	
	    try {
	        const {data} = await API.put('/publicRequest/' + this.state.isNowId + '/reward',params);
	        this.setState({
	            isShowReward: false
	        });
	        message.info('success');
	    } catch (error) {
	    }
	};
	
    //implement when props changed
    componentWillReceiveProps(props) {
        
        this.setState({ isShowReward: props.show })
        if(props.show &&props.id){
            this.getReward(props.id)
        }

        
    }
    
	
    render(){
        return(	 
          <Modal
              title="Modal"
              visible={this.state.isShowReward}
              onCancel={this.onSetRewardFailed}
              destroyOnClose
              footer={
                  [] // set footer as empty
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
                                             initialValue={0}
                              name={item.reward_item}
                              label={item.reward_item}>
                              <InputNumber  min={0}/>
                          </Form.Item>)
                      })
                  }
                  <Form.Item>
                      <Button type="primary"  htmlType="submit">
                          Submit
                      </Button>
                  </Form.Item>
              </Form>
          </Modal>
          
        )
    }
}


export default FormModal