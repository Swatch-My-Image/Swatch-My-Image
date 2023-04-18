describe('Verify elements of Login page', () => {
  
  before(() => {
    cy.exec('npm run build && npm run dev')
  })
  // HOMEPAGE
  it('successfully loads', () => {
    cy.visit('/login') // dev URL
  })

  // Should have a e-mail input field
  it('has e-mail input field', () => {
    cy.get('input[name=username]').should('exist')
  })

  // Should have a password input field
  it('has password input field', () => {
    cy.get('input[name=password]').should('exist')
  })

  // Should have a submit button
  it('has submit login credentials button', () => {
    cy.get('button').should('exist')
  })

  // Should have a sign up link
  it('has signup link', () => {
    cy.get('a[href*="signup"').should('exist');
  })

  // EXTENSIONS
  // Should have a forgot password link
  xit('has "forgot password" link', () => {
    cy.get('a[href*="request-reset"').should('exist');
  });
  
  // Should have a 'Login through google' button

})

// SIGN UP PAGE
describe('Verify elements of Sign-Up page', () => {
  before(() => {
    cy.exec('npm run build && npm run dev')
  })

  // SIGN UPPAGE
  it('successfully loads', () => {
    cy.visit('/signup') // dev URL
  })
  
  // Should have a name input field
  it('has name input field', () => {
    cy.get('input[name=name]').should('exist')
  })

  // Should have a e-mail input field
  it('has e-mail input field', () => {
    cy.get('input[name=username]').should('exist')
  })
  // Should have a password input field
  it('has password input field', () => {
    cy.get('input[name=password]').should('exist')
  })
  // Should have a validkey input field
  it('has validkey input field', () => {
    cy.get('input[name=validKey]').should('exist')
  })

  // Should have a submit button
  it('has submit login credentials button', () => {
    cy.get('button').should('exist')
  })

  // Should have go back to login page button
  it('has go to back to login page link', () => {
    cy.get('a[href*="login"').should('exist')
  })
  
})
