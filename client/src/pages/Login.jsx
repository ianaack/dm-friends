import React from "react";

export default function Login() {
  return (
   
      
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" name="username" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Password</label>
            <span className="signup-span">
              Not a member yet?
              <a className="signup-link" href="/signup">
                Sign up
              </a>
            </span>
          </div>
          <button href="/">Submit</button>
        </form>
      </div>
  );
}
