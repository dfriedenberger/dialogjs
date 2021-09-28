# dialogjs
Javascript for creating dynamic mobile dialogs


## Tldr;

clone repository and open index.html


## Installation
We use jquery and handlebar
```
  <script src="js/jquery-3.4.1.min.js"></script>
  <script src="js/handlebars.min-v4.7.7.js"></script>
```
and the actual implementation.
```
  <script src="js/dialog.js"></script>
```

## Usage
We use handlebar 
```
  <!-- handlebar templates -->
  <script id="language-template" type="text/x-handlebars-template">
      <button  id="en" class="button-primary">English</button>
      <button  id="de" class="button-primary">Deutsch</button>
  </script>

  <script id="message-template" type="text/x-handlebars-template">
    <h5>{{text}}</h5>
  </script>
```
and skeleton css.
```
  <div class="container">
    <div class="row">
      <div class="one-half column" style="margin-top: 25%">
        <h4>Dialog</h4>
          <form id="dialog">
           
          </form>
        </div>
    </div>
  </div>
```
We define our dialog (here a simple loop)
```
  <script>

    var dialog = new Dialog('#dialog',{ 

      start : "language_selection",
      
      dialogs: {
          "language_selection" : {
              template: "language-template",
              handler: function(ctx) {
                var language = ctx.getSelectedId();
                ctx.set('language',language);
              },
              next: "show_message"
          },
          "show_message" : {
              template: "message-template",
              templateData: function(ctx) {
                isEnglish = ctx.get('language') == "en" ? true : false;
                return { "text" : isEnglish ? "Hello my friend!" : "Hallo mein Freund!"}
              }

          }
      }

    });

    dialog.start();
  </script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
GNU GENERAL PUBLIC LICENSE v3

## Keywords
decision tree

## Thanks To

http://getskeleton.com/

https://www.makeareadme.com/

https://handlebarsjs.com/

https://jquery.com/



