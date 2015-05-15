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

        visualize.clearErrors();
        start();

        if(!errors.length){
            visualize.clearErrors();
            if (callback && typeof(callback) === "function") callback();
            return true;
        } else {
            visualize.showErrors();
            return false;
        }
    },

    start = function(){
        var formArray = settings.$form.find("[data-validate]");

        for(var i=0; i < formArray.length; i++){
            sendData[formArray[i].getAttribute('data-validate')] = formArray[i]['value'];
        }
        for(var key in sendData){
            if (validate[key] !== undefined) {
                var result = validate[key]( sendData[key] );
                if(!result) visualize.init(key);
            } else {
                console.log('Validate  method \''+ key +'\' doesn\'t exist')
            }
        }
    },

    validate = {

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
        }
    },

    visualize = {

        init: function(field){
            (visualize[field] !== undefined) ? visualize[field]() : console.log('Visualize  method \''+ field +'\' doesn\'t exist');

            visualize.showErrors();
            //visualize.removeErrorClass();
            visualize.addErrorClass(field);
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
            visualize.clearErrorClass();
        }
    };

    return {
        check: check,
        sendData: sendData
    }
}());