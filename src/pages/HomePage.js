import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, message, Table, DatePicker } from "antd"
import Layouts from '../components/Layouts/Layouts'
import FormItem from 'antd/es/form/FormItem';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons'
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransaction, setAllTransaction] = useState([]);
    const [frequency, setFrequency] = useState('7');
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState("all");
    const [viewData, setViewData] = useState("table");

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },
        {
            title: "Amount",
            dataIndex: "amount"
        },
        {
            title: "Type",
            dataIndex: "type"
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Reference",
            dataIndex: "refrence"
        },
        {
            title: "Description",
            dataIndex: "description"
        },
        {
            title: "Actions"
        }
    ]




    // useEffect HOOK
    useEffect(() => {
        // getting transaction 
        const getAllTransaction = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                setLoading(true);
                const res = await axios.post("/transactions/get-transaction", {
                    userid: user._id,
                    frequency,
                    selectedDate,
                    type
                });
                setLoading(false);
                setAllTransaction(res.data);
                console.log(res.data);

            } catch (error) {
                console.log(error);
                message.error("Fetch issue with records")
            }
        };
        getAllTransaction();
    }, [frequency, selectedDate, type])


    // form submir handler
    const handelSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            setLoading(true);
            await axios.post("/transactions/add-transaction", { ...values, userid: user._id })
            setLoading(false);
            message.success("Transaction Added Successfully..!")
            setShowModal(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Failed to add Transaction!");
        }
    }

    return (
        <Layouts>
            {loading && <Spinner />}
            <div className='filters'>
                <div>
                    <h6>Select Frequency</h6>
                    <Select value={frequency} onChange={(values) => setFrequency(values)}>
                        <Select.Option value='7'>Last 1 Week</Select.Option>
                        <Select.Option value='31'>Last 1 Month</Select.Option>
                        <Select.Option value='365'>Last 1 Year</Select.Option>
                        <Select.Option value='custom'>Custom</Select.Option>
                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => { setSelectedDate(values) }} />}
                </div>
                <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values) => setType(values)}>
                        <Select.Option value='all'>All</Select.Option>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expence'>Expence</Select.Option>
                    </Select>
                    {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => { setSelectedDate(values) }} />}
                </div>

                <div className='mx-2 switch-icon'>
                    <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
                    <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
                </div>
                <div>

                    <button className='btn btn-primary' onClick={() => setShowModal(true)}>
                        Add New
                    </button>
                </div>

            </div>

            <div className='content'>
                {viewData === 'table' ? (<Table columns={columns} dataSource={allTransaction} />)
                :(
                    <Analytics allTransaction={allTransaction}/>
                )}
            </div>

            <Modal title='Add transaction' open={showModal} onCancel={() => setShowModal(false)} footer={false}>
                <Form layout='vertical' onFinish={handelSubmit}>
                    <FormItem label="Amount" name='amount'>
                        <Input type='text' />
                    </FormItem>
                    <FormItem label="type" name='type'>
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expence">Expence</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem label="category" name='category'>
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="tax">Tax</Select.Option>
                            <Select.Option value="fee">Fee</Select.Option>
                        </Select>
                    </FormItem>

                    <FormItem label="Date" name='date'>
                        <Input type='date' />
                    </FormItem>
                    <FormItem label="reference" name='reference'>
                        <Input type='text' />
                    </FormItem>
                    <FormItem label="Descreption" name='description'>
                        <Input type='text' />
                    </FormItem>
                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-primary'> Save</button>
                    </div>
                </Form>
            </Modal>

        </Layouts>


    )
}

export default HomePage





