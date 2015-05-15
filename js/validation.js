"use strict";

var Validation = (function(){
    var settings ={
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
            return true;
        } else {
            visualize.showErrors();
            return false;
        }

        if (callback && typeof(callback) === "function") callback();
    },

    start = function(){
        var formArray = settings.$form.find("[data-validate]");

        for(var i=0; i < formArray.length; i++){
            sendData[formArray[i].getAttribute('data-validate')] = formArray[i]['value'];
        }
        for(var key in sendData){
            (validate[key] !== undefined) ? validate[key]( sendData[key] ) : console.log('Validate  method \''+ key +'\' doesn\'t exist');
        }
    },

    validate = {

        email: function(email){
            if (!regExp.mail.test(email)) {
                errors.push('Email must be a valid');
                visualize.addErrorClass('email');
            } else {
                visualize.removeErrorClass('email');
            }
        },

        phone: function(phone){
            if (phone.length < 7 || phone.length > 20 || regExp.letters.test(phone)) {
                errors.push('You must specify a correct phone in international format');
                visualize.addErrorClass('phone');
            } else {
                visualize.removeErrorClass('phone');
            }
        },

        skype: function(skype){
            if (skype.length < 5) {
                errors.push('A skype login is required');
                visualize.addErrorClass('skype');
            } else {
                visualize.removeErrorClass('skype');
            }
        },
        firstName: function(firstName){
            if (firstName.length < 3) {
                //Validation.errors.push('A firstName is required');
                //Validation.addErrorClass('firstName');
                return false;
            } else {
                //Validation.removeErrorClass('firstName');
                return true;
            }
        },

        lastName: function(lastName){
            if (lastName.length < 3) {
                //Validation.errors.push('A lastName is required');
                //Validation.addErrorClass('lastName');
                return false;
            } else {
                //Validation.removeErrorClass('lastName');
                return true;
            }
        }
    },

    visualize = {
        showErrors: function(){
            var errorString = '';
            for(var i=0; i < errors.length; i++){
                errorString += '<div class="animated pulse">' + errors[i] + '</div>';
            }
            settings.$form.find('.errors').html(errorString);
        },

        addErrorClass: function(field){
            settings.$form.find('input[name="'+ field +'"]').addClass('error');
        },

        removeErrorClass: function(field){
            settings.$form.find('input[name="'+ field +'"]').removeClass('error');
        },

        clearErrors: function() {
            errors = [];
            settings.$form.find('.errors').html('');
        }
    };

    return {
        check: check,
        sendData: sendData
    }
}());