import {SettingsProd} from '../conf/settings-prod';
import {Settings} from '../conf/settings';

export const environment = {
  production: true,
  /**
   * @deprecated Use Settings dev/prod instead
   */
  apiUrl: 'http://127.0.0.1:8000/api',
};

export const settings = new SettingsProd() as Settings;
