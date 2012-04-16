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

// //////////////////////////////////////////////////////////////////////////////
//  MAIN :: VIEWMODEL
//  Sets observable items
//  controller.VmKO:
//   - list, select, id, selected, wasUpdated, delete, create, save, updating
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

    var ingredientController = new knockoutControllerInit({
		viewMoldel: self.ingredientVm = {},
		controllerName: "ingredient",
		dtoData: ingredientsDto,
		viewModelClass: IngredientVM,
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

