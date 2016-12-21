import { NgPhotoboothPage } from './app.po';

describe('ng-photobooth App', function() {
  let page: NgPhotoboothPage;

  beforeEach(() => {
    page = new NgPhotoboothPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
