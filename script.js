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

document.getElementById('word-display').innerText = displayedWord.join(' ');
document.getElementById('chances').innerText = `Chances Restantes: ${remainingChances}`;
document.getElementById('hint').innerText = `Dicas Restantes: ${remainingHints}`;

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

document.getElementById('guess-button').addEventListener('click', () => {
    const letter = document.getElementById('letter-input').value.toUpperCase();
    if (letter && /^[A-Z]$/.test(letter)) {
        if (word.includes(letter)) {
            word.split('').forEach((char, index) => {
                if (char === letter) {
                    displayedWord[index] = letter;
                }
            });
            document.getElementById('word-display').innerText = displayedWord.join(' ');
        } else {
            remainingChances--;
        }

        document.getElementById('chances').innerText = `Chances Restantes: ${remainingChances}`;
        document.getElementById('letter-input').value = '';

        if (displayedWord.join('') === word) {
            document.getElementById('status-text').innerText = 'Parabéns! Você acertou a palavra!';
        } else if (remainingChances <= 0) {
            document.getElementById('status-text').innerText = `Game Over! A palavra era ${word}.`;
        }
    } else {
        alert('Digite uma letra válida!');
    }
});
