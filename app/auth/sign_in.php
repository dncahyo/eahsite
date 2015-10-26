<?php

include '../db.php';
header('Content-Type: application/json');

$pdo = Database::connect();
session_start();

// username and password sent from form 
$myusername=$_POST['name']; 
$mypassword=md5($_POST['password']); 

// To protect MySQL injection (more detail about MySQL injection)
// $myusername = stripslashes($myusername);
// $mypassword = stripslashes($mypassword);
// $myusername = mysql_real_escape_string($myusername);
// $mypassword = mysql_real_escape_string($mypassword);
$sql="SELECT id, name FROM users WHERE name='$myusername' and password='$mypassword'";
$result=$pdo->query($sql);
$user = $result->fetch();

if($user){
    $_SESSION['user_id'] = $user['id'];
    $res = array('message' => "Successfully log in", 'signed_in' => true, 'user' => $user);
    http_response_code(200);
}
else {
    http_response_code(401);
    $res = array('message' => "Wrong Username or Password", 'signed_in' => false);
}

echo json_encode($res);

Database::disconnect();
?>