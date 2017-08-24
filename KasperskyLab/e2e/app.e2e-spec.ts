import { KasperskyLabPage } from './app.po';

describe('kaspersky-lab App', () => {
  let page: KasperskyLabPage;

  beforeEach(() => {
    page = new KasperskyLabPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
