import promisify from 'cypress-promise';
import * as alert from '../libs/alert';

export const open = () => {
    cy.visit('/');
    cy.findByText('Cats, kittens').click()
}
export const openMemo = () => cy.findByTitle('Memo').click();

export const getMemoItems = () => cy.get('#mnu_fav_id').invoke('text');
export const getHeader = () => cy.get('h2');

export const addToFavorites = () => {
    cy.get('#a_fav_sel').click();
    alert.confirm();
};
export const checkRow = (index) => cy.get('.msga2.pp0').eq(index).find('input').check();
export const openDetails = (index) => cy.get('.msg2').eq(index).click()

// Get description from list
export const getTestStateList = async (index) => {
    const testState = {};
    return cy.get('.msg2').eq(index)
        .then(($description) => $description.find('a').text().trim())
        .then((description) => {
            testState.description = description;
            testState.index = index;
            return testState
        }).promisify()
}
// Select from list and check it on details page    
export const selectAdInRow = async (index) => {
    const testState = await getTestStateList(index)
    openDetails(index);
    return testState.description;
}
export const selectRow = async (index) => {
    const testState = await getTestStateList(index)
    checkRow(index);
    return testState;
}

export const selectMultipleAds = (rows = []) => {
    rows.forEach(row => {
        selectRow(row);
    });
}
export const checkMemoIsAdded = async (index) => {
    const testState = await getTestStateList(index)
    selectRow(index);
    addToFavoritesFromList();
    openMemo();
    const memoState = await getTestStateMemo(testState)
    expect(memoState.description, 'contains short description').to.contain(testState.description)
}