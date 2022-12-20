import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email);
        console.log(name);
        console.log(password);

        const vals = { name, email, password};

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
            if (data.registered) {
              alert("User registered!")
            }
          });
        
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label>email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label>password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}

