import { useMemo } from 'react';
import styled from 'styled-components';

export interface IFinalScoreProps {
  score: number;
  total?: number;
}
export const FinalScore = ({ score, total = 5 }: IFinalScoreProps) => {
  const backgroundColor = useMemo(() => {
    if (score <= 1) return 'red';
    else if (score <= 3) return 'yellow';
    else return 'green';
  }, [score]);

  return (
    <StyledFinalScore $bgcolor={backgroundColor}>
      You scored {score} out of {total}
    </StyledFinalScore>
  );
};

const StyledFinalScore = styled.p<{ $bgcolor: string }>`
  max-width: 400px;
  margin: auto;
  padding: 4px;
  text-align: center;
  background-color: ${(props) => props?.$bgcolor || 'transparent'}
`;
