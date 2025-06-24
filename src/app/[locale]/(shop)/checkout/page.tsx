"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/stores/cartStore";
import { useAuthStore } from "@/app/stores/authStore";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Gift, Loader2, Truck } from "lucide-react";
import { formatCurrencyVND } from "@/lib/utils";

interface Address {
  fullName: string;
  phoneNumber: string;
  street: string;
  ward: string;
  district: string;
  city: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const [address, setAddress] = useState<Address>({
    fullName: user?.full_name || "",
    phoneNumber: "",
    street: "",
    ward: "",
    district: "",
    city: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      toast.error("Please log in to proceed.");
      router.push("/auth/login?callbackUrl=/checkout");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    const missingField = Object.entries(address).find(([_, value]) => !value);
    if (missingField) {
      toast.error("Please fill in all shipping address fields.");
      return;
    }
    setLoading(true);
    try {
      // TODO: Call backend API to create order
      clearCart();
      toast.success("Order placed successfully!");
      setTimeout(() => router.push("/order-success"), 500);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({
    name,
    placeholder,
    value,
    icon,
    onChange,
    required = true,
  }: any) => (
    <div>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 mb-1 block"
      >
        {placeholder}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          {icon}
        </span>
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${placeholder.toLowerCase()}`}
          required={required}
          className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Complete Your Order
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Just a few more steps to get your items.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-10 gap-8 lg:gap-12">
          {/* Left: Shipping & Payment */}
          <div className="lg:col-span-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {/* Contact Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Contact Information
              </h2>
              <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
                <img
                  src={`https://i.pravatar.cc/150?u=${user?.email}`}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {user?.full_name}
                  </p>
                  <p className="text-sm text-gray-500">{user?.email.address}</p>
                </div>
              </div>
            </div>
            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <InputField
                  name="fullName"
                  placeholder="Full Name"
                  value={address.fullName}
                  onChange={handleInputChange}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                />
                <InputField
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={address.phoneNumber}
                  onChange={handleInputChange}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  }
                />
                <InputField
                  name="street"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={handleInputChange}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  }
                />
                <div className="grid sm:grid-cols-3 gap-4">
                  <InputField
                    name="city"
                    placeholder="City / Province"
                    value={address.city}
                    onChange={handleInputChange}
                    icon={<div />}
                  />
                  <InputField
                    name="district"
                    placeholder="District"
                    value={address.district}
                    onChange={handleInputChange}
                    icon={<div />}
                  />
                  <InputField
                    name="ward"
                    placeholder="Ward"
                    value={address.ward}
                    onChange={handleInputChange}
                    icon={<div />}
                  />
                </div>
              </div>
            </div>
            {/* Payment Method */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-4 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-blue-600 bg-blue-50 shadow-md"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    readOnly
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <Truck className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Cash on Delivery (COD)
                    </h3>
                    <p className="text-sm text-gray-500">
                      Pay with cash upon receiving your order.
                    </p>
                  </div>
                </label>
                <label
                  className={`flex items-center gap-4 border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-blue-600 bg-blue-50 shadow-md"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    readOnly
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                  />
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-bold text-gray-800">
                      Credit / Debit Card
                    </h3>
                    <p className="text-sm text-gray-500">
                      Pay with Visa, MasterCard, etc. (Via Stripe/PayPal)
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          {/* Right: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-4">
                {items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://placehold.co/100x100/E2E8F0/4A5568?text=Img";
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 leading-tight">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-gray-700">
                      {formatCurrencyVND(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 mb-6">
                <label
                  htmlFor="discount"
                  className="text-sm font-medium text-gray-700 mb-1 block"
                >
                  Discount Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <Gift className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      id="discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      placeholder="Enter code"
                      className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
              <div className="space-y-2 py-4 border-t border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrencyVND(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 mb-6">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-blue-600">
                  {formatCurrencyVND(totalPrice)}
                </span>
              </div>
              <Button
                type="submit"
                className="w-full text-lg font-bold py-3 h-auto bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loading}
                size="lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </span>
                ) : `Place Order (${paymentMethod === "cod" ? "COD" : "Card"})`}
              </Button>
              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="w-full mt-3 text-center text-sm text-gray-500 hover:text-blue-600 font-medium flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Cart
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
