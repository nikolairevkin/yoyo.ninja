<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJudgePlayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('judge__players', function (Blueprint $table) {
            $table->id();
            $table->integer('judge_id');
            $table->integer('game_id');
            $table->integer('player_id');
            $table->integer('vote_plus');
            $table->integer('vote_minus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('judge__players');
    }
}
