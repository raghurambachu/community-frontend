import React from "react";
import is1 from "../../images/is-1.svg";
import is2 from "../../images/is-2.svg";
import is3 from "../../images/is-3.svg";

function InfoSection() {
  return (
    <div className="info-section p-8 ">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4 ">
        For Developers, By Developers
      </h2>
      <p className="w-3/5 mx-auto text-md text-center text-gray-800 mb-8 ">
        Our mission is to help developers write the script of the future.{" "}
        <span className="font-bold font-lg">Sangha Samadhan</span> is an open
        community for anyone that codes. We help you get answers to your
        toughest coding questions, share knowledge with your coworkers and
        fellow developers.
      </p>
      <div className="container my-8 mx-auto text-gray-700 flex justify-evenly">
        <article className="card p-4 py-8 shadow-lg w-1/4 rounded-lg text-center hover:shadow-xl cursor-pointer">
          <div className="flex justify-center">
            <img
              src={is1}
              className="w-24 h-24"
              alt="Info Section - Browse questions"
            />
          </div>
          <h3 className="text-lg font-bold my-4">Browse Questions</h3>
          <p className=" px-1">
            Get answers to more than 16.5 million questions and give back by
            sharing your knowledge with others.
          </p>
          <button className="btn border rounded-md bg-blue-400 text-blue-100 my-4">
            Browse Questions
          </button>
        </article>
        <article className="card p-4 py-8 shadow-lg w-1/4 rounded-lg text-center hover:shadow-xl cursor-pointer">
          <div className="flex justify-center">
            <img src={is2} className="w-24 h-24" alt="Info Section - Rewards" />
          </div>
          <h3 className="text-lg font-bold my-4">Get Rewards</h3>
          <p className=" px-1">
            More you get upvotes(recs) more you would be incentivised either in
            the form of Amazon coupons or through our other partners.
          </p>
          <button className="btn border rounded-md bg-blue-400 text-blue-100 my-4">
            Know More
          </button>
        </article>
        <article className="card p-4 py-8 shadow-lg w-1/4 rounded-lg text-center hover:shadow-xl cursor-pointer">
          <div className="flex justify-center">
            <img src={is3} className="w-24 h-24" alt="Info Section - Img 1" />
          </div>
          <h3 className="text-lg font-bold my-4">Get Hired</h3>
          <p className=" px-1">
            Not only you help your peers to solve their issues, you will be
            recognised & will increase your visibility to Hiring Partners
          </p>
          <button className="btn border rounded-md bg-blue-400 text-blue-100 my-4">
            Hiring Partners
          </button>
        </article>
      </div>
    </div>
  );
}

export default InfoSection;
