import './app.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import {Courses} from "./courses";
import {Course} from "./course";

/**
 * Quizzz application.
 */
export function App() {
  return <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Courses</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <Courses />;
        </Route>
        <Route path="/courses/:courseId">
          <Course />
        </Route>
      </Switch>
    </div>
  </Router>;
}
