import React, { useState, useEffect } from "react";

function MealsReviews({ setMealToReview }) {
    
    const [newItem, setNewItem] = useState({
        rating: 0,
        comment: "",
    });

    function handleChangeMeal(e) {
        console.log(e.target.id, "this is from meals")
        const value = e.target.type === "radio" ? e.target.checked : e.target.value;
        const key = e.target.type === "radio" ? e.target.id : e.target.name;
        setNewItem({
            ...newItem,
            [key]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(itemToReview, "this is from the submit call")
        fetch(`/reviewm`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...newItem, ...setMealToReview})
        })
    }

    return (
        <div>
            <label htmlFor="review">Review: </label>
            <textarea
                name="comment"
                cols="60"
                rows="5"
                onChange={handleChangeMeal}
            ></textarea>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
};

export default MealsReviews