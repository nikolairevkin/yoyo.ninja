<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Judge extends Model
{
    protected $table = 'judges';

    protected $fillable = ['name'];

    public function selectJudgeByPlayerGame($player_id, $game_id) {
        $judge_ids = DB::table('judge_players')
            ->where('player_id', '=', $player_id)
            ->where('game_id', '=', $game_id)
            ->groupBy('judge_id');
        
        $judges = [];

        foreach ($judge_ids as $judge_id ) {
            $judge = $this->query()->where('id', '=', $judge_id);
            array_push($judges, $judge);
        }

        return $judges;
    }
}
