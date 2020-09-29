import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="min-h-screen font-bold text-6xl bg-blue-200 flex flex-col justify-center items-center">
      <p>
        Page Not Found
        <span role="img" aria-label="exclamation">
          ❗
        </span>
      </p>
      <Link
        className="text-2xl border-b-4 border-blue-500 hover:border-blue-300"
        to="/"
      >
        Home
      </Link>
    </div>
  );
}

export default Error;
