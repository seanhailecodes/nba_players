FROM ruby:3.2.0

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
    build-essential \
    libpq-dev \
    nodejs \
    postgresql-client

# Set working directory
WORKDIR /app

# Copy Gemfile
COPY Gemfile ./

# Install bundler and generate new Gemfile.lock
RUN gem install bundler:2.1.4
RUN bundle install

# Copy the rest of the application
COPY . .

# Expose port 3001
EXPOSE 3001

RUN rails db:create RAILS_ENV=production || true
RUN rails db:migrate RAILS_ENV=production
RUN rails db:seed RAILS_ENV=production

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3001"]