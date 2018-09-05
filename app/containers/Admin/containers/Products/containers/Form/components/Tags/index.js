import React, {
  Component,
} from 'react';
import { connect } from 'react-redux';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Autosuggest from 'react-autosuggest';
import {
  Grid,
  Chip,
  CircularProgress,
  Paper,
  MenuItem,
  TextField,
} from '@material-ui/core';
import {
  pullTags,
  appendTag,
  addNewTag,
  removeTag,
  changeCurrentTag,
} from '../../store/actions';
import _ from 'lodash';

@connect(({ Operations_Form }) => ({ Operations_Form }), ({
  pullTags,
  appendTag,
  addNewTag,
  removeTag,
  changeCurrentTag,
}))

export default class Tags extends Component {

  getSuggestionValue = (tag) => {
    this.props.appendTag(tag);

    return tag.name ? tag.name : '';
  };

  getFilterTag = _.debounce(() => {
    this.props.pullTags();
  }, 400);

  handleSuggestionsFetchRequested = ({ value }) => {};

  handleSuggestionsClearRequested = () => {
    this.props.changeCurrentTag('');
  };

  handleAddNewTag = (e) => {
    e.preventDefault();
    this.props.addNewTag();
    this.props.changeCurrentTag('');
  };

  handleRemoveTag = (id) => this.props.removeTag(id);

  handleChange = (event, { newValue }) => {
    this.props.changeCurrentTag(newValue);
    this.getFilterTag();
  };

  renderSuggestionsContainer = (options) => {
    const { containerProps, children } = options;

    return (
      <Paper {...containerProps} square className={'tags-suggest_paper'}>
        {this.props.Operations_Form.isLoadingTag ? this.renderLoaderTag() : children}
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

  renderInput = (inputProps) => {
    const { ref, ...other } = inputProps;

    return (
      <form className={'tags-suggest_form'} onSubmit={this.handleAddNewTag}>
        <Grid container spacing={40}>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              InputProps={{
                inputRef: ref,
                ...other,
              }}
            />
          </Grid>
        </Grid>
      </form>
    );
  };

  render() {
    return (
      <Grid container spacing={40} >
        <Grid item xs={12} className={'dashboard-form_item dashboard-form_tags-suggest'}>
          <Autosuggest
            renderInputComponent={this.renderInput}
            suggestions={this.props.Operations_Form.filterTag}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={{
              placeholder: 'Введите имя тега',
              value: this.props.Operations_Form.tagName,
              onChange: this.handleChange,
            }}
          />
        </Grid>
        <Grid item xs={12} className={'dashboard-form_item dashboard-form_tags-list'}>
          {
            this.props.Operations_Form.tags.length !== 0 &&
            this.props.Operations_Form.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                onDelete={() => this.handleRemoveTag(tag.id)}
              />
            ))
          }
        </Grid>
      </Grid>
    );
  }
}
