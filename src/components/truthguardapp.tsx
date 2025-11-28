import React, { useState } from "react";

interface Props {
  onLogin: () => void;
}

const TruthGuardApp: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (email && password) {
      onLogin(); // Trigger login success in App.tsx
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default TruthGuardApp;
