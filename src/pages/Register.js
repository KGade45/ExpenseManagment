import React,{useState, useEffect} from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import Spinner from '../components/Spinner'

const Register = () => {

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    //Form submit
    const submitHandler = async(values)=>{
        console.log(values);
        try {
            setLoading(true);
            await axios.post("/users/register", values);
            // console.log(values +"registratonkjbvhc ");
            message.success("Registration succesful");
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            message.error("Registration Failed! ");
        }
    };

        // If already logged in prevent this page
    useEffect(()=>{
        if (localStorage.getItem('user')) {
            navigate("/");
        } 
    },[navigate]);

  return (
    <>
        <div className='register-page'>
            {loading && <Spinner/>}
            <Form layout='vertical' onFinish={submitHandler}>
                <h1>
                    Register form
                </h1>
                <Form.Item label="Name" name="name">
                    <Input type='string'/>
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type='email'/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password'/>
                </Form.Item>
                <div className='d-flex justify-content-between'>
                    <Link to='/login'>Already registered ? Click  here to login</Link>
                    <button className='btn btn-primary'>Register</button>
                </div>
            </Form>
        </div>
    </>
  )
}

export default Register