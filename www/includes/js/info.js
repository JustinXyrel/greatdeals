app.initialize();

$(document).ready(function() {
// $(document).on('pagebeforeshow', '#ui-content', function(){
    /*************************************************************************************
    *****************************************HEADER***************************************
    *************************************************************************************/
    var subHeader = '';
    var br_name = sessionStorage.br_name;
    var br_address = sessionStorage.br_address;
	var br_id = sessionStorage.br_id;
    var res_id = sessionStorage.res_id;
	var res_name = sessionStorage.res_name;
	var i_path = remoteHost+"clickPlatev2/uploads/"+res_id+"/logo.png";
	var img_path = '';
	$('.pagetitle').html(res_name);
    //$(function () { $('#rateit6').rateit({ max: 5, step: 2, backingfld: '#backing6' }); });
    //subHeader += '<img src="img/urlogo.png" class="ui-li-thumb"><input type="hidden" id="backing6"><div id="rateit6" data-rateit-ispreset="true" data-rateit-readonly="true" style="white-space: normal !important;"></div><h2 id="compName">'+br_name+'</h2><p>'+br_address+'</p>';
    $('#subHdr').append(subHeader);
	  display_profile();
	
    /*************************************************************************************
    ******************************************BODY****************************************
    *************************************************************************************/
    $('#br_addr').html(sessionStorage.br_address);
    $('#br_cont').html(sessionStorage.br_delivery_no);
    $('#br_attr').html(sessionStorage.br_desc);
	
	$( '#panelTrgr').click(function(e){
        showCart();
    });
	
	$('.midbtn').parent().css({"width": "50%"});
	
	$.post(remoteHost+"clickPlatev2/get/resto_logos/"+res_id,function(data){
        $.each(data,function(resto_id,val){
            sessionStorage.res_img_path = remoteHost+'clickPlatev2/'+val.path;
        });
    });

    subHeader += '<img src="'+i_path+'" class="ui-li-thumb" style="height:100px;"><input type="hidden" id="backing6"><div id="rateit6" data-rateit-ispreset="true" data-rateit-readonly="true"><h2 id="compName" style="white-space : normal;">'+res_name+'</h2><p style="white-space : normal;">';

    var ratings = 0;
    var stars = '';
	
    if(typeof data !== "undefined") {
        $.ajax({
            url: remoteHost+"clickPlatev2/reviews/get_branch_reviews_avg/"+br_id,
            type: 'POST',
            dataType : "json",
            cache: false,
            data: {"name":"JSON_Request"},
            success:function(data) {
				sessionStorage.countStars = data.avg;
                console.log('---> '+sessionStorage.countStars);
                $('#compHdr').listview('refresh');
            }
		});
    }
	
    stars = '';
    ratings = sessionStorage.countStars;
    stars+='<br><span>';
		
    for(var i=0;i<ratings;i++){
        stars += '<img src="plugins/raty/lib/images/star-on.png">';
    }
		
    stars+='</span>';
    subHeader += stars;
    subHeader += '</p>';
    window.location = 'info.html#loaded';
    console.log(subHeader);
    $('#subHdr_infopage').html(subHeader);
    $('#compHdr').listview('refresh');
});