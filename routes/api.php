<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('players', 'PlayerController@index');

Route::post('player', 'PlayerController@createPlayer');

Route::delete('player/{id}', "PlayerController@deletePlayer");

Route::get('games', 'GameController@index');

Route::post('game', 'GameController@createGame');

Route::delete('game/{id}', "GameController@deleteGame");

Route::get('judges', 'JudgeController@index');

Route::post('judge', 'JudgeController@createJudge');

Route::delete('judge/{id}', "JudgeController@deleteJudge");

Route::get('votes', "VoteController@index");