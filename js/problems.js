
$(document).ready(function(){


const urlParams = new URLSearchParams(window.location.search);


const id = urlParams.get('id');
const pid = urlParams.get('postId');
const title = urlParams.get('title');
const postImage = urlParams.get('postImage');
const name = urlParams.get('name');
const img = urlParams.get('img');
const date = urlParams.get('date');
const postData = urlParams.get('postData');
const proPic = urlParams.get('proPic');

if(proPic == 'null'){
  $("#p-link").html('<img src="../img/pro.jpg">');

}else{
  
  $("#p-link").html('<img src="../proPic/'+proPic+'">');

}

$("#btnAddNew").click(function(){
     
  window.location.href = 'http://localhost/SolutionExplore/index1.html?id=' +  id;
});

$("#pbtn").click(function(){
         
  window.history.go(-1);
});

$("#p-link").click(function(){
     
  window.location.href = 'http://localhost/SolutionExplore/index1.html?id=' +  id;
});



var proImg = '<img src="../img/pro.jpg" alt="profile">';
var postImg = '';
if(img == null){
  alert("n");
  proImg = `<img src="../proPic/`+img+`" alt="profile">`;
}else{
  proImg = '<img src="../img/pro.jpg" alt="profile">';
}

if(postImage != ''){
  postImg = `<img src="../postFiles/`+postImage+`">`;
}else{
  postImg = '';
}
var i=0;
var post = `    <div class="post  " >
<div class="tb">
  <a href="#" class="td p-p-pic">`+proImg+`</a>
  <div class="td p-r-hdr">
    <div class="p-u-info">
      <a href="#">`+name+`</a> 
    </div>
    <div class="p-dt">
      <span>`+date+`</span>
    </div>
    
  </div>
  
</div>
<h1 class="mt-2" style="font-size: 20pt; font-weight: 400;">`+title+`</h1>
<hr>
<a href="#" class="p-cnt-v">
`+postImg+`
</a>
<div>
  <p style="color: rgba(77, 77, 77, 0.95);">`+postData+`</p>
  
  <div class="p-acts">
    <h2 style="font-size: 16pt; font-weight: 400;"> Answers</h2>
<hr>              

<!-- comment area-->
<div class="alert alert-success" id="msg" role="alert">
  Your answer has been submited successfully
</div>
<form action="">
<div class="input-group">

<textarea id="commentData" class="form-control" aria-label="With textarea" placeholder="type your answer..."></textarea>
</div>
<button style="float: right; margin-top: 10px;" class="sub btn btn-sm btn-outline-primary" name="btncom" id="btncom">Submit</button>
</form>
<div id="co"></div>
`;


var com = '';


$("#p").html(post);
$("#msg").hide();

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return formattedDate;
}
//comments getting
getComments();
function getComments(){
$.ajax({
  type: 'GET',
  url: 'http://localhost/SolutionExplore/repository/postDataRepository.php', 
  data: {type:'getComments',
id:pid},
  success: function(data) {
    
    var jsonData = JSON.parse(data);
    var post = '';
    var postImage = '';
    var status = '';
    var comData = '';

            jsonData.forEach(function (p, index) {
              
           if( p.comment.length > 900){
              comData = `<textarea readonly style="width: 1000px; height: 150px; overflow-y: auto; border: none; background-color: transparent; resize: none;">`+p.comment+`</textarea>`
           }else{
            comData = `<p>`+p.comment+`</p>`
           }

              if(p.pimage != null){
                proImg = `<img src="../proPic/`+p.pimage+`" alt="profile" style="border-radius: 50%; ">`;
              }else{
                proImg = '<img src="../img/pro.jpg" style="border-radius: 50%; " alt="profile">';
              }   
        com += `
        <div class="tb">
            <a href="#" class="td p-p-pic">`+proImg+`</a>
            <div class="td p-r-hdr">
                <div class="p-u-info">
                    <a href="#">`+p.student_name+`</a>
                </div>
                <div class="p-dt">
                    <span>`+ formatDate(p.c_date) + `</span>
                    <button class="btn btn-sm btn-light ms-3" style="float:right;">Save</button>
                </div>
            </div>
           
        </div>
       
        <!-- profile com end -->

        <br>

        <!-- comment -->
       
        <div style="padding-left: 20px; padding-right: 20px;">
         
        `+comData+`
            
        </div>
        
        <hr>`;


              
            });
          $("#co").html(com);
  },
  error: function(error) {
    // Handle error
    console.error(error);
  }
});
}


$(document).on('click', '.sub', function(e) {
  e.preventDefault();
  var comment = $("#commentData").val();
  
if(comment != ''){
  $("#btncom").prop("disabled", true);
  $("#commentData").prop("disabled", true);
  $("#commentData").removeClass("red-text");
  $.ajax({
    type: 'GET',
    url: 'http://localhost/SolutionExplore/repository/postDataRepository.php', 
    data: {type:'putComment',
  id:pid,
  comment:comment},
    success: function(data) {
      
      if(data == 0){
        $("#msg").show();
        $("#commentData").val('');
        
        setTimeout(function() {
          $("#msg").hide();
          location.reload();
      }, 3000);
      
      }else{
        alert("Something went wrong!");
        $("#commentData").val('');
        location.reload();
      }
  


    },
    error: function(error) {
      // Handle error
      console.error(error);
    }
  });
}else{
  $("#commentData").addClass("red-text");
}

});

       
        

});