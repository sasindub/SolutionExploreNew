$(document).ready(function(){

    $("#sbtn").click(function(e){
        e.preventDefault();
        
        
        var username = $("#student-username").val();
        var pass = $("#student-password").val();

        $.ajax({
            url: "http://localhost/SolutionExplore/repository/loginRepository.php",
            type: "POST",
            data: {
                type:'studentlogin',
                username:username,
                pass:pass
            },
            success: function(data){
          
                if(data == 2)
                {
                    $("#error-student").hide();
                    window.location.href = 'http://localhost/SolutionExplore/views/resetPassword.html';
                }else if(data == 1){
                    $("#error-student").show();
                }else{
                    $("#error-student").hide();
                    window.location.href = 'http://localhost/SolutionExplore/index1.html?id=' + data;
                }
           

            },
            error: function(error){
                alert(error);
            }
        });


    });


    //lect
    $("#lbtn").click(function(e){
        e.preventDefault();

        var username = $("#lecturer-username").val();
        var pass = $("#lecturer-password").val();

        $.ajax({
            url: "http://localhost/SolutionExplore/repository/loginRepository.php",
            type: "POST",
            data: {
                type:'lectlogin',
                username:username,
                pass:pass
            },
            success: function(data){
          alert(data);
                if(data == 2)
                {
                    $("#error-lecturer").hide();
                    window.location.href = 'http://localhost/SolutionExplore/views/resetPassword.html';
                }else if(data == 1){
                    $("#error-lecturer").show();
                }else{
                    $("#error-lecturer").hide();
                    window.location.href = 'http://localhost/SolutionExplore/index1.html?id=' + data;
                }
           

            },
            error: function(error){
                alert(error);
            }
        });


    });
});