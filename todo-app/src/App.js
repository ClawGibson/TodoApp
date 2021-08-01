import MainLayout from './components/layouts/MainLayout';
import Routes from './routes/Paths';

import './styles/App.scss';
import 'antd/dist/antd.css';

function App() {
  return (
    <MainLayout>
      <Routes />
    </MainLayout>
  );
}

export default App;
