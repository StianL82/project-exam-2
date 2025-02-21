import styled from 'styled-components';

export const StyledCarousel = styled.div`
  width: 95%;
  margin: 0 auto;
  max-height: 450px;

  img {
    border-radius: 10px;
    object-fit: cover;
    width: 100%;
    height: 350x;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 3rem;
    height: 3rem;
    background-size: 100%;
  }

  .carousel-control-prev,
  .carousel-control-next {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.color.white};
  border-radius: 10px;
  padding: 20px;
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  margin: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    max-height: calc(80vh - 60px);
    max-width: calc(80vw - 40px);
    overflow: hidden;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 10px;
    }
  }

  .modal-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
      width: 3rem;
      height: 3rem;
      background-size: 100%;
    }
  }

  .close-link {
    margin-top: 15px;
    font-size: 1rem;
    text-decoration: none;
    align-self: flex-end;

    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }
`;
