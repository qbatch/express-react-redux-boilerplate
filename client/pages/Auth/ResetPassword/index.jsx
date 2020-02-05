import React from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { resetPassword } from '../../../api/auth';
import { resetPasswordSuccess, resetPasswordFailure } from '../../../actions/auth';

const ResetPassword = ({ form }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.loader.isLoading);

  const { resetPasswordToken } = useParams();

  const { getFieldDecorator } = form;

  const handleFormSubmit = e => {
    e.preventDefault();

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(resetPassword({ ...values, resetPasswordToken }, resetPasswordSuccess, resetPasswordFailure));
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
    <Form onSubmit={handleFormSubmit} className='auth-form'>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your New Password!' }],
        })(
          <Input.Password placeholder='New Password' />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('confirmPassword', {
          rules: [{
            required: true, message: 'Please confirm your New password!',
          }, {
            validator: comparePasswords,
          }],
        })(
          <Input.Password placeholder='Confirm New Password' />
        )}
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading} block>
          Update Password
        </Button>
      </Form.Item>
    </Form>
  )
};

export default Form.create({ name: 'reset_password_form' })(ResetPassword);
