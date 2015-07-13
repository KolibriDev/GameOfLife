module.exports=function(appContext, appContainerElement){

    var ApplicationRootView = appContext();

    var myDivElement = <div className="main">Game of Life
        <ApplicationRootView></ApplicationRootView>
    </div>;

    return React.render(myDivElement, appContainerElement );
};