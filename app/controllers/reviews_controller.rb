class ReviewsController < ApplicationController

    def new
      @review = Review.new
    end

    def create
        @meal = Meal.create
        @workout = Workout.create(
          name: review_params[:name], equipment: review_params[:equipment], 
          muscle: review_params[ :muscle], category: review_params[:category],
           difficulty: review_params[:difficulty]
          )
        @workout.reviews.create(
         rating: review_params[:rating], meal_id: @meal.id,
        comment: review_params[:comment],
         user_id: session[:user_id])
        if @workout.save
        else
            render 'new'
        end
    end

    def mealcreate
      # might need workout id to create
      byebug
      @workout = Workout.create
      @meal = Meal.create(
        name: meal_review_params[:food["label"]], 
        calories: meal_review_params[:food["nutrients"]["ENERC_KCAL"]],
        reviews: meal_review_params[:reviews]
      )
      @meal.reviews.create(
        rating: meal_review_params[:rating],
        #might need this 
        workout_id: @workout.id,
        comment: meal_review_params[:comment],
        user_id: session[:user_id]
      )
      if @meal.save 
      else
        render 'new'
      end
      
    end

    private

    def review_params
        params.permit(:rating, :comment, 
        :name, :equipment, :muscle, :category, :difficulty, :review)
        # require(:review)
    end

    def meal_review_params
      params.permit(:name, :calories, :review, :rating, :comment)
    end

end
