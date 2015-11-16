
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
    var mySwiper = new Swiper('.swiper-container',{
        pagination: '.pagination',
        paginationClickable: true,
        slidesPerView: 1,
        visibilityFullFit: true
    });

    mySwiper.resizeFix();
    mySwiper.params.autoplay = 2000;
    mySwiper.startAutoplay();
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
  console.log(remoteHost+"clickPlatevp/app_resto/searchRestoByKeyword/");
    $.ajax({
        url : remoteHost+"clickPlatevp/app_resto/searchRestoByKeyword/all",
        type: 'POST',
        dataType : "json",
        data: {"name":"JSON_Request"},
        success:function(data) {
            //console.log(data);
        }
    });

    function searchKeyword(param){
        console.log(remoteHost+"clickPlatevp/app_resto/searchRestoByKeyword/"+param);
		loaderzShow();
        $.ajax({
            url : remoteHost+"clickPlatevp/app_resto/searchRestoByKeyword/"+param,
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
				loaderzHide();
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

    $('img.complogo').click(function(e){
        // window.location = "home.html";
        window.location = "index.html";
    });


    $("body").css("display", "none");
    $("body").fadeIn(2000);
    $("#srch").bind( "keypress", function(e) {
        var code = e.keyCode || e.which;

        var kywrd = $('#srch').val();
        sessionStorage.keyword = kywrd;

        if(code == 13) {
            var keyword =$(this).val();

            // console.log(remoteHost+"clickPlatevp/app_resto/searchRestoByKeyword/"+keyword);
            // $.ajax({
            //     url : remoteHost+"clickPlatevp/app_resto/searchRestoByKeyword/"+keyword,
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

        $.post(remoteHost+"clickPlatevp/get/resto_logos",function(data){
		  console.log('hhhhhhhhhhhhhhhh');
          console.log(data);
          var block = ['a','b','c','d'];
          var ctr = 0;
		  console.log('aaaaaaaaaa');
          $.each(data,function(resto_id,val){
            console.log(resto_id);
            if(ctr == 4)
                ctr = 0;
            var main = $('<div/>').addClass('ui-block-'+block[ctr]);
            var body = $('<div/>').addClass('ui-body ui-body-a ui-corner-all').attr('res_id',resto_id);
            var tile = $('<div/>').addClass('tile-bg');

            tile.css({
                'background':'url("'+remoteHost+'clickPlatevp/'+val['path']+'") no-repeat',
                'href':'menu.html',
                'background-position':'center',
                'background-size':'contain'
            }).appendTo(body);

            tile.click(function(){
				loaderzShow();
                var resto_id = $(this).parent().attr('res_id');
                sessionStorage.res_id = resto_id;
					
                console.log(remoteHost+"clickPlatevp/app_resto/getRestoName/"+resto_id);
                $.ajax({
                  url : remoteHost+"clickPlatevp/app_resto/getRestoName/"+resto_id,
                  type: 'POST',
                  dataType : "json",
                  data: {"name":"JSON_Request"},
                  success:function(data) {
				//  console.log('aaaaaaaaa');
                  //  console.log(data.resto_name);
                    sessionStorage.res_name = '';
                    sessionStorage.res_name = data.resto_name;
					sessionStorage.res_code= data.resto_code;
                    window.location = 'menu.html';
					loaderzHide();
                  }
                });
            });
            body.appendTo(main);
			console.log(main);
            $('#brands-con').append(main);
            ctr++;
          });
        },'json');
    }
});
