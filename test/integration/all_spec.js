import { page, visitable } from '../../';

const dummy = page({
  visit: visitable('/form')
});

context('.visitable', () => {
  it('works', () => {
    dummy.visit();

    cy.url()
      .should('include', '/form')
  });
});
