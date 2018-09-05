import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  change as changeReduxForm
} from 'redux-form';
import {
  Grid,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  Chip,
  Paper,
  TextField,
  MenuItem,
} from '@material-ui/core';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MuiButton from 'components/MuiButton';
import DatePicker from 'react-datepicker';
import FieldAmount from 'containers/Dashboard/components/FieldAmount';
import FieldSelectNew from 'containers/Dashboard/components/FieldSelectNew';
import {
  appendTag,
  pullTags,
  setOperationType,
  removeTag,
  changeCurrentTag,
  changeDate,
  applyFilter,
  resetFilter
} from '../../store/actions';
import moment from 'moment';
import _ from 'lodash';

@connect(({ Dashboard, Dashboard_Operations, Operations_List }) => ({ Dashboard, Dashboard_Operations, Operations_List }), ({
  appendTag,
  pullTags,
  setOperationType,
  removeTag,
  changeCurrentTag,
  changeDate,
  applyFilter,
  resetFilter,
  changeReduxForm
}))
@reduxForm({ form: 'Operations_Filter' })
export default class FilterOperation extends Component {

  handleChangeDate = ({ startDate, endDate }) => {
    startDate = startDate || this.props.Operations_List.date.date_from;
    endDate = endDate || this.props.Operations_List.date.date_to;

    if (startDate && startDate.isAfter(endDate)) {
      endDate = startDate;
    }

    this.props.changeDate({ date_from: startDate, date_to: endDate });
  }

  handleChangeStart = (startDate) => this.handleChangeDate({ startDate });

  handleChangeEnd = (endDate) => this.handleChangeDate({ endDate });

  handleSuggestionsFetchRequested = ({ value }) => {};

  handleSuggestionsClearRequested = () => {
    this.props.changeCurrentTag('');
  };

