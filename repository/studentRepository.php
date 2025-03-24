<?php
require_once '../controller/student.php';

if(isset($_POST['type']) && $_POST['type'] == 'insert'){
    $dataArr = array($_POST['student'], $_POST['index'], $_POST['category'], $_POST['pass']);

    echo $student->insertData($dataArr);
}

if(isset($_GET['type']) && $_GET['type'] == 'validate_index'){
    echo $student->indexValidate($_GET['index'] );
}


if(isset($_GET['type']) && $_GET['type'] == 'getData'){
    $studentData = $student->getData();
    
    // Encode the data as JSON and echo the response
    echo json_encode($studentData);
}


if(isset($_GET['type']) && $_GET['type'] == 'filter'){
    $studentData = $student->filterData($_GET['course'], $_GET['start_date'], $_GET['end_date']);
    
    // Encode the data as JSON and echo the response
    echo json_encode($studentData);
}


if(isset($_GET['type']) && $_GET['type'] == 'count'){
    echo $studentData = $student->count();

}



if(isset($_GET['type']) && $_GET['type'] == 'delete'){
    echo $studentData = $student->delete($_GET['id']);

}


if(isset($_GET['type']) && $_GET['type'] == 'getDataById'){
    $studentData = $student->getDataById($_GET['id']);
   
    echo json_encode($studentData);

}

//update

if(isset($_POST['type']) && $_POST['type'] == 'update'){

    $dataArr = array($_POST['student'], $_POST['index'], $_POST['category'], $_POST['pass'], $_POST['id']);

    echo $student->update($dataArr);
    
}

?>