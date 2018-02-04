import * as React from "react";
export default class Nabvar extends React.Component<any, any> {

    
    public render() {
        return (
            <div className="row">
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3"><a className="active" href="#presentation">Me</a></li>
                        <li className="tab col s3"><a href="#test2">Projects</a></li>
                        <li className="tab col s3"><a href="#test3">Skills </a></li>
                        <li className="tab col s3"><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}