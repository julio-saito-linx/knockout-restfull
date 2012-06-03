
var initViewModel = function () {
    var pizzaDto = getPizzaDto();

    var vmKO = {};

    return knockoutControllerInit({
        viewMoldel:vmKO,
        controllerName:"pizza",
        dtoData:pizzaDto,
        viewModelClass:PizzaVM
    });
};

$(document).ready(function () {
    test("01.inicializarControllerKnockout put new variables in ViewModel", function () {
        // checks whether the properties were applied
        var vmKO = initViewModel().VmKO;
        equal(!_.isUndefined(vmKO.list), true, "vmKO.list");
        equal(!_.isUndefined(vmKO.select), true, "vmKO.select");
        equal(!_.isUndefined(vmKO.selected), true, "vmKO.selected");
        equal(!_.isUndefined(vmKO.wasUpdated), true, "vmKO.wasUpdated");
        equal(!_.isUndefined(vmKO.exclude), true, "vmKO.exclude");
        equal(!_.isUndefined(vmKO.create), true, "vmKO.create");
        equal(!_.isUndefined(vmKO.save), true, "vmKO.save");
        equal(!_.isUndefined(vmKO.updating), true, "vmKO.updating");
    });
    test("02.vmKO.list :: must have four pizzas, loaded correctly", function () {
        var vmKO = initViewModel().VmKO;
        equal(vmKO.list().length, 4, "vmKO.list().length");
        equal(vmKO.list()[0].Name(), "Portuguesa", "vmKO.list()[0].Nome()");
        equal(vmKO.list()[0].Id(), 1, "vmKO.list()[0].Id()");

        // begins with the first selected
        var pizzaPortuguesa = vmKO.list()[0];
        equal(pizzaPortuguesa.Id(), vmKO.selected().Id(), "pizzaPortuguesa.Id() === vmKO.id()()");
    });
    test("02.1.vmKO.list :: call ajax if list is undefined", function () {
        var vmKO = { };
        knockoutControllerInit({
            viewMoldel: vmKO,
            controllerName: "force_success",
            viewModelClass: PizzaVM,
            ajax_done : function () {
                            equal(false, vmKO.updating(),
                                "controller.ajax_done :: vmKO.updating() === false");
                        }
        });
    });
    test("03.vmKO.select :: changes selected item", function () {
        var vmKO = initViewModel().VmKO;

        var pizzaCalabresa = vmKO.list()[1];
        vmKO.select(pizzaCalabresa);

        equal(pizzaCalabresa.Id(), vmKO.selected().Id(), "pizzaPortuguesa.Id() === vmKO.id()()");
    });
    test("04.vmKO.wasUpdated :: detects changes in the structure of the object", function () {
        var vmKO = initViewModel().VmKO;

        // selects the first pizza
        var pizzaCalabresa = vmKO.list()[1];
        vmKO.select(pizzaCalabresa);
        // checks to see if has changed
        equal(false, vmKO.wasUpdated(), "not yet changed");

        // modifying pizza data
        pizzaCalabresa.Name("Calabresa 2");

        // checks to see if has changed
        equal(true, vmKO.wasUpdated(), "was updated");
    });
    test("05.vmKO.create :: includes new item in list", function () {
        var vmKO = initViewModel().VmKO;

        var quantidadeInicial = vmKO.list().length;

        // includes a new item and selects it
        vmKO.create();

        equal(vmKO.list().length, quantidadeInicial + 1,
            "includes new item in list");

        equal(0, vmKO.selected().Id(),
            "selects the new item right away");
    });
    test("06.1.ajaxRest settings correctly assigns", function () {
        var options = {
            controllerName: "pizza1",
            method: METHOD.LIST,
            id: 1,
            data: { "Id": 1, "Name": "Portuguesa 2", "Ingredientes": [{ "Id": 3, "Name": "Molho de Tomate" }, { "Id": 4, "Name": "Ovo"}] },
            callback_done: { objeto: 1 },
            callback_error: { objeto: 2 }
        };

        var ajax_config = new ajaxRest(options);

        equal(ajax_config.settings.controllerName, options.controllerName, "controllerName");
        equal(ajax_config.settings.method, options.method, "method");
        equal(ajax_config.settings.id, options.id, "id");
        equal(ajax_config.settings.data, options.data, "data");
        equal(ajax_config.settings.callback_done, options.callback_done, "callback_done ");
        equal(ajax_config.settings.callback_error, options.callback_error, "callback_error");
    });
    test("06.2.ajaxRest settings correctly assign defaults", function () {
        var options = {
            controllerName: "pizza2"
        };

        var ajax_config = new ajaxRest(options);

        equal(ajax_config.settings.controllerName, options.controllerName, "controllerName");
        equal(ajax_config.settings.method, METHOD.LIST, "method");
        equal(ajax_config.settings.id, undefined, "id");
        equal(ajax_config.settings.data, undefined, "data");
        equal(ajax_config.settings.callback_done, undefined, "callback_done ");
        equal(ajax_config.settings.callback_error, undefined, "callback_error");
    });
    test("07.1.vmKO.save :: save OK", function () {
        // initializes VM
        var controller = initViewModel();
        controller.controllerName = "force_post_success";
        var vmKO = controller.VmKO;

        // changes the first pizza
        var item = vmKO.selected;
        item().Name("Portuguesa 2");

        controller.ajax_done = function (data) {
            equal(false, vmKO.updating(),
                "controller.ajax_done :: vmKO.updating() === false");
            equal(11, data,
            	"controller.ajax_done :: returns the new ID entered by POST");
        };

        vmKO.save();

    });
    test("07.2.vmKO.save :: save ERROR", function () {
        // initializes VM
        var controller = initViewModel();
        controller.controllerName = "force_error";
        var vmKO = controller.VmKO;

        // changes the first pizza
        var selectedItem = vmKO.selected;
        selectedItem().Name("Portuguesa 2");

        controller.ajax_error = function () {
            equal(false, vmKO.updating(),
                "controller.ajax_error :: vmKO.updating() === false");
        };

        vmKO.save();
    });

    test("08.1.vmKO.exclude :: exclude OK", function () {
        // initializes VM
        var controller = initViewModel();
        controller.controllerName = "force_success";
        var vmKO = controller.VmKO;

        var initialLength = vmKO.list().length;

        controller.ajax_done = function () {
            equal(false, vmKO.updating(),
                "controller.ajax_done :: vmKO.updating() === false");
        };

        vmKO.exclude();

        equal(vmKO.list().length, initialLength - 1,
        "must remove an item from the list");

        equal(vmKO.selected().Id(), 2,
        "must select the next item");
    });
    test("08.2.vmKO.exclude :: exclude ERROR", function () {
        // initializes VM
        var controller = initViewModel();
        controller.controllerName = "force_error";
        var vmKO = controller.VmKO;

        var initialLength = vmKO.list().length;

        controller.ajax_error = function () {
            equal(false, vmKO.updating(),
                "controller.ajax_error :: vmKO.updating() === false");
        };

        vmKO.exclude();

        equal(vmKO.list().length, initialLength,
        "should not change the amount it gave error");
    });

});

var getPizzaDto = function() {
    return [
        {
            "Id":1,
            "Ingredientes":[
                {
                    "Id":3,
                    "Name":"Molho de Tomate"
                },
                {
                    "Id":4,
                    "Name":"Ovo"
                }
            ],
            "Name":"Portuguesa"
        },
        {
            "Id":2,
            "Ingredientes":[
                {
                    "Id":3,
                    "Name":"Molho de Tomate"
                },
                {
                    "Id":1,
                    "Name":"Cebola"
                },
                {
                    "Id":5,
                    "Name":"Calabresa"
                }
            ],
            "Name":"Calabresa"
        },
        {
            "Id":3,
            "Ingredientes":[
                {
                    "Id":3,
                    "Name":"Molho de Tomate"
                },
                {
                    "Id":2,
                    "Name":"Muçarela"
                }
            ],
            "Name":"Muçarela"
        },
        {
            "Id":4,
            "Ingredientes":[

            ],
            "Name":"Pizza de vento"
        }
    ];
}