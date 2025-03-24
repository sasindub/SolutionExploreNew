 $('#errorMsg').hide();
 $('#errorMsg').hide();
$('#loader').hide();
$('#successMsg').hide();
$(document).ready(function () {
   

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

    $('#fname, #lname').on('input', function () {
       
        var firstName = $('#fname').val().toLowerCase();
        var lastName = $('#lname').val().toLowerCase();
        
        var lecturerCode = (firstName + lastName.substring(0, 2)).toLowerCase() + '@lecnibm';

      
        $('#lcode').val(lecturerCode);
        function generatePassword(lecturerCode) {
            return 'lec' + lecturerCode;
        }
        
     
        $('#category').change(function () {
            if ($(this).val() !== '') {
                $(this).removeClass('border-danger');
                $('#errorMsg').hide();
            }
        });
        
        var autoGeneratedPassword = generatePassword(lecturerCode);
            $('#pass').val(autoGeneratedPassword);

        var autoGeneratedPassword = generatePassword(lecturerCode);
            $('#repass').val(autoGeneratedPassword);

            $('#submit').off('click').on('click', function (e) {
                e.preventDefault();
                var firstName = $('#fname').val().trim();
                var lastName = $('#lname').val().trim();
                var lecturerCode = $('#lcode').val();
                var category = $('#category').val();
                var password = $('#pass').val();
                var rePassword = $('#repass').val();
            
                $('#errorMsg').hide();
                $('.form-control').removeClass('border-danger');
            
                if (firstName === '' || lastName === '') {
                    $('#errorMsg').text('First name and last name should not be empty.').show();
                    return false;
                }
            
                if (/\s/.test(firstName) || /\s/.test(lastName)) {
                    $('#errorMsg').text('First name and last name should not contain spaces.').show();
                    return false;
                }
            
                if (category === '') {
                    $('#category').addClass('border-danger');
                    $('#errorMsg').text('Please select the course.').show();
                    return false;
                }
            
               
            
                if (!password.includes('lec') || !password.includes(lecturerCode)) {
                    $('#errorMsg').text('Auto-generated password should contain "lec" and the lecturer code.').show();
                    $('#pass').addClass('border-danger');
                    return false;
                }
            
                if (password !== rePassword) {
                    $('#errorMsg').text('Passwords do not match.').show();
                    $('#repass').addClass('border-danger');
                    return false;
                }
            
                $('#errorMsg').text('');
                $("#card").hide();
                $("#loader").show();  
        
        var name = $('#fname').val() + " " + $('#lname').val();
        var lecCode = $('#lcode').val(); 
        var course = $('#category').val();
        var lecPass = $('#pass').val();


                $.ajax({
                    url: "../repository/lecturerRepository.php",
                    type: "GET",
                    data: { type: 'validate_code',
                lec_code:lecCode},
                    success: function(data){
                        
                        setTimeout(function () {
                            $("#loader").fadeOut(500, function () {
                                $("#card").fadeIn(500);
                            });
                        }, 500);
    
                        if(data == 0)
                        {
                            $.ajax({
                                url: "../repository/lecturerRepository.php",
                                type: "POST",
                                data: {
                                    type:'insert',
                                    name:name,
                                    lecCode:lecCode,
                                    course:course,
                                    lecPass:lecPass},
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
                downloadTextFile(firstName + '_' + lastName + 'Lect_details.txt', 'Lecturer Code: ' + lecturerCode + '\nPassword: ' + password);
                
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
    
                        }else{
                                        $('#errorMsg').html('Already added the lecturer!');
                                        $('#errorMsg').fadeIn(500, function () {
                                            // Hide success message after 500ms
                                            setTimeout(function () {
                                                $('#errorMsg').fadeOut(500);
                                            }, 5000);
                                        });
                        }
                    }
                });
            
                return true;
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

            $('#clear').click(function () {
                $('#errorMsg').hide();
                $('.form-control').removeClass('border-danger');
                $('form')[0].reset();  // Reset the form fields
            });

        $('#back').click(function () {
            // Implement your back button logic here
        });

    });
});