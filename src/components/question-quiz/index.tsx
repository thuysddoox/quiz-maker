import { useState } from 'react';
import styled from 'styled-components';
import { Answer } from '@components/answer';
import { Flex } from '@components/flex';

export interface IQuestionQuizProps {
  question: string;
  answers: string[];
  selected_answer?: string;
  correct_answer?: string;
  readOnly?: boolean;
  onSelectedAnswer?: (selectedAnswer: string, isSelected: boolean) => void;
}
export const QuestionQuiz = ({
  question,
  answers,
  selected_answer,
  correct_answer,
  readOnly = false,
  onSelectedAnswer,
}: IQuestionQuizProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    selected_answer
  );

  const handleSelectedAnswer = (isSelected: boolean, answer: string) => {
    if (!readOnly) {
      if (isSelected) setSelectedAnswer(answer);
      onSelectedAnswer?.(answer, isSelected);
    }
  };

  const renderStatusAnswer = (answer: string) => {
    if (selected_answer) {
      if (selected_answer === answer && selected_answer !== correct_answer)
        return 'wrong';
      else if (answer === correct_answer) return 'correct';
    }
    return 'default';
  };

  return (
    <StyledQuestionQuiz>
      <p dangerouslySetInnerHTML={{ __html: question }}></p>
      <Flex gap="12px" flexWrap="wrap">
        {answers.map((answer) => (
          <Answer
            key={answer}
            value={answer}
            status={renderStatusAnswer(answer)}
            isSelected={selectedAnswer === answer}
            onSelected={handleSelectedAnswer}
            readOnly={readOnly}
          />
        ))}
      </Flex>
    </StyledQuestionQuiz>
  );
};

const StyledQuestionQuiz = styled.div`
  p{
    margin-bottom: 16px;
    font-size: 18px;
  }
`;
