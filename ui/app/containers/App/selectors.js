import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { initialState } from './reducer';
import uuid from 'uuid';
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
  const rObj = {};
  // rObj[item.name] = [...item.children];
  rObj.key = uuid.v1();
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
const makeSelectBuget = () =>
  createSelector(selectGlobal, globalState => {
    const year = globalState.get('budgetYear');
    if (year === undefined) {
      return null;
    }
    const budgetOfYear = globalState.get('selectedMun')
      ? globalState.get('selectedMun')[year]
      : null;
    const municipalityName = globalState.get('selectedMun')
      ? globalState.get('selectedMun').name
      : null;
    if (budgetOfYear !== null) {
      const formattedBudget = [];
      const outcome = budgetOfYear.outcome
        ? formatBudget(budgetOfYear.outcome, 'النفقات', municipalityName)
        : null;
      const income = budgetOfYear.income
        ? formatBudget(budgetOfYear.income, 'المداخيل', municipalityName)
        : null;
      outcome.total = outcome.children
        ? outcome.children.map(kid => Number(kid.total)).reduce((x, y) => x + y)
        : '';
      income.total = income.children
        ? income.children.map(kid => Number(kid.total)).reduce((x, y) => x + y)
        : '';
      formattedBudget.push(outcome);
      formattedBudget.push(income);

      return formattedBudget;
    }
    return null;
  });
const makeSelectBudgets = () =>
  createSelector(selectGlobal, globalState => {
    const municipalityName = globalState.get('selectedMun')
      ? globalState.get('selectedMun').name
      : null;
    if (!globalState.get('selectedMun')) return null;
    return Object.keys(globalState.get('selectedMun'))
      .filter(item => item !== 'name')
      .map(key => {
        const budget = globalState.get('selectedMun')[key];
        const formattedBudget = [];
        const outcome = budget.outcome
          ? formatBudget(budget.outcome, 'النفقات', municipalityName)
          : null;
        const income = budget.income
          ? formatBudget(budget.income, 'المداخيل', municipalityName)
          : null;
        outcome.total = outcome.children
          ? outcome.children
              .map(kid => Number(kid.total))
              .reduce((x, y) => x + y)
          : '';
        income.total = income.children
          ? income.children
              .map(kid => Number(kid.total))
              .reduce((x, y) => x + y)
          : '';
        formattedBudget.push(outcome);
        formattedBudget.push(income);
        const rObj = {};
        rObj[key] = formattedBudget;
        return rObj;
      });
  });
const makeSelectBudgetYears = () =>
  createSelector(
    selectGlobal,
    state =>
      state.get('selectedMun')
        ? Object.keys(state.get('selectedMun')).filter(
            item =>
              item !== 'name' &&
              (Object.keys(state.get('selectedMun')[item].income).length ||
                Object.keys(state.get('selectedMun')[item].outcome).length),
          )
        : [],
  );

const makeSelectProjects = () =>
  createSelector(
    selectGlobal,
    state => (state.get('projects') ? state.get('projects').projects : []),
  );
const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

export {
  makeSelectLocation,
  makeSelectBudgetYears,
  makeSelectBuget,
  makeSelectMetadata,
  makeSelectBudgets,
  makeSelectProjects,
};
