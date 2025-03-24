<?php
require_once '../controller/postData.php';

if(isset($_POST['type']) && $_POST['type'] == 'getPost'){
   

    $postData =  $post->insertPost();
    echo json_encode($postData);
    
}
if(isset($_POST['type']) && $_POST['type'] == 'getWallPost'){
   

    $postData =  $post->getWallPost();
    echo json_encode($postData);
    
}

//search
if(isset($_POST['type']) && $_POST['type'] == 'searching'){
   

    $postData =  $post->search($_POST['search']);
    echo json_encode($postData);
    
}

//rejected
if(isset($_GET['type']) && $_GET['type'] == 'getRejectedPost'){
   

    $postData =  $post-> getPostRjected();
    echo json_encode($postData);
    
}

if(isset($_GET['type']) && $_GET['type'] == 'filterRejectedData'){
   

    $postData = $post->filterRejectedData($_GET['category']);
    echo json_encode($postData);
    
    
     
 }

if(isset($_GET['type']) && $_GET['type'] == 'approvePost'){
   

    $postData =  $post->getPostDataForApproval();
    echo json_encode($postData);
    
}

if(isset($_GET['type']) && $_GET['type'] == 'acceptPost'){
   

   echo $post->acceptPost($_GET['id']);
   
    
}

if(isset($_GET['type']) && $_GET['type'] == 'rejectPost'){
   

    echo $post->rejectedPost($_GET['id']);
    
     
 }

 if(isset($_GET['type']) && $_GET['type'] == 'filterApprovalData'){
   

    $postData = $post->filterApprovalData($_GET['category']);
    echo json_encode($postData);
    
    
     
 }

 if(isset($_GET['type']) && $_GET['type'] == 'filterPostData'){
   

    $postData = $post->filterPostData($_GET['category']);
    echo json_encode($postData);
    
    
     
 }

 //save comments
 if(isset($_GET['type']) && $_GET['type'] == 'savePost'){
   

   echo $post->insertSavePost($_GET['pid'], $_GET['sid']);
    
    
     
 }

 if(isset($_GET['type']) && $_GET['type'] == 'deletePost'){
   

    echo $post->deletePost($_GET['id']);
    
    
    
     
 }

 //get saved post
 if(isset($_GET['type']) && $_GET['type'] == 'getSavePost'){
   

    $postData = $post->getSavedPost($_GET['sid']);
    echo json_encode($postData);
    
    
     
 }

 //comments
 if(isset($_GET['type']) && $_GET['type'] == 'getComments'){
   

     $postData = $post->getComments($_GET['id']);
    echo json_encode($postData);
    
    
     
 }

 //put comment
 if(isset($_GET['type']) && $_GET['type'] == 'putComment'){
   

   echo $post->putComment($_GET['id'], $_GET['comment']);
 
   
   
    
}

//get post data
if(isset($_GET['type']) && $_GET['type'] == 'getPost'){
   

    $postData =  $post->getPost();
    echo json_encode($postData);
    
}

//get comment data
if(isset($_GET['type']) && $_GET['type'] == 'getComment'){
   

    $postData =  $post->getComment($_GET['id']);
    echo json_encode($postData);
    
}

//delete comment data
if(isset($_GET['type']) && $_GET['type'] == 'deleteComment'){
   

    $postData =  $post->deleteComment($_GET['id']);
    echo json_encode($postData);
    
}

//get log data
if(isset($_GET['type']) && $_GET['type'] == 'getLog'){
   

    $postData =  $post->getLog();
    echo json_encode($postData);
    
}

//filter log data
if(isset($_GET['type']) && $_GET['type'] == 'filterLog'){
   

    $postData =  $post->filterLog($_GET['start_date'], $_GET['end_date']);
    echo json_encode($postData);
    
}


