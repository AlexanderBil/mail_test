import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService";
import './../App.css';

const RegisterPage = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
      username: "",
      password: "",
      email: "",
      submitted: false,
      loading: false,
      error: ""
  });

  const handleChange = (e) => {
      
      const { name, value } = e.target;
      setUser((prev) => ({
          ...prev,
          [name]: value
        }));
    }

    
    const handleSubmit = (e) => {
      e.preventDefault();
  
      setUser((prev) => ({
          ...prev,
          submitted: true
        }));
      const { username, email, password } = user;
  
      if (!(username && password && email)) {
        return;
      }
  
      setUser((prev) => ({
          ...prev,
          loading: true
        }));
      userService.register(username, email, password).then(
        user => {
          navigate('/')
        },
        error => 
        setUser((prev) => ({
          ...prev,
           error,
           loading: false 
        }))
      );
    }
    const { username, email, password, submitted, loading, error } = user;
  return (
    <div className="header-register">
    <h2>Register</h2>
    <form name="form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
            {submitted && !username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {submitted && !email && (
              <div className="help-block">Email is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {submitted && !password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button disabled={loading}>
              Register
            </button>
            <button onClick={() => navigate(-1)} className="btn btn-primary" disabled={loading}>
              Back
            </button>
            {loading && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </div>
          {error && <div className={"alert alert-danger"}>{error}</div>}
        </form>
    </div>
  );
};

export default RegisterPage;