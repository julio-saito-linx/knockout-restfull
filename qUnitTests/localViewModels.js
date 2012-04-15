// ////////////////////////
//  PizzaVM :: VIEWMODEL
// ////////////////////////
var PizzaVM = function (pizza) {
    var self = this;
    self.Id = ko.observable(0);
    self.Name = ko.observable("");
    self.Ingredientes = ko.observableArray([]);

    if (!_.isUndefined(pizza)) {
        self.Id = ko.observable(pizza.Id);
        self.Name = ko.observable(pizza.Name);
        self.Ingredientes = ko.observableArray();
        _.each(pizza.Ingredientes, function (ing) {
            self.Ingredientes().push(new IngredienteVM(ing));
        });
    }
};

// ////////////////////////
//  IngredienteVM :: VIEWMODEL
// ////////////////////////
var IngredienteVM = function (ingrediente) {
    var self = this;
    self.Id = ko.observable(0);
    self.Name = ko.observable("");

    if (!_.isUndefined(ingrediente)) {
        self.Id = ko.observable(ingrediente.Id);
        self.Name = ko.observable(ingrediente.Name);
    }
};

