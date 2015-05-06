app.initialize();

$(document).ready(function() {
    window.location = "resto_search.html#loaded";
    var data = sessionStorage.resto;
    var search = JSON.parse(sessionStorage.resto);
    var res_id = sessionStorage.res_id;
    var item = '';
    $('.complogo').click(function(e){
        window.location = "index.html";
    });
    $('#page-ref').click(function(e){
        location.reload();
    });

    $.each(search,function(k,v){
      console.log('resid '+v.res_id);
	    console.log('img '+v.res_image);
    	item += '<li id="btn" data-id="'+v.res_id+'" data-name="'+v.res_name+'"><a href="#" id="restaurant_id" data-r="'+v.res_id+'"><img src="'+remoteHost+'resto/uploads/'+v.res_id+'/'+v.res_image+'" class="ui-li-thumb" style="position: absolute;left: 1px;top: 0;max-height: 60px;max-width: 60px;"><h3 class="ui-li-heading">'+v.res_name+'</h3><p class="ui-li-desc"><strong>'+v.res_type+'</strong></p><span style="position:relative;font-size:4px !important;" /><img src="img/icons/coffee.png"/><span style="font-size:12px;">'+v.res_desc+'</span></a></li>';
    });

   	$('#mylist').delegate('li', 'click', function () {
   		var id = $(this).attr('data-id'),res_name = $(this).attr('data-name');
      sessionStorage.res_id = id;
   		sessionStorage.res_name = res_name;

      // console.log(remoteHost+"resto/restoList/searchBranches/"+id);
      $.ajax({
        url : remoteHost+"resto/restoList/searchBranches/"+id,
        type: 'POST',
        dataType : "json",
        data: {"name":"JSON_Request"},
        success:function(data) {
            sessionStorage.resto_branches = JSON.stringify(data.branches);
            // console.log('>>> ' + data.resto);
            var search = JSON.parse(sessionStorage.resto_branches);
            $.each(search,function(k,v){
                // console.log(v.branch_name);
                // sessionStorage.res_name = v.res_name;
                // sessionStorage.branch[v.res_name] = array('code'=>v.res_code,
                //                                           'name'=>v.res_name,
                //                                           'desc'=>v.res_desc,
                //                                           'type'=>v.res_type
                // );
                window.location = "resto_branch.html";
            });

            // alert(data);

        },
        error: function(data) {
          // alert('Keyword entered not found.'+data);
          console.log(data);
        }
      });

      // window.location = "resto_branch.html";
   	});

    $('#mylist').append(item);
    // Enhance new listview element
    $('#mylist').listview('refresh');
    // Hide first listview element
    $('#mylist li').eq(0).addClass('ui-screen-hidden');
});