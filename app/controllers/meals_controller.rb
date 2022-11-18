class MealsController < ApplicationController

    def create 
    end

    def show 
        user = User.find_by(id: session[:user_id])
        render json: user.meals.to_json(:include => :reviews)
    end

end
