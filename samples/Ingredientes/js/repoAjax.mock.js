var ajaxJQuery = function() {
    var self = this;
    self.done = function() {
    };
    self.fail = function() {
    };
    return self;
};

var dados = [
                {
                    "Id": 1,
                    "Name": "onion"
                },
                {
                    "Id": 2,
                    "Name": "mozzarella"
                },
                {
                    "Id": 3,
                    "Name": "tomato sauce"
                },
                {
                    "Id": 4,
                    "Name": "egg"
                },
                {
                    "Id": 5,
                    "Name": "pepperoni"
                }
            ];

var actual_id = 6;

var callAjax = function (options) {
    // GET - LIST
    if (!_.isUndefined(options.callback_done)
            && options.controllerName == "ingredient"
            && (options.method === METHOD.LIST || _.isUndefined(options.method))) {

        options.callback_done(dados);
    }
    // PUT
    if (!_.isUndefined(options.callback_done)
            && options.controllerName == "ingredient"
            && (options.method === METHOD.PUT)) {
        options.callback_done("PUT OK<br/>" + JSON.stringify(options, null, 2));
    }
    // POST
    if (!_.isUndefined(options.callback_done)
        && options.controllerName == "ingredient"
        && (options.method === METHOD.POST)) {
        options.callback_done(actual_id++);
    }
    // DELETE
    if (!_.isUndefined(options.callback_done)
        && options.controllerName == "ingredient"
        && (options.method === METHOD.DELETE)) {
        options.callback_done("DELETE OK<br/>" + JSON.stringify(options, null, 2));
    }
};

