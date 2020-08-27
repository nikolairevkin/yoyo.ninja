<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $table = 'games';

    protected $fillable = ['name'];

    public function selectGameWithPlayer() {
        $games = $this->query()->select(['games.id', 'games.name'])
            ->rightJoin('judge_players', 'games.id', '=', 'judge_players.game_id')
            ->orderBy('games.created_at', 'desc')
            ->groupBy('games.name', 'games.id', 'games.created_at', 'games.updated_at')
            ->get();
        return $games;
    }
}
