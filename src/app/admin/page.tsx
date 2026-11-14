"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdmin } from "@/context/admin-context";
import {
  DashboardHeader,
  DashboardActionAlerts,
  DashboardKpiRibbon,
  DashboardFinancialTab,
  DashboardFunnelTab,
  DashboardCatalogTab,
  DashboardWholeSiteRadarTab,
  DashboardRecentOrdersTable,
  useDashboardMetrics,
} from "@/features/admin-dashboard";

export default function AdminDashboard() {
  const { orders, products, customers, preOrders, reviews, updateOrderStatus } = useAdmin();

  const {
    timeRange,
    setTimeRange,
    totalGrossRevenue,
    deliveredRevenue,
    estimatedProfit,
    grossMarginPercent,
    avgOrderValue,
    pendingOrdersCount,
    lowStockProducts,
    pendingReviewsCount,
    preOrderRevenue,
    avgStoreRating,
    revenueChartData,
    funnelData,
    regionalSalesData,
    paymentMethodData,
    brandPerformanceData,
    topProducts,
    orderStatusData,
    handleExportCSV,
    isLiveDb,
    isLoadingTelemetry,
    fetchTelemetry,
  } = useDashboardMetrics();

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
      {/* Executive Header & Controls */}
      <DashboardHeader
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        onExportCSV={handleExportCSV}
        isLiveDb={isLiveDb}
        isLoading={isLoadingTelemetry}
        onRefresh={fetchTelemetry}
      />

      {/* Critical Action Alerts Bar */}
      <DashboardActionAlerts
        pendingOrdersCount={pendingOrdersCount}
        lowStockProducts={lowStockProducts}
        pendingReviewsCount={pendingReviewsCount}
      />

      {/* Executive Financial & KPI Ribbon */}
      <DashboardKpiRibbon
        totalGrossRevenue={totalGrossRevenue}
        deliveredRevenue={deliveredRevenue}
        estimatedProfit={estimatedProfit}
        grossMarginPercent={grossMarginPercent}
        avgOrderValue={avgOrderValue}
        preOrderRevenue={preOrderRevenue}
        preOrdersCount={preOrders.length}
        totalOrdersCount={orders.length}
        activeOrdersCount={orders.filter((o) => o.fulfillmentStatus !== "Cancelled").length}
        customersCount={customers.length}
        avgStoreRating={avgStoreRating}
        reviewsCount={reviews.length}
      />

      {/* Interactive Tabs for Deep Business Intelligence */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-2">
          <TabsList className="bg-secondary/40 p-1 rounded-xl">
            <TabsTrigger value="overview" className="text-xs font-semibold">
              Financial Velocity
            </TabsTrigger>
            <TabsTrigger value="funnel" className="text-xs font-semibold">
              Conversion Funnel
            </TabsTrigger>
            <TabsTrigger value="catalog" className="text-xs font-semibold">
              Catalog & Brands
            </TabsTrigger>
            <TabsTrigger value="whole_site" className="text-xs font-semibold">
              360° Website Radar
            </TabsTrigger>
          </TabsList>
          <span className="text-[11px] text-muted-foreground font-mono">
            Updated: {new Date().toLocaleTimeString()}
          </span>
        </div>

        <TabsContent value="overview">
          <DashboardFinancialTab
            revenueChartData={revenueChartData}
            paymentMethodData={paymentMethodData}
            regionalSalesData={regionalSalesData}
            orderStatusData={orderStatusData}
          />
        </TabsContent>

        <TabsContent value="funnel">
          <DashboardFunnelTab funnelData={funnelData} />
        </TabsContent>

        <TabsContent value="catalog">
          <DashboardCatalogTab
            brandPerformanceData={brandPerformanceData}
            topProducts={topProducts}
          />
        </TabsContent>

        <TabsContent value="whole_site">
          <DashboardWholeSiteRadarTab />
        </TabsContent>
      </Tabs>

      {/* Recent Orders Table & Dispatch Controller */}
      <DashboardRecentOrdersTable orders={orders} onUpdateStatus={updateOrderStatus} />
    </div>
  );
}
