// components/Transactions.js
"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  ListChecks,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Tag,
  FileText,
  CreditCard,
  RefreshCw,
  Sparkles,
  Target,
  PieChart,
} from "lucide-react";

// ✅ ENHANCED BACKGROUND IMAGE URL
const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1911&q=80";

const CATEGORIES = {
  Expense: [
    "Housing",
    "Rent/Mortgage", // NEW: Specific Housing breakdown
    "Property Tax", // NEW: Specific Housing breakdown
    "Repairs & Maintenance", // NEW: Specific Housing breakdown
    "Food & Dining",
    "Groceries", // NEW: Specific Food breakdown
    "Restaurants/Takeout", // NEW: Specific Food breakdown
    "Coffee/Drinks", // NEW: Specific Food breakdown
    "Transportation",
    "Car Payment/Lease", // NEW: Specific Transport breakdown
    "Gas/Fuel", // NEW: Specific Transport breakdown
    "Public Transit", // NEW: Specific Transport breakdown
    "Utilities",
    "Entertainment",
    "Subscriptions",
    "Debt/Loan",
    "Credit Card Payment", // NEW: Specific Debt breakdown
    "Student Loan", // NEW: Specific Debt breakdown
    "Insurance",
    "Healthcare",
    "Dental/Vision", // NEW: Specific Healthcare breakdown
    "Medication/Pharmacy", // NEW: Specific Healthcare breakdown
    "Education",
    "Personal Care",
    "Clothing/Apparel", // NEW: Specific Personal Care breakdown
    "Grooming/Haircuts", // NEW: Specific Personal Care breakdown
    "Savings & Investing",
    "Taxes",
    "Gifts & Donations",
    "Pet Care",
    "Childcare",
    "Travel", // NEW: Flights, hotels, vacation costs
    "Fees & Charges", // NEW: Bank fees, late fees, ATM fees
    "Office Supplies/Tech", // NEW: For home office or personal tech
    "Miscellaneous",
    "Other Expense",
  ],
  Income: [
    "Salary",
    "Freelance",
    "Investment",
    "Dividends/Interest", // NEW: Granular Investment Income
    "Capital Gains", // NEW: Granular Investment Income
    "Gift",
    "Refund",
    "Bonus",
    "Rental Income",
    "Side Hustle", // NEW: For activities outside of primary freelance/job
    "Government Benefits", // NEW: Unemployment, social security, etc.
    "Reimbursement", // NEW: Expense refunds from employer or third party
    "Other Income",
  ],
};

