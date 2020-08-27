<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Judge;
use App\Player;
use App\Game;
use App\Judge_Player;


class DashController extends Controller
{
    private $status = 200;

    public function index() {
        $top = 5;
        $game = new Game;
        $games = $game->selectGameWithPlayer();
        if(count($games)>0){
            $selectedGame = $games->first();
            $player = new Player;
            $players = $player->getPlayersByGame($selectedGame->id, $top);
            $originCount = (is_array($players) ? count($players) : 0);
            if($originCount > 0){
                $selectedPlayer = $players[0];
                $judge = new Judge;
                $judges = $judge->getJudgesByGameANDPlayer($selectedGame->id, $selectedPlayer->id);
                if(count($judges) > 0){
                    return response() -> json([
                        'status' => $this->status,
                        'success' => true,
                        'data' => [
                            'games' => $games,
                            'players' => $players,
                            'judges' => $judges,
                            'selectedGame' => $selectedGame,
                            'selectedPlayer' => $selectedPlayer,
                        ]
                    ]);
                } else {
                    return response() -> json([
                        'status' => "failed",
                        'success' => false,
                        'msg' => 'No judges'
                    ]);
                }
            } else {
                return response() -> json([
                    'status' => "failed",
                    'success' => false,
                    'msg' => 'No players',
                    'data' => [
                        'games' => $games,
                        'selectedGame' => $selectedGame,
                    ]
                ]);
            }
        }else {
            return response() -> json([
                'status' => "failed",
                'success' => false,
                'msg' => 'No games'
            ]);
        }

    }

    public function selectPlayer(Request $request) {
        $game = new Game;
        $games = $game->selectGameWithPlayer();
        $selectedGame = $request->game;
        $game = Game::where('id', '=', $selectedGame)->first();
        $top = $request->top;
        $player = new Player;
        $players = $player->getPlayersByGame($selectedGame, $top);
        $originalWherecount = is_array($players) ? count($players) : 0;
        if($originalWherecount > 0) {
            $selectedPlayer = $players[0];
            $judge = new Judge;
            $judges = $judge->getJudgesByGameANDPlayer($selectedGame, $selectedPlayer->id);
            if(count($judges) > 0) {
                return response() -> json([
                    'status' => $this->status,
                    'success' => true,
                    'data' => [
                        'games' => $games,
                        'players' => $players,
                        'judges' => $judges,
                        'selectedGame' => $game,
                        'selectedPlayer' => $selectedPlayer,
                    ]
                ]);
            } else {
                return response() -> json([
                    'status' => "failed",
                    'success' => false,
                    'msg' => 'No judges'
                ]);
            }
        } 
        else {
            return response() -> json([
                'status' => "failed",
                'success' => false,
                'msg' => 'No player',
            ]);
        }
    }

    public function selectJudge(Request $request) {
        $game = $request->game;
        $player = $request->player;
        $judge = new Judge;
        $judges = $judge->getJudgesByGameANDPlayer($game, $player);
        if(count($judges) > 0) {
            return response()->json([
                "status" => $this->status,
                'success' => true,
                "data" =>  [
                    'judges' => $judges,
                ],
            ]);
        } else {
            return response() -> json([
                'status' => 'failed',
                'success' => false,
                'msg' => 'No judge',
            ]);
        }
    }

    public function saveVotes(Request $request) {
        $game = $request->game;
        $player = $request->player;
        $judge = $request->judge;
        $vote_plus = $request->vote_plus;
        $vote_minus = $request->vote_minus;

        $game_id = Game::where('name', '=', $game)->first()->id;
        $player_id = Player::where('name', '=', $player)->first()->id;
        $judge_id = Judge::where('name', '=', $judge)->first()->id;
        $result = Judge_Player::updateOrInsert(
            ['game_id'=> $game_id, 'player_id' => $player_id, 'judge_id' => $judge_id],
            ['vote_plus' => $vote_plus, 'vote_minus' => $vote_minus]
        );
        if(!is_null($result)) {
            return response()->json([
                'status' => $this->status,
                'success' => true,
            ]);
        } else {
            return response() ->json([
                'status' => 'failed',
                'success' => false,
            ]);
        }
    }
}