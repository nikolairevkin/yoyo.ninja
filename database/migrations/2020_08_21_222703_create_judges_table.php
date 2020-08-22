<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJudgesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('judges', function (Blueprint $table) {
            $table->id();
            $table->string('name');
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
        Schema::dropIfExists('judges');
    }
}
