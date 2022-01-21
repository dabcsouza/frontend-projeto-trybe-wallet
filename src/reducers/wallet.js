import { EDIT_EXPENSE, GET_CURRENCY, SET_EDIT,
  SET_EXPENSE_TO_EDIT, SET_WALLET_EXPENSES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  expenseToEdit: [],
  isEdit: false,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_WALLET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, ...action.payload.expenses],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case SET_EXPENSE_TO_EDIT:
    return {
      ...state,
      expenseToEdit: action.payload,
    };
  case SET_EDIT:
    return {
      ...state,
      isEdit: action.payload,
    };
  case GET_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.payload)
        .filter((cur) => cur !== 'USDT'),
    };
  default:
    return state;
  }
};

export default walletReducer;
