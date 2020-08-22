<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Judge extends Model
{
    protected $table = 'judges';

    protected $fillable = ['name', 'player_id', 'game_id', 'vote_plus', 'vote_minus'];
}
