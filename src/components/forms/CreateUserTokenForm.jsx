import React, { useState, useEffect } from 'react';


const CreateUserTokenForm = ({ onTokenCreated }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createToken = async (e, email, password) => {
    console.log("email: ", email, " password: ", password);
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch("http://localhost:9000/auth/customer/emailpass/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message && data.message.includes("Identity with email already exists")) {
          setErrorMessage("This email is already taken.");
        } else {
          setErrorMessage(data.message || "Registration failed.");
        }
        return;
      }

      onTokenCreated(data.token);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("A server connection error occurred.");
    }
  }


  return (
    <div className="container py-5 flex-grow-1">

        <form className='userForm' onSubmit={(e) => createToken(e, email, password)} style={{margin: "100px auto"}}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Enter your email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Create a password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Continue
        </button>

      </form>
    </div>
  );
};

export default CreateUserTokenForm;
