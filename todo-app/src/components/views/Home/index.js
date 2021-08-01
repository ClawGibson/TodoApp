import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import apiURL from '../../../axios/axiosConfig';

import { Row, Col, Typography, Input, Button, DatePicker } from 'antd';
import { PlusCircleOutlined, LoginOutlined } from '@ant-design/icons';

import Task from '../../commons/Task';

import './Home.scss';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [currentTask, setCurrentTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const history = useHistory();
  const user = useSelector((state) => state.todoAppStore);

  const { Title } = Typography;

  useEffect(() => {
    fetchTasks();
    return () => {
      setTasks([]);
    };
  }, []);

  const fetchTasks = async () => {
    const data = {
      user: user.id,
    };

    const response = await apiURL.get('/task/all', {
      params: data,
    });

    setTasks(response?.data);
  };

  const handleDueDate = (date) => {
    setDueDate(date.format('YYYY-MM-DD HH:mm:ss'));
  };

  const handleAddTask = async () => {
    const data = {
      user: user.id,
      title: title,
      duedate: dueDate,
      description: currentTask,
    };

    const response = await apiURL.post('/task', data);
    fetchTasks();
  };

  const handleLogOut = () => {
    history.replace('/login');
  };

  return (
    <div className='home-container'>
      <Button
        type='link'
        onClick={handleLogOut}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          color: '#FF0000',
        }}
        icon={<LoginOutlined />}
      >
        Log out
      </Button>
      <Title level={1}>To do App</Title>
      <Row>
        <Title level={3}>Title</Title>
        <Input
          label='Title'
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '2rem' }}
        />
        <Title level={4}>Description</Title>
        <Input
          placeholder='To do...'
          onChange={(e) => setCurrentTask(e.target.value)}
        />
        <Row gutter={[0, 12]} justify='space-between' style={{ width: '100%' }}>
          <Col xs={24} xl={11}>
            <DatePicker
              onChange={handleDueDate}
              format='YYYY/MM/DD'
              style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}
            />
          </Col>
          <Col xs={24} xl={11}>
            <Button
              type='primary'
              onClick={handleAddTask}
              icon={<PlusCircleOutlined />}
              style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Row>
      <div className='tasks-container'>
        {tasks?.length > 0 ? (
          tasks?.map((task) => (
            <Col xs={24} xl={22}>
              <Task
                key={task.title}
                user={task.user}
                title={task.title}
                status={task.status}
                duedate={task.duedate}
                description={task.description}
              />
            </Col>
          ))
        ) : (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <Title level={2}>Add some tasks</Title>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
