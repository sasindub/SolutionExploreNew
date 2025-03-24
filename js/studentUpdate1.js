$('#errorMsg').hide();
$('#loader').hide();
$('#successMsg').hide();
$('#ps').hide();

$(document).ready(function () {


    var myCheckbox = document.getElementById('resetPassword');


  myCheckbox.addEventListener('change', function() {
    
      if (myCheckbox.checked) {
        $('#ps').show();

        $('#pass').val('stu'+ $('#index').val());
        $('#repass').val('stu'+ $('#index').val());
      } else {
        $('#ps').hide();
        $('#pass').val('');
        $('#repass').val('');
      }
  });
   
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    // Get the id from the URL
    var id = getParameterByName('id');

    // Event listener for Index No input
    $('#index').on('input', function () {
        generatePassword();
    });


     //get data
     $.ajax({
        url: "../repository/studentRepository.php",
        type: "GET",
        data: { type: 'getDataById',
    id:id},
        success: function(data){
       


          var jsonData = JSON.parse(data);

          jsonData.forEach(function (s, index) {

            
            $('#sname').val(s.student_name);
            $('#index').val(s.index_no);
            $('#category').val(s.course);
            

          });

      
            
        }
    });

    // Function to generate password
    function generatePassword() {
        var indexNo = $('#index').val().trim();
        var generatedPassword = 'pass@' + indexNo;
        $('#pass').val(generatedPassword);
        $('#repass').val(generatedPassword);
    }

    // Toggle password visibility
    $('#togglePassword').click(function () {
        var passwordInput = $('#pass');
        var toggleIcon = $('#togglePasswordIcon');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            toggleIcon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            toggleIcon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    $('#registrationForm').submit(function (e) {
        // Reset borders
        $('input, select').removeClass('error');

        // Reset individual error messages
        $('#errorMsg').text('');

        // Validation logic
        var isValid = true;

        // Validate Student Name
        var studentName = $('#sname').val().trim();
        if (studentName === '') {
            $('#sname').addClass('error');
            $('#errorMsg').text('Please enter a valid student name.');
            isValid = false;
        }

        // Validate Index No
        var indexNo = $('#index').val().trim();
        if (indexNo === '' || !(/^co|ku|mtr|kd\d+$/i.test(indexNo))) {
            $('#index').addClass('error');
            $('#errorMsg').text('Please enter a valid index number.');
            isValid = false;
        }

        // Validate Course
        var course = $('#category').val();
        if (course === '') {
            $('#category').addClass('error');
            $('#errorMsg').text('Please select a course.');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault(); // Prevent form submission if validation fails
        } else {
            e.preventDefault();
            // Clear error message if validation passes
            $('#errorMsg').text('');
            $("#card").hide();
            $("#loader").show();
            var student = $('#sname').val();
            var index = $('#index').val();
            var category = $('#category').val();
            var pass = $('#pass').val();

            var id = getParameterByName('id');


                        $.ajax({
                            url: "../repository/studentRepository.php",
                            type: "POST",
                            data: {
                            student:student,
                            index:index,
                            category:category,
                            pass:pass,
                            id:id,
                            type:'update'},
                            before: function(){
                                
                            },
                            success: function(data){
                      
                                setTimeout(function () {
                                    $("#loader").fadeOut(500, function () {
                                        $("#card").fadeIn(500);
                                    });
                                }, 500);
                                $('#registrationForm')[0].reset();
            
                                if(data == 0){
                                    $('#successMsg').fadeIn(500, function () {
                                        // Hide success message after 500ms
                                        setTimeout(function () {
                                            $('#successMsg').fadeOut(500);
                                        }, 5000);
                                    });
            
                                    // Perform other actions if validation is successful
                            downloadTextFile(index + '_' + 'student' + '_details.txt', 'Student Index: ' + index + '\nPassword: ' + pass);
                            setTimeout(function() {
                                window.location.href = 'student.html';
                            }, 3000);
                                }else{
                                    $('#errorMsg').html('Something Went Wrong!');
                                    $('#errorMsg').fadeIn(500, function () {
                                        // Hide success message after 500ms
                                        setTimeout(function () {
                                            $('#errorMsg').fadeOut(500);
                                        }, 5000);
                                    });
                                }
            
            
                            },
                            error: function(error){
                                alert(error);
                            }
                        });


           

        }
    });

     function downloadTextFile(filename, text) {
                var blob = new Blob([text], { type: 'text/plain' });
                var a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }

    // Clear borders on input/select focus
    $('input, select').focus(function () {
        $(this).removeClass('error');
    });

    // Clear form on Clear button click
    $('#clear').click(function () {
        $('input, select').val('').removeClass('error');
        $('#errorMsg').text('');
    });
});