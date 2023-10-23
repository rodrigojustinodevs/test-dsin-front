import styled from "styled-components";

export const FormPlansEditPage = styled.div`
    width: auto;
    border-radius: 6px;
    background: var(--grey);
    margin: 1.2rem 1.5rem 0.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 2rem 1rem 2rem;

    .topFormPage {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-size: 1.2rem;
        font-weight: 500;
        color: var(--black);
    }

    h3 {
        text-align: center;
    }

    h4 {
        text-align: center;
    }

    form {
        width: 820px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
    }

    .inputsContainer {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;    
        margin: 20px 0 20px 0;
        gap: 2%;
    }
    .css-0  {
        width: 100%;
    }

    .inputs {
        width: 100%;
        background-color: #fff;
        margin:15px 0
    }

    .smallInput {
        min-width: 260px;
    }

    .checkboxListContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .checkboxesList {
        width: 100%;
        flex-direction: column;
        flex-wrap: wrap;
        display: flex;
        align-items: start;
        justify-content: center;
    }

    .planActiveContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
    }

    .planActiveContainer h4 {
        margin: 5px;
    }

    .buttonsContainer {
        margin-top: 20px;
        display: flex;
        gap: 3%;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 1050px) {
        form {
            width: 100%;
        }
        .smallInput {
            width: 400px;
        }
        @media (max-width: 700px) {
            .inputs {
                width: 330px;
            }
            .smallInput {
                width: 330px;
            }

            @media (max-width: 400px) {
                h3 {
                    text-align: center;
                }

                .checkboxesList {
                    max-height: 100%;
                }

                .inputs {
                    width: 260px;
                }

                .smallInput {
                    width: 230px;
                }
            }
        }
    }
`;

