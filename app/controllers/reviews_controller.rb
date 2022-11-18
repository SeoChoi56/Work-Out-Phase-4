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
        byebug
        if @workout.save
        else
            render 'new'
        end
    end

    private

    def review_params
        params.require(:review).permit(:rating, :comment, 
        :name, :equipment, :muscle, :category, :difficulty)
    end
end
