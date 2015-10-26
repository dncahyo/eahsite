<?php
   include '../db.php';
   include '_helper.php';
   
   header('Content-Type: application/json');
   $pdo = Database::connect();
   
   $table_attrs    = array('name','email','city','country','message');
   $q_mark = array_fill(0, count($table_attrs), '?');
   $table_attrs_id = array('name','email','city','country','message','id');
   
   function index(){
       global $pdo;
       $limit = Helper::get_limit($_REQUEST);
       $sql = "SELECT * FROM guest_books ORDER BY id DESC LIMIT " . $limit['offset'] . "," . ($limit['count'] + 1);
       $a=array();
       foreach ($pdo->query($sql) as $row) {
          array_push($a,$row); 
       }
       echo json_encode(array_values($a));
   }
   
   function show(){
        $sql = 'SELECT * FROM guest_books WHERE id = ? ';
        $arr_val = Helper::get_params($_REQUEST, array('id'));
        $q = crud_exec($sql, $arr_val, false);
        $data = $q->fetch(PDO::FETCH_ASSOC);
        echo json_encode($data);
   }
   
   function create(){
        //todo check user token"
        global $table_attrs, $q_mark;
        $sql = "INSERT INTO guest_books (" . join(',', $table_attrs) . ") values(". join(',', $q_mark) .")";
        $arr_val = Helper::get_params($_REQUEST, $table_attrs);
        crud_exec($sql, $arr_val);
        echo json_encode(array('message' => 'done'));
   }
   
   function update(){
         //todo check user token
        global $table_attrs, $table_attrs_id;
        $sql = "UPDATE guest_books  set ". join(' = ?, ', $table_attrs) . " = ? WHERE id = ?";
        $arr_val = Helper::get_params($_REQUEST, $table_attrs_id);
        crud_exec($sql, $arr_val);
        echo json_encode(array('message' => 'done'));
   }
   
   function destroy(){
        //todo check user token
        $sql = "DELETE FROM guest_books  WHERE id = ?";
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
  
  //echo $_REQUEST['model_func'];
  try {
      $methods_arr[$_REQUEST['model_func']]();
  } catch (Exception $e) {
      $res = array('message' => $e->getMessage());
      http_response_code(401);
      echo json_encode($res);
  }
  
   
   
   Database::disconnect();
 ?>