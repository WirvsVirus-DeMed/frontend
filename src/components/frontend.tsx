import * as React from "react";
import { Navigation } from "./navigation";
import {
    Router
  } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";


export class MainComponent extends React.Component<{
  history: any
}> {

    render() {
        return <Router history={this.props.history}>
            <Navigation />
    
            <main role="main" className="container">
                <Dashboard />
            </main>
        </Router>;
    }

}