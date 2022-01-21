import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesTable from '../Components/ExpensesTable';
import Header from '../Components/Header';
import RegisterExpense from '../Components/RegisterExpense';
import RegisterEdit from '../Components/RegisterEdit';

class Wallet extends React.Component {
  render() {
    const { isEdit } = this.props;
    return (
      <div>
        <Header />
        {
          isEdit ? <RegisterEdit /> : <RegisterExpense />
        }
        <ExpensesTable />
      </div>
    );
  }
}

Wallet.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isEdit: state.wallet.isEdit,
});
export default connect(mapStateToProps, null)(Wallet);
