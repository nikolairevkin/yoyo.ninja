<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $table = 'players';
    
    protected $fillable = ['name'];

    public function selectPlayersByGame($game_id) {
        $players = $this->query()->where('game_id', '=', $game_id)->get();
        return $players;
    }
}
