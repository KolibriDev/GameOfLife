module.exports = function (powerSystemModel, powerGenerationAreaModelFactory) {

    var PowerGenerationArea = React.createClass({
        getInitialState: function () {
            this.model = powerGenerationAreaModelFactory(this.props.data);
            return this.model.modelState();
        },
        saveArea: function () {
            powerSystemModel.AddArea(this.state);
        },
        handleChange: function (event) {
            this.setState(_.extend(this.state, {name: event.target.value}));
        },
        render: function () {
            return (
                <div className="power-generation-area">
                    {this.state.saved ?
                        <span>Svæði {this.state.name}</span> :
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Nafn kerfis" value={this.state.name}
                                   onChange={this.handleChange}/>
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.saveArea}>
                                <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>Stofna
                            </button>
                        </span>
                        </div>
                    }
                </div>
            );
        }
    });
    return PowerGenerationArea
};