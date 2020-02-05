import React from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../../api/auth';
import {
  loginUserSuccess,
  loginUserFailure,
} from '../../../actions/auth'

const LoginPage = ({ form }) => {
  const dispatch = useDispatch();

  const isFetchingUser = useSelector(state => state.auth.isFetching);
  const isLoading = useSelector(state => state.loader.isLoading);

  const { getFieldDecorator } = form;

  const handleFormSubmit = e => {
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(loginUser(values, loginUserSuccess, loginUserFailure));
      }
    });
  }

  return (
    <>
      {
        !isFetchingUser && <Form onSubmit={handleFormSubmit} className='auth-form'>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Please enter valid email!',
              }, {
                required: true, message: 'Please input your email!',
              }],
            })(
              <Input autoComplete='email' placeholder='Email' />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input.Password placeholder='Password' />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <Link className='forgot-password-link' to='/auth/forgot-password'>
              Forgot password
            </Link>
            <Button type='primary' htmlType='submit' loading={isLoading} block>
              Log in
            </Button>
            Or <Link to='/auth/register'>Register now!</Link>
          </Form.Item>
        </Form>
      }
      {
        isFetchingUser && null
      }
    </>
  )
};

export default Form.create({ name: 'login_form' })(LoginPage);
