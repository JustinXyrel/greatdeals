$(document).ready(function(){
	       app.initialize();
              $('#sidenav_user_profile').click(function(e){
                  // console.log('Redirecting to Register Page...');
                  window.location.href = "user_profile.html";
              });
              $('#sidenav_logout').click(function(e){
                  // console.log('Redirecting to Index Page...');
                  // sessionStorage.clear();
                  window.location.href = 'index.html';
              });

});