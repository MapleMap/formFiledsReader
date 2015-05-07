var formApp = (function () {

    var settings = {
      $form: false
    };

    init = function(formID){

    };

    var Validation = {

        errors: false,
        regExLetters: /^[a-zA-Z]+$/,
        regExEmail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/,


        check: function(action, value){
            Validation.clearErrors();

            Validation[action](value);

            if(!Validation.errors.length){
                Validation.clearErrors();
                return true;
            } else {
                Validation.showErrors();
                return false;
            }
        },

        form: function(){
            var requiredFileds = ['phone', 'email', 'skype'],
                formArray = $form.serializeArray();

            for(var i=0; i < formArray.length; i++){
                sendData[formArray[i]['name']] = formArray[i]['value'];
            }

            for(var k = 0; k < requiredFileds.length; k++){
                Validation[requiredFileds[k]]( sendData[requiredFileds[k]] );
            }
        },

        phone: function(phone){
            if (phone.length < 7 || phone.length > 20 || Validation.regExLetters.test(phone)) {
                Validation.errors.push('You must specify a correct phone in international format');
                Validation.addErrorClass('phone');
            } else {
                Validation.removeErrorClass('phone');
            }
        },

        email: function(email){
            if (!Validation.regExEmail.test(email)) {
                Validation.errors.push('Email must be a valid');
                Validation.addErrorClass('email');
            } else {
                Validation.removeErrorClass('email');
            }
        },

        skype: function(skype){
            if (skype.length < 5) {
                Validation.errors.push('A skype login is required');
                Validation.addErrorClass('skype');
            } else {
                Validation.removeErrorClass('skype');
            }
        },

        rate: function(rate){
            rate = rate*1;

            if (!rate || isNaN(rate) || (rate.toString().length > 3)) {
                Validation.errors.push('You must enter a rate of one to three digits');
                Validation.addErrorClass('rate');
            } else {
                Validation.removeErrorClass('rate');
            }
        },

        showErrors: function(){
            var errorString = '';
            for(var i=0; i < Validation.errors.length; i++){
                errorString += '<div class="animated pulse">' + Validation.errors[i] + '</div>';
            }
            $('#errors').html(errorString);
        },

        addErrorClass: function(field){
            $('input[name="'+ field +'"]')
                .removeClass('filled')
                .addClass('error');
        },

        removeErrorClass: function(field){
            $('input[name="'+ field +'"]').removeClass('error');
        },

        clearErrors: function(){
            Validation.errors = [];
            $('#errors').html('');
        }
    };

    return {
        init: init
    }
})();