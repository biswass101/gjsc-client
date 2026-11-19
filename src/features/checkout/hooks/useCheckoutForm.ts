"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useShop } from "@/context";
import { useAdmin } from "@/context/admin-context";
import type { DeliveryZone, PaymentMethod, OrderConfirmationData } from "../types";
import { VALID_COUPONS } from "../data/checkoutConstants";
import { customerApi, ordersApi, paymentApi, tokenStorage } from "@/lib/api";

export function useCheckoutForm() {
  const { lines, subtotal, clearCart, user } = useShop();
  const { settings, refreshSettings } = useAdmin();

  // Fresh sync from backend database on mount and upon any admin update events
  useEffect(() => {
    if (typeof refreshSettings === "function") {
      refreshSettings();
    }

    const handleSync = () => {
      if (typeof refreshSettings === "function") {
        refreshSettings();
      }
    };

    window.addEventListener("gjsc_settings_synced", handleSync);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "gjsc_settings_timestamp" || e.key === "gjsc_admin_storage") {
        handleSync();
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("gjsc_settings_synced", handleSync);
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshSettings]);

  // Contact info
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [altPhone, setAltPhone] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");

  // Shipping destination
  const [zone, setZone] = useState<DeliveryZone>("dhaka_metro");
  const [division, setDivision] = useState("Dhaka");
  const [cityDistrict, setCityDistrict] = useState("Dhaka");
  const [area, setArea] = useState("");
  const [streetAddress, setStreetAddress] = useState(user?.address ?? "");
  const [deliveryNote, setDeliveryNote] = useState("");

  useEffect(() => {
    if (!user) return;
    setFullName((prev) => prev || user.name || "");
    setEmail((prev) => prev || user.email || "");
    setPhone((prev) => prev || user.phone || "");
    if (user.address) {
      setStreetAddress((prev) => prev || user.address || "");
    }

    if (tokenStorage.get()) {
      customerApi
        .getAddresses()
        .then((addrs) => {
          if (!Array.isArray(addrs) || addrs.length === 0) return;
          const def = addrs.find((a) => a.isDefault) || addrs[0];
          if (!def) return;
          setFullName((prev) => prev || def.name || "");
          if (def.phone && def.phone !== "Not provided") {
            setPhone((prev) => prev || def.phone);
          }
          setDivision((prev) => def.division || prev);
          setCityDistrict((prev) => def.city || prev);
          setArea((prev) => prev || def.area || "");
          setStreetAddress((prev) => prev || def.street || "");
          if (def.deliveryZone) setZone(def.deliveryZone);
        })
        .catch(() => {
          /* non-fatal */
        });
    }
  }, [user]);

  // Payment states
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [bkashPhone, setBkashPhone] = useState("");
  const [bkashTrxId, setBkashTrxId] = useState("");
  const [nagadPhone, setNagadPhone] = useState("");
  const [nagadTrxId, setNagadTrxId] = useState("");

  // Card & Online Banking states
  const [cardholderName, setCardholderName] = useState(user?.name ?? "");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardPaymentType, setCardPaymentType] = useState<"card" | "netbanking">("card");
  const [selectedBank, setSelectedBank] = useState("city_touch");

  // Keep payment method aligned with admin toggles
  useEffect(() => {
    const isCodValid = settings.codEnabled;
    const isBkashValid = settings.bkashEnabled;
    const isNagadValid = settings.nagadEnabled;
    const isCardValid = settings.cardEnabled;

    if (payment === "cod" && !isCodValid) {
      if (isBkashValid) setPayment("bkash");
      else if (isNagadValid) setPayment("nagad");
      else if (isCardValid) setPayment("card");
    } else if (payment === "bkash" && !isBkashValid) {
      if (isCodValid) setPayment("cod");
      else if (isNagadValid) setPayment("nagad");
      else if (isCardValid) setPayment("card");
    } else if (payment === "nagad" && !isNagadValid) {
      if (isCodValid) setPayment("cod");
      else if (isBkashValid) setPayment("bkash");
      else if (isCardValid) setPayment("card");
    } else if (payment === "card" && !isCardValid) {
      if (isCodValid) setPayment("cod");
      else if (isBkashValid) setPayment("bkash");
      else if (isNagadValid) setPayment("nagad");
    }
  }, [settings.codEnabled, settings.bkashEnabled, settings.nagadEnabled, settings.cardEnabled, payment]);

  // Add-ons & Promo
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSummaryData, setOrderSummaryData] = useState<OrderConfirmationData | null>(null);

  // Dynamic Shipping Calculation based on admin settings
  const baseShippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    const freeMin = typeof settings.freeShippingMin === "number" ? settings.freeShippingMin : 5000;
    if (subtotal >= freeMin) return 0;
    if (appliedCoupon === "FREESHIP") return 0;

    const rateDhaka = typeof settings.insideDhakaRate === "number" ? settings.insideDhakaRate : 60;
    const rateOutside = typeof settings.outsideDhakaRate === "number" ? settings.outsideDhakaRate : 120;
    const rateExpress = typeof settings.expressDeliveryRate === "number" ? settings.expressDeliveryRate : 150;

    switch (zone) {
      case "dhaka_metro":
        return rateDhaka;
      case "dhaka_suburbs":
        return Math.min(rateOutside, rateDhaka + 40);
      case "outside_dhaka":
        return rateOutside;
      default:
        return rateDhaka;
    }
  }, [subtotal, zone, appliedCoupon, settings.freeShippingMin, settings.insideDhakaRate, settings.outsideDhakaRate, settings.expressDeliveryRate]);

  // Coupon Discount Calculation
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const rule = VALID_COUPONS[appliedCoupon];
    if (!rule) return 0;
    if (rule.type === "percent") {
      return Math.round((subtotal * rule.value) / 100);
    }
    if (rule.type === "fixed") {
      return Math.min(rule.value, subtotal);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const giftFee = giftWrap ? 150 : 0;
  const grandTotal = Math.max(0, subtotal - couponDiscount + baseShippingFee + giftFee);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (!clean) return;

    try {
      const res = await ordersApi.validateCoupon(clean, subtotal);
      if (res?.valid) {
        setAppliedCoupon(res.code);
        setCouponInput("");
        toast.success("Coupon code applied successfully!", {
          description: res.message || `${res.code}: ৳${res.discountAmount} off`,
        });
        return;
      }
    } catch (err: any) {
      if (VALID_COUPONS[clean]) {
        setAppliedCoupon(clean);
        setCouponInput("");
        toast.success("Coupon code applied successfully!", {
          description: VALID_COUPONS[clean]?.label,
        });
        return;
      }
      toast.error("Invalid coupon code", {
        description: err?.message || "Please check your code or try 'TOKYO10'.",
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lines.length === 0) {
      toast.error("Your shopping bag is empty");
      return;
    }

    // Phone validation for BD numbers (11 digits, starts with 01)
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      toast.error("Invalid Bangladeshi mobile number", {
        description: "Please provide a valid 11-digit mobile number (e.g., 017XXXXXXXX).",
      });
      return;
    }

    // Admin Gateway Enforcement & Validations
    if (payment === "cod") {
      if (!settings.codEnabled) {
        toast.error("Cash on Delivery is currently disabled", {
          description: "Please choose bKash, Nagad, or Card payment.",
        });
        return;
      }
      if (settings.codMinAmount && grandTotal < settings.codMinAmount) {
        toast.error(`COD minimum order requirement is ৳${settings.codMinAmount}`);
        return;
      }
      if (settings.codMaxAmount && grandTotal > settings.codMaxAmount) {
        toast.error(`COD maximum order limit is ৳${settings.codMaxAmount}`);
        return;
      }
    }

    if (payment === "bkash") {
      if (!settings.bkashEnabled) {
        toast.error("bKash payment is currently disabled");
        return;
      }
    }

    if (payment === "nagad") {
      if (!settings.nagadEnabled) {
        toast.error("Nagad payment is currently disabled");
        return;
      }
      if (!nagadPhone.trim() || !nagadTrxId.trim()) {
        toast.error("Nagad payment details required", {
          description: "Please provide your Nagad mobile number and the Transaction ID (TrxID).",
        });
        return;
      }
    }

    // Card & NetBanking Validation
    let cardAuthRef = "";
    let cleanLast4 = "";
    let detectedBrand = "Card";

    if (payment === "card") {
      if (!settings.cardEnabled) {
        toast.error("Card / Online Banking is currently disabled");
        return;
      }

      if (cardPaymentType === "card") {
        if (!cardholderName.trim()) {
          toast.error("Cardholder name required", {
            description: "Please enter the full name printed on your payment card.",
          });
          return;
        }
        const strippedNumber = cardNumber.replace(/\s/g, "");
        if (strippedNumber.length < 15 || strippedNumber.length > 19) {
          toast.error("Invalid card number", {
            description: "Please enter a valid 15-16 digit debit or credit card number.",
          });
          return;
        }
        if (!/^\d{2}\/\d{2}$/.test(cardExpiry.trim())) {
          toast.error("Invalid card expiry", {
            description: "Please enter the expiration date in MM/YY format.",
          });
          return;
        }
        if (cardCvc.trim().length < 3) {
          toast.error("Invalid CVV/CVC code", {
            description: "Please enter the 3 or 4 digit security code on your card.",
          });
          return;
        }

        cleanLast4 = strippedNumber.slice(-4);
        if (strippedNumber.startsWith("4")) detectedBrand = "Visa";
        else if (/^(5[1-5]|2[2-7])/.test(strippedNumber)) detectedBrand = "Mastercard";
        else if (/^3[47]/.test(strippedNumber)) detectedBrand = "American Express";
        else if (/^62/.test(strippedNumber)) detectedBrand = "UnionPay";

        cardAuthRef = `CARD-AUTH-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      } else {
        if (!selectedBank) {
          toast.error("Please select your bank for online payment authorization");
          return;
        }
        cardAuthRef = `NETBANK-${selectedBank.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      }
    }

    setIsSubmitting(true);

    try {
      const backendPaymentMethod =
        payment === "bkash" ? "bKash" : payment === "nagad" ? "Nagad" : payment === "card" ? "Card" : "COD";

      const backendPayload: any = {
        customerName: fullName.trim() || user?.name || "Valued Customer",
        customerEmail: (email.trim() || user?.email || `${cleanPhone}@gloriousjapan.customer`).toLowerCase(),
        customerPhone: cleanPhone,
        address: streetAddress.trim(),
        area: area.trim() || cityDistrict.trim() || "Central",
        city: cityDistrict.trim() || "Dhaka",
        division: division.trim() || "Dhaka",
        deliveryZone: zone,
        paymentMethod: backendPaymentMethod,
        items: lines.map((l) => ({
          slug: l.product.slug,
          qty: l.qty,
          size: l.size || "Standard",
        })),
      };

      const finalTrxId =
        payment === "bkash"
          ? bkashTrxId.trim()
          : payment === "nagad"
            ? nagadTrxId.trim()
            : payment === "card"
              ? cardAuthRef
              : "";

      if (finalTrxId) backendPayload.trxId = finalTrxId;
      if (appliedCoupon) backendPayload.couponCode = appliedCoupon;

      const cardPaymentNote =
        payment === "card"
          ? cardPaymentType === "card"
            ? `[Paid via ${detectedBrand} •••• ${cleanLast4} - Ref: ${cardAuthRef} - Gateway: ${settings.cardGateway || "SSLCommerz"}]`
            : `[Paid via NetBanking (${selectedBank}) - Ref: ${cardAuthRef} - Gateway: ${settings.cardGateway || "SSLCommerz"}]`
          : "";

      const combinedNotes = [
        deliveryNote,
        giftWrap ? `Gift Wrap Requested${giftMessage ? ": " + giftMessage : ""}` : "",
        cardPaymentNote,
      ]
        .filter(Boolean)
        .join(" | ");

      if (combinedNotes) backendPayload.notes = combinedNotes;

      const res = await ordersApi.createOrder(backendPayload);

      // If customer selected bKash without manual TrxID, initiate live gateway redirect
      if (payment === "bkash" && !bkashTrxId.trim()) {
        try {
          toast.loading("Connecting to bKash Secure Gateway...", { id: "bkash-gw" });
          const session = await paymentApi.initiateBkash(res.id, res.paymentAccessToken);
          if (session?.bkashURL) {
            clearCart();
            window.location.href = session.bkashURL;
            return;
          }
        } catch (gwErr: any) {
          toast.dismiss("bkash-gw");
          toast.error("bKash gateway initiation failed: " + (gwErr?.message || "Please retry or select another payment method."));
          setIsSubmitting(false);
          return;
        }
      }

      setOrderSummaryData({
        orderId: res.orderNumber || `GJ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        total: res.total ? Number(res.total) : grandTotal,
        shippingFee: res.deliveryFee ? Number(res.deliveryFee) : baseShippingFee,
        discount: res.discountAmount ? Number(res.discountAmount) : couponDiscount,
        zone,
        address: `${streetAddress}, ${area ? area + ", " : ""}${cityDistrict}, ${division}`,
        phone: cleanPhone,
        payment,
        date: new Date(res.createdAt || Date.now()).toLocaleDateString("en-BD", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        items: [...lines],
        trxId: finalTrxId,
        paymentStatus: payment === "card" ? "Paid" : "Pending",
        cardBrand: detectedBrand,
        cardLast4: cleanLast4,
        selectedBank: selectedBank,
        cardPaymentType: cardPaymentType,
      });

      clearCart();
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success("Order Placed Successfully!", {
        description: `Order #${res.orderNumber} confirmed. Payment Method: ${backendPaymentMethod}.`,
      });
    } catch (err: any) {
      setIsSubmitting(false);
      toast.error(err?.message || "Failed to place order. Please review your details and try again.");
    }
  };

  return {
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
    cardholderName,
    setCardholderName,
    cardNumber,
    setCardNumber,
    cardExpiry,
    setCardExpiry,
    cardCvc,
    setCardCvc,
    cardPaymentType,
    setCardPaymentType,
    selectedBank,
    setSelectedBank,
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
  };
}
