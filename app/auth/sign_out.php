<?php
session_start();
session_destroy();
echo json_encode(array('message' => 'Logged out', 'signed_in' => false));
?>