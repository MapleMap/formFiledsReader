## Usage

- Add to page
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="./js/validation.js"></script>
```

- Check your form
```javascript
$('#yourForm').submit(function(){
    
    Validation.check({
        $form: $(this),
        fields: ['firstName', 'lastName', 'email'] //name of inputs for validating
    }, function (err, formData) {
        if(err) {
            console.log(err);
            //your code
            return;
        };

        console.log(formData);
        //your code
    })
});
```
- You can add own validation conditions and error's messages in validation.js
```javascript
...
password: function (password) {
    if( !password ) return {result: 'failed', description: 'Password can not be empty'};
    if( password.length < 3) return {result: 'failed', description: 'Password should be equal to or greater than 3 characters'};

    return {result: 'success'}
},

password_confirm: function (password_confirm) {
    if( !password_confirm ) return {result: 'failed', description: 'Password Confirm can not be empty'};
    if( validateFields.password != password_confirm) return {result: 'failed', description: 'Password Confirm and Password are not equal'};

    return {result: 'success'}
}
...
```
- See and try [example] (http://maplemap.github.io/module.form-validator)
