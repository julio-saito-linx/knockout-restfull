// ////////////////////////
//  IngredienteVM :: VIEWMODEL
// ////////////////////////
var IngredienteVM = function (ingrediente) {
    var self = this;
    self.Id = ko.observable(0);
    self.Nome = ko.observable("");

    if (!_.isUndefined(ingrediente)) {
        self.Id = ko.observable(ingrediente.Id);
        self.Nome = ko.observable(ingrediente.Nome);
    }
};

// //////////////////////////////////////////////////////////////////////////////
//  MAIN :: VIEWMODEL
//  Define os itens que serão observáveis, ou seja, sicronizados via M,V,VM
//  controller.VmKO:
//   - lista, selecionar, id, selecionado, foiAlterado, excluir, novo, salvar, atualizando
// //////////////////////////////////////////////////////////////////////////////
var MainViewModel = function (ingredientesDto) {
	var self = this;

    var ajax_done_received = function (data) {
        var stringify = JSON.stringify(data);
        exibirNotyBaixo("AJAX SIMULATION:<br/>" + stringify);
    };

    ajax_error_received = function (jqXHR) {
        exibirNotyErro(tratarErrorCSharp(jqXHR));
    };

    var controllerIngrediente = new inicializarControllerKnockout({
		viewMoldel: self.ingredienteVm = {},
		nomeController: "ingrediente",
		dadosDto: ingredientesDto,
		ClasseViewModel: IngredienteVM,
        ajax_done : ajax_done_received,
        ajax_error : ajax_error_received
	});


};

// //////////////////////////////////////////////////////////////////////////////
//  READY: Inicializa o knockout
// //////////////////////////////////////////////////////////////////////////////
var mainViewModel;
$().ready(function() {
    mainViewModel = new MainViewModel();
    ko.applyBindings(mainViewModel); // This makes Knockout get to work
});

