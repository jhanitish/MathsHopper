export const initialGameState = {
  userInfo: null, // Placeholder for user information
  currentScene: null, // Track the current scene
  level: 1,
  difficulty: "easy",
  questionIndex:0,// number of asked questions
  correctAnswers:0,
  wrongAnswers:0,
  isCompleted: false,
};

export const gameState = {
    userInfo: null, // Placeholder for user information
    currentScene: null, // Track the current scene
    level: 1,
    difficulty: "easy",
    questionIndex:0,// number of asked questions
    correctAnswers:0,
    wrongAnswers:0,
    isCompleted: false,
};

function updateUserInfo(info) {
    gameState.userInfo = info;
  }

  function updateUserGame(difficulty,level){
    gameState.level = level;
    gameState.difficulty = difficulty;
  }