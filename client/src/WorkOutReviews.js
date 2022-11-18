import React, { useState, useEffect } from "react";

function WorkOutReviews({ setWorkoutToReview }) {
  const [newItem, setNewItem] = useState({
    rating: 0,
    comment: "",
  });

  function handleChange(e) {
    console.log(e.target.id, "from workouts")
    const value = e.target.type === "radio" ? e.target.checked : e.target.value;
    const key = e.target.type === "radio" ? e.target.id : e.target.name;
    setNewItem({
      ...newItem,
      [key]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if (newItem.title === "" || newItem.bookmark === "" || newItem.image === ""
    // ) {
    //     return alert("No fields can be blank, excpet viewing source")
    // }
    fetch(`/reviews`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newItem, ...setWorkoutToReview }),
    })
    // navigate("/")
  }

  return (
    <div className="p-5">
      <label htmlFor="review" className="text-sm font-mono">Review: </label>
      <div>
        <textarea
          className="border-2 border-gray-400 text-sm rounded-sm "
          name="comment"
          cols="60"
          rows="5"
          onChange={handleChange}
        ></textarea>
      </div>
      <button className="border-4 bg-red-400 border-red-400 p-1 text-md rounded-md text-xs" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default WorkOutReviews;
