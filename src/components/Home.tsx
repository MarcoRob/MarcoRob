import * as React from "react";

// Import Elements used to Home Page
import Navbar from "./Navbar";
import CardPresentation from "./CardPresentation";
import Contact from "./ContactInfo";


export default class Hello extends React.Component<any, any> {

    public render() {
        return (
            <div>
                <Navbar />
                <CardPresentation />
                <Contact />
            </div>
        );
    }

}