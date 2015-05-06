// app.initialize();

$(document).bind("pagebeforeshow", function(event,pdata) {
    // alert('zzzz');
    $( "#checkoutCart" ).enhanceWithin();
});
$(document).ready(function() {
// $(document).on('pagebeforeshow', '#ui-content', function(){
    // alert('gummana ka na aba!');
    /*************************************************************************************
    *****************************************HEADER***************************************
    *************************************************************************************/
    var subHeader = '';
    var br_name = sessionStorage.br_name;
    var br_address = sessionStorage.br_address;
    // alert(br_name);
    // alert(br_address);

    subHeader += '<img src="img/urlogo.png" class="ui-li-thumb"><h2 id="compName">'+br_name+'</h2><p>'+br_address+'</p>';
    $('#subHdr').append(subHeader);

    /*************************************************************************************
    ******************************************BODY****************************************
    *************************************************************************************/
    var categories = sessionStorage.categories;
    var cat_list = JSON.parse(categories);
    var res_id = sessionStorage.res_id;
    var content = '';

    $.each(cat_list,function(k,v){
        var items = '';
        $.ajax({
          url : remoteHost+"resto/restoList/restoItems/"+res_id+"/"+v.br_id,
          type: 'POST',
          dataType : "json",
          cache: false,
          data: {"name":"JSON_Request"},
          success:function(data) {
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
                    // alert(v.item_name);
                    item_per_category += '<li><a href="#"><img src="img/icon-72-hdpi.png" class="ui-li-thumb">'+v.item_name+'<p>'+isEmpty(v.desc)+'</p><h5 class="item_price">₱'+displayInCurr(v.price)+'</h5></a><a href="#item-'+v.item_code+'" data-rel="popup" data-position-to="window" data-transition="pop">View</a></li>';
                    /***************************************************
                    create popup menu for items
                    ****************************************************/
                    // var popups = '';
                    popups += '<div data-role="popup" id="item-'+v.item_code+'" data-theme="b" data-overlay-theme="b" class="ui-content" style="max-width:340px; padding-bottom:2em;">';
                    popups += '<ul data-role="listview" data-inset="true" data-corners="false" style="border:0px;"><li style="height:100px;min-width:200px;"><img src="img/icon-72-hdpi.png" class="ui-li-thumb"><h2>'+v.item_name+'</h2><p>Rated: 9/10</p></li></ul>';

                    popups += '<p>'+isEmpty(v.desc)+'</p>';
                    popups += '<div class="ui-grid-a"><div class="ui-block-a"></div><div class="ui-block-b"><div class="ui-bar ui-bar-d"><div data-role="fieldcontain" class="ui-field-contain ui-body ui-br"><input type="number" name="number" id="number" maxlength="2" min="0" max="99" value="" data-mini="true" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset ui-mini" placeholder="Qty" onkeydown="limit(this);" onkeyup="limit(this);"></div></div></div></div>';
                    popups += '<div class="ui-grid-a"><div class="ui-block-a"></div><div class="ui-block-b">Price: ₱'+displayInCurr(v.price)+'</div></div>';
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
            alert('Error loading.'+data);
            console.log('error' + data);
          }
        });
    });

});