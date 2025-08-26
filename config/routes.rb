Rails.application.routes.draw do
  root 'players#index'
  get '/seed_data', to: 'players#seed_data'
  resources :players
  post '/auth/login', to: 'authentication#login'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end