import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

export interface IAnswerProps {
  readOnly?: boolean;
  status?: 'correct' | 'wrong' | 'default';
  value: string;
  isSelected?: boolean;
  onSelected?: (isSelected: boolean, answer: string) => void;
}

export const Answer = ({
  value,
  status = 'default',
  isSelected = false,
  readOnly = false,
  onSelected,
}: IAnswerProps) => {
  const [selected, setSelected] = useState<boolean>(isSelected);

  const handleOnClick = () => {
    if (!readOnly) {
      onSelected?.(!selected, value);
      setSelected(!selected);
    }
  };

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  return (
    <StyledAnswerButton
      readOnly={readOnly}
      status={status}
      isSelected={selected}
      onClick={handleOnClick}
      dangerouslySetInnerHTML={{ __html: value }}
    ></StyledAnswerButton>
  );
};

const StyledAnswerButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSelected', // Exclude isSelected
})<Pick<IAnswerProps, 'status' | 'isSelected' | 'readOnly'>>`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid green;
  color: green;
  min-height: 36px;
  background: transparent;
  
  ${(props) => {
    switch (props.status) {
      case 'wrong':
        return css`
        background-color: red;
        border-color: red;
        color: #fff;
        `;
      case 'correct':
        return css`
        background-color: green;
        color: #fff;
          `;
      default:
        break;
    }
    if (props.isSelected)
      return css`
    background-color: green;
    color: #fff;
    `;
    if (!props.readOnly)
      return css`
      cursor: pointer;
      &:hover{
        background-color: green;
        color: #fff;
      }
    `;
  }}
`;
