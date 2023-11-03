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
    console.log('Clicked Roll Dice button');
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


// Callback function for rollDice that will add dice rolls to the page
function displayDice(){
    let rolledDice = document.getElementById('rolled-dice');
    clearGame(rolledDice);
    for (i=0; i < 6; i++){
        let die = document.createElement('p');
        let randomNumber = getRandomNumber();
        die.textContent = 'Roll ' + (i + 1) + ': ' + randomNumber;
        die.classList.add('rolled-die');
        rolledDice.appendChild(die);
    }
}


// Function to clear the current dice as well as the round and total scores
function clearGame(rolledDice=rolledDice){
    rolledDice.innerHTML = '';
}