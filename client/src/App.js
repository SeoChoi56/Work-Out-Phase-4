// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MealForm from "./MealForm";
import { NavLink, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Calendar from "./Calendar";
import Workouts from "./Workouts";
import Profile from "./Profile";

function App() {
  const [user, setUser] = useState(null);
  const [needToRegister, setNeedToRegister] = useState(false);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function onLogin(user) {
    setUser(user);
  }

  function onLogout() {
    setUser("");
  }

  function onRegister(value) {
    setNeedToRegister(value);
  }

  if (!user) {
    const componentToRender = needToRegister ? (
      <RegisterPage onLogin={onLogin} onCancelClick={onRegister} />
    ) : (
      <LoginPage onLogin={onLogin} onRegisterClick={onRegister} />
    );
    return componentToRender;
  } else {
    return (
      <div className="nav-links">
        <NavBar onLogout={onLogout} user={user} />
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/meals" element={<MealForm />} />
        </Routes>
      </div>
    );
  }
}

export default App;
