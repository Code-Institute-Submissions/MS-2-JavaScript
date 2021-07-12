//------------------------------START SCREEN-------------------------------------|
const startGameElement = document.getElementById('start_game');
const speedElement = document.getElementById('speed');
// Start screen Effect
const startChild2 = document.getElementById('start_game').children[1].style.margin = '0%';
const startChild3 = document.getElementById('start_game').children[2].style.margin = '0%';
const startChild4 = document.getElementById('start_game').children[3].style.margin = '0%';
const startChild5 = document.getElementById('start_game').children[4].style.margin = '0%';

//level variables
const levelsElement = document.getElementById('select_level');
const level1 = levelsElement.children[0];
const level2 = levelsElement.children[1];
const level3 = levelsElement.children[2];

//____________GAME CONTROLS__________________
//Control how many points per life-----------|
//This number must divide evenly with 100----| 
pointsForLife = 25;
//___________________________________________
//Adjust starting speed----------------------|
let speed = 2800;
//Every time progressPoints is reached ------|
//Speed will increase and will add one target|
let progressPoints = 20;


// Game event listeners
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact_button').addEventListener('click', contactPage);
    document.getElementById('info').addEventListener('click', infoPopout);
    // Start game level 1
    level1.addEventListener('click', function () {
        //Starting Target count

        objectCount = 1;
        startTheGame();
    });
    // Start game level 2
    level2.addEventListener('click', function () {
        //Starting Target count
        objectCount = 2;
        startTheGame();
    });
    // Start game level 3
    level3.addEventListener('click', function () {
        //Starting Target count
        objectCount = 3;
        startTheGame();
    });
});

//--------------------------HELP--INFO-POP-OUT------------------------------------|
const helpElement = document.getElementById('help');
helpElement.style.display = 'none'

function infoPopout() {

    const gameHelp = document.getElementById('game_help');
    if (helpElement.style.display === 'none') {
        helpElement.style.display = 'flex';
        gameHelp.style.display = 'block';
        setTimeout(function () {
            helpElement.style.transition = 'margin-top 1s cubic-bezier(.36,1.27,1,.49)';
            helpElement.style.marginTop = '290px';
            gameHelp.style.transition = 'bottom 1s cubic-bezier(.36,1.27,1,.49)';
            gameHelp.style.bottom = '8%';
        }, 100);
    } else {
        helpElement.style.marginTop = '0px';
        gameHelp.style.bottom = '-100%';

        setTimeout(function () {
            helpElement.style.display = 'none';
            gameHelp.style.display = 'none';
        }, 500);
    }
}

//-------------------------------CONTACT PAGE-------------------------------------|
const contactWindow = document.getElementById('contact_window');
contactWindow.style.display = 'none';

function contactPage() {
    document.getElementById('form');
    const formChild2 = document.getElementById('contact_window').children[1];
    const formChild3 = document.getElementById('contact_window').children[2];
    document.getElementById('button2').addEventListener('click', pageReload1);
    contactWindow.style.display = 'flex';
    setTimeout(setTimeout1, 100);
    //setTimeout for page load styling
    function setTimeout1() {
        formChild2.style.margin = '0%';
        formChild3.style.margin = '0%';
        startGameElement.style.display = 'none';
        gameOverElement.style.display = 'none';
    };

}
//-CONTACT FORM--API--emailjs.com
// Some of emailjs API code is reused of Code Institute Resume project 
// Added message element and clear form after sent
function sendMail(contactForm) {
    emailjs.send("gmail", "game", {
            "from_name": contactForm.name.value,
            "from_email": contactForm.emailaddress.value,
            "Game_bug_report": contactForm.gameBugReport.value
        })
        .then(
            function (response) {
                console.log("SUCCESS", response);
                // Added alert mesaage after successfull delivery
                document.getElementById('submit_alert').setAttribute("class", "submit_alert border");
                document.getElementById('submit_alert').innerHTML = `<p>Your message has been sent successfully. Thank You!</p>`;
                // Reset alert message after 6 seconds
                setTimeout(alertOff, 6000);
                document.getElementById('form').reset();
                // Alert reset function
                function alertOff() {
                    document.getElementById('submit_alert').setAttribute("class", "");
                    document.getElementById('submit_alert').innerHTML = '';
                }
            },
            function (error) {
                alert('Your Failed to sent. Please check your details. Thank you...')
                console.log("FAILED", error);
            }
        );
    return false;
}

// -----------------------------TARGETS-------------------------------------------|
// getting width and height numbers based on the screen size.
// Passing width and height numbers into a random number generator to
// get random x and y coardinates for the game objects.

// Tagtet possition 
let x;
let y;
let w
let h

