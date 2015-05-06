
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
    window.location = "home.html#loaded";
$(document).ready(function() {
    // alert('zzz');
    window.location = "home.html#loaded";

    /*Refresh specified content*/
    $pullmsg = $('#pullmsg');
    $pullmsg.hide();

    $("#srch").prop('disabled', false);
    // $(".ui-content")
    //     .pullToRefresh()
    //         .on("end.pulltorefresh", function (e, percent){
    //             // $pullmsg.html("<span class='glyphicon glyphicon-arrow-down'></span> Pull to refresh");
    //             // $('#srch').val('');
    //             $pullmsg.hide();
    //         })
    //           .on("move.pulltorefresh", function (e, percent){
    //             // $pullmsg.html(percent + ' %');
    //             $pullmsg.html('<center><img src="../www/img/icons/coffee.png">Pouring down coffee...</center>');
    //             $pullmsg.show();
    //             if(percent >= 30){
    //                 location.reload();
    //             }
    //           });

    function display_profile(){
        var logged_user = sessionStorage.logged_name;
        var content = '';
        if(typeof logged_user !== 'undefined'){
            content += '<ul data-role="listview" data-icon="false" class="ui-listview" id="cartList">';
                content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-shop ui-btn-icon-left" data-theme="a" id="sidenav_mytray" data-ajax="false" style="font-weight:normal;">My Tray</a></li>';
                content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-user ui-btn-icon-left" data-theme="a" id="sidenav_user_profile" data-ajax="false" style="font-weight:normal;">User Profile</a></li>';
                content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-info ui-btn-icon-left" data-theme="a" id="sidenav_about" data-ajax="false" style="font-weight:normal;">About clickPLATE</a></li>';
                content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-power ui-btn-icon-left" data-theme="a" id="sidenav_logout" data-ajax="false" style="font-weight:normal;">Logout</a></li>';
            content += '</ul>';
            $('#myPanel').html(content);
        }else{
            content += '<ul data-role="listview" data-icon="false" class="ui-listview" id="cartList" style="">';
                content += '<li class="ui-li ui-li-divider ui-bar-d"><a href="#" class="ui-btn ui-icon-power ui-btn-icon-left" data-theme="a" id="sidenav_logout">Login</a></li>';
            content += '</ul>';
            $('#myPanel').html(content);
        }

        $('#sidenav_user_profile').click(function(e){
            // console.log('Redirecting to Register Page...');
            window.location.href = "user_profile.html";
        });
        $('#sidenav_logout').click(function(e){
            // console.log('Redirecting to Index Page...');
            // sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }
    display_profile();
    $('.errormsg').hide();
    $('#login').click(function(e){
        // alert('aaaa');
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

    // alert('panget mo!');
    /*Clear all session storage*/
    // sessionStorage.clear();
    /**/
    $('.complogo').click(function(e){
        window.location = "home.html";
    });
    // $('#page-ref').click(function(e){
    //     location.reload();
    // });

    var $navDiv = $('<div data-role="panel" id="myPanel" data-position="right"  data-display="overlay">'),
        navDiv2 = '<ul data-role="listview" data-icon="false">',
            navLi = '<li class="ui-li-static ui-first-child" data-icon-"false">History</li>',
            endNavLi = '</li>',
        endNavDiv2 = '</ul>',
    endNavDiv = '</div>'
    ;

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

            $.ajax({
                url : remoteHost+"resto/restoList/searchRestoByKeyword/"+keyword,
                type: 'POST',
                dataType : "json",
                data: {"name":"JSON_Request"},
                success:function(data) {
                    if(data.count > 0){
                        sessionStorage.resto = JSON.stringify(data.resto);
                        var search = JSON.parse(sessionStorage.resto);
                        $.each(search,function(k,v){
                            window.location = "resto_search.html";
                        });
                    }else{
                        alert('Keyword entered not found.');
                    }
                },
                error: function() {alert('Keyword entered not found.'); }
            });

            e.preventDefault();
        }
    });
});
