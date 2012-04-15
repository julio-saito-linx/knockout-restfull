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

