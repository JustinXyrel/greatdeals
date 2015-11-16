$(document).ready(function(){
    var res_id = getUrlParameter('res_id');
    var menu_id = getUrlParameter('id');
            // var img = 'http://localhost/clickPlatevp/img/noimage.png';
	var img = remoteHost+"clickPlatevp/img/noimage.png";
	var header_details = '';
	var aaa = getUrlParameter('reloaded');
	
	display_profile();
	
	$( '#panelTrgr').click(function(e){
        showCart();
    });
	
	/*Add qty to the menu*/
	$('form').on('click', '#qtyminus', function (e) {
                e.preventDefault();
                fieldName = 'order_qty';
                var currentVal = parseInt($('input[name='+fieldName+']').val());
                if (!isNaN(currentVal) && currentVal > 1) {
                    $('input[name='+fieldName+']').val(currentVal - 1);
					console.log("qqqqqqqqqqqqqqqqqqq");
                } else {
                    $('input[name='+fieldName+']').val(currentVal);	console.log("aaaaaaaaaaaa");
                }
	});
			
	/*Deduct qty to the menu*/
	$('form').on('click', '#qtyplus', function (e) {
        fieldName = 'order_qty';
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal)) {
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
              $('input[name='+fieldName+']').val(currentVal);
        }
	});

	/*************************************************************
        Load Menu details
    *************************************************************/
            
	$.ajax({
        url : remoteHost+"clickPlatevp/app_menus/getRestoMenus/"+res_id+"/"+menu_id,
        type: 'POST',
        dataType : "json",
		cache: false,
        data: {"name":"JSON_Request"},
        success:function(data) {
            items = JSON.stringify(data.branchMenus);
			items = JSON.parse(items);
            $.each(items,function(k,v){
                        header_details += '<li><a style="white-space: normal;" data-ajax="false"><img src="'+remoteHost+'clickPlatevp/'+v.menu_image+'" name="m_img" style="height:100%;" class="ui-li-thumb">'+v.menu_name+'<p style="white-space: normal;">'+isEmpty(v.menu_desc)+'<br><br><img id="qtyminus" src="img/icons/minus.png" style="top:100px;float:bottom;display:none;"><input type="number" name="order_qty" id="order_qty" value="1" data-corners="false" maxlength="3" style="width:50px;height:20px;display:none;"><img id="qtyplus" src="img/icons/plus.png" style="display:none;"></p></a><span class="ui-li-count ui-body-inherit" style="background-color:#7fbd26;color:#fff !important;text-shadow: none;"><h5>FREE</h5></span></li>';
                        header_details += '<input type=hidden id="menu_id" name="menu_id" value="'+v.menu_id+'">';
                        header_details += '<input type=hidden id="menu_name" name="menu_name" value="'+v.menu_name+'">';
                        header_details += '<input type=hidden id="menu_cost" name="menu_cost" value="'+v.menu_price+'">';
            });
            $('#hdr').append(header_details);
            $( "#hdr" ).listview( "refresh" );
        }
    });
    
	$( "#hdr" ).listview( "refresh" );

    /*************************************************************
        Load Menu Modifier
    *************************************************************/

  
            $('#add_to_tray').click(function(event){
                var orderCart = sessionStorage.getItem("orderCart");
				var $menu_id = $('#menu_id').val();
				var $get_sess_res = sessionStorage.getItem("res_id");
				var $switch = 0;
				var $m_img = $('img[name=m_img]').attr('src');
				
				console.log(res_id);
				if(!orderCart){
					orderCart = [];
				}else{
					orderCart = JSON.parse(orderCart);
				}
				console.log(orderCart.length);
				orderCart = deleteIfMatches(orderCart,'menu_id',$menu_id);
				if(orderCart.length > 0 && orderCart[0].res_id != res_id){
					$res_name = orderCart[0].res_name;
					$switch = 1;
				  swal({   
						title: "Switch Restaurant?", 
						text: "You're already have saved vouchers from another restaurant, do you want to switch restaurant?",  
						type: "warning",   showCancelButton: true, 
						confirmButtonColor: "#DD6B55",  
						confirmButtonText: "Yes",   
						cancelButtonText: "No",  
						closeOnConfirm: false,   
						closeOnCancel: false 
						}, function(isConfirm){   
							if (isConfirm) {    
								swal("New Voucher!", "Your voucher is ready.", "success"); 
								$switch = 0;								
								orderCart = [];
								add_to_tray(orderCart,$menu_id,$('#menu_name').val(),$('#order_qty').val(),$('#menu_cost').val(),$m_img);
							} else {    
								$switch = 1;
								swal.close();
							} 
							
					    }
					);
				
				}
				console.log($switch);
				
				if($switch != 1){
					add_to_tray(orderCart,$menu_id,$('#menu_name').val(),$('#order_qty').val(),$('#menu_cost').val(),$m_img);
				}
            });

            $('#checkout').click(function(){
                window.location = "checkout.html";
            });
			
			function add_to_tray(orderCart,$menu_id,$menu_name,$order_qty,$menu_cost,$m_img){
					var res_code = sessionStorage.res_code;
					var orderMenu = {
										'menu_id':$menu_id,
										'menu_name':$menu_name,
										'order_qty':$order_qty,
										'menu_cost':$menu_cost,
										'line_id': orderCart.length,
										'res_id': res_id,
										'res_code': res_code,
										'img': $m_img,
									}
				   orderCart.push(orderMenu);
					
					var last_id = orderCart.length - 1;
					sessionStorage.orderCart = JSON.stringify(orderCart);
					var orderModCart = sessionStorage.getItem("orderModCart");
					orderModCart = JSON.parse(orderModCart);
					if(orderModCart == null) orderModCart = [];
				
					var orderMod = {};
					$('.modifiers').each(function(){
						if($(this).is(':checked')){
							orderMod = {
								mod_id:$(this).val(),
								mod_name:$(this).attr('mod-name'),
								line_id: last_id
							}
							orderModCart.push(orderMod);
						}
					});
					sessionStorage.orderModCart = JSON.stringify(orderModCart);
					$('a[data-rel=popup]').click();
				    setTimeout(function(){window.location = "menu.html"; },1000);
					return false;
			}
})