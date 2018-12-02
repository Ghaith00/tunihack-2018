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
function formatBudget(budget, budgetItemName, municipalityName) {
  console.log(municipalityName);

  const rObj = {};
  // rObj[item.name] = [...item.children];
  rObj.key = municipalityName + budgetItemName;
  if (budget.total !== undefined) {
    rObj.total = budget.total;
  } else if (typeof budget === 'string') {
    rObj.total = budget;
    rObj.name = budgetItemName;
    return rObj;
  } else {
    rObj.total = '';
  }
  rObj.name = budgetItemName;
  if (
    (Object.keys(budget).includes('total') && Object.keys(budget).length > 1) ||
    (!Object.keys(budget).includes('total') && Object.keys(budget).length > 0)
  ) {
    rObj.children = [
      ...Object.keys(budget)
        .filter(key => key !== 'total')
        .map(key => formatBudget(budget[key], key, municipalityName)),
    ];
  }
  return rObj;
}
const makeSelectBuget = year =>
  createSelector(selectGlobal, globalState => {
    const budgetOfYear = globalState.get('selectedMun')
      ? globalState.get('selectedMun')[year]
      : null;
    const municipalityName = globalState.get('selectedMun')
      ? globalState.get('selectedMun').name
      : null;
    if (budgetOfYear !== null) {
      const formattedBudget = [];
      const outcome = budgetOfYear.outcome
        ? formatBudget(budgetOfYear.outcome, 'outcome', municipalityName)
        : null;
      const income = budgetOfYear.income
        ? formatBudget(budgetOfYear.outcome, 'income', municipalityName)
        : null;

      formattedBudget.push(outcome);
      formattedBudget.push(income);

      return formattedBudget;
    }
    return null;
  });

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );
export { makeSelectLocation, makeSelectBuget, makeSelectMetadata };
