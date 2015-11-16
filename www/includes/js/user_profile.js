            $(document).ready(function() {
				display_profile();
                var user_id =sessionStorage.user_id;
                var defaultPath = 'clickPlatevp/img/avatar.jpg';
                $.ajax({
                    url : remoteHost+"clickPlatevp/app_login/get_appUser/"+user_id+"/true",
                    type: 'POST',
                    dataType : "json",
                    success:function(data) {
                        if(typeof data.img.img_path != "undefined")
                        {
                            defaultPath = 'clickPlatevp/'+data.img.img_path;
                        }
                         $('.profile_image').attr('src',remoteHost+defaultPath);

                        var user = data.users[0];
console.log(user);
                        $('.uname').html(user.fname + " " +user.lname);

                        $('#fname').val(user.fname);
                        $('#mname').val(user.mname);
                        $('#lname').val(user.lname);
                        $('#suffix').val(user.suffix);

                        $('#mobile_no').val(user.mobile_no);
                        $('#email').val(user.email);
                        $('#app_user_id').val(user.app_user_id);

                        $('#unit_no').val(user.unit_no);
                        $('#building').val(user.building);
                        $('#block_no').val(user.block_no);
                        $('#street').val(user.street);
                        $('#subdivision').val(user.subdivision);
                        $('#barangay').val(user.barangay);
                        $('#city').val(user.city);
                        $('#province').val(user.province);
                        $('#zip_code').val(user.zip_code);

                    }
                });
                $('.input_forms :input').attr("disabled", true);



                $('#btn_change_photo').click(function(event){
                    $('#url_change_photo').click();
                    $('#pop_upload_image')[0].reset();

                    event.stopPropagation(); // Stop stuff happening
                    event.preventDefault(); // Totally stop stuff happening
                });

                $("form#pop_upload_image").submit(function(event){
                    if( document.getElementById("fileupload").files.length != 0 ){
                        var formData = new FormData($(this)[0]);

                         $.ajax({
                            url: remoteHost+"clickPlatevp/app_menus/upload_user_image/"+user_id,
                            type: 'POST',
                            data: formData,
                            async: false,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (returndata) {
                                if(returndata.error == '')
                                {
                                    if(typeof returndata.img_path != "undefined")
                                    {
                                       defaultPath = 'clickPlatevp/'+returndata.img_path;
                                    }
                                }
                            }
                          });

                        $('#change_photo').popup('close')
                     $('img.profile_image').attr('src',remoteHost+defaultPath);
                    }

                    event.stopPropagation();
                    event.preventDefault();
                    return false;

                });


                $('#edit_info').click(function(e){
                    $('.input_forms :input').attr("disabled", false);
                    $('.input_forms').removeClass('disabled_input_forms').css('display','block');
                    $('#update_profile').css('display','block');
                    e.preventDefault();
                });

                var check = true;
                $('#update_profile').click(function(e){
                    check = checkRequiredFields($('.userform'));
                    if(check)
                    {
                        $('.uname').html($('#fname').val() + " " +$('#lname').val());
                       // alert('Your update has been saved.');
						  swal({   
										title: "Success",
										text: "Your update has been saved.",  
										type: "success",
										 timer: 2000,
										showConfirmButton: false
						  });
				
                        $('.input_forms :input').attr("disabled", true);
                        $('.input_forms').addClass('disabled_input_forms');
                        $('#update_profile, .display_name').css('display','none');
                    }

                    e.preventDefault();
                });

                 var checkRequiredFields = function(form){

                        var msg = '';
						var err = 0;
                        $(".rOkay").each(function() {
						   
                           if( $(this).val().trim().length <= 0 )
                           {
						      console.log($(this));
                                $(this).css('background-color','#FFD0D0');
                                check = false;
                                msg = 'Required fields must be filled in.';
								err++;
                           }else{
						   console.log('perfect: ');
						     console.log($(this));
                                $(this).css('background','none');
                           }
                        });
console.log(check);
console.log(err);
                        if(err <= 0){
                            var details = form.serialize();
							console.log($('#app_user_id').val());
                            $.ajax({
                                  url :  remoteHost+"clickPlatevp/app_menus/addAppUsers/"+$('#app_user_id').val(),
                                  type: 'POST',
                                  dataType : "json",
                                  cache: false,
                                  data: {"details":details},
								  success: function(data){
									
									console.log(data);
									
									if(data.error == 1){
										check = false;
										swal({   
												title: "Oops..",  
												text: "Email address already exists",  
												type: "warning",  
												showCancelButton: false, 
												confirmButtonColor: "#d11f26",   
												confirmButtonText: "Okay!",  
												closeOnConfirm: true 
										});
												
										return false;
									}else{
										swal({   
											title: "Success",
											text: "Your update has been saved.",  
											type: "success",
											 timer: 2000,
											showConfirmButton: false
										});
									}
							
								  }
                            });

                        }else{
                         //   alert(msg);
							 swal({   
											title: "Oops..",  
											text: msg,  
											type: "warning",  
											showCancelButton: false, 
											confirmButtonColor: "#d11f26",   
											confirmButtonText: "Okay!",  
											closeOnConfirm: true });
								
                        }

                    };

            });