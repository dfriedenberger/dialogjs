
function DialogContext(data) {
    this.data = data;

    this.set = function(key,value) {
        return this.data[key] = value;
    },

    this.get = function(key) {
        return this.data[key];
    },

    //helper
    this.getSelectedId = function() {
        return this.data.selectedId;
    },
    this.setSelectedId = function(value) {
        this.data.selectedId = value;
    },
    this.deleteSelectedId = function() {
        delete this.data.selectedId;
    }

}

function Dialog(container, config) {
    this.container = container;
    this.config = config;
    this.globalCtx = new DialogContext({});
    
    this.clearContainer = function()
    {
        $(this.container).empty();
    }

    this.showDialog = function(dialogId) {
        
        var that = this;

        //clear old dialog
        that.clearContainer();

        var dialogConfig = this.config.dialogs[dialogId];
        var id = this.container;

        //Create question
        var templateSource = document.getElementById(dialogConfig.template).innerHTML;
        var template = Handlebars.compile(templateSource);
        
        templateData = {}
        console.log("templateData",typeof dialogConfig.templateData)
        if (typeof dialogConfig.templateData === 'object') {
            templateData = dialogConfig.templateData
        }
        if (typeof dialogConfig.templateData === 'function') {
            templateData = dialogConfig.templateData(that.globalCtx);
        }


        var html = $(template(templateData));

        $(html).click(function(ev) {
            ev.preventDefault();

            that.globalCtx.setSelectedId($(this).attr('id'));

            //call handler
            if (typeof dialogConfig.handler === 'function') {
                dialogConfig.handler(that.globalCtx);
            }

            //next check type
            var next = dialogConfig.next
            console.log("next",typeof dialogConfig.next)
            if (typeof dialogConfig.next === 'function') {
                next = dialogConfig.next(that.globalCtx)
            }
            that.showDialog(next)

            that.globalCtx.deleteSelectedId();
            
        })

        $(id).append(html);
    }

    this.start = function() {

        var s = this.config.start;
        this.showDialog(s);
        
    };
  }