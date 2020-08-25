<?php

namespace App\Http\Controllers;
use Validator;
use App\Judge;

use Illuminate\Http\Request;

class JudgeController extends Controller
{
    private $status = 200;

    public function index() {
        $judge = Judge::orderBy('name', 'asc')->get();
        if(count($judge) > 0) {
            return response()-> json([
                'status' => $this->status,
                'success' => true,
                'count' => count($judge),
                'message' => 'successful',
                'data' => $judge,
            ]);
        } else {
            return response()->json([
                'statue' => 'failed',
                'success' => false,
                'message' => 'Whoops! No judge found',
            ]);
        }
    }

    public function createJudge(Request $request) {
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

        $judge_name = $request->name;
        if($judge_name != '') {
            $judge = Judge::where('name', $judge_name)->first();
            if($judge == null) {
                $judgeArray = [
                    'name' => $request->name,
                ];
                $create_id = Judge::create($judgeArray);
                if(!is_null($create_id)) {
                    return response()->json([
                        'status' => $this->status,
                        'success' => true,
                        'message' => 'Judge created successfully.',
                        'data' => Judge::orderBy('name', 'asc')->get(),
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
                    'message' => 'Whoops! the Judge exists already.',
                ]);
            }
        }
    }

    public function deleteJudge($id) {
        $judge = Judge::find($id);
        if(!is_null($judge)) {
            $delete_status = Judge::where('id', $id)->delete();
            $judges = Judge::orderBy('name', 'asc')->get();
            if($delete_status == 1) {
                return response()->json([
                    'status' => $this->status,
                    'success' => true,
                    'message' => 'The judge deleted successfully.',
                    'data' => $judges,
                ]);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'success' => false,
                    'message' => 'Whoops! failed to delete judge. Try again',
                    'data' => $judges,
                ]);
            }
        } else {
            return response() -> json([
                'status' => 'failed',
                'success' => false,
                'message' => 'Whoops! no judge found with this id',
                'data' => Judge::orderBy('name', 'asc')->get(),

            ]);
        }
    }
}
