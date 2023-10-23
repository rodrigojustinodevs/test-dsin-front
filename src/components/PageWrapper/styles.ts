import styled from "styled-components";

export const BodyContentStyle = styled.div`
    padding: 20px 7%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    @media (max-width: 1080px) {
        padding: 10px 10px;
    }

    @media (max-width: 700px) {
        padding: 10px 5px;
    }

    @media print {
        padding: 0 !important;
        margin: 0 !important;
    }
`;
