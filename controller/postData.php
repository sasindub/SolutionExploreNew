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
    private $tableName = "post";
    private $commentTable = "comment";
    private $saveTable = "savedcomment";
    function insertPost(){
        
        try{
            $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} WHERE sid = ".$_SESSION['sid']." AND status != 'rejected' ORDER BY pid DESC ");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                   
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); 
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }

    }

    //get post data
    function getPost(){
        
        try{
            $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} WHERE status = 'accepted' ORDER BY pid DESC ");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                   
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); 
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }

    }

    //get wall post data
    function getWallPost(){
        
        try{
            $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} WHERE sid != ".$_SESSION['sid']." AND status != 'rejected' AND status != '' AND course = '".$_SESSION['course']."' ORDER BY pid DESC ");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                   
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); 
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }

    }

    //get wall post data search
    function search($search){
        
        try{
            $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} WHERE sid != :sessionSid AND status != 'rejected' AND status != '' AND course = :sessionCourse AND (postData LIKE :search OR title LIKE :search) ORDER BY pid DESC");

            // Bind parameters
            $stmt->bindParam(':sessionSid', $_SESSION['sid']);
            $stmt->bindParam(':sessionCourse', $_SESSION['course']);
            $searchParam = '%' . $search . '%';
            $stmt->bindParam(':search', $searchParam);
            
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                   
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); 
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }

    }

  //get rejected post data
  function getPostRjected(){
    try{
        $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} where status = 'rejected' AND isDelete = '0' Order by pid desc");
        if($stmt->execute()){
            if($stmt->rowCount() > 0){
                // Fetch all rows as an associative array
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            } else {
                return array(); // Return an empty array if no data found
            }
        }

    } catch(PDOException $e){
        echo $e->getMessage();
        $this->conn->rollBack();
    }
}

 //get post rejected data filter
 function filterRejectedData($course){
    try{
        $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} where status = 'rejected' AND isDelete = '0' AND course = '".$course."'  Order by pid desc");
        if($stmt->execute()){
            if($stmt->rowCount() > 0){
                // Fetch all rows as an associative array
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $data;
            } else {
                return array(); // Return an empty array if no data found
            }
        }

    } catch(PDOException $e){
        echo $e->getMessage();
        $this->conn->rollBack();
    }
}

    //get post data
    function getPostDataForApproval(){
        try{
            $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} where status = '' Order by pid desc");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    // Fetch all rows as an associative array
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); // Return an empty array if no data found
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }
    }

    //get post approval data filter
    function filterApprovalData($course){
        try{
            $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} where status = '' AND course = '".$course."' Order by pid desc");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    // Fetch all rows as an associative array
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); // Return an empty array if no data found
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }
    }

    //filter post data
    function filterPostData($course){
        try{
            $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} where status = 'accepted' AND course = '".$course."' Order by pid desc");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    // Fetch all rows as an associative array
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); // Return an empty array if no data found
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }
    }



