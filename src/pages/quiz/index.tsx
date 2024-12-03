import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Dropdown, DropdownOption } from '@components/dropdown';
import { Flex } from '@components/flex';
import { Button } from '@components/button';
import { QuestionQuiz } from '@components/question-quiz';
import { ResultContext } from '@contexts/ResultContext';
import { fetchCategories, fetchQuestionsQuiz } from '@api/index';
import { DIFFICULTY_OPTIONS } from '@constants/index';
import {
  formatCategoryOptions,
  formatQuestionQuizData,
  throttle,
  withValidationParams,
} from '@utils/index';
import { IQuestionParams, IQuestionQuiz } from 'types';

const QuizPage = () => {
  const navigate = useNavigate();
  const { setResults } = useContext(ResultContext);
  const [categories, setCategories] = useState<DropdownOption[]>([]);
  const [showSubmitBtn, setShowSubmitBtn] = useState<boolean>(false);
  const [questionsQuiz, setQuestionsQuiz] = useState<IQuestionQuiz[]>([]);
  const [currentAnswerQuestions, setCurrentAnswerQuestions] = useState<
    IQuestionQuiz[]
  >([]);
  const [questionParams, setQuestionParams] = useState<IQuestionParams>({
    amount: 5,
    category: '',
    difficulty: '',
  });

  const handleFetchCategories = async () => {
    const { data } = await fetchCategories();
    const categoryOptions = formatCategoryOptions(data ?? []);
    setCategories?.(categoryOptions);
  };
  const handleCreateQuiz = useCallback(
    throttle(async () => {
      const { data } = await fetchQuestionsQuiz(questionParams);
      const questions = formatQuestionQuizData(data);
      setQuestionsQuiz(questions);
      setCurrentAnswerQuestions(questions);
    }, 10000),
    []
  );

  const handleChangeParams = (key: string, value: string) => {
    setQuestionParams((prev: IQuestionParams) => ({ ...prev, [key]: value }));
  };

  const handleSelectedAnswer = (
    selectedAnswer: string,
    isSelected: boolean,
    questionIndex: number
  ) => {
    const newAnswerQuestions = [...currentAnswerQuestions];
    newAnswerQuestions[questionIndex].selected_answer = isSelected
      ? selectedAnswer
      : undefined;
    setCurrentAnswerQuestions(newAnswerQuestions);
  };

  const handleSubmitQuiz = () => {
    setResults?.(currentAnswerQuestions);
    navigate('/results');
  };

  useEffect(() => {
    if (categories?.length === 0) handleFetchCategories();
  }, []);

  useEffect(() => {
    if (currentAnswerQuestions?.length > 0) {
      const filledAllQuestion = currentAnswerQuestions.every(
        (question) => question?.selected_answer !== undefined
      );
      if (filledAllQuestion) setShowSubmitBtn(true);
      else setShowSubmitBtn(false);
    }
  }, [currentAnswerQuestions]);

  return (
    <QuizWrapper>
      <h1>QUIZ MAKER</h1>
      <Flex justifyContent="center">
        <Dropdown
          id="categorySelect"
          options={categories ?? []}
          className="category-select"
          placeholder="Select category"
          onChange={(event) =>
            handleChangeParams('category', event.target.value)
          }
        />
        <Dropdown
          id="difficultySelect"
          options={DIFFICULTY_OPTIONS}
          className="difficulty-select"
          placeholder="Select difficulty"
          onChange={(event) =>
            handleChangeParams('difficulty', event.target.value)
          }
        />
        <Button
          id="createBtn"
          label="Create"
          className="btn-create"
          variant="outlined"
          onClick={() => withValidationParams(questionParams, handleCreateQuiz)}
        />
      </Flex>
      {questionsQuiz?.length > 0 && (
        <Flex flexDirection="column" gap="24px" className="questions-quiz">
          {questionsQuiz?.map(({ question, answers = [] }, questionIndex) => (
            <QuestionQuiz
              key={question}
              question={question}
              answers={answers}
              onSelectedAnswer={(
                selectedAnswer: string,
                isSelected: boolean
              ) => {
                handleSelectedAnswer(selectedAnswer, isSelected, questionIndex);
              }}
            />
          ))}
        </Flex>
      )}
      {showSubmitBtn && (
        <Flex justifyContent="center">
          <Button
            label="Submit"
            variant="filled"
            className="btn-submit"
            onClick={handleSubmitQuiz}
          />
        </Flex>
      )}
    </QuizWrapper>
  );
};

const QuizWrapper = styled.div`
  margin:0 auto;
  .category-select{
    border-radius:  6px 0 0 6px;
  }
  .difficulty-select{
    border-right:0;
    border-left: 0;
  }
  .btn-create{
    border-radius: 0 6px 6px 0;
    padding: 8px 16px;
    font-weight: bold;
  }
  .btn-submit{
    min-width: 300px;
    margin: 24px auto;
  }
  .questions-quiz{
    max-width: 600px;
    margin: 16px auto;
  }
`;

export default QuizPage;
