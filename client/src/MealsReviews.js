
function MealsReviews({ itemToReview }) {
    
    const [newItem, setNewItem] = useState({
        rating: 0,
        comment: "",
    });

    function handleChange(e) {
        const value = e.target.type === "radio" ? e.target.checked : e.target.value;
        const key = e.target.type === "radio" ? e.target.id : e.target.name;

        setNewItem({
            ...newItem,
            [key]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(itemToReview)
        fetch(`/reviewm`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...newItem, ...itemToReview})
        })
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
    )
};

export default MealsReviews