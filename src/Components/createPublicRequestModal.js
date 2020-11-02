import React, { Component } from 'react';
import {
    Form, InputNumber,
    Input, Button, Modal
} from "antd";
import { API } from "../utils/axios";



class FormModal extends Component {

    constructor(props, context) {
        super(props);

        this.state = {
            visibleModel: false,
        }
    }

    componentDidMount(){
        // initialization
    }
    
    //implement when props changed
    componentWillReceiveProps(props) {
        this.setState({ visibleModel: props.show })
        if(props.show &&props.id){
            this.getData(props.id)
        }
    }

    getData = async(id) =>{
        const {data} = await API.get('/publicRequest/' + id + '/reward');
	    this.setState({
	        setRewardValue: data
	    })
    }

    onFinish = async (values) => {

        let reward = []
        for (let value in values) {

            if (value != 'title' && value != 'description' && values[value] != undefined && values[value] != 0) {
                reward.push({
                    rewardItem: value,
                    noOfRewards: values[value]
                })
            }
        }

        let params = {
            title: values.title,
            description: values.description,
            rewards: reward
        }
        try {
            const { data } = await API.post('/publicRequest', params);
        } catch (error) {
        }

        this.setState({
            visibleModel: false
        });
    };


    onFinishFailed = (errorInfo) => {
        this.setState({
            visibleModel: false
        });
    };



    render() {
        return (
            <Modal
                title="Modal"
                visible={this.state.visibleModel}
                onCancel={this.onFinishFailed}
                footer={
                    [] // set footer empty
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
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                        name="coffee"
                        label="coffee">
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                        name="chips"
                        label="chips">
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                        name="cupcake"
                        label="cupcake">
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                        label="chocolate"
                        name="chocolate"
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                      </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}


export default FormModal