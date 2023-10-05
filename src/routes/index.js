import React from 'react';
import {Route, Switch} from "react-router-dom";
import ProductList from "../components/products/ProductList";
import StockComponent from "../components/stocks/StockComponent";
import OrderComponent from "../components/orders/OrderComponent";
import UserComponent from "../components/users/UserComponent";
import Cart from "../components/carts/Cart";
import Details from "../components/products/Details";

const Routes = () => {


    return (
        <Switch>
            <Route exact path="/" component={ProductList}/>
            <Route exact path="/stocks" component={props => <StockComponent {...props}/>}></Route>
            <Route exact path="/orders" component={props => <OrderComponent {...props}/>}></Route>
            <Route exact path="/users" component={props => <UserComponent {...props}/>}></Route>
            <Route exact path="/cart" component={props => <Cart {...props}/>}></Route>
            <Route exact path="/products" component={props => <ProductList {...props}/>}></Route>
            <Route exact path="/details" component={props => <Details {...props}/>}></Route>
        </Switch>
    );
};
export default Routes;
