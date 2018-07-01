/**
 * Generates a new page object
 */
function page(definition) {
  return Object.assign(
    {
      get html() {
        if (definition.scope) {
          return cy
            .get(definition.scope)
            .should('be.visible');
        }

        return cy.root();
      },

      should() {
        cy.should.apply(this.html, arguments);
        return this;
      },

      scoped(cb) {
        // We could use always this.html.within but this avoids the test to
        // print `WITHIN` clause if there's no need.
        if (definition.scope) {
          this.html.within(() => {
            cb();
          });
        } else {
          cb();
        }

        return this;
      }
    },
    definition
  );
}

/**
 * Fills an input with text
 *
 * @example
 *
 *     import { page, fillable } from "cypress-page-object";
 *
 *     const login = page({
 *       username: fillable('input#username')
 *       password: fillable('input#password')
 *     });
 *
 *     login
 *       .username("john@doe.com")
 *       .password("secret");
 *
 * @param {string} selector - CSS selector of the input element
 * @param {object} options - Additional options
 * @param {boolean} options.isHidden - True to force write hidden inputs
 * @return self
 */
function fillable(selector, options = {}) {
  return function(value){
    return this.scoped(() => {
      if (options.isHidden) {
        cy.get(selector).invoke('val', value);
      } else {
        cy.get(selector).type(value);
      }
    });
  };
}

/**
 * Clicks a button or input
 *
 * @example
 *
 *     import { page, clickable } from "cypress-page-object";
 *
 *     const login = page({
 *       submit: clickable('button[type="submit"]')
 *     });
 *
 *     login.submit();
 *
 * @param {string} selector - CSS selector of the element to click
 * @return self
 */
function clickable(selector) {
  return function() {
    return this.scoped(() => {
      cy.get(selector).click();
    });
  };
}

/**
 * Loads a page
 *
 * @example
 *
 *     import { page, visitable } from "cypress-page-object";
 *
 *     const login = page({
 *       visit: visitable('/login')
 *     });
 *
 *     login.visit();
 *     cy.url().should('include', '/form')
 *
 * @param {string} path - Full path of the page to load
 * @return self
 */
function visitable(path) {
  return function() {
    cy.visit(path);
    return this;
  };
}

module.exports = {
  clickable,
  fillable,
  page,
  visitable,
};
