var inicializarViewModel = function () {
    var pizzaDto = [{ "Id": 1, "Ingredientes": [{ "Id": 3, "Name": "Molho de Tomate" }, { "Id": 4, "Name": "Ovo"}], "Name": "Portuguesa" }, { "Id": 2, "Ingredientes": [{ "Id": 3, "Name": "Molho de Tomate" }, { "Id": 1, "Name": "Cebola" }, { "Id": 5, "Name": "Calabresa"}], "Name": "Calabresa" }, { "Id": 3, "Ingredientes": [{ "Id": 3, "Name": "Molho de Tomate" }, { "Id": 2, "Name": "Muçarela"}], "Name": "Muçarela" }, { "Id": 4, "Ingredientes": [], "Name": "Pizza de vento"}];
    
    var vmKO = {};
    // Inicializa o ViewModel
    var controller = knockoutControllerInit({
        viewMoldel: vmKO,
        controllerName: "pizza",
        dtoData: pizzaDto,
        viewModelClass: PizzaVM
    });

    return controller;
};

$(document).ready(function () {
    // verifica se o viewModel ganhou as propriedades
    test("01.inicializarControllerKnockout coloca novas variaveis no viewModel", function () {
        var vmKO = inicializarViewModel().VmKO;
        equal(!_.isUndefined(vmKO.list), true, "vmKO.lista");
        equal(!_.isUndefined(vmKO.select), true, "vmKO.selecionar");
        equal(!_.isUndefined(vmKO.selected), true, "vmKO.selecionado");
        equal(!_.isUndefined(vmKO.wasUpdated), true, "vmKO.foiAlterado");
        equal(!_.isUndefined(vmKO.exclude), true, "vmKO.excluir");
        equal(!_.isUndefined(vmKO.create), true, "vmKO.novo");
        equal(!_.isUndefined(vmKO.save), true, "vmKO.salvar");
        equal(!_.isUndefined(vmKO.updating), true, "vmKO.atualizando");
    });
    test("02.vmKO.lista :: deve possuir 4 pizzas, carregadas corretamente", function () {
        var vmKO = inicializarViewModel().VmKO;
        equal(vmKO.list().length, 4, "vmKO.lista().length");
        equal(vmKO.list()[0].Name(), "Portuguesa", "vmKO.lista()[0].Nome()");
        equal(vmKO.list()[0].Id(), 1, "vmKO.lista()[0].Id()");

        //inicia com o primeiro selecionado
        var pizzaPortuguesa = vmKO.list()[0];
        equal(pizzaPortuguesa.Id(), vmKO.selected().Id(), "pizzaPortuguesa.Id() === vmKO.id()()");
    });
    test("02.1.vmKO.lista :: chama ajax se lista nao estiver preenchida", function () {
        var vmKO = { };
        knockoutControllerInit({
            viewMoldel: vmKO,
            controllerName: "force_success",
            viewModelClass: PizzaVM,
            ajax_done : function () {
                            equal(false, vmKO.updating(),
                                "controller.ajax_done :: vmKO.atualizando() === false");
                        }
        });
    });
    test("03.vmKO.selecionar :: muda o item selecionado", function () {
        var vmKO = inicializarViewModel().VmKO;

        var pizzaCalabresa = vmKO.list()[1];
        vmKO.select(pizzaCalabresa);

        equal(pizzaCalabresa.Id(), vmKO.selected().Id(), "pizzaPortuguesa.Id() === vmKO.id()()");
    });
    test("04.vmKO.foiAlterado :: detecta mudancas na estrutura do objeto", function () {
        var vmKO = inicializarViewModel().VmKO;

        // seleciona a primeira pizza
        var pizzaCalabresa = vmKO.list()[1];
        vmKO.select(pizzaCalabresa);
        // verifica se foi alterada
        equal(false, vmKO.wasUpdated(), "ainda nao alterado");

        // altera dados da pizza
        pizzaCalabresa.Name("Calabresa 2");

        // verifica se foi alterada
        equal(true, vmKO.wasUpdated(), "foi alterado");
    });
    test("05.vmKO.novo :: inclui novo item na lista", function () {
        var vmKO = inicializarViewModel().VmKO;

        var quantidadeInicial = vmKO.list().length;

        // inclui novo item
        // e seleciona-o
        vmKO.create();

        equal(vmKO.list().length, quantidadeInicial + 1,
            "inclui novo item na lista");

        equal(0, vmKO.selected().Id(),
            "seleciona o item novo logo de cara");
    });
    test("06.1.ajaxRest atribui settings corretamente", function () {
        var options = {
            controllerName: "pizza1",
            method: METHOD.LIST,
            id: 1,
            data: { "Id": 1, "Name": "Portuguesa 2", "Ingredientes": [{ "Id": 3, "Name": "Molho de Tomate" }, { "Id": 4, "Name": "Ovo"}] },
            callback_done: { objeto: 1 },
            callback_error: { objeto: 2 },
            asynchronous: false
        };

        var ajax_config = new ajaxRest(options);

        equal(ajax_config.settings.controllerName, options.controllerName, "controllerName");
        equal(ajax_config.settings.method, options.method, "method");
        equal(ajax_config.settings.id, options.id, "id");
        equal(ajax_config.settings.data, options.data, "data");
        equal(ajax_config.settings.callback_done, options.callback_done, "callback_done ");
        equal(ajax_config.settings.callback_error, options.callback_error, "callback_error");
        equal(ajax_config.settings.asynchronous, options.asynchronous, "asynchronous");
    });
    test("06.2.ajaxRest atribui settings padroes corretamente", function () {
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
        equal(ajax_config.settings.asynchronous, true, "asynchronous");
    });
    test("07.1.vmKO.salvar :: salvar OK", function () {
        // inicializa o VM
        var controller = inicializarViewModel();
        controller.controllerName = "force_post_success";
        var vmKO = controller.VmKO;

        // altera a primeira pizza
        var itemAtual = vmKO.selected;
        itemAtual().Name("Portuguesa 2");

        controller.ajax_done = function (data) {
            equal(false, vmKO.updating(),
                "controller.ajax_done :: vmKO.atualizando() === false");
            equal(11, data,
            	"controller.ajax_done :: retorna novo ID inserido via POST");
        };

        vmKO.save();

    });
    test("07.2.vmKO.salvar :: salvar ERRO", function () {
        // inicializa o VM
        var controller = inicializarViewModel();
        controller.controllerName = "force_error";
        var vmKO = controller.VmKO;

        // altera a primeira pizza
        var itemAtual = vmKO.selected;
        itemAtual().Name("Portuguesa 2");

        controller.ajax_error = function () {
            equal(false, vmKO.updating(),
                "controller.ajax_error :: vmKO.atualizando() === false");
        };

        vmKO.save();
    });

    test("08.1.vmKO.excluir :: excluir OK", function () {
        // inicializa o VM
        var controller = inicializarViewModel();
        controller.controllerName = "force_success";
        var vmKO = controller.VmKO;

        var quantidadeInicialItens = vmKO.list().length;

        controller.ajax_done = function () {
            equal(false, vmKO.updating(),
                "controller.ajax_done :: vmKO.atualizando() === false");
        };

        vmKO.exclude();

        equal(vmKO.list().length, quantidadeInicialItens - 1,
        "deve retirar um item da lista");

        equal(vmKO.selected().Id(), 2,
        "deve selecionar o proximo item");
    });
    test("08.2.vmKO.excluir :: excluir ERRO", function () {
        // inicializa o VM
        var controller = inicializarViewModel();
        controller.controllerName = "force_error";
        var vmKO = controller.VmKO;

        var quantidadeInicialItens = vmKO.list().length;

        controller.ajax_error = function () {
            equal(false, vmKO.updating(),
                "controller.ajax_error :: vmKO.atualizando() === false");
        };

        vmKO.exclude();

        equal(vmKO.list().length, quantidadeInicialItens,
        "não deve alterar a quantidade pois deu erro");
    });

});