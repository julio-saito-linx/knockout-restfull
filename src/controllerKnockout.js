var configControllerKnockout = {
    viewMoldel: {},
    controllerName: "",
    dtoData: [],
    viewModelClass: undefined
};

var knockoutControllerInit = function (config) {
    var controller = {};
    controller.controllerName = config.controllerName;
    controller.webSite = config.webSite;
    controller.viewModelClass = config.viewModelClass;
    controller.dtoData = undefined;

    var vmKO = config.viewMoldel;

    // ///////////////////////////////////////////////////
    // CALL BACKS
    // ///////////////////////////////////////////////////
    controller.ajax_get_list = config.ajax_get_list;
    controller.ajax_save = config.ajax_save;
    controller.ajax_delete = config.ajax_delete;
    controller.ajax_error = config.ajax_error;

    // communicating with the server
    vmKO.updating = ko.observable(false);

    // only selected id
    vmKO.select = function (item) {
        vmKO.save();
        vmKO.selected(item);
        // stores new item initial state for later comparison
        vmKO.jsonItem = ko.toJSON(vmKO.selected);
    };

    vmKO.wasUpdated = function () {
        if (!_.isUndefined(vmKO.jsonItem)) {
            var jsonActualItem = ko.toJSON(vmKO.selected);
            return (vmKO.jsonItem !== jsonActualItem);
        }
        return false;
    };

    // [POST]
    vmKO.create = function () {
        var newViewModel = new controller.viewModelClass();
        vmKO.list.push(newViewModel);
        vmKO.select(newViewModel);
    };

    // [POST/PUT] 
    vmKO.save = function () {

        // there is no selected item, get out
        if (_.isUndefined(vmKO.selected)) {
            return;
        }

        // only saves the JSON has changed
        if (!vmKO.wasUpdated()) {
            return;
        }

        // mark as being updated
        // generally we use an animated GIF
        vmKO.updating(true);

        // saves the new object in JSON for later comparisons
        var serializedVm = ko.toJSON(vmKO.selected);

        var metodoHttp = METHOD.PUT;
        if (vmKO.selected().Id() === 0) {
            // if the Id is zero, it means that an item is new.
            metodoHttp = METHOD.POST;
        }

        callAjax({
            webSite: controller.webSite,
            controllerName: controller.controllerName,
            method: metodoHttp,
            id: vmKO.selected().Id(),
            data: serializedVm,
            callback_done: function (data) {
                vmKO.updating(false);
                if (!_.isUndefined(controller.ajax_save)) {
                    controller.ajax_save(data);
                }
                // it was included, get the new ID
                if(metodoHttp === METHOD.POST){
                	vmKO.selected().Id(data);
                }
              vmKO.jsonItem = ko.toJSON(vmKO.selected);
            },
            callback_error: function (jqXHR) {
                vmKO.updating(false);
                if (!_.isUndefined(controller.ajax_error)) {
                    controller.ajax_error(jqXHR);
                }
            }
        });
    };

    // [DELETE] 
    vmKO.exclude = function () {
        vmKO.updating(true);

        callAjax({
            webSite: controller.webSite,
            controllerName: controller.controllerName,
            method: METHOD.DELETE,
            id: vmKO.selected().Id(),

            // was able to remove on server
            // removes the item from the current list
            callback_done: function (data) {

                //saves the current index
                var currentIndex = _.indexOf(vmKO.list(), vmKO.selected())
                
                var newList = _.reject(vmKO.list(), function (item) {
                    return item.Id() === vmKO.selected().Id();
                });
                vmKO.list(newList);
                vmKO.updating(false);
                
                // selects next the list
                var lastItem = vmKO.list().length - 1;
                var indexToSelect = (currentIndex <= lastItem) ? currentIndex : lastItem;
        		vmKO.select(vmKO.list()[indexToSelect]);

                if (!_.isUndefined(controller.ajax_delete)) {
                    controller.ajax_delete(data);
                }
            },
            callback_error: function (jqXHR) {
                vmKO.updating(false);
                if (!_.isUndefined(controller.ajax_error)) {
                    controller.ajax_error(jqXHR);
                }
            }
        });
    };

    controller.VmKO = vmKO;

    if (!_.isUndefined(config.dtoData)) {
        // The data have come filled
        controller.dtoData = config.dtoData;
        loadDtoData(controller);
    }
    else {
        callAjax({
            webSite: controller.webSite,
            controllerName: controller.controllerName,
            callback_done: function (data) {
                controller.dtoData = data;
                loadDtoData(controller);
                if (!_.isUndefined(controller.ajax_get_list)) {
                    controller.ajax_get_list(data);
                }
            },
            callback_error: function (jqXHR) {
                vmKO.updating(false);
                if (!_.isUndefined(controller.ajax_error)) {
                    controller.ajax_error(jqXHR);
                }
            }
        });
    }

    return controller;
};

var loadDtoData = function (controller) {
    // establishing a knockout VM for each Dto
    var viewModelLista = _.map(controller.dtoData, function (itemDto) {
        return new controller.viewModelClass(itemDto);
    });

    var vmKO = controller.VmKO;

    // [GET]
    vmKO.list = ko.observableArray(viewModelLista);

    // selected item, starting with the first in the list
    vmKO.selected = ko.observable(viewModelLista[0]);

    vmKO.jsonItem = ko.toJSON(vmKO.selected);
};
