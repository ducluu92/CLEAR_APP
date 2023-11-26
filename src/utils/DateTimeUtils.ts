import _ from "lodash";
import moment, { Moment, isMoment } from "moment";

export const DATE_SERVER_FORMAT = "YYYY-MM-DD";
export const DATE_CLIENT_FORMAT = "MM/DD/YYYY";
export const TIME_SERVER_RESPONSE = "hh:mm A";
export const TIME_SERVER_REQUEST = "HH:mm";

const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satuday",
];
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const MONTH_SHORTS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
];
export default {
    formatToTimeServer(time: Date): string {
        try {
            const parseTime = isMoment(time) ? time : moment(time);
            return parseTime.format(DATE_SERVER_FORMAT);
        } catch {
            return "-";
        }
    },
    getDayFriendly(day: string): string {
        try {
            const date = moment(day, DATE_SERVER_FORMAT).endOf("day");
            const today = moment().endOf("day");
            const tomorrow = moment().add(1, "day").endOf("day");
            if (date <= today) return "Today";
            if (date <= tomorrow) return "Tomorrow";
            return day;
        } catch {
            return day;
        }
    },
    getTime(time: any): string {
        try {
            const parseTime = isMoment(time) ? time : moment(time);
            return parseTime.format(TIME_SERVER_RESPONSE);
        } catch {
            return "-";
        }
    },
    from12To24(time: string): string {
        try {
            const date = moment(time, TIME_SERVER_RESPONSE);
            return date.format(TIME_SERVER_REQUEST);
        } catch {
            return time;
        }
    },
    from24To12(time: string): string {
        try {
            const date = moment(time, TIME_SERVER_REQUEST);
            return date.format(TIME_SERVER_RESPONSE);
        } catch {
            return time;
        }
    },
    getClientFormat(dateTime: any,){
        try {
            const date = isMoment(dateTime) ? dateTime : moment(dateTime);
            return date.format(DATE_CLIENT_FORMAT)
        } catch {
            return dateTime;
        }
    },
    getDateTimeFull(
        dateTime: any,
        isShowTIme: boolean = true
    ): string | number {
        try {
            const date = isMoment(dateTime) ? dateTime : moment(dateTime);
            const day = date.date();
            const month = date.month();
            const year = date.year();
            const monthNum = MONTHS[month];
            const dayOfWeek = date.day();
            return `${DAYS[dayOfWeek]}, ${monthNum} ${date.date()}, ${year} ${
                isShowTIme ? date.format(TIME_SERVER_RESPONSE) : ""
            }`;
        } catch {
            return dateTime;
        }
    },
    getShortMonth(date: string): string {
        try {
            const dateM = moment(date, DATE_SERVER_FORMAT);
            const month = dateM.month();

            return `${MONTH_SHORTS[month]}`;
        } catch {
            return date;
        }
    },
    getDate(date: string): string {
        try {
            const dateM = moment(date, DATE_SERVER_FORMAT);
            return dateM.date() + "";
        } catch {
            return date;
        }
    },
};
