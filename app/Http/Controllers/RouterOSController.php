<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\RouterosAPI;
use App\Models\RouterOS;
use Exception;
use Illuminate\Support\Facades\Validator;



class RouterOSController extends Controller
{
    public $API = [];
    public $routerosData = [];
    public $connection;

    public function index(){
        $routerosAll =  RouterOS::all();
        return response()->json([
            'success' => true,
            'routers' => $routerosAll 
        ]);

    }
    /*public function testApi(){
        try {
            return response()->json([
                'success' => true,
                'message' => 'Welcome in Routeros Api'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetch data Routeros API'
            ]);
        }
    }*/

    public function storeRouteros($data){

        $API =new  RouterosAPI;
        $connection = $API->connect($data['ip_address'], $data['login'], $data['password']);

        if(!$connection) return response()->json(['error' => true, 'message' => 'Router not connectd ...'], 404);

        $storeRouterosData = [
            'identity' => $API->comm('/system/identity/print')[0]['name'],
            'ip_address' => $data['ip_address'],
            'login' => $data['login'],
            'password' => $data['password'],
            'connect' => $connection
        ];
        //var_dump($storeRouterosData);

        //Save to db
        $storeRouteros = new RouterOS;
        $storeRouteros->identity = $storeRouterosData['identity'];
        $storeRouteros->ip_address = $storeRouterosData['ip_address'];
        $storeRouteros->login = $storeRouterosData['login'];
        $storeRouteros->password = $storeRouterosData['password'];
        $storeRouteros->connect = $storeRouterosData['connect'];
        $storeRouteros->save();
        
        //var_dump($storeRouteros);
        return response()->json([
            'success' => true,
            'message' => 'Router has been saved to db',
            'storeRouteros' => $storeRouteros
        ]);


       // var_dump($API->comm('/system/identity/print')); die();

    }
// make connection with us routeros (Mikrotik)
    public function routerConnection(Request $request){
        try {
            //code...
            $validator = Validator::make($request->all(), [
                'ip_address' => 'required',
                'login' => 'required',
                'password' => 'required'
            ]);

            if($validator->fails()) return response()->json($validator->errors(),404);

            $req_data = [
                'ip_address' => $request->ip_address,
                'login' => $request->login,
                'passoword' => $request->password
            ];

            $routerDB = RouterOS::where('ip_address', $req_data['ip_address'])->get();

            if(count($routerDB) > 0){
                if($this->checkRouterConnect($request->all())):
                    return response()->json([
                    'connect' => true,
                    'message' => 'Router have connection form db',
                    'routerosData' => $this->routerosData
                ]);
                else:
                    return response()->json([
                        'error' => true,
                        'message' => 'Router no connected check with administrator'
                    ]);
                endif;
            }else{
                return $this->storeRouteros($request->all());
            }
            //echo count($routerDB);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetch data Routeros API'
            ]);
        }
    }

    // check router connected
    public function checkRouterConnect($data){
        //var_dump($data[0]['identity']); die;

        $API = new RouterosAPI;
        $connection = $API->connect($data['ip_address'], $data['login'], $data['password']);
            if(!$connection) return false;

            $this->API = $API;
            $this->connection = $connection;
            $this->routerosData = [
                'identity' => $this->API->comm('/system/identity/print')[0]['name'],
                'ip_address' => $data['ip_address'],
                'login' => $data['login'],
                'password' => $data['password'],
                'connect' => $connection
            ];

            return true;
        //var_dump($connection);
    }
  
    // get list queue

    public function getQueue(){
        $router = RouterOS::first();
        $API = new RouterosAPI;
        

        if(!$router) return response()->json(['Error' => true,'message' => 'Router not found in the DB' ], 404);

        // make connection with router (Mikrotik)
        //return bool = true o false
        $API = new RouterosAPI;
        $connection = $API->connect($router->ip_address, $router->login, $router->password);
        //var_dump($connection); die;

        if(!$connection) return response()->json([
            'error' => true,
            'message' => 'Router not connected ...'
        ]);

        //get the list queue in the mikrotik
        // $getQueData return a Array []
        $getQueueData = $API->comm('/queue/simple/print');
        $queueConvertEncoding = mb_convert_encoding($getQueueData, 'UTF-8', 'UTF-8');

        $API->disconnect();
 
        return response()->json([
            'success' => true,
            'queue' => $queueConvertEncoding
        ]);

    }

/**
 * Remove a router specified
 * 
 */
public function destroy($id){
    $router = RouterOS::find($id);
    if (empty($router)) {
        # coderey...
        return response()->json([
            'success' => true,
            'message' => 'Router not exist'
        ]); 
    }
    $router->delete($id);
    return response([
        'success' => true,
        'message' => 'router delete successfully'
    ]);
}


    
}
