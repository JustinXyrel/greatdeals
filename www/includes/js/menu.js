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

});