//accept post
function acceptPost($id){
    try {

        $mails = '';

        $stm = $this->conn->prepare("
    SELECT s.email 
    FROM student s 
    INNER JOIN post p ON s.sid = p.sid 
    WHERE p.pid = ".$id."
");

$stm->execute();

$result = $stm->fetch(PDO::FETCH_ASSOC);

if ($result) {
    $mails = $result['email'];
}


        // Update status to 'accepted' where pid matches
        $stmt = $this->conn->prepare("UPDATE {$this->tableName} SET status = 'accepted' WHERE pid = :id");
        $stmt->bindParam(":id", $id);
        
        // Execute the update query
        if ($stmt->execute()) {
            // If update successful, fetch data for the pid
            $stmt1 = $this->conn->prepare("SELECT * FROM {$this->tableName} WHERE pid = :id");
            $stmt1->bindParam(":id", $id);
        
            if ($stmt1->execute()) {
                // Check if data exists
                if ($stmt1->rowCount() > 0) {
                    // Fetch all rows as an associative array
                    $data11 = $stmt1->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($data11 as $row) {
                        // Assign data to variables
                        $postdate = $row['postdate'];
                        $pid = $row['pid'];
                        $img = $row['img'];
                        $sid = $row['sid'];
                        $time = $row['time'];
                        $status = $row['status'];
                        $isDelete = $row['isDelete'];
                        $course = $row['course'];
                        $name = $row['name'];
                        $image = $row['image'];
                        $title = $row['title'];
                        $postData = $row['postData'];

                        // Send emails
                        try {
                            $mail = new PHPMailer(); 
                            // Server settings
                            $mail->SMTPDebug = SMTP::DEBUG_SERVER;    // Enable verbose debug output
                            $mail->isSMTP();                            // Set mailer to use SMTP
                            $mail->Host = 'smtp.gmail.com';            // Specify main and backup SMTP servers
                            $mail->SMTPAuth = true;                     // Enable SMTP authentication
                            $mail->Username = 'tioss.infor@gmail.com';   // SMTP username
                            $mail->Password = 'xmbm rias ismd alyc';     // SMTP password
                            $mail->SMTPSecure = 'ssl';                  // Enable TLS encryption, `ssl` also accepted
                            $mail->Port = 465;                          // TCP port to connect to

                            // Sender info
                            $mail->setFrom('tioss.infor@gmail.com', 'Solution Explorer');
                            $mail->addReplyTo('tioss.infor@gmail.com', 'Solution Explorer');

                            $stmt2 = $this->conn->prepare("SELECT email FROM student WHERE course = :course");
                            $stmt2->bindParam(":course", $course);

                            if($stmt2->execute()){
                                if($stmt2->rowCount() > 0)
                                {
                                    // Fetch all emails as an associative array
                                    $data = $stmt2->fetchAll(PDO::FETCH_COLUMN);
                                    //send
                                    // Loop through each email address and send the email
                                    foreach ($data as $email) 
                                    {
                                        // Add a recipient
                                        $mail->addAddress($email);

                                        // Set email format to HTML
                                        $mail->isHTML(true);

                                        // Mail subject
                                        $mail->Subject = 'New Problem Posted - Solution Explorer';

                                        // Mail body content
                                        $bodyContent = '
                                        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border: 1px solid black; border-radius: 5px; max-width: 600px; margin: 0 auto;">
                                        <h2 style="color: #333;">Title: '.$title.'</h2>
                                        <p style="color: #666; font-size:11pt;"><b>Post:</b> '.$postData.'</p>
                                    
                                        <div style="border-top: 1px solid #ccc; margin-top: 20px; padding-top: 10px;">
                                            <p style="color: #666; margin: 0;">Posted Date: ' . $postdate . '</p>
                                            <p style="color: #666; margin: 0;">Posted Time: ' . $time . '</p>
                                            <p style="color: #666; margin: 0;">Email: <a href="mailto:'.$mails.'" style="color: #666;">'.$mails.'</a></p>
                                        </div>
                                    
                                        <p style="color: #666; margin-top: 20px;">You can send your answers to the provided email address.</p>
                                    

                                  <div style="background-color: #f4f4f4; color: white;  margin-top: 20px;">
                                  
                                  <a href="http://localhost/SolutionExplore/index.html" style="color: white; text-decoration: none; border-radius: 0px; background-color: #0366fc; padding: 5px 15px;">Click Here to Log In</a>

                                  <a href="mailto:'.$mails.'?subject=Answer - '.$title.'&body=Post: '.$postData.'" style="color: white; text-decoration: none; border-radius: 0px; background-color: #07a316; padding: 5px 15px; marging-left:10px; marging-right:10px;">Just Reply</a></div>

                                        <h4 style="background-color: black; color: white; padding: 10px; margin-top: 20px;">Solution Explore</h4>
                                    </div>
                                    ';

                                        $mail->Body = $bodyContent;

                                        // Attach image if $img is not empty
                                        if (!empty($img)) {
                                            $mail->addAttachment('../postFiles/' . $img, 'image.jpg');
                                        }

                                        // Send email
                                        $mail->send();

                                        // Clear all addresses for the next iteration
                                        $mail->clearAddresses();
                                    }
                                    return "send";
                                } 
                                else 
                                {
                                    return "not send"; // Return an empty array if no data found
                                }
                            }
                            echo 0; // Success
                        } catch (Exception $e) {
                            echo 1; // Failure
                        }
                    }
                    return 0;
                } else {
                    return 0; // Return an empty array if no data found
                }
            } else {
                return 1; // Return an empty array if execution fails
            }
        } else {
            return 1; // Return 1 if update fails
        }
    } catch (PDOException $e) {
        // Handle any exceptions
        echo $e->getMessage();
    }
}




    //rejected post
    function rejectedPost($id){
        try {
            $stmt = $this->conn->prepare("UPDATE {$this->tableName} SET status = 'rejected' WHERE pid = :id");
        
            
            $stmt->bindParam(":id", $id);
        
            if ($stmt->execute()) {
                return 0;
            } else {
                return 1; 
            }
        } catch (PDOException $e) {
            
            echo $e->getMessage();
        }
    }

      //delete post
      function deletePost($id){
        try {
            $stmt = $this->conn->prepare("UPDATE {$this->tableName} SET isDelete = 'true' WHERE pid = :id");
        
            
            $stmt->bindParam(":id", $id);
        
            if ($stmt->execute()) {
                return 0;
            } else {
                return 1; 
            }
        } catch (PDOException $e) {
            
            echo $e->getMessage();
        }
    }

    //comments
    function getComments($id){
        try {
            $stmt = $this->conn->prepare("SELECT comment.*, student.student_name, student.pimage FROM {$this->commentTable} 
                                          JOIN student ON comment.stu_id = student.sid 
                                          WHERE comment.pid = :id 
                                          ORDER BY comment.cid DESC");
        
            $stmt->bindParam(":id", $id);
        
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); 
                }
            }
        
        } catch (PDOException $e) {
            echo $e->getMessage();
            $this->conn->rollBack();
        }
        
    }

    //put comments
    function putComment($pid, $comment){
        try {
            date_default_timezone_set('Asia/Colombo');
            $c_time = date('H:i:s');
            $c_date = date('Y-m-d');
            $stmt = $this->conn->prepare("INSERT INTO comment (comment, stu_id, c_time, c_date, pid) VALUES (:comment,  :stu_id, :c_time, :c_date, :pid)");
        
                   
            $stmt->bindParam(":comment", $comment);
            $stmt->bindParam(":stu_id", $_SESSION['sid']);
            $stmt->bindParam(":c_time", $c_time);
            $stmt->bindParam(":c_date", $c_date);
            $stmt->bindParam(":pid", $pid);
        
            $this->conn->beginTransaction();
        
            if ($stmt->execute()) {
                $this->conn->commit();
                return 0; 
            } else {
                return 1; 
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
            $this->conn->rollBack();
        }
    }

    //save comment
    function insertSavePost($pid, $sid){
        try {
            $stmt = $this->conn->prepare("INSERT INTO {$this->saveTable} (sid, pid) VALUES (:sid, :pid)");
        
            $stmt->bindParam(":sid", $sid);
            $stmt->bindParam(":pid", $pid);
        
            $this->conn->beginTransaction();
        
            if ($stmt->execute()) {
                $this->conn->commit();
                return 0;
            } else {
                return 1;
            }
        } catch (PDOException $e) {
            $this->conn->rollBack();
            echo $e->getMessage();
        }
    }

    //get saved post
    function getSavedPost($sid){
        try{
            $stmt = $this->conn->prepare("SELECT 
            savedcomment.*, 
            post.*, 
            student.*
        FROM (
            SELECT 
                MIN(cid) AS min_cid 
            FROM 
                savedcomment 
            WHERE 
                sid = ".$sid." 
            GROUP BY 
                pid, sid
        ) AS distinct_savedcomment
        INNER JOIN 
            savedcomment ON savedcomment.cid = distinct_savedcomment.min_cid
        INNER JOIN 
            post ON savedcomment.pid = post.pid
        INNER JOIN 
            student ON savedcomment.sid = student.sid
        WHERE 
            savedcomment.sid = ".$sid."
        ORDER BY 
            savedcomment.cid DESC;");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    // Fetch all rows as an associative array
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); // Return an empty array if no data found
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }
    }

    //get comments
    function getComment($id){
        try{
            $stmt = $this->conn->prepare("SELECT comment.*, student.*, post.*
            FROM comment
            INNER JOIN student ON comment.stu_id = student.sid
            INNER JOIN post ON comment.pid = post.pid
            WHERE comment.pid = ".$id."
            ORDER BY comment.cid DESC;");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    // Fetch all rows as an associative array
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); // Return an empty array if no data found
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        } 
    }

    //delete comments
    function deleteComment($id){
        try {
            $stmt = $this->conn->prepare("DELETE FROM comment where cid = ".$id);
        
            
           
        
            if ($stmt->execute()) {
                return 0;
            } else {
                return 1; 
            }
        } catch (PDOException $e) {
            
            echo $e->getMessage();
        }
    }

    //get log data
    function getLog(){
        try{
            $stmt = $this->conn->prepare("SELECT * FROM log order by logid desc");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    // Fetch all rows as an associative array
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); // Return an empty array if no data found
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        } 
    }

    function filterLog($startDate, $endDate){
        try{
            $stmt = $this->conn->prepare("SELECT * FROM log where date between '".$startDate."' and '".$endDate."' order by logid desc");
            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    // Fetch all rows as an associative array
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    return $data;
                } else {
                    return array(); // Return an empty array if no data found
                }
            }
    
        } catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        } 
    }
}

   



$post = new Post;



