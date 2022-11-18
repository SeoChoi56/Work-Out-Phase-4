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
            body: JSON.stringify({ ...newItem, ...setMealToReview })
        })
    }

    return (
        <div className="p-3">
            <label htmlFor="review" className="text-sm font-mono">Review: </label>
            <div>
                <textarea
                    className="border-2 border-gray-400 text-sm rounded-sm"
                    name="comment"
                    cols="60"
                    rows="5"
                    onChange={handleChangeMeal}
                ></textarea>
            </div>

            <button className="border-4 bg-red-400 border-red-400 p-1 text-md rounded-md text-xs" onClick={handleSubmit}>Submit</button>
        </div>
    )
};

export default MealsReviews