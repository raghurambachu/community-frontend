import React from "react";
import questions from "../../images/questions.svg";

function HeroSection() {
  return (
    <div className="hero-section bg-gray-100 p-10 pt-24">
      <div className="container mx-auto grid grid-cols-2">
        <div className="image">
          <img src={questions} alt="Questions" />
        </div>
        <div className="content text-center">
          <h2 className="text-2xl font-bold text-gray-700 mt-16">
            For Community, By Community
          </h2>
          <div className="w-4/5 mx-auto text-left text-gray-600 px-5">
            <p className="mt-8 mb-4">
              The life of a developer is nothing less than learning through
              errors. Often the time is spent on debugging and each time one may
              encounter a new error which may not be possible to fanthom.
            </p>
            <p>
              We at <span className="font-bold">Sangha Samadhan</span> aim to
              cater to the needs of developers. Here just post your question or
              doubt on the forum, and you will be answered by our incredibly
              large forum members and fellow developers. We bridge the gap...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
