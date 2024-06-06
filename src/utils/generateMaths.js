/**
 * This function takes a string of arrays which contain the expected operations. This is in the getOperators function.
 * 
 * @param {array} operators This function takes an array of allowed operations.
 * @returns This function returns the math operators.
 */

function randomGenerator(operators) {
    return operators[Math.floor(Math.random() * operators.length)];
}

function percentCalc(percent, number) {
    const currentVal = (percent / 100) * number;
    return ((currentVal+1) / number) * 100;
}
/**
 * This function generates a set of operators and a percentage value based on certain input parameters. 
 * @param {array} operation This parameter takes an array of allowed operations. 
 * @param {number} percent This parameter expects a number between 0-100 which represents the percentage of previous operators questions.
 * @param {number} length The length parameter is how many total questions will be created.
 * @returns This function returns an object with the ops field being the operators and the per field is the calculated.
 */
function getOperators(operation, percent, length) {
    let ops = randomGenerator(['+', '-', '*', '/']);
    let per = 100;
    if(operation === 1) {
      ops = '+';
    } else if(operation === 2) {
      if(percent < 31) {
        ops = randomGenerator(['+']);
        per = percentCalc(percent, length)
      } else {
        ops = '-';
      }
    } else if(operation === 3) {
      if(percent < 31) {
        ops = randomGenerator(['+', '-']);
        per = percentCalc(percent, length)
      } else {
        ops = '*';
      }
    } else if(operation === 4) {
      if(percent < 41) {
        ops = randomGenerator(['+', '-', '*']);
        per = percentCalc(percent, length)
      } else {
        ops = '/';
      }
    }
  
    return {ops, per};
}

/**
 * This function will return a range of mathematical operation based on the difficulty and the types of operators which are expected for a given level.
 * @param {*} type This parameter represents the difficulty of the game. This expects one of the following as an input: 'EASY', 'MEDIUM' and 'HARD'.
 * @param {*} operator This parameter takes an array of allowed operations. 
 * @returns This function returns an array of length 2 with the 0 index representing the minimum number of questions and the 1 index representing the maximum number of questions.
 */
function getNumberRange(type, operator) {
    if(type === 'easy') {
      if(operator === '+' || operator === '-') {
        return [0, 30];
      } else {
        return [1, 10];
      }
    }
    
    if(type === 'medium') {
      if(operator === '+' || operator === '-') {
        return [0, 100];
      } else {
        return [1, 30];
      }
    }
    
    if(type === 'hard') {
      if(operator === '+' || operator === '-') {
        return [0, 250];
      } else {
        return [1, 50];
      }
    }
}

/**
 * This function generates an array of maths questions.
 * @param {*} difficulty The difficulty parameter expects the following values 'EASY', 'MEDIUM' or 'HARD'.
 * @param {*} operation This parameter takes an array of allowed operations. 
 * @param {*} length The length parameter represents the number of questions which will be created.
 * @returns An array of objects is returned where the fields of the object are as follows:
 * - val1 represents represents the minumum range of values.
 * - val2 represents the maximum range of values.
 * - exp is the question which will be displayed to the user.
 * - tans is the correct answer.
 * - fans is the wrong answer.
 */
  
export function generateMathObjectsArray(difficulty, operation, length) {
    const mathObjects = [];
    let percent = 0;
    for (let i = 0; i < length; i++) {
      const operatorsCheck = getOperators(operation, percent, length);
      const operator = operatorsCheck.ops;
      percent = operatorsCheck.per;
      const range = getNumberRange(difficulty, operator);
      const minVal = range[0];
      const maxVal = range[1];
      let val1, val2;
  
      do {
          val1 = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
          val2 = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      } while (operator === '/' ? val1 % val2 !== 0 || val1 <= val2 : false);
  
      if (val1 < val2) {
          // Swap values if val1 is smaller than val2
          [val1, val2] = [val2, val1];
      }
  
      let exp = `${val1}${operator}${val2}`;
      let tans, fans;
  
      if (operation > 5 && difficulty === 'hard') {
        const result = eval(exp);
        if (Number.isInteger(result)) {
            tans = result;
            fans = (result % 2 === 0) ? result + 1 : result - 1; // Get an odd or even number for fans
        } else {
            tans = result.toFixed(2); // If not an integer, store result as a decimal for tans
            fans = (Math.floor(result) % 2 === 0) ? Math.floor(result) + 1 : Math.floor(result); // Get an odd or even whole number for fans
        }
      } else {
        tans = Math.round(eval(exp)); // Round the result to get integer value for tans
  
        const fanRange = Math.max(10, Math.abs(tans * 0.1)); // Define the range for fans
        do {
            fans = Math.floor(Math.random() * (2 * fanRange)) - fanRange + tans; 
        } while (fans === tans);
      }

      fans = fans < 0 ? 0 : fans === tans ? parseInt(fans) + 1 : parseInt(fans);
  
      mathObjects.push({ val1, val2, exp, operator, tans, fans });
      
    }
    return mathObjects;
}
  
  
  