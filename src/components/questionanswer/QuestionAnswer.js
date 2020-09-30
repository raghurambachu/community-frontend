import React from "react";
import Header from "../general/Header";
import { getFormattedDate } from "../../utils/utils";
import { Link } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/darcula.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

hljs.configure({
  languages: ["javascript", "html"],
});

class QuestionAnswer extends React.Component {
  constructor() {
    super();
    // markup and text properties are associated with posting an answer
    this.state = {
      question: null,
      answers: [],
      markup: "",
      text: "",
      error: "",
    };
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }
  componentDidMount() {
    const slug = this.props.match.params.slug;
    fetch(`${process.env.REACT_APP_URL}/api/questions/${slug}`)
      .then((res) => res.json())
      .then((question) => {
        console.log(question.question);
        this.setState({
          question: question.question,
          answers: question?.question?.answers,
        });
      });
  }

  handleQuillChange(html, delta, source, editor) {
    this.setState({ markup: html, text: editor.getText() });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch(
      `${process.env.REACT_APP_URL}/api/questions/${this.state.question._id}/answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.authToken,
        },
        body: JSON.stringify({
          answer: {
            markup: this.state.markup,
            text: this.state.text,
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.setState((prevState) => {
          return {
            answers: [...prevState.answers, res.answer],
            text: "",
            markup: "",
            error: "",
          };
        });
      });
  }

  handleDelete(answerId) {
    console.log(answerId);
    fetch(`${process.env.REACT_APP_URL}/api/answers/${answerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.authToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          this.setState({ error: res.error });
        } else {
          this.setState((prevState) => {
            const answers = prevState.answers.filter(
              (ans) => ans._id !== res.answer
            );
            console.log(answers);
            return {
              answers: answers,
            };
          });
        }
      });
  }

  handleUpvote(answerId) {
    fetch(`${process.env.REACT_APP_URL}/api/answers/${answerId}/upvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.authToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          this.setState({ error: res.error });
        } else {
          let answers = this.state.answers.map((answer) => answer);
          if (res.existsInDownvotes) {
            answers = answers.map((answer) => {
              if (answer.downvotes.includes(res.userId)) {
                answer.downvotes = answer.downvotes.filter(
                  (downVoter) => downVoter !== res.userId
                );
              }
              return answer;
            });
          }
          if (!res.alreadyExists) {
            answers = answers.map((answer) => {
              if (answer._id.toString() === res.answerId.toString()) {
                return { ...answer, upvotes: [...answer.upvotes, res.userId] };
              }
              return answer;
            });
            this.setState({ answers });
          } else {
            this.setState({
              error: "You have already upvoted this, you can't upvote again.",
            });
          }
        }
      });
  }

  handleDownvote(answerId) {
    fetch(`${process.env.REACT_APP_URL}/api/answers/${answerId}/downvote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.authToken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          this.setState({ error: res.error });
        } else {
          let answers = this.state.answers.map((answer) => answer);
          if (res.existsInUpvotes) {
            answers = answers.map((answer) => {
              if (answer.upvotes.includes(res.userId)) {
                answer.upvotes = answer.upvotes.filter(
                  (upVoter) => upVoter !== res.userId
                );
              }
              return answer;
            });
          }

          if (!res.alreadyExists) {
            answers = answers.map((answer) => {
              if (answer._id.toString() === res.answerId.toString()) {
                return {
                  ...answer,
                  downvotes: [...answer.downvotes, res.userId],
                };
              }
              return answer;
            });
            this.setState({ answers });
          } else {
            this.setState({
              error:
                "You have already downvoted this, you can't downvote again.",
            });
          }
        }
      });
  }

  render() {
    return (
      <div className="min-h-screen">
        <Header
          history={this.props.history}
          handleIsLoggedIn={this.props.handleIsLoggedIn}
          isLoggedIn={this.props.isLoggedIn}
          updateUsername={this.props.updateUsername}
        />
        <div className="question-answer container mx-auto pt-16 pb-8 text-gray-700 ">
          {this.state.error && (
            <p className="text-red-100 px-4 py-2 fixed right-0 bottom-0 font-bold text-lg bg-red-400 z-10 ">
              {this.state.error}
            </p>
          )}
          <div className="question-container grid grid-cols-3">
            {this.state.question && (
              <article className="question col-span-2 mt-8">
                <h2 className="text-2xl font-bold">
                  {this.state.question.title}
                </h2>
                <div className="mb-4 flex justify-between">
                  <small>
                    Asked on: {getFormattedDate(this.state.question.createdAt)}{" "}
                    | By : {this.state.question.author.username}
                  </small>
                  {this.state.question.author.username ===
                    localStorage.username && (
                    <Link to={`/questions/edit/${this.state.question.slug}`}>
                      <span className="btn text-xs cursor-pointer text-blue-100 bg-blue-300 hover:bg-blue-400">
                        Edit Question
                      </span>
                    </Link>
                  )}
                </div>
                <div
                  className="question-markup"
                  dangerouslySetInnerHTML={{
                    __html: this.state.question.markup.replace(
                      /<p><br><\/p>/g,
                      ""
                    ),
                  }}
                ></div>
                <div className="tags flex space-x-2">
                  {this.state.question.tags[0].split(",").map((tag, i) => (
                    <span
                      key={i}
                      className="block px-2 bg-blue-300 text-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )}
          </div>
          <div className="answer-container grid grid-cols-3 mt-6">
            <div className="col-span-2">
              <h2 className="text-xl font-bold mb-8">
                {this.state.answers?.length} answers
              </h2>
              <ul className="mb-8">
                {this.state.answers &&
                  this.state.answers.map((answer, i) => (
                    <li className="mb-10 border-b pb-4 relative flex" key={i}>
                      <div className="reputation w-32 px-4 flex flex-col items-center text-gray-600">
                        <GoTriangleUp
                          size={32}
                          className="cursor-pointer hover:text-gray-400"
                          onClick={() => {
                            console.log(answer._id);
                            this.handleUpvote(answer._id);
                          }}
                        />
                        <span>
                          {answer.upvotes.length - answer.downvotes.length}
                        </span>
                        <GoTriangleDown
                          size={32}
                          className="cursor-pointer hover:text-gray-400"
                          onClick={() => this.handleDownvote(answer._id)}
                        />
                      </div>
                      <div className="relative w-full">
                        <article
                          dangerouslySetInnerHTML={{ __html: answer.markup }}
                        ></article>
                        <div className="flex justify-between font-bold text-sm">
                          <h4>Answered by : {answer.author.username}</h4>
                          <p>
                            Answered on : {getFormattedDate(answer.createdAt)}{" "}
                          </p>
                        </div>
                        {this.props.username === answer.author.username && (
                          <div className="absolute right-0 top-0 -mt-8 space-x-4 z-10">
                            <button
                              className="text-xs btn py-1 bg-blue-300 text-blue-100 hover:cursor-pointer hover:text-blue-500"
                              to="/"
                            >
                              Edit
                            </button>
                            <button
                              className="text-xs btn bg-blue-300 text-blue-100 hover:text-blue-500 "
                              onClick={() => this.handleDelete(answer._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
              <div>
                <h2 className="text-lg font-bold">Know the answer? </h2>
                <form onSubmit={this.handleSubmit}>
                  <ReactQuill
                    className="h-40 mb-16"
                    value={this.state.markup}
                    onChange={this.handleQuillChange}
                    modules={QuestionAnswer.modules}
                    formats={QuestionAnswer.formats}
                  />
                  <button
                    type="submit"
                    className="btn bg-blue-400 text-blue-100 font-bold"
                  >
                    Submit Answer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

QuestionAnswer.modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["code-block"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

QuestionAnswer.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code-block",
];

export default QuestionAnswer;
