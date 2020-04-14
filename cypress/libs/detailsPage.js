import * as alert from '../libs/alert';

export const openMemo = () => cy.findByTitle('Memo').click();
export const getMemoItems = () => cy.get('#mnu_fav_id').invoke('text');
export const getDetails = () => cy.get('#content_main_div')

export const clickFavorites = () => {
    cy.findByTitle('Add to favorites').click();
    alert.check('Attention', 'Advertisement added to favorites.');
    alert.confirm();
};
// Get description from details
export const getTestStateDetails = async () => {
    const testState = {};
    return cy.get('#msg_div_msg')
        .then(($description) => {
            testState.$description = $description;
            testState.description = $description.text().trim();
            return testState;
        }).promisify()
};
// Ad page from details
export const addToFavorites = async () => {
    const testState = await getTestStateDetails()
    clickFavorites();
    return testState;
};
