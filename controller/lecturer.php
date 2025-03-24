<?php
require_once '../model/db.php';

Class Lectrure extends Database{

    private $tableName = "lecturer";

    //Insert data
    public function insertData($data){
        date_default_timezone_set('Asia/Colombo');
        $course = $data[2];
        $pimg = 'null';
        $lec_name = $data[0];
        $lec_code = $data[1];
        $pass = password_hash($data[3], PASSWORD_DEFAULT);

        $added_date = date('Y-m-d'); // Format: YYYY-MM-DD
        $added_time = date('H:i:s'); // Format: HH:MM:SS
        $updated_date = date('Y-m-d');
        $updated_time = date('H:i:s');

        try{
            $stmt = $this->conn->prepare("INSERT INTO {$this->tableName} (course, lec_code, lec_password, name, pimg, added_date, updated_date, added_time, updated_time) VALUES (:course, :lec_code, :lec_password, :lec_name, :pimg, :added_date, :updated_date, :added_time, :updated_time)");

            $stmt->bindParam(":course", $course);
            $stmt->bindParam(":lec_code", $lec_code);
            $stmt->bindParam(":lec_password", $pass);
            $stmt->bindParam(":lec_name", $lec_name);
            $stmt->bindParam(":pimg", $pimg);
            
            $stmt->bindParam(":added_date", $added_date);
            $stmt->bindParam(":updated_date", $updated_date);
            $stmt->bindParam(":added_time", $added_time);
            $stmt->bindParam(":updated_time", $updated_time);
 
            $this->conn->beginTransaction();

            

            if($stmt->execute()){
                $this->conn->commit();
                return 0;
            }else{
                return 1;
            }

        }catch(PDOException $e){
          
            $this->conn->rollBack();
            echo $e->getMessage();
            
        }
    }

// Update data
public function update($data){
    date_default_timezone_set('Asia/Colombo');
    $course = $data[2];
    $lec_name = $data[0];
    $lec_code = $data[1];
    $id = $data[4];
 
    $pass = $data[3];
    $updated_date = date('Y-m-d');
    $updated_time = date('H:i:s');

    try {

        if($pass == '')
        {
            $stmt = $this->conn->prepare("UPDATE {$this->tableName} SET course = :course, name = :lec_name, updated_date = :updated_date, updated_time = :updated_time, lec_code = :lec_code WHERE id = :id");
            $stmt->bindParam(":course", $course);
        $stmt->bindParam(":lec_name", $lec_name);
        $stmt->bindParam(":lec_code", $lec_code);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":updated_date", $updated_date);
        $stmt->bindParam(":updated_time", $updated_time);
        }else{
            $pass = password_hash($data[3], PASSWORD_DEFAULT);
            $stmt = $this->conn->prepare("UPDATE {$this->tableName} SET course = :course, lec_password = :lec_password, name = :lec_name, updated_date = :updated_date, updated_time = :updated_time, lec_code = :lec_code WHERE id = :id");
            $stmt->bindParam(":course", $course);
        $stmt->bindParam(":lec_password", $pass);
        $stmt->bindParam(":lec_name", $lec_name);
        $stmt->bindParam(":lec_code", $lec_code);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":updated_date", $updated_date);
        $stmt->bindParam(":updated_time", $updated_time);
        }
      

        

        $this->conn->beginTransaction();

        if($stmt->execute()){
            $this->conn->commit();
            return 0; 
        } else {
            return 1; 
        }
    } catch(PDOException $e) {
        $this->conn->rollBack();
        echo $e->getMessage();
       
    }
}


    
    //validate lec code
    public function codeValidate($code){
        try{
            $stmt =$this->conn->prepare("SELECT lec_code FROM {$this->tableName} WHERE lec_code = :lect_no");
            $stmt->bindParam(":lect_no", $code);

            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    return 1;
                }else{
                   return 0;
                
                }
            }

        }catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }
    }

 //get all data
