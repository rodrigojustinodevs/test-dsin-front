import LoadingButton from "@mui/lab/LoadingButton";
import { CircularProgress } from "@mui/material";

import { LoadingButtonStyle } from "./styles";

interface Props {
    onClick?: () => void;
    loading?: boolean;
    colorText?: string;
    background?: string;
    text?: string;
    type?: "button" | "submit" | "reset" | undefined;
    sx?: object;
    onFocus?: () => void;
}

function PreloadButton({
    onClick,
    loading,
    colorText,
    background,
    text,
    type,
    sx,
    onFocus,
}: Props) {
    return (
        <LoadingButtonStyle>
            <LoadingButton
                loadingIndicator={
                    <CircularProgress color="primary" size={16} />
                }
                onClick={onClick}
                onFocus={onFocus}
                loading={loading}
                variant="outlined"
                className="loadingButton"
                style={{
                    color: `${colorText}`,
                    background: `${background}`,
                }}
                sx={sx}
                type={type}
            >
                {loading ? "" : `${text}`}
            </LoadingButton>
        </LoadingButtonStyle>
    );
}
export default PreloadButton;
