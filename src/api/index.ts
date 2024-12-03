import { CATEGORY_URL, QUIZ_URL } from '@constants/index';
import { IQuestionParams } from 'types';

export async function fetchCategories() {
  try {
    const response = await fetch(CATEGORY_URL);
    const responseData = await response?.json();
    return { data: responseData?.trivia_categories ?? [] };
  } catch (e) {
    return { error: e, data: [] };
  }
}

export async function fetchQuestionsQuiz({
  type = 'multiple',
  amount = 5,
  ...restParams
}: IQuestionParams) {
  try {
    const queryString = `${new URLSearchParams(
      restParams
    ).toString()}&${new URLSearchParams({
      type,
      amount: amount.toString(),
    }).toString()}`;

    const response = await fetch(`${QUIZ_URL}?${queryString}`);
    const responseData = await response?.json();
    return { data: responseData?.results ?? [] };
  } catch (e) {
    return { error: e, data: [] };
  }
}
