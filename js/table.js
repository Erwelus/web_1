function tryParseJSon(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function createRow(data,i) {
	let row = ""
	row += "<tr>"
	row += "<td>"
	row += data[i].X
	row += "</td>"
	row += "<td>"
	row += data[i].Y
	row += "</td>"
	row += "<td>"
	row += data[i].R
	row += "</td>"
	row += "<td>"
	row += data[i].RESULT
	row += "</td>"
	row += "<td>"
	row += data[i].WORKING_TIME
	row += "</td>"
	row += "<td>"
	row += data[i].DATE_TIME
	row += "</td>"
	row += "</tr>"
	return row;
}

function drawTable(data) {
    let table = $("#table_body").eq(0);
    let inner ="";
    if (tryParseJSon(data) && data != ""){
		data=JSON.parse(data);
		console.log(data);
        if (data.length > 10){
        	data.splice(0, 1);
        }
        /*for (let i=0; i < data.length; i++){
        	
        }*/
        inner = createRow(data, [data.length-1]);
        table.append(inner);

        drawResult(data[data.length-1].X,data[data.length-1].Y);

        newdata=JSON.stringify(data).replace("[","")
		newdata=newdata.replace("]","");
		Cookies.set("data", newdata, {sameSite:'lax'});
    }else console.log(wrong);
}
