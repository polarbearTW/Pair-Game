//get all cards' elements
let cards = document.getElementsByClassName('card');
let score = document.querySelector('span')

//Store card value (last card & current card)
let checkFirstCardFlipOrNot = false;
let lastCard, currentCard;

//another way to flip the card using for each
// let cards = document.querySelectorAll('.card');
// cards.forEach(card => {
//     card.addEventListener("click", flip)
// });

for (let i=0; i<cards.length; i++){
    //shuffle the cards
    let randomNum=Math.floor(Math.random()*8);
    cards[i].style.order=randomNum;
    //add click to all the cards
    cards[i].addEventListener("click", flip);
}

function flip() {
    // console.log(this);
    this.classList.add("flipcard")

    //when the first card is clicked
    if(!checkFirstCardFlipOrNot) {
        checkFirstCardFlipOrNot = true;
        lastCard=this;
        //console.log({checkFirstCardFlipOrNot, lastCard});
        //when click other cards, we will not go into the condition cuz !checkFirstCardFlipOrNot = false
        //and we can lock the very first card in varible "lastCard"
    } else {
        //store the second card in 'currentCard'
        checkFirstCardFlipOrNot = false;
        currentCard=this;
        checkIfUserGotItRight();  
    }
}

//a function to compare two card value
function checkIfUserGotItRight() {
    if(lastCard.getAttribute("value")==currentCard.getAttribute("value")) {
        score.innerHTML = parseInt(score.innerHTML) + 1
        correctpair();
        finishthegame();
    } else {
        wrongpair();
    }
}

// a function to prevent the flipped paired cards got clicked again
function correctpair() {
    lastCard.removeEventListener("click", flip);
    currentCard.removeEventListener("click", flip);
}

// a function to let the wrong pair flipped back
function wrongpair() {
    setTimeout(()=>{
        lastCard.classList.remove("flipcard");
        currentCard.classList.remove("flipcard");
    }, 800);
}

// a function to check if all the cards are flipped
function finishthegame(){
    if(score.innerHTML==4) {
        setTimeout(()=>{
            alert("You found all the pairs! Please refresh the page to start a new game")
        }, 800);
    }
}