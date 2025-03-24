$(document).ready(function(){

const urlParams = new URLSearchParams(window.location.search);


const id = urlParams.get('id');
const name = urlParams.get('name');
const index = urlParams.get('index');
const date = urlParams.get('date');
const course = urlParams.get('course');
const image = urlParams.get('image');

if(image == 'null'){
  $("#p-link").html('<img src="../img/pro.jpg">');

}else{
  $("#p-link").html('<img src="../proPic/'+image+'">');

}

$("#intro-line").html(`
<div style="padding: 15px; border-radius: 5px; ">
    <p style="margin: 0; padding: 5px 0;">Name: <span style="font-weight: bold; color: gray;">${name}</span></p>
    <p style="margin: 0; padding: 5px 0;">Index: <span style="font-weight: bold; color: gray;">${index}</span></p>
    <p style="margin: 0; padding: 5px 0;">Course: <span style="font-weight: bold; color: gray;">${course}</span></p>
    <p style="margin: 0; padding: 5px 0;">Joined Date: <span style="font-weight: bold; color: gray;">${date}</span></p>
</div>
`);

    
        $("#btnAddNew").click(function(){
      
            window.location.href = 'http://localhost/SolutionExplore/index1.html?id=' + id ;
        });

        $("#p-link").click(function(){
      
          window.location.href = 'http://localhost/SolutionExplore/index1.html?id=' + id ;
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
            data: {type:'getWallPost'},
            success: function(data) {
              
              var jsonData = JSON.parse(data);
              var post = '';
              var postImage = '';
              var status = '';

              jsonData.forEach(function (p, index) {
                
               
                if(p.image != ''){
                  proImg = `<img src="../proPic/`+p.image+`" alt="profile">`;
                }else{
                  proImg = '<img src="../img/pro.jpg" alt="profile">';
                }      

                if(p.img != ''){
                  postImage = `<img src="../postFiles/`+p.img+`">`;
                }else{
                  postImage = '';
                }
                
                  status = '<button class="save btn btn-sm btn-outline-secondary" id="'+p.pid+'">Save</button>';
                

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
                         <a  href="../views/problem.html?id=`+id+`&title=`+p.title+`&postImage=`+p.img+`&name=`+p.name+`&postId=`+p.pid+`&img=`+p.image+`&date=`+formatDate(p.postdate)+`&postData=`+p.postData+`&proPic=`+image+`" class="btn btn-sm btn-primary">
                           comments <span class="badge badge-light"></span>
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
            },
            error: function(error) {
              // Handle error
              console.error(error);
            }
          });

          $("#btnSearch").click(function(){
            var search = $("#search").val();
            $.ajax({
              type: 'POST',
              url: 'http://localhost/SolutionExplore/repository/postDataRepository.php', 
              data: {type:'searching',search:search},
              success: function(data) {
                if(data == '[]'){
                  $("#p").html(`<center>
                  <img src="../img/no.gif" alt="profile" style="width: 150px; margin-top:200px;">
                  </center>`); 
                }else{

                var jsonData = JSON.parse(data);
                var post = '';
                var postImage = '';
                var status = '';
  
                jsonData.forEach(function (p, index) {
                  
                 
                  if(p.image != ''){
                    proImg = `<img src="../proPic/`+p.image+`" alt="profile">`;
                  }else{
                    proImg = '<img src="../img/pro.jpg" alt="profile">';
                  }      
  
                  if(p.img != ''){
                    postImage = `<img src="../postFiles/`+p.img+`">`;
                  }else{
                    postImage = '';
                  }
                  
                    status = '<button class="save btn btn-sm btn-outline-secondary" id="'+p.pid+'">Save</button>';
                  
  
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
                         <a  href="../views/problem.html?id=`+id+`&title=`+p.title+`&postImage=`+p.img+`&name=`+p.name+`&postId=`+p.pid+`&img=`+p.image+`&date=`+formatDate(p.postdate)+`&postData=`+p.postData+`&proPic=`+image+`" class="btn btn-sm btn-primary">
                         comments <span class="badge badge-light"></span>
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
              }
              },
              error: function(error) {
                // Handle error
                console.error(error);
              }
            });


          });

          $(document).on('click', '.save', function(){

            var Id = $(this).attr('id');
            $("#"+Id+"").text('Saved!');
            $("#"+Id+"").prop("disabled", true);
            $("#"+Id+"").css("background-color", "white");
            $("#"+Id+"").css({
              "color": "black",
              "border": "none"  
          });

          $.ajax({
            type: 'GET',
            url: 'http://localhost/SolutionExplore/repository/postDataRepository.php', 
            data: {type:'savePost',pid:Id,sid:id},
            success: function(data) {
              if(data == 0){
                alert("Post has been saved!");
                getSavePosts();
              }
            },
            error: function(error) {
              // Handle error
              console.error(error);
            }
          });


        
          
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
                <a href="../views/problem.html?id=`+id+`&title=`+p.title+`&postImage=`+p.img+`&name=`+p.name+`&postId=`+p.pid+`&img=`+p.image+`&date=`+formatDate(p.postdate)+`&postData=`+p.postData+`&proPic=`+image+`" class="q-ad">
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