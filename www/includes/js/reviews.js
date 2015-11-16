$(document).ready(function() {

                    // $('#starHalf').raty({
                    //   half     : true,
                    //   path     : null,
                    //   starHalf : 'demo/images/star-half-mono.png',
                    //   starOff  : '../lib/images/star-off.png',
                    //   starOn   : '../lib/images/star-on.png'
                    // });
                    function display_profile(){
					console.log( sessionStorage);
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
                        // content += '<div class="panel-content">';
                        // content += '<ul data-role="listview" data-icon="false" class="ui-listview" id="cartList" style="">';
                        // content += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d">My Tray</li>';
                        subtotal = 0;
                        // shipping_cost = 0;
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
                        // content += '<li><span class="ui-btn-inner"><a href="order_method_details.html" class="customDialogOption2" data-role="button" data-theme="b">CHECKOUT</a></span></li>';
                        // content += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d"><a href="user_profile.html" style="color:white;text-decoration:none;">User Profile</a></li>';
                        // content += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d"><a href="about.html" style="color:white;text-decoration:none;">About clickPLATE</a></li>';
                        // content += '</ul>';
                        // content += ' <span><a data-role="button" href="#" class="toggle-panel ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-left ui-btn-up-a" data-theme="a" data-icon="delete" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span"><span class="ui-btn-inner"><span class="ui-btn-text">Checkout</a></span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a></span></div>';
                        // $('.count_order').append(ctr);
                        $('#tray_content').html(content);
                        var icount = Object.keys(item_cart).length;
                        $('#tray_content').html(' ('+gtotal+')');
                        $('#tray_content').trigger('updatelayout');
                    }

                    $( '#panelTrgr').click(function(e){
                        showCart();
                    });

                    var res_id = sessionStorage.res_id;
                    var br_id = sessionStorage.br_id;
                    var logged_user = sessionStorage.logged_name;
                    var user_id = '';
                    if(sessionStorage.user_id != undefined)
                        user_id = sessionStorage.user_id;

                    var res_name = sessionStorage.res_name;
                    $('.pagetitle').html(res_name);

					function refresh() {
                        $.mobile.changePage(
                            window.location.href,
                            {
                            allowSamePageTransition : true,
                            transition              : 'none',
                            showLoadMsg             : false,
                            reloadPage              : true
                            }
                        );
					}
					window.location = 'reviews.html#loaded';
					//refresh();
                    console.log('asdadadad'+(user_id.length));
                    if(user_id.length > 0){
                        $('#loggedinlink').show();
                        $('#loginlink').hide();

                        $('#reviewList').html('<div class="loader" style="text-align:center;"><img src="img/loader.gif">Loading...</div>');

                        $('#sbmt').click(function(e){
                            var comment = $('#comment').val();
                            // alert('zzz');

                            // comment = jQuery.param( comment );
                            // alert(remoteHost+"resto/restoList/restoAddBranchReviews/"+res_id+"/"+br_id+"/\""+escape(comment)+"\"");
                            var score = $('input[name="score"]').val();
                            if(score == '' || score == 0){
                                alert('You haven\'t evaluated yet.');
                            }else{
                                // console.log('asa --> '+remoteHost+"clickPlatevp/reviews/add_branch_reviews/"+br_id+"/"+user_id+"/1/"+score+"/"+encodeURI(comment));
                                e.preventDefault();
                                $.ajax({
                                      // url : remoteHost+"resto/restoList/restoAddBranchReviews/"+res_id+"/"+br_id+"/"+logged_user+"/\""+escape(comment)+"\"",
                                      //($br_id,$user_id,$rating,$reviews)
                                      url: remoteHost+"clickPlatevp/reviews/add_branch_reviews/"+br_id+"/"+user_id+"/1/"+score+"/"+encodeURIComponent(comment),
                                      type: 'POST',
                                      dataType : "json",
                                      cache: false,
                                      data: {"name":"JSON_Request"},
                                      success:function(data) {
                                        // alert('zzzzzzzzzzzz');
                                        $( "#reviewList" ).append(content);
                                        // window.location = 'reviews.html';
                                      }
                                });


                                window.location = 'reviews.html';

                                //Clear comment box...
                                $('#comment').val('');
                            }
                            return false;
                        });

                        $.ajax({
                            url: remoteHost+"clickPlatevp/reviews/get_branch_reviews_avg/"+br_id,
                            type: 'POST',
                            dataType : "json",
                            cache: false,
                            data: {"name":"JSON_Request"},
                            success:function(data) {
                                console.log('zzz'+data.avg);
                                sessionStorage.countStars = data.avg;
                            }
                        });

                        $.ajax({
                              // url : remoteHost+"resto/restoList/restoBranchReviews/"+res_id+"/"+br_id,
                              url: remoteHost+"clickPlatevp/reviews/get_branch_reviews/"+br_id,
                              type: 'POST',
                              dataType : "json",
                              cache: false,
                              data: {"name":"JSON_Request"},
                              success:function(data) {
                                // alert(data.items);
                                console.log();
                                items = JSON.stringify(data.items);
                                items = JSON.parse(items);
                                content = '';

                                content += '<ul data-role="listview" id="reviewList">';
                                $.each(items,function(k,v){
                                    // content += '<li><img src="../_assets/img/album-bb.jpg"><h5>'+unescape(v.comment)+'</h5></li>';
                                    // content += '<li><h5 style="white-space: normal;">'+unescape(v.logged_user)+'</h5><p>Posted on: '+v.comment_last+'</p></li>';
                                    content += '<li>';
                                    content += v.user;
                                    content += '<p>';
                                    // console.log(v.rating);
                                    console.log(v.name);
                                    for(var i=0;i<v.rating;i++){
                                        content += '<img src="plugins/raty/lib/images/star-on.png">';
                                    }
                                    content += '</p>';
                                    content += '<h5 style="white-space: normal;">'+unescape(v.comment)+'</h5><p>Posted on: '+v.comment_last+'</p>';
                                    // content += '<li><input class="star" type="radio" name="test-1-rating-1" value="N" title="No" data-role="none"/><input class="star" type="radio" name="test-1-rating-1" value="M" title="Maybe" data-role="none"/></li>';
                                    // content += '<li><div class="stars_small"><input type="hidden" name="score" value="3.5" readonly="readonly"></div></li>';
                                    content += '</li>';
                                    // $('.divli').raty({
                                    //     score: function() {
                                    //         return $(this).attr('data-score');
                                    //     }
                                    // });
                                    // $('input[type="radio"]').checkboxradio();
                                    // $('input[type="radio"]').checkboxradio("refresh");
                                    // content += '<li><div class="targetKeep"></div></li>';
                                    // $('.targetKeep').raty();
                                    // $('#reviewList').enhanceWithin();
                                });
                                content += '</ul>';

                                $('#reviewList').find('.loader').remove();
                                $( "#reviewList" ).append(content);
                                $('#reviewList').enhanceWithin();

                              }
                        });

                        $('.stars_small').raty({
                            cancel     : true,
                          target     : '#targetKeep-hint',
                          targetScore : false,
                          targetType : 'score',
                          starOff    : 'plugins/raty/lib/images/star-off.png',
                          starOn     : 'plugins/raty/lib/images/star-on.png',
                          cancelOff  : 'plugins/raty/lib/images/cancel-off.png',
                          cancelOn   : 'plugins/raty/lib/images/cancel-on.png'
                        });

                        $('.targetKeep').raty({
                          cancel     : true,
                          target     : '#targetKeep-hint',
                          targetScore : false,
                          targetType : 'score',
                          starOff    : 'plugins/raty/lib/images/star-off.png',
                          starOn     : 'plugins/raty/lib/images/star-on.png',
                          cancelOff  : 'plugins/raty/lib/images/cancel-off.png',
                          cancelOn   : 'plugins/raty/lib/images/cancel-on.png'
                        });
                    }else{
                        $('#loggedinlink').hide();
                        $('#loginlink').show();
                    }
                    $('#loginreq').click(function(e){
                        window.location = 'login_form.html';
                    });
});