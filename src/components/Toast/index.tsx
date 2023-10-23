import { AlertProps, Alert, Snackbar, Stack } from "@mui/material";

interface Props {
    open?: boolean;
    severity?: AlertProps["severity"];
    onClose?: () => void;
    text?: string;
}

function Toast({ open, severity, onClose, text }: Props) {

    return (
        <Stack spacing={0} sx={{ width: "100%" }}>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={onClose}
                id="toast"
                sx={{
                    margin: "0",
                    position: "fixed",
                    left: "0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    marginTop: "10%",
                }}
            >
                <Alert
                    onClose={onClose}
                    // As requisições podem ser "success, error, warning, info"
                    severity={severity}
                    style={{
                        maxWidth: "50%",
                        fontWeight: "600",
                        width: "270px",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transform: "scale(1.3)",
                        bottom: 0,
                        left: 0,
                    }}
                >
                    {text}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default Toast;
