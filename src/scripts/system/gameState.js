/**
 * The initialGameState class holds the state of the initial game. Once the game begins gameState handles any changes that occur in state.
 */

export const initialGameState = {
  userInfo: null, // Placeholder for user information
  currentScene: null, // Track the current scene
  level: 1,
  difficulty: "easy",
  questionIndex:0,// number of asked questions
  correctAnswers:0,
  wrongAnswers:0,
  isCompleted: false,
  passedIndex:[],
  currentHearts: 10,
  lastHeartReductionTime:0,
  isPaused: false,
  mathsObjectArray: [],
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
    passedIndex:[],
    currentHearts: 10,
    lastHeartReductionTime:0,
    isPaused: false,
    mathsObjectArray: [],
};

function updateUserInfo(info) {
    gameState.userInfo = info;
  }

  function updateUserGame(difficulty,level){
    gameState.level = level;
    gameState.difficulty = difficulty;
  }