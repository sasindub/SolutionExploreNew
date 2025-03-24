$(document).ready(function () {

    // Get the current date in the format "YYYY-MM-DD"
    var currentDate = new Date().toISOString().split('T')[0];

    // Set the current date as the default value for both date inputs
    document.getElementById('startDate').value = currentDate;
    document.getElementById('endDate').value = currentDate;

    loadData();
    function loadData() {
        $.ajax({
          url: "../repository/studentRepository.php",
          type: "GET",
          data: { type: 'getData' },
          success: function (data) {
            try {
                // Parse the JSON string into a JavaScript object
                var jsonData = JSON.parse(data);
        
                // Now, jsonData is an array of objects, and you can use forEach as before
                var rowHtml = '';
                jsonData.forEach(function (student, index) {
                    
        
                    // Check if pimg is 'null' and set the appropriate image path
                    var profileImagePath = student.pimage === null ? '../img/pro.jpg' : '../img/' + student.pimage;
        
                    rowHtml += '<tr>' +
                        '<th scope="row">' + (index + 1) + '</th>' +
                        '<td>' +
                        '<img src="' + profileImagePath + '" alt="Profile Pic" class="rounded-circle border" style="width: 30px; height: 30px; border: 2px solid #000; border-radius: 50%;">' +
                        '</td>' +
                        '<td>' + student.student_name + '</td>' +
                        '<td>' + student.course + '</td>' +
                        '<td>' + student.index_no + '</td>' +
                        '<td>' + student.added_date + ' ' + student.added_time + '</td>' +
                        '<td>' + student.updated_date + ' ' + student.updated_time + '</td>' +
                        '<td>' +
                        '<button class="update btn btn-success btn-sm rounded-0" style="margin-right:5px;" id="'+student.sid+'">Edit <i class="fas fa-edit"></i></button>' +
                        '<button class="del btn btn-danger btn-sm rounded-0" id="' + student.sid + '">Delete <i class="fas fa-trash"></i></button>' +
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


      $(document).on('click', '.del', function() {
  
        $("#modal").modal("show");
        $("#lecId").val(this.id);
    
      
    });

      $(document).on('click', '.update', function(){

        var Id = $(this).attr('id');
        window.location.href = 'studentUpdate.html?id=' + Id;
      
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
  
    

});