$(document).ready(function(){
    var subHeader = '';
    var br_name = sessionStorage.br_name;
    var br_address = sessionStorage.br_address;
    var content = '';
    var orderCart = sessionStorage.orderCart;
                        // console.log(typeof orderCart);
	display_profile();
    $('#back_to_menu,#place_ordered').parent().hide();
    $( '#panelTrgr').click(function(e){
       showCart();
    });

    if(orderCart !== "undefined" && sessionStorage.getItem('orderCart') !== null) {
        $('#back_to_menu,#place_ordered').parent().show();
            orderCart = JSON.parse(orderCart);
            subtotal = 0;
            shipping_cost = 0;
            total = 0;
            var om = sessionStorage.order_method;

            /**********************************************
              UNCOMMENT FOR PLOTTING ORDERS AS LISTVIEW
            **********************************************/
            content += '<ul data-role="listview" id="orderList" style="font-size:14px;border:0px;" data-icon="star">';

			$.each(orderCart,function(k,v){
			    var orderModCart = sessionStorage.orderModCart;
				var mods = '';
                /*content += '<li style="min-height:70px;" id="line_id_'+k+'" qty="'+v.order_qty+'" cost="'+v.menu_cost+'"><span data-iconpos="right" style="position:relative;float:left;" id="editline-'+v.menu_id+'" data-rel="popup"></span><span style="white-space: normal;padding-left:10px;">'+unescape(v.menu_name)+'</span><span class="ui-btn-icon-notext ui-icon-delete delete-line"  data-line-id="'+k+'" data-id="'+v.menu_id+'" data-iconpos="right" style="position:relative;float:right;"></span><span class="ui-btn-icon-notext ui-icon-edit edit-line"  data-line-id="'+k+'" data-id="'+v.menu_id+'" data-iconpos="right" style="position:relative;float:right;padding-right:5%;"></span><span style="border:0px;font-weight:bold !important;font-size:14px !important;color:#d11f26;float:right;">₱'+displayInCurr(v.menu_cost*v.order_qty)+'</span><p style="width: 50%!important;overflow:hidden;text-overflow:ellipsis;font-weight:bold;padding-left:14%;" class="mod_'+k+'">';*/
				content += '<li style="min-height:70px;" id="line_id_'+k+'" qty="'+v.order_qty+'" cost="'+v.menu_cost+'" data-id="'+v.menu_id+'"><span data-iconpos="right" style="position:relative;float:left;" id="editline-'+v.menu_id+'" data-rel="popup"><a class="popupz" href="'+v.img+'"><img src="'+v.img+'" height="120px" width="120px" /></a></span><span style="white-space: normal;padding-left:10px;">'+unescape(v.menu_name)+'</span><span class="ui-btn-icon-notext ui-icon-delete delete-line"  data-line-id="'+k+'" data-id="'+v.menu_id+'" data-iconpos="right" style="position:relative;float:right;"></span><span style="white-space:normal"></span><p style="width: 50%!important;overflow:hidden;text-overflow:ellipsis;font-weight:bold;padding-left:14%;" class="mod_'+k+'">';


                orderModCart = JSON.parse(orderModCart);
                                    
                $.each(orderModCart, function(k1,v1){
                    if(v1.line_id === k){
                         mods += v1.mod_name+'<br>';
                    }
                });
                
				content += mods;
                                // content += '</p><p style="width: 50%!important;overflow:hidden;text-overflow:ellipsis;font-weight:bold;padding-left:14%;">QTY: '+unescape(v.order_qty)+'</p></li>';
                content += '</p><p style="width: 50%!important;overflow:hidden;text-overflow:ellipsis;font-weight:bold;padding-left:10px;" ><p class="show"><table width="70%"></table></p></p></li>';
                                subtotal += v.menu_cost * v.order_qty;
            });
            
			content += '</ul>';
			content += '<ul data-role="listview" style="border:0px;">';
           // content += '<li style="border:0px;text-shadow:0;padding-left:10%;"><span>Sub-total:</span><span name="subtotal" class="ui-li-count subTotalAmnt" style="text-align:right;border:0px;font-size: 16px !important;padding-right:10%;"> ₱'+displayInCurr(subtotal)+'</span></li>';
            
			if(om == 'delivery'){
                content += '<li style="border:0px;text-shadow:0;padding-left:10%;"><span class="delcharge">Delivery Charge:</span><span class="ui-li-count delcharge" style="text-align:right;border:0px;font-size: 16px !important;padding-right:10%;"> ₱'+displayInCurr(shipping_cost)+'</span></li>';           
		    }
            var total = subtotal += shipping_cost;
          //  content += '<li style="border:0px;text-shadow:0;padding-left:10%;background-color:#d11f26;color:white;"><span>Total:</span><span name="total" class="ui-li-count totalAmnt" style="text-align:right;border:0px;font-size: 16px !important;padding-right:10%;background-color:#d11f26;color:white;"> ₱'+displayInCurr(total)+'</span></li>';
            content += '</ul>';

    }else{
        content = 'No saved voucher at this time. Please choose from available discounts in the home page courtesy of Cong. Eric Santos.';
    }
    
	$( "#orderList" ).html(content);
    $('#orderList').enhanceWithin();
    $('#orderstbl').table( "refresh" );
    $('#summarytbl').table( "refresh" );

    $('.delete-line').click(function(e){
		var line_id = Number($(this).attr('data-line-id'));
		var id = Number($(this).attr('data-id'));
		var item_cart = sessionStorage.orderCart;
		item_cart = JSON.parse(item_cart);
	
		item_cart = deleteIfMatches(item_cart,'menu_id',id);
		var new_item_cart = JSON.stringify(item_cart);
		
		 // if(new_item_cart)
		sessionStorage.orderCart = new_item_cart;
		$('#line_id_'+line_id).remove();

		var total = getTrayTotalAmnt(item_cart);
		$('.subTotalAmnt,.totalAmnt').html(' ₱'+displayInCurr(total));
    });
                        //------------------------------------------------------------------------------

    $('#place_ordered').click(function(e){
		var user_id = sessionStorage.user_id;
		
		if(typeof user_id !== 'undefined'){
			window.location = 'checkout.html';
		}else{
			window.location = 'login_form.html';
		}
    });

    $('#back_to_menu').click(function(e){
        window.location = 'menu.html';
    });

	$('.popupz').magnificPopup({
						  type: 'image'
						  // other options
	});

	/**JX**/
	$('input[name=qty_input]').on('change keyup',function(){
		$order_menu = sessionStorage.getItem('orderCart');
		$parse_order = JSON.parse($order_menu);
		$id = $(this).parents('li').attr('data-id');
		$qty = $(this).val();

	   $span = $(this).parents('li').attr('data-id');
	   $found = _.where($parse_order,{menu_id: $id});
	   $found[0].order_qty = $qty
	   $json_val = JSON.stringify($parse_order);
	   //reset order cart 
	   sessionStorage.setItem('orderCart',$json_val); //reset order cart 
	   recompute_cart();
	   
	});
	
	/**JX**/
	function recompute_cart(){
		$order_menu = sessionStorage.getItem('orderCart');
		$parse_order = JSON.parse($order_menu);
		$total = 0;
		$.each($parse_order,function(key,value){
			$id = value.line_id;
			$cost = parseInt(value.menu_cost);
			$qty = parseInt(value.order_qty);
			$t_row_cost  = displayInCurr($cost * $qty) ;
			$total += parseInt($t_row_cost);
			console.log($total);
		//	$('li[id=line_id_'+$id+']').find('span[name=total_row]').text('₱'+$t_row_cost);
		});
		
		$('span[name=subtotal]').text('₱'+displayInCurr($total));
		$('span[name=total]').text('₱'+displayInCurr($total));
	}
	
});
