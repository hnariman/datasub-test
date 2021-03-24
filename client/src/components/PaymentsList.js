import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../redux/paymentSlice';
import { Table } from 'antd';

export const PaymentsList = () => {

  const dispatch = useDispatch();
  const payments = useSelector(state => state.payment.list);
  const columns = [
    {
      title: 'UUID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: "_id"
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: "_id"
    },
    {
      title: 'Last Four',
      dataIndex: 'lastFour',
      key: "_id"
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: "_id"
    },
  ]

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  return (
    <Table dataSource={payments} columns={columns} />
  )
}
