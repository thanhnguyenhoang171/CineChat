import appEn from '~/lib/locales/en/app.json';
import appVi from '~/lib/locales/vi/app.json';

import loginEn from '~/lib/locales/en/login.json';
import loginVi from '~/lib/locales/vi/login.json';

import registerEn from '~/lib/locales/en/register.json';
import registerVi from '~/lib/locales/vi/register.json';

import logoutEn from '~/lib/locales/en/logout.json';
import logoutVi from '~/lib/locales/vi/logout.json';

import roleEn from '~/lib/locales/en/role.json';
import roleVi from '~/lib/locales/vi/role.json';

import accountEn from '~/lib/locales/en/account.json';
import accountVi from '~/lib/locales/vi/account.json';

export const i18nResources = {
  en: {
    app: appEn,
    login: loginEn,
    register: registerEn,
    logout: logoutEn,
    role: roleEn,
    account: accountEn,
  },
  vi: {
    app: appVi,
    login: loginVi,
    register: registerVi,
    logout: logoutVi,
    role: roleVi,
    account: accountVi,
  },
} as const;
