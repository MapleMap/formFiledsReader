var Validation = {

    $form: false,
    errors: [],
    sendData: {},
    regExLetters: /^[a-zA-Z]+$/,
    regExEmail: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/,


    check: function(formID){
        Validation.$form = $(formID);

        Validation.clearErrors();
        Validation.form();

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
            formArray = Validation.$form.serializeArray();

        for(var i=0; i < formArray.length; i++){
            Validation.sendData[formArray[i]['name']] = formArray[i]['value'];
        }
        for(var k = 0; k < requiredFileds.length; k++){
            Validation[requiredFileds[k]]( Validation.sendData[requiredFileds[k]] );
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

    phone: function(phone){
        if (phone.length < 7 || phone.length > 20 || Validation.regExLetters.test(phone)) {
            Validation.errors.push('You must specify a correct phone in international format');
            Validation.addErrorClass('phone');
        } else {
            Validation.removeErrorClass('phone');
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

    showErrors: function(){
        var errorString = '';
        for(var i=0; i < Validation.errors.length; i++){
            errorString += '<div class="animated pulse">' + Validation.errors[i] + '</div>';
        }
        Validation.$form.find('.errors').html(errorString);
    },

    addErrorClass: function(field){
        Validation.$form.find('input[name="'+ field +'"]').addClass('error');
    },

    removeErrorClass: function(field){
        Validation.$form.find('input[name="'+ field +'"]').removeClass('error');
    },

    clearErrors: function(){
        Validation.errors = [];
        Validation.$form.find('.errors').html('');
    }
};