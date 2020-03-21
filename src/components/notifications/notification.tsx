import React from "react";
import { Dashboard } from "../pages/dashboard";

export class NotificationComponent extends React.Component<{
    dashboard: Dashboard,
    title: string
}> {

    render() {
        return <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
            {/*<img src="..." className="rounded mr-2" alt="..." />*/}
            <strong className="mr-auto">{this.props.title}</strong>
            <small>11 mins ago</small>
            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div className="toast-body">
                {this.props.children}
            </div>
        </div>;
    }


}