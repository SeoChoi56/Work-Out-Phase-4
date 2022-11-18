import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function MealCard({ name, image, calories, getMeals, currentMeal }) {
  function addMealsToList(currentMeal) {
    getMeals(currentMeal)
  }

  return (
      <div className="cards">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia component="img" height="150" image={image} alt="food" />
            <CardContent>
              <Typography gutterBottom variant="h7" component="div">
                <div className="food-name">
                  <h2>{name}</h2>
                </div>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <div className="calories">
                  <h3>{calories} calories</h3>
                </div>
              </Typography>
              <button className="border-2 border-red-400 bg-red-400 rounded-md text-sm" 
                onClick={()=> addMealsToList(currentMeal)}>Add Meal to Plan</button>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
  );
}

export default MealCard;
