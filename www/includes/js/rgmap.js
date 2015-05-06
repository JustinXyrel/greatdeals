$(document).ready(function() {
  var addr = sessionStorage.br_address;
  // alert(addr);

  $('#nav').gmap3({
      // trigger:"resize",
      getgeoloc:{
          callback : function(latLng){
            if (latLng){
              // $('#test1-result').html('localised !');
              $("#nav").gmap3({
                getroute:{
                  action: 'setCenter',
                  options:{
                      origin:latLng,
                      // destination:"Ayala Triangle Gardens, Makati City",
                      destination:addr,
                      // destination:"Salcedo Village, Makati City",
                      travelMode: google.maps.DirectionsTravelMode.DRIVING,
                  },
                  callback: function(results){
                    if (!results) return;
                    $(this).gmap3({
                      map:{
                        options:{
                          zoom: 13,
                          center: [-33.879, 151.235]
                        }
                      },
                      directionsrenderer:{
                        container: $(document.createElement("div")).addClass("googlemap").insertAfter($("#test")),
                        options:{
                          directions:results
                        }
                      }
                    });
                  }
                }
              });
            } else {
              $('#test1-result').html('not localised !');
            }
          }
      }
  });
});