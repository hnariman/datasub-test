import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, DatePicker, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment } from '../redux/paymentSlice';


export const CreatePayment = () => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const submit = (data) => dispatch(createPayment(data));
  const success = useSelector(state => state.payment.success);

  const [form] = Form.useForm();
  const { Option } = Select;
  const layout = { labelCol: { span: 2 } };

  const [payment, setPayment] = useState(1);

  const onPaymentChange = (value) => {
    (value === 'ach') ? setPayment(1)
      : (value === 'token') ? setPayment(2)
        : setPayment(3)
  }
  const onFinish = (values) => {
    submit(values);
    form.resetFields();
  }

  useEffect(() => {
    if (success) {
      setShowAlert(true);
      const timer = setTimeout(() =>  setShowAlert(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      {...layout}
    >
      <Form.Item
        name="payment"
        label="Payment Type"
        initialValue="ach"
        rules={[{ required: true }]}>

        <Select onChange={onPaymentChange} >
          <Option value="ach">ach</Option>
          <Option value="token">token</Option>
          <Option value="card">card</Option>
        </Select>
      </Form.Item>
      {payment === 1 && <AchPayment />}
      {payment === 2 && <TokenPayment />}
      {payment === 3 && <CardPayment />}
        <Form.Item name="amount" label="Amount">
          <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
        </Form.Item>
      <Form.Item>

        <Button type="primary" htmlType="submit" >
          Pay
        </Button>
      </Form.Item>
          {showAlert && <Alert message="Payment is being processed" type="success" style={{padding:"1rem"}}/>}
    </Form>
  )
}


const AchPayment = () => (
  <React.Fragment>
    <Form.Item name="account" label="Account number">
      <InputNumber maxLength={17} style={{ width: "100%" }} />
    </Form.Item>
    <Form.Item name="routing" label="Routing number">
      <Input maxLength={9} style={{ width: "100%" }} />
    </Form.Item>
  </React.Fragment>
)

const TokenPayment = () => (
  <React.Fragment>
    <Form.Item name="token" label="Token">
      <Input style={{ width: "100%" }} />
    </Form.Item>
    <Form.Item name="paymentType" label="Payment type">
      <Input maxLength={32} style={{ width: "100%" }} />
    </Form.Item>
  </React.Fragment>
)

const CardPayment = () => (
  <React.Fragment>
    <Form.Item name="card" label="Card number">
      <Input maxLength={16} minLength={16} style={{ width: "100%" }} />
    </Form.Item>
    <Form.Item name="expiration" label="Expiration Date">
      <DatePicker style={{ width: "100%" }} />
    </Form.Item>
    <Form.Item name="cvv" label="CVV">
      <InputNumber minLength={3} maxLength={4} style={{ width: "100%" }} />
    </Form.Item>
  </React.Fragment>
)