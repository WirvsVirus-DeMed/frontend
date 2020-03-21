import React from "react";

export class LoadingSpinner extends React.Component {
    render() {
        return <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>;
    }
}

export class BtnLoadingSpinner extends React.Component {
    render() {
        return  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">
        </span>;
    }
}