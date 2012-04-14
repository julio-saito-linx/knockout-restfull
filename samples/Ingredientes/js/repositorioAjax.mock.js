var ajaxJQuery = function() {
    var self = this;
    self.done = function() {
    };
    self.fail = function() {
    };
    return self;
};

var chamarAjax = function (options) {

    if (!_.isUndefined(options.callback_done)
            && options.nomeController == "ingrediente"
            && (options.metodo === METHOD.LIST || _.isUndefined(options.metodo))) {

        var dados = [{"Id":1,"Nome":"Cebola"},{"Id":2,"Nome":"Muçarela"},{"Id":3,"Nome":"Molho de Tomate"},{"Id":4,"Nome":"Ovo"},{"Id":5,"Nome":"Calabresa"}];
        options.callback_done(dados);

    }

    if (!_.isUndefined(options.callback_done)
            && options.nomeController == "ingrediente"
            && (options.metodo === METHOD.PUT)) {
        options.callback_done("PUT OK");
    }

    if (!_.isUndefined(options.callback_done)
        && options.nomeController == "ingrediente"
        && (options.metodo === METHOD.POST)) {
        options.callback_done(99);
    }

    if (!_.isUndefined(options.callback_done)
        && options.nomeController == "ingrediente"
        && (options.metodo === METHOD.DELETE)) {
        options.callback_done("DELETE OK");
    }


    if (!_.isUndefined(options.callback_done) && options.nomeController == "simular_sucesso") {
        options.callback_done();
    }
    if (!_.isUndefined(options.callback_done) && options.nomeController == "POST_sucesso") {
        options.callback_done(11);
    }
    if (!_.isUndefined(options.callback_error) && options.nomeController == "simular_erro") {
        options.callback_error();
    }
};

