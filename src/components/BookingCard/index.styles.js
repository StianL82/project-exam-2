import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.color.bodyBg};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.color.stroke};
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
    margin-right: 16px;
    margin-bottom: 0;
  }
`;

export const CardContent = styled.div`
  flex: 1;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

export const Text = styled.p`
  margin: 4px 0;
  font-size: 14px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
`;

export const IconImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin: 0 auto;
`;
