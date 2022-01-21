import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyQuote, setWalletExpenses } from '../actions';
import quoteCurrency from '../Services/currencyQuoteAPI';

class RegisterExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    };
    this.renderSelects = this.renderSelects.bind(this);
    this.renderSelectCourrency = this.renderSelectCourrency.bind(this);
    this.renderSelectMethod = this.renderSelectMethod.bind(this);
    this.renderSelectTag = this.renderSelectTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderButtonAdd = this.renderButtonAdd.bind(this);
    this.renderButtonEdit = this.renderButtonEdit.bind(this);
  }

  async componentDidMount() {
    const { fetchQuote } = this.props;
    await fetchQuote('all');
  }

  async handleSubmit(e) {
    e.preventDefault();
    const defaultState = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    };

    const { value, description, currency, method, tag } = this.state;
    const { setExpenses, expenses } = this.props;
    const momentQuote = await quoteCurrency('all');
    const expenseObj = {
      expenses: [{
        id: expenses.length,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: momentQuote,
      }],
    };
    setExpenses(expenseObj);
    this.setState(defaultState);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  renderButtonAdd() {
    return (
      <button className="btn btn-success" type="button" onClick={ this.handleSubmit }>
        Adicionar despesa
      </button>
    );
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
        { this.renderButtonAdd() }
      </form>
    );
  }
}

RegisterExpense.propTypes = {
  setExpenses: PropTypes.func.isRequired,
  fetchQuote: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEdit: state.wallet.isEdit,
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenses: (state) => dispatch(setWalletExpenses(state)),
  fetchQuote: (courrency) => dispatch(fetchCurrencyQuote(courrency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterExpense);
