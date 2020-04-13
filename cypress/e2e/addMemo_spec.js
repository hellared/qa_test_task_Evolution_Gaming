import * as mainPage from '../libs/mainPage';

describe('Add memo feature', function () {
    before('Open list', function () {
        mainPage.openAdList();
    })
    it('Add memo from the list', function () {
        cy.get('#mnu_fav_id').invoke('text').should('be.empty')
        mainPage.selectAdInRow(1)
        mainPage.addToFavorites();
        mainPage.checkAlert('Attention', 'Advertisement added to favorites.', 'OK');
        mainPage.closeAlert();
        cy.get('#mnu_fav_id').invoke('text').should('include', 1);
        mainPage.openMemo();
    });
    it.skip('Add multiple items to memo', function () {
        cy.contains('Memo').click();
        mainPage.IsMemoActive();
    });
});