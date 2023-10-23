import { yupResolver } from "@hookform/resolvers/yup";
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
import { FormPlansEditPage } from "./styles";
import { LocalizationProvider, DateTimePicker} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/material/locale";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import PreloadFb from "../../components/Preload";


dayjs.locale("pt-br"); // Importe o local desejado
import { TransformsDateEUA } from '../../helpers/transformsDateEUA';

interface EventFormTypeValues {
	description: string;
	name: string;
	start_date?: string;
	end_date?: string;
  }

const EventFormSchema = yup.object().shape({
	description: yup.string().required(),
	name: yup.string().required()
});


export function EventEditPage() {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const urlParams = new URLSearchParams(window.location.search);
	const myParam = urlParams.get("id");
    const [startDate, setStartDate] = useState<string | null>();
    const [endDate, setEndDate] = useState<string | null>(
    );

	const {
		setValue,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<EventFormTypeValues>({
		resolver: yupResolver(EventFormSchema),
	});

	// toast configs
	const [openToast, setOpenToast] = useState(false);
	function handleCloseToast() {
		setOpenToast(false);
	}
	const [toastRequisitionResult, setToastRequisitionResult] =
		useState<AlertColor>();
	const [textToast, setTextToast] = useState("");
	const [isLoadingButton, setIsLoadingButton] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		api.get(`event/${myParam}`)
			.then((response) => {
				const formatDataStart = response.data.response.start_date;
				const formatDataEnd = response.data.response.end_date;
				
				setValue(
					"description",
					response.data.response.description
				);
				setValue(
					"name",
					response.data.response.name
				);
				setStartDate(formatDataStart);
				setEndDate(formatDataEnd);
				
				// setStartDate(new Date(response.data.response?.start_date))
			})
			.catch((error) => {
				setOpenToast(true);
				setToastRequisitionResult("error");
				setTextToast(error.response.data.message);
			});
		setIsLoading(false);
	}, []);

	const handleChangeDate = (value: any, type: "startDate" | "endDate") => {
        const date = new Date(value);
		const formatData = dayjs(date).format('YYYY-MM-DD HH:mm');
		
        if (type === "endDate") {
            setEndDate(formatData);	

        } else {
            setStartDate(formatData);
        }
    };

	const createNewPlan: SubmitHandler<EventFormTypeValues> = async (
		formValues
	) => {
		setIsLoadingButton(true);

		
		console.log(endDate);
		
		api.put(`/event/${myParam}`, {
			name: formValues.name,
			description: formValues.description,
			start_date: startDate,
			end_date: endDate,
		})
			.then((response) => {
				setOpenToast(true);
				setToastRequisitionResult("success");
				setTextToast(response.data.message);
			})
			.then(() => {
				setTimeout(() => {
					navigate("/home");
					setOpenToast(false);
					setIsLoadingButton(false);
				}, 2000);
			})
			.catch((response) => {
				setOpenToast(true);
				setToastRequisitionResult("error");
				setTextToast(response.response.data.response.name);
				setIsLoadingButton(false);
			});
	};

	return (
		<ContentBar>
			<FormPlansEditPage>
				<div className="topFormPage">
					<h1>Editar Eventos</h1>
				</div>

				<form onSubmit={handleSubmit(createNewPlan)}>
				<div className="inputsContainer">
						<Controller
							control={control}
							name="name"
							render={({
								field: { onChange, onBlur, value = "", ref },
							}) => (
								<InputGeneric
									onChange={onChange}
									onBlur={onBlur}
									value={value}
									size="small"
									className="inputs"
									label="Nome"
									error={!!errors.name}
									ref={ref}
									autoFocus
								/>
							)}
						/>
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
							name="start_date"
							render={({
								field: { value, ref, onChange },
								fieldState: { error },
							}) => (
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									adapterLocale="pt-br"
								>
									<DateTimePicker
										value={dayjs(startDate)}
										onChange={(value) =>
											handleChangeDate(value, "startDate")
										}
										ref={ref}
										defaultValue={dayjs(startDate)}
										label="Data Inicial"
										format="DD/MM/YYYY HH:mm"
										className="inputs"
										slotProps={{
											textField: {
												size: "small",
												fullWidth: true,
												helperText:
													error?.message,
												error: Boolean(error),
											},
										}}
									/>
								</LocalizationProvider>
							)}
						/>
						 <Controller
							control={control}
							name="end_date"
							render={({
								field: { value, ref, onChange },
								fieldState: { error },
							}) => (
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									adapterLocale="pt-br"
								>
									<DateTimePicker
										value={dayjs(endDate)}
										onChange={(value) => {
											handleChangeDate(value, "endDate")
										}
										}
										ref={ref}
										defaultValue={dayjs(endDate)}
										label="Data Final"
										className="inputs"
										slotProps={{
											textField: {
												size: "small",
												fullWidth: true,
												helperText:
													error?.message,
												error: Boolean(error),
											},
										}}
									/>
								</LocalizationProvider>
							)}
						/>
					</div>
					<div className="buttonsContainer">
						<ButtonGeneric
							onclick={() => navigate("/home")}
							buttonColor="var(--sunColor)"
							text="VOLTAR"
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
			</FormPlansEditPage>
		</ContentBar>
	);
}
