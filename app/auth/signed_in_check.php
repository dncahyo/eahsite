<?php
include '../db.php';
session_start();
$pdo = Database::connect();
if(isset( $_SESSION['user_id'] ))
{
    $message = 'User is already logged in';
    $sql="SELECT id, name FROM users WHERE id=" . $_SESSION['user_id']. "";
    $result=$pdo->query($sql);
    $user = $result->fetch();
    $res = array('message' => $message, 'signed_in' => true, 'user'=> $user);
    http_response_code(200);
}else{
    $message = 'User is signed out';
    $res = array('message' => $message, 'signed_in' => false);
    http_response_code(401);
}

 echo json_encode($res);
?>