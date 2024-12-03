import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResultContextProvider } from '@contexts/ResultContext';
import QuizPage from '@pages/quiz';
import ResultsPage from '@pages/results';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ResultContextProvider>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </ResultContextProvider>
    </BrowserRouter>
  );
}

export default App;
