import React, { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    //Form submit
    const submitHandler = async (values) => {
        try {
            // console.log(values+"LOgin values");
            setLoading(true);
            const { data } = await axios.post("/users/login",values)
            setLoading(false);
            message.success("Login succesful");
            localStorage.setItem("user",JSON.stringify({...data.user,password:''}));
            navigate("/");

        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Something went wrong");
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
                        Login form
                    </h1>
                    <Form.Item label="Email" name="email">
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type='password' />
                    </Form.Item>

                    <div className='d-flex justify-content-between'>
                        <Link to='/register'>Don't have account? Click  here to Register</Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Login