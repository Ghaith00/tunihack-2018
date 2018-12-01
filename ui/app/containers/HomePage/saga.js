/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  LOAD_MUNICIPALITIES,
  ERROR_LOADING_DATA,
  GET_MUNICIPALITIES,
} from './constants';

export function* loadMunicipalities() {
  const requestURL = `/municipalities`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };
  try {
    const accounts = yield call(request, requestURL, options);
    yield put({ type: LOAD_MUNICIPALITIES, payload: accounts });
  } catch (err) {
    yield put({ type: ERROR_LOADING_DATA });
  }
}

function* watchLoadMunicipalities() {
  yield takeLatest(GET_MUNICIPALITIES, loadMunicipalities);
}
export default function* accountsSagas() {
  yield all([watchLoadMunicipalities()]);
}
