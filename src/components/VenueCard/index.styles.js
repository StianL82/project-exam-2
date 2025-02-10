import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.color.stroke};
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white};
  overflow: hidden;
  text-decoration: none;
  font-weight: bold;
  color: inherit;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 10px rgba(160, 123, 123, 0.12);
    text-decoration: none;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Rating = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 8px;
`;

export const StarIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const InfoContainer = styled.div`
  padding: 16px;
  background-color: ${(props) => props.theme.color.white};
  text-align: center;
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

export const Price = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.color.darkGray};
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Button = styled.button`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.beige};
  color: ${(props) => props.theme.color.darkGray};
  text-align: center;
  padding: 12px;
  font-weight: bold;
  width: 100% !important;
  border: none;
  margin: 0;
  box-sizing: border-box;
  border-top: 1px solid ${(props) => props.theme.color.stroke};

  &:hover {
    background-color: ${(props) => props.theme.color.lightGray};
  }
`;

export const ViewButton = styled(Button)`
  background-color: ${(props) => props.theme.color.beige};
  color: ${(props) => props.theme.color.darkGray};

  &:hover {
    background-color: ${(props) => props.theme.color.lightGray};
  }
`;

export const EditButton = styled(Button)`
  background-color: ${(props) => props.theme.color.secondaryColor};
  color: ${(props) => props.theme.color.black};

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHoverOrange};
  }
`;

export const DeleteButton = styled(Button)`
  background-color: ${(props) => props.theme.color.dangerColor};
  color: ${(props) => props.theme.color.white};

  &:hover {
    background-color: ${(props) => props.theme.color.buttonHoverRed};
  }
`;
