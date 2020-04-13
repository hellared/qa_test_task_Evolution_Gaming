// Main Page
export const open = () => cy.visit('/');
export const selectSection = (name) =>
    cy.findByText(name).click();
export const selectSubsection = (name) =>
    cy.findByText(name).click();

// Alert
export const alert = '#alert_dv';
export const alertTitle = '.alert_head_left';
export const alertMessage = '#alert_msg';
export const alertConfirmButton = '#alert_ok';
export const alertCloseButton = '.alert_head_right';

export const closeAlert = () => cy.get(alertCloseButton).click();
export const confirmAlert = () => cy.get(alertConfirmButton).click();

export const checkAlert = (title, message, confirm) =>
    cy.get(alert).within(() => {
        cy.get(alertTitle).should('have.text', title);
        cy.get(alertMessage).should('have.text', message);
        cy.get(alertConfirmButton).should('have.text', confirm);
    });

// Ad List Page
export const openAdList = () => {
    cy.visit('/animals/cats');
}
export const getHeader = () =>
    cy.get('h2');
export const selectAdInRow = (index) => {
    const testState = {};
    cy.get('#head_line').parent().find('tr').eq(index)
        .within(() => {
            cy.get('td').eq(2).then(($description) => {
                const description = $description.find('a').text();
                expect(description).is.not.empty;
            })
                .then(($description) => $description.find('a').text())
                .then((description) => {
                    testState.description = description;
                    cy.root().click();
                });
        })
        .then(() => {
            cy.get('#content_main_div').should('include.text', testState.description);
        });
}

// Memo Page
export const openFavorites = () => cy.visit('/favorites/');
export const IsMemoActive = () =>
    cy.contains('Memo').should('have.class', 'a_menu_active');
export const getFavorites = () =>
    cy.contains('Favorites');
export const getViewedAds = () =>
    cy.contains('Recently viewed ads');
export const selectMessage = () =>
    cy.contains('Select the messages.');

// Ad page
export const addToFavorites = () =>
    cy.findByTitle('Add to favorites')
        .click();
export const openMemo = () => {
    cy.findByTitle('Memo')
        .click();
};    