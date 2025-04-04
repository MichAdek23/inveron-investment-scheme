
import { supabase } from "../supabase/client";

// Paystack public key
export const PAYSTACK_PUBLIC_KEY = "pk_live_9014455da6f8af7f59c7ca7718691d9353ef17eb";

// Exchange rate for USD to NGN (this could be made dynamic in the future)
export const USD_TO_NGN_RATE = 1550; // Approximate exchange rate

// Convert USD to NGN
export const convertUsdToNgn = (usdAmount: number): number => {
  return Math.round(usdAmount * USD_TO_NGN_RATE);
};

// Format NGN currency
export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Initialize Paystack transaction
export const initializePayment = async (
  email: string,
  amountInNaira: number,
  planId: string,
  name: string,
  callbackUrl: string
) => {
  try {
    const { data, error } = await supabase.functions.invoke("paystack", {
      body: {
        action: "initialize",
        email,
        amount: amountInNaira,
        planId,
        name,
        callbackUrl,
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error initializing payment:", error);
    throw error;
  }
};

// Verify Paystack transaction
export const verifyTransaction = async (reference: string) => {
  try {
    const { data, error } = await supabase.functions.invoke("paystack", {
      body: {
        action: "verify",
        reference,
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};
