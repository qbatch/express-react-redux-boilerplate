import React from 'react';
import {
  Form, Input, Button,
} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { registerUser } from '../../../api/auth';
import {
  registerUserSuccess,
  registerUserFailure,
} from '../../../actions/auth';

const RegisterationPage = ({ form }) => {
  const dispatch = useDispatch();

  const isFetchingUser = useSelector(state => state.auth.isFetching);
  const isLoading = useSelector(state => state.loader.isLoading);

  const { getFieldDecorator } = form;

  const handleFormSubmit = e => {
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(registerUser(values, registerUserSuccess, registerUserFailure));
      }
    });
  }

  const comparePasswords = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Both passwords do not match!');
    } else {
      callback();
    }
  }

  return (
    <>
      {
        !isFetchingUser && <Form onSubmit={handleFormSubmit} className='auth-form'>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: 'Please input your Full Name',
              }],
            })(
              <Input placeholder='Name' />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Please enter valid Email!',
              }, {
                required: true, message: 'Please input your Email!',
              }],
            })(
              <Input autoComplete='email' placeholder='Email' />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' },{
                validator: comparePasswords,
              }],
            })(
              <Input.Password placeholder='Password' />
            )}
          </Form.Item>
          <Form.Item
          >
            {getFieldDecorator('confirmPassword', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: comparePasswords,
              }],
            })(
              <Input.Password placeholder='Confirm Password' />
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={isLoading} block>
              Register
            </Button>
            Or <Link to='/auth/login'>Login now!</Link>
          </Form.Item>
        </Form>
      }
      {
        isFetchingUser && null
      }
    </>
  )
};

export default Form.create({ name: 'registration_form' })(RegisterationPage);
