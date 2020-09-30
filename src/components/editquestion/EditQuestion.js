import React from "react";
import Header from "../general/Header";

import hljs from "highlight.js";
import "highlight.js/styles/darcula.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// import { axios } from "../../utils/utils";

hljs.configure({
  languages: ["javascript", "html"],
});

class EditQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      desc: "",
      markup: "",
      category: "programming",
      tags: "",
      error: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    // url,method,data,auth
    const { slug } = this.props.match.params;
    // console.log(
    //   axios(
    //     `/questions/${slug}`,
    //     "GET",
    //     null,
    //     localStorage.authToken
    //   ).then((res) => console.log(res))
    // );
    fetch(`${process.env.REACT_APP_URL}/api/questions/${slug}`)
      .then((res) => res.json())
      .then(({ question }) => this.setState({ ...question }));
  }
  handleSubmit(e) {
    e.preventDefault();
    const { slug } = this.props.match.params;

    fetch(`${process.env.REACT_APP_URL}/api/questions/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        question: {
          category: this.state.category,
          description: this.state.desc,
          markup: this.state.markup,
          title: this.state.title,
          tags: this.state.tags,
        },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.question) {
          this.props.history.push(`/questions/${slug}`);
        } else {
          this.setState({ error: res.error });
        }
      });
  }

  handleInput({ target: { value, name } }) {
    this.setState({ [name]: value });
  }

  handleQuillChange(html, delta, source, editor) {
    this.setState({ markup: html, desc: editor.getText() });
  }

  render() {
    return (
      <div className="create-question-page min-h-screen bg-gray-100 text-gray-700">
        <Header
          history={this.props.history}
          handleIsLoggedIn={this.props.handleIsLoggedIn}
          isLoggedIn={this.props.isLoggedIn}
          updateUsername={this.props.updateUsername}
        />
        <div className="container mx-auto  pt-16 md:px-16 lg:px-0 ">
          <h2 className="my-8 mb-4 text-3xl font-bold">Edit a question?</h2>
          <p className="error text-red-400 mb-4">{this.state?.error}</p>
          <div className="grid grid-cols-3 gap-8">
            <section className="col-span-2 ">
              <article className="create-question rounded-md shadow-md p-4 bg-blue-100">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group mb-4">
                    <label className="block text-lg font-bold" htmlFor="title">
                      Title
                    </label>
                    <small>
                      Be specific and imagine you’re asking a question to
                      another person
                    </small>
                    <input
                      className="w-full px-4 py-2 outline-none border focus:outline-none"
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInput}
                      disabled={true}
                      id="title"
                      placeholder="eg. Is there any cheat sheet for VS Code?"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-lg font-bold">Body</label>
                    <small>
                      Include all the information someone would need to answer
                      your question
                    </small>
                    <div className="editor pb-16">
                      <ReactQuill
                        className="h-48 "
                        value={this.state.markup}
                        onChange={this.handleQuillChange}
                        modules={EditQuestion.modules}
                        formats={EditQuestion.formats}
                      />
                    </div>
                    <h3 className="md:mt-4 lg:mt-0">Output:</h3>
                    <div
                      className="editor-output my-2"
                      dangerouslySetInnerHTML={{
                        __html: !this.state.desc ? "" : this.state.markup,
                      }}
                    ></div>
                  </div>
                  <div className="flex space-x-10   ">
                    <select
                      className="category w-1/2 py-2 focus:outline-none"
                      name="category"
                      id="category"
                      value={this.state.category}
                      onChange={this.handleInput}
                    >
                      <option value="programming">Programming</option>
                      <option value="math">Math</option>
                      <option value="software">Software Issues</option>
                    </select>
                    <input
                      type="text"
                      className="w-1/2 p-2 focus:outline-none"
                      name="tags"
                      value={this.state.tags}
                      onChange={this.handleInput}
                      placeholder="comma separated tags eg: javascript,go "
                    />
                  </div>
                  <button
                    type="submit"
                    className="my-4 btn bg-blue-400 text-blue-100 "
                    onSubmit={this.handleSubmit}
                  >
                    Submit Question
                  </button>
                </form>
              </article>
            </section>
            <section className="sidebar col-span-1"></section>
          </div>
        </div>
      </div>
    );
  }
}

EditQuestion.modules = {
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

EditQuestion.formats = [
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

export default EditQuestion;
