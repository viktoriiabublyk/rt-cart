import { RtFormsModule } from './rt-forms.module';

describe('RtFormsModule', () => {
  let rtFormsModule: RtFormsModule;

  beforeEach(() => {
    rtFormsModule = new RtFormsModule();
  });

  it('should create an instance', () => {
    expect(rtFormsModule).toBeTruthy();
  });
});
