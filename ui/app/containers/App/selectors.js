import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { initialState } from './reducer';
export const embeddMunicipalities = item => {
  const rObj = {};
  rObj[item.name] = [...item.children];
  return rObj;
};
const selectRouter = state => state.get('router');
const selectGlobal = state => state.get('global', initialState);

const makeSelectMetadata = () =>
  createSelector(selectGlobal, globalState => {
    const meta = globalState.get('Metadata');
    if (!meta)
      return {
        municipalityData: {},
        govData: [],
      };
    const municipalityData = {};
    console.log(meta.map(item => embeddMunicipalities(item)));
    meta.map(item => embeddMunicipalities(item)).forEach(element => {
      municipalityData[Object.keys(element)[0]] = [
        ...element[Object.keys(element)[0]],
      ];
    });
    return {
      municipalityData,
      govData: [...meta.map(item => item.name)],
    };
  });

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );
export { makeSelectLocation, makeSelectMetadata };
