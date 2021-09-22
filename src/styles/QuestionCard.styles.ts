import styled from "styled-components";

type props = {
  onClick: any;
  value: string;
  disabled: string[];
  isCorrect: boolean;
};

const color = (props: props) => (props.isCorrect ? "Green" : "White");

export const AnswerButton = styled.button`
  color: palevioletred;
  width: 200px;
  align-self: center;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
  background-color: ${color};
`;
