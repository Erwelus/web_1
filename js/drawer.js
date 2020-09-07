function drawCoordinateLine(context, x0, y0, x1, y1){
	const LENGTH = 6;

	context.fillStyle="black";

	context.beginPath();
	context.lineWidth = 2;
	context.moveTo(x0, y0);
	context.lineTo(x1, y1);
	context.stroke();

	context.beginPath();
	context.moveTo(x1, y1)
	context.lineTo(x1+(getSign(x0-x1)*LENGTH), y1+(getSign(x0-x1)*LENGTH));
	context.lineTo(x1-LENGTH,y1+LENGTH);
	context.fill();
}

function getSign(x) {
	if(x<0) return -1;
	else return 1;
}

function drawShapes(context, color, val) {

	let x = context.canvas.width/2;
	let y = context.canvas.height/2;

	let step = val*x/12;

	context.fillStyle = color;

	context.beginPath();
	context.moveTo(x, y);
	context.arc(x, y, 2*step, 0, -Math.PI/2, true);
	context.fill();

	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x+2*step, y);
	context.lineTo(x, y+2*step);
	context.fill();

	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x-step, y);
	context.lineTo(x-step, y+2*step);
	context.lineTo(x, y+2*step);
	context.fill();
}

function drawSystem(context, val) {
	let vals = [val, val/2, -val/2, -val];
	let x = context.canvas.width/2;
	let y = context.canvas.height/2;
	let step = val*x/12;

	context.fillStyle = "black";

	let count=0;
	for (let i = -2; i <=2 ; i++) {
		if (i !=0){
			context.fillText(vals[count], x+6, y+step*i+5);
			context.beginPath();
		    context.moveTo(x-4, y+step*i);
		    context.lineTo(x+4, y+step*i);
		    context.stroke();
		    count++;
		}
	}
	count=3;
	for (let i = -2; i <=2 ; i++) {
		if (i !=0){
			context.fillText(vals[count], x+step*i-5, y-10)
		    context.beginPath()
		    context.moveTo(x+step*i, y+4)
		    context.lineTo(x+step*i, y-4)
		    context.stroke()
		    count--;
		}
	}
	drawCoordinateLine(context, 0, context.canvas.height/2, context.canvas.width, context.canvas.height/2);
	drawCoordinateLine(context, context.canvas.width/2, context.canvas.height, context.canvas.width/2, 0);}

function draw() {
	let colors=["#004A7FFF", "#006EBCFF", "#0094FFFF", "#3DAEFFFF", "#7FC9FFFF"];
	let context = $('#canvas')[0].getContext('2d');

	let r_vals = document.querySelectorAll("input[name='R']");

	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	drawCoordinateLine(context, 0, context.canvas.height/2, context.canvas.width, context.canvas.height/2);
	drawCoordinateLine(context, context.canvas.width/2, context.canvas.height, context.canvas.width/2, 0);

	for (var i = r_vals.length - 1; i >= 0; i--) {
		if(r_vals[i].checked){
			drawShapes(context, colors[i], r_vals[i].value);			
		}
	}
	let max=0;
	for (var i = r_vals.length - 1; i >= 0; i--) {
		if(r_vals[i].checked){
			drawSystem(context, r_vals[i].value);
			if(r_vals[i].value>max){
				max = r_vals[i].value;
				$("input[serialize='true']:checked").attr('serialize','false');
				r_vals[i].setAttribute('serialize','true');	
			}			
		}
	}
	validate();
}

function drawResult(x, y) {
	let context =  $('#canvas')[0].getContext('2d');

	draw();

	let step = context.canvas.width/12;

	context.strokeStyle = "black";
    context.fillStyle = "black";

	console.log(context.canvas.width);
	context.beginPath(context.canvas.width/2);
	context.moveTo(context.canvas.width/2 + x*step, context.canvas.height/2 - y*step);
	context.arc(context.canvas.width/2 + x*step, context.canvas.height/2 - y*step,4,0,2*Math.PI);
	context.fill();
}

$(window).on("load",draw);
$(window).resize(draw);
$('input[name=R]').on("change", draw);