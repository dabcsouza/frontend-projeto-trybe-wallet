import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editWalletExpense, setEditField } from '../actions';

class RegisterEdit extends Component {
  constructor(props) {
    super(props);
    const editState = JSON.parse(localStorage.getItem('editValue'))[0];
    this.state = {
      value: editState.value,
      description: editState.description,
      currency: editState.currency,
      method: editState.method,
      tag: editState.tag,
    };
    this.renderSelects = this.renderSelects.bind(this);
    this.renderSelectCourrency = this.renderSelectCourrency.bind(this);
    this.renderSelectMethod = this.renderSelectMethod.bind(this);
    this.renderSelectTag = this.renderSelectTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.renderButtonEdit = this.renderButtonEdit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleEdit(e) {
    e.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { expenses, expenseToEdit, editExpenses, setEdit } = this.props;
    const toEdit = { ...expenseToEdit[0] };
    const position = expenses.map((expense) => expense.id).indexOf(toEdit.id);
    const newExpenses = [...expenses];
    const expenseObjEdited = {
      id: toEdit.id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: toEdit.exchangeRates,
    };
    newExpenses[position] = expenseObjEdited;
    editExpenses(newExpenses);
    setEdit(false);
  }

  renderButtonEdit() {
    return (
      <button className="btn btn-success" type="submit" onClick={ this.handleEdit }>
        Editar despesa
      </button>
    );
  }

  renderSelectCourrency() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <label htmlFor="currency-input">
        <select
          id="currency-input"
          name="currency"
          className="form-select"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
        >
          {
            currencies.map((cur) => (
              <option name={ cur } key={ cur } data-testid={ cur }>{ cur }</option>
            ))
          }
        </select>
      </label>
    );
  }

  renderSelectMethod() {
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const { method } = this.state;
    return (
      <label htmlFor="method-input">
        <select
          id="method-input"
          name="method"
          className="form-select"
          onChange={ this.handleChange }
          value={ method }
          data-testid="method-input"
        >
          {
            methods.map((mtd, index) => (
              <option value={ mtd } key={ index }>{mtd}</option>
            ))
          }
        </select>
      </label>
    );
  }

  renderSelectTag() {
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { tag } = this.state;
    return (
      <label htmlFor="category-input">
        <select
          name="tag"
          id="category-input"
          className="form-select"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          {
            tags.map((category) => (
              <option value={ category } key={ category }>{category}</option>
            ))
          }
        </select>
      </label>
    );
  }

  renderSelects() {
    return (
      <>
        { this.renderSelectCourrency() }
        { this.renderSelectMethod() }
        { this.renderSelectTag() }
      </>
    );
  }

  render() {
    const { value, description } = this.state;
    return (
      <form className="wallet-form-container">
        <label htmlFor="value-input">
          <input
            type="number"
            name="value"
            id="value-input"
            data-testid="value-input"
            className="form-control"
            placeholder="Valor"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          <input
            type="text"
            name="description"
            id="description-input"
            data-testid="description-input"
            className="form-control"
            placeholder="Descrição"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        { this.renderSelects() }
        { this.renderButtonEdit() }
      </form>
    );
  }
}

RegisterEdit.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  expenseToEdit: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  editExpenses: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenses: (state) => dispatch(editWalletExpense(state)),
  setEdit: (state) => dispatch(setEditField(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterEdit);
