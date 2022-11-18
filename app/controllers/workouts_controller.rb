class WorkoutsController < ApplicationController

    def create
       
    end

    def show
        user = User.find_by(id: session[:user_id])
        # reviews = user.reviews
        render json: user.workouts.to_json(:include => :reviews)
    end

    private 

    def workout_params() 
        params.permit(:name, :equipment)
    end

end
