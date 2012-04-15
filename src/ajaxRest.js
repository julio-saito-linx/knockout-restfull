﻿// like an enum
var METHOD = {
    LIST: { type: "GET", url: "../api/__controller__"},
    SHOW: { type: "GET", url: "../api/__controller__/__id__"},
    PUT: { type: "PUT", url: "../api/__controller__/__id__"},
    POST: { type: "POST", url: "../api/__controller__"},
    DELETE: { type: "DELETE", url: "../api/__controller__/__id__"}
};

var ajaxRest = function (options) {
    var self = this;

    // Force options to be an object
    options = options || {};

    // default
    self.settings = {};
    self.settings.controllerName = "";
    self.settings.method = METHOD.LIST;
    self.settings.id = undefined;
    self.settings.data = undefined;
    self.settings.callback_done = undefined;
    self.settings.callback_error = undefined;
    self.settings.asynchronous = true;

    //self.settings = ajaxRestSettings;
    if (!_.isUndefined(options.controllerName)) {
        self.settings.controllerName = options.controllerName;
    }
    if (!_.isUndefined(options.method)) {
        self.settings.method = options.method;
    }
    if (!_.isUndefined(options.id)) {
        self.settings.id = options.id;
    }
    if (!_.isUndefined(options.data)) {
        self.settings.data = options.data;
    }
    if (!_.isUndefined(options.callback_done)) {
        self.settings.callback_done = options.callback_done;
    }
    if (!_.isUndefined(options.callback_error)) {
        self.settings.callback_error = options.callback_error;
    }
    if (!_.isUndefined(options.asynchronous)) {
        self.settings.asynchronous = options.asynchronous;
    }

    self.callAjax = function () {
        // prepara URL
        var uri;
        uri = self.settings.method.url.replace(/__controller__/, self.settings.controllerName);
        if (!_.isUndefined(self.settings.id)) {
            uri = uri.replace(/__id__/, self.settings.id);
        }

        // jQuery-Ajax
        var ajaxCall = {
            type: self.settings.method.type,
            url: uri,
            contentType: "application/json",
            async: self.settings.asynchronous
        };
        ajaxCall.data = self.settings.data;

        var request = ajaxJQuery(ajaxCall);


        // callbacks
        request.done(function (data) {
            if (!_.isUndefined(self.settings.callback_done)) {
                self.settings.callback_done.call(self, data);
            }
        });

        request.fail(function (jqXHR, textStatus) {
            if (!_.isUndefined(self.settings.callback_error)) {
                self.settings.callback_error.call(self, jqXHR);
            }
        });
    };
};



// ///////////////////////////////////////////////
// tratamento de erros especifico para NHibernate
// ///////////////////////////////////////////////
var tratarErrorCSharp = function (jqXHR) {
    var erroCSharp = JSON.parse(jqXHR.responseText, undefined);

    if (erroCSharp.ExceptionType === "NHibernate.Exceptions.GenericADOException") {
        if (!_.isUndefined(erroCSharp.InnerException)) {
            var inner = erroCSharp.InnerException;
// trata pau de SQL
            if (inner.ExceptionType === "System.Data.SqlClient.SqlException") {
                return (":: ERRO DE SQL ::" + "<br /><br />"
                    + "> " + erroCSharp.ExceptionType + "<br />"
                    + "> " + inner.ExceptionType + "<br /><br />"
                    + inner.Message);
            }
        }
    } else {
//pau genérico C#
        return (":: ERRO C# GENERICO ::" + "<br /><br />"
            + "> " + erroCSharp.ExceptionType + "<br />"
            + erroCSharp.Message);
    }
//pau genérico
    return (erroCSharp);
};
