import styled from "styled-components";

export const ButtonGenericStyle = styled.button`
    margin: 10px 0px;
    padding: 10px 20px;
    background: red;
    color: white;
    width: 100%;
    max-width: 170px;
    display: flex;
    border-radius: 8px;
    justify-content: center;
    cursor: pointer;
    opacity: 1;
    transition: 0.3s;
    font-family: "Roboto", sans-serif;
    border: none;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    &:hover {
        opacity: 0.9;
        outline: 1px solid black;
        text-shadow: 0px 0px 2px black;
    }

    @media (max-width: 450px) {
        width: 115px;
    }
`;
