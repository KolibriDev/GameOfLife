var appContext =function() {

    var applicationRootViewComponent = require('./power-system-config');
    var ApplicationRootView = applicationRootViewComponent(powerSystemModel, PowerGenerationAreaConfig);

    return ApplicationRootView
};


module.exports = appContext;