public function getData(){
    try{
        $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} Order by id desc");
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

//get data by id
public function getDataById($id){
    try{
        $this->conn->beginTransaction();

        $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} WHERE id = :id");
        $stmt->bindParam(":id", $id);
        
        if($stmt->execute()){
            if($stmt->rowCount() > 0){
                // Fetch all rows as an associative array
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $this->conn->commit();
                return $data;
            } else {
                $this->conn->commit();
                return array(); // Return an empty array if no data found
            }
        }

    } catch(PDOException $e){
        echo $e->getMessage();
        $this->conn->rollBack();
    }
}


//get filtered data
public function filterData($course, $startDate, $endDate){
    try{
        if ($course != 'all') {
            $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} WHERE added_date BETWEEN :startDate AND :endDate AND course = :course ORDER BY id DESC");
            $stmt->bindParam(":startDate", $startDate);
            $stmt->bindParam(":endDate", $endDate);
            $stmt->bindParam(":course", $course);
        } else {
            $stmt = $this->conn->prepare("SELECT * FROM {$this->tableName} WHERE added_date BETWEEN :startDate AND :endDate ORDER BY id DESC");
            $stmt->bindParam(":startDate", $startDate);
            $stmt->bindParam(":endDate", $endDate);
        }


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

//get count
public function count(){
    try{
        $stmt = $this->conn->prepare("SELECT COUNT(*) as rowCount FROM {$this->tableName}");

        if($stmt->execute()){
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['rowCount'];
        } else {
            return 1;
        }

    } catch(PDOException $e){
        echo $e->getMessage();
        $this->conn->rollBack();
    }
}

// Delete by ID
public function delete($id){
    try{
        $stmt = $this->conn->prepare("DELETE FROM {$this->tableName} WHERE id = :id");

        // Bind the parameter
        $stmt->bindParam(":id", $id);

        // Execute the query
        if($stmt->execute()){
            // Check if any rows were affected
            $rowCount = $stmt->rowCount();
            
            // Return 0 if deletion was successful, else 1
            return ($rowCount > 0) ? 0 : 1;
        } else {
            // Return 1 if an error occurred during execution
            return 1;
        }
    } catch(PDOException $e){
        echo $e->getMessage();
        $this->conn->rollBack();
    }
}

    // Email validation
    
    public function emailValidation($email){
        try{
            $stmt =$this->conn->prepare("SELECT email FROM {$this->tableName} WHERE email = :email");
            $stmt->bindParam(":email", $email);

            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    return 1;
                }else{
                    //if the email is not available then send the email verification code 

                    // ini_set( 'display_errors', 1 );
                    // error_reporting( E_ALL );
                    
                    // $from = "tioss.infor@gmail.com";
                    // $to = $email;
                    // $subject = "lockMe Confirmation code: ";
                    // $message = 'Your e-mail confirmation code is <span style="font-size:25pt;"><b>".rand(00000,99999)."</b><span>';
                    // $headers = "From: {$from}\r\nContent-Type: text/html;";
                    
                    // if(mail($to,$subject,$message, $headers)) {
                    //     return "sent";
                    // } else {
                    //     return 0;
                    // }

                    return 0;
                
                }
            }

        }catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollBack();
        }
    }

    //email confirmation code
    public function confirmEmailCode($code){
        try{

        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }


    //update password

    //login
    public function login($email, $pass){
        try{

            $stmt = $this->conn->prepare("SELECT * From {$this->tableName} WHERE email = :email");
            $stmt->bindParam(":email", $email);

          

            if($stmt->execute()){
                if($stmt->rowCount() > 0){
                    if($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                        if(password_verify($pass,$row['password'])){
                            $_SESSION['username'] = $row['uname'];
                            $_SESSION['uid'] = $row['uid'];
                            $_SESSION['tele'] = $row['mobile'];
                            $_SESSION['email'] = $row['email'];
                           
                            return 0;
                        }else{
                            return 1;
                        }
                    }
                }else{
                    return 1;
                }
            }

        }catch(PDOException $e){
            echo $e->getMessage();
            $this->conn->rollback();
        }
    }

    //get login details
    public function getLogins(){
        if(isset($_SESSION['username'])){
            $arr = array($_SESSION['username'], $_SESSION['uid'], $_SESSION['tele'], $_SESSION['email'] ); 
            $jsn = json_encode($arr);
            return $jsn;
        }else{
            return 1;
        }
    }

   

}

$lecturer = new Lectrure;


