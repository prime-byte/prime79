const questions = {
    easy: [
      {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris"
      },
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
      },
      {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
        answer: "Carbon Dioxide"
      },
      {
        question: " Who is The Founder of Microsoft?",
        options: ["Bill gates", "Einstein", "Mark ", "Curie"],
        answer: "Bill gates"
      },
  {
        question: "What Is Largest ocean?",
        options: ["Indian Ocean", "Pacific Ocean", "Asian Ocean ", "Nile"],
        answer: "Pacific Ocean"
      },
  {
        question: " Who is The Founder of Microsoft?",
        options: ["Bill gates", "Einstein", "Mark ", "Curie"],
        answer: "Bill gates"
      },
  {
        question: "What Is Largest ocean?",
        options: ["Indian Ocean", "Pacific Ocean", "Asian Ocean ", "Nile"],
        answer: "Pacific Ocean"
      },
  {
        question: "What Is Largest ocean?",
        options: ["Indian Ocean", "Pacific Ocean", "Asian Ocean ", "Nile"],
        answer: "Pacific Ocean"
      },
  {
        question: "What Is Largest ocean?",
        options: ["Indian Ocean", "Pacific Ocean", "Asian Ocean ", "Nile"],
        answer: "Pacific Ocean"
      },
    ],
    medium: [
      {
        question: "Who discovered gravity?",
        options: ["Newton", "Einstein", "Galileo", "Curie"],
        answer: "Newton"
      },
      {
        question: "What planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Jupiter", "Venus"],
        answer: "Mars"
      },
      {
        question: "What is the boiling point of water at sea level?",
        options: ["100°C", "0°C", "212°F", "Both A and C"],
        answer: "Both A and C"
      }
    ],
    hard: [
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        answer: "Mitochondria"
      },
      {
        question: "What is the hardest natural substance?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        answer: "Diamond"
      }
    ],
    extreme: [
      {
        question: "Fastest land animal?",
        options: ["Cheetah", "Horse", "Elephant", "Falcon"],
        answer: "Cheetah"
      },
      {
        question: "Hottest planet?",
        options: ["Venus", "Earth", "Mars", "Jupiter"],
        answer: "Venus"
      },
      {
        question: "Who discovered gravity?",
        options: ["Newton", "Einstein", "Galileo", "Curie"],
        answer: "Newton"
      }
    ]
  };
  let questionCount = 0; // Tracks how many questions have been answered
  let currentQuestionIndex = 0;
  let selectedDifficulty = "";
  let correctAnswers = 0;
  let timerInterval, timeLeft;
  const difficultyTimeLimits = { easy: 35, medium: 30, hard: 20, extreme: 10 };
  const colorThresholds = {
    easy: { green: 15, yellow: 8 },
    medium: { green: 15, yellow: 8 },
    hard: { green: 10, yellow: 5 },
    extreme: { green: 5, yellow: 0 }
  };
  let shuffledQuestions = []; // Global array for storing shuffled questions
  
  function startQuiz(difficulty) {
    selectedDifficulty = difficulty;
    currentQuestionIndex = 0;
    correctAnswers = 0;
    questionCount = 0;
  
  
    // Shuffle questions and store them in shuffledQuestions
    shuffledQuestions = shuffleArray([...questions[selectedDifficulty]]);
  
    // Hide main content and show quiz content
    document.getElementById("main-content").style.display = "none";
    document.getElementById("quiz-content").style.display = "block";
    document.getElementById("popup").style.display = "flex";
    document.getElementById("back-button").disabled = true;
  }
  
  function startQuizContent() {
    document.getElementById("popup").style.display = "none";
    loadQuestion();
    startTimer();
  }
  
  function loadQuestion() {
    const questionData = shuffledQuestions[currentQuestionIndex]; // Get current question
    document.getElementById("question-text").innerText = questionData.question;
  
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous options
  
    questionData.options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.classList.add("option");
      optionButton.innerText = option;
      optionButton.onclick = () => checkAnswer(option);
      optionsContainer.appendChild(optionButton);
    });
  
    resetTimerDisplay(); // Reset the timer for the current question
  }
  function checkAnswer(selectedOption) {
    clearInterval(timerInterval);
    disableOptions();
  
    const questionData = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === questionData.answer;
    if (isCorrect) correctAnswers++;
  
    // Show feedback popup
    let feedbackPopup = document.querySelector(".feedback-popup");
    if (!feedbackPopup) {
      feedbackPopup = document.createElement("div");
      feedbackPopup.className = "feedback-popup";
      feedbackPopup.innerHTML = `<div class="feedback-content" id="feedback-content"></div>`;
      document.body.appendChild(feedbackPopup);
    }
  
    feedbackPopup.querySelector(".feedback-content").innerHTML = `
      <h2>${isCorrect ? "Correct!" : "Incorrect!"}</h2>
      <p>The correct answer was: ${questionData.answer}</p>
    `;
  
    feedbackPopup.classList.add("show");
  
    setTimeout(() => {
      feedbackPopup.classList.remove("show");
      currentQuestionIndex++;
      questionCount++; // Increment the question count
  
      if (questionCount % 5 === 0) {
        showAd(); // Show the ad popup after every 5 questions
      } else if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
        startTimer();
      } else {
        showResults();
      }
    }, 1500);
  }

  let adClickedFlag = false; // Tracks if user clicked on the ad
