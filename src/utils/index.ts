import { ICategory, IQuestionParams, IQuestionQuiz } from 'types';

export const randomOrderAnswers = (answers: string[]) => {
  const randomOrderAnswersList = [...answers];
  randomOrderAnswersList.sort(() => Math.random() - Math.random());
  return randomOrderAnswersList;
};

export const formatQuestionQuizData = (questionsQuiz: IQuestionQuiz[]) => {
  const questionsQuizFormat: IQuestionQuiz[] = questionsQuiz?.map(
    ({ question, correct_answer, incorrect_answers = [] }: IQuestionQuiz) => ({
      question,
      answers: randomOrderAnswers([...incorrect_answers, correct_answer]),
      correct_answer,
    })
  );
  return questionsQuizFormat;
};

export const formatCategoryOptions = (categories: ICategory[]) => {
  return categories.map(({ id, name }: ICategory) => ({
    id,
    label: name,
    value: id,
  }));
};

export const throttle = (mainFunction: Function, delay: number) => {
  let timePrev = 0;
  return (...args: unknown[]) => {
    let now = new Date().getTime();

    if (now - timePrev > delay) {
      timePrev = now;
      return mainFunction(...args);
    }
  };
};

export const withValidationParams = (
  { category, difficulty }: IQuestionParams,
  mainFunc: Function
) => {
  if (!category) alert('Please select category!');
  if (!difficulty) alert('Please select difficulty!');
  else if (category && difficulty) mainFunc();
};
