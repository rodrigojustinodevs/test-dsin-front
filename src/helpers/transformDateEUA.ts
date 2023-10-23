/* eslint-disable */

export const TransformDateEUA = (date: string) => {
    if (date.length > 0) {
        const dateFormat = new Date(date);

        const day = dateFormat.getDate();
        const month = dateFormat.getMonth();
        const year = dateFormat.getFullYear();

        return `${String(year)}-${String(month + 1).padStart(2, "0")}-${String(
            day
        ).padStart(2, "0")}`;
    }
};
