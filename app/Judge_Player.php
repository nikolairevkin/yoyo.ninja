<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Judge_Player extends Model
{
    protected $table = 'judge_players';

    protected $fillable = ['judge_id', 'game_id', 'player_id'];
}