import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// fix redirects and private + public routes

export const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = state => ({
    isAuthenticated: !!state.uid
});

export default connect(mapStateToProps)(PrivateRoute);