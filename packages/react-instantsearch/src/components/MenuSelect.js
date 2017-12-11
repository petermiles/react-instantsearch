import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import translatable from '../core/translatable';

class MenuSelect extends Component {
  static propTypes = {
    cx: PropTypes.func.isRequired,
    canRefine: PropTypes.bool.isRequired,
    refine: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        count: PropTypes.oneOfType([
          PropTypes.number.isRequired,
          PropTypes.string.isRequired,
        ]),
        isRefined: PropTypes.bool.isRequired,
      })
    ),
    header: PropTypes.node,
    footer: PropTypes.node,
  };

  static contextTypes = {
    canRefine: PropTypes.func,
  };

  get selectedValue() {
    const { value } = find(this.props.items, { isRefined: true }) || {
      value: 'ais__see__all__option',
    };
    return value;
  }

  componentWillMount() {
    if (this.context.canRefine) this.context.canRefine(this.props.canRefine);
  }

  componentWillReceiveProps(props) {
    if (this.context.canRefine) this.context.canRefine(props.canRefine);
  }

  handleSelectChange = ({ target: { value } }) => {
    this.props.refine(value === 'ais__see__all__option' ? '' : value);
  };

  render() {
    const { cx, items, translate, header, footer } = this.props;

    return (
      <select
        value={this.selectedValue}
        onChange={this.handleSelectChange}
        className={cx('select')}
      >
        <option value="ais__see__all__option" className={cx('option')}>
          {translate('seeAllOption')}
        </option>

        {items.map(item => (
          <option key={item.value} value={item.value} className={cx('option')}>
            {item.label} ({item.count})
          </option>
        ))}
      </select>
    );
  }
}

export default translatable({
  seeAllOption: 'See all',
})(MenuSelect);
