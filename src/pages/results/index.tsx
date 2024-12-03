import { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@components/button';
import { Flex } from '@components/flex';
import { QuestionQuiz } from '@components/question-quiz';
import { FinalScore } from '@components/final-score';
import { ResultContext } from '@contexts/ResultContext';

const ResultsPage = () => {
  const navigate = useNavigate();
  const { results } = useContext(ResultContext);

  const score = useMemo(() => {
    return (
      results?.filter(
        (question) => question.correct_answer === question.selected_answer
      )?.length ?? 0
    );
  }, []);

  const handleCreateNewQuiz = () => {
    navigate('/');
  };

  useEffect(() => {
    if (results?.length === 0) navigate('/');
  }, []);

  return (
    <ResultsQuizWrapper>
      <h1>RESULTS</h1>
      <Flex flexDirection="column" gap="24px" className="result-quiz">
        {results?.map(
          ({ question, answers, correct_answer, selected_answer }) => (
            <QuestionQuiz
              key={question}
              question={question}
              answers={answers ?? []}
              selected_answer={selected_answer}
              correct_answer={correct_answer}
              readOnly={true}
            />
          )
        )}
      </Flex>
      <FinalScore score={score} />
      <Flex justifyContent="center">
        <Button
          label="Create a new quiz"
          variant="filled"
          onClick={handleCreateNewQuiz}
          className="btn-create"
        />
      </Flex>
    </ResultsQuizWrapper>
  );
};

const ResultsQuizWrapper = styled.div`
  margin:0 auto;
  .btn-create{
    max-width: 600px;
    width: 100%;
    margin: 24px auto;
    height: 32px;
    font-size: 18px;
  }
  .result-quiz{
    max-width: 600px;
    margin: 32px auto;
  }
`;

export default ResultsPage;
