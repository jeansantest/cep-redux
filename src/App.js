import { Switch, Route } from 'react-router-dom';
import Search from './pages/Search';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Search} />
    </Switch>
  );
}

export default App;
