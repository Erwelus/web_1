function isANumber(str) {
	var numStr = /^[\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$|\.$/;
    return numStr.test(str);
}

function validateX(inp) {
	let val = parseFloat(inp.value.replace(',','.'));

	if ((isNaN(val)) || (!isANumber(inp.value.replace(',','.'))) || (inp.value.replace(',','.').split('.').length > 2)) {
		return false;
	}

	return (val >= -3) && (val <= 5);
}

function validateY() {
	if($("[flag='selected']").length>0){
		return true;
	}
	return false;
}

function validate() {
	$("#check")[0].disabled = !(validateX($("#x")[0])  && validateY() && $("input[name='R']:checked").length>0);
	console.log($('[serialize="true"]').serialize()+"&Y="+$("[flag='selected']").attr('id'));
}

function handle(){
	if ($(this).attr('flag')=='selected'){
		let selected_id=$("[flag='selected']").attr('id');
		$(this).attr('value', selected_id);
		$(this).attr('flag','unselected');
	} else {
		let id = $(this).attr('id');
	   	$(this).attr('value',"selected: "+id);
	    let selected_id=$("[flag='selected']").attr('id');
	    $("[flag='selected']").attr('value',selected_id);
	    $("[flag='selected']").attr('flag','unselected');
		$(this).attr('flag','selected');
	}
	validate();

}
/*function form_submit(){
	$('#x')[0].value =$('#x')[0].value.replace(',','.');
	$.post({
			url: "handler.php",
			data: $('[serialize="true"]').serialize()+"&Y="+$("[flag='selected']").attr('id'),
			success: function (answer) {
        	if(answer['RESULT_CODE']===0) {
        		console.log(answer);
            	let data;
            	if ((typeof Cookies.get("data") !== 'string')||(!tryParseJSon(Cookies.get('data')))) {
                	data = [answer];
            	} else{
                	data = JSON.parse(Cookies.get('data'));
                	data.push(answer);
            	}
            	Cookies.set("data", JSON.stringify(data));
            	drawResult(data[data.length-1]['X'],data[data.length-1]['Y']);
            	drawTable();
        }else {
            console.log("Bad response")
        }
    }
    });

}*/

function form_submit(){
	$('#x')[0].value =$('#x')[0].value.replace(',','.')
	$.post({
			url: "handler.php",
			data: $('[serialize="true"]').serialize()+"&Y="+$("[flag='selected']").attr('id'),
			success: function( result )
			{		
				if(result){
					let data = Cookies.get("data");
					//console.log(data); 
					drawTable("["+data+"]");

				}else{
					alert("Не трогай клиент!")
				}
			

			}
	});
}

$('.select_button').on('click', handle);
