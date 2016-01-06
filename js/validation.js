"use strict";

var Validation = (function(){
    var settings = {
            $form: false
        },
        validateFields = {},
        regExp = {
            letters: /^[a-zA-Z]+$/,
            mail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/
        },

    check = function(options, callback){
        validateFields = options.fields;

        if(!validateFields || !validateFields.length) {
            console.log('fields key is empty or incorrect format!');
            return callback({result: 'failed', description: 'Sorry, but try later or contact support'});
        }

        settings.$form = options.$form;

        Data.getDataFromFormFields(function (formData) {

            for (var i=0; i < validateFields.length; i++) {
                if ( Validate[validateFields[i]] ) {
                    var res = Validate[validateFields[i]]( formData[validateFields[i]] );

                    if(res.result == 'failed') return callback(res);
                } else {
                    console.log('Method "' + [validateFields[i]] + '" of validation doesn\'t exist!');
                    return callback({result: 'failed', description: 'Sorry, but try later or contact support'});
                }
            }

            callback(null, formData);

        });
    },

    Data = {

        getDataFromFormFields: function(callback){
            var formDataArray = settings.$form.serializeArray();
            var formData = {};

            for (var i=0; i < formDataArray.length; i++) {
                if(formDataArray[i]['value'] == '') continue;

                formData[formDataArray[i]['name']] = formDataArray[i]['value'];
            }

            callback(formData);
        }
    },

    Validate = {

        email: function (email) {
            if( !email ) return {result: 'failed', description: 'Email can not be empty'};
            if( !regExp.mail.test(email) ) return {result: 'failed', description: 'Email must be valid'};

            return {result: 'success'}
        },

        password: function (password) {
            if( !password ) return {result: 'failed', description: 'Password can not be empty'};
            if( password.length < 3) return {result: 'failed', description: 'Password should be equal to or greater than 3 characters'};

            return {result: 'success'}
        },

        password_confirm: function (password_confirm) {
            if( !password_confirm ) return {result: 'failed', description: 'Password Confirm can not be empty'};
            if( validateFields.password != password_confirm) return {result: 'failed', description: 'Password Confirm and Password are not equal'};

            return {result: 'success'}
        },

        firstName: function (first_name) {
            if( !first_name ) return {result: 'failed', description: 'First Name can not be empty'};
            if( first_name.length < 3) return {result: 'failed', description: 'First Name should be equal to or greater than 3 characters'};

            return {result: 'success'}
        },

        lastName: function (last_name) {
            if( !last_name ) return {result: 'failed', description: 'Last Name can not be empty'};
            if( last_name.length < 3) return {result: 'failed', description: 'Last Name should be equal to or greater than 3 characters'};

            return {result: 'success'}
        },

        phone: function (phone) {
            if( !phone ) return {result: 'failed', description: 'Phone can not be empty'};
            if( phone.length < 10 ) return {result: 'failed', description: 'Phone should be equal to or greater than 10 characters'};

            return {result: 'success'}
        },

        skype: function (skype) {
            if( !skype ) return {result: 'failed', description: 'Skype name can not be empty'};
            if( skype.length < 3) return {result: 'failed', description: 'Skype name should be equal to or greater than 3 characters'};

            return {result: 'success'}
        },

        country: function (country) {
            if( !country ) return {result: 'failed', description: 'Country can not be empty'};

            return {result: 'success'}
        }
    };

    return {
        check: check
    }
}());