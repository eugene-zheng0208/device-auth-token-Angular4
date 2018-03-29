import { Angular4DeviseTokenAuthPage } from './app.po';

describe('angular4-devise-token-auth App', () => {
  let page: Angular4DeviseTokenAuthPage;

  beforeEach(() => {
    page = new Angular4DeviseTokenAuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
