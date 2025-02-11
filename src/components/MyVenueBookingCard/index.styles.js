import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const ImageContainer = styled.div`
  flex: 1;
  max-width: 200px;
  max-height: 100%;
  display: flex;
  justify-content: center; /* Horisontal sentrering */
  align-items: center; /* Vertikal sentrering */
  overflow: hidden;
  background: #f1f1f1; /* Legger til en bakgrunnsfarge for å indikere bildet */
`;

export const Image = styled.img`
  height: 100%;
  max-width: 200px;
  max-height: 480px;
  object-fit: cover;
`;

export const Content = styled.div`
  flex: 2;
  padding: 20px;
`;

export const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const BookingInfo = styled.div`
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

export const Row = styled.div`
  display: flex;
  align-items: center; /* Justerer label og value vertikalt */
  gap: 10px; /* Mellomrom mellom label og value */
  margin-bottom: 5px;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #555;
  min-width: 100px; /* Gir fast bredde til label for konsekvent avstand */
`;

export const Value = styled.span`
  color: #333;
  word-wrap: break-word; /* Bryter lange verdier */
`;

export const NoBookings = styled.p`
  font-style: italic;
  color: #999;
`;
