import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Close as CloseIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from '@material-ui/icons';
import { remove } from '../../store/actions';

const STATUS = {
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <ErrorIcon style={{ transform: 'rotate(180deg)' }} />,
  success: <CheckCircleIcon />
};

@connect(({ Notification }) => ({ Notification }), { remove })
export default class Notif extends Component {

  /**
   * Метод для получения текущей иконки для определенного статуса
   * @param status - статус оповещения
   * @returns {*}
   */
  getStatusIcon = (status) => STATUS[status] || <CloseIcon />;

  handleActionClick = (e) => {
    e.preventDefault();
    const { id } = this.props;

    if (!id) return;

    this.props.remove(id);
  };

  render() {
    const {
      actionClose,
      componentClassName,
      message,
      status,
      title,
    } = this.props;

    return (
      <div className={`${componentClassName}-container ${componentClassName}__${status}`}>
        <div className={`${componentClassName}-item`}>
          <div className={`${componentClassName}-item_icon`}>
            {this.getStatusIcon(status)}
          </div>
          <h3 className={`${componentClassName}-item_title`}>{title}</h3>
          <span className={`${componentClassName}-item_message`}>{message}</span>
        </div>
        {
          actionClose &&
          <div className={`${componentClassName}-container_close`}>
            <button onClick={this.handleActionClick}>
              <CloseIcon />
            </button>
          </div>
        }
      </div>
    );
  }
}
