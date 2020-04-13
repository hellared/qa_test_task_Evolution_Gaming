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

export const openMemo = () => {
    cy.findByTitle('Memo')
        .click();
};

// Get description from list
export const getTestState = async (index) => {
    const testState = {};
    return cy.get('.msg2').eq(index)
        .then(($description) => $description.find('a').text())
                .then((description) => {
                    testState.description = description;
                    testState.index = index;
                    return testState
                }).promisify()
}

export const openDetails = (description) =>
    cy.contains(description).click();

// Select from list and check it on details page    
export const selectAdInRow = async (index) => {
    const testState = await getTestState(index);
    openDetails(testState.description);
    cy.get('#content_main_div').should('include.text', testState.description);
}
    // return getTestState(index)
    //     .then((testState) => {
    //         console.log(testState);
    //         openDetails(testState.description);
    //         cy.get('#content_main_div').should('include.text', testState.description);
    //     });
// }
// Get info from details
export const getTestStateDetails = () => {
    const testState = {};
    return cy.get('#content_sys_div_msg').then(($description) => {
        $description.text();
    })
        .then(($description) => $description.text())
        .then((description) => {
            testState.description = description;
            return testState
        });
};

// Get info from memo
export const getTestStateMemo = () => {
    const testState = {};
    return cy.get('#head_line').next().find('td').eq(2).then(($description) => {
        $description.find('a').text();
    })
        .then(($description) => $description.find('a').text())
        .then((shortDescription) => {
            testState.shortDescription = shortDescription;
            return testState;
        });
}
// Ad page from details
export const addToFavorites = () => {
    return getTestStateDetails().then((testState) => {
        cy.findByTitle('Add to favorites')
            .click();
        checkAlert('Attention', 'Advertisement added to favorites.', 'OK');
        confirmAlert();
        openMemo();
        const long = testState.description;
        getTestStateMemo().then((testState) => {
            const short = testState.shortDescription;
            expect(long.startsWith(short));
        })
    });
}

