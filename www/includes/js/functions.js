/**
** Function display_profile()
**   - displays the side panel menu in every page.
**
*/
    function display_profile(){
              var logged_user = sessionStorage.logged_name;
			  var item_cart = sessionStorage.orderCart;
			
              var content = '';
              if(typeof logged_user !== 'undefined'){
                content += '<ul data-role="listview" data-icon="false" class="ui-listview" id="cartList">';
                  content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-shop ui-btn-icon-left" data-theme="a" id="sidenav_mytray" data-ajax="false" style="font-weight:normal;">My Vouchers</a></li>';
                  content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-user ui-btn-icon-left" data-theme="a" id="sidenav_user_profile" data-ajax="false" style="font-weight:normal;">User Profile</a></li>';
                  content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-info ui-btn-icon-left" data-theme="a" id="sidenav_about" data-ajax="false" style="font-weight:normal;">About App</a></li>';
                 // content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-power ui-btn-icon-left" data-theme="a" id="sidenav_logout_" data-ajax="false" style="font-weight:normal;">Logout</a></li>';
                content += '</ul>';
                $('#myPanel').html(content);
              }else{
                content += '<ul data-role="listview" data-icon="false" class="ui-listview" id="cartList" style="">';
                content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-power ui-btn-icon-left" data-theme="a" id="sidenav_logout">Login</a></li>';
				if(typeof item_cart !== 'undefined' && item_cart.length > 2){
					content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-shop ui-btn-icon-left" data-theme="a" id="sidenav_mytray" data-ajax="false" style="font-weight:normal;">My Vouchers<span id="tray_content" style="display:inline;"></span></a></li>';			 
				}
                content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-info ui-btn-icon-left" data-theme="a" id="sidenav_about" data-ajax="false" style="font-weight:normal;">About App</a></li>';
				content += '</ul>';
                $('#myPanel').html(content);
              }
			  panel_navigation();
	}

/**
** Function showCart()
**   - 
**
*/
			                       
	function showCart() {
            var item_cart = sessionStorage.orderCart;
                item_cart = JSON.parse(item_cart);

                content = '';
                subtotal = 0;
                ctr = 0;
                gtotal = 0;
                for(var i in item_cart){
                    var line = JSON.parse(item_cart[i]);
                        content += '<li data-role="list-divider" style="list-style-type: none;padding-left:30px;"><h4 style="white-space: normal;">'+unescape(line.name)+' </h4>@ ₱'+displayInCurr(line.price)+' - '+unescape(line.qty)+'pcs. <strong>₱'+unescape(line.qty*line.price)+'</strong></li><br><hr>';
                        ctr++;
                        subtotal += Number(line.qty*line.price);
                        gtotal += Number(line.qty);
                }
                content += '<li style="text-align:right;">TOTAL : <strong>'+subtotal+'</strong></li>';
                $('#tray_content').html(content);
                var icount = Object.keys(item_cart).length;
                $('#tray_content').html(' ('+gtotal+')');
                $('#tray_content').trigger('updatelayout');
    }

	function goBack() {
        window.history.back();
    }
	
	function panel_navigation(){
	   $('#sidenav_user_profile').click(function(e){
            window.location.href = "user_profile.html";
       });
       $('#sidenav_logout_').click(function(e){
            window.location.href = 'logout.html';
       });
       $('#sidenav_logout').click(function(e){
			window.location.href = 'login_form.html';
       });
	   $('#sidenav_about').click(function(e){
            window.location.href = 'about_us.html';
       });
	   $('#sidenav_mytray').click(function(e){
            window.location.href = 'myTray.html';
       });
    }
	
    Array.prototype.remove = function(index){
            delete this[index];
            return this;
	};
    
	Array.prototype.clean = function(){
                var arr1 = this, arr2 = [];
                for(var a in arr1){
                    if(arr1[a]&&arr1.hasOwnProperty(a)){
                        arr2.push(arr1[a]);
                    }
				}
                
				this.splice(0);
                    for(var b in arr2){
                        if(arr2.hasOwnProperty(b)){
                            this.push(arr2[b]);
                        }
                    }
                return this;
    };

    function deleteIfMatches(arr, keyName, val) {
        for( var i = 0; i < arr.length; i++) {
			if (arr[i][keyName] == val) {
                arr.remove(i).clean();
            }
        }
		return arr;
    }

	function getTrayTotalAmnt(cart){
        var total = 0;
        
		$.each(cart, function(k,v){
            total += Number(v.menu_cost * v.order_qty);
		});
                           
        return total;
    }

