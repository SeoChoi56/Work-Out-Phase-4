import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile({ user, listOfWorkOuts, setMealToReview, listOfMeals,setWorkoutToReview }) {

  const [workOutReviews, setWorkOutReviews] = useState([])
  const [mealReviews, setMealReviews] = useState([])
  useEffect(() => {
    fetch("/workouts").then((response) => {
      if (response.ok) {
        response
          .json()
          .then((workoutreviews) => {
            setWorkOutReviews(workoutreviews)
          } );
      }
    });
  }, []);

  useEffect(()=> {
    fetch("/mealsreview").then((response) => {
      if (response.ok) {
        response 
          .json()
          .then((mealsreview) => {
            setMealReviews(mealsreview)
          } )
      }
    })
  }, [])


  function clickOnWorkOutReviewButton(workout) {
    setWorkoutToReview(workout);
  }

  function clickOnMealReviewButton(meal){
    setMealToReview(meal)
  }

  //Displays User Reviews
  const showWorkoutReviewList = workOutReviews.map((review) => {
    return (
      <div>
        <p>Exercise Name: {review.name}</p>
        <p>Difficulty: {review.difficulty}</p>
        <p>MY Review: {review.reviews[0].comment}</p>
      </div>
    )
  })

  const showMealReviewList = mealReviews.map((meal) => {
    console.log(meal)
    return (
      <div>
        <p>Meal Name: {meal.food.label}</p>
        <p>Calories: {meal.food.nutrients.ENERC_KCAL}</p>
        <p>MY Review: {meal.reviews[0].comment}</p>
      </div>
    )  
  })

  //DISPLAYS USER INFO
  //MIGHT NEED ADDITIONAL CODE FOR MEALS AND WORKOUTS IF NEED BE
  let workOutShowList = [];
  if (listOfWorkOuts?.length > 0) {
    workOutShowList = listOfWorkOuts.map((workout) => {
      return (
        <div className="show-Work-Out-on-Profile">
          <p>{workout.name}</p>
          <p>{workout.difficulty}</p>
          <p>{workout.muscle}</p>
          <button>Delete Work-Out</button>
          <NavLink to={`/workout/review`}>
            <button onClick={() => clickOnWorkOutReviewButton(workout)}>
              Write A Review
            </button>
          </NavLink>
        </div>
      );
    });
  }

  let mealShowList = [];
  if (listOfMeals?.length > 0) {
    mealShowList = listOfMeals.map((meal) => {
      return (
        <div>
          <img className="w-100 h-100" src={meal.food.image} />
          <p>{meal.food.label}</p>
          <p>{meal.food.nutrients["ENERC_KCAL"]}</p>
          <div className="p-4">
            <button className="border-4 border-red-400 bg-red-400 rounded-md">
              Delete Meals
            </button>
            <NavLink to={`/meal/review`}>
            <button
              className="border-4 border-red-400 bg-red-400 rounded-md"
              onClick={() => clickOnMealReviewButton(meal)}
            >
              Write Review
            </button>
            </NavLink>
          </div>
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
      {mealShowList}
      <h4>Workout List</h4>
      {workOutShowList}
      <h4>My Reviews</h4>
      {showMealReviewList}
      {showWorkoutReviewList}
    </div>
  );
}

export default Profile;
