
import React from "react";
import { Dashboard, CurrentDashboardModal } from "../pages/dashboard";

export class Modal extends React.Component<{
    title: string,
    dashboard: Dashboard,
    footer?: JSX.Element[]
}> {
    
    render() {
        return <div className="modal" tabIndex={-1} role="dialog" id="currentModal">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{this.props.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" 
                        aria-label="Close" onClick={() => {this.selfClose()}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.props.children}
                </div>
                <div className="modal-footer">
                    {this.props.footer}
                </div>
            </div>
            </div>
        </div>;
    }

    selfClose() {
        this.props.dashboard.setState({modal: CurrentDashboardModal.None});
    }

}