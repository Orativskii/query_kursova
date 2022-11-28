import './App.css';
import SignIn from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import Container from "@mui/material/Container";
import EditingTestPage from "./pages/QueriesEditing/EditingTestPage";
import PassingTestPage from "./pages/PassingTest/PassingTest";

function App() {
    return (
        <Container width="70%" key={window.location.href}>

            <Router>

                <Switch>
                    <Route exact path="/">
                        {localStorage.getItem("userId") ? <MainPage/> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/tests/:uuid/editing">
                        {localStorage.getItem("userId") ? <EditingTestPage /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/tests/:uuid/pass">
                        {localStorage.getItem("userId") ? <PassingTestPage /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/login">
                        <SignIn/>
                    </Route>
                    <Route path="/signup">
                        <SignUpPage/>
                    </Route>
                    <Route path="/*">
                        {localStorage.getItem("userId") ? <MainPage/> : <Redirect to="/login" />}
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
}

export default App;
