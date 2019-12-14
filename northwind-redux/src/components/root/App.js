import React from "react";
import { Container } from "reactstrap";
import Navi from "../navi/Navi";
import Dashboard from "./Dashboard";
import { Route, Switch } from "react-router-dom";
import CartDetail from "../cart/CartDetail";
import AddOrUpdateProduct from "../products/AddOrUpdateProduct";
import NotFound from "../common/NotFound";

function App() {
  return (
    <div>
      <Container>
 <Navi></Navi>
      <Switch>
             
                <Route exact path="/" component={Dashboard}/>
                <Route path="/products" component={Dashboard}/>
                <Route path="/cart" component={CartDetail}/>
                <Route component={NotFound} />
              </Switch>      
       
      </Container>
    </div>
  );
}

export default App;
