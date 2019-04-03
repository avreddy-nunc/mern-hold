// Node.JS
import React from "react";
import ReactDOM from "react-dom";
import  {BrowserRouter as Router, Switch, Route,NavLink } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { AppBar } from "@material-ui/core"
import Home from "./components/Home";
import List from "./components/List";

const theme = createMuiTheme({
    palette: {
        primary: {
            light : blue[300],
            main : blue[500],
            dark: blue[700],
            contrastText: '#fff'
        },
        secondary: {
            light : pink[300],
            main: pink[500],
            dark: pink[700],
            contrastText: '#fff'
        }
    }
});
class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme} >
                <Router>
                    <AppBar position={"sticky"}>
                        <NavLink to={'/'} className={'nav-link'}>Home</NavLink>
                        <NavLink to={'/list'} className={'nav-link'}>List</NavLink>
                    </AppBar>
                    <Switch>
                        <Route path={'/'} exact component={Home} />
                        <Route path={'/list'} exact component={List} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));


module.hot.accept();