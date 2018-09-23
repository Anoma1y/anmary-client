import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import FieldText from 'containers/Shop/components/FieldText';
import FieldTextArea from 'containers/Shop/components/FieldTextArea';
import {
  sendFeedback
} from '../../store/actions';
import { getValuesDeep } from 'lib/utils';

const validate = values => {
  const errors = {};

  if (values.contact_name && values.contact_name.length > 100) {
    errors.contact_name = 'Максимальное количество символов - 100';
  }

  if (!values.contact_address) {
    errors.contact_address = 'Обязательное поле'
  } else if (!/^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/i.test(values.contact_address)) {
    errors.contact_address = 'Неправильный адрес E-Mail или телефон';
  }

  if (!values.text) {
    errors.text = 'Обязательное поле';
  } else if (values.text && values.text.length < 10) {
    errors.text = 'Минимальное количество символов - 10';
  }

  return getValuesDeep(errors).every((item) => item === '') ? {} : errors;
};

@connect(({ Shop_Contact }) => ({ Shop_Contact }), ({
  sendFeedback
}))
@reduxForm({ form: 'Shop_Contact', validate })
export default class Feedback extends Component {
  render() {
    const { isLoading, isSent } = this.props.Shop_Contact;

    return (
      <form
        className={'contact-form'}
        onSubmit={(e) => e.preventDefault()}
      >
        <h4 className={'contact-form_header'}>
          Обратная связь
        </h4>

        <div className={'contact-form_input'}>

          <Field
            name={'contact_name'}
            component={FieldText}
            label={'Имя'}
            helperText={'Необязательно поле'}
            placeholder={'Иван Иванов'}
          />

        </div>

        <div className={'contact-form_input'}>

          <Field
            name={'contact_address'}
            component={FieldText}
            label={'Почта или телефон'}
            placeholder={'mail@example.com / +88005553535'}
          />

        </div>

        <div className={'contact-form_input'}>

          <Field
            name={'text'}
            component={FieldTextArea}
            label={'Вопрос'}
            placeholder={'Вопрос?'}
          />

        </div>

        <div className={'contact-form_btn'}>
          <Button
            fullWidth
            color={'primary'}
            variant={'raised'}
            disabled={isLoading || isSent}
            onClick={this.props.sendFeedback}
          >
            Отправить
          </Button>
        </div>

      </form>
    );
  }
}
