import { ButtonGenericStyle } from "./styles";

interface Props {
    buttonColor: string;
    className?: string;
    onclick?: () => void;
    typeButton?: "button" | "submit" | "reset" | undefined;
    text: string;
    icon?: JSX.Element;
    disabled?: boolean;
}

function ButtonGeneric({
    buttonColor,
    className,
    onclick,
    typeButton,
    text,
    icon,
    disabled,
}: Props) {
    return (
        <ButtonGenericStyle
            style={{ background: buttonColor }}
            className={className}
            type={typeButton || "button"}
            onClick={onclick}
            disabled={disabled}
        >
            {icon} {text}
        </ButtonGenericStyle>
    );
}

export default ButtonGeneric;
