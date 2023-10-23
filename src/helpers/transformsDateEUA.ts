/* eslint-disable */

export const TransformsDateEUA = (date: string) => {
    if (date.length > 0) {
        const dateformat = new Date(date);

            const year = dateformat.getFullYear();
            const month = (dateformat.getMonth() + 1).toString().padStart(2, '0'); 
            const day = dateformat.getDate().toString().padStart(2, '0');

            const hour = dateformat.getHours().toString().padStart(2, '0');
            const minute = dateformat.getMinutes().toString().padStart(2, '0');

            const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;

            return formattedDate;
    }
};
