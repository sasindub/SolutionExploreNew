$(document).ready(function () {
  $('#downloadDiv').hide();
  const urlParams = new URLSearchParams(window.location.search);


  const id = urlParams.get('id');
  var title = '';
  var postData = '';
  var course = '';
  var postDate = '';


    loadData();
    function loadData() {
        $.ajax({
          url: "../repository/postDataRepository.php",
          type: "GET",
          data: { type: 'getComment',id:id },
          success: function (data) {
            
            if(data == '[]'){
              
              window.location.href = 'http://localhost/SolutionExplore/views/post.html';
              alert("No comments found!");
            }else{
            try {
              // Parse the JSON string into a JavaScript object
              var jsonData = JSON.parse(data);
      
              // Now, jsonData is an array of objects, and you can use forEach as before
              var rowHtml = '';
              var rowHtml2 = '';
              jsonData.forEach(function (lecturer, index) {
                 title = lecturer.title;
                 postData = lecturer.postData;
                 course = lecturer.course;
                 postDate = lecturer.postdate + " " + lecturer.time;
              
      
                  // Check if pimg is 'null' and set the appropriate image path
                  var profileImagePath = lecturer.pimg === 'null' ? '../img/pro.jpg' : '../img/' + lecturer.pimg;
      
                  rowHtml += '<tr>' +
                      '<th scope="row">' + (index + 1) + '</th>' +
                      '<td>' +
                      '<img src="../img/pro.jpg" alt="Profile Pic" class="rounded-circle border" style="width: 30px; height: 30px; border: 2px solid #000; border-radius: 50%;">' +
                      '</td>' +
                      '<td>' + lecturer.student_name + '</td>' +
                      '<td style="max-width: 400px; overflow: auto; max-height: 100px;">' + '<textarea readonly style="width: 462px; height: 100px; overflow-y: auto; border: none; background-color: transparent; resize: none;">'+lecturer.comment+'</textarea>' + '</td>' +
                      '<td>' + lecturer.c_date +" " + lecturer.c_time + '</td>' +
                       +
                      '<td>' + lecturer.updated_date + ' ' + lecturer.updated_time + '</td>' +
                      '<td>' +
                      '' +
                      '<button class="del btn btn-danger btn-sm rounded-0" id="' + lecturer.cid + '">Delete <i class="fas fa-trash"></i></button>' +
                      '</td>' +
                      '</tr>';

                      rowHtml2 += '<tr>' +
                      '<th scope="row">' + (index + 1) + '</th>' +
                      '<td>' +
                      '<img src="../img/pro.jpg" alt="Profile Pic" class="rounded-circle border" style="width: 30px; height: 30px; border: 2px solid #000; border-radius: 50%;">' +
                      '</td>' +
                      '<td>' + lecturer.student_name + '</td>' +
                      '<td style="max-width: 350px;">' + ''+lecturer.comment+'' + '</td>' +
                      '<td>' + lecturer.c_date +" " + lecturer.c_time + '</td>' +
                       +
                      '<td>' + lecturer.updated_date + ' ' + lecturer.updated_time + '</td>' +
                      '' +
                      '' + +
                      '</tr>';
              });
      
             
              $('#tblData').html(rowHtml);
              $('#tblData2').html(rowHtml2);
              

          } catch (error) {
              console.error('Error parsing JSON:', error);
          }
        }
        },
        
          error: function (error) {
            console.log('Error loading data:', error);
          }
        });
      }


      $(document).on('click', '.del', function() {
        $("#modal1").modal("show");
        $("#lecId").val(this.id);
    
      
    });

      $("#delBtn").on('click', function() {
        var id = $("#lecId").val();

        $.ajax({
          url: "http://localhost/SolutionExplore/repository/postDataRepository.php",
          type: "GET",
          data: {id:id,
            type:'deleteComment'},
          success: function (data) {
           
      if(data ==0){
        alert("Post has been deleted!");
        loadData();
        location.reload();
      }else{
        alert("Something went wrong!");
      }
            
        },
        
          error: function (error) {
            console.log('Error loading data:', error);
          }
        });
    
      
    });

    
      $("#deleteBtn").on('click',function(){
      
        $.ajax({
          url: "../repository/studentRepository.php",
          type: "GET",
          data: { type: 'delete',
          id:$("#lecId").val() },
          success: function (data) {
      
            if(data == 0){
              alert("Successfully Deleted!");
              $("#modal").modal("hide");
              loadData();
            }else{
              alert("Something went wrong!");
            }
        },
        
          error: function (error) {
            console.log('Error loading data:', error);
          }
        });
      
      });

  

      $(document).on('click', '.view', function() {
  
        var id = this.id;

        
        window.location.href = 'http://localhost/SolutionExplore/views/comment.html?id='+id;
    
      
    });
    
    $('#downloadReport').click(function () {
    
      var pdfName = "Comments_.pdf";
  
     // Get the content of #downloadDiv
  var downloadContent = document.getElementById('downloadDiv').innerHTML;

  
  // Add the headline with dates and course name to the content
  var headline = '<img style="width:150px;" src="../img/lgb.png"/></center><br><h1 style="text-align: center;">Comments Report</h1><br><h3 style="text-align: center;">Post Title: '+title+'<h3>' +
      '<p style="text-align: center;">Posted Date: ' + postDate + ' | Course: ' + course + '</p> <br><h4 style="text-align: center;"><b>Post:</b> <br>'+postData+'</h4><br><br>';
  downloadContent = headline + downloadContent;
  
  // Use html2pdf to save the PDF
  html2pdf(downloadContent, {
      filename: pdfName,
      margin: 10,
      jsPDF: {
          unit: 'mm',
          format: 'a2',
          orientation: 'portrait'
      }
  }).then(function (pdf) {
      // Open the PDF in a new window/tab
      var blob = pdf.output('blob');
      var url = URL.createObjectURL(blob);
      window.open(url, '_blank');
  });
  });
  
  
    

});