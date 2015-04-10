var formApp = (function () {
    var $form = false,
        requiredFields = {fullname: 3, email: 0, phone: 6},
        spinner = false,
        values = {};

    function searchAllFields(formID){
        $form = $(formID);
        var commonArray,
            inputs = $.makeArray($form.find('input')),
            textareas = $.makeArray($form.find('textarea')),
            selects = $.makeArray($form.find('select'));

        commonArray = inputs.concat(textareas, selects);
        getDataFromFileds(commonArray);
    }


    function getDataFromFileds(commonArray){
        for(var i=0; i < commonArray.length; i++) {
            if(commonArray[i].tagName == "SELECT"){
                App.handlerForSelect(commonArray[i], $form);
            }
            if(!commonArray[i].getAttribute('name')) continue;
            values[commonArray[i].getAttribute('name')] = commonArray[i].value;
        }
    }

    function checkRequiredFields(){
        var result = true;
        for(var key in requiredFields){
            if(values[key].length < requiredFields[key]) {
                result = false;
                break;
            }
        }
        return result;
    }

    function checkEmail(email){
        var result = true;
        var regExEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,}$/;
        if (!regExEmail.test(email)) {
            result = false;
        }
        return result;
    }

    function initPopUp(){
        var string = '<div id="sendPopUp">\
                        <div class="message-box">\
                            <span class="message">\
                                Thanks for your interest in Artel Talent Cloud<br>\
                                Vladimir will contact you shortly.<br>\
                                Can’t wait? Give us a call! <a href="skype:+380988357709?call">+38 098 835 77 09</a>\
                            </span>\
                            <button>I\'ll stay tuned!</button>\
                        </div>\
                      </div>',
            $parentSection = $form.closest('section');
        $parentSection.append(string);
        var $sendPopUp = $('#sendPopUp');

        $sendPopUp.css('display', 'block');
        $sendPopUp.find('button').on('click', function () {
            $sendPopUp.hide();
        });
    }

    function initSpinner (action){
        if(action == 'stop' && spinner) {spinner.stop(); return}
        var  opts = {
                lines: 13, // The number of lines to draw
                length: 20, // The length of each line
                width: 10, // The line thickness
                radius: 30, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#000', // #rgb or #rrggbb or array of colors
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: '50%', // Top position relative to parent
                left: '50%' // Left position relative to parent
            },
            target = document.querySelector('section.sec6');
        spinner = new Spinner(opts).spin(target);
    }

    function sendTheForm (formID) {
        searchAllFields(formID);
        if(checkRequiredFields(values) && checkEmail(values.email)) {

            $.ajax({
                url: "/index.php?action=bitrix",
                type: "POST",
                data: values,
                beforeSend: function () {
                    if(formID == '#modalForm') return;
                    initSpinner('start');
                },
                success: function (result) {
                    console.log(result);
                    if (result == 'ok' && formID != '#modalForm') {
                        initPopUp();
                        initSpinner('stop');
                    } else {
                        App.requestModalHide();
                    }
                    $(formID).find("input[type=text], input[type=email], textarea").val("");
                }
            });
        }

    }

    return {
        values: values,
        sendTheForm: sendTheForm
    }
})();