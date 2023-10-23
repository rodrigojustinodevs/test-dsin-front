/* eslint-disable react/jsx-no-duplicate-props */
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertColor } from "@mui/lab";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import ButtonGeneric from "../../components/ButtonGeneric";
import InputGeneric from "../../components/InputGeneric";
import { ContentBar } from "../../components/ContentBar";
import PreloadButton from "../../components/PreloadButton";
import Toast from "../../components/Toast";
import { api } from "../../services/api";
import { FormPlanRegisterPage } from "./styles";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface registrationFormTypeValues {
	description: string;
	user_id:  string;
	event_id:  string;
  }

const eventFormSchema = yup.object().shape({
	description: yup.string().required("Campo Descrição  é obrigatório"),
	user_id: yup.string().required("Campo usuário é obrigatório"),
	event_id: yup.string().required("Campo evento é obrigatório"), 
});

export function RegistrationRegisterPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [selectOptions, setSelectOptions] = useState([]);
	const [selectOptionsEvent, setSelectOptionsEvent] = useState([]);

	const navigate = useNavigate();

	const handleChangeSelectedOption = (event: SelectChangeEvent, type: "user" | "event") => {

        if (type === "user") {
            setValue("user_id", String(event.target.value));

        } else {
			setValue("event_id", String(event.target.value));

        }
    };

	const {
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<registrationFormTypeValues>({
		resolver: yupResolver(eventFormSchema),
	});

		
	 // toast configs
	 const [openToast, setOpenToast] = useState(false);
	 function handleCloseToast() {
		 setOpenToast(false);
	 }
	 const [toastRequisitionResult, setToastRequisitionResult] =
		 useState<AlertColor>();
	 const [textToast, setTextToast] = useState<string>("");
	const [isLoadingButton, setIsLoadingButton] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([
			api.get("/events"),
			api.get("/users"), // Certifique-se de que a rota seja corrigida para '/users'
		  ])
			.then((responses) => {
			  const [eventsResponse, usersResponse] = responses;
		
			  if (eventsResponse.data) {
				setSelectOptionsEvent(eventsResponse.data.response);
			  }
		
			  if (usersResponse.data) {
				setSelectOptions(usersResponse.data.response);
			  }
			})
			.catch((error) => {
			  setOpenToast(true);
			  setToastRequisitionResult("error");
			  setTextToast(error.response.data.message);
			})
			.finally(() => {
			  setIsLoading(false);
			});
	}, []);

	const createNewRegistration: SubmitHandler<registrationFormTypeValues> =  (
		formValues
	) => {
		console.log(formValues);
		
		setIsLoadingButton(true);

		api.post(`/registration`, {
			description: formValues.description,
			user_id: formValues.user_id,
			event_id: formValues.event_id,
		})
			.then((response) => {
				setOpenToast(true);
				setToastRequisitionResult("success");
				setTextToast(response.data.message);
			})
			.then(() => {
				setTimeout(() => {
					navigate("/registrations");
					setOpenToast(false);
					setIsLoadingButton(false);
				}, 4000);
			})
			.catch((error) => {				
				setOpenToast(true);
				setToastRequisitionResult("error");
				setTextToast(error.response.data.message);
				setIsLoadingButton(false);
			});
	};

	return (
		<ContentBar>
			<FormPlanRegisterPage>
				<div className="topFormPage">
					<h1>Cadastrar Novo Inscrição</h1>
				</div>

				<form onSubmit={handleSubmit(createNewRegistration)}>
					<div className="inputsContainer">
						<Controller
							control={control}
							name="description"
							render={({
								field: { onChange, onBlur, value = "", ref },
							}) => (
								<InputGeneric
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									className="inputs"
									size="small"
									multiline
									minRows={4}
									label="Descrição"
									error={!!errors.description}
									ref={ref}
									autoFocus
								/>
							)}
						/>
						<Controller
                            control={control}
                            name="user_id"
                            render={({ field: { value = "" } }) => (
                                <FormControl sx={{ height: "56px", width: "100%" }}>
                                    <InputLabel
                                        size="small"
                                        id="demo-simple-select-label"
                                    >
                                        Usuários
                                    </InputLabel>
                                    <Select
                                        error={!!errors.user_id}
                                        className="inputs"
                                        size="small"
                                        placeholder="teste"
                                        id="demo-simple-select"
                                        value={String(value)}
										onChange={(value) =>
											handleChangeSelectedOption(value, "user")
										}
                                        label="Usuários"
                                    >
                                        {selectOptions?.map(
                                            ({ id, name }) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            )}
                        />
						<Controller
                            control={control}
                            name="event_id"
                            render={({ field: { value = "" } }) => (
                                <FormControl sx={{ height: "56px", width: "100%" }}>
                                    <InputLabel
                                        size="small"
                                        id="demo-simple-select-label"
                                    >
                                        Eventos
                                    </InputLabel>
                                    <Select
                                        error={!!errors.event_id}
                                        className="inputs"
                                        size="small"
                                        placeholder="teste"
                                        id="demo-simple-select"
                                        value={String(value)} 
                                        onChange={(value) =>
											handleChangeSelectedOption(value, "event")
										}
                                        label="Eventos"
                                    >
                                        {selectOptionsEvent?.map(
                                            ({ id, name }) => (
                                                <MenuItem
                                                    key={id}
                                                    value={id}
                                                >
                                                    {name}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                </FormControl>
                            )}
                        />
					</div>
					<div className="buttonsContainer">
						<ButtonGeneric
							onclick={() => navigate("/registrations")}
							buttonColor="var(--sunColor)"
							text="VOLTAR"
							typeButton="button"

						/>
						<PreloadButton
							colorText="white"
							background="var(--itemMenuColor)"
							loading={isLoadingButton}
							text="CONFIRMAR"
							type="submit"
						/>
					</div>
				</form>
				<Toast
					open={openToast}
					onClose={() => handleCloseToast()}
					severity={toastRequisitionResult}
					text={textToast}
				/>
			</FormPlanRegisterPage>
		</ContentBar>
	);
}
