$(document).ready(function(){
	$('#submit').click(function(){
		var uname = $('#username').val();
		var passwd = $('#password').val();
       
		$.ajax({
			type: 'GET',
			url: remoteHost+"resto/appLogin/verify/"+uname+'/'+passwd,
			timeout: 15000,
			success: function(data) {
				console.log('success');
				console.log(data);
				window.location.href = "index.html"
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log(XMLHttpRequest);
				console.log(textStatus);
				console.log(errorThrown);
				console.log(remoteHost+"resto/appLogin/verify/"+uname+'/'+passwd);
				//alert('Invalid username/password.');
				show_msg('Invalid username/password.');
			}
		});
	});	
	

        /************************
                    LOGIN
        ************************/
	
        $('#login').click(function(e){
			e.preventDefault();
            var $this = $( this ),
				theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
                msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
                textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
                textonly = !!$this.jqmData( "textonly" );
                html = $this.jqmData( "html" ) || "";

                $.mobile.loading( "show", {
                        text: msgText,
                        textVisible: textVisible,
                        theme: theme,
                        textonly: textonly,
                        html: html
                });
						
                checkRequiredFields($('.userform'));

                $.mobile.loading( "hide" );
                e.preventDefault();
        });
		
		var checkRequiredFields = function(form){
                        var check = true;
                        var msg = '';
						loaderzShow();
                        $(".rOkay").each(function() {
                           if( $(this).val() == '' )
                           {
                                $(this).css('background-color','#FFD0D0');
                                check = false;
                                msg = 'Required fields must be filled in.'
                           }else{
                                $(this).css('background','none');
                           }
                        });

                    

                        if(check){
							
                            var details = form.serialize();
							console.log(details);
                            $.ajax({
                                  url :  remoteHost+"clickPlatevp/app_menus/addAppUsers/",
                                  type: 'POST',
                                  dataType : "json",
                                  cache: false,
                                  data: {"details":details},
                                  success:function(data) {
								  console.log(data);
									
                                    if(data.error == 1)
                                    {
									
										swal({   
											title: "Oops..",  
											text: "Email address already exists.",  
											type: "warning",  
											showCancelButton: false, 
											confirmButtonColor: "#d11f26",   
											confirmButtonText: "Okay!",  
											closeOnConfirm: true });
										 loaderzHide();
                                    }else{
									   swal({   
										title: "Added successfully!",
										text: "You will receive an email shortly. The discount vouchers are now available to use.",  
										type: "success",
										showConfirmButton: false
									  });
                                        console.log(remoteHost+"clickPlatevp/app_menus/send_confirm_registration_mail/"+data.id);
                                        $.ajax({
                                              url :  remoteHost+"clickPlatevp/app_menus/send_confirm_registration_mail/"+data.id,
                                              type: 'POST',
                                              dataType : "json",
                                              cache: false,
											  success:function(data) {
												console.log(data);
											  }
                                        });
										 loaderzHide();
									    /**AUTO LOGIN**/
										$email = $('input#email').val();
										$barangay = $('input#barangay').val();
										$city = $('input#city').val();
										$mobile_no = $('input#mobile_no').val();
										$name = $('input#fname').val() + " " + $('input#lname').val();
										 sessionStorage.user_id = data.id;
										 sessionStorage.logged_name = $name;
										 sessionStorage.barangay = $barangay;
										 sessionStorage.city = $city;
										 sessionStorage.mobile_no = $mobile_no;
										 
										 if(typeof sessionStorage.orderCart !== 'undefined'){
										   redirect_url = 'checkout.html';
										 }else{
										   redirect_url = 'index.html';
										 }
										 setTimeout(function(){
                                          window.location.href = redirect_url;
										 },2000);
                                    }
									loaderzHide();
                                  }
                            });
                        }else{
						
							swal({   
											title: "Oops..",  
											text: msg,  
											type: "warning",  
											showCancelButton: false, 
											confirmButtonColor: "#d11f26",   
											confirmButtonText: "Okay!",  
											closeOnConfirm: true });
                           // alert(msg);
						   loaderzHide();
                        }

                    };
                /************************
                    REGISTER
                ************************/
                $('#register').click(function(e){
                    console.log('Redirecting to Register Page...');
                    window.location.href = "register.html";
                });
                /************************
                    SKIP
                ************************/
                $('#skip').click(function(e){
                    console.log('Redirecting to Home Page...');
                    window.location.href = "index.html";
                });
				
	function show_msg($msg){
		swal({   
				title: "Oops..",  
				text: $msg,  
				type: "warning",  
				showCancelButton: false, 
				confirmButtonColor: "#d11f26",   
				confirmButtonText: "Okay!",  
				closeOnConfirm: true });
	}
});

 $(document).on('pageinit','#splash',function(){
                setTimeout(function(){
                    $.mobile.changePage("#page", "fade");

                    var order_header  = sessionStorage.order_header;
                    if(order_header === "undefined"){
                        console.log(order_header);
                        sessionStorage.clear();
                    }
                }, 2000);
            });