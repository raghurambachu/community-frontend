import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ForumPage from "./forum/ForumPage";
import LandingPage from "./LandingPage";
import LoginPage from "./loginpage/LoginPage";
import RegisterPage from "./registerpage/RegisterPage";
import CreateQuestion from "./createquestion/CreateQuestion";
import QuestionAnswer from "./questionanswer/QuestionAnswer";
import Error from "./Error";

import "highlight.js";

// import Header from "./Header";

function PrivateRoute(props) {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={(routeProps) => (
          <LandingPage
            history={routeProps.history}
            handleIsLoggedIn={props.handleIsLoggedIn}
            isLoggedIn={props.isLoggedIn}
            updateUsername={props.updateUsername}
          />
        )}
      />
      <Route path="/login" exact>
        <Redirect to="/questions" />
      </Route>

      <Route
        path="/questions"
        exact
        render={(routeProps) => (
          <ForumPage
            {...routeProps}
            isLoggedIn={props.isLoggedIn}
            handleIsLoggedIn={props.handleIsLoggedIn}
            updateUsername={props.updateUsername}
          />
        )}
      />

      <Route
        path="/questions/create"
        exact
        render={(routeProps) => (
          <CreateQuestion
            {...routeProps}
            isLoggedIn={props.isLoggedIn}
            handleIsLoggedIn={props.handleIsLoggedIn}
            updateUsername={props.updateUsername}
          />
        )}
      />

      <Route
        path="/questions/:slug"
        render={(routeProps) => (
          <QuestionAnswer
            {...routeProps}
            username={props.username}
            isLoggedIn={props.isLoggedIn}
            handleIsLoggedIn={props.handleIsLoggedIn}
            updateUsername={props.updateUsername}
          />
        )}
      />

      <Route component={Error} />
    </Switch>
  );
}

function PublicRoute(props) {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route
        path="/login"
        exact
        render={(routeProps) => (
          <LoginPage
            handleIsLoggedIn={props.handleIsLoggedIn}
            updateUsername={props.updateUsername}
            returnTo={props.returnTo}
            {...routeProps}
          />
        )}
      />
      <Route
        path="/register"
        exact
        render={(routeProps) => (
          <RegisterPage
            {...routeProps}
            handleIsLoggedIn={props.handleIsLoggedIn}
          />
        )}
      />
      <Route
        path="/questions"
        exact
        render={(routeProps) => (
          <ForumPage
            {...routeProps}
            isLoggedIn={props.isLoggedIn}
            handleIsLoggedIn={props.handleIsLoggedIn}
            handleReturnTo={props.handleReturnTo}
          />
        )}
      />
      <Route
        path="/questions/:slug"
        render={(routeProps) => (
          <QuestionAnswer
            {...routeProps}
            isLoggedIn={props.isLoggedIn}
            handleIsLoggedIn={props.handleIsLoggedIn}
          />
        )}
      />
      <Route component={Error} />
    </Switch>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.updateIsLoggedIn = this.updateIsLoggedIn.bind(this);
    this.handleReturnTo = this.handleReturnTo.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.state = {
      isLoggedIn: false,
      username: localStorage.username || "",
      returnTo: "",
    };
  }

  updateUsername(username) {
    this.setState({ username });
  }

  async componentDidMount() {
    try {
      console.log(this.state);
      if (localStorage.authToken) {
        let verifyUser = await fetch(
          `http://localhost:3000/api/users/verify/${localStorage.authToken}`
        );
        let payload = await verifyUser.json();
        console.log(payload);
        if (payload.username) {
          this.setState({ isLoggedIn: true });
        } else {
          console.log(payload.error);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  updateIsLoggedIn(loginStatus) {
    this.setState({ isLoggedIn: loginStatus });
  }

  handleReturnTo(returnTo) {
    this.setState({ returnTo });
  }

  render() {
    return (
      <>
        <BrowserRouter>
          {this.state.isLoggedIn ? (
            <PrivateRoute
              isLoggedIn={this.state.isLoggedIn}
              handleIsLoggedIn={this.updateIsLoggedIn}
              returnTo={this.state.returnTo}
              username={this.state.username}
              updateUsername={this.updateUsername}
            />
          ) : (
            <PublicRoute
              isLoggedIn={this.state.isLoggedIn}
              handleIsLoggedIn={this.updateIsLoggedIn}
              returnTo={this.state.returnTo}
              handleReturnTo={this.handleReturnTo}
              updateUsername={this.updateUsername}
            />
          )}
        </BrowserRouter>
      </>
    );
  }
}

export default App;
