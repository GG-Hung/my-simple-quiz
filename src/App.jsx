import { useState } from 'react';
import { quizData } from './mockData/quizData';
let allAnswers = [];
let score = 0;
function App() {

  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQuestion = quizData[questionIndex];

  const [answerVisible, setAnswerVisible] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(true);
  const [replayVisible, setReplayVisible] = useState(false);

  const resetQuiz = () => {
    allAnswers = [];
    score = 0;
    setQuestionIndex(0);
    setAnswerVisible(false);
    setQuestionVisible(true);
    setReplayVisible(false);
  }


  const handleClick = (event) => {
    console.log(event.index);
    allAnswers.push(event.index);
    if (questionIndex + 1 < quizData.length) {
      setQuestionIndex(questionIndex + 1);
    }

    if (questionIndex + 1 >= quizData.length) {
      setAnswerVisible(true)
      setQuestionVisible(false)
      setReplayVisible(true)
      console.log("Quiz ended");
      console.log("All answers: ", allAnswers);
      for (let i = 0; i < quizData.length; i++) {
        if (allAnswers[i] === quizData[i].correctAnswerIndex) {
          score += 1;
        }
      }
    }
    else {
      setAnswerVisible(false)
      setReplayVisible(false)
    }
}


  return (
    <>
      <div class="p-2 flex items-center justify-between bg-blue-500 text-white">
        <p class="text-2xl font-bold bg-blue-500 px-20">My Simple Quiz</p>
        <ul class="flex bg-blue-500">
          <button class="px-8 py-4">Contact</button>
          <button class="px-8 py-4">About</button>
          <button class="px-8 py-4">Articles</button>
          <button class="px-8 py-4">Home</button>
        </ul>
      </div>
      { replayVisible ? (
        <div>
          <button class="m-10 p-5 text-white font-bold" onClick={resetQuiz}>
            Replay Quiz
          </button>
        </div>
      ) : null }
      { questionVisible ? (
        <div id="quiz-section">
          <h2 class="text-3xl font-bold mx-10 my-10">{currentQuestion.questionText}</h2>
          <p class="mx-10">{currentQuestion.options.map((options, index) => <p class="transition duration-200 hover:text-blue-600 cursor-pointer" onClick={() => handleClick({index})}>- {options}</p>)}</p>
        </div>
      ) : null }
      { answerVisible ? (
        <div id="scoreboard" class="m-10 p-5 border-2 border-blue-500">
          <h2 class="text-2xl font-bold mb-5">Scoreboard</h2>
          <p class="mb-5">Your score is: {score} / {quizData.length}</p>
          <div>
            {quizData.map((item, index) => (
              <div class="mb-5">
                <h3 class="font-bold">{index + 1}. {item.questionText}</h3>
                <p class={item.options[allAnswers[index]] === item.options[item.correctAnswerIndex] ? 'text-green-400' : 'text-red-500'}>Your answer: {item.options[allAnswers[index]]}</p>
                <p>Correct answer: {item.options[item.correctAnswerIndex]}</p>
              </div>
            ))}
          </div>
        </div> ) : null }
    </>
  )
}

export default App
