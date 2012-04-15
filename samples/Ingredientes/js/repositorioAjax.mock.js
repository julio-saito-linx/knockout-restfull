var ajaxJQuery = function() {
    var self = this;
    self.done = function() {
    };
    self.fail = function() {
    };
    return self;
};

var dados = [{"Id":1,"Name":"Cebola"},{"Id":2,"Name":"Muçarela"},{"Id":3,"Name":"Molho de Tomate"},{"Id":4,"Name":"Ovo"},{"Id":5,"Name":"Calabresa"}];
var actual_id = 6;

var chamarAjax = function (options) {
    // GET - LIST
    if (!_.isUndefined(options.callback_done)
            && options.controllerName == "ingrediente"
            && (options.metodo === METHOD.LIST || _.isUndefined(options.metodo))) {

        options.callback_done(dados);
    }
    // PUT
    if (!_.isUndefined(options.callback_done)
            && options.controllerName == "ingrediente"
            && (options.metodo === METHOD.PUT)) {
        options.callback_done("PUT OK<br/>" + JSON.stringify(options, null, 2));
    }
    // POST
    if (!_.isUndefined(options.callback_done)
        && options.controllerName == "ingrediente"
        && (options.metodo === METHOD.POST)) {
        options.callback_done(actual_id++);
    }
    // DELETE
    if (!_.isUndefined(options.callback_done)
        && options.controllerName == "ingrediente"
        && (options.metodo === METHOD.DELETE)) {
        options.callback_done("DELETE OK<br/>" + JSON.stringify(options, null, 2));
    }
};

