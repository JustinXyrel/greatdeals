// app.initialize();
$(document).ready(function() {
// $(document).on('pagebeforeshow', '#ui-content', function(){
    // Add a new listview element

    // var clickPlate = new Object();


    // var data = sessionStorage.branch_details;
    // var search = JSON.parse(data);
    // var item = '';
    // alert('zzzz');
    // $.each(search,function(k,v){
        // item += '<li id="btn" data-id="'+v.br_id+'"><a href="#" id="branches_id" data-r="'+v.br_id+'"><img src="img/urlogo.png" class="ui-li-thumb"><h3 class="ui-li-heading">'+v.br_name+'</h3><p class="ui-li-desc"><strong>'+v.br_address+'</strong></p></a></li>';
        // console.log('brrrr'+v.br_desc);
        $('#br_addr').html(sessionStorage.br_address);
        $('#br_cont').html(sessionStorage.br_delivery_no);
        $('#br_attr').html(sessionStorage.br_desc);

    // });
    var subHeader = '';
    var br_name = sessionStorage.br_name;
    var br_address = sessionStorage.br_address;

    subHeader += '<img src="img/urlogo.png" class="ui-li-thumb"><h2 id="compName">'+br_name+'</h2><p>'+br_address+'</p>';
    $('#subHdr').append(subHeader);

    // var resto = sessionStorage.resto;
    // resto = JSON.parse(resto);
    // $.each(resto,function(k,v){
    //     subHeader = '<img src="img/urlogo.png" class="ui-li-thumb"><h2 id="compName">'+v.res_name+'</h2><p><strong>'+br_name+'</strong><br>'+br_address+'</p>';
    //     $('#subHdr').append(subHeader);
    // });

    $('#catlist').enhanceWithin();


    var categories = sessionStorage.categories;
    var cat_list = JSON.parse(categories);
    var res_id = sessionStorage.res_id;
    var content = '';

    $.each(cat_list,function(k,v){
        // console.log(v);
        // console.log(v.br_name);
        // var item_per_category = '';


        var items = '';
        $.ajax({
          url : remoteHost+"resto/restoList/restoItems/"+res_id+"/"+v.br_id,
          type: 'POST',
          dataType : "json",
          data: {"name":"JSON_Request"},
          success:function(data) {
            // console.log(remoteHost+"resto/restoList/restoItems/"+res_id+"/"+v.br_id);
            // console.log(data.item_name);
            items = JSON.stringify(data.items);
            items = JSON.parse(items);
            var item_per_category = '';
            var content = '';
            var popups = '';

            // content += '<div data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u"><h4>'+v.br_name+'</h4>';
            content += '<div data-role="collapsible"><h2>'+v.br_name+'</h2>';
                content += '<ul data-role="listview" data-split-icon="search" data-split-theme="a">';
                console.log(items);
                $.each(items,function(k,v){
                    item_per_category += '<li><a href="#"><img src="img/icon-72-hdpi.png" class="ui-li-thumb">'+v.item_name+'<p>'+isEmpty(v.desc)+'</p><h5 class="item_price">₱'+displayInCurr(v.price)+'</h5></a><a href="#item-'+v.item_code+'" data-rel="popup" data-position-to="window" data-transition="pop">View</a></li>';
                    /***************************************************
                    create popup menu for items
                    ****************************************************/
                    // var popups = '';
                    popups += '<div data-role="popup" id="item-'+v.item_code+'" data-theme="b" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">';
                    // popups += '<h3>Add to tray</h3>';
                    // popups += '<p>'+v.item_name+'</p>';
                    // popups += '<p>'+isEmpty(v.desc)+'</p>';
                    popups += '<ul data-role="listview" data-inset="true" data-corners="false" style="border:0px;"><li style="height:100px;min-width:200px;"><img src="img/icon-72-hdpi.png" class="ui-li-thumb"><h2>'+v.item_name+'</h2><p>Rated: 9/10</p></li></ul>';

                    popups += '<p>'+isEmpty(v.desc)+'</p>';
                    popups += '<div class="ui-grid-a"><div class="ui-block-a"></div><div class="ui-block-b"><div class="ui-bar ui-bar-d"><div data-role="fieldcontain" class="ui-field-contain ui-body ui-br"><input type="number" name="number" id="number" maxlength="2" min="0" max="99" value="" data-mini="true" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-mini" placeholder="Qty" onkeydown="limit(this);" onkeyup="limit(this);"></div></div></div></div>';
                    popups += '<div class="ui-grid-a"><div class="ui-block-a"></div><div class="ui-block-b">Price: ₱'+displayInCurr(v.price)+'</div></div>';
                    // popups += '';
                    popups += '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-btn-c ui-icon-check ui-btn-icon-left ui-mini">ADD TO TRAY</a>';
                    popups += '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-btn-b ui-icon-forward ui-btn-icon-left ui-mini">CHECKOUT</a>';
                    popups += '<a href="index.html" data-rel="back" class="ui-shadow ui-btn ui-btn-a ui-mini">CANCEL</a>';
                    popups += '</div>';
                });
                $( "#checkoutCart" ).append(popups).enhanceWithin();
                content += item_per_category;
                content += '</ul>';
            content += '</div>';

            $( "#catlist" ).append( content ).collapsibleset( "refresh" );
            $('#catlist').enhanceWithin();

            // subHeader = '<ul data-role="listview" data-inset="true"><li><a href="#"><img src="../_assets/img/album-bb.jpg"><h2>World Chicken</h2><p>Fastfood</p></a></li></ul>';
            // $( "#compHdr" ).append( subHeader ).collapsibleset( "refresh" );
            $('.compName').val('zxzzz');
            // $('#compHdr').enhanceWithin();


            // $( "#checkoutCart" ).append(popups).refresh();

          },
          error: function(data) {
            // alert('Keyword entered not found.'+data);
            console.log('error' + data);
          }
        });
        // console.log(content);
    });

});