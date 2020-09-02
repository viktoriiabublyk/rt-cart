import { FlatpagesModule } from './flatpages.module';

describe('FlatpagesModule', () => {
  let flatpagesModule: FlatpagesModule;

  beforeEach(() => {
    flatpagesModule = new FlatpagesModule();
  });

  it('should create an instance', () => {
    expect(flatpagesModule).toBeTruthy();
  });
});
