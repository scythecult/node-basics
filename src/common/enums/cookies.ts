import { CookieOptions } from 'express';
import { AppRoute } from './api.js';

export const CookieName = {
  TRACK_FLAG: 'fancyshop-track-id',
};

export const CookieOption: CookieOptions = {
  httpOnly: true,
  path: AppRoute.ROOT,
  secure: false,
  sameSite: 'lax',
  maxAge: 36000,
};