// Show the Ad Modal
function showAd() {
  adClickedFlag = false; // Reset click flag
  const adModal = document.getElementById("ad-modal");
  const adContainer = document.getElementById("ad-banner");
  const instructionText = document.getElementById("ad-instruction");

  // Clear ad content and reset state
  adContainer.innerHTML = ""; // Remove any previous ad content
  instructionText.innerText = "Click directly on the ad below to proceed.";
  document.getElementById("continue-ad-button").disabled = true;
  document.getElementById("close-ad-button").disabled = true;

  // Dynamically load an ad
  const randomAd = adScripts[Math.floor(Math.random() * adScripts.length)];
  const adScriptConfig = document.createElement("script");
  adScriptConfig.type = "text/javascript";
  adScriptConfig.innerHTML = `
    atOptions = {
      'key': '${randomAd.key}',
      'format': '${randomAd.format}',
      'height': ${randomAd.height},
      'width': ${randomAd.width},
      'params': {}
    };
  `;
  const adScriptSrc = document.createElement("script");
  adScriptSrc.type = "text/javascript";
  adScriptSrc.src = randomAd.src;

  // Append scripts to load ad
  adContainer.appendChild(adScriptConfig);
  adContainer.appendChild(adScriptSrc);

  // Show modal
  adModal.style.display = "flex";

  // Ad click event listener
  adContainer.addEventListener("click", adClicked);

  // Fallback: Enable buttons after timeout if ad fails to load
  setTimeout(() => {
    if (!adClickedFlag) {
      console.warn("Ad interaction not detected. Enabling buttons as fallback.");
      enableAdButtons();
    }
  }, 5000);
}

// Track Ad Click
function adClicked(event) {
  const target = event.target;

  // Ensure click is on the ad, not container or empty space
  if (target.classList.contains("ad-banner")) {
    adClickedFlag = true;
    enableAdButtons();
  }
}

// Enable Buttons
function enableAdButtons() {
  document.getElementById("continue-ad-button").disabled = false;
  document.getElementById("close-ad-button").disabled = false;
  document.getElementById("ad-instruction").innerText = "Thank you for interacting with the ad!";
}

// Proceed After Ad
function proceedAfterAd() {
  if (adClickedFlag) {
    closeAd(); // Close modal and continue quiz
  } else {
    alert("Please click on the ad to proceed.");
  }
}

