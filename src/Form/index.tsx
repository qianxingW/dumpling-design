import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  forwardRef,
  useImperativeHandle,
  ReactNode,
  ReactElement,
  useMemo,
  useCallback,
} from 'react';

import ReactDOM from 'react-dom';

import clsx from 'clsx';

import './index.less';

import { prefix } from '../config';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const FormContext = React.createContext({} as any);

export interface FormProps {
  /**
   * @description      类名
   * @default           -
   */
  className?: string;
  style?: Object;
  children?: ReactElement;

  /**
   * @description      初始值
   * @default           -
   */
  initialValues?: Object;

  /**
   * @description      表单布局 'horizontal'|'vertical'|'inline'
   * @default           -
   */
  layout?: string;

  /**
   * @description      数据验证成功后回调事件
   * @default           -
   */
  onSubmit?: (value: Object) => void;

  /**
   * @description      数据校验失败后的回调事件
   * @default           -
   */
  onError?: (error: Object) => void;

  /**
   * @description      数据校验失败后的回调事件
   * @default           -
   */
  onValuesChange?: (changeValues: Object, allValues: Object) => void;

  /**
   * @description      支持调用 onSubmit 和 validation
   * @default           -
   */
  ref?: { current: any };
}

export const Form = (props: FormProps, ref: any) => {
  const {
    className,
    children,
    layout = 'inline',
    onSubmit,
    onError,
    onValuesChange,
    initialValues,
    ...prop
  } = props;

  const [value, setValue] = useState({}) as any;

  const formRef: any = useRef({});

  // 用来解决 value set 后值不及时更新的问题
  const valueRef: any = useRef(value);

  function handleSubmit(e: any) {
    e && e.preventDefault();
    if (!validation()) return;
    onSubmit?.(value);
    return false;
  }

  function validation() {
    let error: any = {};
    for (let attr in formRef.current) {
      let err = formRef.current[attr].validation(attr, value[attr]);
      if (err) {
        error[attr] = err.message;
      }
    }
    if (JSON.stringify(error) != '{}' && onError) {
      onError(error);
      return false;
    }
    return true;
  }

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      handleSubmit(null);
    },
    validation,
    getValue: (name?: string) => {
      if (name) {
        return value[name];
      }
      return { ...value };
    },
    setValue: (name: string, v: any) => {
      value[name] = v;
      setValue({ ...value });
    },
    reset: () => {
      let val = initialValues ? { ...initialValues } : ({} as any);
      setValue(val);
      onValuesChange?.(val, val);
      for (let attr in formRef.current) {
        formRef.current[attr].clearError(attr, val[attr]);
      }
    },
  }));

  useEffect(() => {
    if (initialValues != undefined) {
      let val = { ...(initialValues || {}) };
      setValue(val);
      valueRef.current = val;
    }
  }, [initialValues]);

  return (
    <FormContext.Provider
      value={{
        formValue: value,
        formRef: formRef.current,
        layout,
        onChange: (name: string, v: string) => {
          value[name] = v;
          setValue({ ...value });
          valueRef.current = value;
          onValuesChange?.({ [`${name}`]: v }, value);
        },
        subscribe: (name: string, v: string) => {
          value[name] = v;
          setValue({ ...value });
        },
        unsubscribe: (name: string, v: string) => {
          // 注销时如果使用 value 拿到的是旧的值
          delete valueRef.current[name];
          delete formRef.current[name];
          setValue({ ...valueRef.current });
          onValuesChange?.({ [`${name}`]: v }, valueRef.current);
        },
        onError: (error: any) => {
          // setError(error);
        },
      }}
    >
      <form
        className={clsx(
          className,
          `${prefix}-form`,
          {
            [`${prefix}-form-${layout}`]: layout,
          },
          className,
        )}
        onSubmit={handleSubmit}
        {...prop}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

export interface FormItemProps {
  /**
   * @description      类名
   * @default           -
   */
  className?: string;
  style?: Object;
  children: ReactElement;

  /**
   * @description      label 标签的文本
   * @default           -
   */
  label?: ReactNode;

  /**
   * @description      label 标签宽度
   * @default           -
   */
  labelWidth?: any;

  /**
   * @description      设置表单域内字段
   * @default           -
   */
  name: string;

  /**
   * @description      校验规则 [{required: true,message: '请输入电话号码'}, {fields: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,message: '请输入11位电话号码'}]
   * @default           -
   */
  rules?: Array<any>;

  /**
   * @description      支持调用validation
   * @default           -
   */
  ref?: { current: any };
}

export const Item = (props: FormItemProps, ref: any) => {
  const { className, label, name, children, rules, labelWidth = 200, ...prop } = props;
  const { subscribe, unsubscribe, onChange, onFocus, onBlur, formValue, formRef, layout } =
    useContext(FormContext);
  const [required, setRequired] = useState(false);
  const [error, setError] = useState([] as Array<any>);

  const handleValidation = () => {
    return {
      validation: () => {
        if (!name) {
          return;
        }
        return validationData(name, value);
      },
    };
  };

  useImperativeHandle(ref, () => handleValidation());

  const value = useMemo(() => {
    return formValue[name];
  }, [formValue]);

  useEffect(() => {
    formRef[name] = {
      validation: (n: any, v: any) => {
        if (!n) {
          return;
        }
        return validationData(n, v);
      },
      clearError: () => {
        setError([]);
      },
    };
    if (subscribe && name) {
      subscribe(name, value);
    }
    return () => {
      unsubscribe(name);
    };
  }, []);

  useEffect(() => {
    if (rules) {
      setRequired(rules.map((item: any) => item.required)[0] !== undefined);
    }
  }, [rules]);

  const validationData = (n: any, v: any) => {
    if (n && rules) {
      let errorAry = rules
        .map((item: any) => {
          // 必填项
          if (item.required !== undefined && item.required !== null && item.required === true) {
            if (v === undefined || v === null || v.length <= 0) {
              return {
                message: `必填项`,
              };
            }
          }

          // 验证正则
          if (v !== undefined && v !== '' && item.fields && !item.fields.test(v)) {
            return item;
          }

          // 验证长度
          if (item.max && v !== undefined && v !== null && v !== '' && item.max < v.length) {
            return {
              max: item.max,
              message: `最多输入${item.max}个字符`,
            };
          }

          // 验证长度
          if (item.min && v !== undefined && v !== null && v !== '' && item.min > v.length) {
            return {
              max: item.min,
              message: `最少输入${item.min}个字符`,
            };
          }

          if (item.validate) {
            let validateRes = item.validate(v, formValue);
            if (!validateRes) {
              return {
                message: item.message,
              };
            }
          }
        })
        .filter((item: any) => item !== undefined);
      setError(errorAry);
      return errorAry.length > 0 ? errorAry[0] : null;
    }
    return null;
  };

  const handleChange = (v: any) => {
    if (name && onChange) {
      onChange(name, v);
      validationData(name, v);
    }
  };

  const handleFocus = (e: any) => {
    if (name && onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    if (name && onBlur) {
      onBlur(e);
    }
  };

  return (
    <div
      className={clsx(className, `${prefix}-form-item`, {
        [`${prefix}-form-item-errors`]: error && error.length > 0,
      })}
      {...prop}
    >
      <label
        className={clsx(`${prefix}-form-item-laber`, {
          [`${prefix}-form-item-laber-none`]: !label,
        })}
        style={layout === 'horizontal' ? { width: labelWidth } : {}}
      >
        {required && <span className={clsx(`${prefix}-form-item-required`)}>*</span>}
        {label}
      </label>
      <div className={clsx(`${prefix}-form-item-control`)}>
        {React.Children.map(children, (item) => {
          return React.cloneElement(item, {
            name,
            value,
            onChange: (e: any) => {
              handleChange(e);
              item.props.onChange?.(e);
            },
          });
        })}
        {error && error.length && error.length > 0 ? (
          <div className={clsx(`${prefix}-form-item-error`)}>{error[0].message}</div>
        ) : null}
      </div>
    </div>
  );
};

export interface CompoundedComponent extends React.ForwardRefExoticComponent<any> {
  Item: any;
}

const InternalForm = forwardRef(Form) as CompoundedComponent;

InternalForm.Item = forwardRef(Item);

export default InternalForm;
