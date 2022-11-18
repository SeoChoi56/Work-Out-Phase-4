import React, { useState, useEffect } from "react";

function WorkOutReviews({ itemToReview }) {
  const [newItem, setNewItem] = useState({
    rating: 0,
    comment: "",
  });

  function handleChange(e) {
    console.log(e.target.value);
    const value = e.target.type === "radio" ? e.target.checked : e.target.value;
    const key = e.target.type === "radio" ? e.target.id : e.target.name;
    console.log(key, value);
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
      body: JSON.stringify({ ...newItem, ...itemToReview }),
    })
    // navigate("/")
  }

  return (
    <div>
      <label htmlFor="review">Review: </label>
      <textarea
        name="comment"
        cols="60"
        rows="5"
        onChange={handleChange}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default WorkOutReviews;
