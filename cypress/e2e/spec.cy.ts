describe('Verify elements of Login page', () => {
  
  beforeEach(() => {
    cy.visit('/')
  })
  // HOMEPAGE
  it('successfully loads', () => {
    cy.visit('/') // dev URL
  })

  // Should have a e-mail input field
  it('has e-mail input field', () => {
    cy.visit('/')
    cy.get('input[name=username]').should('exist')
  })

  // Should have a password input field
  it('has password input field', () => {
    cy.get('input[name=password]').should('exist')
  })

  // Should have a submit button
  it('has submit login credentials button', () => {
    cy.get('button').should('have.text', 'Login')
  })

  // Should have a sign up link
  it('has signup link', () => {
    cy.get('a').should('have.text', 'Sign up');
  })

  // EXTENSIONS
  // Should have a forgot password link
  xit('has "forgot password" link', () => {
    cy.get('a').should('have.text', 'Forgot Password');
  });
  
  // Should have a 'Login through google' button

})

// SIGN UP PAGE
describe('Verify elements of Sign-Up page', () => {
  
  beforeEach(() => {
    cy.visit('/signup')
  })

  // SIGN UPPAGE
  it('successfully loads', () => {
    cy.visit('/signup') // dev URL
  })
  
  // Should have a name input field
  it('has name input field', () => {
    cy.get('input[name=username]').should('exist')
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
    cy.get('button').should('have.text', 'Sign Up')
  })

  // Should have go back to login page button
  it('has go to back to login page link', () => {
    cy.get('a').should('have.text', 'Back to Login')
  })
  
})
