import * as React from "react";
import { Wrapper, ButtonWrapper } from "../styles/QuestionCard.styles";

export type props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number;
  isCorrect: boolean;
};

const QuestionCard: React.FC<props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
  isCorrect
}) => {
  return (
    <Wrapper>
      <p className="number">
        {" "}
        Question: {questionNumber}/{totalQuestions}{" "}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <div key={answer}>
            <ButtonWrapper
              key={answer}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
            >
              <button
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </ButtonWrapper>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
