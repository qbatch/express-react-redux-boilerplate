import { notification } from 'antd';

export const successNotifcation = (title='', description='') => {
  notification.success({
    message: title,
    description,
  })
};

export const errorNotification = (title='', description='') => {
  if(typeof description === 'object') {
    description.errors?.forEach?.(error => {
      notification.error({
        message: title,
        description: error,
      });
    });
  } else {
    notification.error({
      message: title,
      description,
    });
  }
}
