/*eslint-disable*/

export function TransformDateEUA(valueDate: string, showTime: boolean = true) {
    if (valueDate.length > 0) {
        const [datePart, timePart] = valueDate.split(" ");

        const [day, month, year] = datePart.split("/");

        if (showTime) {
            const newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
                2,
                "0"
            )} ${timePart}`;

            return newDate;
        } else {
            const newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
                2,
                "0"
            )}`;

            return newDate;
        }
    }
}
