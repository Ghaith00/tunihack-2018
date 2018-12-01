import { fromJS, List } from 'immutable';
import { LOAD_MUNICIPALITIES } from '../HomePage/constants';

export const initialState = fromJS({
  loading: true,
});
export default function AccountsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MUNICIPALITIES:
      return state.set('selectedMun', action.payload);
    default:
      return state;
  }
}
