var primeiroMaiusculo = function (texto) {
    texto = texto.toLowerCase();
    var primeiraLetra = texto.substring(0, 1).toUpperCase();
    return primeiraLetra + texto.substring(1);
};

var exibirNotyBaixo = function (mensagem) {

    noty({"text":mensagem,
        "layout":"bottom",
        "type":"success",
        "animateOpen":{"height":"toggle"},
        "animateClose":{"height":"toggle"},
        "speed":500,
        "timeout":2000,
        "closeButton":false,
        "closeOnSelfClick":true,
        "closeOnSelfOver":false});
};


var exibirNotyErro = function (mensagem) {
    noty({
        "text": mensagem,
        "layout": "center",
        "type": "error",
        "textAlign": "left",
        "easing": "swing",
        "animateOpen": { "height": "toggle" },
        "animateClose": { "height": "toggle" },
        "speed": "500",
        "timeout": "20000",
        "closable": true,
        "closeOnSelfClick": true,
        "modal" : true
    });
};