//this line below from stackoverflow

// get random position depending on screen size 
function posotioning() {
    w = gameWindowElement.offsetWidth;
    h = gameWindowElement.offsetHeight;
    x = Math.floor(Math.random() * (w - 50)) + 'px';
    y = Math.floor(Math.random() * (h - 50)) + 'px';
}

let targets = document.getElementsByClassName('target');
//target object count
let objectCount;
// Trarget Colors
let colours = ['red', 'royalblue', 'green'];
let randColor = colours[(Math.random() * colours.length) | 0]
// append color and position for individual targets 
function objects() {
    for (let i = 0; i < objectCount; i++) {
        randColor = colours[(Math.random() * colours.length) | 0]
        posotioning();
        targets[i].style.display = 'block';
        targets[i].style.left = x;
        targets[i].style.top = y;
        targets[i].style.backgroundColor = randColor;
    }
}

//target event listeners + styling
function targetSetup() {
    for (let i = 0; i < objectCount; i++) {
        livesDivElement.style.transition = ".6s";
        targets[i].addEventListener('click', clickEvent = () => {
            targets[i].style.display = 'none';
            scoreCount = score.innerText;
            livesLogic();
        })
    }
}

// reemove target event listeners

function addTargetListeners() {
    for (let i = 0; i < objectCount; i++) {
        targets[i].addEventListener('click', clickEvent = () => {});
    }
}

function removeTargetListeners() {
    for (let i = 0; i < objectCount; i++) {
        targets[i].removeEventListener('click', clickEvent);
    }
}


// Target reset display:none
function targetsDisplayNone() {
    for (let i = 0; i < objectCount; i++) {
        targets[i].style.display = 'none';
    }
}

//------------------------------SCORE STREAK COUNTER -----------------------------|
const counterElement = document.getElementById('score_counter');
//Score Counter varialles
const score = counterElement.children[0];
const scoreStreak = counterElement.children[1];
const scoreMissed = counterElement.children[2];

let streak2 = 0;
let streak1 = 0;
let highScore = 0;
// scorestreak counter
function countHighScore(highScoreClick, higScoreMiss) {
    highScoreClick = streak1;
    higScoreMiss = streak2;
    if (highScoreClick > higScoreMiss) {
        highScore = Math.abs(highScoreClick - higScoreMiss);
        scoreStreak.innerText = highScore;
    } else {
        highScore = Math.abs(higScoreMiss - highScoreClick);
        scoreStreak.innerText = highScore;
    };
}

//------------------------------TARGET CLICKS-------------------------------------| 
// click counter variables
let clicks = 0;
let difference = 0;

// get difference between missed and clicked targets
// ressets if missed target or gained life
function countDifference(windowClick) {
    if (clicks > windowClick) {
        difference = Math.abs(windowClick - difference);
    } else {
        difference = Math.abs(clicks, windowClick);
    };

}

//Count clicks on targets
function livesLogic() {
    speedElement.children[0].innerText = `${speed  / 1000}s`;
    score.innerText++;
    clicks++;
    streak1++;
    notClick++;
    addLife();
    countHighScore();
    countDifference();
    gameSpeed();
    addTarget()

}
//----------------------------GAME WINDOW-----------------------------------------|
const gameWindowElement = document.getElementById('game_window');
let detectWindowEvents;
// detect clicks on game window
function gameWindow() {

    // Game window mousedown listener
    gameWindowElement.addEventListener('mousedown', detectWindowEvents);

    function detectWindowEvents(event) {
        //Stackoverflow user abaz prevent click event trigger on child elements helped me to solve this                   
        //https://stackoverflow.com/questions/1369035/how-do-i-prevent-a-parents-onclick-event-from-firing-when-a-child-anchor-is-cli                      
        if (this === event.target) {
            clicks = 0;
            streak2 = 0;
            streak1 = 0;
            livesCount--;
            scoreMissed.innerText++;
            countDifference();
            deductLife()
            livesDivElement.style.width = '0';
            this.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
        };
    };
    // Game window mouseup listener
    gameWindowElement.addEventListener('mouseup', function () {
        this.style.backgroundColor = 'oldlace';
    });
}

//-------------------------------LIVES COUNTER------------------------------------|
// Lives Elements
const livesDivElement = document.getElementById('add_life');
const livesElement = document.getElementById('lives_remailing');
let life1 = livesElement.children[0];
let life2 = livesElement.children[1];
let life3 = livesElement.children[2];

livesDivElement.style.width = '100%';
livesDivElement.style.backgroundColor = 'green';

// get lives a color
let lives = document.getElementsByClassName('life');
let colourLives = ['green', 'red', 'royalblue']
let livesCount = 3;
let i = 0;
while (i < livesCount) {
    lives[i].style.backgroundColor = colourLives[i];
    i++;
}

