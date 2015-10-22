<?php
   include '../db.php';
   include '_helper.php';
   
   header('Content-Type: application/json');
   $pdo = Database::connect();
   
   function index(){
       global $pdo;
       $sql = 'SELECT * FROM news ORDER BY id DESC';
       $a=array();
       foreach ($pdo->query($sql) as $row) {
          array_push($a,$row); 
       }
       echo json_encode(array_values($a));
   }
   
   function show(){
        $sql = 'SELECT * FROM news WHERE id = ? ORDER BY id DESC';
        $arr_val = Helper::get_params($_REQUEST, array('id'));
        $q = crud_exec($sql, $arr_val, false);
        $data = $q->fetch(PDO::FETCH_ASSOC);
        echo json_encode($data);
   }
   
   function create(){
        //todo check user token
        $sql = "INSERT INTO news (title,description,user_id) values(?, ?, ?)";
        $arr_val = Helper::get_params($_REQUEST, array('title','description', 'user_id'));
        crud_exec($sql, $arr_val);
        echo json_encode(array('message' => 'done'));
   }
   
   function update(){
         //todo check user token
        $sql = "UPDATE news  set title = ?, description = ? WHERE id = ?";
        $arr_val = Helper::get_params($_REQUEST, array('title','description', 'id'));
        crud_exec($sql, $arr_val);
        echo json_encode(array('message' => 'done'));
   }
   
   function destroy(){
        //todo check user token
        $sql = "DELETE FROM news  WHERE id = ?";
        $arr_val = Helper::get_params($_REQUEST, array('id'));
        crud_exec($sql, $arr_val);
        echo json_encode(array('message' => 'done'));
   }
   
   function crud_exec($sql, $arr_val, $set_attr=true){
        global $pdo;
        if ($set_attr){
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        $q = $pdo->prepare($sql);
        $q->execute($arr_val);
        return $q;
   }
   
  $methods = array('index', 'show', 'create', 'update', 'destroy');
  $methods_arr = array();
  foreach ($methods as $method) {
      $methods_arr[$method] = $method;
  }
   
  $methods_arr[$_REQUEST['model_func']]();
   
   
   Database::disconnect();
 ?>