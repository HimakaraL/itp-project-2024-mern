import React, { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";

const ClientSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error, isLoading } = useSignUp();
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = async (e) => {
    if (userType == "admin" && secretKey != "CLL") {
      e.preventDefault();
      alert("Invalid Admin Key");
    } else {
      e.preventDefault();
      await signUp(email, password, userType);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundSize: "cover",
        backgroundImage:
          "url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg')",
      }}
    >
      <div className="max-w-screen-xl px-4 pt-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">
            Get started today
          </h1>

          <p className="max-w-md mx-auto mt-4 text-center text-white">
            Welcome to our signup page! Just like how the perfect lighting can
            transform a space, your registration here marks the beginning of an
            illuminated journey with us.
          </p>

          <form
            onSubmit={handleSubmit}
            action="#"
            className="p-4 mb-0 space-y-4 rounded-lg shadow-lg signUp sm:p-6 lg:p-8"
          >
            <p className="text-2xl font-bold text-center">Sign up</p>

            <div>
              <div className="flex my-4">
                <p className="font-bold">Register As :</p>

                <div className="ml-8 ">
                  <input
                    type="radio"
                    name="UserType"
                    value="user"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  User
                </div>
                <div className="ml-8 ">
                  <input
                    type="radio"
                    name="UserType"
                    value="admin"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  Admin
                </div>
              </div>

              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {userType == "admin" ? (
              <div>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Enter admin key"
                  />
                </div>
              </div>
            ) : null}

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type="password"
                  className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <span className="absolute inset-y-0 grid px-4 end-0 place-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400 size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            {error && (
              <div className="font-bold text-red-700 text-md error">
                {error}
              </div>
            )}
            <button
              disabled={isLoading}
              type="submit"
              className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            >
              Sign Up
            </button>

            <p className="font-bold text-center text-white text-md">
              Already have an account?
              <a className="ml-2 underline" href="/client/dashboard/login">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientSignUp;
