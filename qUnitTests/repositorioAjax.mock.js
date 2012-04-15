var ajaxJQuery = function() {
    var self = this;
    self.done = function() {
    };
    self.fail = function() {
    };
    return self;
};

var chamarAjax = function (options) {

    if (!_.isUndefined(options.callback_done) && options.controllerName == "simular_sucesso") {
        options.callback_done();
    }
    if (!_.isUndefined(options.callback_done) && options.controllerName == "POST_sucesso") {
        options.callback_done(11);
    }
    if (!_.isUndefined(options.callback_error) && options.controllerName == "simular_erro") {
        options.callback_error();
    }
};