// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatCurrencyToShow = (value: any, format = false) => {
    let newValue = value;
    if (format) {
        newValue = value.replace(/\D/g, "");
        newValue /= 100;
    }
    return (
        Number(newValue)
            ?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })
            .replace("R$", "") ?? ""
    );
};
