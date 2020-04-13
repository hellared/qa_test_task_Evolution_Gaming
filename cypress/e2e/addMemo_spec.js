import * as mainPage from '../libs/mainPage';

describe('Add memo feature', function () {
    before('Open list', function () {
        mainPage.openAdList();
    })
    it.only('Add memo from the list', function () {
        cy.get('#mnu_fav_id').invoke('text').should('be.empty')
        mainPage.selectAdInRow(1);
        mainPage.addToFavorites();
    });
    it.skip('Add multiple items to memo', function () {
        cy.contains('Memo').click();
        mainPage.IsMemoActive();
    });
    it('testState', function () {
     mainPage.selectAdInRow(1);
    })
});