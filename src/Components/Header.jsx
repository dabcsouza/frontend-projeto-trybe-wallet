import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header">
        <h4
          className="email-field"
          data-testid="email-field"
        >
          <FontAwesomeIcon icon={ faUserCircle } size="2x" />
          { email }
        </h4>
        <section className="expense-info">
          <p className="expense" data-testid="total-field">
            { `Total: R$ ${
              expenses.length === 0 ? 0.00.toFixed(2) : (
                new Intl.NumberFormat().format(expenses.reduce((prev, curr) => (
                  (Number(curr.exchangeRates[curr.currency]
                    .ask) * curr.value) + prev
                ), 0).toFixed(2)).toString()
              )
            } `}
          </p>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps, null)(Header);
