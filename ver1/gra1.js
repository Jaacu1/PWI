var imgs = [];
var gameImgs = [];
var selectedImgs = [];
var score1 = 0;
var score2 = 0;
var turn = 0;
var unturned = [];
var j = 0;
var k = 0;

generateImgs();
generateTable();
updateScore();

setTimeout(HideImgs, 2000);

document.getElementById('restartBtn').innerHTML = "Restart";
document.getElementById('restartBtn').addEventListener("click", function() {
	document.getElementById('game_table').innerHTML = "";
	score1 = 0;
	score2 = 0;
	turn = 0;
	gameImgs = [];
	generateImgs();
	generateTable();
	updateScore();
	setTimeout(HideImgs, 2000);
});


function HideImgs() {
	var imgsToHide = document.getElementsByClassName('scored');
	if (imgsToHide.length > 0) {
		var len = imgsToHide.length;
		for (var i = 0; i < len; i++) {
			imgsToHide[0].className = "hidden";
		}
	}
}

function updateScore() {
	document.getElementById('score1').innerHTML = "Wynik Gracza: " + score1;
	document.getElementById('score2').innerHTML = "Wynik Komputera: " + score2;
	if (turn == 0) {
		document.getElementById('result').innerHTML = "TURA GRACZA";
	}
	else {
		document.getElementById('result').innerHTML = "TURA KOMPUTERA";
	}


	if (score1 + score2 == 8 && score1 > score2) {
        	document.getElementById('result').innerHTML = "WYGRAŁ GRACZ";
	}
	else if(score1 + score2 == 8 && score1 < score2) {
		document.getElementById('result').innerHTML = "KOMPUTER";
	}
	else if(score1 + score2 == 8 && score1 == score2) {
		document.getElementById('result').innerHTML = "REMIS";
	}

	if (turn == 1) {
		setTimeout(komputer, 1000);
	}
}

function generateImgs() {
	imgs = [
	'images/1.jpg',
	'images/2.jpg',
	'images/3.jpg',
	'images/4.jpg',
	'images/5.jpg',
	'images/6.jpg',
	'images/7.jpg',
	'images/8.jpg',
	];
	
	imgs = shuffle(imgs);
	
	for (var i = 0; i < 8; i++){
		gameImgs.push(imgs[i]);
		gameImgs.push(imgs[i]);
	}
	
	gameImgs = shuffle(gameImgs);
}

function generateTable() {
	var table = document.getElementById('game_table');
	var k = 0;
	
	for (var i = 0; i < 4; i++)
	{
		var row = table.insertRow(i);
		for (var j = 0; j < 4; j++)
		{
			var cell = row.insertCell(j);
			var img = document.createElement('img');
			img.id = i.toString() + j.toString();
			img.src = gameImgs[k];
			img.className = "scored";
			img.addEventListener('click',
			function (obj) {
				if (turn == 0) {
					selectImg(obj.currentTarget)
				}
			}, false);
			cell.appendChild(img);
			k++;
		}
	}
}

function komputer() {
	
	unturned = [];
	j = 0;
	k = 0;
	unturned = document.getElementsByClassName('hidden');

	setTimeout(function () {
		if (unturned.length > 0 && turn == 1) {
			j = getRandomInt(0, unturned.length)
			do {
				k = getRandomInt(0, unturned.length)
			} while (j == k);
			selectImg(unturned[j]);
			setTimeout(function () {
				selectImg(unturned[k]);
			}, 500);
		}
	}, 500);
}


function selectImg(img) {
	if (img.className == "hidden") {
		img.className = "selected";
		selectedImgs.push(img);
		if (selectedImgs.length == 2) {
			if (areTheSame(selectedImgs[0], selectedImgs[1])) {
				setScored(selectedImgs[0],selectedImgs[1]);
			}
			else {
				turn=(turn+1)%2;
				updateScore();
				if (score1 + score2 < 8) {
					setTimeout(function () {
						selectedImgs[0].className = "hidden";
						selectedImgs[1].className = "hidden";
						selectedImgs = []
					}, 500);
				}
			}
		}
	}
}

function setScored(img1, img2) {
	img1.className = "scored";
	img2.className = "scored";
	if (turn == 0) {
		score1++;
	}
	else {
		score2++;
	}
	updateScore();
	selectedImgs = [];
}

function areTheSame(img1, img2) {
	return img1.src == img2.src;
}

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
