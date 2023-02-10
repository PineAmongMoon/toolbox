import { Form, Input, InputNumber } from 'antd';
import { useState } from 'react';
import { IPv4Network } from '@/utils/IPv4Network';

type FormDataType = { address: string; mark: string; markLength: number };

export default function IPv4Calculater() {
  const [network, setNetwork] = useState<IPv4Network>(() => new IPv4Network());
  const [form] = Form.useForm();

  return (
    <Form<FormDataType>
      form={form}
      onValuesChange={(changedValue) => {
        setNetwork((preValue) => {
          const nextValue = preValue.copy();
          Object.entries(changedValue).forEach(
            ([key, value]: [string, any]) => {
              switch (key) {
                case 'address':
                  nextValue.address = value;
                  break;
                case 'mark':
                  nextValue.mark = value;
                  form.resetFields(['markLength']);
                  form.setFieldValue('markLength', nextValue.markLength);
                  break;
                case 'markLength':
                  nextValue.markLength = value;
                  form.resetFields(['mark']);
                  form.setFieldValue('mark', nextValue.mark);
                  break;
                default:
                  break;
              }
            },
          );
          return nextValue;
        });
      }}
    >
      <Form.Item
        name={'address'}
        label="IP地址"
        initialValue={'0.0.0.0'}
        rules={[
          {
            validator: async (_, value) => {
              if (value !== network.address) {
                throw new Error();
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'mark'}
        label="子网掩码"
        initialValue={'0.0.0.0'}
        rules={[
          {
            validator: async (_, value) => {
              if (value !== network.mark) {
                throw new Error();
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={'markLength'}
        label="掩码长度"
        initialValue={0}
        rules={[{ type: 'number', max: 32, min: 0, message: '' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item label="网络规模">{network.networkSize}</Form.Item>
      <Form.Item label="网络地址">{network.networkAddress}</Form.Item>
      <Form.Item label="第一个主机地址">{network.firstHostAddress}</Form.Item>
      <Form.Item label="最后一个主机地址">{network.lastHostAddress}</Form.Item>
      <Form.Item label="广播地址">{network.boradcastAddress}</Form.Item>
    </Form>
  );
}
