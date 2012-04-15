﻿// ////////////////////////
//  IngredienteVM :: VIEWMODEL
// ////////////////////////
var IngredienteVM = function (ingredient) {
    var self = this;
    self.Id = ko.observable(0);
    self.Name = ko.observable("");

    if (!_.isUndefined(ingredient)) {
        self.Id = ko.observable(ingredient.Id);
        self.Name = ko.observable(ingredient.Name);
    }
};

// //////////////////////////////////////////////////////////////////////////////
//  MAIN :: VIEWMODEL
//  Sets observable items
//  controller.VmKO:
//   - lista, selecionar, id, selecionado, foiAlterado, excluir, novo, salvar, atualizando
// //////////////////////////////////////////////////////////////////////////////
var MainViewModel = function (ingredientsDto) {
	var self = this;

    var ajax_done_received = function (data) {
        var stringify;
        if(_.isObject(data)) {
            $("#preLog").append("JS received:\n");
            stringify = JSON.stringify(data, null, 2);
        }
        else{
            stringify = data;
        }
        $("#preLog").append(stringify);
        $("#preLog").append("\n\n");
    };

    ajax_error_received = function (jqXHR) {
        //show ajax error here
    };

    var ingredientController = new inicializarControllerKnockout({
		viewMoldel: self.ingredienteVm = {},
		controllerName: "ingrediente",
		dadosDto: ingredientsDto,
		ClasseViewModel: IngredienteVM,
        ajax_done : ajax_done_received,
        ajax_error : ajax_error_received
	});


};

// //////////////////////////////////////////////////////////////////////////////
//  READY: Initializes knockout
// //////////////////////////////////////////////////////////////////////////////
var mainViewModel;
$().ready(function() {
    mainViewModel = new MainViewModel();
    ko.applyBindings(mainViewModel); // This makes Knockout get to work

    $("#buttonShowDebugInfo").click(function(){
        $("#divLog").toggle();
        $("#divDebug").toggle();
    });
});

