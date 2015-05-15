"use strict";

var Validation = (function(){
    var settings = {
            $form: false
        },
        errors = [],
        sendData = {},
        regExp = {
            letters: /^[a-zA-Z]+$/,
            mail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/
        },

    check = function(formID, callback){
        settings.$form = $(formID);

        Visualize.clearErrors();
        getFormData();
        start();

        if(!errors.length){
            Visualize.clearErrors();
            if (callback && typeof(callback) === "function") callback();
            return true;
        } else {
            Visualize.showErrors();
            return false;
        }
    },

    getFormData = function(){
        var formDataArray = settings.$form.serializeArray();

        for(var i=0; i < formDataArray.length; i++){
            sendData[formDataArray[i]['name']] = formDataArray[i]['value'];
        }
    },

    start = function(){
        var validateArray = settings.$form.find("[data-validate]"),
            requireData = {};

        for(var i=0; i < validateArray.length; i++){
            requireData[validateArray[i].getAttribute('data-validate')] = validateArray[i]['value'];
        }
        for(var key in requireData){
            if (Validate[key] !== undefined) {
                var result = Validate[key]( requireData[key] );
                if(!result) Visualize.init(key);
            } else {
                console.log('Validate  method \''+ key +'\' doesn\'t exist')
            }
        }
    },

    Validate = {

        email: function(email){
            return (!regExp.mail.test(email)) ? false : true;
        },

        phone: function(phone){
            return (phone.length < 7 ||
                    phone.length > 20 ||
                    regExp.letters.test(phone)) ? false : true;
        },

        skype: function(skype){
            return (skype.length < 5) ? false : true;
        },

        firstName: function(firstName){
            return (firstName.length < 3) ? false : true;
        },

        lastName: function(lastName){
            return (lastName.length < 3) ? false : true;
        },

        country: function(country){
            return (country == 'Choose country*') ? false : true;
        }
    },

    Visualize = {

        init: function(field){
            (Visualize[field] !== undefined) ? Visualize[field]() : console.log('Visualize  method \''+ field +'\' doesn\'t exist');

            Visualize.showErrors();
            Visualize.addErrorClass(field);
        },

        email: function(){
            errors.push('Email must be a valid');
        },

        phone: function(){
            errors.push('You must specify a correct phone in international format');
        },

        skype: function(){
            errors.push('A skype login is required');
        },

        firstName: function(){
            errors.push('A firstName is required');
        },

        lastName: function(){
            errors.push('A lastName is required');
        },

        country: function(){
            errors.push('Country must be selected');
        },

        showErrors: function(){
            var errorString = '';
            for(var i=0; i < errors.length; i++){
                errorString += '<div class="animated pulse">' + errors[i] + '</div>';
            }
            settings.$form.find('.errors').html(errorString);
        },

        addErrorClass: function(field){
            settings.$form.find('input[data-validate="'+ field +'"]').addClass('error');
        },

        clearErrorClass: function(){
            settings.$form.find('input[data-validate]').removeClass('error');
        },

        clearErrors: function() {
            errors = [];
            settings.$form.find('.errors').html('');
            Visualize.clearErrorClass();
        }
    };

    return {
        check: check,
        sendData: sendData
    }
}());