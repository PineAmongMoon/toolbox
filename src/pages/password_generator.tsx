import { Button, Form, InputNumber } from 'antd';
import { useState } from 'react';
import { choice, shuffled } from '@/utils/random';
import {
  digits,
  ascii_lowercase,
  ascii_uppercase,
  punctuation,
  printable,
} from '@/utils/string';
import { sum } from 'lodash';

export default function PasswordGenerator() {
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');

  const handleSubmit = (value: any) => {
    const choose = [] as string[];

    let i: number;
    for (i = 0; i < value.digit; ++i) {
      choose.push(choice(digits));
    }

    for (i = 0; i < value.lower; ++i) {
      choose.push(choice(ascii_lowercase));
    }

    for (i = 0; i < value.upper; ++i) {
      choose.push(choice(ascii_uppercase));
    }

    for (i = 0; i < value.punctuationSize; ++i) {
      choose.push(choice(punctuation));
    }

    while (choose.length < value.length) {
      choose.push(choice(printable));
    }

    setPassword(shuffled(choose).join(''));
  };

  const getMinLength = () =>
    sum(
      Object.values(
        form.getFieldsValue(['digit', 'lower', 'upper', 'punctuationSize']),
      ),
    );

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        onValuesChange={() => {
          const l = form.getFieldValue('length');
          if (Number.isSafeInteger(l)) {
            form.setFieldValue('length', Math.max(l, getMinLength()));
          }
        }}
      >
        <Form.Item
          name="length"
          label="密码长度"
          initialValue={0}
          rules={[
            {
              type: 'number',
              validator: async (_rule, value) => {
                if (value < getMinLength()) {
                  throw new Error('总长度不应小于各项之和');
                }
                return true;
              },
            },
            {
              type: 'number',
              max: Number.MAX_SAFE_INTEGER,
              message: `不应大于${Number.MAX_SAFE_INTEGER}`,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="digit"
          label="数字数量"
          initialValue={0}
          rules={[
            {
              type: 'number',
              min: 0,
              message: '不应小于0',
            },
            {
              type: 'number',
              max: Number.MAX_SAFE_INTEGER,
              message: `不应大于${Number.MAX_SAFE_INTEGER}`,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="lower"
          label="小写字母数量"
          initialValue={0}
          rules={[
            {
              type: 'number',
              min: 0,
              message: '不应小于0',
            },
            {
              type: 'number',
              max: Number.MAX_SAFE_INTEGER,
              message: `不应大于${Number.MAX_SAFE_INTEGER}`,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="upper"
          label="大写字母数量"
          initialValue={0}
          rules={[
            {
              type: 'number',
              min: 0,
              message: '不应小于0',
            },
            {
              type: 'number',
              max: Number.MAX_SAFE_INTEGER,
              message: `不应大于${Number.MAX_SAFE_INTEGER}`,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="punctuationSize"
          label="特殊符号"
          initialValue={0}
          rules={[
            {
              type: 'number',
              min: 0,
              message: '不应小于0',
            },
            {
              type: 'number',
              max: Number.MAX_SAFE_INTEGER,
              message: `不应大于${Number.MAX_SAFE_INTEGER}`,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            生成
          </Button>
        </Form.Item>
      </Form>
      <div>{password}</div>
    </>
  );
}
