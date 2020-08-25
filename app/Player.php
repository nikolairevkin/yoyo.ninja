<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Player extends Model
{
    protected $table = 'players';
    
    protected $fillable = ['name'];

    public function getPlayersByGame($selectedGame, $top) {
        $rawPlayers = $this->query()->select(["players.id", 'players.name', 'vote_plus', 'vote_minus'])
                ->leftJoin('judge_players', 'players.id', '=', 'judge_players.player_id')
                ->leftJoin('games', 'judge_players.game_id', '=', 'games.id')
                ->where('games.id', '=', $selectedGame)
                ->get();

        if(count($rawPlayers) > 0) {
            $totalPlayers = [];
            $player = $rawPlayers[0];
            for($i = 1 ; $i < count($rawPlayers) ; $i ++){
                if($player->name === $rawPlayers[$i]->name){
                    $player->vote_plus += $rawPlayers[$i]->vote_plus;
                    $player->vote_minus += $rawPlayers[$i]->vote_minus;
                    $player->vote = $player->vote_plus - $player->vote_minus;
                } else {
                    array_push($totalPlayers, $player);
                    $player = $rawPlayers[$i];
                }
            }
            array_push($totalPlayers, $player);
            foreach($totalPlayers as $key => $row) {
                $vote[$key] = $row['vote'];
            }
    
            array_multisort($vote, SORT_DESC, $totalPlayers);
    
            $players = [];
            if(count($totalPlayers) < $top) {$top = count($totalPlayers);}
            for($i = 0; $i < $top; $i++) {
                $players[$i] = $totalPlayers[$i];
            }
            return $players;
        } else {
            return 'no Player';
        }


    }
}