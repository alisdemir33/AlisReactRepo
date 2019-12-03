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
       <Navi>
         

       </Navi>
       <Dashboard>

        </Dashboard>
       </Container>
   </div>
  );
}

export default App;
