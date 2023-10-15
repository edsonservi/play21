var resultado = 0;
var cardsUsed = [];
var flipEnable = false;

function geraCardDiv(divId){
    return `<div class="col card-container" id="${divId}" onclick="flipACard('${divId}')">
                <div class="card bg-transparent border-0">
                    <div class="front"><img src="deck/verse.png" width="100%" /></div>
                    <div class="back"><img src="deck/verseb.png" width="100%" /></div>
                </div>
            </div>`;
}

function geraCardRow(idRow){
    var row = `<div class="row my-3">`;
    for (let i = 0; i < 7; i++){
        row += geraCardDiv(`row_${idRow}_${i}`);
    }
    row += `</div>`;
    return row;
}

function gerarCardTable(){
    var tableGame = document.getElementById('tableGame');
    var content = `
        <div class="row my-3">
            <h3 class="display-4 fw-bold text-center text-bg-success">Play 21</h3>
            <p class="lead fs-2 text-center text-bg-success" id="resultado">&nbsp;</p>
        </div>`;
    content += geraCardRow(1);
    content += geraCardRow(2);
    tableGame.innerHTML = content;
}

function startGame(){
    resultado = 0;
    cardsUsed = [];
    gerarCardTable();
    setarResultado();
    flipEnable = true;
}

function setarResultado(){
        var alvo = document.getElementById('resultado');
        if (resultado === 0){
            alvo.innerHTML = `Selecione as cartas tentando acertar a soma de 21`;
        } else if (resultado === 21){
            alvo.innerHTML = `Sucesso!!! 21!!! <button class="btn btn-light" opacity-75" onclick="startGame()">Jogar Novamente</button>`;
            flipEnable = false;
        } else if (resultado > 21){
            alvo.innerHTML = `Resultado: ${resultado}. Passou de 21... <button class="btn btn-light opacity-75" onclick="startGame()">Tentar Novamente</button>`;
            flipEnable = false;
        } else {
            alvo.innerHTML = `resultado: ${resultado}`;
        }
    }

function gerarCard(){
    var naipes = ['diamond_', 'spade_', 'clubs_', 'hearts_'];
    while(true){
        var naipe = Math.floor(Math.random() * 4);
        var number = Math.floor(Math.random() * 12 + 1);
        number = number < 10 ? `0${number}` : number;
        if (!cardsUsed.includes(naipes[naipe] + number)){
            cardsUsed.push(`${naipes[naipe] + number}`);
            break
        }
    }
    return [number, naipes[naipe]];
}

function calcularResultado(){
    let ace = 0;
    let soma = 0;
    for (let i in cardsUsed){
        let cardY = cardsUsed[i].split('_');
        cardY = parseInt(cardY[1]);
        cardY > 1 ? soma += cardY : ace ++;
    }
    if (ace > 0 && soma < 21){
        for(let x = 1; x <= ace; x ++){
            if (soma + 14 > 21){
                soma += 1;
            } else {soma += 14;}
        }
    }
    return soma;
}

function flipACard(id){
    if (flipEnable === true){
        var cardDiv = document.getElementById(id).children[0];
        var imgInBack = document.getElementById(id).children[0].children[1].children[0];
        var cardSorted = gerarCard();
        resultado = calcularResultado();
        setarResultado(resultado);
        if (!imgInBack.classList.contains('reveled')){
            imgInBack.classList.add('reveled');
            imgInBack.setAttribute('src', `deck/${cardSorted[1] + cardSorted[0]}.png`);
            cardDiv.setAttribute('style', 'transform: rotateY(180deg) rotateZ(-180deg);');
        }
    }
}

startGame();
