class PlayersController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :set_player, only: [:show, :update, :destroy]

  # GET /players
 def index
  # Seed data if database is empty
  if Player.count == 0
    Player.create!(name: 'Charles Barkley', photo: 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/787.png', position: 'F', height: '6-6', team: '76ers')
    Player.create!(name: 'Kobe Bryant', photo: 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612747/2015/260x190/977.png', position: 'F', height: '6-6', team: 'Lakers')
    Player.create!(name: 'Michael Jordan', photo: 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/893.png', position: 'G', height: '6-7', team: 'Bulls')
  end
  
  @players = Player.all
  render json: @players
  end

  # GET /players/1
  def show
    render json: @player
  end

  # POST /players
  def create
    @player = Player.new(player_params)

    if @player.save
      render json: @player, status: :created, location: @player
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /players/1
  def update
    if @player.update(player_params)
      render json: @player
    else
      render json: @player.errors, status: :unprocessable_entity
    end
  end

  # DELETE /players/1
  def destroy
    @player.destroy
  end

  # GET /seed_data
  def seed_data
    if Player.count == 0
      Player.create!(name: 'Charles Barkley', photo: 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/787.png', position: 'F', height: '6-6', team: '76ers')
      Player.create!(name: 'Kobe Bryant', photo: 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612747/2015/260x190/977.png', position: 'F', height: '6-6', team: 'Lakers')
      Player.create!(name: 'Michael Jordan', photo: 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/893.png', position: 'G', height: '6-7', team: 'Bulls')
      
      render json: { message: "Seeded #{Player.count} players" }
    else
      render json: { message: "Database already has #{Player.count} players" }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_player
      @player = Player.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def player_params
      params.require(:player).permit(:name, :photo, :position, :height, :team)
    end
end