// Reset lives to color to oldlace
function livesDisplaySeashell() {
    for (let i = 0; i < livesCount; i++) {
        lives[i].style.backgroundColor = 'oldlace';
    }
}

// How many points for new life must divide with 100 evenly
let divider = 100 / pointsForLife;

//Add one life

function addLife() {
    if (livesCount === 0) {
        stopTheGame();
    }
    // life counter progress bar
    if (livesCount == 2) {
        livesDivElement.style.width = difference * divider + '%';
        livesDivElement.style.backgroundColor = 'green';
    } else if (livesCount == 1) {
        livesDivElement.style.width = difference * divider + '%';
        livesDivElement.style.backgroundColor = 'red';
    } else if (livesCount == 3) {
        livesDivElement.style.backgroundColor = 'green';
    }
    //add one life if 25 scorestreak reached
    if (difference == pointsForLife && livesCount == 2) {
        livesCount = 3;
        clicks = 0;
        lives[0].style.backgroundColor = 'green';
    } else if (difference == pointsForLife && livesCount == 1) {
        livesCount = 2;
        clicks = 0;
        lives[1].style.backgroundColor = 'red';
    }
}


// Deduct one life if missed target
function deductLife() {
    if (livesCount == 2) {
        lives[0].style.backgroundColor = 'oldlace';
    } else if (livesCount == 1) {
        lives[0].style.backgroundColor = 'oldlace';
        lives[1].style.backgroundColor = 'oldlace';
    } else if (livesCount == 0) {
        lives[0].style.backgroundColor = 'oldlace';
        lives[1].style.backgroundColor = 'oldlace';
        lives[2].style.backgroundColor = 'oldlace';
        stopTheGame();
    }
}


//------------------------------MISSED TARGET LOGIC-------------------------------|

// timing for target check
let notClick = 0;

function timigFunction() {
    notClick = 0;
    for (let i = 0; i < targets.length; i++)
        if (targets[i].style.display === 'block') {
            notClick++;
        }
    if (notClick >= 3 && objectCount >= 3) {
        stopTheGame();
    } else if (notClick == 2 || notClick == 1) {
        livesCount = livesCount - notClick;
        deductLife()
    }
    notClick = 0;
}

//----------------------GAME PROGRESS SPEED INCREASE------------------------------| 
// As score increase Speed will increase as well 

let timing = speed - 100;
//multiples score
let speedScore = progressPoints;

//Speed progression multiplier
// adds an object on progression
function gameSpeed() {
    if (progressPoints == score.innerText && objectCount <= 12) {
        progressPoints = progressPoints + speedScore;
        speed = speed - 200;
        timing = speed - 100;
        objectCount++;
        console.log(objectCount);
        let listen = objectCount - 1;
        setTimeout(() => {
            targets[listen].addEventListener('click', addClickEvent = () => {
                targets[listen].style.display = 'none';
                scoreCount = score.innerText;
                livesLogic();
                console.log('from inside', objectCount, listen);
            });
        }, 20);
    }
}

// adds an object on progression
function addTarget() {
    if (score.innerText == 10) {

        console.log(objectCount, listen);
    }
}

//------------------------------GAME SELLECT--------------------------------------|
// Timmer variables 
let timer1;

//Level Hard-------------|
function startTheGame() {
    startGameElement.style.display = 'none';
    livesDivElement.style.width = '100%';
    levelsElement.style.display = 'none';
    gameWindow();
    targetSetup();
    levelH(speed);
}

function levelH(speed) {

    timer1 = setInterval(timingF, speed);

    function timingF() {
        objects();
        setTimeout(timigFunction, timing, );
    }
}

//-------------------------------- STOP THE GAME----------------------------------|
const gameOverElement = document.getElementById('game-over');
const gameOverChild2 = document.getElementById('game-over').children[1];

function stopTheGame() {
    document.getElementById('new_game_btn').addEventListener('click', pageReload1);
    document.getElementById('contact_button2').addEventListener('click', contactPage);
    document.getElementById('new_game_btn').addEventListener('click', pageReload1);
    gameWindowElement.removeEventListener('mousedown', detectWindowEvents);
    targetsDisplayNone();
    livesDisplaySeashell();
    contactWindow.style.display = 'none';
    speed = speed * 1000;
    livesDivElement.style.width = '0';
    gameOverElement.style.display = 'flex';
    clearInterval(timer1);
    setTimeout(gameOverTimer, 100);

    function gameOverTimer() {
        gameOverChild2.style.margin = '0';
    };
}

//Game Over reload screen 
function pageReload1() {
    location.reload();
}