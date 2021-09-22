import QuestionCard from "./components/QuestionCard";
import { fetchQuestions, Difficulty, QuestionState } from "./API";
import * as React from "react";
import { GlobalStyle, Wrapper } from "./styles/App.styles";

const TOTAL_QUESTIONS: number = 10;

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
  const [isCorrect, setIsCorrect] = React.useState(false);
  console.log(isCorrect);
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
  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = event.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
        setIsCorrect(true);
      } else setIsCorrect(false);
      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };
  const nextQuestion = () => {
    setNumber((prev) => prev + 1);
    if (number === TOTAL_QUESTIONS - 1) {
      setGameOver(true);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h2>Quiz</h2>
        {gameOver || number === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            {" "}
            START{" "}
          </button>
        ) : null}
        {!gameOver ? <p className="score"> Score : {score} </p> : null}
        {loading && <p> Loading.. </p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
            isCorrect={isCorrect}
          />
        )}
        <button onClick={nextQuestion} className="next">
          {" "}
          Next{" "}
        </button>
        {gameOver && number === TOTAL_QUESTIONS && (
          <h1> your score: {score} </h1>
        )}
      </Wrapper>
    </>
  );
};

export default App;
