import React from "react";
// import { Link } from "react-router-dom";

import Header from "../general/Header";
import Question from "./Question";

class ForumPage extends React.Component {
  constructor() {
    super();
    this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
    this.state = {
      isLoading: true,
      questions: [],
    };
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_URL}/api/questions`;
    fetch(url)
      .then((res) => res.json())
      .then((questions) => {
        if (questions.error) {
          this.setState({ questions: [], isLoading: false });
        } else {
          this.setState({ questions, isLoading: false });
        }
      })
      .catch((err) => console.error(err));
  }

  handleCreateQuestion(e) {
    // check if whether user is logged in
    if (this.props.isLoggedIn) {
      //  redirect to create questions page.
      this.props.history.push("/questions/create");
    } else {
      // set returnTo in the App state
      const returnTo = this.props.history.location.pathname;
      this.props.handleReturnTo(returnTo);
      // and go to the login page.
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header
          history={this.props.history}
          handleIsLoggedIn={this.props.handleIsLoggedIn}
          isLoggedIn={this.props.isLoggedIn}
          updateUsername={this.props.updateUsername}
        ></Header>
        <main className="container mx-auto my-8 pt-16">
          {/* <ul className="type flex space-x-6 text-lg">
            <li>
              
              <Link to="/questions">Latest</Link>
            </li>
            <li>
          
              <Link to="/questions">Popular</Link>
            </li>
            <li>
             
              <Link to="/questions">Categories</Link>
            </li>
          </ul> */}

          <section className="grid grid-cols-4 gap-16 my-6 text-gray-700">
            <div className="questions col-span-3">
              <h2 className="text-xl mb-6">You have searched for : reactjs</h2>

              {!this.state.isLoading ? (
                this.state.questions.length ? (
                  <ul className="questions">
                    {this.state.questions.map((question) => (
                      <Question key={question._id} {...question} />
                    ))}
                  </ul>
                ) : (
                  <div>
                    No questions yet, be the first one to ask the question.
                  </div>
                )
              ) : (
                <div className="animate-spin w-8 h-8 bg-blue-500"></div>
              )}
            </div>
            <div className="sidebar col-span-1">
              <button
                onClick={this.handleCreateQuestion}
                className="w-full font-bold text-blue-100 bg-blue-400 text-center py-2 block rounded-md hover:bg-blue-500 transition duration-300"
              >
                Ask Question
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default ForumPage;
