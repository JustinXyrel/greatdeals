// app.initialize();
$(document).ready(function() {
  // sessionStorage.clear();
  sessionStorage.removeItem('orderCart');

  var service = new google.maps.DistanceMatrixService();
  var currlink = window.location.href;
  var a = parseURL(currlink);
  var res_id = a.searchObject['search'];
  sessionStorage.res_id = res_id;
  var search = '',
      item   = '',
      ctr    = 1,
      count  = 0
  ;

  function parseURL(url) {
      var parser = document.createElement('a'),
          searchObject = {},
          queries, split, i;
      parser.href = url;
      queries = parser.search.replace(/^\?/, '').split('&');
      for( i = 0; i < queries.length; i++ ) {
          split = queries[i].split('=');
          searchObject[split[0]] = split[1];
      }
      return {
          protocol: parser.protocol,
          host: parser.host,
          hostname: parser.hostname,
          port: parser.port,
          pathname: parser.pathname,
          search: parser.search,
          searchObject: searchObject,
          hash: parser.hash
      };
  }

  //GETTING CURRENT LOCATION...
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
  //CALCULATING DISTANCE...
  function calculateDistance(pointA,pointB,sel) {
    console.log(sel);
    pointA = sessionStorage.currpos;

    // alert(service);
    service.getDistanceMatrix(
      {
        origins: [pointA],
        destinations: [pointB],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, callback);
  }
  // google.maps.event.addDomListener(window,"load", calculateDistance);

  function callback(response, status) {
      count++;
      // alert(response);
      // console.log(count);
      // alert(status);
      // alert('ASA BA?'+google.maps.DirectionsStatus.OK);
      if (status != google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        // deleteOverlays();

        var temp = [];
        var ctr = 1;
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;

          var selected_line = localStorage['selected'];

          $('.line-'+count).text(results[0].distance.text);
          console.log('====>>>'+destinations);
          var strloc = (destinations.toString()).toLowerCase();
          $("p:contains(strloc)").next('span').text('232');
          break;

        }
      }
    }

  if(typeof res_id != 'undefined'){
    // alert(res_id);

   // alert('resto/restoList/getRestaurants/'+res_id);
   $.ajax({
      url : remoteHost+"resto/restoList/getRestaurants/"+res_id,
      type: 'POST',
      dataType : "json",
      data: {"name":"JSON_Request"},
      success:function(data) {
        // alert(data);
        console.log(data.resto);
        var resto = data.resto;
        $.each(resto,function(k,v){
          console.log(v.res_name);
          sessionStorage.res_name = v.res_name;
          $('.pagetitle').html(v.res_name);
        });
      },
      // error: function(data) {
      //   console.log(data);
      // }
    });

    $.ajax({
      url : remoteHost+"resto/restoList/searchBranches/"+res_id,
      type: 'POST',
      dataType : "json",
      data: {"name":"JSON_Request"},
      success:function(data) {
          sessionStorage.resto_branches = JSON.stringify(data.branches);
          search = JSON.parse(sessionStorage.resto_branches);

          $.each(search,function(k,v){
              var sel = 'line-'+v.br_id;
              sessionStorage.res_name = v.res_name;

              calculateDistance(null,v.br_base_loc,sel);
              item += '<li id="btn" data-id="'+v.br_id+'"><a href="#" id="branches_id" data-r="'+v.br_id+'"><h3 class="ui-li-heading" style="white-space : normal;">'+v.br_name+'</h3><p class="ui-li-desc" style="white-space : normal;">'+v.br_address+'</p><p class="ui-li-desc" style="white-space : normal;display:none;">'+v.br_base_loc+'</p><span class="ui-li-count ui-btn-up-c ui-btn-corner-all line-'+ctr+'"></span></a></li>';
              ctr++;
          });

          $('#mylist').delegate('li', 'click', function () {
            var id = $(this).attr('data-id');
            sessionStorage.br_id = id;

            // alert(remoteHost+"resto/restoList/branchDetails/"+id);
            alert('zzzz');
            $.ajax({
              // url : remoteHost+"resto/restoList/branchDetails/"+id,
              url : remoteHost+"clickPlatev2/app_resto/searchBranches/"+res_id+"/"+id,
              type: 'POST',
              dataType : "json",
              data: {"name":"JSON_Request"},
              success:function(data) {
                sessionStorage.branch_details = JSON.stringify(data.branch_details);
                var search = JSON.parse(sessionStorage.branch_details);
                $.each(search,function(k,v){
                  // console.log('ADDRESS AKO!!!' + v.br_address);
                  console.log('fb ako:: '+v.facebook_url);
                  // sessionStorage.br_id = v.br_id;
                  // sessionStorage.br_name = v.br_name;
                  // sessionStorage.br_address = v.br_address;
                  // sessionStorage.br_contact_no = v.br_contact_no;
                  // sessionStorage.br_delivery_no = v.br_delivery_no;
                  // sessionStorage.br_base_location = v.br_base_loc;
                  // sessionStorage.facebook_url = v.facebook_url;
                  // sessionStorage.twitter_url = v.twitter_url;
                  // window.location = "info.html";

                  // alert(v.br_delivery_no);


                  var res_id = sessionStorage.res_id;

                  $.ajax({
                    url : remoteHost+"resto/restoList/restoCategories/"+res_id,
                    type: 'POST',
                    dataType : "json",
                    data: {"name":"JSON_Request"},
                    success:function(data) {
                      console.log(remoteHost+"resto/restoList/restoCategories/"+res_id);
                      console.log(data.categories);
                      sessionStorage.categories = JSON.stringify(data.categories);
                      // var cat = JSON.parse(sessionStorage.categories);
                      // $.each(cat,function(k,v){
                      //   sessionStorage.br_cat_id = v.br_id;
                      //   sessionStorage.br_cat_name = v.br_name;
                        // window.location = "info.html";
                        window.location = "order_method.html";
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

          $('#mylist').append(item);
          $('#mylist').listview('refresh');

      },
      error: function(data) {
        console.log(data);
      }
    });
  }else{
    alert('walaaaa!');
  }
});