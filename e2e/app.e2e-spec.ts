import { Ng2PhotoboothPage } from './app.po';

describe('ng2-photobooth App', function() {
  let page: Ng2PhotoboothPage;

  beforeEach(() => {
    page = new Ng2PhotoboothPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
