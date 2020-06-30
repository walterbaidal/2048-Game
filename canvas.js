let canvas_width = 500;
let canvas_height = 550;
let canvas_background_color = "#fbf8ef";


let game_border_color = "#c0b5a8";
let game_background_color = "#a49280";
let game_width = 350;
let game_height = 350;

let box_color = "#bfafa0";
let box_width = 75;
let box_height = 75; 

let points = 0;

let button = {
	x: (canvas_width/2)-((box_width+10)/2),
	y: canvas_height-(box_height/2)-10,
	width: box_width+10,
	height: box_height/2
}

let template = [
	[0, 0, 0, 0], 
	[0, 0, 0, 0], 
	[0, 0, 0, 0], 
	[0, 0, 0, 0]
];

let options = {
	2 : {value:"2", color:"#776e65", bg_color:"#eee4da"},
	4 : {value:"4", color:"#786e65", bg_color:"#eee1ce"},
	8 : {value:"8", color:"#f7f7f2", bg_color:"#f4b27e"},
	16 : {value:"16", color:"#fbf3ed", bg_color:"#f69669"},
	32 : {value:"32", color:"#fbf3ed", bg_color:"#f69669"},
	64 : {value:"64", color:"#f9f5f8", bg_color:"#f76148"},
	128 : {value:"128", color:"#fbf3ed", bg_color:"#f3d769"},
	256 : {value:"256", color:"#fbf3ed", bg_color:"#edcc63"},
	512 : {value:"512", color:"#fbf3ed", bg_color:"#edc651"},
	1024 : {value:"1024", color:"#fbf3ed", bg_color:"#eec744"},
	2048 : {value:"2048", color:"#fbf3ed", bg_color:"#ecc232"}
}

window.onload = function() {
	runGame();
	console.table(template);

	
	document.addEventListener("keydown", keyPush);
	document.addEventListener("swiped-up", swipe);
	document.addEventListener("swiped-down", swipe);
	document.addEventListener("swiped-left", swipe);
	document.addEventListener("swiped-right", swipe);
	document.addEventListener("click", restartGame);
	
	
	
	//setInterval(game, 500);
}

function restartGame(event){
	let mouse_pos = getMousePos(canv,event);

	if(!canKeepPlaying()){
		if(points > getCookie("best")){
			setCookie("best", points, 7);
		}
	}
	if (isInside(mouse_pos,button)){
		points = 0;
		restartTemplate();
		runGame();
	}
}

function restartTemplate(){
	template = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
}

function runGame(){
	canv = document.getElementById("canvas");
	canv.width = canvas_width;
	canv.height = canvas_height;
	ctx = canv.getContext("2d");
	ctx.fillStyle = canvas_background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.font = "600 80px Helvetica";
	ctx.fillStyle = "#776e65";
	ctx.fillText(2048, 75, 85);
	ctx.font = "18px Helvetica";
	ctx.fillText("Join the numbers and get to the 2048 tile!", 75, 120);
	ctx.fill();

	createButton();
	
	printBest();

	printPoints();

	drawGameTemplate();
	initializeGame();
	printTemplate();
}

