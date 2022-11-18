// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import WorkOutReviews from "./WorkOutReviews";
import RegisterPage from "./RegisterPage";
import MealForm from "./MealForm";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Calendar from "./Calendar";
import WorkOutForm from "./WorkOutForm";
import Profile from "./Profile";
import ProfileSettings from "./ProfileSettings";
import MealsReviews from "./WorkOutReviews";

function App() {
  const [user, setUser] = useState(null);
  const [needToRegister, setNeedToRegister] = useState(false);
  const [userWorkOuts, setUserWorkOuts] = useState([]);
  const [userMeals, setUserMeals] = useState([])
  const [workoutToReview, setWorkoutToReview] = useState(null);
  const [mealsToReview, setMealsToReview] = useState(null);

  //CHECKS TO SEE IF CURRENT USER MATCHES SESSION USER
  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  //SETS USER AND HANDLES STATE FOR SHOWING COMPONENTS
  function onLogin(user) {
    setUser(user);
  }

  function onLogout() {
    setUser("");
    setUserWorkOuts([])
    setUserMeals([])
    setWorkoutToReview(null)
    setMealsToReview(null)
  }

  function onRegister(value) {
    setNeedToRegister(value);
  }

  //SETS USER WORKOUTS
  function getUserWorkOut(workout) {
    console.log("this is from app to set the data");
    console.log(workout);
    setUserWorkOuts([...userWorkOuts, workout]);
    console.log(userWorkOuts);
  }

  //SETS USER MEALS
  function getUserMeals(meals) {
    setUserMeals([...userMeals, meals])
  }

  //REQUEST BACKEND TO UPDATE MY SHIT
  function updateUserInfo(user) {
    setUser(user);
    //call fetch to update current user info on the backend
    fetch("/updateUser", {
      method: "PATCH",
      body: JSON.stringify({
        username: user.username,
        name: user.name,
        image: user.image,
        meal: user.meal,
        workout: user.workout,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
  }

  //GETS THE WORKOUT TO REVIEW
  function getWorkoutsToReview(item) {
    setWorkoutToReview(item);
  }

  //GETS MEALS TO REVIEW
  function getMealsToReview(item) {
    setMealsToReview(item)
  }

  if (!user) {
    //RENDER BASED ON REGISTER OR LOGIN
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
          <Route
            path="/workouts"
            element={<WorkOutForm getWorkOuts={getUserWorkOut} />}
          />
          <Route path="/meals" element={<MealForm getMeals={getUserMeals}/>} />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                setUser={setUser}
                listOfWorkOuts={userWorkOuts}
                setMealToReview={getMealsToReview}
                setWorkoutToReview={getWorkoutsToReview}
                listOfMeals={userMeals}
              />
            }
          />
          <Route
            path="/profilesettings"
            element={
              <ProfileSettings user={user} updateUserInfo={updateUserInfo} />
            }
          />
          <Route
            path="/workout/review"
            element={<WorkOutReviews setWorkoutToReview={workoutToReview} />}
          />
          <Route 
            path="/meal/review" 
            element={<MealsReviews setMealToReview={mealsToReview}/>} />
        </Routes>
      </div>
    );
  }
}

export default App;
