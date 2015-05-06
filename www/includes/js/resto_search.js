app.initialize();

$(document).ready(function() {
    window.location = "resto_search.html#loaded";

    function display_profile(){
        var logged_user = sessionStorage.logged_name;
        var content = '';
        if(typeof logged_user !== 'undefined'){
            content += '<ul data-role="listview" data-icon="false" class="ui-listview" id="cartList">';
            content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="myTray.html" class="ui-btn ui-icon-shop ui-btn-icon-left" data-theme="a" id="sidenav_mytray" data-ajax="false" style="font-weight:normal;">My Tray<span id="tray_content" style="display:inline;"></span></a></li>';
            content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-user ui-btn-icon-left" data-theme="a" id="sidenav_user_profile" data-ajax="false" style="font-weight:normal;">User Profile</a></li>';
            content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-info ui-btn-icon-left" data-theme="a" id="sidenav_about" data-ajax="false" style="font-weight:normal;">About clickPLATE</a></li>';
            content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-power ui-btn-icon-left" data-theme="a" id="sidenav_logout_" data-ajax="false" style="font-weight:normal;">Logout</a></li>';
            content += '</ul>';
            $('#myPanel').html(content);
        }else{
            content += '<ul data-role="listview" data-icon="false" class="ui-listview" id="cartList" style="">';
            content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-power ui-btn-icon-left" data-theme="a" id="sidenav_logout">Login</a></li>';
            content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-info ui-btn-icon-left" data-theme="a" id="sidenav_about" data-ajax="false" style="font-weight:normal;">About clickPLATE</a></li>';
            content += '</ul>';
            $('#myPanel').html(content);
        }

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
    }
    display_profile();
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

    $( '#panelTrgr').click(function(e){
      showCart();
    });

    var data = sessionStorage.resto;
    var search = JSON.parse(sessionStorage.resto);
    var res_id = sessionStorage.res_id;
    var item = '';
    $('.complogo').click(function(e){
        window.location = "index.html";
    });
    $('#page-ref').click(function(e){
        location.reload();
    });
    // $('#glb_home').click(function(e){
    //   // window.location.href = "home.html#loaded";
    //   window.location.href = "index.html#loaded";
    // });

    $.each(search,function(k,v){
     //  console.log('resid '+v.res_id);
      // console.log('img '+v.res_image);
      // item += '<li id="btn" data-id="'+v.res_id+'" data-name="'+v.res_name+'" data-inset="true"><a href="#" id="restaurant_id" data-r="'+v.res_id+'"><img src="'+remoteHost+'resto/uploads/'+v.res_id+'/'+v.res_image+'" class="ui-li-thumb" style="position: absolute;left: 1px;top: 0;max-height: 60px;max-width: 60px;"><h3 class="ui-li-heading">'+(v.res_name).toUpperCase()+'</h3><p class="ui-li-desc"><strong>'+v.res_type+'</strong></p><span style="position:relative;font-size:4px !important;" /><img src="img/icons/coffee.png"/><span style="font-size:12px;">'+v.res_desc+'</span></a></li>';
      // if(v.res_image == null) img_src = remoteHost+"/clickPlatev2/img/noimage.png";
     //  else img_src = remoteHost+'resto/uploads/'+v.res_id+'/'+v.res_image;
      item += '<li id="btn_'+v.res_id+'" data-id="'+v.res_id+'" data-name="'+v.res_name+'" data-inset="true"><a href="#" id="restaurant_id" data-r="'+v.res_id+'"><img id="img_'+v.res_id+'" class="ui-li-thumb" style="position: absolute;left: 1px;top: 0;max-height: 60px;max-width: 60px;"><h3 class="ui-li-heading">'+(v.res_name).toUpperCase()+'</h3><p class="ui-li-desc"><strong>'+v.res_type+'</strong></p><span style="position:relative;font-size:4px !important;" /><span style="font-size:12px;"><strong>Description: </strong>'+v.res_desc+'</span></a></li>';
      $.post(remoteHost+"clickPlatev2/get/resto_logos/"+v.res_id,function(data){
          $.each(data,function(resto_id,val){
              console.log(val.path);
              // if(val.path != ''){
                  sessionStorage.res_img_path = remoteHost+'clickPlatev2/'+val.path;
                  // console.log(img_path);
                  // subHeader += '<img src="'+img_path+'" class="ui-li-thumb"><input type="hidden" id="backing6"><div id="rateit6" data-rateit-ispreset="true" data-rateit-readonly="true"><h2 id="compName" style="white-space : normal;">'+res_name+'</h2><p style="white-space : normal;">';

              var img_src = '';
              if(typeof(sessionStorage.res_img_path) !== "undefined")
                // img_src = sessionStorage.res_img_path;
                img_src = remoteHost+'clickPlatev2/uploads/'+v.res_id+'/logo.png';
              else
                img_src = remoteHost+"/clickPlatev2/img/noimage.png";

              // var res_id = sessionStorage.res_id;
              console.log(resto_id);
              $('#img_'+resto_id).attr('src',img_src);
              // $("#btn_1").html('sdfsdf');
              // item += '<li id="btn" data-id="'+v.res_id+'" data-name="'+v.res_name+'" data-inset="true"><a href="#" id="restaurant_id" data-r="'+v.res_id+'"><img src="'+img_src+'" class="ui-li-thumb" style="position: absolute;left: 1px;top: 0;max-height: 60px;max-width: 60px;"><h3 class="ui-li-heading">'+(v.res_name).toUpperCase()+'</h3><p class="ui-li-desc"><strong>'+v.res_type+'</strong></p><span style="position:relative;font-size:4px !important;" /><span style="font-size:12px;"><strong>Description: </strong>'+v.res_desc+'</span></a></li>';


              // }
          });
      });

      // var img_src = '';
      // if(typeof(sessionStorage.res_img_path) !== "undefined")
      //   // img_src = sessionStorage.res_img_path;
      //   img_src = remoteHost+'clickPlatev2/uploads/'+v.res_id+'/logo.png';
      // else
      //   img_src = remoteHost+"/clickPlatev2/img/noimage.png";

      // item += '<li id="btn_"'+v.res_id+' data-id="'+v.res_id+'" data-name="'+v.res_name+'" data-inset="true"><a href="#" id="restaurant_id" data-r="'+v.res_id+'"><img src="'+img_src+'" class="ui-li-thumb" style="position: absolute;left: 1px;top: 0;max-height: 60px;max-width: 60px;"><h3 class="ui-li-heading">'+(v.res_name).toUpperCase()+'</h3><p class="ui-li-desc"><strong>'+v.res_type+'</strong></p><span style="position:relative;font-size:4px !important;" /><span style="font-size:12px;"><strong>Description: </strong>'+v.res_desc+'</span></a></li>';
    });

   	$('#mylist').delegate('li', 'click', function () {
   		var id = $(this).attr('data-id'),res_name = $(this).attr('data-name');
      // alert(id);
      sessionStorage.res_id = id;
   		sessionStorage.res_name = res_name;

      console.log(remoteHost+"clickPlatev2/app_resto/searchBranches/"+id);
      $.ajax({
        // url : remoteHost+"resto/restoList/searchBranches/"+id,
        url : remoteHost+"clickPlatev2/app_resto/searchBranches/"+id,
        type: 'POST',
        dataType : "json",
        data: {"name":"JSON_Request"},
        success:function(data) {
            console.log(data.branches);
            sessionStorage.resto_branches = JSON.stringify(data.branches);
            // console.log('>>> ' + data.resto);
            var search = JSON.parse(sessionStorage.resto_branches);
            $.each(search,function(k,v){
                // console.log(v.branch_name);
                // sessionStorage.res_name = v.res_name;
                // sessionStorage.branch[v.res_name] = array('code'=>v.res_code,
                //                                           'name'=>v.res_name,
                //                                           'desc'=>v.res_desc,
                //                                           'type'=>v.res_type
                // );
                var user_id = '';
                if(sessionStorage.user_id != undefined)
                  user_id = sessionStorage.user_id;

                console.log('---------> '+user_id);
                if(user_id.length > 0){
                  window.location = "info.html";
                }else{
                  sessionStorage.br_id = 1;
                  window.location = "info.html";
                  // window.location = "menu.html";
                }
            });

            // alert(data);

        },
        error: function(data) {
          // alert('Keyword entered not found.'+data);
          console.log(data);
        }
      });

      // window.location = "resto_branch.html";
   	});

    $('#mylist').append(item);
    // Enhance new listview element
    $('#mylist').listview('refresh');
    // Hide first listview element
    $('#mylist li').eq(0).addClass('ui-screen-hidden');
});