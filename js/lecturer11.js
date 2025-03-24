$(document).ready(function () {

    // Get the current date in the format "YYYY-MM-DD"
    var currentDate = new Date().toISOString().split('T')[0];

    // Set the current date as the default value for both date inputs
    document.getElementById('startDate').value = currentDate;
    document.getElementById('endDate').value = currentDate;

    loadData();
    function loadData() {
        $.ajax({
          url: "../repository/lecturerRepository.php",
          type: "GET",
          data: { type: 'getData' },
          success: function (data) {
            try {
                // Parse the JSON string into a JavaScript object
                var jsonData = JSON.parse(data);
        
                // Now, jsonData is an array of objects, and you can use forEach as before
                var rowHtml = '';
                jsonData.forEach(function (lecturer, index) {
                    
        
                    // Check if pimg is 'null' and set the appropriate image path
                    var profileImagePath = lecturer.pimg === 'null' ? '../img/pro.jpg' : '../img/' + lecturer.pimg;
        
                    rowHtml += '<tr>' +
                        '<th scope="row">' + (index + 1) + '</th>' +
                        '<td>' +
                        '<img src="' + profileImagePath + '" alt="Profile Pic" class="rounded-circle border" style="width: 30px; height: 30px; border: 2px solid #000; border-radius: 50%;">' +
                        '</td>' +
                        '<td>' + lecturer.name + '</td>' +
                        '<td>' + lecturer.course + '</td>' +
                        '<td>' + lecturer.lec_code + '</td>' +
                        '<td>' + lecturer.added_date + ' ' + lecturer.added_time + '</td>' +
                        '<td>' + lecturer.updated_date + ' ' + lecturer.updated_time + '</td>' +
                        '<td>' +
                        '<button class="update btn btn-success btn-sm rounded-0" style="margin-right:5px;" id="'+lecturer.id+'">Edit <i class="fas fa-edit"></i></button>' +
                        '<button class="del btn btn-danger btn-sm rounded-0" id="' + lecturer.id + '">Delete <i class="fas fa-trash"></i></button>' +
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

      
  //delete

  $(document).on('click', '.del', function() {
  
    $("#modal").modal("show");
    $("#lecId").val(this.id);

  
});

$(document).on('click', '.update', function(){

  var Id = $(this).attr('id');
  window.location.href = 'lecturerUpdate.html?id=' + Id;

});
  

$("#deleteBtn").on('click',function(){
  
  $.ajax({
    url: "../repository/lecturerRepository.php",
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