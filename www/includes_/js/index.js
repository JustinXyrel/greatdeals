
app.initialize();
$(document).bind('mobileinit',function(){
   $.mobile.selectmenu.prototype.options.nativeMenu = false;
});
$(document).ready(function() {
    window.location = "index.html#loaded";

    /*Clear all session storage
    */
    // sessionStorage.clear();
    $('.complogo').click(function(e){
        window.location = "index.html";
    });
    $('#page-ref').click(function(e){
        location.reload();
    });

    var $navDiv = $('<div data-role="panel" id="myPanel" data-position="right"  data-display="overlay">'),
        navDiv2 = '<ul data-role="listview" data-icon="false">',
            navLi = '<li class="ui-li-static ui-first-child" data-icon-"false">History</li>',
            endNavLi = '</li>',
        endNavDiv2 = '</ul>',
    endNavDiv = '</div>'
    ;

    // $('div').attr('data-role','page').append('<div data-role="panel" id="myPanel" data-position="right"  data-display="overlay">
    //             <ul data-role="listview" data-icon="false">
    //                 <li class="ui-li-static ui-first-child" data-icon-"false">History</li>
    //                 <li class="ui-li-static ui-body-inherit" data-icon-"false">My Profile</li>
    //                 <li class="ui-li-static ui-body-inherit">My Payments</li>
    //                 <li class="ui-li-static ui-body-inherit">Food</li>
    //                 <li class="ui-li-static ui-body-inherit">Locator</li>
    //                 <li class="ui-li-static ui-body-inherit">Favorites</li>
    //                 <li class="ui-li-static ui-body-inherit">FAQs</li>
    //                 <li class="ui-li-static ui-body-inherit">Report a Problem</li>
    //                 <li class="ui-li-static ui-body-inherit">Terms and Conditions</li>
    //                 <li class="ui-li-static ui-body-inherit">Privacy Policy</li>
    //                 <li class="ui-li-static ui-body-inherit ui-last-child">Logout</li>
    //             </ul>
    //         </div>');
    // $('div').attr('data-role','page').append(navDiv,navDiv2,navLi,endNavLi,endNavDiv2,endNavDiv);
    // $('div').attr('data-role','page').append($navDiv,[navDiv2,[navLi]]);

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

            // if(kywrd != 'chicken')
            //     alert('Keyword entered not found.');
            // else
                // $.post(remoteHost+"resto/restoList/searchRestoByKeyword/"+keyword, function( data ) {
                //     // window.location = "resto_search.html";
                //     var resp = JSON.stringify(data);

                // },'json').done(function() {
                //     // alert( "second success" );
                // })
                // .fail(function(e) {
                //     alert('Unable to fetch data.');
                // });
                ////////////////////////////////////////////////////////////////////////
                // $.getJSON( remoteHost+"resto/restoList/searchRestoByKeyword/"+keyword, function( data ) {
                //     var items = [];
                //     $.each( data, function( key, val ) {
                //         // items.push( "<li id='" + key + "'>" + val + "</li>" );
                //         alert(val);
                //     });
                // });
                ////////////////////////////////////////////////////////////////////////
                // alert(remoteHost+"resto/restoList/searchRestoByKeyword/"+keyword);
                $.ajax({
                    url : remoteHost+"resto/restoList/searchRestoByKeyword/"+keyword,
                    type: 'POST',
                    dataType : "json",
                    data: {"name":"JSON_Request"},
                    success:function(data) {
                        // var data = JSON.stringify(data);
                        // // console.log(data[0]);
                        // var items = JSON.parse(data);
                        // var a = jQuery.parseJSON( data );
                        // // alert(a);
                        // $.each(a, function(key,val){
                        //     // alert(val);
                        //     console.log('-->'key.' -- '.val);
                        // });
                        // alert('zxczxc');
                        // sessionStorage.resto = '';

                        if(data.count > 0){
                            sessionStorage.resto = JSON.stringify(data.resto);
                            // console.log('>>> ' + data.resto);
                            var search = JSON.parse(sessionStorage.resto);
                            $.each(search,function(k,v){
                                // console.log(v.branch_name);
                                // sessionStorage.res_name = v.res_name;
                                // sessionStorage.branch[v.res_name] = array('code'=>v.res_code,
                                //                                           'name'=>v.res_name,
                                //                                           'desc'=>v.res_desc,
                                //                                           'type'=>v.res_type
                                // );
                                window.location = "resto_search.html";
                            });
                        }else{
                            alert('Keyword entered not found.');
                        }
                        // alert(data);

                    },
                    error: function() {alert('Keyword entered not found.'); }
                });
                ////////////////////////////////////////////////////////////////////////

                // $( "<ul/>", {
                // "class": "my-new-list",
                // html: items.join( "" )
                // }).appendTo( "body" );
                // });

            e.preventDefault();
        }
    });
});
