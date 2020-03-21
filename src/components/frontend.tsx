import * as React from "react";
import { Navigation } from "./navigation";
import {
    Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Frontend } from "src/frontend";
import { P2PConnectPage } from "./pages/p2pconnect";
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