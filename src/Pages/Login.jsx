import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Make sure to create this CSS file or reuse SignUp.css

export default function Login() {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://rama-mangoes.onrender.com/api/login/LoginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userRole", json.user.role);
      if(json.user.role === 'admin')
      {
        navigate('/admin-manage');
      }
      else
      {
        navigate('/');
      }
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </>
  );
}
