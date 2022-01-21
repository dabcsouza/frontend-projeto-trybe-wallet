import quoteCurrency from '../Services/currencyQuoteAPI';

export const SET_USER = 'SET_USER';
export const SET_WALLET_EXPENSES = 'SET_WALLET_EXPENSES';
export const GET_CURRENCY = 'GET_CURRENCY';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SET_EDIT = 'SET_EDIT';
export const SET_EXPENSE_TO_EDIT = 'SET_EXPENSE_TO_EDIT';

export const setUser = (payload) => (
  {
    type: SET_USER,
    payload,
  }
);

export const setWalletExpenses = (payload) => (
  {
    type: SET_WALLET_EXPENSES,
    payload,
  }
);

export const editWalletExpense = (payload) => (
  {
    type: EDIT_EXPENSE,
    payload,
  }
);

export const getCurrencyQuote = (payload) => (
  {
    type: GET_CURRENCY,
    payload,
  }
);

export const setEditField = (payload) => (
  {
    type: SET_EDIT,
    payload,
  }
);

export const setEditExpense = (payload) => (
  {
    type: SET_EXPENSE_TO_EDIT,
    payload,
  }
);

export const fetchCurrencyQuote = (currency) => ((dispatch) => (
  quoteCurrency(currency)
    .then((r) => dispatch(getCurrencyQuote(r)))
));
