module.exports=function(appContext, appContainerElement){

    var ApplicationRootView = appContext();

    var myDivElement = <div className="main">Velkominn í Reskju
        <ApplicationRootView></ApplicationRootView>
    </div>;

    return React.render(myDivElement, appContainerElement );
};