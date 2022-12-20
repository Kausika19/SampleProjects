import React, { useState, useEffect } from "react";

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [logStatus, setLogStatus] = useState('false');

  const [user, setUser] = useState('');

  

  const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(email);
      console.log(password);

      const status = "login";
      console.log(status)


      const vals = {email, password, status};

      console.log(vals)

        const response = await fetch("http://localhost:5000/login_app/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
        .then(res => {
          if (!res || !res.ok || res.status >= 400) {
            return;
          }
          return res.json();
        })
        .then(data => {
          if (data.loggedIn) {
            alert("Logged In!")
            setLogStatus(true)
            setUser(data.us)
            return <></>
          }else{
            alert("Logging In Failed!")
          }
        });
    }

    return logStatus === true ? (
    <div className="auth-form-container">
        <h1>Welcome</h1>
        <h4>Hello</h4>   
      </div>
    ) : (  
      <div className="auth-form-container">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
              <label>email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
              <label>password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
              <button type="submit">Log In</button>
          </form>
          <button onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
      </div>
  )
}