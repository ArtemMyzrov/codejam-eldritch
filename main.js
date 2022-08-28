import ancientsData from "./data/ancients.js";
import * as blue from "./data/MythicCards/blue/index.js";
import * as green from "./data/MythicCards/green/index.js";
import * as brown from "./data/MythicCards/brown/index.js";

const ancient = document.querySelector('.ancient-card');
const level = document.querySelectorAll('.difficulty');
const shuffleButton = document.querySelector('.shuffle-button');
const lastCard = document.querySelector('.last-card');
const deck = document.querySelector('.deck');

const currentAncient = ancientsData.find( (e) => e.id === 'shubNiggurath');

function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

const blueCards = blue.default; //массив значений объекта cards из голубой папки
const greenCards = green.default;
const brownCards = brown.default;

let firstStage;
let secondStage;
let thirdStage;

function zames(ancient) {
    const shuffledBlueCards = shuffleArray(blueCards);
    const shuffledGreenCards = shuffleArray(greenCards);
    const shuffledBrownCards = shuffleArray(brownCards);

    firstStage = {
        green: shuffledGreenCards.slice(0, ancient.firstStage.greenCards),
        blue:  shuffledBlueCards.slice(0, ancient.firstStage.blueCards),
        brown: shuffledBrownCards.slice(0, ancient.firstStage.brownCards),
    }
    secondStage = {
        green: shuffledGreenCards.slice(0, ancient.secondStage.greenCards),
        blue:  shuffledBlueCards.slice(0, ancient.secondStage.blueCards),
        brown: shuffledBrownCards.slice(0, ancient.secondStage.brownCards),
    }
    thirdStage = {
        green: shuffledGreenCards.slice(0, ancient.thirdStage.greenCards),
        blue:  shuffledBlueCards.slice(0, ancient.thirdStage.blueCards),
        brown: shuffledBrownCards.slice(0, ancient.thirdStage.brownCards),
    }
}

function renderStages() {
    const stages = [firstStage, secondStage, thirdStage];
    let container = document.querySelector('.current-state');

    for (let index = 0; index < container.children.length; index++) {
        const stage = stages[index];
        const element = container.children[index];
        let stageText = element.querySelector('.stage-text');
        let dots = element.querySelectorAll('.dot');

        if (!stage.green.length && !stage.blue.length && !stage.brown.length) {
            stageText.classList.add('done');
        } else {
            stageText.classList.remove('done');
        }

        for (const dot of dots) {
            if (dot.classList.contains('green')) {
                dot.textContent = stage.green.length;
            }
            if (dot.classList.contains('blue')) {
                dot.textContent = stage.blue.length;
            }
            if (dot.classList.contains('brown')) {
                dot.textContent = stage.brown.length;
            }
        }
    }
}

shuffleButton.addEventListener('click', () => {
    zames(currentAncient);
    renderStages();
    deck.style.display = 'block';
});

deck.addEventListener('click', () => {
    const cardColors = ['green', 'blue', 'brown'];
    let hasCards = (_stage) => (_stage.green.length || _stage.blue.length || _stage.brown.length) && _stage;
    let stage = hasCards(firstStage) || hasCards(secondStage) || hasCards(thirdStage);
    let randomCards;
    let randomColor;

    if (!stage) {
        alert('Карт нет');
        return;
    }

    do {
        randomColor = cardColors[Math.floor(Math.random()*cardColors.length)];
        randomCards = stage[randomColor];
    } while (randomCards.length == 0);

    let selectedCard = randomCards.shift();

    lastCard.style.display = 'block';
    lastCard.style['background-image'] = `url(./assets/MythicCards/${randomColor}/${selectedCard.id}.png)`;

    renderStages();
});




