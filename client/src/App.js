import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import TopMenu from './components/TopMenu/TopMenu';

import { AuthenticationProvider } from './ctx/authentication';
import AuthRoute from './utilities/AuthRoute';

import './App.css';

function App() {
  return (
    <AuthenticationProvider>
      <Router>
        <div className="ui container">
          <TopMenu />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
        </div>
      </Router>
    </AuthenticationProvider>
  );
}

export default App;
