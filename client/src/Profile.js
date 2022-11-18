import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function Profile({ user, listOfWorkOuts, setItemToReview }) {
  useEffect(() => {
    fetch("/workouts").then((response) => {
      if (response.ok) {
        response
          .json()
          .then((events) => console.log(events, "events consoleod"));
      }
    });
  }, []);

  function clickOnReviewButton(workout) {
    setItemToReview(workout);
  }

  //DISPLAYS USER INFO
  //MIGHT NEED ADDITIONAL CODE FOR MEALS AND WORKOUTS IF NEED BE
  console.log(listOfWorkOuts);
  let workOutShowList = [];
  if (listOfWorkOuts?.length > 0) {
    workOutShowList = listOfWorkOuts.map((workout) => {
      console.log(workout, "workout here");
      return (
        <div className="show-Work-Out-on-Profile">
          <p>{workout.name}</p>
          <p>{workout.difficulty}</p>
          <p>{workout.muscle}</p>
          <button>Delete Work-Out</button>
          <NavLink to={`/workout/review`}>
            <button onClick={() => clickOnReviewButton(workout)}>
              Write A Review
            </button>
          </NavLink>
        </div>
      );
    });
  }

  return (
    <div>
      <NavLink to="/profilesettings">
        <button>Edit User Settings</button>
      </NavLink>
      <h3>hi! {user.name}</h3>
      <img alt="avatar" src={user.image} width={100} height={100} />
      <h4>Meals List</h4>
      <h4>Workout List</h4>
      {workOutShowList}
    </div>
  );
}

export default Profile;
