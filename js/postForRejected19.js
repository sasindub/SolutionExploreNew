$(document).ready(function () {


    loadData();
    function loadData() {
        $.ajax({
          url: "../repository/postDataRepository.php",
          type: "GET",
          data: { type: 'getRejectedPost' },
          success: function (data) {
           
            try {
                // Parse the JSON string into a JavaScript object
                var jsonData = JSON.parse(data);
        
                // Now, jsonData is an array of objects, and you can use forEach as before
                var rowHtml = '';
                jsonData.forEach(function (p, index) {
                    
        
                  var postImagePath = '';

                  if (p.img !== '') {
                      postImagePath = '<img src="../postFiles/' + p.img + '" width="120" height="60" />';
                  }

                    rowHtml += '<tr>' +
                        '<th scope="row">' + (index + 1) + '</th>' +
                        
                        '<td>' + p.name + '</td>' +
                        '<td>' + p.course + '</td>' +
                        '<td style="max-width: 150px; overflow: hidden; text-overflow: ellipsis;">' + p.title + '</td>' +
                        '<td><div style="max-height: 100px; max-width: 400px; overflow-y: auto;">' + p.postData + '</div></td>' +
                        '<td>' + postImagePath + '</td>' +
                        '<td style="max-width: 100px; overflow: hidden; text-overflow: ellipsis;">' + p.postdate + " " + p.time+ '</td>'+
                        
                        '<td>' +
                        '<button class="accept btn btn-warning btn-sm rounded-0" style="margin-right:5px;" id="'+p.pid+'"><i class="fas fa-check"></i></button>' +
                        '<button class="reject btn btn-danger btn-sm rounded-0" id="' + p.pid + '"> <i class="fas fa-trash-alt"></i></button>' +
                        '</td>' +
                        '</tr>';
                });
        
                $('#tblData').html(rowHtml);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        },
        
          error: function (error) {
            console.log('Error loading data:', error);
          }
        });
      }


      $(document).on('click', '.reject', function() {
        $("#modal1").modal("show");
        $("#lecId").val(this.id);
    
      
    });

      $("#delBtn").on('click', function() {
        var id = $("#lecId").val();

        $.ajax({
          url: "http://localhost/SolutionExplore/repository/postDataRepository.php",
          type: "GET",
          data: {id:id,
            type:'deletePost'},
          success: function (data) {
           
      if(data ==0){
        alert("Post has been deleted!");
        loadData();
        location.reload();
      }else{
        alert("Something went wrong!sadsa");
      }
            
        },
        
          error: function (error) {
            console.log('Error loading data:', error);
          }
        });
    
      
    });

      $(document).on('click', '.accept', function(){

        var id = this.id;
        $("#"+id).prop("disabled", true);
        $("#" + id + ".reject").prop("disabled", true);
        $("#"+id).html('<div class="spinner-border spinner-border-sm" role="status">  <span class="sr-only">Loading...</span> </div>');

        $.ajax({
          url: "http://localhost/SolutionExplore/repository/postDataRepository.php",
          type: "GET",
          data: {id:id,
            type:'acceptPost'},
          success: function (data) {
            if(data ==0){
              alert("Post has been accepted!");
              loadData();
            }else if(data == 1){
              alert("Something went wrong!");
            }else{
              alert("Post has been accepted!");
              loadData();
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

      $("#filterBtn").click(function(e){
     
       $.ajax({
          url: "http://localhost/SolutionExplore/repository/postDataRepository.php",
          type: "GET",
          data: { type: 'filterRejectedData',
          category:$("#category").val() },
          success: function (data) {
              if(data=='[]'){alert("No data found!");}else{
            try {
              // Parse the JSON string into a JavaScript object
              var jsonData = JSON.parse(data);
 
              var rowHtml = '';
              jsonData.forEach(function (p, index) {
                  
      
                var postImagePath = '';

                if (p.img !== '') {
                    postImagePath = '<img src="../postFiles/' + p.img + '" width="120" height="60" />';
                }

                  rowHtml += '<tr>' +
                      '<th scope="row">' + (index + 1) + '</th>' +
                      
                      '<td>' + p.name + '</td>' +
                      '<td>' + p.course + '</td>' +
                      '<td style="max-width: 150px; overflow: hidden; text-overflow: ellipsis;">' + p.title + '</td>' +
                      '<td><div style="max-height: 100px; max-width: 400px; overflow-y: auto;">' + p.postData + '</div></td>' +
                      '<td>' + postImagePath + '</td>' +
                      '<td style="max-width: 100px; overflow: hidden; text-overflow: ellipsis;">' + p.postdate + " " + p.time+ '</td>'+
                      
                      '<td>' +
                      '<button class="accept btn btn-warning btn-sm rounded-0" style="margin-right:5px;" id="'+p.pid+'"><i class="fas fa-check"></i></button>' +
                      '<button class="reject btn btn-danger btn-sm rounded-0" id="' + p.pid + '"> <i class="fas fa-times-circle"></i></button>' +
                      '</td>' +
                      '</tr>';
              });
      
              $('#tblData').html(rowHtml);
          } catch (error) {
              console.error('Error parsing JSON:', error);
          }}
        },
        
          error: function (error) {
            console.log('Error loading data:', error);
          }
        });
      });
  
    

});