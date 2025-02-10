import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

export const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 16px;
`;

export const CardContent = styled.div`
  flex: 1;
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
  gap: 10px;
  margin-top: 10px;
`;

export const ViewButton = styled.button`
  background: #ff6600;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const UpdateButton = styled.button`
  background: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
`;
