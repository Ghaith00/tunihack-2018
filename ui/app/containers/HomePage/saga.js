/**
 * Gets the repositories of the user from Github
 */

import { call, put, all, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  LOAD_MUNICIPALITIES,
  ERROR_LOADING_DATA,
  GET_MUNICIPALITIES,
  GET_MAIN_PAGE,
  LOAD_METADATA,
  LOAD_PROJECTS,
} from './constants';

export function* loadMunicipalities(action) {
  const requestURL = `/governorates/${action.gov}/municipalities/${action.mun}`;
  const projectsURL = `/projects/governorates/${action.gov}/municipalities/${
    action.mun
  }`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };
  try {
    const accounts = yield call(request, requestURL, options);
    yield put({ type: LOAD_MUNICIPALITIES, payload: accounts });
    const projects = yield call(request, projectsURL, options);
    yield put({ type: LOAD_PROJECTS, payload: projects });
  } catch (err) {
    yield put({ type: ERROR_LOADING_DATA });
  }
}
export function* loadMainPage() {
  const requestURL = `/metadata`;
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };
  try {
    const accounts = yield call(request, requestURL, options);
    yield put({ type: LOAD_METADATA, payload: accounts });
  } catch (err) {
    yield put({ type: ERROR_LOADING_DATA });
  }
}
function* watchLoadMunicipalities() {
  yield takeLatest(GET_MUNICIPALITIES, loadMunicipalities);
}
function* watchLoadManPage() {
  yield takeLatest(GET_MAIN_PAGE, loadMainPage);
}
export default function* accountsSagas() {
  yield all([watchLoadMunicipalities(), watchLoadManPage()]);
}
