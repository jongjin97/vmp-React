import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { useResponsive } from '@app/hooks/useResponsive';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseRadio } from '@app/components/common/BaseRadio/BaseRadio';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { RequestPayParams, RequestPayResponse } from 'iamport-typings';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { PaymentMethodTest } from '@app/components/profile/profileCard/profileFormNav/nav/payments/paymentMethod/PaymentMethodTest';

export const PaymentMethod: React.FC = () => {
  const { t } = useTranslation();
  interface PaymentInfo {
    amount: number;
    name: string;
  }
  // const [cards, setCards] = useState<PaymentCard[]>([]);
  // const [loading, setLoading] = useState(false);
  //
  const user = useAppSelector((state) => state.user?.user);

  // useEffect(() => {
  //   if (id) {
  //     setLoading(true);
  //     getPaymentCards(id)
  //       .then((res) => setCards(res))
  //       .finally(() => setLoading(false));
  //   }
  // }, [id]);

  const { isTablet } = useResponsive();

  // const handleCardRemove = (cardNumber: string) => setCards(cards.filter((card) => card.number !== cardNumber));
  //
  // const handleCardAdd = (card: PaymentCard) => {
  //   setCards([...cards, card]);
  // };

  const onClickPayment = () => {
    const { IMP } = window;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    IMP.init('imp24057748');
    console.log(user);
    const params: RequestPayParams = {
      pg: 'html5_inicis.INIpayTest',
      pay_method: 'card',
      merchant_uid: 'merchant_' + Date.now(), // 가맹점에서 발행한 고유한 주문번호를 사용합니다.
      name: 'Test 상품',
      amount: 10000,
      buyer_name: user?.name,
      buyer_tel: user?.phone || '01012345678',
      buyer_email: user?.email,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    IMP.request_pay(params, onPaymentAccepted);
  };

  const onPaymentAccepted = (response: RequestPayResponse) => {
    const { imp_uid, merchant_uid } = response;
    console.log(imp_uid, merchant_uid);
  };

  const content = (
    <BaseRow gutter={[32, 32]}>
      <BaseCol span={24}>
        <BaseForm.Title>{t('profile.nav.payments.paymentMethod')}</BaseForm.Title>
      </BaseCol>
      <BaseCol span={24}>
        <PaymentMethodTest />
      </BaseCol>
    </BaseRow>
  );

  return isTablet ? content : <BaseCard>{content}</BaseCard>;
};
