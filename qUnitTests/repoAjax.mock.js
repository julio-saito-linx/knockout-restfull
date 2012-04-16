var ajaxJQuery = function() {
    var self = this;
    self.done = function() {
    };
    self.fail = function() {
    };
    return self;
};

var callAjax = function (options) {

    if (!_.isUndefined(options.callback_done) && options.controllerName == "force_success") {
        options.callback_done();
    }
    if (!_.isUndefined(options.callback_done) && options.controllerName == "force_post_success") {
        options.callback_done(11);
    }
    if (!_.isUndefined(options.callback_error) && options.controllerName == "force_error") {
        options.callback_error();
    }
};