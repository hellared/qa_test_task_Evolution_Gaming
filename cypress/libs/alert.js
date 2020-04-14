export const alert = '#alert_dv';
export const alertTitle = '.alert_head_left';
export const alertMessage = '#alert_msg';
export const alertConfirmButton = '#alert_ok';
export const alertCloseButton = '.alert_head_right';

export const close = () => cy.get(alertCloseButton).click();
export const confirm = () => cy.get(alertConfirmButton).click();

export const check = (title, message, confirm) =>
    cy.get(alert).within(() => {
        cy.get(alertTitle).should('have.text', title);
        cy.get(alertMessage).should('have.text', message);
        cy.get(alertConfirmButton).should('have.text', confirm);
    });
