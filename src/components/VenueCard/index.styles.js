import styled from 'styled-components';
import { ButtonBase } from '../../styles/GlobalStyle';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--color-stroke);
  border-radius: 8px;
  background-color: var(--color-white);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.12);
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
  background-color: var(--color-white);
  text-align: center;
  flex-grow: 1;
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

export const Price = styled.p`
  font-weight: bold;
  color: var(--color-darkGray);
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

export const Button = styled(ButtonBase)`
  background-color: var(--color-beige);
  color: var(--color-darkGray);
  text-align: center;
  padding: 12px;
  font-weight: bold;
  width: 100%;
  border: none;
  margin: 0;
  box-sizing: border-box;
  border-top: 1px solid var(--color-stroke);

  &:hover {
    background-color: var(--color-lightGray);
  }
`;
