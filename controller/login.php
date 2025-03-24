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

Class Login extends Database{

    private $tableStudent = "student";
    private $tableLecturer = "lecturer";
    private $logTable = "log";

    public function studentlogin($data){
        $username = $data[0];
        $password = $data[1];
    
        try {
            $stmt = $this->conn->prepare("SELECT index_no, s_password FROM {$this->tableStudent} WHERE index_no = :index_no");
            $stmt->bindParam(":index_no", $username);
    
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);
                    $storedPassword = $row['s_password'];
    
                  
                    if (password_verify($password, $storedPassword)) {
                        // Password is correct

                        if (substr($password, 0, 5) === 'pass@') {
                            $_SESSION['indexNo'] = $username;
                            return 2;
                           
                        } else {
                            $_SESSION['indexNo'] = $username;

                            $stmt2 = $this->conn->prepare("SELECT * FROM {$this->tableStudent} WHERE index_no = :index_no");
                            $stmt2->bindParam(":index_no", $username);
                        
                            
                            $stmt2->execute();
                        
                    
                            $result = $stmt2->fetch(PDO::FETCH_ASSOC);
                        
                          
                            if ($result) {
                                
                                $_SESSION['sid'] = $result['sid'];
                                $_SESSION['course'] = $result['course'];
                                $_SESSION['studentName'] = $result['student_name'];
                                $_SESSION['cphoto'] = $result['cphoto'];
                                $_SESSION['pimage'] = $result['pimage'];
                            }
                            
                            $logQuery = $this->conn->prepare("INSERT INTO {$this->logTable} (sid, time, date, name, course, username, status) VALUES (:sid, :time, :date, :name, :course, :username, :status)");
                            date_default_timezone_set('Asia/Colombo');
                            $time = date("H:i:s");
                            $date = date("Y-m-d");
                            $status = 'login';
// Bind parameters
$logQuery->bindParam(":sid", $result['sid']);
$logQuery->bindParam(":time", $time);
$logQuery->bindParam(":date", $date);
$logQuery->bindParam(":name", $result['student_name']);
$logQuery->bindParam(":course", $result['course']);
$logQuery->bindParam(":username", $_SESSION['indexNo']);
$logQuery->bindParam(":status", $status);

// Execute the log insertion query
$logQuery->execute();

                            return $result['sid']; 
                            
                        }

                    } else {
                        // Password is incorrect
                        return 1;
                    }
                } else {
                    // Username not found
                    return 1;
                }
            } else {
                // Error executing the query
                return 1;
            }
        } catch (PDOException $e) {
            // Handle database connection or query errors
            return "Error: " . $e->getMessage();
        }
    }

    //lectLog

    public function lectlogin($data){
        $username = $data[0];
        $password = $data[1];
    
        try {
            $stmt = $this->conn->prepare("SELECT lec_code, lec_password FROM {$this->tableLecturer} WHERE lec_code = :index_no");
            $stmt->bindParam(":index_no", $username);
    
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);
                    $storedPassword = $row['lec_password'];
    
                  
                    if (password_verify($password, $storedPassword)) {
                        // Password is correct

                        if (substr($password, 0, 3) === 'lec') {
                            $_SESSION['indexNo'] = $username;
                            return 2;
                           
                        } else {
                            $_SESSION['indexNo'] = $username;

                            $stmt2 = $this->conn->prepare("SELECT * FROM {$this->tableLecturer} WHERE lec_code = :index_no");
                            $stmt2->bindParam(":index_no", $username);
                        
                            
                            $stmt2->execute();
                        
                    
                            $result = $stmt2->fetch(PDO::FETCH_ASSOC);
                        
                          
                            if ($result) {
                                
                                $_SESSION['sid'] = $result['sid'];
                                $_SESSION['course'] = $result['course'];
                                $_SESSION['studentName'] = $result['student_name'];
                                $_SESSION['pimage'] = $result['pimg'];
                            }
                            
                            $logQuery = $this->conn->prepare("INSERT INTO {$this->logTable} (lid, time, date, name, course, username, status) VALUES (:sid, :time, :date, :name, :course, :username, :status)");
                            date_default_timezone_set('Asia/Colombo');
                            $time = date("H:i:s");
                            $date = date("Y-m-d");
                            $status = 'login';
// Bind parameters
$logQuery->bindParam(":sid", $result['id']);
$logQuery->bindParam(":time", $time);
$logQuery->bindParam(":date", $date);
$logQuery->bindParam(":name", $result['name']);
$logQuery->bindParam(":course", $result['course']);
$logQuery->bindParam(":username", $_SESSION['lec_code']);
$logQuery->bindParam(":status", $status);

// Execute the log insertion query
$logQuery->execute();

                            return $result['id']; 
                            
                        }

                    } else {
                        // Password is incorrect
                        return 1;
                    }
                } else {
                    // Username not found
                    return 1 ;
                }
            } else {
                // Error executing the query
                return 1;
            }
        } catch (PDOException $e) {
            // Handle database connection or query errors
            return "Error: " . $e->getMessage();
        }
    }
    
    
    //send code
    public function codeSend($email)
    {
        
        
        $stmt = $this->conn->prepare("UPDATE {$this->tableStudent} SET email = :email WHERE index_no = :id");
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":id", $_SESSION['indexNo']);
        $stmt->execute();
        // Create an instance; Pass `true` to enable exceptions 
        $mail = new PHPMailer; 
         
        // Server settings 
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;    //Enable verbose debug output 
        $mail->isSMTP();                            // Set mailer to use SMTP 
        $mail->Host = 'smtp.gmail.com';           // Specify main and backup SMTP servers 
        $mail->SMTPAuth = true;                     // Enable SMTP authentication 
        $mail->Username = 'tioss.infor@gmail.com';       // SMTP username 
        $mail->Password = 'xmbm rias ismd alyc';         // SMTP password 
        $mail->SMTPSecure = 'ssl';                  // Enable TLS encryption, `ssl` also accepted 
        $mail->Port = 465;                          // TCP port to connect to 
         
        // Sender info 
        $mail->setFrom('tioss.infor@gmail.com', 'Solution Explorer'); 
        $mail->addReplyTo('tioss.infor@gmail.com', 'Solution Explorer'); 
         
        // Add a recipient 
        $mail->addAddress($email); 
         
        //$mail->addCC('cc@example.com'); 
        //$mail->addBCC('bcc@example.com'); 
         
     // Set email format to HTML
