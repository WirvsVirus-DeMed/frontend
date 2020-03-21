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
                <Switch>
                    <Route exact path="/p2pconnect">
                        <P2PConnectPage />
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route exact path="/">
                        3
                    </Route>
                    <Route>
                        <h3>404 - Page not found</h3>
                    </Route>
                </Switch>
            </main>
        </Router>;
    }

}