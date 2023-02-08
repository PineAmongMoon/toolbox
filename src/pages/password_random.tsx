import { Button, Form, InputNumber } from 'antd';
import { useState } from 'react';
import { choice, shuffled } from '@/utils/random';
import {
  digits,
  ascii_lowercase,
  ascii_uppercase,
  punctuation,
} from '@/utils/string';

export default function PasswordRandom() {
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

    setPassword(shuffled(choose).join(''));
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="digit"
          label="数字数量"
          initialValue={0}
          rules={[{ type: 'number', min: 0, message: '' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="lower"
          label="小写字母数量"
          initialValue={0}
          rules={[{ type: 'number', min: 0, message: '' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="upper"
          label="大写字母数量"
          initialValue={0}
          rules={[{ type: 'number', min: 0, message: '' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="punctuationSize"
          label="特殊符号"
          initialValue={0}
          rules={[{ type: 'number', min: 0, message: '' }]}
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
