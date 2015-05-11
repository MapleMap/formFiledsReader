"use strict";


var Validation = {

    $form: false,
    requiredFields: ['email', 'phone'],
    errors: [],
    sendData: {},

    regExLetters: /^[a-zA-Z]+$/,
    regExEmail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/,

    check: function(formID, action){
        Validation.$form = $(formID);

        Validation.clearErrors();
        (action) ? Validation[action]() : Validation.form();

        if(!Validation.errors.length){
            Validation.clearErrors();
            return true;
        } else {
            Validation.showErrors();
            return false;
        }
    },

    form: function(){
        var formArray = Validation.$form.serializeArray();

        for(var i=0; i < formArray.length; i++){
            Validation.sendData[formArray[i]['name']] = formArray[i]['value'];
        }
        for(var k = 0; k < Validation.requiredFields.length; k++){
            Validation[Validation.requiredFields[k]]( Validation.sendData[Validation.requiredFields[k]] );
        }
    },


    email: function(email){
        if (!Validation.regExEmail.test(email)) {
            //Validation.errors.push('Email must be a valid');
            //Validation.addErrorClass('email');
            return false;
        } else {
            //Validation.removeErrorClass('email');
            return true;
        }
    },

    phone: function(phone){
        if (phone.length < 7 || phone.length > 20 || Validation.regExLetters.test(phone)) {
            //Validation.errors.push('You must specify a correct phone in international format');
            //Validation.addErrorClass('phone');
            return false;
        } else {
            //Validation.removeErrorClass('phone');
            return true;
        }
    },

    skype: function(skype){
        if (skype.length < 5) {
            //Validation.errors.push('A skype login is required');
            //Validation.addErrorClass('skype');
            return false;
        } else {
            //Validation.removeErrorClass('skype');
            return true;
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
    },

    showErrors: function(){
        var errorString = '';
        //for(var i=0; i < Validation.errors.length; i++){
        //    errorString += '<div class="animated pulse">' + Validation.errors[i] + '</div>';
        //}
        Validation.$form.find('.errors').html(errorString);
    },

    addErrorClass: function(field){
        Validation.$form.find('input[name="'+ field +'"]').addClass('error');
    },

    removeErrorClass: function(field){
        Validation.$form.find('input[name="'+ field +'"]').removeClass('error');
    },

    clearErrors: function() {
        Validation.errors = [];
        Validation.$form.find('.errors').html('');
    }
};

//var Validation = (function(){
//    var settings ={
//            self: this,
//            $form: false,
//            requiredFields: ['email', 'phone']
//        },
//        errors = [],
//        sendData = {},
//        regExp = {
//            letters: /^[a-zA-Z]+$/,
//            mail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/
//        },
//
//
//    check = function(formID){
//        settings.$form = $(formID);
//        console.log(this);
//
//        clearErrors();
//        form();
//
//        if(!errors.length){
//            clearErrors();
//            return true;
//        } else {
//            showErrors();
//            return false;
//        }
//    },
//
//    form = function(){
//        var formArray = settings.$form.serializeArray();
//
//        for(var i=0; i < formArray.length; i++){
//            sendData[formArray[i]['name']] = formArray[i]['value'];
//        }
//        for(var k = 0; k < settings.requiredFields.length; k++){
//            Validation[settings.requiredFields[k]]( sendData[settings.requiredFields[k]] );
//        }
//    },
//
//    email = function(email){
//        if (!regExp.mail.test(email)) {
//            errors.push('Email must be a valid');
//            addErrorClass('email');
//        } else {
//            removeErrorClass('email');
//        }
//    },
//
//    phone = function(phone){
//        if (phone.length < 7 || phone.length > 20 || regExp.letters.test(phone)) {
//            errors.push('You must specify a correct phone in international format');
//            addErrorClass('phone');
//        } else {
//            removeErrorClass('phone');
//        }
//    },
//
//    skype = function(skype){
//        if (skype.length < 5) {
//            errors.push('A skype login is required');
//            addErrorClass('skype');
//        } else {
//            removeErrorClass('skype');
//        }
//    },
//
//    showErrors = function(){
//        var errorString = '';
//        for(var i=0; i < errors.length; i++){
//            errorString += '<div class="animated pulse">' + errors[i] + '</div>';
//        }
//        settings.$form.find('.errors').html(errorString);
//    },
//
//    addErrorClass = function(field){
//        settings.$form.find('input[name="'+ field +'"]').addClass('error');
//    },
//
//    removeErrorClass = function(field){
//        settings.$form.find('input[name="'+ field +'"]').removeClass('error');
//    },
//
//    clearErrors = function() {
//        errors = [];
//        settings.$form.find('.errors').html('');
//    };
//
//    return {
//        check: check,
//        Validation: Validation
//    }
//}());