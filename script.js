window.onload = function(){
	pageSetUp();
};

//four available game images
var avaImg = ["fa fa-optin-monster fa-5x", "fa fa-linux fa-5x", 
"fa fa-drupal fa-5x", "fa fa-github fa-5x", "fa fa-pied-piper-alt fa-5x", 
"fa fa-slideshare fa-5x"];

//k is the number of total clicks on the cells
var k,tem, whoIsFlipped;

//store the flipped ones
var flipped = [];

//setting up the page
function pageSetUp(){
	k=0;
	Array.prototype.slice.call(document.querySelectorAll(".gameCell")).forEach(function(el){
		//assign all cells certain images
		el.setAttribute("class", "gameCell " + avaImg[Math.floor(Math.random()*6)] );
		//change the color so that the user won't see
		el.classList.add("changeColor");
		//listen for click on all of the game cells
		el.addEventListener("click", flipIn);
	});
	document.getElementById("clear"). addEventListener("click", cleanUp);
}


function flipIn(){
	//remove the eventListener on that cell
	this.removeEventListener("click", flipIn);
	// add animation
	this.classList.add("animated", "flipInY");
	// show the picture
	this.classList.remove("changeColor");
	
	//increase the click by one
	k++;
	// //start the timer
	// if(k===1){
	// 	var handle = setInterval(startTimer, 1000);
	// }
	if(k===2){
		checkStatus();		
	}
	
}


function checkStatus(){
	temp = [];
	whoIsFlipped =[];
	//kill all of the event listener on the page, flip out
	Array.prototype.slice.call(document.querySelectorAll(".gameCell")).forEach(function(el){
		// el.removeEventListener("click", flipIn);
		// el.classList.remove("animated", "flipInY");
		//check which are the clicked ones
		if(Array.prototype.slice.call(el.classList).indexOf("changeColor") === -1){
			if(flipped.indexOf(el) === -1){
				whoIsFlipped.push(el);
				temp.push(el.classList[2]);
			}			
		}else{

		}
	});

	//see if the flipped ones are the same
	if(_.uniq(temp).length === 2){
		whoIsFlipped[0].classList.add("animated", "flipOutY");
		whoIsFlipped[1].classList.add("animated", "flipOutY");
	}else{
		flipped.push(whoIsFlipped[0]);
		flipped.push(whoIsFlipped[1]);
		//add score by one;
		document.getElementById("winPoints").innerText++;
		//alert congrates: can't get the bootstrap modal work
		document.body.classList.add("animated", "rubberBand");
	}

	k=0;
	
	setTimeout(clearClass, 1000);

}


function clearClass(){
	document.body.classList.remove("rubberBand");
	Array.prototype.slice.call(document.querySelectorAll(".flipOutY")).forEach(function(el){
		el.addEventListener("click", flipIn);
		el.classList.remove("flipInY", "flipOutY");
		el.classList.add("changeColor");
	});
	
}

function cleanUp(){
	document.getElementById("winPoints").innerText = 0;
	var avaImg = _.shuffle(avaImg);
	Array.prototype.slice.call(document.querySelectorAll(".gameCell")).forEach(function(el){
		el.setAttribute("class", "gameCell");
	});
	flipped = [];
	pageSetUp();
}

// function startTimer(){
// 	document.getElementById("alertClock").innerText--;
// }







