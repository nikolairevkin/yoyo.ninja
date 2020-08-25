<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Judge extends Model
{
    protected $table = 'judges';

    protected $fillable = ['name'];

    public function getJudgesByGameANDPlayer($game, $player) {
        $judges = $this->query()->select(["judges.id", 'judges.name', 'judges.created_at', 'judges.updated_at', 'judge_players.vote_plus', 'judge_players.vote_minus'])
            ->join('judge_players', 'judges.id', '=', 'judge_players.judge_id')
            ->where('judge_players.player_id', '=', $player)
            ->where('judge_players.game_id', '=', $game)
            ->get();
        return $judges;
    }
}