
app.initialize();
$(document).bind('mobileinit',function(){
   $.mobile.selectmenu.prototype.options.nativeMenu = false;
});
$(document).on('pageinit','#splash',function(){
    // alert('yyy');
    setTimeout(function(){
        $.mobile.changePage("#loaded", "fade");
    }, 2000);
});
$(document).ready(function() {
    // window.location = "home.html#loaded";

    // sessionStorage.clear();
    sessionStorage.countStars = 0;
    /*Refresh specified content*/
    $pullmsg = $('#pullmsg');
    $pullmsg.hide();

    $("#srch").prop('disabled', false);

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

    $.ajax({
        url : remoteHost+"clickPlatev2/app_resto/searchRestoByKeyword/all",
        type: 'POST',
        dataType : "json",
        data: {"name":"JSON_Request"},
        success:function(data) {
            console.log(data);
        }
    });

    function searchKeyword(param){
        console.log(remoteHost+"clickPlatev2/app_resto/searchRestoByKeyword/"+param);
        $.ajax({
            url : remoteHost+"clickPlatev2/app_resto/searchRestoByKeyword/"+param,
            type: 'POST',
            dataType : "json",
            data: {"name":"JSON_Request"},
            success:function(data) {
                if(data.count > 0 || param == 'all'){
                    sessionStorage.resto = JSON.stringify(data.resto);
                    var search = JSON.parse(sessionStorage.resto);
                    $.each(search,function(k,v){
                        window.location = "resto_search.html";
                    });
                }else{
                    alert('Keyword entered not found.');
                }
            },
            error: function() {
                // alert('Keyword entered not found.');
            }
        });
    }

    $( '#panelTrgr').click(function(e){
        showCart();
    });
    $('.errormsg').hide();
    $('#login').click(function(e){
        var uname = $('#l_login').val();
        var passwd = $('#l_passwd').val();
        $.ajax({
            url : remoteHost+"resto/appLogin/verify/"+encodeURIComponent(uname)+"/"+passwd,
            type: 'POST',
            dataType : "json",
            data: {"name":"JSON_Request"},
            success:function(data) {
                if(data.user_count > 0){
                    var curr_user = data.user;
                    // alert('Welcome back, '+curr_user.fname+' '+curr_user.lname);
                    sessionStorage.logged_name = curr_user.fname+' '+curr_user.lname;
                    display_profile();
                }else{
                    alert('Invalid login.');
                }
            },
            error: function() {alert('Invalid login.'); }
        });
    });

    $('.complogo').click(function(e){
        // window.location = "home.html";
        window.location = "index.html";
    });

    var mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        paginationClickable: true,
        slidesPerView: 1,
        visibilityFullFit: true
    });
    // mySwiper.stopAutoplay();
    mySwiper.resizeFix();
    mySwiper.params.autoplay = 2000;
    mySwiper.startAutoplay();

    $("body").css("display", "none");
    $("body").fadeIn(2000);
    $("#srch").bind( "keypress", function(e) {
        var code = e.keyCode || e.which;

        var kywrd = $('#srch').val();
        sessionStorage.keyword = kywrd;

        if(code == 13) {
            var keyword =$(this).val();

            // console.log(remoteHost+"clickPlatev2/app_resto/searchRestoByKeyword/"+keyword);
            // $.ajax({
            //     url : remoteHost+"clickPlatev2/app_resto/searchRestoByKeyword/"+keyword,
            //     type: 'POST',
            //     dataType : "json",
            //     data: {"name":"JSON_Request"},
            //     success:function(data) {
            //         if(data.count > 0){
            //             sessionStorage.resto = JSON.stringify(data.resto);
            //             var search = JSON.parse(sessionStorage.resto);
            //             $.each(search,function(k,v){
            //                 window.location = "resto_search.html";
            //             });
            //         }else{
            //             alert('Keyword entered not found.');
            //         }
            //     },
            //     error: function() {alert('Keyword entered not found.'); }
            // });
            searchKeyword(keyword);

            e.preventDefault();
        }
    });
    $('.btn_tap').click(function(e){
        var keyword = 'all';
        searchKeyword(keyword);
    });
    ///////////////////////////////////////
    //// REY
    ///////////////////////////////////////
    show_brands();
    function show_brands(){
        $.post(remoteHost+"clickPlatev2/get/resto_logos",function(data){
          console.log(data);
          var block = ['a','b','c','d'];
          var ctr = 0;
          $.each(data,function(resto_id,val){
            console.log(val);
            if(ctr == 4)
                ctr = 0;
            var main = $('<div/>').addClass('ui-block-'+block[ctr]);
            var body = $('<div/>').addClass('ui-body ui-body-a ui-corner-all').attr('res_id',resto_id);
            var tile = $('<div/>').addClass('tile-bg');

            tile.css({
                'background':'url("'+remoteHost+'clickPlatev2/'+val['path']+'") no-repeat',
                'href':'menu.html',
                'background-position':'center',
                'background-size':'contain'
            }).appendTo(body);

            tile.click(function(){
                var resto_id = $(this).parent().attr('res_id');
                sessionStorage.res_id = resto_id;

                console.log(remoteHost+"clickPlatev2/app_resto/getRestoName/"+resto_id);
                $.ajax({
                  url : remoteHost+"clickPlatev2/app_resto/getRestoName/"+resto_id,
                  type: 'POST',
                  dataType : "json",
                  data: {"name":"JSON_Request"},
                  success:function(data) {
                    console.log(data.resto_name);
                    sessionStorage.res_name = '';
                    sessionStorage.res_name = data.resto_name;
                    window.location = 'menu.html';
                  }
                });
            });
            body.appendTo(main);
            $('#brands-con').append(main);
            ctr++;
          });
        },'json');
    }
});
