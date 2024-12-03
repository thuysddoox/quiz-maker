import styled, { css } from 'styled-components';

export interface IButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'type' | 'label'> {
  label: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'filled' | 'outlined';
}
export const Button = ({ label, variant, ...restProps }: IButtonProps) => {
  return (
    <StyledButton $variant={variant} {...restProps}>
      {label}
    </StyledButton>
  );
};

interface IStyledButtonProps {
  $variant?: 'filled' | 'outlined';
}
const StyledButton = styled.button<IStyledButtonProps>`
  min-height: 36px;
  border-radius: 6px;
  padding: 8px;
  background-color: transparent;
  border: 1px solid;
  cursor: pointer;
  
  ${(props) => {
    switch (props.$variant) {
      case 'filled':
        return css`
        background-color: #7a7979;
        border-color: #7a7979;
        color: #fff;
        `;
      case 'outlined':
        return css`
        color: black;
        border-color: #7a7979;
          `;
      default:
        break;
    }
  }}
  
`;
