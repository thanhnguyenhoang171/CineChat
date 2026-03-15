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

import permissionEn from '~/lib/locales/en/permission.json';
import permissionVi from '~/lib/locales/vi/permission.json';

import userEn from '~/lib/locales/en/user.json';
import userVi from '~/lib/locales/vi/user.json';

import castEn from '~/lib/locales/en/cast.json';
import castVi from '~/lib/locales/vi/cast.json';

import genreEn from '~/lib/locales/en/genre.json';
import genreVi from '~/lib/locales/vi/genre.json';

import movieEn from '~/lib/locales/en/movie.json';
import movieVi from '~/lib/locales/vi/movie.json';

import videoEn from '~/lib/locales/en/video.json';
import videoVi from '~/lib/locales/vi/video.json';

export const i18nResources = {
  en: {
    app: appEn,
    login: loginEn,
    register: registerEn,
    logout: logoutEn,
    role: roleEn,
    account: accountEn,
    permission: permissionEn,
    user: userEn,
    cast: castEn,
    genre: genreEn,
    movie: movieEn,
    video: videoEn,
  },
  vi: {
    app: appVi,
    login: loginVi,
    register: registerVi,
    logout: logoutVi,
    role: roleVi,
    account: accountVi,
    permission: permissionVi,
    user: userVi,
    cast: castVi,
    genre: genreVi,
    movie: movieVi,
    video: videoVi,
  },
} as const;
