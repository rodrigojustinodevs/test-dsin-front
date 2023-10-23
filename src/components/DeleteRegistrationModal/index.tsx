import { AlertColor, Modal } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";

import { api } from "../../services/api";
import ButtonGeneric from "../ButtonGeneric";
import PreloadButton from "../PreloadButton";
import Toast from "../Toast";
import { ModalDeleteRegistrationyle } from "./styles";
import { useNavigate } from "react-router-dom";

interface Props {
    openDeleteEventModal: boolean;
    handleCloseDeleteEventModal: () => void;
    selectedRowEvent: GridRowParams["row"];
}

function ModalDeleteEvent({
    openDeleteEventModal,
    handleCloseDeleteEventModal,
    selectedRowEvent,
}: Props) {
    const navigate = useNavigate();

    const [openToast, setOpenToast] = useState(false);
    const [toastRequisitionResult, setToastRequisitionResult] = useState<AlertColor>();
    const [textToast, setTextToast] = useState("");
    const [isLoadingButton, setIsLoadingButton] = useState(false);

    const handleCloseToast = () => {
        setOpenToast(false);
    };

    const deleteEvent = () => {
        setIsLoadingButton(true);
        
        api.delete(`/event/${selectedRowEvent.id}`)
            .then((response) => {
                setOpenToast(true);
                setToastRequisitionResult("success");
                setTextToast('Deletado');
            })
            .then(() => {
                setTimeout(() => {
                    handleCloseDeleteEventModal();
                    setOpenToast(false);
                    navigate("/home");
                    window.location.reload();
                    setIsLoadingButton(false);
                }, 2000);
            })
            .catch((error) => {
                setOpenToast(true);
                setToastRequisitionResult("error");
                setTextToast(error.response.data.message);
                setIsLoadingButton(false);
                setTimeout(() => {
                    setOpenToast(false);
                }, 1000);
            });
    };

    return (
        <Modal open={openDeleteEventModal} onClose={handleCloseDeleteEventModal}>
            <ModalDeleteRegistrationyle>
                <div className="modalContainer">
                    <p>{`Você realmente deseja excluir o eletrodométicos "${selectedRowEvent.name}"?`}</p>
                    <div className="buttonsContainer">
                        <ButtonGeneric
                            onclick={handleCloseDeleteEventModal}
                            buttonColor="var(--sunColor)"
                            text="CANCELAR"
                        />
                        <PreloadButton
                            colorText="white"
                            background="var(--itemMenuColor)"
                            loading={isLoadingButton}
                            text="DELETAR"
                            type="submit"
                            onClick={deleteEvent}
                        />
                    </div>
                </div>
                <Toast
                    open={openToast}
                    onClose={handleCloseToast}
                    severity={toastRequisitionResult}
                    text={textToast}
                />
            </ModalDeleteRegistrationyle>
        </Modal>
    );
}

export default ModalDeleteEvent;
