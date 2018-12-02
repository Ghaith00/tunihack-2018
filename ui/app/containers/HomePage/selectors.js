import { createSelector } from 'reselect';
import { Map } from 'immutable';
import { initialState } from './reducer';
const selectGlobal = state => state.get('global', initialState);
const selectOneAccount = state =>
  state.get('accounts', initialState).get('selectedAccount');
const makeSelectPresets = () =>
  createSelector(selectOneAccount, state => {
    if (state.get('presets')) {
      return state.get('presets').map(preset =>
        Map(preset)
          .update('nix', nix =>
            Map(nix)
              .update('nix_exprs', exprs => exprs.map(embeddNixExpressions))
              .update('nix_inputs', input => input.map(embeddInputs)),
          )
          .toJS(),
      );
    }
    return undefined;
  });

export { selectAccounts, makeSelectAccounts };
