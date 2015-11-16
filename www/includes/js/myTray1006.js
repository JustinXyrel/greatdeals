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
                content += '<li style="min-height:70px;" id="line_id_'+k+'"><span data-iconpos="right" style="position:relative;float:left;" id="editline-'+v.menu_id+'" data-rel="popup"></span><span style="white-space: normal;padding-left:10px;">'+unescape(v.menu_name)+'</span><span class="ui-btn-icon-notext ui-icon-delete delete-line"  data-line-id="'+k+'" data-id="'+v.menu_id+'" data-iconpos="right" style="position:relative;float:right;"></span><span class="ui-btn-icon-notext ui-icon-edit edit-line"  data-line-id="'+k+'" data-id="'+v.menu_id+'" data-iconpos="right" style="position:relative;float:right;padding-right:5%;"></span><span style="border:0px;font-weight:bold !important;font-size:14px !important;color:#d11f26;float:right;">₱'+displayInCurr(v.menu_cost*v.order_qty)+'</span><p style="width: 50%!important;overflow:hidden;text-overflow:ellipsis;font-weight:bold;padding-left:14%;" class="mod_'+k+'">';

                orderModCart = JSON.parse(orderModCart);
                                    
                $.each(orderModCart, function(k1,v1){
                    if(v1.line_id === k){
                         mods += v1.mod_name+'<br>';
                    }
                });
                
				content += mods;
                                // content += '</p><p style="width: 50%!important;overflow:hidden;text-overflow:ellipsis;font-weight:bold;padding-left:14%;">QTY: '+unescape(v.order_qty)+'</p></li>';
                content += '</p><p style="width: 50%!important;overflow:hidden;text-overflow:ellipsis;font-weight:bold;padding-left:10px;">'+unescape(v.order_qty)+' @ ₱'+displayInCurr(v.menu_cost)+'</p></li>';
                                subtotal += v.menu_cost * v.order_qty;
            });
            
			content += '</ul>';
			content += '<ul data-role="listview" style="border:0px;">';
            content += '<li style="border:0px;text-shadow:0;padding-left:10%;"><span>Sub-total:</span><span class="ui-li-count subTotalAmnt" style="text-align:right;border:0px;font-size: 16px !important;padding-right:10%;"> ₱'+displayInCurr(subtotal)+'</span></li>';
            
			if(om == 'delivery'){
                content += '<li style="border:0px;text-shadow:0;padding-left:10%;"><span class="delcharge">Delivery Charge:</span><span class="ui-li-count delcharge" style="text-align:right;border:0px;font-size: 16px !important;padding-right:10%;"> ₱'+displayInCurr(shipping_cost)+'</span></li>';           
		    }
            var total = subtotal += shipping_cost;
            content += '<li style="border:0px;text-shadow:0;padding-left:10%;background-color:#d11f26;color:white;"><span>Total:</span><span class="ui-li-count totalAmnt" style="text-align:right;border:0px;font-size: 16px !important;padding-right:10%;background-color:#d11f26;color:white;"> ₱'+displayInCurr(total)+'</span></li>';
            content += '</ul>';
                            /**********************************************
                            UNCOMMENT FOR PLOTTING ORDERS AS TABULAR
                            **********************************************/
                            // var hdr = ["Item", "Qty", "Price", "Amnt", ""];

                            // content += '<table data-role="table" class="ui-responsive order-list" id="orderstbl">';
                            //     content += '<thead><tr>';
                            //         for (var i=0; i<hdr.length; i++){
                            //             content += '<th class="title">'+hdr[i]+'</th>';
                            //         }
                            //     content += '</tr></thead>';
                            //     content += '<tbody>';
                            //         var subTotal = 0;
                            //         var grandTotal = 0;
                            //         $.each(orderCart,function(k,v){
                            //             content += '<tr style="border-top:2px dashed;">';
                            //                 content += '<td>'+unescape(v.menu_name)+'</td>';
                            //                 content += '<td>'+unescape(v.order_qty)+'</td>';
                            //                 content += '<td> ₱'+displayInCurr(v.menu_cost)+'</td>';
                            //                 var amnt = 0;
                            //                 amnt = parseFloat(v.order_qty*v.menu_cost);
                            //                 subTotal += Number(amnt);
                            //                 content += '<td> ₱'+displayInCurr(amnt)+'</td>';
                            //                 content += '<td><span class="ui-btn-icon-notext ui-icon-delete delete-line"  data-line-id="'+k+'" data-id="'+v.menu_id+'" data-iconpos="right" style="position:relative;float:right;"></span>';
                            //                 content += '<span class="ui-btn-icon-notext ui-icon-edit delete-line"  data-line-id="'+k+'" data-id="'+v.menu_id+'" data-iconpos="right" style="position:relative;float:right;"></span></td>';
                            //             content += '</tr>';
                            //         });
                            //     content += '</tbody>';
                            // content += '</table>';

                            // content += '<ul data-role="listview" style="border:0px;position:relative;margin-top:10px;">';
                            //     content += '<li style="border:0px;text-shadow:0;padding-left:10%;"><span>Sub-total:</span><span class="ui-li-count subTotalAmnt" style="text-align:right;border:0px;font-size: 16px !important;padding-right:10%;"> ₱'+displayInCurr(subtotal)+'</span></li>';
                            //     if(om == 'delivery'){
                            //         content += '<li style="border:0px;text-shadow:0;padding-left:10%;"><span class="delcharge">Delivery Charge:</span><span class="ui-li-count delcharge" style="text-align:right;border:0px;font-size: 16px !important;padding-right:10%;"> ₱'+displayInCurr(shipping_cost)+'</span></li>';
                            //     }
                            //     var total = subTotal;
                            //     content += '<li style="border:0px;text-shadow:0;padding-left:10%;background-color:#d11f26;color:white;"><span>Total:</span><span class="ui-li-count totalAmnt" style="text-align:right;border:0px;font-size: 16px !important;padding-right:10%;background-color:#d11f26;color:white;"> ₱'+displayInCurr(total)+'</span></li>';
                            // content += '</ul>';

    }else{
        content = 'No order yet.';
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
        var orderCart = sessionStorage.order_header;
        if(typeof orderCart === "undefined"){
             window.location = 'order_method_details.html';
        }else{
			window.location = 'checkout.html';
        }
    });

    $('#back_to_menu').click(function(e){
        window.location = 'menu.html';
    });

});
