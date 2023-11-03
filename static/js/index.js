pageLoader();

function pageLoader(){
    console.log('Loading the page...')

    const gameButtons = document.getElementsByClassName('game-button');
    for (let btn of gameButtons){
        btn.addEventListener('click', rollDice)
    }
}


// Function that rolls the dice
function rollDice(e){
    console.log(e.target.value);
    if (e.target.value === 'Roll'){
        displayDice();
    }
}


// Random number function for dice roll
function getRandomNumber() {
    const random = Math.random();
    const randomNumber = Math.floor(random * 6) + 1;
    return randomNumber;
}


// Callback function for rollDice that will add dice rolls to the page and update round and total scores
function displayDice(){
    let rolledDice = document.getElementById('rolled-dice');
    let roundScore = document.getElementById('round-score');
    let totalScore = document.getElementById('total-score');
    let rollCount = document.getElementById('roll-number')
    let diceValues = [];

    let roundTotal = 0;

    rolledDice.innerHTML = '';
    for (let i=0; i < 6; i++){
        let die = document.createElement('p');
        let randomNumber = getRandomNumber();
        diceValues.push(randomNumber);

        die.textContent = 'Roll ' + (i + 1) + ': ' + randomNumber;
        die.classList.add('rolled-die');
        rolledDice.appendChild(die);
    }
    console.log(diceValues);
    roundTotal = calcScore(diceValues)
    roundScore.textContent = roundTotal;
    totalScore.textContent = parseInt(totalScore.textContent) + roundTotal;
    rollCount.textContent = parseInt(rollCount.textContent) + 1;
    
    if (parseInt(totalScore.textContent) >= 10000){
        console.log('You win!!!');
    }
}


// Function to clear and reset the game
function clearGame(){
    return;
}


// Function with the game logic to determine the score of a roll of 6 dice
function calcScore(diceValues){
    let score = 0;
    if (isStraight(diceValues)){
        score += 1500;
        return score;
    }
    // Count the # of triples
    const countMap = new Map();
    for (const value of diceValues) {
        if (countMap.has(value)) {
            countMap.set(value, countMap.get(value) + 1);
        } else {
            countMap.set(value, 1);
        }
    }
    // Calculate the score for each triple
    for (const [value, count] of countMap.entries()){
        if (count >= 3) {
            score += calculateTripleScore(value);
        }
    }
    for (const value of diceValues) {
        if (value === 1) {
            score += 100;
        } else if (value === 5) {
            score += 50;
        }
    }
    return score;
}


// Function to check if the roll was a straight 
function isStraight(diceValues){
    // Sort the array in ascending order (function is used to ensure the values are sorted numerically and not as strings)
    diceValues.sort((a, b) => a - b);
    return JSON.stringify(diceValues) === JSON.stringify([1, 2, 3, 4, 5, 6]);
}


// Function to calculate the score if a triple is present
function calculateTripleScore(tripleValue){
    if (tripleValue === 1) {
        return 1000; // Score for 3 1's
    } else if (tripleValue >= 2 && tripleValue <= 5) {
        return tripleValue * 100;
    } else {
        return 0;
    }
}