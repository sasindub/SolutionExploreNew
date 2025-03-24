$(document).ready(function () {

    loadData();
    function loadData() {
        $.ajax({
          url: "../repository/postDataRepository.php",
          type: "GET",
          data: { type: 'getLog' },
          success: function (data) {
            try {
                // Parse the JSON string into a JavaScript object
                var jsonData = JSON.parse(data);
        
                // Now, jsonData is an array of objects, and you can use forEach as before
                var rowHtml = '';
                var status = '';
                var color = '';
                jsonData.forEach(function (p, index) {

                  if(p.status == 'login'){
color = 'green'
status = '<span style="background-color:green; color:white; padding:1px 10px 1px 10px; border-radius:5px;">login</span>'
                  }else{
                    color = 'blue'
                    status = '<span style="background-color:blue; color:white; padding:1px 5px 1px 5px; border-radius:5px;">logout</span>'
                  }

                    rowHtml += '<tr style="color:'+color+'; font-size:11pt;">' +
                        '' +
                        
                        '<td>' + p.date + '</td>' +
                        '<td>' + p.time + '</td>' +
                        '<td>' + p.name + '</td>' +
                        '<td>' + p.course + '</td>' +
                        '<td>' + p.username + '</td>' +
                        '<td>' + status+'</td>'+
                        
                        +
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


      $('#filterBtn').on('click', function() {
        // Get values
        var course = $('#category').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();

       if(startDate == "" || endDate == ""){
        alert("Please select a date range.");
       }else if(startDate > endDate){
        alert("Please select a vaild date range.");
       }else{
      
        $.ajax({
            url: "../repository/postDataRepository.php",
            type: 'GET',
            data: {
                type: 'filterLog',
                start_date: startDate,
                end_date: endDate
            },
            success: function(data) {
              try {
                // Parse the JSON string into a JavaScript object
                var jsonData = JSON.parse(data);
        
                // Now, jsonData is an array of objects, and you can use forEach as before
                var rowHtml = '';
                var status = '';
                var color = '';
                jsonData.forEach(function (p, index) {

                  if(p.status == 'login'){
color = 'green'
status = '<span style="background-color:green; color:white; padding:1px 10px 1px 10px; border-radius:5px;">login</span>'
                  }else{
                    color = 'blue'
                    status = '<span style="background-color:blue; color:white; padding:1px 5px 1px 5px; border-radius:5px;">logout</span>'
                  }

                    rowHtml += '<tr style="color:'+color+'; font-size:11pt;">' +
                        '' +
                        
                        '<td>' + p.date + '</td>' +
                        '<td>' + p.time + '</td>' +
                        '<td>' + p.name + '</td>' +
                        '<td>' + p.course + '</td>' +
                        '<td>' + p.username + '</td>' +
                        '<td>' + status+'</td>'+
                        
                        +
                        '</tr>';
                });
        
                $('#tblData').html(rowHtml);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
            
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
      }
    });
  



    $("#downloadReport").click(function () {
 
      var pdfName = "LogData_" + $('#startDate').val() + "-" + $('#endDate').val() + "_.pdf";
  
     // Get the content of #downloadDiv
  var downloadContent = document.getElementById('downloadDiv').innerHTML;
  
  // Get the start date, end date, and course name
  var startDate = $('#startDate').val();
  var endDate = $('#endDate').val();
  
  // Add the headline with dates and course name to the content
  var headline = '<img style="width:150px;" src="../img/lgb.png"/><br><h1 style="text-align: center;">Log Data</h1>' +
      '<p style="text-align: center;">Start Date: ' + startDate + ' | End Date: ' + endDate +'</p>';
  downloadContent = headline + downloadContent;
  
  // Use html2pdf to save the PDF
  html2pdf(downloadContent, {
      filename: pdfName,
      margin: 10,
      jsPDF: {
          unit: 'mm',
          format: 'a3',
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