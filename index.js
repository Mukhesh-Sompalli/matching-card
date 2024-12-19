// const animalImages = [
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlw-JDrWizda6dbWg2PiUAlWEZFm6zHEAQf8cOZczNk-HMawCl19F63pRWXeFW9TR0OLQ&usqp=CAU",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdMNj-wYM9-BBTsFvIY6lM688iMD5QmtTlCQ&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJw6jfs94jLzMphbeBBs8_i-gZRjo6-vczlg&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9gcJGUTioEvcFqB2OQtx8X7eJiYqTlhvpAg&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQg8iCPZJY5a3IemumJLW9BOqgj0QxoUWxBw&s",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR59mg8JjqJQyMiot438yqENZWkG8DVljXQjA&s",
//   "https://i0.wp.com/www.asphaltandrubber.com/wp-content/uploads/2016/07/2017-Yamaha-FZ-10-USA-35-scaled.jpg?fit=2560%2C1707&ssl=1",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxh8pU0M24z03AR77QraxfW0gUb44vuC6fBg&s",
// ];

// let cards = [],
//   firstCard = null,
//   secondCard = null,
//   attempts = 0,
//   matches = 0,
//   playerName = "",
//   selectedLevel = "easy",
//   cardCount = 8,
//   score = 0,
//   timer = 0,
//   timerInterval,
//   timeLimit = 60; // Default time limit in seconds

// // Update the card count based on the selected level
// const updateCardCount = (level) => {
//   cardCount = { easy: 8, medium: 12, difficult: 16 }[level];
// };

// // Start the timer
// const startTimer = () => {
//   timer = timeLimit;
//   document.getElementById("timer").textContent = `Time: ${timer} seconds`;
//   timerInterval = setInterval(() => {
//     timer--;
//     document.getElementById("timer").textContent = `Time: ${timer} seconds`;
//     if (timer <= 0) {
//       stopTimer();
//       endGame(false); // End the game if time runs out
//     }
//   }, 1000);
// };

// // Stop the timer
// const stopTimer = () => clearInterval(timerInterval);

// // Reset the game stats
// const resetGameStats = () => {
//   [attempts, matches, score] = [0, 0, 0];
//   document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
//   document.getElementById("score").textContent = `Score: ${score}`;
//   document.getElementById("message").textContent = "";
//   stopTimer();
// };

// // Set up the game board and cards
// const setupGame = () => {
//   resetGameStats();
//   const selectedImages = animalImages.slice(0, cardCount / 2);
//   cards = [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5);

//   const gameBoard = document.getElementById("game-board");
//   gameBoard.innerHTML = "";

//   // Set grid layout based on the difficulty level
//   if (selectedLevel === "easy") {
//     gameBoard.style.gridTemplateColumns = "repeat(2, 1fr)"; // 2 columns
//     gameBoard.style.gridTemplateRows = "repeat(2, 1fr)"; // 2 rows
//   } else if (selectedLevel === "medium") {
//     gameBoard.style.gridTemplateColumns = "repeat(3, 1fr)"; // 3 columns
//     gameBoard.style.gridTemplateRows = "repeat(4, 1fr)"; // 4 rows
//   } else if (selectedLevel === "difficult") {
//     gameBoard.style.gridTemplateColumns = "repeat(4, 1fr)"; // 4 columns
//     gameBoard.style.gridTemplateRows = "repeat(4, 1fr)"; // 4 rows
//   }

//   // Create the cards
//   cards.forEach((image, index) => {
//     const card = document.createElement("div");
//     card.className = "card";
//     card.dataset.image = image;
//     card.dataset.index = index;
//     card.style.backgroundSize = "contain";
//     card.style.backgroundPosition = "center";
//     card.style.backgroundRepeat = "no-repeat";
//     card.addEventListener("click", flipCard);
//     gameBoard.appendChild(card);
//   });

//   startTimer();
// };

