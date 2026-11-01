"use client";

import { Layout } from "@/components/layout";
import {
  useOrderTracking,
  TrackingSearchHeader,
  TrackingLiveStatus,
  TrackingTimeline,
  TrackingShipmentDetails,
  TrackingParcelContents,
  TrackingSupportBox,
} from "@/features/order-tracking";

export default function TrackPage() {
  const {
    orderIdInput,
    setOrderIdInput,
    phoneInput,
    setPhoneInput,
    isLoading,
    activeOrder,
    handleTrackSubmit,
    handleSelectPreset,
    whatsappHelpUrl,
  } = useOrderTracking();

  return (
    <Layout>
      <TrackingSearchHeader
        orderIdInput={orderIdInput}
        onOrderIdInputChange={setOrderIdInput}
        phoneInput={phoneInput}
        onPhoneInputChange={setPhoneInput}
        isLoading={isLoading}
        activeOrder={activeOrder}
        onSelectPreset={handleSelectPreset}
        onSubmit={handleTrackSubmit}
      />

      {activeOrder && (
        <div className="container-lux py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left 8 Columns: Live Status & Visual Stepper Timeline */}
            <div className="lg:col-span-8 space-y-6">
              <TrackingLiveStatus order={activeOrder} />
              <TrackingTimeline events={activeOrder.events} />
            </div>

            {/* Right 4 Columns: Destination, Package Contents & WhatsApp Support */}
            <aside className="lg:col-span-4 space-y-6">
              <TrackingShipmentDetails order={activeOrder} />
              <TrackingParcelContents items={activeOrder.items} />
              <TrackingSupportBox whatsappUrl={whatsappHelpUrl} />
            </aside>
          </div>
        </div>
      )}
    </Layout>
  );
}
