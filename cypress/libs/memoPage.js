export const openFavorites = () => cy.visit('/favorites/');
export const IsMemoActive = () => cy.contains('Memo').should('have.class', 'a_menu_active');
export const getFavorites = () => cy.contains('Favorites');
export const getViewedAds = () => cy.contains('Recently viewed ads');
export const selectMessage = () => cy.contains('Select the messages.');

// Get info from memo
export const getDetails = async () => {
    const memo = {};
    return cy.get('.msg2').last()
        .then(($description) => $description.find('a').text().trim())
        .then((description) => {
            memo.description = description;
            return memo;
        }).promisify()
}

export const verifyAdFromDetails = async (details) => {
    const memo = await getDetails(details)
    expect(details.description, 'contains short description').to.contain(memo.description)
}
export const verifyAdFromList = async (details) => {
    const memo = await getDetails(details)
    expect(memo.description, 'contains short description').to.contain(details.description)
}