// // Flip a card
// const flipCard = (e) => {
//   const clickedCard = e.currentTarget;

//   if (clickedCard === firstCard || clickedCard.classList.contains("matched")) return;

//   clickedCard.style.backgroundImage = `url(${clickedCard.dataset.image})`;
//   clickedCard.classList.add("flipped");

//   if (!firstCard) {
//     firstCard = clickedCard;
//   } else {
//     secondCard = clickedCard;
//     document.getElementById("attempts").textContent = `Attempts: ${++attempts}`;
//     setTimeout(checkForMatch, 800);
//   }
// };

// // Check for a match
// const checkForMatch = () => {
//   if (firstCard.dataset.image === secondCard.dataset.image) {
//     firstCard.classList.add("matched");
//     secondCard.classList.add("matched");
//     matches += 2;
//     document.getElementById("score").textContent = `Score: ${(score += 10)}`;

//     if (matches === cardCount) {
//       stopTimer();
//       endGame(true); // Game won
//     }
//   } else {
//     [firstCard, secondCard].forEach((card) => {
//       card.style.backgroundImage = "none";
//     });
//   }
//   [firstCard, secondCard] = [null, null];
// };

// // End the game
// const endGame = (won) => {
//   if (won) {
//     document.getElementById("message").textContent = `Congratulations ${playerName}, you won!`;
//   } else {
//     alert(`Time's up, ${playerName}! Your time is over. Restart the game to try again.`);
//     setupGame(); // Restart the game
//   }
//   stopTimer();
// };

// // Start the game
// document.getElementById("start-button").addEventListener("click", () => {
//   playerName = document.getElementById("player-name").value;
//   if (!playerName) return alert("Please enter your name to start the game.");

//   selectedLevel = document.getElementById("difficulty-level").value;
//   updateCardCount(selectedLevel);
//   timeLimit = { easy: 60, medium: 45, difficult: 30 }[selectedLevel]; // Set time limit based on level
//   setupGame();
//   document.getElementById("name-form").style.display = "none";
//   document.getElementById("game-container").style.display = "block";
// });

// // Reset the game
// document.getElementById("reset-button").addEventListener("click", setupGame);


const animalImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlw-JDrWizda6dbWg2PiUAlWEZFm6zHEAQf8cOZczNk-HMawCl19F63pRWXeFW9TR0OLQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdMNj-wYM9-BBTsFvIY6lM688iMD5QmtTlCQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJw6jfs94jLzMphbeBBs8_i-gZRjo6-vczlg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9gcJGUTioEvcFqB2OQtx8X7eJiYqTlhvpAg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQg8iCPZJY5a3IemumJLW9BOqgj0QxoUWxBw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR59mg8JjqJQyMiot438yqENZWkG8DVljXQjA&s",
  "https://i0.wp.com/www.asphaltandrubber.com/wp-content/uploads/2016/07/2017-Yamaha-FZ-10-USA-35-scaled.jpg?fit=2560%2C1707&ssl=1",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxh8pU0M24z03AR77QraxfW0gUb44vuC6fBg&s",
];

let cards = [],
  firstCard = null,
  secondCard = null,
  attempts = 0,
  matches = 0,
  playerName = "",
  selectedLevel = "easy",
  cardCount = 8,
  score = 0,
  timer = 0,
  timerInterval,
  timeLimit = 60; // Default time limit in seconds

const updateCardCount = (level) => {
  cardCount = { easy: 6, medium: 12, difficult: 16 }[level];
};

const startTimer = () => {
  timer = timeLimit;
  document.getElementById("timer").textContent = `Time: ${timer} seconds`;
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = `Time: ${timer} seconds`;
    if (timer <= 0) {
      stopTimer();
      endGame(false); // End the game if time runs out
    }
  }, 1000);
};

const stopTimer = () => clearInterval(timerInterval);

