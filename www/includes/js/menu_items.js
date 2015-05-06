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
        content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="myTray.html" class="ui-btn ui-icon-shop ui-btn-icon-left" data-theme="a" id="sidenav_mytray" data-ajax="false" style="font-weight:normal;">My Tray<span id="tray_content" style="display:inline;"></span></a></li>';
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
var res_name = sessionStorage.res_name;
var res_id = sessionStorage.res_id;

$('.pagetitle').html(res_name);
show_brands();
function show_brands(){
    var cat_id = sessionStorage.menu_cat_id;
    var cat_name = sessionStorage.menu_cat_name;
    var block = ['a','b','c','d'];
    var ctr = 0;
    $('#category-name').text(cat_name);
    console.log(remoteHost+"clickPlatev2/app_menus/getBranchMenus/"+res_id+"/"+cat_id);
    // $.post(remoteHost+"clickPlatev2/get/resto_logos",function(data){
    $.ajax({
      url : remoteHost+"clickPlatev2/app_menus/getBranchMenus/"+res_id+"/"+cat_id,
      type: 'POST',
      dataType : "json",
      data: {"name":"JSON_Request"},
      success:function(data) {
        items = JSON.stringify(data.branchMenus);
        items = JSON.parse(items);
        var ul = $('<ul/>').attr({
            'data-role':"listview",
            'data-inset':"true",
            'id':"menu-list",
            'class':'gray-listview'
        });
        $.each(items,function(k,v){
          console.log(k+' -- '+v.menu_name);
            if(ctr == 4)
              ctr = 0;

            var li = $('<li/>').css({
                'border-raduis': '2px'
            });
            var img = $('<img>').attr({
                                'src': remoteHost+'clickPlatev2/'+v.menu_image
                            });
            var h2 = $('<h2/>').text(v.menu_name);
            var a = $('<a/>').attr({
                        'href': "menu_details.html?res_id="+res_id+"&id="+v.menu_id+"&reloaded=no",
                        'rel':'external'
                    }).css({
                        'background-color':'#ebebeb',
                        'color':'#000',
                        'border-color':'#cbcbcb',
                        'border-radius': '5px',
                        'margin-top':'5px',
                        'margin-bottom':'5px'
                    }).append(img).append(h2);
            li.append(a);
            ul.append(li);
            // var main = $('<div/>').addClass('ui-block-'+block[ctr]);
            // var body = $('<div/>').addClass('ui-body ui-body-a ui-corner-all').attr('menu_id',v.menu_id);
            // var tile = $('<div/>').addClass('tile-bg');
            // var title = $('<div/>').addClass('tile-title').append('<p>'+v.menu_name+'</p>');

            // title.appendTo(tile);
            // tile.css({
            //   'background':'url("'+remoteHost+'clickPlatev2/'+v.menu_image+'") 100% 100% no-repeat ',
            //   'href':'menu.html',
            //   'background-position':'center',
            //   // 'background-size':'cover'
            // }).appendTo(body);

            // tile.click(function(){
            //   var menu_id = $(this).parent().attr('menu_id');
            //   // alert(menu_id);
            //   // sessionStorage.menu_cat_id = menu_id;
            //   //menu_details.html?res_id=1&id=18&reloaded=no
            //   window.location = "menu_details.html?res_id="+res_id+"&id="+menu_id+"&reloaded=no";
            // });
            // body.appendTo(main);
            // $('#category_list').append(main);
            ctr++;
        });
        $('#category_list').append(ul);
        $("#menu-list").listview().listview("refresh");
      }
    });
    // $.ajax(remoteHost+"clickPlatev2/app_menus/getCategories/"+res_id,function(data){
    //   console.log(data.categories);
    //   var block = ['a','b','c','d'];
    //   var ctr = 0;
    //   $.each(data.categories,function(val){
    //     console.log(val);
    //     // if(ctr == 4)
    //     //     ctr = 0;
    //     // var main = $('<div/>').addClass('ui-block-'+block[ctr]);
    //     // var body = $('<div/>').addClass('ui-body ui-body-a ui-corner-all').attr('res_id',resto_id);
    //     // var tile = $('<div/>').addClass('tile-bg');

    //     // tile.css({
    //     //     // 'background':'url("'+remoteHost+'clickPlatev2/'+val['path']+'") no-repeat',
    //     //     'href':'menu.html',
    //     //     'background-position':'center',
    //     //     'background-size':'contain'
    //     // }).appendTo(body);

    //     // tile.click(function(){
    //     //     var resto_id = $(this).parent().attr('res_id');
    //     //     sessionStorage.res_id = resto_id;

    //     //     console.log(remoteHost+"clickPlatev2/app_resto/getRestoName/"+resto_id);
    //     //     $.ajax({
    //     //       url : remoteHost+"clickPlatev2/app_resto/getRestoName/"+resto_id,
    //     //       type: 'POST',
    //     //       dataType : "json",
    //     //       data: {"name":"JSON_Request"},
    //     //       success:function(data) {
    //     //         console.log(data.resto_name);
    //     //         sessionStorage.res_name = '';
    //     //         sessionStorage.res_name = data.resto_name;
    //     //       }
    //     //     });
    //     //     window.location = 'menu.html';
    //     // });
    //     // body.appendTo(main);
    //     // $('#brands-con').append(main);
    //     // ctr++;
    //   });
    // },'json');
}