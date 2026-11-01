"use client";

import { Layout } from "@/components/layout";
import {
  useCheckoutForm,
  CheckoutHeader,
  CheckoutEmptyCart,
  CheckoutContactForm,
  CheckoutShippingForm,
  CheckoutPaymentMethod,
  CheckoutGiftWrap,
  CheckoutOrderSummary,
  CheckoutConfirmation,
} from "@/features/checkout";

export default function CheckoutPage() {
  const {
    lines,
    subtotal,
    user,
    fullName,
    setFullName,
    phone,
    setPhone,
    altPhone,
    setAltPhone,
    email,
    setEmail,
    zone,
    setZone,
    division,
    setDivision,
    cityDistrict,
    setCityDistrict,
    area,
    setArea,
    streetAddress,
    setStreetAddress,
    deliveryNote,
    setDeliveryNote,
    payment,
    setPayment,
    bkashPhone,
    setBkashPhone,
    bkashTrxId,
    setBkashTrxId,
    nagadPhone,
    setNagadPhone,
    nagadTrxId,
    setNagadTrxId,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    couponInput,
    setCouponInput,
    appliedCoupon,
    isSubmitting,
    orderSummaryData,
    baseShippingFee,
    couponDiscount,
    grandTotal,
    handleApplyCoupon,
    handleRemoveCoupon,
    handlePlaceOrder,
  } = useCheckoutForm();

  if (orderSummaryData) {
    return (
      <Layout>
        <CheckoutConfirmation order={orderSummaryData} />
      </Layout>
    );
  }

  return (
    <Layout>
      <CheckoutHeader />

      <div className="container-lux py-8 sm:py-12">
        <h1 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
          Checkout & Dispatch
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Express shipping from Tokyo & Dhaka central warehouse. Cash on Delivery & bKash available
          nationwide.
        </p>

        {lines.length === 0 ? (
          <CheckoutEmptyCart />
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="mt-8 grid gap-10 lg:grid-cols-12 items-start"
          >
            {/* Left 7 Columns: Checkout Details Form */}
            <div className="lg:col-span-7 space-y-6">
              <CheckoutContactForm
                fullName={fullName}
                onFullNameChange={setFullName}
                phone={phone}
                onPhoneChange={setPhone}
                altPhone={altPhone}
                onAltPhoneChange={setAltPhone}
                email={email}
                onEmailChange={setEmail}
                isLoggedIn={Boolean(user)}
              />

              <CheckoutShippingForm
                zone={zone}
                onZoneChange={setZone}
                subtotal={subtotal}
                appliedCoupon={appliedCoupon}
                division={division}
                onDivisionChange={setDivision}
                cityDistrict={cityDistrict}
                onCityDistrictChange={setCityDistrict}
                area={area}
                onAreaChange={setArea}
                streetAddress={streetAddress}
                onStreetAddressChange={setStreetAddress}
                deliveryNote={deliveryNote}
                onDeliveryNoteChange={setDeliveryNote}
              />

              <CheckoutPaymentMethod
                payment={payment}
                onPaymentChange={setPayment}
                grandTotal={grandTotal}
                bkashPhone={bkashPhone}
                onBkashPhoneChange={setBkashPhone}
                bkashTrxId={bkashTrxId}
                onBkashTrxIdChange={setBkashTrxId}
                nagadPhone={nagadPhone}
                onNagadPhoneChange={setNagadPhone}
                nagadTrxId={nagadTrxId}
                onNagadTrxIdChange={setNagadTrxId}
              />

              <CheckoutGiftWrap
                giftWrap={giftWrap}
                onGiftWrapChange={setGiftWrap}
                giftMessage={giftMessage}
                onGiftMessageChange={setGiftMessage}
              />
            </div>

            {/* Right 5 Columns: Sticky Order Summary Sidebar */}
            <CheckoutOrderSummary
              lines={lines}
              subtotal={subtotal}
              couponInput={couponInput}
              onCouponInputChange={setCouponInput}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              couponDiscount={couponDiscount}
              baseShippingFee={baseShippingFee}
              zone={zone}
              giftWrap={giftWrap}
              grandTotal={grandTotal}
              isSubmitting={isSubmitting}
            />
          </form>
        )}
      </div>
    </Layout>
  );
}
