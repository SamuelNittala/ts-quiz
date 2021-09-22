import "./styles.css";
import QuestionCard from "./components/QuestionCard";
import { fetchQuestions, Difficulty, QuestionState, Question } from "./API";
import * as React from "react";

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionState[]>([]);
  const [number, setNumber] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([]);
  const [score, setScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const quizQuestions: QuestionState[] = await fetchQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(quizQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {};
  const nextQuestion = () => {};
  return (
    <div className="App">
      <h2>Quiz</h2>
      {gameOver || number === TOTAL_QUESTIONS ? (
        <button onClick={startTrivia}> START </button>
      ) : null}
      {!gameOver ? <p className="score"> Score </p> : null}
      {loading && <p> Loading.. </p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      <button onClick={nextQuestion} className="next">
        {" "}
        Next{" "}
      </button>
    </div>
  );
};

export default App;
