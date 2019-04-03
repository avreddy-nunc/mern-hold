// Node.JS
import React from "react";
import ReactDOM from "react-dom";
import  {BrowserRouter as Router, Switch, Route, } from "react-router-dom"
import Home from "./components/Home";
import List from "./components/List";

class App extends React.Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/list'} exact component={List} />
          </Switch>
        </Router>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));


module.hot.accept();