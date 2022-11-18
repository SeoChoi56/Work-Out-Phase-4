Rails.application.routes.draw do
  
  resources :meals
  # resources :reviews
  resources :users
  get "/workouts", to: "workouts#show"
  get "/me", to: "users#show"
  post '/reviews', to: "reviews#create"
  post "/login", to: "sessions#create"
  post "/workouts", to: "workouts#create"
  post "/register", to: "users#register"

  delete "/logout", to: "sessions#destroy"

  patch "/updateUser", to: "users#update"

  post "createworkout", to: "workouts#create"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
