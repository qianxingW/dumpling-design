---
nav:
  title: 组件
  path: /components
group:
  title: Modal 对话框
  order: 23
---

## Modal 对话框

示例：

```tsx
import React, { useState } from 'react';
import { Modal, Button } from 'dumpling-design';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button title="First Demo" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <Modal
        title="First Demo"
        visible={visible}
        onCancel={() => {
          console.log('关闭');
          setVisible(false);
        }}
        onConfirm={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
```

关闭时销毁弹窗：

```tsx
import React, { useState } from 'react';
import { Modal, Button } from 'dumpling-design';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button title="First Demo" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <Modal
        title="First Demo"
        visible={visible}
        destroyOnClose
        onCancel={() => {
          console.log('关闭');
          setVisible(false);
        }}
        onConfirm={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
```

自定义确定/取消按钮文字：

```tsx
import React, { useState } from 'react';
import { Modal, Button, Grid } from 'dumpling-design';
const { Row, Col } = Grid;

export default () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Button title="First Demo" onClick={() => setVisible(true)}>
            打开弹窗
          </Button>
        </Col>
        <Col span={4}>
          <Button title="First Demo" onClick={() => setVisible1(true)}>
            隐藏取消按钮
          </Button>
        </Col>
      </Row>
      <Modal
        title="First Demo"
        visible={visible}
        confirmButtonText="自定义确定按钮"
        cancelButtonText="自定义取消按钮"
        onCancel={() => {
          console.log('关闭');
          setVisible(false);
        }}
        onConfirm={() => {
          setVisible(false);
        }}
      />
      <Modal
        title="First Demo"
        visible={visible1}
        confirmButtonText="知道了"
        onCancel={() => {
          console.log('关闭');
          setVisible1(false);
        }}
        onConfirm={() => {
          setVisible1(false);
        }}
        cancelButtonVisible={false}
      />
    </div>
  );
};
```

自定义页脚：

```tsx
import React, { useState } from 'react';
import { Modal, Button } from 'dumpling-design';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button title="First Demo" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <Modal
        title="First Demo"
        visible={visible}
        footer={'自定义页脚'}
        onCancel={() => {
          console.log('关闭');
          setVisible(false);
        }}
        onConfirm={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
```

不显示页脚：

```tsx
import React, { useState } from 'react';
import { Modal, Button } from 'dumpling-design';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button title="First Demo" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <Modal
        title="First Demo"
        visible={visible}
        footer={null}
        onCancel={() => {
          console.log('关闭');
          setVisible(false);
        }}
        onConfirm={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
```

关闭拦截：

```tsx
import React, { useState } from 'react';
import { Modal, Button } from 'dumpling-design';

export default () => {
  const [visible, setVisible] = useState(false);
  const [onConfirmLoading, setOnConfirmLoading] = useState(false);
  return (
    <div>
      <Button title="First Demo" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <Modal
        title="First Demo"
        visible={visible}
        confirmLoading={onConfirmLoading}
        onCancel={() => {
          console.log('关闭');
          setVisible(false);
        }}
        onConfirm={() => {
          return new Promise((resolve, reject) => {
            console.log('延迟关闭');
            setOnConfirmLoading(true);
            window.setTimeout(() => {
              setVisible(false);
              setOnConfirmLoading(false);
              resolve();
            }, 3000);
          });
        }}
      />
    </div>
  );
};
```

确认框：

```tsx
import React, { useState } from 'react';
import { Modal, Button, Grid } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Button
            title="First Demo"
            onClick={() =>
              Modal.confirm({
                title: '通知信息标题',
                content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
                onCancel: () => {
                  console.log('取消');
                },
                onConfirm: () => {
                  console.log('确认');
                },
              })
            }
          >
            确认
          </Button>
        </Col>
        <Col span={4}>
          <Button
            title="First Demo"
            onClick={() =>
              Modal.confirm({
                title: '通知信息标题',
                type: 'success',
                content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
                onCancel: () => {
                  console.log('取消');
                },
                onConfirm: () => {
                  console.log('确认');
                },
              })
            }
          >
            成功
          </Button>
        </Col>
        <Col span={4}>
          <Button
            title="First Demo"
            onClick={() =>
              Modal.confirm({
                title: '通知信息标题',
                type: 'error',

                content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
                onCancel: () => {
                  console.log('取消');
                },
                onConfirm: () => {
                  console.log('确认');
                },
              })
            }
          >
            失败
          </Button>
        </Col>
        <Col span={4}>
          <Button
            title="First Demo"
            onClick={() =>
              Modal.confirm({
                title: '通知信息标题',
                type: 'warning',
                content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
                onCancel: () => {
                  console.log('取消');
                },
                onConfirm: () => {
                  console.log('确认');
                },
              })
            }
          >
            警告
          </Button>
        </Col>
      </Row>
    </div>
  );
};
```

简单 api 确认框：

```tsx
import React, { useState } from 'react';
import { Modal, Button, Grid } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <Button
            title="First Demo"
            onClick={() =>
              Modal.confirm({
                title: '通知信息标题',
                content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
                onCancel: () => {
                  console.log('取消');
                },
                onConfirm: () => {
                  console.log('确认');
                },
              })
            }
          >
            确认
          </Button>
        </Col>
        <Col span={4}>
          <Button
            title="First Demo"
            onClick={() =>
              Modal.success({
                title: '通知信息标题',
                content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
                onCancel: () => {
                  console.log('取消');
                },
                onConfirm: () => {
                  console.log('确认');
                },
              })
            }
          >
            成功
          </Button>
        </Col>
        <Col span={4}>
          <Button
            title="First Demo"
            onClick={() =>
              Modal.confirm({
                title: '通知信息标题',
                type: 'error',
                content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
                onCancel: () => {
                  console.log('取消');
                },
                onConfirm: () => {
                  console.log('确认');
                },
              })
            }
          >
            失败
          </Button>
        </Col>
        <Col span={4}>
          <Button
            title="First Demo"
            onClick={() =>
              Modal.confirm({
                title: '通知信息标题',
                type: 'warning',
                content: '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
                onCancel: () => {
                  console.log('取消');
                },
                onConfirm: () => {
                  console.log('确认');
                },
              })
            }
          >
            警告
          </Button>
        </Col>
      </Row>
    </div>
  );
};
```

<API />
