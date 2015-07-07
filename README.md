## Usage

- Add to page
```html
<script src="./js/validation.js"></script>
```
- Add "data-" attributes for the form's fields that you want to test
```html
...
<input type='text' name="email" data-validate="email" placeholder='Email:*'>
<input type='text' name="phone" data-validate="phone" placeholder='Phone:*'>
<input type='text' name="skype" data-validate="skype" placeholder='Skype:*'>
...
```
- Check your form
```javascript
$('#yourForm').submit(function(){
    var result = Validation.check('#formOne', function(){
        //your callback
        
        if (result) {
            console.log(Validation.sendData);
        } else {
            console.log(Validation.errors);
        }
    });   
});
```
- You can add own validation conditions and error's messages in validation.js
```javascript
phone: function(phone) {
    return (phone.length < 7 ||
            phone.length > 20 ||
            regExp.letters.test(phone)) ? false : true;
},

skype: function(skype) {
    return (skype.length < 5) ? false : true;
}
```
- See [example] (http://maplemap.github.io/module.form-validator)
