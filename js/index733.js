$(document).ready(function(){
   

const urlParams = new URLSearchParams(window.location.search);


const id = urlParams.get('id');

var name = '';
var index = '';
var course = '';
var date = '';
var imagee = '';

        $.ajax({
            url: "http://localhost/SolutionExplore/repository/studentRepository.php",
            type: "GET",
            data: {
                type:'getDataById',
                id:id
            },
            success: function(data){
                var jsonData = JSON.parse(data);
                jsonData.forEach(function (s, i) {
                    if(s.pimage == null){
                        $("#p-link").html('<img src="img/pro.jpg">');
                        $("#profile-pic").html('<img src="img/pro.jpg">');
                        $("#p-c-i").html('<img src="img/pro.jpg">');
                    }else{
                        $("#p-link").html('<img src="proPic/'+s.pimage+'">');
                        $("#profile-pic").html('<img src="proPic/'+s.pimage+'">');
                        $("#p-c-i").html('<img src="proPic/'+s.pimage+'" style="border-radius: 50%;">');

                    }
                    if(s.cphoto == null){
                        $("#profile-banner-image").html('<img src="img/c.jpg" alt="Banner image"></img>');
                    }else{
                        $("#profile-banner-image").html('<img src="'+s.cphoto+'" alt="Banner image"></img>');
                    }
                    
                    $("#u-name").html(s.student_name);

                    $("#intro-line").html(`
                    <div style="padding: 15px; border-radius: 5px; ">
                        <p style="margin: 0; padding: 5px 0;">Name: <span style="font-weight: bold; color: gray;">${s.student_name}</span></p>
                        <p style="margin: 0; padding: 5px 0;">Index: <span style="font-weight: bold; color: gray;">${s.index_no}</span></p>
                        <p style="margin: 0; padding: 5px 0;">Course: <span style="font-weight: bold; color: gray;">${s.course}</span></p>
                        <p style="margin: 0; padding: 5px 0;">Joined Date: <span style="font-weight: bold; color: gray;">${s.added_date}</span></p>
                    </div>
                `);

                 name = s.student_name;
                 index = s.index_no;
                 course = s.course;
                 date = s.added_date;
                 imagee = s.pimage;
        
                    
                });
           

            },
            error: function(error){
                alert(error);
            }
        });

        $("#pbtn").click(function(){
         
            window.location.href = 'http://localhost/SolutionExplore/views/wall.html?id=' + id + '&name='+name+'&index='+index+'&date='+date+'&course='+course+'&image='+imagee;
        });

        $("#logoutbtn").click(function(){
            $("#modal").modal("show");
        });

        $("#yesBtn").click(function(){
            window.location.href = 'http://localhost/SolutionExplore/controller/logout.php';
        });

        //insert a post
        $("#insert_emoji").click(function(){

           $("#btnPost").hide();
           $("#insert_emoji").html('<button class="btn btn-primary" type="button" disabled>Posting...<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span></button>');
         

       

            // Get values from input fields
            var title = $("#title").val().trim();
            var problem = $("#prob").val().trim();
            var fileInput = $("#formFile")[0].files[0];
        
           
            if (title === "" || problem === "") {
              // Display red border for empty fields
              if (title === "") {
                $("#title").css("border-color", "red");
              } else {
                $("#title").css("border-color", "");  
              }
        
              if (problem === "") {
                $("#prob").css("border-color", "red");
                alert("Please type the problem.");
              } else {
                $("#prob").css("border-color", "");  
              }
        
              
        
            } else {
            
              $("#title").css("border-color", "");
              $("#prob").css("border-color", "");
        
             
              var formData = new FormData();
              formData.append('title', title);
              formData.append('problem', problem);
              formData.append('file', fileInput);
        
              $.ajax({
                type: 'POST',
                url: 'http://localhost/SolutionExplore/controller/post.php', 
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                  
                  $("#postArea").hide();
                  $("#composer").html(`
                    <h3 style="color: green;">
                      <i class="fas fa-check-circle"></i> Problem has been posted successfully!
                    </h3>
                  `);
        
                  setTimeout(function() {
                    location.reload();
                  }, 5000);
                },
                error: function(error) {
                  // Handle error
                  console.error(error);
                }
              });
            }
          });

          function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
            return formattedDate;
        }
          //get post data
          $.ajax({
            type: 'POST',
            url: 'http://localhost/SolutionExplore/repository/postDataRepository.php', 
            data: {type:'getPost'},
            success: function(data) {
             
              var jsonData = JSON.parse(data);
              var post = '';
              var postImage = '';
              var status = '';

              jsonData.forEach(function (p, index) {
                
               
                if(p.image != ''){
                  proImg = `<img src="proPic/`+p.image+`" alt="profile">`;
                }else{
                  proImg = '<img src="img/pro.jpg" alt="profile">';
                }

                if(p.img != ''){
                  postImage = `<img src="postFiles/`+p.img+`">`;
                }else{
                  postImage = '';
                }
                if(p.status == 'accepted'){
                  status = '<i class="fas fa-check-circle fa-sm text-success"></i>';
                }else{
                  status = '<i class="fas fa-check-circle fa-sm" alt="pending approval"></i>';
                }

               post += `    <div class="post">
               <div class="tb">
                 <a href="#" class="td p-p-pic">`+proImg+`</a>
                 <div class="td p-r-hdr">
                   <div class="p-u-info">
                   <a href="#">`+p.name+`</a>
                   </div>
                   <div class="p-dt">
                     <i class="fas fa-calendar"></i>
                     <span>`+formatDate(p.postdate) + ` | <i class="far fa-clock"></i> ` + p.time+`</span>
                   </div>
                 </div>
                 <div class="td p-opt">`+status+`</div>
               </div>
               <p class="mt-2" style="font-size: 12.5pt;">`+p.title+`</p>
               <a href="#" class="p-cnt-v">
               `+postImage+`
              </a>

               <div>
                 <div>
                   <p style="color: rgba(77, 77, 77, 0.95);">`+p.postData+`</p>
                   <div class="p-acts">
                         <hr>               
                       <div class="" style="float: right;">
                         <a  href="views/problem.html?id=`+id+`&title=`+p.title+`&postImage=`+p.img+`&name=`+p.name+`&postId=`+p.pid+`&img=`+p.image+`&date=`+formatDate(p.postdate)+`&postData=`+p.postData+`&proPic=`+imagee+`" class="btn btn-sm btn-primary">
                           comments <span class="badge badge-light">19</span>
                           <span class="sr-only"></span>
                         </a>
                       
                       </div>
    
                   </div>
                 </div>
               </div>


             </div>
             <br>`;


                
              });
             $("#p").html(post); 
//               $("#post").html(`<div class="tb">
//               <a href="#" class="td p-p-pic"><img src="proPic/cove.jpg" alt="Rajeev's profile pic"></a>
//               <div class="td p-r-hdr">
//                 <div class="p-u-info">
//                   <a href="#">Rajeev Singh</a> 
//                 </div>
//                 <div class="p-dt">
//                   <span>January 28, 2015</span>
//                 </div>
                
//               </div>
              
//             </div>
//             <p class="mt-2" style="font-size: 12.5pt;">`+p.title+`</p>
//             <a href="#" class="p-cnt-v">
//               <img src="img/s.png">
//             </a>
//             <div>
//               <p style="color: rgba(77, 77, 77, 0.95);">Please help me to resolve the question in machine learning. Please help me to resolve the question in machine learning. Please help me to resolve the question in machine learning. Please help me to resolve the question in machine learning. Please help me to resolve the question in machine learning</p>
//               <div class="p-acts">
//  <hr>               
//                 <div class="" style="padding-left: 20px; padding-right: 20px; color:rgb(148, 148, 148);"><i class="material-icons">- Please help me to resolve the question in machine learning. Please he Please help me to resolve the question in machine learning</div>
// <hr>
//                   <div class="" style="padding-left: 20px; padding-right: 20px; color:rgb(148, 148, 148);"><i class="material-icons">- Please help me to resolve the question in machine learning. Please he Please help me to resolve the question in machine learning</div>

//                   <div class="" style="float: right;">
//                     <button type="button" class="btn btn-sm btn-primary">
//                       comments <span class="badge badge-light">19</span>
//                       <span class="sr-only"></span>
//                     </button>
                  
//                   </div>

//               </div>
//             </div>`);
            },
            error: function(error) {
              // Handle error
              console.error(error);
            }
          });

          getSavePosts();
          function getSavePosts(){
            $.ajax({
              type: 'GET',
              url: 'http://localhost/SolutionExplore/repository/postDataRepository.php', 
              data: {type:'getSavePost',sid:id},
              success: function(data) {
               
                
                var jsonData = JSON.parse(data);
                var postTitle = p.title;
                var post = '';
                var postImage = '';
                var status = '';
  
                jsonData.forEach(function (p, index) {
                  post += `<div class="q-ad-c">
                  <a href="views/problem.html?id=`+id+`&title=`+p.title+`&postImage=`+p.img+`&name=`+p.name+`&postId=`+p.pid+`&img=`+p.image+`&date=`+formatDate(p.postdate)+`&postData=`+p.postData+`&proPic=`+imagee+`" class="q-ad">
                    <img src="https://imagizer.imageshack.com/img923/1849/4TnLy1.png">
                    <span>`+p.title.substring(0,34)+`...</span>
                  </a>
                </div>`;               
                });
                $("#q").html(post);
               
              },
              error: function(error) {
                // Handle error
                console.error(error);
              }
            });
          }
        

});