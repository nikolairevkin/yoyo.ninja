<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;
use App\Judge;
use App\Player;

class VoteController extends Controller
{
    private $status = 200;

    public function index() {
        $selectedGame = Game::orderBy('created_at', 'asc')->first();
        $games = Game::orderBy('created_at', 'asc')->get();
        $player = new Player;
        $players = $player->orderBy('name', 'asc')->get();
        $selectedPlayer = $player->orderBy('name', 'asc')->first();
        $judges = Judge::orderBy('name', 'asc')->get();
        $selectedJudge = $judges->first();

        return response()->json([
            'status' => $this->status,
            'success' => true,
            'data' => [
                'games' => $games,
                'players' => $players,
                'judges' => $judges,
                'selectedGame' => $selectedGame,
                'selectedPlayer' => $selectedPlayer,
                'selectedJudge' => $selectedJudge,
            ],
        ]);
    }
}