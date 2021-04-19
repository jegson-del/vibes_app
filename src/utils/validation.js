import moment from "moment";

export const Validation = {
    isEmpty: function (val) {
        return val ? false : true;
    },
    isGreater: function (val, length) {
        if(val.length < length) {
            return false;
        }

        return true;
    },
    emailFormatCorrect: function (email) {
        return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            ? true : false;
    },
    isValidEmail: function (email) {
        if(Validation.isEmpty(email)) {
            return false;
        }

        if(!Validation.emailFormatCorrect(email)) {
            return false;
        }

        return true;
    },
    isValidPassword: function (password) {
        if(Validation.isEmpty(password)) {
            return false;
        }

        if(!Validation.isGreater(password, 6)) {
            return false;
        }

        return true;
    },
    isValidUsername: function (username) {
        if(Validation.isEmpty(username)) {
            return false;
        }

        if(!Validation.isGreater(username, 2)) {
            return false;
        }

        return true;
    },
    isValidDate: function (date) {
        if(Validation.isEmpty(date)) {
            return false;
        }
        return true;
    }

}