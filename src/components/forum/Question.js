import React from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.svg";
import answerIcon from "../../images/answer.svg";
import { getFormattedDate } from "../../utils/utils";

function Question(props) {
  return (
    <li className="question mb-8">
      <article className="question flex p-6 shadow-md rounded-md justify-between bg-gray-100 border space-x-8 relative">
        <div className="absolute px-4 py-1 top-0 right-0 bg-blue-400 transform -translate-y-5 rounded-sm text-orange-100">
          {props.category}
        </div>
        <div className="image w-1/6 flex justify-center">
          <img className="w-16 h-16" src={user} alt="User" />
        </div>
        <div className="question-content w-4/6">
          <Link to={`/questions/${props.slug}`} className="hover:bg-gray-300">
            {" "}
            <h3 className="text-xl font-bold">{props.title}</h3>
          </Link>
          <small>
            Authored by:{" "}
            {(props.author && props.author.username) || "Anynomous"} | Created
            on : {getFormattedDate(props.createdAt)}
          </small>
          <p className="question-desc">{props.description.slice(0, 100)}...</p>
        </div>
        <div className="answers w-1/6 flex items-start space-x-2">
          <img className="w-8 h-8" src={answerIcon} alt="answer" />
          <span>{props.answers.length} answers</span>
        </div>
      </article>
    </li>
  );
}

export default Question;