const resetGameStats = () => {
  [attempts, matches, score] = [0, 0, 0];
  document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("message").textContent = "";
  stopTimer();
};

const setupGame = () => {
  resetGameStats();
  const selectedImages = animalImages.slice(0, cardCount / 2);
  cards = [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5);

  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  // Set grid layout based on difficulty level
  if (selectedLevel === "easy") {
    gameBoard.style.gridTemplateColumns = "repeat(2, 1fr)";
    gameBoard.style.gridTemplateRows = "repeat(3, 1fr)";
  } else if (selectedLevel === "medium") {
    gameBoard.style.gridTemplateColumns = "repeat(3, 1fr)";
    gameBoard.style.gridTemplateRows = "repeat(4, 1fr)";
  } else if (selectedLevel === "difficult") {
    gameBoard.style.gridTemplateColumns = "repeat(4, 1fr)";
    gameBoard.style.gridTemplateRows = "repeat(4, 1fr)";
  }

  cards.forEach((image, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.image = image;
    card.dataset.index = index;
    card.style.backgroundSize = "contain";
    card.style.backgroundPosition = "center";
    card.style.backgroundRepeat = "no-repeat";
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });

  startTimer();
};

const flipCard = (e) => {
  const clickedCard = e.currentTarget;

  if (clickedCard === firstCard || clickedCard.classList.contains("matched")) return;

  clickedCard.style.backgroundImage = `url(${clickedCard.dataset.image})`;
  clickedCard.classList.add("flipped");

  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    document.getElementById("attempts").textContent = `Attempts: ${++attempts}`;
    setTimeout(checkForMatch, 800);
  }
};

const checkForMatch = () => {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matches += 2;
    document.getElementById("score").textContent = `Score: ${(score += 10)}`;

    if (matches === cardCount) {
      stopTimer();
      endGame(true); // Game won
    }
  } else {
    [firstCard, secondCard].forEach((card) => {
      card.style.backgroundImage = "none";
    });
  }
  [firstCard, secondCard] = [null, null];
};

const endGame = (won) => {
  if (won) {
    alert(`Congratulations ${playerName}, you completed the ${selectedLevel} level!`);
    const nextLevel =
      selectedLevel === "easy"
        ? "medium"
        : selectedLevel === "medium"
        ? "difficult"
        : null;

    if (nextLevel) {
      selectedLevel = nextLevel;
      alert(`Proceeding to the next level: ${nextLevel}`);
      updateCardCount(nextLevel);
      timeLimit = { easy: 60, medium: 45, difficult: 30 }[nextLevel];
      setupGame();
    } else {
      alert("Congratulations! You have completed all levels!");
      document.getElementById("name-form").style.display = "block";
      document.getElementById("game-container").style.display = "none";
    }
  } else {
    alert(`Time's up, ${playerName}! Restart the game to try again.`);
    setupGame(); // Restart the game
  }
};

document.getElementById("start-button").addEventListener("click", () => {
  playerName = document.getElementById("player-name").value;
  if (!playerName) return alert("Please enter your name to start the game.");

  selectedLevel = document.getElementById("difficulty-level").value;
  updateCardCount(selectedLevel);
  timeLimit = { easy: 60, medium: 45, difficult: 30 }[selectedLevel];
  setupGame();
  document.getElementById("name-form").style.display = "none";
  document.getElementById("game-container").style.display = "block";
});

const homeButton = document.createElement("button");
homeButton.textContent = "Home";
homeButton.style.marginTop = "20px";
homeButton.style.padding = "10px";
homeButton.style.backgroundColor = "#007bff";
homeButton.style.color = "white";
homeButton.style.border = "none";
homeButton.style.borderRadius = "5px";
homeButton.style.cursor = "pointer";
homeButton.addEventListener("click", () => {
  document.getElementById("name-form").style.display = "block";
  document.getElementById("game-container").style.display = "none";
});
document.getElementById("game-container").appendChild(homeButton);
