import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import Login from '../pages/_app';

const Paths = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/login' component={Login} exact />
        <Route path='/home' component={Home} exact />
      </Switch>
    </Router>
  );
};
export default Paths;
