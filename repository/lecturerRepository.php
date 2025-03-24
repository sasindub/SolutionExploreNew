<?php
require_once '../controller/lecturer.php';

if(isset($_POST['type']) && $_POST['type'] == 'insert'){
    $dataArr = array($_POST['name'], $_POST['lecCode'], $_POST['course'], $_POST['lecPass']);

    echo $lecturer->insertData($dataArr);
    
}

if(isset($_POST['type']) && $_POST['type'] == 'studentlogin'){
   echo "s";
    
}

if(isset($_GET['type']) && $_GET['type'] == 'validate_code'){
    echo $lecturer->codeValidate($_GET['lec_code'] );
}

// Handle the request
if(isset($_GET['type']) && $_GET['type'] == 'getData'){
    $lecturerData = $lecturer->getData();
    
    // Encode the data as JSON and echo the response
    echo json_encode($lecturerData);
}

// Handle the request
if(isset($_GET['type']) && $_GET['type'] == 'filter'){
    $lecturerData = $lecturer->filterData($_GET['course'], $_GET['start_date'], $_GET['end_date']);
    
    // Encode the data as JSON and echo the response
    echo json_encode($lecturerData);
}

// Handle the request
if(isset($_GET['type']) && $_GET['type'] == 'count'){
    echo $lecturerData = $lecturer->count();

}

// Handle the request
if(isset($_GET['type']) && $_GET['type'] == 'delete'){
    echo $lecturerData = $lecturer->delete($_GET['id']);

}

// Handle the request
if(isset($_GET['type']) && $_GET['type'] == 'getDataById'){
    $lecturerData = $lecturer->getDataById($_GET['id']);
   
    echo json_encode($lecturerData);

}

//update

if(isset($_POST['type']) && $_POST['type'] == 'update'){
    $dataArr = array($_POST['name'], $_POST['lecCode'], $_POST['course'], $_POST['lecPass'], $_POST['id']);

    echo $lecturer->update($dataArr);
    
}
?>