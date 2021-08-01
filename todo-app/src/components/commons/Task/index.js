import { useState } from 'react';

import apiURL from '../../../axios/axiosConfig';

import { Card, Checkbox, message } from 'antd';

import './Task.scss';

const Task = ({ user, title, description, duedate, status }) => {
  const [done, setDone] = useState(status);
  const dateFormat = new Date(duedate);

  const handleDone = async (e) => {
    const data = {
      title: title,
      user: user,
    };

    const response = await apiURL.patch('/task/updateTask', data);
    if (response.status === 200) setDone(e.target.checked);
    else message.error('An erroroccurred while updating the task');
  };

  return (
    <Card
      title={title}
      extra={<Checkbox checked={done} onChange={handleDone} />}
      className={done ? 'completed' : ''}
    >
      Description: {description}
      <br />
      Due date: {dateFormat.toLocaleDateString()}
    </Card>
  );
};

export default Task;
