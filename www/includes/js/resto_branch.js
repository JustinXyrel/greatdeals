app.initialize();
$(document).ready(function() {
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

  var data = sessionStorage.resto_branches;
  console.log(data);

  if(typeof data === "undefined") {
    var res_id = sessionStorage.res_id;
    console.log(remoteHost+"clickPlatev2/app_resto/searchBranches/"+res_id);
    $.ajax({
      url : remoteHost+"clickPlatev2/app_resto/searchBranches/"+res_id,
      type: 'POST',
      dataType : "json",
      data: {"name":"JSON_Request"},
      success:function(data) {
        console.log(data.branches);
        sessionStorage.resto_branches = JSON.stringify(data.branches);
        data = sessionStorage.resto_branches;
      }
    });
  }else{
    data = sessionStorage.resto_branches;
  }
  var search = JSON.parse(sessionStorage.resto_branches);
  var item = '';

  var map;
  var geocoder;
  // var bounds = new google.maps.LatLngBounds();
  var markersArray = [];
  var pointA = 'SM Megamall';
  function initialize() {
    window.location = 'resto_branch.html#loaded';
    $('#mylist').listview('refresh');
    navigator.geolocation.getCurrentPosition(function (position) {
      var geocoder = new google.maps.Geocoder();
      var latLng   = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      geocoder.geocode({
          'latLng': latLng
      }, function (results, status) {
          for (var i = 0; i < results[0].address_components.length; i++) {
              var address = results[0].address_components[i];
          }
      });
      sessionStorage.currpos = latLng;
    });
  }
  var pointB = 'Robinsons Galleria, Ortigas';
  // var geocoder = new google.maps.Geocoder();
  var count = 0;
  function calculateDistance(pointA,pointB,sel) {
    pointA = sessionStorage.currpos;
    console.log('***********************************************');
    console.log(pointA+' --- '+pointB+' === '+sel);
    console.log('***********************************************');
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [pointA],
        destinations: [pointB],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, callback);
    console.log('==>'+pointB);
  }
  function callback(response, status) {
    count++;
    console.log(count);
    if (status != google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      // alert('zxczxczxc');
      console.log(response);
      console.log('sagot:: '+response.destinationAddresses);
      console.log('line#:: '+count);
      // alert('zxczxczxc');
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      deleteOverlays();

      var temp = [];
      var ctr = 1;
      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;

        var selected_line = localStorage['selected'];

        $('.line-'+count).text(results[0].distance.text);
        console.log('====>>>'+destinations);
        var strloc = (destinations.toString()).toLowerCase();
        console.log('/***************************************************/');
        console.log('2lower====>'+strloc);
        // $("p:contains('1 greenbelt drive makati, metro manila, philippines')").next('span').text('232');
        $("p:contains(strloc)").next('span').text('232');
        break;

        // addMarker(origins[i], false);
        for (var j = 0; j < results.length; j++) {
          addMarker(destinations[j], true);
          // outputDiv.innerHTML += origins[i] + ' to ' + destinations[j]
          //     + ': ' + results[j].distance.text + ' in '
          //     + results[j].duration.text + '<br>';
          // outputDiv.innerHTML += results[j].distance.text;
          // $(selector).text(results[j].distance.text);
          // alert('--->>'+j);
          temp[j] = results[j].distance.text;
          // alert(results[j].distance.text);
          alert('line-'+i+':|:'+j+'---'+temp[j]);
          $('.line-'+j).text(temp[j]);
          // ctr++;
        }
      }

      // for(var i=1; i< $('ul#mylist li').length; i++){
      //   $('.line-'+i).text(temp[i]);
      //   // console.log('-->'.i);
      //   // alert(i);
      // }
    }
  }
  function deleteOverlays() {
    for (var i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
    markersArray = [];
  }
  function addMarker(location, isDestination) {
    var icon;
    if (isDestination) {
      icon = destinationIcon;
    } else {
      icon = originIcon;
    }
    geocoder.geocode({'address': location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        bounds.extend(results[0].geometry.location);
        // map.fitBounds(bounds);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          icon: icon
        });
        markersArray.push(marker);
      } else {
        alert('Geocode was not successful for the following reason: '
          + status);
      }
    });
  }

  var ctr = 1;
  $.each(search,function(k,v){
    console.log('PAGPOPULATE......................................................................................');
    console.log(v.br_base_loc);
    console.log('------------------------------------------------------------------------------------------------jomss');

      // item += '<li id="btn" data-id="'+v.br_id+'"><a href="#" id="branches_id" data-r="'+v.br_id+'"><img src="img/urlogo.png" class="ui-li-thumb"><h3 class="ui-li-heading" style="white-space : normal;">'+v.br_name+'</h3><p class="ui-li-desc" style="white-space : normal;"><strong>'+v.br_address+'</strong></p></a></li>';
      // item += '<li id="btn" data-id="'+v.br_id+'"><a href="#" id="branches_id" data-r="'+v.br_id+'"><h3 class="ui-li-heading" style="white-space : normal;">'+v.br_name+'</h3><p class="ui-li-desc" style="white-space : normal;"><strong>'+v.br_address+'</strong></p><span class="ui-li-count ui-btn-up-c ui-btn-corner-all">12 km</span></a></li>';
      var sel = 'line-'+v.br_id;
      // console.log(sel);
      // localStorage.setItem('selected',sel);

      // calculateDistance(pointA,v.br_base_loc,sel);
      // item += '<li id="btn" data-id="'+v.br_id+'"><a href="#" id="branches_id" data-r="'+v.br_id+'"><h3 class="ui-li-heading" style="white-space : normal;">'+v.br_name+'</h3><p class="ui-li-desc" style="white-space : normal;"><strong>'+v.br_address+'</strong></p><span class="ui-li-count ui-btn-up-c ui-btn-corner-all line-'+v.br_id+'"></span></a></li>';
      var item = "";
      item += '<li id="btn-'+v.br_id+'" data-id="'+v.br_id+'" data-icon="false"><a href="#" id="branches_id-'+v.br_id+'" data-r="'+v.br_id+'"><h3 class="ui-li-heading" style="white-space : normal;">'+v.br_name+'</h3><p style="white-space : normal;width: 80%;">'+v.br_address+'</p></a>';

      // sessionStorage.countStars = 0;
      item += '</li>';
      $('#mylist').append(item);
      var stars = '';
      var brID = v.br_id;
      // $.post(remoteHost+"clickPlatev2/reviews/get_branch_reviews_avg/"+v.br_id,{"name":"JSON_Request"},function(data){
      //   alert(data);
      // });
      $.ajax({
          url: remoteHost+"clickPlatev2/reviews/get_branch_reviews_avg/"+v.br_id,
          type: 'POST',
          dataType : "json",
          cache: false,
          data: {"name":"JSON_Request"},
          success:function(data) {
              var ratings = data.avg;
              for(var i=0;i<ratings;i++){
                $('#branches_id-'+brID).append('<img src="plugins/raty/lib/images/star-on.png">');
              }
          }
      });
      // var ratings = sessionStorage.countStars;


      ctr++;
  });

 	$('#mylist').delegate('li', 'click', function () {
 	  var id = $(this).attr('data-id');
 		sessionStorage.br_id = id;

    // alert(remoteHost+"resto/restoList/branchDetails/"+id);
    // alert('zzzz');
    var res_id = sessionStorage.res_id;
    console.log(remoteHost+"clickPlatev2/app_resto/searchBranches/"+res_id+"/"+id);
    $.ajax({
      // url : remoteHost+"resto/restoList/branchDetails/"+id,
      url : remoteHost+"clickPlatev2/app_resto/searchBranches/"+res_id+"/"+id,
      type: 'POST',
      dataType : "json",
      data: {"name":"JSON_Request"},
      success:function(data) {
        sessionStorage.branch_details = JSON.stringify(data.branches);
        var search = JSON.parse(sessionStorage.branch_details);
        $.each(search,function(k,v){
          // console.log('ADDRESS AKO!!!' + v.br_address);
          console.log('fb ako:: '+v.facebook_url);
          sessionStorage.br_id = v.br_id;
          sessionStorage.br_name = v.br_name;
          sessionStorage.br_address = v.br_address;
          sessionStorage.br_contact_no = v.br_contact_no;
          sessionStorage.br_delivery_no = v.br_delivery_no;
          sessionStorage.br_base_location = v.br_base_loc;
          // sessionStorage.facebook_url = v.facebook_url;
          // sessionStorage.twitter_url = v.twitter_url;
          // window.location = "info.html";

          // alert(v.br_delivery_no);


          var res_id = sessionStorage.res_id;

          $.ajax({
            // url : remoteHost+"resto/restoList/restoCategories/"+res_id,
            url : remoteHost+"clickPlatev2/app_menus/getCategories/"+res_id,
            type: 'POST',
            dataType : "json",
            data: {"name":"JSON_Request"},
            success:function(data) {
              // alert('zzz');
              // console.log(remoteHost+"resto/restoList/restoCategories/"+res_id);
              // console.log(data.categories);
              sessionStorage.categories = JSON.stringify(data.categories);
              // var cat = JSON.parse(sessionStorage.categories);
              // $.each(cat,function(k,v){
              //   sessionStorage.br_cat_id = v.br_id;
              //   sessionStorage.br_cat_name = v.br_name;

                // window.location = "order_method.html";
                // window.location = "info.html";

                var user_id = '';
                if(sessionStorage.user_id != undefined)
                  user_id = sessionStorage.user_id;

                console.log('---------> '+user_id);
                // if(user_id.length > 0){
                //   window.location = "menu.html";
                // }else{
                //   window.location = "menu.html";
                // }
              // });

            },
            error: function(data) {
              // alert('Keyword entered not found.'+data);
              console.log('error' + data);
            }
          // window.location = "info.html";
          });
        });

      },
      error: function(data) {
        // alert('Keyword entered not found.'+data);
        console.log('error' + data);
      }
    // window.location = "info.html";
    });

  });

  // Enhance new listview element
  $('#mylist').listview('refresh');
  // Hide first listview element
  $('#mylist li').eq(0).addClass('ui-screen-hidden');
  // google.maps.event.addDomListener(window, 'load', initialize);
});