import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("<App />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    cy.mount(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
