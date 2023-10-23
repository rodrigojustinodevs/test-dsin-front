import styled from "styled-components";

export const ModalDeleteRegistrationyle= styled.div`
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 800px;
    background-color: white;
    box-shadow: 24;
    padding: 25px 5px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    font-weight: 700;
    align-items: center;
    text-align: center;

    .buttonsContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
        width: 100%;
    }
`;
