---
nav:
  title: 组件
  path: /components
group:
  title: Upload 文件上传
  order: 45
---

## Upload 文件上传

默认：

```tsx
import React from 'react';
import { Upload, Grid, Button } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload
            multiple
            accept=".png,.jpg,.jpeg,.gif"
            action={(form, config) => {
              console.log(form, config);
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve({ data: '上传的地址' });
                }, (Math.floor(Math.random() * 10) + 5) * 1000);
              });
            }}
            onPreview={(file) => {
              console.log('预览');
              console.log(file);
            }}
            onRemove={(file) => {
              console.log('删除');
              console.log(file);
            }}
            onChange={(files) => {
              console.log('更改');
              console.log(files);
            }}
          >
            <Button icon="shangchuan">上传文件</Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

默认不需要预览按钮：

```tsx
import React from 'react';
import { Upload, Grid, Button } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload
            accept=".png,.jpg,.jpeg,.gif"
            action={(form, config) => {
              console.log(form, config);
              return new Promise((resolve, reject) => {
                resolve({ data: '上传的地址' });
              });
            }}
            onRemove={(file) => {
              console.log('删除');
              console.log(file);
            }}
            onChange={(files) => {
              console.log('更改');
              console.log(files);
            }}
          >
            <Button icon="shangchuan">上传文件</Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

简单上传：

```tsx
import React from 'react';
import { Upload, Grid, Button, Icon } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload
            accept=".png,.jpg,.jpeg,.gif"
            showAccept={false}
            showUploadList={false}
            action={(file) => {
              console.log(file);
              return new Promise((resolve, reject) => {
                resolve({ data: '上传的地址' });
              });
            }}
            onPreview={(file) => {
              console.log('预览');
              console.log(file);
            }}
            onRemove={(file) => {
              console.log('删除');
              console.log(file);
            }}
            onChange={(files) => {
              console.log('更改');
              console.log(files);
            }}
          >
            <Icon size={36} name="shangchuan" />
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

默认数据：

```tsx
import React from 'react';
import { Upload, Grid, Button } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload
            accept=".png,.jpg,.jpeg,.gif"
            action={(file) => {
              console.log(file);
              return new Promise((resolve, reject) => {
                resolve({ data: '上传的地址' });
              });
            }}
            onPreview={(file) => {
              console.log('预览');
              console.log(file);
            }}
            onRemove={(file) => {
              console.log('删除');
              console.log(file);
            }}
            onChange={(files) => {
              console.log('更改');
              console.log(files);
            }}
            fileList={[
              {
                uuid: '-1',
                name: 'image.png',
                status: 'success',
                percent: 10,
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
            ]}
          >
            <Button icon="shangchuan">上传文件</Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

禁用：

```tsx
import React from 'react';
import { Upload, Grid, Button } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload accept=".png,.jpg,.jpeg,.gif" disabled>
            <Button icon="shangchuan">上传文件</Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

picture

```tsx
import React from 'react';
import { Upload, Grid, Button } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload listType="picture" accept=".png,.jpg,.jpeg,.gif">
            <Button icon="shangchuan">上传文件</Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

picture-card

```tsx
import React from 'react';
import { Upload, Grid, Button } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload
            listType="picture-card"
            accept=".png,.jpg,.jpeg,.gif"
            maxCount={2}
            fileList={[
              {
                uuid: '-1',
                name: 'image.png',
                status: 'success',
                percent: 100,
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
            ]}
          ></Upload>
        </Col>
      </Row>
    </div>
  );
};
```

drag

```tsx
import React from 'react';
import { Upload, Grid, Button, Icon } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload accept=".png,.jpg,.jpeg,.gif" drag>
            <Icon name="shangchuan" size={24} />
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

上传之前校验：

```tsx
import React from 'react';
import { Upload, Grid, Button } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload
            accept=".png,.jpg,.jpeg,.gif"
            action={(form, config) => {
              console.log(form, config);
              return new Promise((resolve, reject) => {
                resolve({ data: '上传的地址' });
              });
            }}
            beforeUpload={(file, files) => {
              console.log(file);
              console.log(files);

              // 停止上传
              return false;
            }}
            multiple={true}
            onPreview={(file) => {
              console.log('预览');
              console.log(file);
            }}
            onRemove={(file) => {
              console.log('删除');
              console.log(file);
            }}
            onChange={(files) => {
              console.log('更改');
              console.log(files);
            }}
          >
            <Button icon="shangchuan">上传文件</Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

拖拽上传或 listType 类型为 picture-card 自定义显示文字

```tsx
import React, { useState, useEffect } from 'react';
import { Upload, Grid, Button, Icon } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    let time = setTimeout(() => {
      setFileList([
        {
          uuid: '-1',
          name: 'image.png',
          status: 'success',
          percent: 10,
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]);
    }, 1000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload
            listType="picture-card"
            accept=".png,.jpg,.jpeg,.gif"
            maxCount={2}
            uploadText={'自定义文字'}
            fileList={fileList}
          ></Upload>
        </Col>
        <Col span={12}>
          <Upload accept=".png,.jpg,.jpeg,.gif" drag uploadText={'此处可自定义文字'}>
            <Icon name="shangchuan" size={24} />
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

限制上传数量：

```tsx
import React from 'react';
import { Upload, Grid, Button } from 'dumpling-design';

const { Row, Col } = Grid;

export default () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Upload
            accept=".png,.jpg,.jpeg,.gif"
            action={(form, config) => {
              console.log(form, config);
              return new Promise((resolve, reject) => {
                resolve({ data: '上传的地址' });
              });
            }}
            maxCount={2}
            multiple={true}
            onPreview={(file) => {
              console.log('预览');
              console.log(file);
            }}
            onRemove={(file) => {
              console.log('删除');
              console.log(file);
            }}
            onChange={(files) => {
              console.log('更改');
              console.log(files);
            }}
          >
            <Button icon="shangchuan">上传文件</Button>
          </Upload>
        </Col>
      </Row>
    </div>
  );
};
```

<API exports='["default", "UploadFileInterface"]'/>
