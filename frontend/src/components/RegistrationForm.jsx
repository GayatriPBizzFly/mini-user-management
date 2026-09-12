import { useState } from "react";

function RegistrationForm({ onUserRegistered }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  // Copy all existing form data and update the field whose input was changed with its new value.

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.age) {
      return alert("Please fill all fields");
    }

    if (form.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      setForm({ name: "", email: "", password: "", age: "" });
      onUserRegistered();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register User</h2>

      <div><input name="name" placeholder="Name"
        value={form.name} onChange={handleChange} /> </div>

      <div><input name="email" type="email" placeholder="Email"
        value={form.email} onChange={handleChange} />
      </div>

      <div><input name="password" type="password" placeholder="Password"
        value={form.password} onChange={handleChange} /></div>

      <div><input name="age" type="number" placeholder="Age"
        value={form.age} onChange={handleChange} /></div>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;