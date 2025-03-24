<?php
require_once '../model/db.php';
session_start();
Class Logout extends Database{

    private $logTable = "log";

    public function log(){
$logQuery = $this->conn->prepare("INSERT INTO {$this->logTable} (sid, time, date, name, course, username, status) VALUES (:sid, :time, :date, :name, :course, :username, :status)");
date_default_timezone_set('Asia/Colombo');
$time = date("H:i:s");
$date = date("Y-m-d");
$status = 'logout';
// Bind parameters
$logQuery->bindParam(":sid", $_SESSION['sid']);
$logQuery->bindParam(":time", $time);
$logQuery->bindParam(":date", $date);
$logQuery->bindParam(":name", $_SESSION['studentName']);
$logQuery->bindParam(":course", $_SESSION['course']);
$logQuery->bindParam(":username", $_SESSION['indexNo']);
$logQuery->bindParam(":status", $status);
    
// Execute the log insertion query
$logQuery->execute();
    }

}

$logout = new Logout();
$logout->log();
session_unset();


session_destroy();

// Redirect to the index page
header("Location: ../index.html");
exit();
?>