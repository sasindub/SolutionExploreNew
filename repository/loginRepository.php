<?php
require_once '../controller/login.php';

if(isset($_POST['type']) && $_POST['type'] == 'studentlogin'){
    $dataArr = array($_POST['username'], $_POST['pass']);

    echo $login->studentlogin($dataArr);
    
}

if(isset($_POST['type']) && $_POST['type'] == 'lectlogin'){
    $dataArr = array($_POST['username'], $_POST['pass']);

    echo $login->lectlogin($dataArr);
    
}

if(isset($_POST['type']) && $_POST['type'] == 'codeSend'){
    echo $login->codeSend($_POST['email']);
    
}

if(isset($_POST['type']) && $_POST['type'] == 'StuVerify'){
    echo $login->verifyCodeStu($_POST['code']);
}

if(isset($_POST['type']) && $_POST['type'] == 'passUpdateStu'){
    echo $login->updatePassStu($_POST['newPassword']);
}