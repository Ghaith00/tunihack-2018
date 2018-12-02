import { fromJS } from 'immutable';
import {
  LOAD_MUNICIPALITIES,
  LOAD_METADATA,
  CHANGE_BUDGET_YEAR,
} from '../HomePage/constants';

export const initialState = fromJS({
  loading: true,
});
export default function AccountsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MUNICIPALITIES:
      return state.set('selectedMun', action.payload);
    case LOAD_METADATA:
      return state.set('Metadata', action.payload);
    case CHANGE_BUDGET_YEAR:
      return state.set('budgetYear', action.payload);
    default:
      return state;
  }
}
