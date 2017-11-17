let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value === '' && attempt.value === '')
      setHiddenFields();

    if(!validateInput(input.value))
      return false;

    let tries = new Number(attempt.value);
    tries++;
    attempt.value = tries;

    if(getResults(input.value))
    {
      setMessage('You Win! :)');
      showAnswer(true);
      showReplay();
    }

    else if(tries >= 10)
    {
      setMessage('You Lose! :(');
      showAnswer(false);
      showReplay();
    }

    else
      setMessage('Incorrect, try again.');
}

//implement new functions here

function setHiddenFields()
{
  var random = Math.floor((Math.random() * 1000) - 1);
  var randomString = random.toString();

  while (randomString.length < 4)
    randomString = '0' + randomString;

  answer.value = randomString;
  attempt.value = 0;
}

function setMessage(value)
{
    let message = document.getElementById('message');

    message.innerHTML = value;
}

function validateInput(input)
{
  if(input.length != 4)
  {
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }

  return true;
}

function getResults(input)
{
  //begin row
  let row = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">'
  let correct = 0;
  //loop through charset
  for( let i = 0; i < input.length; i++)
  {
    let testChar = input.charAt(i);
    let answerChar = answer.value.charAt(i);

    if(testChar === answerChar)
    {
      row += '<span class="glyphicon glyphicon-ok"></span>';
      correct++;
    }

    else if (answer.value.indexOf(testChar) > -1)
      row += '<span class="glyphicon glyphicon-transfer"></span>';

    else
      row += '<span class="glyphicon glyphicon-remove"></span>';
  }
  //close div
  row += '</div>';

  //add row
  let results = document.getElementById('results');

  results.innerHTML += row;

  if(correct === 4)
    return true;

  return false;
}

function showAnswer(winner)
{
  let code = document.getElementById('code');
  code.innerHTML = answer.value;
  code.className += winner ? ' success' : ' failure';
}

function showReplay()
{
  let guessingDiv = document.getElementById('guessing-div');
  let replayDiv = document.getElementById('replay-div');

  guessingDiv.style.display = 'none';
  replayDiv.style.display = 'block';
}
