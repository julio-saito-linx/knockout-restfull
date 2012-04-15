var ajaxJQuery = $.ajax;

var callAjax = function (options) {
    (new ajaxRest(options)).callAjax();
}