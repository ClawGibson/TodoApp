import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import apiURL from '../../../axios/axiosConfig';

import { Row, Col, Typography, Input, Button, DatePicker } from 'antd';

import Task from '../../commons/Task';

import './Home.scss';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [currentTask, setCurrentTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const user = useSelector((state) => state.todoAppStore);

  const { Title } = Typography;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = {
      user: user.id,
    };

    const response = await apiURL.get('/task/all', data);

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

  return (
    <div className='home-container'>
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
              style={{ width: '100%', marginTop: '1rem', marginBottom: '1rem' }}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Row>
      {tasks?.length > 0 ? (
        tasks?.map((task) => <Task />)
      ) : (
        <Row>Loading...</Row>
      )}
    </div>
  );
};

export default Home;