const CATEGORY_ICONS = {
  // --- Expanded Expense Icons ---
  Housing: "🏠",
  "Rent/Mortgage": "🔑", // New icon
  "Property Tax": "🏛️", // New icon
  "Repairs & Maintenance": "🛠️", // New icon
  "Food & Dining": "🍕",
  Groceries: "🛒", // New icon
  "Restaurants/Takeout": "🍽️", // New icon
  "Coffee/Drinks": "☕", // New icon
  Transportation: "🚗",
  "Car Payment/Lease": "🅿️", // New icon
  "Gas/Fuel": "⛽", // New icon
  "Public Transit": "🚌", // New icon
  Utilities: "💡",
  Entertainment: "🎬",
  Subscriptions: "📱",
  "Debt/Loan": "💳",
  "Credit Card Payment": "💵", // New icon
  "Student Loan": "🎓", // New icon
  Insurance: "🛡️",
  Healthcare: "🏥",
  "Dental/Vision": "🦷", // New icon
  "Medication/Pharmacy": "💊", // New icon
  Education: "📚",
  "Personal Care": "🧖",
  "Clothing/Apparel": "👕", // New icon
  "Grooming/Haircuts": "✂️", // New icon
  "Savings & Investing": "📊",
  Taxes: "🧾",
  "Gifts & Donations": "🎗️",
  "Pet Care": "🐾",
  Childcare: "👶",
  Travel: "✈️", // New icon
  "Fees & Charges": "❌", // New icon
  "Office Supplies/Tech": "🖥️", // New icon
  Miscellaneous: "❓", // New icon
  "Other Expense": "📦",

  // --- Expanded Income Icons ---
  Salary: "💼",
  Freelance: "💻",
  Investment: "📈",
  "Dividends/Interest": "🪙", // New icon
  "Capital Gains": "🚀", // New icon
  Gift: "🎁",
  Refund: "↩️",
  Bonus: "🌟",
  "Rental Income": "🏘️",
  "Side Hustle": "💡", // New icon (lightbulb for ideas/side project)
  "Government Benefits": "✅", // New icon
  Reimbursement: "🤝", // New icon (handshake)
  "Other Income": "💰",
};
// --- Enhanced Transaction Row Component (MODIFIED FOR RESPONSIVENESS) ---
const TransactionRow = ({ _id, date, description, amount, type, category }) => (
  <div
    data-id={_id}
    className={`group relative p-4 rounded-2xl transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl border-l-4
        ${
          type === "Expense"
            ? "bg-gradient-to-r from-red-500/5 to-transparent hover:from-red-500/10 border-red-400/60"
            : "bg-gradient-to-r from-green-500/5 to-transparent hover:from-green-500/10 border-green-400/60"
        } 
        backdrop-blur-sm`}
  >
    {/*
            KEY RESPONSIVENESS CHANGE:
            - flex-col: Stacks items vertically on mobile.
            - sm:flex-row: Switches to horizontal layout on small screens and up.
            - sm:items-center: Aligns items vertically in the center on desktop.
        */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
      {/* Left Section - Adjusted to take full width on mobile */}
      <div className="flex items-center space-x-4 flex-1 min-w-0 mb-3 sm:mb-0">
        {/* Category Icon */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg
                    ${
                      type === "Income"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
        >
          {CATEGORY_ICONS[category] || "💸"}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-1">
            {/* Title & Type Tag */}
            <h3 className="text-white font-semibold truncate text-lg">
              {description}
            </h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-bold w-fit sm:mt-0 mt-1
                            ${
                              type === "Income"
                                ? "bg-green-500/30 text-green-300"
                                : "bg-red-500/30 text-red-300"
                            }`}
            >
              {type}
            </span>
          </div>

          {/* Date and Category Details */}
          {/* RESPONSIVENESS CHANGE: Uses flex-wrap for overflow on very small screens */}
          <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-400 mt-1">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span>{category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amount - Adjusted for proper alignment on mobile and desktop */}
      <div
        className={`text-left sm:text-right ml-0 sm:ml-4 pt-3 sm:pt-0 border-t border-white/5 sm:border-t-0 w-full sm:w-auto`}
      >
        <div
          className={`text-xl font-bold ${
            type === "Income" ? "text-green-400" : "text-red-400"
          }`}
        >
          {type === "Income" ? "+" : "-"}${Math.abs(amount).toFixed(2)}
        </div>
        {/* Removed the redundant 'Income'/'Expense' text on desktop, kept the type-tag above */}
        <div className="text-xs text-gray-500 mt-1 hidden sm:block">
          {type === "Income" ? "Credit" : "Debit"}
        </div>
      </div>
    </div>
  </div>
);

// --- Enhanced KPI Card Component (Unchanged) ---
const KpiCard = ({ title, value, icon: Icon, colorClass, trend, subtitle }) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
    <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 h-full">
      <div className="flex items-center justify-between mb-6">
        <div
          className={`p-3 rounded-2xl bg-gradient-to-br ${colorClass} shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full ${
            trend === "up"
              ? "bg-green-500/30 text-green-300"
              : trend === "down"
              ? "bg-red-500/30 text-red-300"
              : "bg-blue-500/30 text-blue-300"
          } flex items-center`}
        >
          {trend === "up" && <TrendingUp className="w-4 h-4 mr-1" />}
          {trend === "down" && <TrendingDown className="w-4 h-4 mr-1" />}
          {!trend && <Target className="w-4 h-4 mr-1" />}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
      <h3 className="text-3xl font-extrabold text-white mb-2">{value}</h3>
      {subtitle && (
        <p className="text-xs text-gray-400 font-light">{subtitle}</p>
      )}
    </div>
  </div>
);

// --- Enhanced Input Component (Unchanged) ---
const FormInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
    />
  </div>
);

// --- Enhanced Select Component (Unchanged) ---
const FormSelect = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <select
      {...props}
      className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm appearance-none"
    />
  </div>
);

// --- Main Enhanced Transactions Component (Unchanged logic, minor container adjustment) ---
export default function TransactionsPage() {
  const [formData, setFormData] = useState({
    type: "Expense",
    category: "Housing",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/transaction", { method: "GET" });

      if (response.status === 401) {
        toast.error("Authentication failed. Please log in.");
        setTransactions([]);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      setTransactions(result.transactions);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(`Failed to load transactions: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();

    // Enhanced welcome toast
    toast.success("Welcome to dashboard!", {
      duration: 4000,
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "#ffffff",
        border: "1px solid #10b981",
        borderRadius: "12px",
        padding: "16px",
        fontSize: "14px",
        fontWeight: "600",
      },
      iconTheme: {
        primary: "#10b981",
        secondary: "#ffffff",
      },
    });
  }, [fetchTransactions]);

  // --- Calculation and Form Handlers (Unchanged) ---
  const { totalIncome, totalExpense, netBalance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      const amount = parseFloat(t.amount) || 0;
      if (t.type === "Income") {
        income += amount;
      } else {
        expense += amount;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense,
    };
  }, [transactions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      const newType = value;
      const defaultCategory = CATEGORIES[newType][0];
      setFormData({
        ...formData,
        type: newType,
        category: defaultCategory,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !formData.description ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      toast.error("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }
    if (
      isNaN(parseFloat(formData.amount)) ||
      parseFloat(formData.amount) <= 0
    ) {
      toast.error("Amount must be a positive number.");
      setIsSubmitting(false);
      return;
    }

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    try {
      const response = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Transaction added successfully!", {
          style: {
            background: "linear-gradient(135deg, #059669, #10b981)",
            color: "white",
            borderRadius: "12px",
          },
        });

        await fetchTransactions();

        setFormData({
          type: formData.type,
          category: CATEGORIES[formData.type][0],
          description: "",
          amount: "",
          date: new Date().toISOString().split("T")[0],
        });
      } else {
        toast.error(
          `Failed to add transaction: ${
            data.message || "Server error"
          }. You may not be logged in.`
        );
      }
    } catch (error) {
      toast.error(`Network error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95)), url('${BACKGROUND_IMAGE_URL}')`,
      }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Toaster */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "linear-gradient(135deg, #1f2937, #374151)",
            marginTop: "70px",
            color: "#ffffff",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />

      {/* --- MAIN CONTENT AREA --- */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Enhanced Header */}
        <div className="mb-12 pt-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
            Financial Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Take control of your finances with beautiful insights and effortless
            tracking
          </p>
        </div>

        {/* --- ENHANCED KPI CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <KpiCard
            title="Net Balance"
            value={`$${netBalance.toFixed(2)}`}
            icon={DollarSign}
            colorClass={
              netBalance >= 0
                ? "from-green-500 to-emerald-500"
                : "from-red-500 to-pink-500"
            }
            trend={netBalance >= 0 ? "up" : "down"}
            subtitle={
              netBalance >= 0
                ? "You're doing great! 💪"
                : "Time to save more 📊"
            }
          />
          <KpiCard
            title="Total Income"
            value={`$${totalIncome.toFixed(2)}`}
            icon={ArrowUp}
            colorClass="from-blue-500 to-cyan-500"
            trend="up"
            subtitle="All income sources combined"
          />
          <KpiCard
            title="Total Expense"
            value={`$${totalExpense.toFixed(2)}`}
            icon={ArrowDown}
            colorClass="from-orange-500 to-red-500"
            trend="down"
            subtitle="Track and optimize spending"
          />
        </div>

        {/* --- MAIN INTERACTION GRIDS --- */}
        {/* RESPONSIVENESS CHANGE: The main grid stacks columns vertically on mobile and tablet (xl:grid-cols-5 handles desktop) */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* LEFT COLUMN - Enhanced Form */}
          <div className="xl:col-span-2">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                {/* Form Header */}
                <div className="flex items-center space-x-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                    <PlusCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Add Transaction
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Record your financial activity
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type and Category Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormSelect
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      icon={TrendingUp}
                    >
                      <option value="Expense">Expense</option>
                      <option value="Income">Income</option>
                    </FormSelect>

                    <FormSelect
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      icon={Tag}
                    >
                      {CATEGORIES[formData.type].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </FormSelect>
                  </div>

                  {/* Description */}
                  <FormInput
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What was this for?"
                    icon={FileText}
                  />

                  {/* Amount and Date Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0.01"
                      step="0.01"
                      icon={DollarSign}
                    />

                    <FormInput
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      icon={Calendar}
                    />
                  </div>

                  {/* Enhanced Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>
                          {isSubmitting ? "Adding..." : "Add Transaction"}
                        </span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Enhanced Transaction History */}
          <div className="xl:col-span-3">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden">
                {/* Enhanced Header */}
                <div className="p-8 border-b border-white/10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                        <ListChecks className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Transaction History
                        </h2>
                        <p className="text-gray-400 text-sm">
                          {transactions.length} transactions recorded
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Refresh Button */}
                    <button
                      onClick={fetchTransactions}
                      disabled={isLoading}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 w-full sm:w-auto"
                    >
                      <RefreshCw
                        className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                      />
                      <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
                    </button>
                  </div>
                </div>

                {/* Transaction List */}
                <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                      <p className="text-blue-400 text-lg font-semibold">
                        Loading your transactions...
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Getting your financial data ready
                      </p>
                    </div>
                  ) : transactions.length > 0 ? (
                    <div className="space-y-4">
                      {transactions.map((t) => (
                        <TransactionRow
                          key={t._id}
                          _id={t._id}
                          date={t.date}
                          description={t.description}
                          amount={t.amount}
                          type={t.type}
                          category={t.category}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-600/20 to-gray-800/20 rounded-3xl flex items-center justify-center mb-6">
                        <PieChart className="w-10 h-10 text-gray-500" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        No transactions yet
                      </h3>
                      <p className="text-gray-400 max-w-sm">
                        Start tracking your finances by adding your first
                        transaction above!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles (Unchanged) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
