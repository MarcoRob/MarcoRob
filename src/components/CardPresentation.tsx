import * as React from "react";

export default class Presentation extends React.Component<any, any> {

    public render() {
        return (
            <div id="presentation" className="center-align">
                <div className="card-panel light-blue darken-2">
                    <h4 className="white-text">Marco Robles</h4>
                    <img className="circle responsive-img" src="https://avatars1.githubusercontent.com/u/10890612?s=400&u=459598d1ccb3a7b8e04da60aa8e68cdc97a9b212&v=4" /> 
                    <h5 className="white-text">
                        <b>Profile</b> <br/> 
                        FrontEnd / FullStack Developer
                    </h5>
                </div>
            </div>
        );
    }
}