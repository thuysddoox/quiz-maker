export type TDifficulty = 'easy' | 'medium' | 'hard';

export interface ICategory {
  name: string;
  id: string;
}

export interface IQuestionQuiz {
  type?: string;
  difficulty?: TDifficulty;
  category?: string;
  answers?: string[];
  incorrect_answers?: string[];
  selected_answer?: string;
  question: string;
  correct_answer: string;
}

export interface IQuestionParams {
  amount?: number;
  type?: string;
  category: string;
  difficulty: string;
}
