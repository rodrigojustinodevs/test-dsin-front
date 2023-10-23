import { FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";

interface Props {
    value?: number;
    onChange?: () => void;
    label?: string;
    checked?: boolean;
}

function Toggle({ value, onChange, label, checked }: Props) {
    // const [contractIsActiveValue, setContractIsActive] = useState(0);
    // const [isActiveName, setIsActiveName] = useState("Ativo");

    return (
        <FormControlLabel
            control={
                <Switch onChange={onChange} value={value} checked={checked} />
            }
            label={label}
        />
    );
}

export default Toggle;
