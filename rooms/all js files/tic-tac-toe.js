$(document).ready(function(){
	$("#board, #scores").hide();


	/* VARIABLES INITIATED IN HERE */
	var human;
	var comp;

	var p1 = [1,'X',0]; // [player,sign,wins]
	var p2 = [2,'O',0];

	var current;
	var firstTurn;

	var winners = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 1, 2],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
	];

	var boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];

	var gameWon = false;

	var turnCount=0;


	/*CODE TO BEGIN GAME, PLAYER NEEDS TO CHOOSE X OR O*/
	$('#chooseP > .btn').click(function(){
		if($(this).attr('id') === "chooseP1"){
  		human = p1;
  		comp = p2;
  		current = human;
  		firstTurn = 'human';
  	} else {
  		human = p2;
  		comp = p1;
  		current = comp;
  		firstTurn = 'comp';
  		//need to run computer first turn
  		var x = setTimeout(compTurn, 500);
  	}
  	$('#chooseP').hide();
  	$("#board, #scores").show();

  });

	/*CODE TO MAKE FREE TILES CHANGE MOUSE ON HOVER SO PLAYER CAN SEE IF AVAILABLE*/
	$("td").hover(function() {
		var pos = $(this).attr("id");
    //checks if square is empty using board array, if it is empty, changes mouse to crosshair when hovering
    if (boardArr[pos] == "#") {
    	$(this).css("cursor", "crosshair");
    }
});

  //CODE FOR HUMAN CLICKING EMPTY SQUARE
  
  $("td").click(function(){
  	var tile = $(this).attr('id');
  	if(boardArr[tile]==='#'){
  		
  		humanTurn(tile);
  		
  	}
  })
	

  /*FUNCTIONS TO BE CALLED FOR TURNS*/

  //pickEmpty, used for computers turn to pick a random empty square.
  function pickEmpty(){
  	var emptyArr = [];
  	for(i=0;i<boardArr.length;i++){
  		if(boardArr[i] === '#'){
  			emptyArr.push(i);
  		}
  	}
  	var x = Math.round(Math.random() * emptyArr.length);
  	var choice = emptyArr[x];
  	if (choice === undefined) {
  		choice = emptyArr[x - 1];
  	}
  	return choice;
  };
  /********************************************************/

  /**************COMPUTERS TURN****************************/
  function compTurn(){
  	let current = comp;
  	var tile = pickEmpty();
  	$('#'+tile).html(comp[1]);
  	boardArr[tile] = comp[1];
  	checkWin(current);
  	if(gameWon === 1 || gameWon ===2){
  		alert("Computer wins!");
  		winReset(comp);

  	} 
  	else {
  		turnCount ++;
  		checkDraw();
  		if(turnCount===0 && human[0]===2){
  			compTurn();
  		}
  		
  	}

  	
  	
  };

/*********************HUMANS TURN**************************/
  function humanTurn(tile){
  	let current = human;
   	$('#'+tile).html(human[1]);
  	boardArr[tile] = human[1];
  	checkWin(current);
  	
  	if(gameWon === 1 || gameWon ===2){
  		alert("Nice one, you win!");
  		var reset = setTimeout(winReset(human),1000);
  	} 
  	else {
  		turnCount ++;
  		checkDraw();
  		if(turnCount!== 0){
  		var compGo = setTimeout(compTurn,800);
  		}else if(turnCount===0 && human[0]===2){
  			compTurn();
  		}
  		
  	}
  	
  }


/**********************Function to check for a win*********************/
  function checkWin(curr){
  	var currentTiles = [];
  	//compile array of all tiles taken by the current player
  	for(i = 0; i<boardArr.length; i++){
  		if(boardArr[i]===curr[1]){
  			currentTiles.push(i);
  		}
  	}

  	//Check the current tiles array agains each winning combo to find a match.
  	for(x=0; x<winners.length; x++){
  		var count = 0;
  		for(j=0;j<winners[x].length;j++){
  			if(currentTiles.indexOf(winners[x][j])!= -1){
  				count ++;
  			}
  			
  			if(count == 3){
  				
  				gameWon = current[0];
  				
  			}	
  		}
  	}

  }

  /**************Upon win, updates scores and resets board for new game********/
  function winReset(winner){
  	winner[2] ++;
  	$('#scores').html('P1: '+p1[2]+' <br>P2: '+p2[2]);
  	turnCount=0;
  	$('td').html('');
  	boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
  	if(human === p1){
  		current = human;
  	}else{
  		
  		let current = comp;
  	var tile = pickEmpty();
  	$('#'+tile).html(comp[1]);
  	boardArr[tile] = comp[1];
  	turnCount++;

  	}

    if(p1[2] === 3 && p2[2] === 5){
        var body = document.body;
        body.innerHTML = `<h2>WHEN MASTER SLEEPS HIS RIGHT IS NO MORE RIGHT IF WRONG HE IS DOOMED. The key is "very close".</h2>`;
        return;
    }
    
  	gameWon = false;
  }

  /*******************CHECKS FOR DRAW*********************/
  function checkDraw(){
  	if(turnCount > 8){
  		alert("It's a Draw!");
  		$('td').html('');
  		boardArr = ["#", "#", "#", "#", "#", "#", "#", "#", "#"];
  		if(human === p1){
  		current = human;
  		}else{
  		current = comp;
  		}
  		turnCount = 0;
  	}
  }






});