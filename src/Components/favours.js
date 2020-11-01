
import React, { Component } from 'react';
import {
    Form, InputNumber, message, Table, Select,
    Input, Switch, List, Row, Col, Button, Modal, Radio
} from "antd";

import {API} from "../utils/axios";


// form content
const ownList = [
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
        title: 'Favor',
        dataIndex: 'favour_item',
        key: 'favour_item',
    },
    {
        title: 'Numbers',
        dataIndex: 'no_of_items',
        key: 'no_of_items',
    },
];





class PublicRequest extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            isOwn: '1',
            favours: {},

        }
    }

    getData = async () => {
        try {

            const { data } = await API.get('/favour');
            this.setState({
                favours: data.favours
            })
        } catch (error) {
        }
    }

    handleOwn = e => {
        this.setState({ isOwn: e.target.value.slice(0) });

    }

    handleCreateFavour = (e) => {
        this.props.history.push('/create');
    }

    componentDidMount() {
        // initialization
       this.getData()

    }

    render() {
        // content
        return (
            <Row gutter={20} style={{ padding: '100px 0' }}>
                <Col offset={7} style={{ boxShadow: '1px 1px 20px rgba(0, 0, 0, 0.4)', borderRadius: 8 }}>
                    <div style={{ color: '#32325D', fontSize: 24, padding: '20px 0', fontWeight: 500, textAlign: 'center' }}>
                        <Radio.Group value={this.state.isOwn} onChange={this.handleOwn}>
                            <Radio.Button value="1">others owe me</Radio.Button>
                            <Radio.Button value="2">I owe</Radio.Button>
                        </Radio.Group>
                    </div>
                    <Table columns={ownList} dataSource={this.state.isOwn == '1' ? this.state.favours.owed : this.state.favours.owing} />
                </Col>
                <Col>
                    <Button onClick={this.handleCreateFavour}>Create Favour</Button>
                </Col>
            </Row>
        )
    }
}


export default PublicRequest


