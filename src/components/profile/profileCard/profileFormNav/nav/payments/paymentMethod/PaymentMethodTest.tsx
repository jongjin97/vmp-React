import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseRadio } from '@app/components/common/BaseRadio/BaseRadio';
import { useResponsive } from '@app/hooks/useResponsive';
import { notificationController } from '@app/controllers/notificationController';
import { RequestPayParams, RequestPayResponse } from 'iamport-typings';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { doUpdatePoint } from '@app/store/slices/authSlice';
import { message } from 'antd';

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

interface paymentMethodTestRequest {
  amount: string;
  pay_method: string;
}

export const PaymentMethodTest: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user?.user);
  const { isTablet } = useResponsive();
  const dispatch = useAppDispatch();
  const onClickPayment = (values: paymentMethodTestRequest) => {
    setLoading(true);
    const { IMP } = window;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    IMP.init('imp24057748');
    console.log(user);
    const params: RequestPayParams = {
      pg: 'html5_inicis.INIpayTest',
      pay_method: values.pay_method,
      merchant_uid: 'merchant_' + Date.now(), // 가맹점에서 발행한 고유한 주문번호를 사용합니다.
      name: values.amount,
      amount: parseInt(values.amount),
      buyer_name: user?.name,
      buyer_tel: user?.phone || '01012345678',
      buyer_email: user?.email,
    };
    console.log(params);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    IMP.request_pay(params, onPaymentAccepted);
    setLoading(false);
  };

  const onPaymentAccepted = (response: RequestPayResponse) => {
    if (response) {
      dispatch(doUpdatePoint(response))
        .unwrap()
        .then((res) => {
          notificationController.success({ message: '충전 성공' });
        })
        .catch((error) => {
          notificationController.error({ message: '충전 실패' });
        });
    }
  };
  const onFinish = async (values = {}) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFieldsChanged(false);
      notificationController.success({ message: t('common.success') });
      console.log(values);
    }, 1000);
  };

  const content = (
    <BaseButtonsForm
      {...formItemLayout}
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      name="validateForm"
      initialValues={{ 'radio-button': 'card' }}
      footer={
        <BaseButtonsForm.Item>
          <BaseButton type="primary" htmlType="submit" loading={isLoading}>
            결제
          </BaseButton>
        </BaseButtonsForm.Item>
      }
      onFinish={onClickPayment}
    >
      <BaseButtonsForm.Item label={t('forms.validationFormLabels.inputNumber')}>
        <label>
          <BaseButtonsForm.Item name="amount" noStyle>
            <InputNumber min={1} max={10000000} />
          </BaseButtonsForm.Item>
        </label>
        <span> 원</span>
      </BaseButtonsForm.Item>

      <BaseButtonsForm.Item
        name="radio-button"
        label={t('forms.validationFormLabels.radioButton')}
        rules={[{ required: true, message: t('forms.validationFormLabels.itemError') }]}
      >
        <BaseRadio.Group name="pay_method">
          <BaseRadio.Button value="card">Card</BaseRadio.Button>
          <BaseRadio.Button value="trans">Trans</BaseRadio.Button>
        </BaseRadio.Group>
      </BaseButtonsForm.Item>
    </BaseButtonsForm>
  );
  return isTablet ? content : <BaseCard>{content}</BaseCard>;
};
