import { RecoilRoot } from 'recoil'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from './views/Home'
import Dashboard from './views/Dashboard'
import './App.css'


function App() {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  )
}

export default App
