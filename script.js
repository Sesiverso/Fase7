const animals = [
    {
        word: "ARARA",
        hints: [
            "É uma ave de penas vibrantes encontrada no Pantanal.",
            "Tem cores brilhantes e um bico curvo.",
            "É conhecida por seu grito característico."
        ]
    },
    {
        word: "ONCA",
        hints: [
            "É um grande felino encontrado no Pantanal.",
            "Tem pelagem manchada com rosetas.",
            "É o maior predador terrestre da América do Sul."
        ]
    },
    {
        word: "CAPIVARA",
        hints: [
            "É o maior roedor do mundo.",
            "É um animal semi-aquático encontrado no Pantanal.",
            "Tem um corpo robusto e vive em grupos."
        ]
    },
    {
        word: "JAGUATIRICA",
        hints: [
            "É um felino de médio porte encontrado no Pantanal.",
            "Tem pelagem manchada e é um excelente caçador.",
            "É também conhecida como o 'onçp-pintada pequeno'."
        ]
    }
];

const randomIndex = Math.floor(Math.random() * animals.length);
const selectedAnimal = animals[randomIndex];

let displayedWord = Array(selectedAnimal.word.length).fill('_');
let remainingChances = 6;
let remainingHints = selectedAnimal.hints.length;
let hintIndex = 0;

// Função para verificar a palavra completa
const checkWord = () => {
    const guessedWord = displayedWord.join('');
    const possibleWords = [selectedAnimal.word, selectedAnimal.word.toLowerCase(), selectedAnimal.word.toUpperCase()];
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
        document.getElementById('hints').innerText = selectedAnimal.hints[hintIndex];
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
        if (selectedAnimal.word.includes(letter)) {
            selectedAnimal.word.split('').forEach((char, index) => {
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
            document.getElementById('status-text').innerText = `Game Over! A palavra era ${selectedAnimal.word}.`;
        }
    } else {
        alert('Digite uma letra válida!');
    }
    document.getElementById('letter-input').value = '';
});

// Inicializar o jogo
updateDisplay();
