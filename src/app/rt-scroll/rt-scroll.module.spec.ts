import { RtScrollModule } from './rt-scroll.module';

describe('RtScrollModule', () => {
  let rtScrollModule: RtScrollModule;

  beforeEach(() => {
    rtScrollModule = new RtScrollModule();
  });

  it('should create an instance', () => {
    expect(rtScrollModule).toBeTruthy();
  });
});
