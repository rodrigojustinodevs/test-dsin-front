// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const documentMask = (value: string) => {
    let newValue = value.replace(/\D/g, "");

    if (value.length <= 14) {
        newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
        newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
        newValue = newValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
        newValue = newValue.replace(/^(\d{2})(\d)/, "$1.$2");
        newValue = newValue.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        newValue = newValue.replace(/\.(\d{3})(\d)/, ".$1/$2");
        newValue = newValue.replace(/(\d{4})(\d)/, "$1-$2");
    }
    return newValue;
};
