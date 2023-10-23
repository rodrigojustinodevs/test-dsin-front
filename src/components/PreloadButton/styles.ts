import styled from "styled-components";

export const LoadingButtonStyle = styled.div`
    width: 50%;
    max-width: 180px;

    .loadingButton {
        padding: 6px 20px;
        width: 100%;
        height: 37px;
        display: flex;
        border-radius: 8px;
        justify-content: center;
        cursor: pointer;
        opacity: 1;
        transition: 0.3s;
        border: 1px solid white;
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        font-weight: 600 !important;
        display: flex;
        align-items: center;
        letter-spacing: 0px;
        outline: none;
    }

    .loadingButton:hover {
        opacity: 0.9;
        outline: 1px solid black;
        text-shadow: 0px 0px 2px black;
    }
`;
