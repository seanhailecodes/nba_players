source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.2.0'

gem 'rails', '~> 7.1.0'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 6.0'
gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.16.0', require: false
gem 'rack-cors'
gem 'jwt'

group :development, :test do
  gem 'debug', platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  gem 'listen', '~> 3.8'
  gem 'spring'
end