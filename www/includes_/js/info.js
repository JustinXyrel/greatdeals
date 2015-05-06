app.initialize();

$(document).ready(function() {
// $(document).on('pagebeforeshow', '#ui-content', function(){
    /*************************************************************************************
    *****************************************HEADER***************************************
    *************************************************************************************/
    var subHeader = '';
    var br_name = sessionStorage.br_name;
    var br_address = sessionStorage.br_address;
    $(function () { $('#rateit6').rateit({ max: 5, step: 2, backingfld: '#backing6' }); });
    subHeader += '<img src="img/urlogo.png" class="ui-li-thumb"><input type="hidden" id="backing6"><div id="rateit6" data-rateit-ispreset="true" data-rateit-readonly="true" style="white-space: normal !important;"></div><h2 id="compName">'+br_name+'</h2><p>'+br_address+'</p>';
    $('#subHdr').append(subHeader);

    /*************************************************************************************
    ******************************************BODY****************************************
    *************************************************************************************/
    $('#br_addr').html(sessionStorage.br_address);
    $('#br_cont').html(sessionStorage.br_delivery_no);
    $('#br_attr').html(sessionStorage.br_desc);
});