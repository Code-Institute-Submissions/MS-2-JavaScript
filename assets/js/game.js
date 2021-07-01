
    let width;
    let height;

    let numWidth;
    let numHeight;

    let positionx; 
    let positiony;

    
// get div elements 
let newDiv = document.getElementsByTagName('div');

//Game Window-And target-variables
let gameWindow = newDiv[0];
let div1 = newDiv[1];
let div2 = newDiv[2];
let div3 = newDiv[3];

// -------------------RANDOM NUMBER GENERATOR------------------
// getting width and height numbers based on the screen size.
function getPosition() {
    width = window.innerWidth;
    height = window.innerHeight;
}

// Passing width and height numbers into a random number generator to
// get random x and y coardinates for the game objects.
function positionYX() {
    numWidth = Math.floor(Math.random() * (width - 50));
    numHeight = Math.floor(Math.random() * (height - 50)); 
    
    positionx =  numWidth + 'px';
    positiony = numHeight + 'px';
}

// Get random number and position in one function.
function getRandom() {
    getPosition();    
    positionYX();
}

// create random Object for individual targets------------
function randomObject1() {
    getRandom()  
    div1.style.left = positionx;
    div1.style.top = positiony;
}

function randomObject2() {
    getRandom()  
    div2.style.left = positionx;
    div2.style.top = positiony;
}

function randomObject3() {
    getRandom()  
    div3.style.left = positionx;
    div3.style.top = positiony;
}

// Target Objects for each game level
function gameOne() {
    randomObject1();
}

function gameTwo() {
    randomObject1();
    randomObject2();
}

function gameThree() {
    randomObject1();
    randomObject2();
    randomObject3();
}

// Timmer variables 
let timer1;
let timer2;
let timer3;

//Timer Reset
function reset() {
    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(timer3);
}

// Score counter-------------------------------------------------

// Target event listermers
div1.addEventListener('click', randomObject1);
div2.addEventListener('click', randomObject2);
div3.addEventListener('click', randomObject3);

// game window event listener
gameWindow.addEventListener('click', function() {
    let windowClick = 1;
    console.log(windowClick);
});


// Game Level sellection------------------------------------------


const getP = document.getElementsByTagName('p');

getP[0].addEventListener('click', function() {
    reset();
     timer1 = setInterval( function() {
            gameOne();
            console.log('Easy');
        }, 3000);
});
getP[1].addEventListener('click', function() {
    reset();
    timer2 = setInterval( function() {
        setTimeout(gameTwo, 2000);
        console.log('Medium');
    }, 3000);
});
getP[2].addEventListener('click', function() {   
    reset();
    timer3 = setInterval( function() {
        setTimeout(gameThree, 2000);
        console.log('Hard');
    }, 3000);
});