// Close Ad Modal
function closeAd() {
  const adModal = document.getElementById("ad-modal");
  adModal.style.display = "none";
}

  
  // Remove existing feedback if any
  const existingFeedback = document.querySelector(".feedback");
  if (existingFeedback) document.body.removeChild(existingFeedback);
  function resetTimerDisplay() {
    clearInterval(timerInterval);
    document.getElementById("time-left").innerText = "";
    document.getElementById("timer-circle").style.backgroundColor = "#5cb85c"; // Reset to green
  }
  function startTimer() {
    timeLeft = difficultyTimeLimits[selectedDifficulty];
    updateTimerDisplay(timeLeft);
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        checkAnswer(null); // Automatically submit if time runs out
      }
    }, 1000);
  }
  function updateTimerDisplay(timeLeft) {
    const timerElement = document.getElementById("timer-circle");
    const timeDisplay = document.getElementById("time-left");
    // Ensure the timer element is found
    if (!timerElement) {
      console.error("Timer element not found!");
      return;
    }
    // Update the displayed time
    timeDisplay.innerText = `${timeLeft}s`;
    // Define thresholds for each difficulty level
    let greenThreshold, yellowThreshold;
    switch (selectedDifficulty) {
      case "easy":
        greenThreshold = 15;
        yellowThreshold = 8;
        break;
      case "medium":
        greenThreshold = 15;
        yellowThreshold = 8;
        break;
      case "hard":
        greenThreshold = 10;
        yellowThreshold = 5;
        break;
      case "extreme":
        greenThreshold = 5;
        yellowThreshold = 0;
        break;
      default:
        console.error("Unknown difficulty level:", selectedDifficulty);
        return;
    }
    // Update timer color directly via styles
    if (timeLeft > greenThreshold) {
      timerElement.style.backgroundColor = "#5cb85c"; // Green
      timerElement.style.animation = ""; // Stop blinking
    } else if (timeLeft > yellowThreshold) {
      timerElement.style.backgroundColor = "#f0ad4e"; // Yellow
      timerElement.style.animation = ""; // Stop blinking
    } else {
      timerElement.style.backgroundColor = "#d9534f"; // Red
      timerElement.style.animation = "blink 0.5s infinite alternate"; // Start blinking
    }
  }
  // CSS Animation for blinking effect
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes blink {
      0% { transform: scale(1); }
      100% { transform: scale(1.1); }
    }
  `;
  document.head.appendChild(style);
  function disableOptions() {
    document.querySelectorAll(".option").forEach((option) => {
      option.disabled = true;
    });
  }
  // Calculate coins based on difficulty level and correct answers
  function calculateCoins(difficulty, correctAnswers) {
    let coins = 0;
  
    switch (difficulty) {
      case "easy":
        coins = (correctAnswers / 20) * 1; // 1 coin per 20 correct answers
        break;
      case "medium":
        coins = (correctAnswers / 20) * 1.5; // 1.5 coins per 20 correct answers
        break;
      case "hard":
        coins = (correctAnswers / 20) * 2; // 2 coins per 20 correct answers
        break;
      case "extreme":
        coins = (correctAnswers / 10) * 0.7; // 0.7 coins per 10 correct answers
        break;
      default:
        console.error("Unknown difficulty level:", difficulty);
    }
  
    return coins.toFixed(1); // Return coins rounded to 1 decimal place
  }
  function showResults() {
    document.getElementById("quiz-content").style.display = "none";
    document.getElementById("results-screen").style.display = "block";
  
    const totalQuestions = shuffledQuestions.length; // Use shuffledQuestions to get the total
    const wrongAnswers = totalQuestions - correctAnswers;
  
    document.getElementById("total-questions").innerText = totalQuestions;
    document.getElementById("correct-answers").innerText = correctAnswers;
    document.getElementById("wrong-answers").innerText = wrongAnswers;
  
    // Calculate and display earned coins (already implemented)
    const coinsEarned = calculateCoins(selectedDifficulty, correctAnswers);
    const coinsElement = document.getElementById("earned-coins");
    if (coinsElement) {
      coinsElement.innerText = coinsEarned;
    } else {
      const coinsDisplay = document.createElement("p");
      coinsDisplay.id = "earned-coins";
      coinsDisplay.innerHTML = `<strong>Coins Earned:</strong> ${coinsEarned}`;
      document.getElementById("results-screen").appendChild(coinsDisplay);
    }
  }
  
  function goBack() {
    document.getElementById("quiz-content").style.display = "none";
    document.getElementById("results-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    clearInterval(timerInterval);
  }
  function resetQuiz() {
    // Reset quiz state variables
    currentQuestionIndex = 0;
    correctAnswers = 0;
    timeLeft = difficultyTimeLimits[selectedDifficulty]; // Reset the timer
    // Hide all screens and reset content
    document.getElementById("results-screen").style.display = "none";
    document.getElementById("quiz-content").style.display = "none";
    document.getElementById("main-content").style.display = "none";
    document.getElementById("popup").style.display = "none";
    // Clear options and reset timer display
    document.getElementById("options").innerHTML = "";
    resetTimerDisplay();
  }
  function retryQuiz() {
    resetQuiz();
    document.getElementById("main-content").style.display = "none";
    document.getElementById("quiz-content").style.display = "block";
    loadQuestion();
    startTimer();
  }
  
  // Fisher-Yates Shuffle Function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
  
  function redirectToAd(url) {
    window.open(url, "_blank"); // Open the given URL in a new tab
    closeAd(); // Close the ad modal and continue the quiz
  }
  
  
  function exitQuiz() {
    clearInterval(timerInterval); // Stop the timer
  
    // Calculate current stats
    const totalQuestionsAttempted = currentQuestionIndex; // Questions answered so far
    const totalQuestions = shuffledQuestions.length; // Total questions in the quiz
    const wrongAnswers = totalQuestionsAttempted - correctAnswers; // Incorrect answers
    const coinsEarned = calculateCoins(selectedDifficulty, correctAnswers); // Coins earned
  
    // Display results
    document.getElementById("quiz-content").style.display = "none";
    document.getElementById("results-screen").style.display = "block";
  
    document.getElementById("total-questions").innerText = totalQuestions; // Total questions
    document.getElementById(
      "total-questions-attempted"
    ).innerText = totalQuestionsAttempted; // Attempted
    document.getElementById("correct-answers").innerText = correctAnswers; // Correct answers
    document.getElementById("wrong-answers").innerText = wrongAnswers; // Incorrect answers
  
    // Display earned coins
    const coinsElement = document.getElementById("earned-coins");
    if (coinsElement) {
      coinsElement.innerText = coinsEarned;
    } else {
      const coinsDisplay = document.createElement("p");
      coinsDisplay.id = "earned-coins";
      coinsDisplay.innerHTML = `<strong>Coins Earned:</strong> ${coinsEarned}`;
      document.getElementById("results-screen").appendChild(coinsDisplay);
    }
  }
  
  function goToHomePage() {
    // Reset to the main content view
    document.getElementById("main-content").style.display = "block";
    document.getElementById("quiz-content").style.display = "none";
    document.getElementById("results-screen").style.display = "none";
    document.getElementById("ad-modal").style.display = "none";
  }
  
  const adScripts = [
    {
      key: '84fe0b9252e9dca5bab452e4dc8b9759',
      src: '//www.highperformanceformat.com/84fe0b9252e9dca5bab452e4dc8b9759/invoke.js',
      format: 'iframe',
      width: 300,
      height: 250
    },
    {
      key:  '3e21842ddae3b5905054d348f7474cac',
      src: "//www.highperformanceformat.com/3e21842ddae3b5905054d348f7474cac/invoke.js",
      format: 'iframe',
      width: 728,
      height: 90
    },
  ];
  