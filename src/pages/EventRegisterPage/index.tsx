/* eslint-disable react/jsx-no-duplicate-props */
import { yupResolver } from '@hookform/resolvers/yup';
import { AlertColor } from "@mui/lab";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import dayjs from "dayjs";


import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent
} from "@mui/material";
import { DateTimePicker, LocalizationProvider, ptBR } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TransformDateEUA } from '../../helpers/transformDateEUA';


import ButtonGeneric from "../../components/ButtonGeneric";
import InputGeneric from "../../components/InputGeneric";
import { ContentBar } from "../../components/ContentBar";
import PreloadButton from "../../components/PreloadButton";
import Toast from "../../components/Toast";
import { api } from "../../services/api";
import { FormPlanRegisterPage } from "./styles";

interface eventFormTypeValues {
	description: string;
	name: string;
	start_date:  string;
	end_date:  string;
  }

const eventFormSchema = yup.object().shape({
	description: yup.string().required("Campo Descrição  é obrigatório"),
	name: yup.string().required("Campo Nome  é obrigatório"), 
	start_date: yup.string().required("Campo Data Inicial é obrigatório"),
	end_date: yup.string().required("Campo Data Final é obrigatório"), 
});

export function EventRegisterPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [selectOptions, setSelectOptions] = useState([]);

	const [startDate, setStartDate] = useState<string | null>(
    );
    const [endDate, setEndDate] = useState<string | null>(
    );

	const navigate = useNavigate();


	const {
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<eventFormTypeValues>({
		resolver: yupResolver(eventFormSchema),
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
	}, []);

	const handleChangeDate = (value: any, type: "startDate" | "endDate") => {
        const date = new Date(value).toLocaleDateString().split("/");

        const dateFormated = `${date[2]}-${date[1]}-01`;

        if (type === "endDate") {
            setEndDate(dateFormated);
        } else {
            setStartDate(dateFormated);
        }
    };



	const createNewPlan: SubmitHandler<eventFormTypeValues> = async (
		formValues
	) => {
		setIsLoadingButton(true);

		setStartDate(TransformDateEUA(formValues.start_date as string));
		setEndDate(TransformDateEUA(formValues.end_date as string));
		api.post(`/event`, {
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
			<FormPlanRegisterPage>
				<div className="topFormPage">
					<h1>Cadastrar Novo Eventos</h1>
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
								field: { onChange, onBlur, value = "", ref },
							}) => (
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
							>
								 <DateTimePicker
									label="Data Inicial"
									format="DD/MM/YYYY"
									slotProps={{ textField: { size: "small" } }}
									value={value}
									onChange={onChange}
									ref={ref}
								/>
							</LocalizationProvider>
							)}
						/>
						<Controller
							control={control}
							name="end_date"
							render={({
								field: { onChange, onBlur, value = "", ref },
							}) => (
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								localeText={
									ptBR.components.MuiLocalizationProvider
										.defaultProps.localeText
								}
								adapterLocale="pt-br"
							>
								<DateTimePicker
									label="Data Final"
									format="DD/MM/YYYY"
									slotProps={{ textField: { size: "small" } }}
									value={value}
									onChange={onChange}
									ref={ref}
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
			</FormPlanRegisterPage>
		</ContentBar>
	);
}
