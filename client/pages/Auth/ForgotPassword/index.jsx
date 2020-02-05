import React from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { forgotPassword } from '../../../api/auth';
import { forgotPasswordSuccess, forgotPasswordFailure } from '../../../actions/auth';

const ForgotPassword = ({ form }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.loader.isLoading);

  const { getFieldDecorator } = form;

  const handleFormSubmit = e => {
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(forgotPassword(values, forgotPasswordSuccess, forgotPasswordFailure));
      }
    });
  }

  return (
    <Form onSubmit={handleFormSubmit} className='auth-form'>
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
        <Button type='primary' htmlType='submit' loading={isLoading} block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  )
};

export default Form.create({ name: 'forgot_password_form' })(ForgotPassword);
