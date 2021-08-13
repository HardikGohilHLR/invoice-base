import moment from "moment";

export const dateTimeFormat = (date, format) => {
   return moment(date).format(format);
}