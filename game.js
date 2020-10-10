
//  initialization variables  //

let buttonColours = ['red', 'yellow', 'green', 'blue'];
let pc_pattern = [];    
let player_pattern = [];  
let levelCount = '0';   
let level = 'Level ' + levelCount   //  to upload level title  //     
let pc_indice = 0;   



//  function to play the color's sound  //

function playSound(color){
    new Audio(`sounds/${color}.mp3`).play();
}



// function to animate chosen color's button  //

function animatePress(currentColour){
    $(`#${currentColour}`).toggleClass('pressed');
}



//  function to randomly add a new color to the pc-sequence  //

function nextSequence(){          
      
    let randomNumber = Math.round(Math.random()*3);            //  randomly picks up a color in the color's array  //                        
    let randomChosenColor = buttonColours[randomNumber];
    pc_pattern.push(randomChosenColor);                      //  adds the color in the pc-sequence's array  //
    $(`#${randomChosenColor}`).fadeTo(100, 0.3, function(){ 
        $(this).fadeTo(500, 1.0);
        playSound(randomChosenColor);           //  plays the color's sound  //      
    });          
}



//  function to reset game's variables  //

function reset(){
    levelCount = 0;     
    player_pattern = []; 
    pc_pattern = [];
    pc_indice = 0;  
}



//  function to check the clicked colors  //

function checkAnswer(currentLevel){

    if(currentLevel === pc_pattern[pc_indice]){     //  clicked color === corresponding color in the pc-sequence  //    
        pc_indice++;        //  to access the next color in the pc-sequence  //

        if(player_pattern.length === pc_pattern.length){        //  if the color's right, checks the sequence's length  //
            setTimeout( () => nextSequence(), 1000 )                                             
            player_pattern = [];       
            pc_indice = 0;      
            setTimeout( () =>  $('h1').text(level + ++levelCount), 300 )   //  uploads the level's title  //    
              
        }
    }
    else{          
        reset();      //  resets the game's variables  //
        playSound('wrong');   
        $('h1').toggle();                 //  displays the error message and then the beginning of a new game  //
        $('.looser').toggle();
        $('body').toggleClass('game-over');
        setTimeout( () => $('body').toggleClass('game-over'),200);
        setTimeout( () => $('.looser').toggle(), 800);
        setTimeout( () =>  $('h1').toggle().text('Ready to play ??').css('color', '#FEF2BF'), 800 );
    }
}



//  beginning of the game  --> nextSequence()  //

$('.start button').on('click',function(){                  
    if($('h1').text() === 'Ready to play ??'){
        setTimeout( () => nextSequence(), 500 ); 
        $('h1').text(level);   
    }  
});
 


//  the player clicks a color  //

$('[type="button"]').on('click', function(){          
  
    player_pattern.push(this.id);          //  adds the chosen color ( this.id ) to the player's array  //           
    playSound(this.id);
    animatePress(this.id);
    setTimeout( () => animatePress(this.id), 100 );
    let player_current_color = this.id;    //  color clicked by player  //
    checkAnswer(player_current_color);     
})





            
