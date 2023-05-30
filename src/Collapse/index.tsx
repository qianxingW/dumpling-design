// 引入react依赖
import React, { useState, ReactNode, forwardRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

// 引入第三方依赖
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';

// 引入样式
import './index.less';

// 引入配置文件
import { prefix } from '../config';

// 引入组件
import { Icon } from '../index';

export interface CollapseProps {
  /**
   * @description      类名
   * @default           -
   */
  className?: string;
  style?: Object;
  children?: ReactNode;

  /**
   * @description      是否显示边框
   * @default           false
   */
  noBorder?: boolean;
}

export function Collapse(props: CollapseProps) {
  const { className, children, noBorder, ...prop } = props;

  return (
    <div
      className={clsx(className, `${prefix}-collapse`, {
        [`${prefix}-collapse-noBorder`]: noBorder,
      })}
      {...prop}
    >
      {children}
    </div>
  );
}

export interface CollapseItemProps {
  /**
   * @description      类名
   * @default           -
   */
  className?: string;
  style?: Object;
  children?: ReactNode;

  /**
   * @description      标题
   * @default           -
   */
  title?: ReactNode;

  /**
   * @description      补充元素
   * @default           -
   */
  extra?: ReactNode;

  /**
   * @description      是否展开
   * @default           -
   */
  open?: boolean;

  /**1
   * @description      展开面板改变时触发
   * @default           -
   */
  onChange?: (open: any) => void;
}

export function Item(props: CollapseItemProps) {
  const { className, children, title, extra, onChange, ...prop } = props;

  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <div
      className={clsx(className, `${prefix}-collapse-item`, {
        [`${prefix}-collapse-item-open`]: open,
      })}
      {...prop}
    >
      <div className={clsx(`${prefix}-collapse-item-head`)}>
        <div
          className={clsx(`${prefix}-collapse-item-title`)}
          onClick={() => {
            setOpen((prevOpen: any) => {
              return !prevOpen;
            });
            onChange && onChange(!open);
          }}
        >
          {title}
        </div>
        <div className={clsx(`${prefix}-collapse-item-extra`)}>
          {extra}
          <Icon
            onClick={() => {
              setOpen((prevOpen: any) => {
                return !prevOpen;
              });

              onChange && onChange(!open);
            }}
            name={open ? 'shang' : 'xia'}
          />
        </div>
      </div>
      {/* <CSSTransition
        in={open}
        className={clsx({})}
        classNames={`collapse-transition`}
        unmountOnExit
        timeout={0}
        // timeout={400}
      > */}
      <div className={`collapse-transition${open ? '-open' : '-close'}`}>
        <div className={clsx(`${prefix}-collapse-item-body`)}>{children}</div>
      </div>
      {/* </CSSTransition> */}
    </div>
  );
}

export interface CompoundedComponent {
  Item: any;
}

Collapse.Item = Item;

export default Collapse;
