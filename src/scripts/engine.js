const emojis = [
    "😂", "❤️", "😍", "😭", "😊", "👍", "😩", "🙏", "✨", "😒", 
    "💕", "😘", "😔", "😡", "👌", "😁", "🔥", "💔", "💖", "😄", 
    "😜", "😳", "💙", "😞", "😎", "😢", "💜", "💗", "💵", "💘", 
    "💛", "😋", "😌", "😏", "😀", "😈", "💚", "😴", "😅", "💓", 
    "🤓", "💎", "💋", "😪", "😱", "😵", "😐", "😕", "😑", "🤑",
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
];

const emojisSelecionados = [];
let openCards = [];
let timer = 0;
let intervalo;


for(let i = 0; i < 10; i++) {
    let randomIndex = Math.floor(Math.random() * emojis.length);
    emojisSelecionados.push(emojis[randomIndex]);
    emojisSelecionados.push(emojis[randomIndex]);
    emojis.splice(randomIndex, 1);
}


let randomEmojis = emojisSelecionados.sort(() => (Math.random() > 0.5 ? 2 : -1));

for(let i = 0; i < emojisSelecionados.length; i++)
{
    let card = document.createElement("div");
    card.className = "item";
    card.innerHTML = randomEmojis[i];
    card.onclick = handleClick;
    document.querySelector(".game").appendChild(card);
}

function handleClick() {
    if (this.classList.contains("cardMatch")) {
        return;
    }

    playSound("click");

    if(openCards.length < 2) {
        this.classList.add("cardOpen");
        openCards.push(this);
    }
    
    if (openCards.length === 2) {
        if(openCards[0].offsetLeft === this.offsetLeft && openCards[0].offsetTop === this.offsetTop){
            openCards.pop();
            return;
        }
        setTimeout(checkMatch, 300);
    }
}

function checkMatch() {
    if(openCards[0].innerText === openCards[1].innerText) {
        playSound("correct");
        openCards[0].classList.add("cardMatch");
        openCards[1].classList.add("cardMatch");
    } else {
        playSound("wrong");
        openCards[0].classList.remove("cardOpen");
        openCards[1].classList.remove("cardOpen");
    }
    openCards = [];

    if(document.querySelectorAll(".cardMatch").length === emojisSelecionados.length) {
        win();
    }
}

function win() {
    clearInterval(intervalo); 
    document.querySelector(".game").innerHTML = "";
    document.querySelector(".game").innerHTML = 
    `
    <h2 style="color: #000">Parabens!!<br> voce ganhou!</h2>
    <p>Você levou <span>${timer}</span> segundos!</p>
    `;
    playSound("win");

}

function playSound(audioName) {
    let audio = new Audio(`./src/sounds/${audioName}.mp3`);
    audio.playbackRate = 1.5;
    audio.volume = 0.5;
    audio.play();
}

function initialize() {
    playSound("win");
    let intervalo = setInterval(function() {timer++;}, 1000);
}

initialize();