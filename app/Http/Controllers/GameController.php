<?php

namespace App\Http\Controllers;
use Validator;
use App\Game;

use Illuminate\Http\Request;

class GameController extends Controller
{
    private $status = 200;

    public function index() {
        $game = Game::orderBy('created_at', 'desc')->get();
        if(count($game) > 0) {
            return response()-> json([
                'status' => $this->status,
                'success' => true,
                'count' => count($game),
                'message' => 'successful',
                'data' => $game,
            ]);
        } else {
            return response()->json([
                'statue' => 'failed',
                'success' => false,
                'message' => 'Whoops! No game found',
            ]);
        }
    }

    public function createGame(Request $request) {
        // validate inputs
        $validator = Validator::make($request->all(), 
        [
            'name' => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'validation_errors' => $validator->errors(),
            ]);
        }

        $game_name = $request->name;
        if($game_name != '') {
            $game = Game::where('name', $game_name)->first();
            if($game == null) {
                $gameArray = [
                    'name' => $request->name,
                ];
                $create_id = Game::create($gameArray);
                if(!is_null($create_id)) {
                    return response()->json([
                        'status' => $this->status,
                        'success' => true,
                        'message' => 'Game created successfully.',
                        'data' => Game::orderBy('created_at', 'desc')->get(),
                    ]);
                }
                else {
                    return response()->json([
                        'status' => 'failed',
                        'success' => false,
                        'message' => 'Whoops! failed to create'
                    ]);
                }
            }
            else {
                return response()->json([
                    'status' => 'failed',
                    'success' => false,
                    'message' => 'Whoops! the Game exists already.',
                ]);
            }
        }
    }

    public function deleteGame($id) {
        $game = Game::find($id);
        if(!is_null($game)) {
            $delete_status = Game::where('id', $id)->delete();
            $games = Game::orderBy('created_at', 'desc')->get();
            if($delete_status == 1) {
                return response()->json([
                    'status' => $this->status,
                    'success' => true,
                    'message' => 'The game deleted successfully.',
                    'data' => $games,
                ]);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'success' => false,
                    'message' => 'Whoops! failed to delete game. Try again',
                    'data' => $games,
                ]);
            }
        } else {
            return response() -> json([
                'status' => 'failed',
                'success' => false,
                'message' => 'Whoops! no game found with this id',
                'data' => Game::orderBy('created_at', 'desc')->get(),
            ]);
        }
    }
}
