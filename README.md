# Cypress Page Object

Represent the screens of your website as a series of objects in your [Cypress](https://www.cypress.io/) test suite. This library addon eases the construction of these objects for your acceptance/integration/end to end tests.

## Table of content

* [Quick Start](#quick-start)
* [What is a Page Object?](#what-is-a-page-object?)
* [API](#api)
  * [`page`](#page)
  * [`clickable`](#clickable)
  * [`fillable`](#fillable)
  * [`visitable`](#visitable)
* [Development](#development)
* [License](#license)

## Quick Start

Install the library using npm

```js
$ npm install --save-dev cypress-page-object
```

After installing the library you can create a page object inside your project.

Let's assume the website you want to test has a http://example.com/login.html page, we can test a failed login. Create a new integration and define a page object as follows.

```js
import { page, visitable, fillable, clickable } from "cypress-page-object";

const loginPage = page({
  visit: visitable('/login'),
  fillUsername: fillable('#username'),
  fillPassword: fillable('#password'),
  submit: clickable('[type="submit"]'),

  errorMessage() {
    return cy.get('.error-message');
  }
});

context('My Awesome WebSite', () => {

  it('logs into the website', () => {
    loginPage
      .visit()
      .fillUsername('john@example.com')
      .fillPassword('wrong password')
      .submit()
      .errorMessage()
      .should('contain', 'Wrong username and password');
  });

});
```

As you can see, by having a page object we extract away the CSS selectors from the test making it more readable.

## What is a Page Object?

An excerpt from the Selenium Wiki

> Within your web app's UI there are areas that your tests interact with. A Page
> Object simply models these as objects within the test code. This reduces the
> amount of duplicated code and means that if the UI changes, the fix need only
> be applied in one place.

The pattern was first introduced by the Selenium

You can find more information about this design pattern here:

* [Page Objects - Selenium wiki](https://github.com/SeleniumHQ/selenium/wiki/PageObjects)
* [PageObject - Martin Fowler](http://martinfowler.com/bliki/PageObject.html)

## API

### `page`

Creates a new page object. The new page object contains some utilities to make
your tests a bit more DRY and easier to read.

**Example**

```js
import { page, visitable, fillable, clickable } from "cypress-page-object";

const loginPage = page({
  visit: visitable('/login'),
  fillUsername: fillable('#username'),
  fillPassword: fillable('#password'),
  submit: clickable('[type="submit"]'),

  errorMessage() {
    return cy.get('.error-message');
  }
});

context('My Awesome WebSite', () => {

  it('logs into the website', () => {
    loginPage
      .visit()
      .fillUsername('john@example.com')
      .fillPassword('wrong password')
      .submit()
      .errorMessage()
      .should('contain', 'Wrong username and password');
  });

});
```

You can add any property to your page object and they will be accessible from your tests.

```js
import { page } from "cypress-page-object";

const loginPage = page({});

loginPage.should('contain', 'My text');
```



### `clickable`

Clicks a button or input

**Example**

```js
import { page, clickable } from "cypress-page-object";

const login = page({
  submit: clickable('button[type="submit"]')
});

login.submit();
```

| Parameter          | Type    | Description |
| ---                | ---     | --- |
| `selector`         | string  | CSS selector of the element to click |

### `fillable`

Fills an input with text

**Example**

```js
import { page, fillable } from "cypress-page-object";

const login = page({
  username: fillable('input#username')
  password: fillable('input#password')
});

login
  .username("john@doe.com")
  .password("secret");
```

| Parameter          | Type    | Description |
| ---                | ---     | --- |
| `selector`         | string  | CSS selector of the input element |
| `options`          | object  | Additional options |
| `options.isHidden` | boolean | True to force write hidden inputs |

### `visitable`

Loads a page

**Example**

```js
import { page, visitable } from "cypress-page-object";

const login = page({
  visit: visitable('/login')
});

login.visit();
cy.url().should('include', '/form')
```

| Parameter | Type   | Description |
| ---       | ---    | --- |
| `path`    | string | Full path of the page to load |

## Development

TBA

## License

cypress-page-object is licensed under the MIT license.

See [LICENSE](./LICENSE) for the full license text.
