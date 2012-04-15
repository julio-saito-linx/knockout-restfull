var inicializarViewModel = function () {
    var pizzaDto = [{ "Id": 1, "Ingredientes": [{ "Id": 3, "Name": "Molho de Tomate" }, { "Id": 4, "Name": "Ovo"}], "Name": "Portuguesa" }, { "Id": 2, "Ingredientes": [{ "Id": 3, "Name": "Molho de Tomate" }, { "Id": 1, "Name": "Cebola" }, { "Id": 5, "Name": "Calabresa"}], "Name": "Calabresa" }, { "Id": 3, "Ingredientes": [{ "Id": 3, "Name": "Molho de Tomate" }, { "Id": 2, "Name": "Mu�arela"}], "Name": "Mu�arela" }, { "Id": 4, "Ingredientes": [], "Name": "Pizza de vento"}];
    
    var vmKO = {};
    // Inicializa o ViewModel
    var controller = inicializarControllerKnockout({
        viewMoldel: vmKO,
        controllerName: "pizza",
        dadosDto: pizzaDto,
        ClasseViewModel: PizzaVM
    });

    return controller;
};

$(document).ready(function () {
    // verifica se o viewModel ganhou as propriedades
    test("01.inicializarControllerKnockout coloca novas variaveis no viewModel", function () {
        var vmKO = inicializarViewModel().VmKO;
        equal(!_.isUndefined(vmKO.lista), true, "vmKO.lista");
        equal(!_.isUndefined(vmKO.selecionar), true, "vmKO.selecionar");
        equal(!_.isUndefined(vmKO.selecionado), true, "vmKO.selecionado");
        equal(!_.isUndefined(vmKO.foiAlterado), true, "vmKO.foiAlterado");
        equal(!_.isUndefined(vmKO.excluir), true, "vmKO.excluir");
        equal(!_.isUndefined(vmKO.novo), true, "vmKO.novo");
        equal(!_.isUndefined(vmKO.salvar), true, "vmKO.salvar");
        equal(!_.isUndefined(vmKO.atualizando), true, "vmKO.atualizando");
    });
    test("02.vmKO.lista :: deve possuir 4 pizzas, carregadas corretamente", function () {
        var vmKO = inicializarViewModel().VmKO;
        equal(vmKO.lista().length, 4, "vmKO.lista().length");
        equal(vmKO.lista()[0].Name(), "Portuguesa", "vmKO.lista()[0].Nome()");
        equal(vmKO.lista()[0].Id(), 1, "vmKO.lista()[0].Id()");

        //inicia com o primeiro selecionado
        var pizzaPortuguesa = vmKO.lista()[0];
        equal(pizzaPortuguesa.Id(), vmKO.selecionado().Id(), "pizzaPortuguesa.Id() === vmKO.id()()");
    });
    test("02.1.vmKO.lista :: chama ajax se lista nao estiver preenchida", function () {
        var vmKO = { };
        inicializarControllerKnockout({
            viewMoldel: vmKO,
            controllerName: "simular_sucesso",
            ClasseViewModel: PizzaVM,
            ajax_done : function () {
                            equal(false, vmKO.atualizando(),
                                "controller.ajax_done :: vmKO.atualizando() === false");
                        }
        });
    });
    test("03.vmKO.selecionar :: muda o item selecionado", function () {
        var vmKO = inicializarViewModel().VmKO;

        var pizzaCalabresa = vmKO.lista()[1];
        vmKO.selecionar(pizzaCalabresa);

        equal(pizzaCalabresa.Id(), vmKO.selecionado().Id(), "pizzaPortuguesa.Id() === vmKO.id()()");
    });
    test("04.vmKO.foiAlterado :: detecta mudancas na estrutura do objeto", function () {
        var vmKO = inicializarViewModel().VmKO;

        // seleciona a primeira pizza
        var pizzaCalabresa = vmKO.lista()[1];
        vmKO.selecionar(pizzaCalabresa);
        // verifica se foi alterada
        equal(false, vmKO.foiAlterado(), "ainda nao alterado");

        // altera dados da pizza
        pizzaCalabresa.Name("Calabresa 2");

        // verifica se foi alterada
        equal(true, vmKO.foiAlterado(), "foi alterado");
    });
    test("05.vmKO.novo :: inclui novo item na lista", function () {
        var vmKO = inicializarViewModel().VmKO;

        var quantidadeInicial = vmKO.lista().length;

        // inclui novo item
        // e seleciona-o
        vmKO.novo();

        equal(vmKO.lista().length, quantidadeInicial + 1,
            "inclui novo item na lista");

        equal(0, vmKO.selecionado().Id(),
            "seleciona o item novo logo de cara");
    });
    test("06.1.ajaxRest atribui settings corretamente", function () {
        var options = {
            controllerName: "pizza1",
            metodo: METHOD.LIST,
            id: 1,
            dados: { "Id": 1, "Name": "Portuguesa 2", "Ingredientes": [{ "Id": 3, "Name": "Molho de Tomate" }, { "Id": 4, "Name": "Ovo"}] },
            callback_done: { objeto: 1 },
            callback_error: { objeto: 2 },
            assincrono: false
        };

        var ajax_config = new ajaxRest(options);

        equal(ajax_config.settings.controllerName, options.controllerName, "controllerName");
        equal(ajax_config.settings.metodo, options.metodo, "metodo");
        equal(ajax_config.settings.id, options.id, "id");
        equal(ajax_config.settings.dados, options.dados, "dados");
        equal(ajax_config.settings.callback_done, options.callback_done, "callback_done ");
        equal(ajax_config.settings.callback_error, options.callback_error, "callback_error");
        equal(ajax_config.settings.assincrono, options.assincrono, "assincrono");
    });
    test("06.2.ajaxRest atribui settings padroes corretamente", function () {
        var options = {
            controllerName: "pizza2"
        };

        var ajax_config = new ajaxRest(options);

        equal(ajax_config.settings.controllerName, options.controllerName, "controllerName");
        equal(ajax_config.settings.metodo, METHOD.LIST, "metodo");
        equal(ajax_config.settings.id, undefined, "id");
        equal(ajax_config.settings.dados, undefined, "dados");
        equal(ajax_config.settings.callback_done, undefined, "callback_done ");
        equal(ajax_config.settings.callback_error, undefined, "callback_error");
        equal(ajax_config.settings.assincrono, true, "assincrono");
    });
    test("07.1.vmKO.salvar :: salvar OK", function () {
        // inicializa o VM
        var controller = inicializarViewModel();
        controller.controllerName = "POST_sucesso";
        var vmKO = controller.VmKO;

        // altera a primeira pizza
        var itemAtual = vmKO.selecionado;
        itemAtual().Name("Portuguesa 2");

        controller.ajax_done = function (data) {
            equal(false, vmKO.atualizando(),
                "controller.ajax_done :: vmKO.atualizando() === false");
            equal(11, data,
            	"controller.ajax_done :: retorna novo ID inserido via POST");
        };

        vmKO.salvar();

    });
    test("07.2.vmKO.salvar :: salvar ERRO", function () {
        // inicializa o VM
        var controller = inicializarViewModel();
        controller.controllerName = "simular_erro";
        var vmKO = controller.VmKO;

        // altera a primeira pizza
        var itemAtual = vmKO.selecionado;
        itemAtual().Name("Portuguesa 2");

        controller.ajax_error = function () {
            equal(false, vmKO.atualizando(),
                "controller.ajax_error :: vmKO.atualizando() === false");
        };

        vmKO.salvar();
    });

    test("08.1.vmKO.excluir :: excluir OK", function () {
        // inicializa o VM
        var controller = inicializarViewModel();
        controller.controllerName = "simular_sucesso";
        var vmKO = controller.VmKO;

        var quantidadeInicialItens = vmKO.lista().length;

        controller.ajax_done = function () {
            equal(false, vmKO.atualizando(),
                "controller.ajax_done :: vmKO.atualizando() === false");
        };

        vmKO.excluir();

        equal(vmKO.lista().length, quantidadeInicialItens - 1,
        "deve retirar um item da lista");

        equal(vmKO.selecionado().Id(), 2,
        "deve selecionar o proximo item");
    });
    test("08.2.vmKO.excluir :: excluir ERRO", function () {
        // inicializa o VM
        var controller = inicializarViewModel();
        controller.controllerName = "simular_erro";
        var vmKO = controller.VmKO;

        var quantidadeInicialItens = vmKO.lista().length;

        controller.ajax_error = function () {
            equal(false, vmKO.atualizando(),
                "controller.ajax_error :: vmKO.atualizando() === false");
        };

        vmKO.excluir();

        equal(vmKO.lista().length, quantidadeInicialItens,
        "não deve alterar a quantidade pois deu erro");
    });

});