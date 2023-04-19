import Select, { StylesConfig } from 'react-select';
import clsx from 'classnames';

type PropsTypes = {
  name?: string;
  label?: string;
  type: string;
  placeholder?: string;
  value?: any;
  options?: any[],
  className?: string;
  onChange?: (e?: any) => void;
};

const selectStyles: StylesConfig = {
  control: (styles, { isFocused }) => ({
    ...styles,
    border: isFocused ? '1px solid #16ABF8' : '1px solid #E5E5E5',
    borderRadius: 6,
    boxShadow: 'unset',
    padding: '6px 8px',

    ':hover': {
      borderColor: '#16ABF8',
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }: any) => {
    const color = data?.color;
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? `${color}33`
        : isFocused
        ? `${color}33`
        : undefined,
      color: isDisabled ? '#ccc' : color,
      cursor: isDisabled ? 'not-allowed' : 'pointer',

      ':active': {
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? `${color}33`
          : isFocused
          ? `${color}33`
          : undefined,
      },

      ':before': {
        content: `"●"`,
        color: color,
        marginRight: 10,
      },
    };
  },
  singleValue: (styles, { data }: any) => {
    const color = data.color;
    return {
      ...styles,
      color: color,

      ':before': {
        content: `"●"`,
        color: color,
        marginRight: 12,
      },
    };
  },
  placeholder: (styles, { data }: any) => {
    return {
      ...styles,

      ':before': {
        content: `"●"`,
        color: '#E5E5E5',
        marginRight: 12,
      },
    };
  },
};

export default function Component(props: PropsTypes) {
  const {
    name,
    label,
    type,
    placeholder,
    value,
    options,
    className,
    onChange,
  } = props;

  return (
    <div className={clsx('form-group', className)}>
      {(label && (
        <label
          htmlFor={`form-label-${name}`}
          className='form-label'
        >
          {label}
        </label>
      )) ||
        null}
      {type === 'select' ? (
        <div className='form-select'>
          <Select
            id={`form-select-${name}`}
            value={value}
            onChange={onChange}
            options={options}
            className='placeholder:text-[#A4A4A4]'
            styles={selectStyles}
            placeholder={placeholder}
          />
        </div>
      ) : (
        <input
          id={`form-input-${name}`}
          name={name}
          type={type}
          className='form-input'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}
