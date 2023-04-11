import React from "react";

export default function Signup() {
  return (
    <div className="login-box">
      <h2>Signup</h2>
      <form>
        <div className="user-box">
          <input type="text" name="username" required />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type="email" name="email" required />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input type="password" name="password" required />
          <label>Password</label>
          <span className="signup-span">
            <a className="signup-link" href="/">
              Login
            </a>
          </span>
        </div>
        <button href="/">Submit</button>
      </form>
    </div>
  );
}
