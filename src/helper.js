var primeiroMaiusculo = function (texto) {
    texto = texto.toLowerCase();
    var primeiraLetra = texto.substring(0, 1).toUpperCase();
    return primeiraLetra + texto.substring(1);
};

var exibirNotyBaixo = function (mensagem, milisec) {
    if(_.isUndefined(milisec)){
        milisec = 2000;
    }

    noty({"text":mensagem,
        "layout":"bottom",
        "type":"success",
        "textAlign": "left",
        "animateOpen":{"height":"toggle"},
        "animateClose":{"height":"toggle"},
        "speed":500,
        "timeout":milisec,
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