function createButton(){
	ctx.beginPath();
	ctx.fillStyle = "#8f7a66";
	ctx.fillRect(button.x, button.y , button.width, button.height);
	ctx.font = "bold 15px Helvetica";
	ctx.textAlign="center"; 
	ctx.fillStyle = "#f9f6f2";
	ctx.fillText("New Game",canvas_width/2, canvas_height-(box_height/2)+12);
	ctx.fill();
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function printPoints(){
	ctx.beginPath();
	ctx.fillStyle = "#bbada0";
	ctx.fillRect(270,25, box_height-7, box_width-7,20);
	ctx.font = "15px Helvetica";
	ctx.textAlign="center"; 
	ctx.fillStyle = "#eee3cd";
	ctx.fillText("SCORE", 267+(box_width/2), 5+(box_height/2));
	ctx.font = "22px Helvetica";
	ctx.fillStyle = "white";
	ctx.fillText(points, 270+((box_width-7)/2), 40+((box_height-7)/2));
	ctx.fill();
}

function printBest(){

	let best = getCookie("best");
	ctx.beginPath();
	ctx.fillStyle = "#bbada0";
	ctx.fillRect(270+box_width+10,25, box_height-7, box_width-7,20);
	ctx.font = "15px Helvetica";
	ctx.textAlign="center"; 
	ctx.fillStyle = "#eee3cd";
	ctx.fillText("BEST", 267+box_width+10+(box_width/2), 5+(box_height/2));
	ctx.font = "22px Helvetica";
	ctx.fillStyle = "white";
	ctx.fillText(best == null ? 0 : best, 270+box_width+10+((box_width-7)/2), 40+((box_height-7)/2));
	ctx.fill();
}

function updatePoints(){
	for(let i = 0; i<template.length; i++){
		for(let j = 0; j<template.length; j++){
			points += template[i][j];
		}
	}
}

function canKeepPlaying(){
	for(let i = 0; i<template.length; i++){
		for(let j = 0; j<template.length; j++){
			if(template[i][j] == 0){
				return true;
			}
		}
	}
	return false;
}


function initializeGame(){
	let number = [ Math.random() > 0.5 ? 2 : 4,  Math.random() > 0.5 ? 2 : 4];

	for (let rep = 0; rep < 2; rep++){
		do {
			px = Math.floor(Math.random()*4);
			py = Math.floor(Math.random()*4);
		} while(template[px][py] != 0);

		template[px][py] = number[rep];	
	}
}

function generateRandom(){
	let number = Math.random() > 0.5 ? 2 : 4;

	do {
		px = Math.floor(Math.random()*4);
		py = Math.floor(Math.random()*4);
	} while(template[px][py] != 0);

	template[px][py] = number;	
}

function drawGameTemplate() {
	ctx.beginPath();
	ctx.roundedRectangle(74, 139, game_width+2, game_height+2, 6);
	ctx.fillStyle = game_border_color;
	ctx.fill();

	ctx.beginPath();
	ctx.roundedRectangle(75, 140, game_width, game_height, 6);
	ctx.fillStyle = game_background_color;
	ctx.fill();


	
	let i;
	let j;
	for( i = 0; i < template.length; i++){
		for( j = 0; j < template.length; j++){
			ctx.fillStyle = box_color;
			ctx.fillRect(85+(box_width*i+10*i), 150+(box_height*j+10*j), box_width, box_height);
		}
	}

}


function keyPush(event) {

	let cancel = false;

	if(canKeepPlaying()){
		switch(event.key) {
			case "ArrowUp":
				pushNumbersUp();
				break;
			case "ArrowDown":
				pushNumbersDown();
				break;
			case "ArrowLeft":
				pushNumbersLeft();
				break;
			case "ArrowRight":
				pushNumbersRight();
				break;
			default:
				cancel = true;
				break;

		}

		if(!cancel){
			
			printPoints();
			generateRandom();
			printTemplate();
		}
	} else {
		if(points > getCookie("best")){
			setCookie("best", points, 7);
		}
	}
}

function swipe(event){
	let cancel = false;

	if(canKeepPlaying()){
		switch(event.type){
			case "swiped-up":
				pushNumbersUp();
				console.table(template);
				break;

			case "swiped-down":
				pushNumbersDown();
				break;

			case "swiped-left":
				pushNumbersLeft();
				break;

			case "swiped-right":
				pushNumbersRight();
				break;

			default:
				cancel = true;
				break;
		}

		if(!cancel){
			
			printPoints();
			generateRandom();
			printTemplate();
		}
	} else {
		if(points > getCookie(best)){
			setCookie("best", points, 7);
		}
	}


}


function calculateFreeSlotsVertically(free, row){
	for(let k = 0; k < free.length; k++){
		free[k] = template[k][row] == 0 ? 1 : 0;
	}	
}

function calculateFreeSlotsHorizontally(free, col){
	for(let k = 0; k < free.length; k++){
		free[k] = template[col][k] == 0 ? 1 : 0;
	}	
}

function pushNumbersLeft(){

	for(let i = 0; i < template.length; i++){
		let free = new Array(4);
		let index_attach = [0];
		let index_free = [0];
		let attached = false;
		calculateFreeSlotsHorizontally(free, i);
		
		for(let j = 1; j < template.length; j++){
			if(template[i][j] != 0){
				if(!attached && canGetAttachedLeft(i,j,free,index_attach)){
					attachHorizontally(i,j,free,index_attach);
					attached = true;
				} else if(canBeMovedLeft(j,free,index_free)){
					moveHorizontally(i,j,free,index_free);

				}
			}
		}
	}
}

function pushNumbersUp(){

	for(let j = 0; j < template.length; j++){
		let free = new Array(4);
		let index_attach = [0];
		let index_free = [0];
		let attached = false;
		calculateFreeSlotsVertically(free, j);

		
		for(let i = 1; i < template.length; i++){
			if(template[i][j] != 0){
				if(!attached && canGetAttachedUp(i,j,free,index_attach)){
					console.log("Attach [" + i + "][" + j + "] with [" + index_attach[0] + "][" + j + "]");
					attachVertically(i,j,free,index_attach);
					attached = true;
				} else if(canBeMovedUp(i,free,index_free)){
					console.log("Move [" + i + "][" + j + "] to [" + index_free[0] + "][" + j + "]");
					moveVertically(i,j,free,index_free);

				} else {
					console.log("Nothing for [" + i + "][" + j + "]");
				}		
			} else {
			console.log("Nothing for [" + i + "][" + j + "]");
			}
		}
	}
}

function pushNumbersRight(){

	for(let i = 0; i < template.length; i++){
		let free = new Array(4);
		let index_attach = [0];
		let index_free = [0];
		let attached = false;
		calculateFreeSlotsHorizontally(free, i);
		
		for(let j = template.length-2; j >= 0; j--){
			if(template[i][j] != 0){
				if(!attached && canGetAttachedRight(i,j,free,index_attach)){
					attachHorizontally(i,j,free,index_attach);
					attached = true;
				} else if(canBeMovedRight(j,free,index_free)){
					moveHorizontally(i,j,free,index_free);

				}
			}
		}
	}
}

function pushNumbersDown(){

	for(let j = 0; j < template.length; j++){
		let free = new Array(4);
		let index_attach = [0];
		let index_free = [0];
		let attached = false;
		calculateFreeSlotsVertically(free, j, "vertical");
		
		for(let i = template.length-2; i >= 0; i--){
			if(template[i][j] != 0){
				if(!attached && canGetAttachedDown(i,j,free,index_attach)){
					console.log("Attach [" + i + "][" + j + "] with [" + index_attach[0] + "][" + j + "]");
					attachVertically(i,j,free,index_attach);
					attached = true;
				} else if(canBeMovedDown(i,free,index_free)){
					console.log("Move [" + i + "][" + j + "] to [" + index_free[0] + "][" + j + "]");
					moveVertically(i,j,free,index_free);

				} else {
					console.log("Nothing for [" + i + "][" + j + "]");
				}
			} else {
				console.log("Nothing for [" + i + "][" + j + "]");
			}
		}
	}
}

function moveVertically(i,j,free,index){
	let offset = index[0];
	template[offset][j] += template[i][j];
	template[i][j] = 0;
	free[offset] = 0;
	free[i] = 1;
}

function moveHorizontally(i,j,free,index){
	let offset = index[0];
	template[i][offset] += template[i][j];
	template[i][j] = 0;
	free[offset] = 0;
	free[j] = 1;
}

function attachVertically(i, j ,free, index){
	let offset = index[0];
	template[offset][j] += template[i][j];
	points += template[offset][j];
	template[i][j] = 0;
	free[offset] = 0;
	free[i] = 1;
}

function attachHorizontally(i, j ,free, index){
	let offset = index[0];
	template[i][offset] += template[i][j];
	points += template[i][offset];
	template[i][j] = 0;
	free[offset] = 0;
	free[j] = 1;
}


function canBeMovedUp(row,free,index){
	for(let k = 0; k < row; k++){
		if(free[k] == 1){
			index[0] = k;
			return true;
		}
	}
	return false;
}

function canBeMovedLeft(col,free,index){
	for(let k = 0; k < col; k++){
		if(free[k] == 1){
			index[0] = k;
			return true;
		}
	}
	return false;
}

function canBeMovedRight(col,free,index){
	for(let k=template.length-1; k>col; k--){
		if(free[k] == 1){
			index[0] = k;
			return true;
		}
	}
	return false;
}

function canBeMovedDown(row,free,index){
	for(let k=template.length-1; k>row; k--){
		if(free[k] == 1){
			index[0] = k;
			return true;
		}
	}
	return false;
}

function canGetAttachedUp(row,col,free,index){
	let freeSlots = 0;
	for(let k = 0; k<row; k++){
		if(template[row][col] == template[k][col]){ //console.log("[" + row + "][" + col + "] equals [" + k + "][" + col + "]");

			let slotsBetween = (row-1)-k;

			if(slotsBetween == 0) {

				index[0] = k;
				return true;

			} else if(slotsBetween > 0) {

				for(let n = k+1; n<row; n++){
					if(free[n] == 1){
						freeSlots++;
					} 	
				}
				if(slotsBetween == freeSlots){
					index[0] = k;
					return true;
				} 
			} else {
			console.log("[" + row + "][" + col + "] equals [" + k + "][" + col + "] but no attaching");
			}
		}
		
	}
	return false;
}

function canGetAttachedLeft(row, col, free, index){
	let freeSlots = 0;
	for(let k = 0; k<col; k++){
		if(template[row][col] == template[row][k]){
			let slotsBetween = (col-1)-k;

			if(slotsBetween == 0) {

				index[0] = k;
				return true;

			} else if(slotsBetween > 0) {

				for(let n = k+1; n<col; n++){
					if(free[n] == 1){
						freeSlots++;
					} 	
				}
				if(slotsBetween == freeSlots){
					index[0] = k;
					return true;
				} 
			} else {
			console.log("[" + row + "][" + col + "] equals [" + k + "][" + col + "] but no attaching");
			}
		}
	}
	return false;
}


function canGetAttachedDown(row,col,free,index){
	let freeSlots = 0
	for(let k=template.length-1; k>row; k--){
		if(template[row][col] == template[k][col]){
			console.log("[" + row + "][" + col + "] equals [" + k + "][" + col + "]");
			let slotsBetween = k-(row+1);

			if(slotsBetween == 0) {
				index[0] = k;
				return true;
				
			} else if(slotsBetween > 0){
				for(let n = row+1; n<k; n++){
					if(free[n] == 1){
						freeSlots++;
					} 	
				}
				if(slotsBetween == freeSlots){
					index[0] = k;
					return true;
				} 
			} else {
				console.log("[" + row + "][" + col + "] equals [" + k + "][" + col + "] but no attaching");
			}
		}
	}
	return false;
}




function canGetAttachedRight(row,col,free,index){
	let freeSlots = 0
	for(let k=template.length-1; k>col; k--){
		if(template[row][col] == template[row][k]){
			let slotsBetween = k-(col+1);

			if(slotsBetween == 0) {
				index[0] = k;
				return true;
				
			} else if(slotsBetween > 0){
				for(let n = col+1; n<k; n++){
					if(free[n] == 1){
						freeSlots++;
					} 	
				}
				if(slotsBetween == freeSlots){
					index[0] = k;
					return true;
				} 
			} else {
				console.log("[" + row + "][" + col + "] equals [" + k + "][" + col + "] but no attaching");
			}
		}
	}
	return false;
}










function porSubnormalYNoPensar(){

	for(let j = 0; j < template.length; j++){
		let free = [0, 0, 0, 0];
		let attached = false;
		for(let i = 0; i < template.length; i++){
			console.log("I'm on " + i + " " + j + " value: " + template[i][j]);
			if (template[i][j] == 0){
				free[i] = 1;
				console.log("Position " + i + " is free");
			} else if (i>0 && template[i][j] != 0){
				console.log("Different detected!");

				for(let k = 0; k < free.length; k++){
					if(k>0 && template[k-1][j] == template[i][j] && !attached){
						template[k-1][j] += template[i][j];
						template[i][j] = 0;
						free[k-1] = 0;
						free[i] = 1;
						attached = true;
						break;
					}
					if(free[k] == 1){
						console.log("Free de " + k + " es 1");
						if(k>0 && template[k-1][j] == template[i][j] && !attached){
							template[k-1][j] += template[i][j];
							template[i][j] = 0;
							free[k-1] = 0;
							free[i] = 1;
							attached = true;
							break;
						} else {
							console.log("First free spot is " + k);
							template[k][j] = template[i][j];
							console.log("Moving to [" + k + "][" + j + "] value: " + template[i][j]);
							template[i][j] = 0;
							free[i] = 1;
							free[k] = 0;
							break;
						}
					}
					
					
				}
			}	
		}
	}
}

function printTemplate(){
	for (let i = 0; i < template.length; i++){
		for(let j = 0; j<template.length; j++){
			if(template[i][j] != 0) {
				value = template[i][j];
				ctx.beginPath();
				if(value >= 1024){
					ctx.font = "30px Arial";
				} else if(value >= 128){
					ctx.font = "40px Arial";
				}  else {
					ctx.font = "60px Arial";
				}
				
				ctx.textAlign="center"; 

				ctx.fillStyle = options[value].bg_color;
				ctx.fillRect(85+(box_width*j+10*j), 150+(box_height*i+10*i), box_width, box_height);
				ctx.fillStyle = options[value].color;
				ctx.fillText(options[value].value, 85+(box_width/2)+(box_width*j+10*j), 150+15+(box_height/2)+(box_height*i+10*i));
			} else {
				ctx.fillStyle = box_color;
				ctx.fillRect(85+(box_width*j+10*j), 150+(box_height*i+10*i), box_width, box_height);
			}
		}
	}

}


CanvasRenderingContext2D.prototype.roundedRectangle = function(x, y, width, height, rounded) {
  const radiansInCircle = 2 * Math.PI
  const halfRadians = (2 * Math.PI)/2
  const quarterRadians = (2 * Math.PI)/4  
  
  // top left arc
  this.arc(rounded + x, rounded + y, rounded, -quarterRadians, halfRadians, true)
  
  // line from top left to bottom left
  this.lineTo(x, y + height - rounded)

  // bottom left arc  
  this.arc(rounded + x, height - rounded + y, rounded, halfRadians, quarterRadians, true)  
  
  // line from bottom left to bottom right
  this.lineTo(x + width - rounded, y + height)

  // bottom right arc
  this.arc(x + width - rounded, y + height - rounded, rounded, quarterRadians, 0, true)  
  
  // line from bottom right to top right
  this.lineTo(x + width, y + rounded)  

  // top right arc
  this.arc(x + width - rounded, y + rounded, rounded, 0, -quarterRadians, true)  
  
  // line from top right to top left
  this.lineTo(x + rounded, y)  
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
