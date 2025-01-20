import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  max-width: 660px;
  height: 42px;
  margin: 0 auto;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.mediumGray};
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 12px 0 40px;
  margin-bottom: 16px;
  border: 1px solid ${(props) => props.theme.color.lightGray};
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${(props) => props.theme.color.primaryColor};
    box-shadow: 0 0 4px ${(props) => props.theme.color.primaryColor};
  }
`;