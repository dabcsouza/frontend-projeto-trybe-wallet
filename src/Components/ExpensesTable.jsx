import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import currencyData from '../CurrencyData/data';
import { editWalletExpense, setEditExpense, setEditField } from '../actions';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);
    this.renderThead = this.renderThead.bind(this);
    this.renderTbody = this.renderTbody.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleDelete(id) {
    const { expenses, editExpenses } = this.props;
    const newExpenses = expenses.filter((expense) => id !== expense.id);
    editExpenses(newExpenses);
  }

  handleEdit(id) {
    const { setEdit, setExpense, expenses } = this.props;
    const expenseToEdit = expenses.filter((expense) => expense.id === id);
    localStorage.setItem('editValue', JSON.stringify(expenseToEdit));
    setEdit(true);
    setExpense(expenseToEdit);
  }

  renderThead() {
    return (
      <thead className="thead-light">
        <tr>
          <th scope="col">
            Descrição
          </th>
          <th scope="col">
            Tag
          </th>
          <th scope="col">
            Método de pagamento
          </th>
          <th scope="col">
            Valor
          </th>
          <th scope="col">
            Moeda
          </th>
          <th scope="col">
            Câmbio utilizado
          </th>
          <th scope="col">
            Valor convertido
          </th>
          <th scope="col">
            Moeda de conversão
          </th>
          <th scope="col">
            Editar/Excluir
          </th>
        </tr>
      </thead>
    );
  }

  renderTbody() {
    const { expenses } = this.props;
    return (
      <tbody>
        {
          expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>
                { `${currencyData[expense.currency].symbol} ${expense.value}` }
              </td>
              <td>{ expense.exchangeRates[expense.currency].name.split('/')[0] }</td>
              <td>
                { `${currencyData.BRL.symbol} ${Number(expense
                  .exchangeRates[expense.currency].ask).toFixed(2).toString()}` }
              </td>
              <td>
                { `${currencyData.BRL.symbol} ${(Math
                  .round((Number(expense.exchangeRates[expense
                    .currency].ask) * Number(expense.value)) * 100) / 100)
                  .toFixed(2).toString()}` }
              </td>
              <td>Real</td>
              <td>
                <button
                  className="btn btn-warning"
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.handleEdit(expense.id) }
                >
                  <FontAwesomeIcon icon={ faEdit } />
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.handleDelete(expense.id) }
                >
                  <FontAwesomeIcon icon={ faTrashAlt } />
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    );
  }

  render() {
    return (
      <table className="table table-striped table-dark">
        { this.renderThead() }
        { this.renderTbody() }
      </table>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  editExpenses: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  setExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  editExpenses: (state) => dispatch(editWalletExpense(state)),
  setEdit: (state) => dispatch(setEditField(state)),
  setExpense: (state) => dispatch(setEditExpense(state)),
});

const mapStateToProps = ((state) => ({
  expenses: state.wallet.expenses,
}));

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
