/// <reference types="cypress" />
/// <reference types="jest" />

require("cypress-plugin-tab");

const customers = ["Aldi", "Kroger", "Whole Foods", "Needlers"];

describe("basic", () => {
  it("lets user add orders with different customers and order types", () => {
    cy.visit("localhost:3000");

    // add some orders
    addOrder(0, 1);
    addOrder(1, 2);
    addOrder(2, 0);
    addOrder(4, 0);
    addOrder(3, 3);
    addOrder(3, 2);
    addOrder(4, 1);
  });

  it("lets users filter by order ID", () => {
    cy.findByRole("textbox").click().type("6");

    cy.findAllByRole("checkbox").then((checkboxes) => {
      expect(checkboxes).to.have.lengthOf(1);
    });
  });

  it("let users filter orders by type", () => {
    cy.findByRole("combobox", {
      name: /type/i,
    }).select("Return");

    cy.findAllByRole("checkbox").then((orders) => {
      expect(orders).to.have.lengthOf(2);
    });

    cy.findByRole("combobox", {
      name: /type/i,
    }).select("All");
  });

  it("let users filter orders by customer", () => {
    cy.findByRole("combobox", {
      name: /customer/i,
    }).select("Aldi");

    cy.findAllByRole("checkbox").then((orders) => {
      expect(orders).to.have.lengthOf(2);
    });

    cy.findByRole("combobox", {
      name: /customer/i,
    }).select("All");
  });

  it("let users filter orders by type and customer", () => {
    cy.findByRole("combobox", {
      name: /customer/i,
    }).select("Aldi");

    cy.findAllByRole("checkbox").then((orders) => {
      expect(orders).to.have.lengthOf(2);
    });

    cy.findByRole("combobox", {
      name: /type/i,
    }).select("Return");

    cy.findAllByRole("checkbox").then((orders) => {
      expect(orders).to.have.lengthOf(1);
    });

    cy.findByRole("combobox", {
      name: /customer/i,
    }).select("All");

    cy.findByRole("combobox", {
      name: /type/i,
    }).select("All");
  });

  it("lets users delete an order", () => {
    cy.findAllByRole("checkbox").then((orders) => {
      const initialLength = orders.length;
      cy.findAllByRole("checkbox").first().check();
      cy.findByRole("button", { name: /delete/i }).click();
      cy.wait(100);
      cy.findAllByRole("checkbox").then((orders) => {
        expect(orders).to.have.lengthOf(initialLength - 1);
      });
    });
  });

  it("lets users select all orders", () => {
    cy.findByRole("button", { name: /select all/i }).click();
  });

  it("lets users delete all orders", () => {
    cy.findByRole("button", { name: /delete/i }).click();
  });

  it("resets to default if all orders are deleted", () => {
    cy.findByText(/no orders!/i);
    cy.findByRole("button", { name: /select all/i }).should("be.disabled");
    cy.findByRole("button", { name: /delete/i }).should("be.disabled");
  });
});

function addOrder(type, customer) {
  cy.wait(100);
  cy.findByRole("button", {
    name: /add order/i,
  }).click();
  cy.findByRole("combobox")
    .select(type)
    .tab()
    .type(customers[customer])
    .tab()
    .type("RT")
    .type("{enter}");
  cy.wait(100);
}
