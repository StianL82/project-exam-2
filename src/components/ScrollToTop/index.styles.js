import styled from 'styled-components';

export const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: ${(props) => props.theme.color.primaryColor};
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  z-index: 1000;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transform: ${(props) =>
    props.isVisible ? 'translateY(0)' : 'translateY(20px)'};

  img {
    width: 24px;
    height: 24px;
    filter: invert(100%);
    transform: rotate(90deg);
  }

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHoverBlue};
  }

  .tooltip {
    position: absolute;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 5px;
    border-radius: 4px;
    font-size: 0.9rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover .tooltip {
    opacity: 1;
  }
`;
