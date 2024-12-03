import React, { useState } from 'react';
import { IQuestionQuiz } from 'types';

export interface IResultContextType {
  results?: IQuestionQuiz[];
  setResults?: React.Dispatch<React.SetStateAction<IQuestionQuiz[]>>;
}

export const ResultContext = React.createContext<IResultContextType>({
  results: [],
});

export const ResultContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [results, setResults] = useState<IQuestionQuiz[]>([]);

  return (
    <ResultContext.Provider value={{ results, setResults }}>
      {children}
    </ResultContext.Provider>
  );
};
