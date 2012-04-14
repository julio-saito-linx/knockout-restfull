```
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
	var controllerIngrediente = new inicializarControllerKnockout({
		viewMoldel: self.ingredienteVm = {},
		nomeController: "ingrediente",
		dadosDto: ingredientesDto,
		ClasseViewModel: IngredienteVM
	});

    // Em caso de erro no ajax, exibe noty
    controllerIngrediente.ajax_error = function (jqXHR) {
        exibirNotyErro(tratarErrorCSharp(jqXHR));
    };
};

// //////////////////////////////////////////////////////////////////////////////
//  READY: Inicializa o knockout
// //////////////////////////////////////////////////////////////////////////////
var mainViewModel;
$().ready(function() {
    mainViewModel = new MainViewModel();
    ko.applyBindings(mainViewModel); // This makes Knockout get to work
});
```
