import React from 'react';
import { useSelector } from 'react-redux';
import history from "@history";
import { Router } from "react-router";
import { Switch, Route, Redirect } from 'react-router-dom';
import includes from 'lodash/includes';
import pageAccess from 'app/auth/AuthorizationRoles';
import MainPage from 'app/main/pages/main-page/MainPage';
import NotFoundPage from 'app/main/pages/not-found/NotFoundPage';
import RequestPage from 'app/main/pages/request/RequestPage';
import WorkOrdersPage from 'app/main/pages/workOrders/WorkOrdersPage';
import WorkOrdersDetailsPage from 'app/main/pages/workOrders/WorkOrdersDetailsPage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { role } = useSelector(({ motoflash }) => motoflash.user)
  const auth = rest.auth
  return (
    <Route
      {...rest}
      render={props => includes(auth, role) ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )}
    />
  )
}

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <PrivateRoute auth={pageAccess.request} exact path="/solicitar" component={RequestPage} />
        <PrivateRoute auth={pageAccess.allWorkOrders} exact path="/pedidos" component={WorkOrdersPage} />
        <PrivateRoute auth={pageAccess.workOrderById} exact path="/pedidos/:id" component={WorkOrdersDetailsPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default Routes