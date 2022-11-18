import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Profile({ user, listOfWorkOuts, setMealToReview, listOfMeals, setWorkoutToReview }) {

  const [workOutReviews, setWorkOutReviews] = useState([])
  const [mealReviews, setMealReviews] = useState([])
  useEffect(() => {
    fetch("/workouts").then((response) => {
      if (response.ok) {
        response
          .json()
          .then((workoutreviews) => {
            setWorkOutReviews(workoutreviews)
          });
      }
    });
  }, []);

  useEffect(() => {
    fetch("/mealsreview").then((response) => {
      if (response.ok) {
        response
          .json()
          .then((mealsreview) => {
            setMealReviews(mealsreview)
          })
      }
    })
  }, [])


  function clickOnWorkOutReviewButton(workout) {
    setWorkoutToReview(workout);
  }

  function clickOnMealReviewButton(meal) {
    setMealToReview(meal)
  }

  //Displays User Reviews
  const showWorkoutReviewList = workOutReviews.map((review) => {
    return (
      <div className="grid">
        <div>
          <div className="bg-white p-3 border-2 border-black rounded-md ">
            <h3 className="font-mono font-bold">Exercise Name:</h3>
            <p>{review.name}</p>
            <h3 className="font-mono font-bold">Difficulty:</h3>
            <p>{review.difficulty}</p>
            <h3 className="font-mono font-bold">My Review:</h3>
            <p>{review.reviews[0].comment}</p>
          </div>

          <br></br>
        </div>
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
        <div className="">
        <div  className="p-3 border-2 border-black rounded-md">
          <p className="font-mono">{workout.name}</p>
          <p className="font-mono">{workout.difficulty}</p>
          <p className="font-mono">{workout.muscle}</p>
          <button className="border-4 border-red-400 bg-red-400 rounded-md">Delete Work-Out</button>
          <NavLink to={`/workout/review`}>
            <button
              className="border-4 border-red-400 bg-red-400 rounded-md"
              onClick={() => clickOnWorkOutReviewButton(workout)}>
              Write A Review
            </button>
          </NavLink>
        </div>
        <br></br>
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
    <div className="justify-center items-center p-10 flex flex-col max-h-max font-mono bg-[url('/public/image.png')]">
      <div className="p-4">
        <NavLink to="/profilesettings">
          <button className="border-4 border-red-400 bg-red-400 rounded-md text-sm" >Edit User Settings</button>
        </NavLink>
      </div>
      <h3 className="font-extrabold text-2xl">Hi, {user.name}!</h3>
      <img alt="avatar" src={user.image} width={100} height={100} />
      <br></br>
      <div className="bg-white border-2 border-gray-200 rounded-md text-xl font-bold">
        <h4>Meals List</h4>
      </div>
      {mealShowList}
      <br></br>
      <div className="bg-white border-2 border-gray-200 rounded-md text-xl font-bold">
        <h4>Workout List</h4>
      </div>
      {workOutShowList}
      <br></br>
      <div className="bg-white border-2 border-gray-200 rounded-md text-xl font-bold">
        <h4>My Reviews</h4>
      </div>

      <div>
        {showMealReviewList}
      </div>
      <br></br>
      <div>
        {showWorkoutReviewList}
      </div>

    </div>
  );
}

export default Profile;
