const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {

  const userInputArray = userInput.split(' ');
  const command = userInputArray[0];

  switch (command) {
    case 'echo':
      commandLibrary.echo(userInputArray.slice(1).join(' '));
      break;
    case 'cat':
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case 'head':
      commandLibrary.head(userInputArray.slice(1));
      break;
    case 'tail':
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler(userInputArray[0]);
  }
}

const commandLibrary = {
  'echo': function(userInput) {
    done(userInput);
  },
  'cat': function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  'head': function(userInput) {
    let n = userInput[0];
    let fileName = userInput[1];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let dataArr = data.toString().split('\n');
      let nData = [];
      for(let i = 0; i < n; i++) {
        nData.push(dataArr[i]);
      }
      data = nData.join('\n');
      done(data);
    });
  },
  'tail': function(userInput) {
    let n = userInput[0];
    let fileName = userInput[1];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      let dataArr = data.toString().split('\n');
      n = dataArr.length - n;
      let nData = [];
      for(let i = 0; i < n; i++) {
        nData.push(dataArr[i]);
      }
      data = nData.join('\n');
      done(data);
    });
  },
  'errorHandler': function(userInput) {
    done('Error! ' + userInput + ' is not a command');
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
