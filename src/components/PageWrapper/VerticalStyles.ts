import styled from "styled-components";

export const BodyContentStyle = styled.div`
    display: flex;
    justify-content: center;
    margin: 0px 30px 30px 16.5vw;
    width: 82vw;

    @media (max-width: 500px) {
        padding: 20px 3%;
    }

    @media print {
        padding: 0 !important;
        margin: 0 !important;
    }
`;

export const PreBody = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5.5rem;
    width: 82vw;
    /* box-shadow: 5px 5px 5px #00000021; */

    @media (max-width: 500px) {
        padding: 20px 3%;
    }

    @media print {
        padding: 0 !important;
        margin: 0 !important;
    }
`;

export const UnderNavbarHeader = styled.div`
    margin-left: 30vw;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
