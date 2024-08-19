const word = "ARARA"; // Palavra a ser adivinhada sobre o Pantanal
const hints = [
    "É uma ave de penas vibrantes encontrada no Pantanal.",
    "Tem cores brilhantes e um bico curvo.",
    "É conhecida por seu grito característico."
];

let displayedWord = Array(word.length).fill('_');
let remainingChances = 6;
let remainingHints = hints.length;
let hintIndex = 0;

// Função para verificar a palavra completa
const checkWord = () => {
    const guessedWord = displayedWord.join('');
    const possibleWords = [word, word.toLowerCase(), word.toUpperCase()];
    if (possibleWords.includes(guessedWord)) {
        document.getElementById('status-text').innerText = 'Parabéns! Você acertou a palavra!';
        return true;
    }
    return false;
};

// Atualiza a tela com o estado atual do jogo
const updateDisplay = () => {
    document.getElementById('word-display').innerText = displayedWord.join(' ');
    document.getElementById('chances').innerText = `Chances Restantes: ${remainingChances}`;
};

// Mostrar a próxima dica
document.getElementById('hint-button').addEventListener('click', () => {
    if (remainingHints > 0) {
        document.getElementById('hints').innerText = hints[hintIndex];
        remainingHints--;
        hintIndex++;
        document.getElementById('hint').innerText = `Dicas Restantes: ${remainingHints}`;
    } else {
        document.getElementById('hints').innerText = 'Sem mais dicas disponíveis.';
    }
});

// Processar a adivinhação
document.getElementById('guess-button').addEventListener('click', () => {
    const letter = document.getElementById('letter-input').value.toUpperCase();
    if (letter && /^[A-Z]$/.test(letter)) {
        if (word.includes(letter)) {
            word.split('').forEach((char, index) => {
                if (char === letter) {
                    displayedWord[index] = letter;
                }
            });
            updateDisplay();

            // Verificar se a palavra foi adivinhada corretamente
            if (checkWord()) return;
        } else {
            remainingChances--;
            document.getElementById('chances').innerText = `Chances Restantes: ${remainingChances}`;
        }

        if (remainingChances <= 0) {
            document.getElementById('status-text').innerText = `Game Over! A palavra era ${word}.`;
        }
    } else {
        alert('Digite uma letra válida!');
    }
    document.getElementById('letter-input').value = '';
});
