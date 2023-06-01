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

export const PaymentMethod: React.FC = () => {
  const { t } = useTranslation();

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
      merchant_uid: 'Order_1234', // 가맹점에서 발행한 고유한 주문번호를 사용합니다.
      name: 'Test 상품',
      amount: 10000,
      buyer_name: '홍길동',
      buyer_tel: '01012345678',
      buyer_email: 'test@test.com',
      m_redirect_url: 'https://your-service.com/pay/success', // 모바일 결제 완료 후 이동할 페이지 주소입니다.
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
        <BaseInput suffix="KRW" />
        <BaseButtonsForm.Item
          name="radio-button"
          label={t('forms.validationFormLabels.radioButton')}
          rules={[{ required: true, message: t('forms.validationFormLabels.itemError') }]}
        >
          <BaseRadio.Group>
            <BaseRadio.Button value="card">{t('forms.validationFormLabels.item')} 1</BaseRadio.Button>
            <BaseRadio.Button value="b">{t('forms.validationFormLabels.item')} 2</BaseRadio.Button>
            <BaseRadio.Button value="c">{t('forms.validationFormLabels.item')} 3</BaseRadio.Button>
          </BaseRadio.Group>
        </BaseButtonsForm.Item>

        <BaseButton type="default" onClick={onClickPayment}>
          결제
        </BaseButton>
        {/*<BaseSpin spinning={loading}>*/}
        {/*  <PaymentCardsWidget cards={cards} onCardRemove={handleCardRemove} onCardAdd={handleCardAdd} />*/}
        {/*</BaseSpin>*/}
      </BaseCol>
    </BaseRow>
  );

  return isTablet ? content : <BaseCard>{content}</BaseCard>;
};
