import * as listPage from '../libs/listPage';
import * as detailsPage from '../libs/detailsPage';
import * as memoPage from '../libs/memoPage';

describe('Add memo feature', function () {
    it('Add memo from ad details page', function () {
        listPage.open();
        listPage.selectAdInRow(2).then((description) => {
            detailsPage.getDetails().should('contain.text', description)
        });
        detailsPage.addToFavorites().then((detailsDescription) => {
            detailsPage.openMemo();
            memoPage.verifyAdFromDetails(detailsDescription);
        });
    });
    it('Add memo from list page', function () {
        listPage.open();
        listPage.selectRow(2).then((description) => {
            listPage.addToFavorites();
            listPage.openMemo();
            memoPage.verifyAdFromList(description)
        })
    });
    afterEach('Clear cookies', function () {
        cy.clearCookies();
    })
});