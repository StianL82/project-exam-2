import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  background: ${(props) => props.theme.color.bodyBg};
  border: 1px solid ${(props) => props.theme.color.stroke};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const ImageContainer = styled.div`
  flex: 1;
  max-width: 200px;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  overflow: hidden;
  background: ${(props) => props.theme.color.lightGray};
`;

export const Image = styled.img`
  height: 276px;
  max-width: 200px;
  object-fit: cover;
`;

export const Content = styled.div`
  flex: 2;
  padding: 20px;
  word-wrap: break-word;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  word-wrap: break-word;
`;

export const BookingInfo = styled.div`
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.color.mediumGray};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  flex-wrap: wrap;
`;

export const Label = styled.span`
  font-weight: bold;
  min-width: 100px;
`;

export const Value = styled.span`
  color: ${(props) => props.theme.color.darkGray};
  word-wrap: break-word;
`;

export const NoBookings = styled.p`
  font-style: italic;
  color: ${(props) => props.theme.color.darkGray};
`;
