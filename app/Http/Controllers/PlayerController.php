<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Player;

class PlayerController extends Controller
{
    private $status = 200;

    public function index() {
        $player = Player::orderBy('name', 'asc')->get();
        if(count($player) > 0) {
            return response()-> json([
                'status' => $this->status,
                'success' => true,
                'count' => count($player),
                'message' => 'successful',
                'data' => $player,
            ]);
        } else {
            return response()->json([
                'statue' => 'failed',
                'success' => false,
                'message' => 'Whoops! No player found',
            ]);
        }
    }

    public function createPlayer(Request $request) {
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

        $player_name = $request->name;
        if($player_name != '') {
            $player = Player::where('name', $player_name)->first();
            if($player == null) {
                $playerArray = [
                    'name' => $request->name,
                ];
                $create_id = Player::create($playerArray);
                if(!is_null($create_id)) {
                    return response()->json([
                        'status' => $this->status,
                        'success' => true,
                        'message' => 'Player created successfully.',
                        'data' => Player::orderBy('name', 'asc')->get(),
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
                    'message' => 'Whoops! the player exists already.',
                ]);
            }
        }
    }

    public function deletePlayer($id) {
        $player = Player::find($id);
        if(!is_null($player)) {
            $delete_status = Player::where('id', $id)->delete();
            $players = Player::orderBy('name', 'asc')->get();
            if($delete_status == 1) {
                return response()->json([
                    'status' => $this->status,
                    'success' => true,
                    'message' => 'The player deleted successfully.',
                    'data' => $players,
                ]);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'success' => false,
                    'message' => 'Whoops! failed to delete player. Try again',
                    'data' => $players,
                ]);
            }
        } else {
            return response() -> json([
                'status' => 'failed',
                'success' => false,
                'message' => 'Whoops! no player found with this id',
                'data' => Player::orderBy('name', 'asc')->get(),

            ]);
        }
    }
}
