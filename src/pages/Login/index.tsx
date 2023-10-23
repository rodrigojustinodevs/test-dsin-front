import Input from "../../components/Input";
import { FiMail, FiLock, FiEye } from "react-icons/fi";
import { useTheme } from "../../contexts/theme";
import { useContext, useState } from "react";
import styles from "./home.module.less";
import { useAuth } from "../../contexts/contexts";
import Toast from "../../components/Toast";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	AlertColor, FormControl, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput
} from "@mui/material";
import PreloadButton from "../../components/PreloadButton";


import { useNavigate } from "react-router-dom";
import InputGeneric from "../../components/InputGeneric";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";




type LoginFormTypeValues = {
	email: string;
	password: string;
};

const LoginFormSchema = yup.object().shape({
	email: yup
			.string()
			.required("Email é obrigatório")
			.email("Insira um email válido"),
	password: yup
			.string()
			.required("Senha é obrigatória")
			.min(6, "Senha mínima de 8 caracteres"),
});


export function Login() {
	const [revealPassword, setRevealPassword] = useState(false);

	const [isLoadingButton, setIsLoadingButton] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

	// toast configs
	const [openToast, setOpenToast] = useState(false);
	function handleCloseToast() {
			setOpenToast(false);
	}
	const [toastRequisitionResult, setToastRequisitionResult] =
			useState<AlertColor>();
	const [textToast, setTextToast] = useState("");



	function RevealPassword(event: any) {
		event.preventDefault();
		setRevealPassword(!revealPassword);
	};

	const navigate = useNavigate();

	
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<LoginFormTypeValues>({
			resolver: yupResolver(LoginFormSchema),
	});
	
	

	const { signIn } = useAuth();
	const handleValidateFormAndLogin: SubmitHandler<LoginFormTypeValues> = async (values) => {
		setIsLoadingButton(true); // Defina isLoadingButton como true ao iniciar a autenticação
	
		try {
			await signIn(values.email, values.password);
			setIsLoadingButton(false);
			navigate("/home");
		  } catch (error) {
			console.log(error);
			setIsLoadingButton(false);
			setOpenToast(true);
			setToastRequisitionResult("error");
			setTextToast("Erro na autenticação");
		  }
	  }

	return (
		<div className={styles.container}>
			<img src="/src/assets/logo.png" alt="" className="logo" />
			<div className={styles.content}>
				<h1>Faça seu Login</h1>
				<form onSubmit={handleSubmit(handleValidateFormAndLogin)}>
					<div className="inputsContainer">
					<FormControl
							sx={{ mt: 1, width: "28ch" }}
							variant="outlined"
						>
							<InputLabel>Email</InputLabel>
							<OutlinedInput
								id="email"
								endAdornment={
									<InputAdornment position="start">
										<Icon
											sx={{
												position: "relative",
												left: "4px",
											}}
										>
											<AccountCircle />
										</Icon>
									</InputAdornment>
								}
								label="Email"
								autoFocus
								error={!!errors.email}
								{...register("email")}
							/>
						</FormControl>
							<FormControl
								sx={{ mt: 1, mb: 2, width: "28ch" }}
								variant="outlined"
							>
							<InputLabel>Senha</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type={showPassword ? "text" : "password"}
								endAdornment={
									<InputAdornment position="start">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end"
										>
											{showPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								}
								label="Senha"
								error={!!errors.password}
								{...register("password")}
							/>
						</FormControl>
						</div>
						<div className="buttonsContainer">
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
			</div>
		</div>
	);
}
