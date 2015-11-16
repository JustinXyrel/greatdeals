$(document).ready(function() {
    display_profile();
	$( '#panelTrgr').click(function(e){
        showCart();
    });

    var res_id = sessionStorage.res_id;
	 var res_cart = (typeof sessionStorage.orderCart !== 'undefined') ? JSON.parse(sessionStorage.orderCart) : '';
	 console.log('cart: ' + res_cart.length);
	if(res_cart.length == 0){
		$('#deliveryc_submit').hide();
		$('#takeoutc_submit').hide();
	}
	//console.lo
	 console.log(remoteHost+"clickPlatevp/app_resto/searchBranches/"+res_id);
    $.ajax({
        url : remoteHost+"clickPlatevp/app_resto/searchBranches/"+res_id,
        type: 'POST',
        dataType : "json",
        cache: false,
        data: {"name":"JSON_Request"},
        success:function(data) {
		console.log(data);
			var branch_list = '';
            var select = $('select#brSel');
            $.each(data.branches,function(k,v){
                opt = '<option value="'+v.br_id+'">'+v.br_name+'</option>';
                select.append(opt);
            });
            select.selectmenu();
            select.selectmenu('refresh',true);
            $('select#brSel').trigger("change");
        }
    });

    $('select#brSel').change(function() {
        var val = $(this).val();
        
		if(val != ''){
            sessionStorage.br_id = val;
            var res_id = sessionStorage.res_id;
            refreshTable(res_id,val);
        }
    });

    $('#delivery_user_name,#res_user_name,#func_user_name,#takeout_user_name').val(sessionStorage.logged_name);
    $('#res_contact_no,#func_contact_no,#takeout_contact_no,#delivery_mobile_no').val(sessionStorage.mobile_no);
    if($("input[name=delivery_address]").is(':checked') === true) {
        var value = $( 'input[name=delivery_address]:checked' ).val();
        if(value != 'add-addr'){
            $('#delivery_del_floor').val(sessionStorage.unit_no);
            $('#delivery_del_street').val(sessionStorage.street);
            $('#delivery_del_village').val(sessionStorage.barangay);
            $('#delivery_del_bldg').val(sessionStorage.building);
            $('#delivery_del_city').val(sessionStorage.city);
            $('#delivery_del_province').val(sessionStorage.province);
        }else{
            $('#delivery_del_floor').val('');
            $('#delivery_del_street').val('');
            $('#delivery_del_village').val('');
            $('#delivery_del_bldg').val('');
            $('#delivery_del_city').val('');
            $('#delivery_del_province').val('');
        }
    }

    $('input[name=delivery_address]').change(function(){
        var value = $( 'input[name=delivery_address]:checked' ).val();
                        // alert(value);
            if(value != 'add-addr'){
                $('#delivery_del_floor').val(sessionStorage.unit_no);
                $('#delivery_del_street').val(sessionStorage.street);
                $('#delivery_del_village').val(sessionStorage.barangay);
                $('#delivery_del_bldg').val(sessionStorage.building);
                $('#delivery_del_city').val(sessionStorage.city);
                $('#delivery_del_province').val(sessionStorage.province);
            }else{
                $('#delivery_del_floor').val('');
                $('#delivery_del_street').val('');
                $('#delivery_del_village').val('');
                $('#delivery_del_bldg').val('');
                $('#delivery_del_city').val('');
                $('#delivery_del_province').val('');
			}
    });

    $('#servSel').change(function(){
        var servSel = $(this).val();
        $('#reserve-tbl,#delivery,#takeout,#instore').hide();
        $('#'+String(servSel)).show();
        sessionStorage.order_method = servSel;
    });

    if($("input[name=delivery_date_opts]").is(':checked') === true) {
        var value = $( 'input[name=delivery_date_opts]:checked' ).val();
        
		if(value == 'date-now'){
            var d = new Date();
            var month = d.getMonth()+1;
            var day = ("0" + d.getDate()).slice(-2);
            var strDate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + day;
            var seconds = d.getSeconds();
            var minutes = d.getMinutes();
            var hour = d.getHours();
            var strTime = hour + ":" + minutes;
			
			$('#delivery_reserved_date').val(strDate);
            $('#delivery_reserved_time').val(strTime);
        }else{
            $('#delivery_reserved_date').val('');
        }
    }
    
	$('input[name=delivery_date_opts]').change(function(){
        var value = $( 'input[name=delivery_date_opts]:checked' ).val();
        
		if(value == 'date-now'){
            var d = new Date();
            var month = d.getMonth()+1;
            var day = ("0" + d.getDate()).slice(-2);
            var strDate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + day;
			var seconds = d.getSeconds();
            var minutes = d.getMinutes();
            var hour = d.getHours();
			var strTime = hour + ":" + minutes;
			$('#delivery_reserved_date').val(strDate);
            $('#delivery_reserved_time').val(strTime);
        }else{
            $('#delivery_reserved_date').val('');
            $('#delivery_reserved_time').val('');
        }
    });
    //add or subtract amount to quantity field...
    var min_qty = 1;
    $('.qtyplus').click(function(e){
        e.preventDefault();
        fieldName = $(this).attr('attr-pointer-field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal)) {
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            $('input[name='+fieldName+']').val(min_qty);
        }
    });
	
    $('.qtyminus').click(function(e){
        e.preventDefault();
        fieldName = $(this).attr('attr-pointer-field');
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        if (!isNaN(currentVal) && currentVal > 1) {
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            $('input[name='+fieldName+']').val(min_qty);
        }
    });

    //Others, function type...
    $('#res_function_type_others').hide();
    $('#res_function_type').change(function() {
    var sel = $('option:selected', this).val();
		if(sel == 'OTHERS' && sel != '')
			$('#res_function_type_others').show();
		else
			$('#res_function_type_others').hide();
    });

	$('#img-layout').html('<img src="'+remoteHost+'clickPlatevp/uploads/'+res_id+'/layout.png" style="width:100%;">');

	var br_id = sessionStorage.br_id;
    refreshTable(res_id,br_id);
    
	function refreshTable(rr,br){
        console.log(remoteHost+"clickPlatevp/app_orders/getTables/"+encodeURIComponent(rr)+"/"+encodeURIComponent(br));
                        //Table Number dropdown
        $.ajax({
            url : remoteHost+"clickPlatevp/app_orders/getTables/"+encodeURIComponent(rr)+"/"+encodeURIComponent(br),
            type: 'POST',
            dataType : "json",
            cache: false,
            data: {"name":"JSON_Request"},
            success:function(data) {
			console.log(data);
                var table_list = '';
                var select = $('select#res_table_no');
                var opts = '';
                
				opts += '<option value="">Select Table Number</option>';
				console.log(data.tables);
				console.log(data.tables.length);
				$.each(data.tables,function(k,v){
                    opts += '<option value="'+v.table_id+'" data-capacity="'+v.capacity+'">'+v.name+'</option>';
                });
                
				select.html(opts);
                select.selectmenu();
                select.selectmenu('refresh',true);
                window.location = "#reload";
            }
        });
    }

	$('#res_table_capacity').val('').textinput('disable');
    $('select#res_table_no').change(function() {
    var id = $(this).val();
    
	if(id != '')
        $.ajax({
            url : remoteHost+"clickPlatevp/app_orders/getTableCapacity/"+encodeURIComponent(id),
            type: 'POST',
            dataType : "json",
            cache: false,
            data: {"name":"JSON_Request"},
            success:function(data) {
                $('#res_table_capacity').val(data.capacity).textinput('disable');
            }
        });
    else
        $('#res_table_capacity').val('').textinput('disable');
    });

    var om = sessionStorage.order_method;
    var res_name = sessionStorage.res_name;
    //By default, initialize form fields hidden...
    $('#reserve-tbl,#delivery,#takeout,#instore').hide();
    $('#servSel option[value="'+om+'"]').attr("selected", "selected").change();
	console.log('order method '+ om);
    if(typeof om !== "undefined") {
	
        switch(om){
            case 'reserve-tbl' :
                $('.pagetitle').html(res_name);
                var order_header = sessionStorage.order_header;
						console.log(order_header);
                if(typeof(order_header) !== "undefined"){
                    order_header = JSON.parse(order_header);
                    $.each(order_header,function(k,v){
                        $('#'+k).val(v);
                        switch(k){
                            case 'user_name': $('#res_user_name').val(v);   break;
                            case 'contact_no': $('#res_contact_no').val(v);   break;
                            case 'table_no': $('#res_table_no').val(v);   break;
                            case 'guest_no': $('#res_guest_no').val(v);   break;
                            case 'reserved_date': $('#res_reserved_date').val(v);   break;
                            case 'reserved_start_time': $('#res_reserved_start_time').val(v);   break;
                            case 'special_request': $('#res_special_request').val(v);   break;
                        }
                    });
                }
                break;
            case 'delivery' :
                $('.pagetitle').html(res_name);
                var order_header = sessionStorage.order_header;
					console.log(order_header);
                if(typeof(order_header) !== "undefined"){
                    order_header = JSON.parse(order_header);
                    $.each(order_header,function(k,v){
                        $('#'+k).val(v);
                        switch(k){
                            case 'user_name': $('#delivery_user_name').val(v);   break;
                            case 'mobile_no': $('#delivery_mobile_no').val(v);   break;
                            case 'contact_no': $('#delivery_contact_no').val(v);   break;
                            case 'del_floor': $('#delivery_del_floor').val(v);   break;
                            case 'del_street': $('#delivery_del_street').val(v);   break;
                            case 'del_village': $('#delivery_del_village').val(v);   break;
                            case 'del_bldg': $('#delivery_del_bldg').val(v);   break;
                            case 'del_city': $('#delivery_del_city').val(v);   break;
                            case 'del_province': $('#delivery_del_province').val(v);   break;
                            case 'del_landmark': $('#delivery_del_landmark').val(v);   break;
                            case 'special_request': $('#delivery_special_request').val(v);   break;
                            case 'reserved_date': $('#delivery_reserved_date').val(v);   break;
                           case 'reserved_start_time': $('#delivery_reserved_time').val(v);   break;
                        }
                    });
                }
                break;
            case 'takeout' :
                $('.pagetitle').html(res_name);
                var order_header = sessionStorage.order_header;
				console.log(order_header);
                if(typeof(order_header) !== "undefined"){
                    order_header = JSON.parse(order_header);
                    $.each(order_header,function(k,v){
                        $('#'+k).val(v);
                        switch(k){
                            case 'user_name': $('#takeout_user_name').val(v);   break;
                                case 'contact_no': $('#takeout_contact_no').val(v);   break;
                                case 'reserved_date': $('#takeout_reserved_date').val(v);   break;
                                case 'reserved_time': $('#takeout_reserved_start_time').val(v);   break;
                                case 'special_request': $('#takeout_special_request').val(v);   break;
                        }
                    });
                }
                break;
            case 'instore' :
                $('.pagetitle').html(res_name);
                var order_header = sessionStorage.order_header;
					console.log(order_header);
                if(typeof(order_header) !== "undefined"){
                    order_header = JSON.parse(order_header);
                    $.each(order_header,function(k,v){
						$('#'+k).val(v);
						switch(k){
							case 'user_name': $('#func_user_name').val(v);   break;
							case 'contact_no': $('#func_contact_no').val(v);   break;
							case 'reserved_date': $('#func_reserved_date').val(v);   break;
							case 'reserved_start_time': $('#func_reserved_start_time').val(v);   break;
							case 'reserved_end_time': $('#func_reserved_end_time').val(v);   break;
							case 'function_type': $('#func_function_type').val(v);   break;
							case 'function_type_others': $('#func_function_type_others').val(v);   break;
							case 'special_request': $('#func_special_request').val(v);   break;
						}
                    });
                }
                break;
        }
        
		$('#'+String(om)).show();
    }else{
        sessionStorage.order_method = 'reserve-tbl';
        window.location.reload();
    }

    var redirectTo = "menu.html";
	
    $('#res_submit').click(function(e){
        var capacity =  $('#res_table_capacity').val();
        var guest_no = $('#res_guest_no').val();
        if(capacity == ''){
			show_msg('Please select table no.');
           // alert('Please select table no.');
        }else if(capacity < guest_no){
			show_msg('Please do not exceed to maximum table capacity.');
           // alert('Please do not exceed to maximum table capacity.');
        }else{
			if($('#res_user_name').val() == '' || $('#res_contact_no').val() == '' || $('#res_table_no').val() == '' || $('#res_guest_no').val() == '' || $('#res_reserved_date').val() == '' || $('#res_reserved_start_time').val() == ''){
				show_msg('Please fill up required fields.');
				//alert('Please fill up required fields.');
			}else{
				var details = {
					user_id: $('#res_user_id').val(),
					user_name: $('#res_user_name').val(),
					contact_no: $('#res_contact_no').val(),
					table_no: $('#res_table_no').val(),
					guest_no: $('#res_guest_no').val(),
					reserved_date: $('#res_reserved_date').val(),
					reserved_start_time: $('#res_reserved_start_time').val(),
					special_request: $('#res_special_request').val()
				}
				
				sessionStorage.order_header = JSON.stringify(details);
				window.location = 'checkout.html';
			}
        }
    });

    $('#res_pre_order').click(function(e){
	    var capacity =  $('#res_table_capacity').val();
        if($('#res_user_name').val() == '' || $('#res_contact_no').val() == '' || $('#res_table_no').val() == '' || $('#res_guest_no').val() == '' || $('#res_reserved_date').val() == '' || $('#res_reserved_start_time').val() == ''){
            
			show_msg('Please fill up required fields.');
			//alert('Please fill up required fields.');
        }else{
			var capacity =  $('#res_table_capacity').val();
			var guest_no = $('#res_guest_no').val();
			var res_table_no = $('#res_table_no').val();
			
			if(capacity == ''){
				//alert('Please select table no.');
				show_msg('Please select table no.');

			}else if(capacity < guest_no){
				show_msg('Please do not exceed to maximum table capacity.');
			//	alert('Please do not exceed to maximum table capacity.');
			}else{
				var details = {
					user_id: $('#res_user_id').val(),
					user_name: $('#res_user_name').val(),
					contact_no: $('#res_contact_no').val(),
					table_no: $('#res_table_no').val(),
					guest_no: $('#res_guest_no').val(),
					reserved_date: $('#res_reserved_date').val(),
					reserved_start_time: $('#res_reserved_start_time').val(),
					special_request: $('#res_special_request').val()
				}
					sessionStorage.order_header = JSON.stringify(details);
					sessionStorage.table_no = res_table_no;
					window.location = redirectTo;
			}
        }
    });

    $("#func_pre_order").click(function(e){
        if($('#func_user_name').val() == '' || $('#func_contact_no').val() == '' || $('#func_reserved_date').val() == '' || $('#func_reserved_start_time').val() == '' || $('#func_reserved_end_time').val() == '' || $('#func_function_type').val() == ''){
           // alert('Please fill up required fields.');
		   show_msg('Please fill up required fields.');
        }else{
            var details = {
				user_id: $('#func_user_id').val(),
				user_name: $('#func_user_name').val(),
				contact_no: $('#func_contact_no').val(),
				reserved_date: $('#func_reserved_date').val(),
				reserved_start_time: $('#func_reserved_start_time').val(),
				reserved_end_time: $('#func_reserved_end_time').val(),
				function_type: $('#func_function_type').val(),
				function_type_others: $('#func_function_type_others').val(),
				special_request: $('#func_special_request').val()
			}
			sessionStorage.order_header = JSON.stringify(details);
			window.location = redirectTo;
		}
    })
     
	 $('#func_submit').click(function(e){
        if($('#func_user_name').val() == '' || $('#func_contact_no').val() == '' || $('#func_reserved_date').val() == '' || $('#func_reserved_start_time').val() == '' || $('#func_reserved_end_time').val() == '' || $('#func_function_type').val() == ''){
            //alert('Please fill up required fields.');
			show_msg('Please fill up required fields.');
        }else{
            var details = {
                user_id: $('#func_user_id').val(),
                user_name: $('#func_user_name').val(),
                contact_no: $('#func_contact_no').val(),
                reserved_date: $('#func_reserved_date').val(),
                reserved_start_time: $('#func_reserved_start_time').val(),
                reserved_end_time: $('#func_reserved_end_time').val(),
                function_type: $('#func_function_type').val(),
                function_type_others: $('#func_function_type_others').val(),
                special_request: $('#func_special_request').val()
            }
            sessionStorage.order_header = JSON.stringify(details);
			window.location = 'checkout.html';
        }
    });
    
	$('#delivery_submit').click(function(e){
        if($('#delivery_user_name').val() == '' || $('#delivery_mobile_no').val() == '' || $('#delivery_reserved_date').val() == '' || $('#delivery_reserved_time').val() == ''){
           // alert('Please fill up required fields.');
			show_msg('Please fill up required fields.');
        }else{
			delivery_submit(redirectTo);
        }
    });
	
	$('#deliveryc_submit').click(function(e){
        if($('#delivery_user_name').val() == '' || $('#delivery_mobile_no').val() == '' || $('#delivery_reserved_date').val() == '' || $('#delivery_reserved_time').val() == ''){
            //alert('Please fill up required fields.');
			show_msg('Please fill up required fields.');
        }else{
			delivery_submit('checkout.html');
        }
    });
	
	
	function delivery_submit(rTo){
		var details = {
				user_id: $('#delivery_user_id').val(),
				user_name: $('#delivery_user_name').val(),
				mobile_no: $('#delivery_mobile_no').val(),
				contact_no: $('#delivery_contact_no').val(),
				del_floor: $('#delivery_del_floor').val(),
				del_street: $('#delivery_del_street').val(),
				del_village: $('#delivery_del_village').val(),
				del_bldg: $('#delivery_del_bldg').val(),
				del_province: $('#delivery_del_province').val(),
				del_city: $('#delivery_del_city').val(),
				del_landmark: $('#delivery_del_landmark').val(),
				special_request: $('#delivery_special_request').val(),
				reserved_date: $('#delivery_reserved_date').val(),
				reserved_start_time: $('#delivery_reserved_time').val(),
				payment_method: $("input[type='radio'][name='delivery_payment_method']:checked").val()
			}
			
			sessionStorage.order_header = JSON.stringify(details);
			window.location = rTo;
	}
    
	$('#takeout_submit').click(function(e){
        if($('#takeout_user_name').val() == '' || $('#takeout_contact_no').val() == '' || $('#takeout_reserved_date').val() == '' || $('#takeout_reserved_start_time').val() == ''){
           // alert('Please fill up required fields.');
		   show_msg('Please fill up required fields.');
        }else{
			
			takeout_submit(redirectTo);
        }
    });
	
	$('#takeoutc_submit').click(function(e){
        if($('#takeout_user_name').val() == '' || $('#takeout_contact_no').val() == '' || $('#takeout_reserved_date').val() == '' || $('#takeout_reserved_start_time').val() == ''){
           // alert('Please fill up required fields.');
		   show_msg('Please fill up required fields.');
        }else{
			
			takeout_submit('checkout.html');
        }
    });
	
	function takeout_submit(rTo){
		var details = {
				user_id: $('#takeout_user_id').val(),
				user_name: $('#takeout_user_name').val(),
				contact_no: $('#takeout_contact_no').val(),
				reserved_date: $('#takeout_reserved_date').val(),
				reserved_time: $('#takeout_reserved_start_time').val(),
				special_request: $('#takeout_special_request').val()
			}
		   
			sessionStorage.order_header = JSON.stringify(details);
			window.location = rTo;
	}

    $('#page-ref').click(function(e){
        location.reload();
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