  renderSuggestionsContainer = (options) => {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square className={'tags-suggest_paper'}>
        {this.props.Operations_List.isLoadingTag ? this.renderLoaderTag() : children}
      </Paper>
    );
  };

  renderLoaderTag = () => (
    <MenuItem component={'div'}>
      <CircularProgress size={16} className={'tags_loading'} />
    </MenuItem>
  );

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem selected={isHighlighted} component={'div'}>
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  };

  getSuggestionValue = (tag) => {
    this.props.appendTag(tag);
    return tag.name;
  };

  renderInput = (inputProps) => {
    const { ref, ...other } = inputProps;

    return (
      <Grid container spacing={40}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputProps={{
              inputRef: ref,
              ...other,
            }}
          />
        </Grid>
      </Grid>
    );
  };

  getFilterTag = _.debounce(() => {
    this.props.pullTags();
  }, 400);

  handleRemoveTag = (id) => this.props.removeTag(id);

  handleChange = (event, { newValue }) => {
    this.props.changeCurrentTag(newValue);
    this.getFilterTag();
  };

  render() {
    return (
      <Grid container className={'operations-filter'}>
        <Grid item xs={12}>
          <Grid container justify={'flex-start'} spacing={40}>
            <Grid item xs={12} sm={6} md={2}>
              <Field
                name={'sum_from'}
                label={'Сумма от'}
                component={FieldAmount}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Field
                name={'sum_to'}
                label={'Сумма до'}
                component={FieldAmount}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Валюта</InputLabel>
                <Field
                  name={'currency'}
                  component={FieldSelectNew}
                >
                  <MenuItem value={''}>Все</MenuItem>
                  {this.props.Dashboard_Operations.currency.map((item) => <MenuItem key={item.id} value={item.id}>{`${item.name} (${item.symbol})`}</MenuItem>)}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Тип</InputLabel>
                <Field
                  name={'type'}
                  component={FieldSelectNew}
                  onChange={(e, value) => {
                    this.props.setOperationType(value === '' ? 0 : value);
                    this.props.changeReduxForm('Operations_Filter', 'category', null);
                  }}
                >
                  <MenuItem value={''}>Все</MenuItem>
                  {this.props.Dashboard.operation_type.map((item) => <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Наличие файлов</InputLabel>
                <Field
                  name={'has_files'}
                  component={FieldSelectNew}
                >
                  <MenuItem value={''}>Все</MenuItem>
                  <MenuItem value={0}>Нет</MenuItem>
                  <MenuItem value={1}>Есть</MenuItem>
                </Field>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container justify={'flex-start'} spacing={40}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Категория</InputLabel>
                <Field
                  name={'category'}
                  component={FieldSelectNew}
                >
                  <MenuItem value={''}>Все</MenuItem>
                  {
                    this.props.Dashboard_Operations.category
                      .map((item) => {
                        const { operation_type } = this.props.Operations_List;

                        return operation_type === 0 ? <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem> : operation_type === item.type ? <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem> : null;

                      })
                  }
                </Field>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={'react-datepicker-fuck-wrapper'}>
                <div className={'react-datepicker-fuck'}>
                  <DatePicker
                    selected={this.props.Operations_List.date.date_from}
                    selectsStart
                    startDate={this.props.Operations_List.date.date_from}
                    endDate={this.props.Operations_List.date.date_to}
                    onChange={this.handleChangeStart}
                    dateFormat={'DD/MM/YYYY'}
                    maxDate={moment().add(0, 'days')}
                    todayButton={'Today'}
                    fixedHeight
                    className={'date-datepicker-input'}
                    calendarClassName={'date-datepicker-v1'}
                    placeholderText={'Время от'}
                  />
                </div>
                <div className={'react-datepicker-fuck'}>
                  <DatePicker
                    selected={this.props.Operations_List.date.date_to}
                    selectsEnd
                    startDate={this.props.Operations_List.date.date_from}
                    endDate={this.props.Operations_List.date.date_to}
                    onChange={this.handleChangeEnd}
                    dateFormat={'DD/MM/YYYY'}
                    maxDate={moment().add(0, 'days')}
                    todayButton={'Today'}
                    fixedHeight
                    className={'date-datepicker-input'}
                    calendarClassName={'date-datepicker-v1'}
                    placeholderText={'Время до'}
                  />
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid container justify={'flex-start'} spacing={40}>
            <Grid item xs={12} md={6} className={'operations-filter_tags'}>
              <Grid item xs={12} className={'dashboard-form_item dashboard-form_tags-suggest'}>
                <Autosuggest
                  renderInputComponent={this.renderInput}
                  suggestions={this.props.Operations_List.filterTag}
                  renderSuggestionsContainer={this.renderSuggestionsContainer}
                  onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={{
                    placeholder: 'Введите имя тега',
                    value: this.props.Operations_List.tagName,
                    onChange: this.handleChange,
                  }}
                />
              </Grid>
              <Grid item xs={12} className={'dashboard-form_item dashboard-form_tags-list operations-filter_tags-list'}>
                {
                  this.props.Operations_List.tags.length !== 0 &&
                  this.props.Operations_List.tags.map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      onDelete={() => this.handleRemoveTag(tag.id)}
                    />
                  ))
                }
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} className={'operations-filter_tags'}>
              <Grid container justify={'flex-end'} spacing={40}>
                <Grid item xs={6} md={4}>
                  <MuiButton isLoading={this.props.Operations_List.isLoading}>
                    <Button
                      fullWidth
                      variant={'raised'}
                      disabled={this.props.Operations_List.isLoading}
                      onClick={this.props.resetFilter}
                    >
                      Сбросить
                    </Button>
                  </MuiButton>
                </Grid>
                <Grid item xs={6} md={4}>
                  <MuiButton isLoading={this.props.Operations_List.isLoading}>
                    <Button
                      fullWidth
                      variant={'raised'}
                      color={'primary'}
                      disabled={this.props.Operations_List.isLoading}
                      onClick={this.props.applyFilter}
                    >
                      Применить
                    </Button>
                  </MuiButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    );
  }
}