$mail->isHTML(true);

// Generate a random verification code between 1000 and 9999
$verificationCode = rand(10000, 99999);
$_SESSION['verificationCode'] = $verificationCode;
// Mail subject
$mail->Subject = 'Email Verification Code from Solution Explorer';

// Mail body content
$bodyContent = '
<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border: 1px solid black; border-radius: 5px;">
        <h2 style="color: #333;">Email Verification Code</h2>
        <p style="color: #666;">Use the following code to verify your email address:</p>
        <h1 style="background-color: #4CAF50; color: white; padding: 10px; display: inline-block;">' . $verificationCode . '</h1>
        <p style="color: #666;">This verification code is valid for a limited time.</p>
        <p style="color: #666;">If you did not request this code, please ignore this email.</p>
        <h4 style="background-color: black; color: white; padding: 10px;">Solution Explore</h4>
    </div>';


$mail->Body = $bodyContent;
         
        // Send email 
        if(!$mail->send()) { 
            return 0;
        } else { 
            return 1;
        }
                     
    }
    
    //verify code
    function verifyCodeStu($code){
        if($code == $_SESSION['verificationCode']){
            return 0;
        }else{
            return 1;
        }
    }

    //update student pass
    function updatePassStu($newPassword){
        try {
            $stmt = $this->conn->prepare("UPDATE {$this->tableStudent} SET s_password = :pass WHERE index_no = :id");
            $pas = password_hash($newPassword, PASSWORD_DEFAULT);
            $stmt->bindParam(":pass", $pas);
            $stmt->bindParam(":id", $_SESSION['indexNo']);

            if ($stmt->execute()) {
                return 0; 
            } else {
                return 1; 
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
           
        }
    }
}

   



$login = new Login;


