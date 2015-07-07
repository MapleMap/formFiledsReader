"use strict";

var Validation = (function(){
    var settings = {
            $form: false
        },
        errors = {},
        sendData = {},
        regExp = {
            letters: /^[a-zA-Z]+$/,
            mail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/
        },

    check = function(formID, callback){
        settings.$form = $(formID);

        Data.getAllFields();
        Data.getRequiredFields();

        (callback && typeof(callback) === "function") ? callback() : '';

        return ($.isEmptyObject(errors) ? true : false);
    },

    Data = {

        getAllFields: function(){
            var formDataArray = settings.$form.serializeArray();

            for (var i=0; i < formDataArray.length; i++) {
                if(formDataArray[i]['value'] == '') continue;

                sendData[formDataArray[i]['name']] = formDataArray[i]['value'];
            }
        },

        getRequiredFields: function() {
            var validateArray = settings.$form.find("[data-validate]"),
                requireData = {};

            for(var i=0; i < validateArray.length; i++) {
                requireData[validateArray[i].getAttribute('data-validate')] = validateArray[i]['value'];
            }

            Validate.init(requireData);
        }
    },

    Validate = {

        init: function(requireData) {
            for(var key in requireData) {
                if (Validate[key] !== undefined) {
                    var result = Validate[key]( requireData[key] );

                    (!result) ? Errors.init(key) : Errors.delete(key);

                } else {
                    console.log('Validate  method \''+ key +'\' doesn\'t exist')
                }
            }
        },

        email: function(email) {
            return (!regExp.mail.test(email)) ? false : true;
        },

        phone: function(phone) {
            return (phone.length < 7 ||
                    phone.length > 20 ||
                    regExp.letters.test(phone)) ? false : true;
        },

        skype: function(skype) {
            return (skype.length < 5) ? false : true;
        },

        firstName: function(firstName) {
            return (firstName.length < 3) ? false : true;
        },

        lastName: function(lastName) {
            return (lastName.length < 3) ? false : true;
        },

        country: function(country) {
            return (country == 'Choose country*') ? false : true;
        }
    },

    Errors = {

        init: function(key) {
            (Errors[key] !== undefined) ? Errors[key]() : console.log('Errors  method \''+ field +'\' doesn\'t exist');
        },

        delete: function(key) {
            (errors[key] !== undefined) ? delete errors[key] : '';
        },

        email: function() {
            errors.email = 'Email must be a valid';
        },

        phone: function() {
            errors.phone = 'You must specify a correct phone in international format';
        },

        skype: function() {
            errors.skype = 'A skype login is required';
        },

        firstName: function() {
            errors.firstName = 'A firstName is required';
        },

        lastName: function() {
            errors.lastName = 'A lastName is required';
        },

        country: function() {
            errors.country = 'Country must be selected';
        }
    };

    return {
        check: check,
        errors: errors,
        sendData: sendData
    }
}());