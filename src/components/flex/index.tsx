import styled from 'styled-components';

export interface IFlexProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'wrap' | 'nowrap';
  alignItems?: 'center' | 'start' | 'end' | 'stretch';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

export const Flex = ({
  children,
  gap,
  flexDirection,
  flexWrap,
  alignItems,
  justifyContent,
  ...restProps
}: IFlexProps) => {
  return (
    <StyledFlex
      $gap={gap}
      $flexDirection={flexDirection}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      $flexWrap={flexWrap}
      {...restProps}
    >
      {children}
    </StyledFlex>
  );
};

interface IStyledFlexProps {
  $gap?: string;
  $flexDirection?: string;
  $flexWrap?: string;
  $alignItems?: string;
  $justifyContent?: string;
}

const StyledFlex = styled.div<IStyledFlexProps>`
  display: flex;
  flex-direction: ${(props) => props?.$flexDirection || 'row'};
  justify-content: ${(props) => props?.$justifyContent || 'flex-start'};
  align-items: ${(props) => props?.$alignItems || 'flex-start'};
  flex-wrap: ${(props) => props?.$flexWrap || 'nowrap'};
  gap: ${(props) => props?.$gap || '0'};
`;
