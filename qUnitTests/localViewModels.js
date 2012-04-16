// ////////////////////////
//  PizzaVM :: VIEWMODEL
// ////////////////////////
var PizzaVM = function (pizza) {
    var self = this;
    self.Id = ko.observable(0);
    self.Name = ko.observable("");
    self.Ingredients = ko.observableArray([]);

    if (!_.isUndefined(pizza)) {
        self.Id = ko.observable(pizza.Id);
        self.Name = ko.observable(pizza.Name);
        self.Ingredients = ko.observableArray();
        _.each(pizza.Ingredients, function (ing) {
            self.Ingredients().push(new IngredientVM(ing));
        });
    }
};

// ////////////////////////
//  IngredientVM :: VIEWMODEL
// ////////////////////////
var IngredientVM = function (ingredient) {
    var self = this;
    self.Id = ko.observable(0);
    self.Name = ko.observable("");

    if (!_.isUndefined(ingredient)) {
        self.Id = ko.observable(ingredient.Id);
        self.Name = ko.observable(ingredient.Name);
    }
};

