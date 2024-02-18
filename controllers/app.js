import { AppCodes } from '../utils.js';

const getNotFound = (req, res) => {
  res.status(AppCodes.NOT_FOUND).render('not-found', { pageTitle: '404 not found' });
};

export { getNotFound };
