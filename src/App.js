import { Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import UserInfo from './pages/UserInfo';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Search} />
      <Route exact path="/info" component={UserInfo} />
    </Switch>
  );
}

export default App;
