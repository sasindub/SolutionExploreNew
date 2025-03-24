<?php
require_once '../model/db.php';
// Import PHPMailer classes into the global namespace 
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\SMTP; 
use PHPMailer\PHPMailer\Exception; 
 
// Include library files 
require 'PHPMailer/Exception.php'; 
require 'PHPMailer/PHPMailer.php'; 
require 'PHPMailer/SMTP.php'; 


session_start();



Class Post extends Database{
//insert post
private $tableName = 'post';
function insertPost(){
    // Define the target folder
$targetFolder = "../postFiles/";

$title = $_POST['title'];
$problem = $_POST['problem'];

// Check if the folder exists, create it if not
if (!file_exists($targetFolder)) {
  mkdir($targetFolder, 0777, true);
}

// Handle file upload
$targetFile = $targetFolder . basename($_FILES["file"]["name"]);
move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile);

date_default_timezone_set('Asia/Colombo');
$date = date('Y-m-d'); // Format: YYYY-MM-DD
$time = date('H:i:s');

// Insert into the database
$stmt = $this->conn->prepare("INSERT INTO {$this->tableName} (postdate, img, sid, time, status, course, name, image, title, postData, isDelete) VALUES (:date, :img, :sid, :time, '', :course, :namee, '" .$_SESSION['pimage']."' , :title, :postData, '0')");
$fileName = basename($_FILES["file"]["name"]);
// Bind parameters
$stmt->bindParam(":img", $fileName);
$stmt->bindParam(":sid", $_SESSION['sid']);
$stmt->bindParam(":namee", $_SESSION['studentName']);
$stmt->bindParam(":title", $title);
$stmt->bindParam(":postData", $problem);
$stmt->bindParam(":time", $time);
$stmt->bindParam(":date", $date);
$stmt->bindParam(":course", $_SESSION['course']);

$stmt->execute();



echo 0;
}

}

   



$post = new Post;
$post->insertPost();


