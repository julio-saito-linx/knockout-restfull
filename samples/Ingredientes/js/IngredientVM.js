// ////////////////////////
//  ingredientVM :: VIEWMODEL
// ////////////////////////
var ingredientVM = function (ingredient) {
    var self = this;
    self.Id = ko.observable(0);
    self.Name = ko.observable("");

    if (!_.isUndefined(ingredient)) {
        self.Id = ko.observable(ingredient.Id);
        self.Name = ko.observable(ingredient.Name);
    }
};

