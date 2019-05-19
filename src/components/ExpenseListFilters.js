import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker, SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null
  };
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if ('date' === e.target.value) {
      this.props.sortByDate(); 
    }
    else {
      this.props.sortByAmount(); 
    }
  };
  render() {
    return (
      <div>
        <input 
          type="text" 
          value={this.props.filters.text}
          onChange={this.onTextChange} 
        />
        <select
          value={this.props.filters.sortBy}
          onChange={this.onSortChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocus}
          onFocusChange={this.onFocusChange}
          startDateId="expense-filter-start-date"
          endDateId="expense-filter-end-date"
          numberOfMonths={1}
          showClearDates={true}
          isOutsideRange={() => false}
        />

      </div>
    );
  }
}; 

const mapStateToProps = (state) => ({
  filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)), 
  setEndDate: (endDate) => dispatch(setEndDate(endDate)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
