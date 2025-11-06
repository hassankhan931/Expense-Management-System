// components/Transactions.js
"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import {
  ListChecks,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Trash2,
  Edit,
  X, // ADDED THIS IMPORT
  BarChart3,
  Calendar,
  Filter,
  Download,
  Sparkles,
  Target,
  RefreshCw,
} from "lucide-react";

// Enhanced background image
const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1530533718754-001d2668365a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ymx1ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600";

// Category Data
const CATEGORIES = {
  Expense: [
    "Housing",
    "Food & Dining",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Subscriptions",
    "Debt/Loan",
    "Other Expense",
  ],
  Income: [
    "Salary",
    "Freelance",
    "Investment",
    "Gift",
    "Refund",
    "Other Income",
  ],
};

// Bar Chart Component
const BarChart = ({ data, color, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-600/50 rounded-lg bg-gray-900/30">
        <div className="text-center text-gray-400">
          <div className="text-2xl mb-2">📊</div>
          <div>No data available</div>
          <div className="text-sm mt-1">Add transactions to see charts</div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((item) => item.value));
  const minBarHeight = 20;

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-white mb-4 text-center">{title}</h3>
      <div className="h-48 flex items-end justify-between space-x-2 px-4">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const barHeight = Math.max((percentage / 100) * 100, minBarHeight);

          return (
            <div
              key={item.name}
              className="flex flex-col items-center flex-1 group relative"
            >
              {/* Hover tooltip */}
              <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/90 text-white text-xs px-2 py-1 rounded z-10 whitespace-nowrap">
                {item.name}: ${item.value}
              </div>

              {/* Bar value above */}
              <div className="text-white text-xs font-semibold mb-1">
                ${item.value}
              </div>

              {/* The bar */}
              <div
                className="w-8 rounded-t-lg transition-all duration-300 hover:opacity-80 border border-white/20"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: color,
                  background: `linear-gradient(to top, ${color}60, ${color})`,
                  minHeight: `${minBarHeight}px`,
                }}
              />

              {/* Category label */}
              <div className="text-gray-400 text-xs mt-2 text-center truncate w-full">
                {item.name.split(" ")[0]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced TransactionRow Component - ALWAYS VISIBLE ACTIONS
const TransactionRow = ({
  _id,
  date,
  description,
  amount,
  type,
  category,
  onDelete,
  onEdit,
}) => (
  <div
    data-id={_id}
    className="group relative p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-l-4 backdrop-blur-sm"
    style={{
      background:
        type === "Income"
          ? "linear-gradient(135deg, rgba(16, 185, 129, 0.05), transparent)"
          : "linear-gradient(135deg, rgba(239, 68, 68, 0.05), transparent)",
      borderLeftColor: type === "Income" ? "#10b981" : "#ef4444",
    }}
  >
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left Section - Transaction Info */}
      <div className="flex items-start sm:items-center space-x-4 flex-1 min-w-0">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg
          ${
            type === "Income"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {type === "Income" ? "📈" : "📉"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2 sm:mb-1">
            <h3 className="text-white font-semibold truncate text-lg sm:text-base">
              {description}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold w-fit ${
                type === "Income"
                  ? "bg-green-500/30 text-green-300"
                  : "bg-red-500/30 text-red-300"
              }`}
            >
              {type}
            </span>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center space-y-1 xs:space-y-0 xs:space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="hidden xs:inline">•</span>
              <span className="truncate">{category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Amount and Actions */}
      <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-3">
        {/* Amount */}
        <div
          className={`text-right sm:text-left ${
            type === "Income" ? "text-green-400" : "text-red-400"
          }`}
        >
          <div className="text-xl sm:text-lg font-bold">
            {type === "Income" ? "+" : "-"}${Math.abs(amount).toFixed(2)}
          </div>
        </div>

        {/* Action Buttons - ALWAYS VISIBLE */}
        <div className="flex space-x-2 opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(_id)}
            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-200 flex-shrink-0"
            aria-label="Edit Transaction"
          >
            <Edit className="w-4 h-4 text-blue-400" />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all duration-200 flex-shrink-0"
            aria-label="Delete Transaction"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced KpiCard Component
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

// Mock data for demonstration
const MOCK_TRANSACTIONS = [
  {
    _id: "1",
    type: "Income",
    category: "Freelance",
    description: "Website Development",
    amount: 1000,
    date: "2024-01-15",
  },
  {
    _id: "2",
    type: "Expense",
    category: "Food & Dining",
    description: "Grocery Shopping",
    amount: 150,
    date: "2024-01-14",
  },
  {
    _id: "3",
    type: "Income",
    category: "Salary",
    description: "Monthly Salary",
    amount: 3000,
    date: "2024-01-01",
  },
  {
    _id: "4",
    type: "Expense",
    category: "Housing",
    description: "Rent Payment",
    amount: 1200,
    date: "2024-01-05",
  },
];

// Main Transactions Component
export default function TransactionsPage() {
  const defaultFormData = {
    type: "Expense",
    category: "Housing",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useMockData, setUseMockData] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Fetching transactions from API...");
      const response = await fetch("/api/transaction", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if response is HTML (error page)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) {
          console.warn("API returned HTML instead of JSON. Using mock data.");
          setUseMockData(true);
          setTransactions(MOCK_TRANSACTIONS);
          toast.success("Using demo data. API endpoint not available.");
          return;
        }
      }

      if (response.status === 401) {
        toast.error("Authentication failed. Please log in.");
        setUseMockData(true);
        setTransactions(MOCK_TRANSACTIONS);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      setTransactions(result.transactions || []);
      setUseMockData(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      console.log("Using mock data due to error");
      setUseMockData(true);
      setTransactions(MOCK_TRANSACTIONS);
      toast.success("Using demo data. Add your own transactions!");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Enhanced analytics calculations
  const { totalIncome, totalExpense, netBalance, categoryData } =
    useMemo(() => {
      let income = 0;
      let expense = 0;
      const categoryStats = {};

      // Initialize all categories with zero values
      CATEGORIES.Income.forEach((cat) => {
        categoryStats[cat] = { income: 0, expense: 0 };
      });
      CATEGORIES.Expense.forEach((cat) => {
        categoryStats[cat] = { income: 0, expense: 0 };
      });

      // Process transactions
      transactions.forEach((t) => {
        const amount = parseFloat(t.amount) || 0;

        if (t.type === "Income") {
          income += amount;
          if (categoryStats[t.category]) {
            categoryStats[t.category].income += amount;
          } else {
            // Handle unknown categories
            categoryStats[t.category] = { income: amount, expense: 0 };
          }
        } else {
          expense += amount;
          if (categoryStats[t.category]) {
            categoryStats[t.category].expense += amount;
          } else {
            // Handle unknown categories
            categoryStats[t.category] = { income: 0, expense: amount };
          }
        }
      });

      // Prepare chart data - ensure we have proper numbers
      const expenseCategories = Object.entries(categoryStats)
        .filter(([_, stats]) => stats.expense > 0)
        .map(([name, stats]) => ({
          name,
          value: Math.round(stats.expense * 100) / 100,
        }))
        .sort((a, b) => b.value - a.value);

      const incomeCategories = Object.entries(categoryStats)
        .filter(([_, stats]) => stats.income > 0)
        .map(([name, stats]) => ({
          name,
          value: Math.round(stats.income * 100) / 100,
        }))
        .sort((a, b) => b.value - a.value);

      return {
        totalIncome: Math.round(income * 100) / 100,
        totalExpense: Math.round(expense * 100) / 100,
        netBalance: Math.round((income - expense) * 100) / 100,
        categoryData: {
          expenses: expenseCategories,
          income: incomeCategories,
        },
      };
    }, [transactions]);

  // const handleDelete = async (_id) => {
  //   if (!window.confirm("Are you sure you want to delete this transaction?")) {
  //     return;
  //   }

  //   // If using mock data, handle locally
  //   if (useMockData) {
  //     setTransactions((prev) => prev.filter((t) => t._id !== _id));
  //     toast.success("Transaction deleted successfully!");
  //     return;
  //   }

  //   toast.loading("Deleting transaction...");

  //   try {
  //     const response = await fetch(`/api/transaction?id=${_id}`, {
  //       method: "DELETE",
  //     });

  //     const data = await response.json();
  //     toast.dismiss();

  //     if (response.ok) {
  //       toast.success("Transaction deleted successfully!");
  //       fetchTransactions();
  //     } else {
  //       toast.error(`Failed to delete: ${data.message || "Server error"}`);
  //     }
  //   } catch (error) {
  //     toast.dismiss();
  //     toast.error(`Network error: ${error.message}`);
  //   }
  // };

  // const handleEdit = (_id) => {
  //   const transactionToEdit = transactions.find((t) => t._id === _id);
  //   if (!transactionToEdit) {
  //     toast.error("Transaction not found.");
  //     return;
  //   }

  //   setEditingTransaction(transactionToEdit);
  //   setFormData({
  //     type: transactionToEdit.type,
  //     category: transactionToEdit.category,
  //     description: transactionToEdit.description,
  //     amount: String(transactionToEdit.amount),
  //     date: new Date(transactionToEdit.date).toISOString().split("T")[0],
  //   });
  //   setIsModalOpen(true);
  // };
  // ...existing code...
  const handleDelete = async (_id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the transaction.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });
    if (!confirm.isConfirmed) return;

    // If using mock data, handle locally
    if (useMockData) {
      setTransactions((prev) => prev.filter((t) => t._id !== _id));
      toast.success("Transaction deleted successfully!");
      return;
    }

    toast.loading("Deleting transaction...");

    try {
      const response = await fetch(`/api/transaction?id=${_id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      toast.dismiss();

      if (response.ok) {
        toast.success("Transaction deleted successfully!");
        fetchTransactions();
      } else {
        toast.error(`Failed to delete: ${data.message || "Server error"}`);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`Network error: ${error.message}`);
    }
  };

  const handleEdit = (_id) => {
    const transactionToEdit = transactions.find((t) => t._id === _id);
    if (!transactionToEdit) {
      toast.error("Transaction not found.");
      return;
    }

    setEditingTransaction(transactionToEdit);
    setFormData({
      type: transactionToEdit.type,
      category: transactionToEdit.category,
      description: transactionToEdit.description,
      amount: String(transactionToEdit.amount),
      date: new Date(transactionToEdit.date).toISOString().split("T")[0],
    });
    setIsModalOpen(true);
  };
  // ...existing code...
  const closeForm = () => {
    setEditingTransaction(null);
    setFormData(defaultFormData);
    setIsModalOpen(false);
  };

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

    // If using mock data, handle locally
    if (useMockData) {
      const newTransaction = {
        _id: editingTransaction
          ? editingTransaction._id
          : Date.now().toString(),
        ...formData,
        amount: parseFloat(formData.amount),
        date: formData.date,
      };

      if (editingTransaction) {
        setTransactions((prev) =>
          prev.map((t) =>
            t._id === editingTransaction._id ? newTransaction : t
          )
        );
        toast.success("Transaction updated successfully!");
      } else {
        setTransactions((prev) => [...prev, newTransaction]);
        toast.success("Transaction added successfully!");
      }
      closeForm();
      return;
    }

    const isEditing = !!editingTransaction;
    const method = isEditing ? "PUT" : "POST";
    const url = "/api/transaction";

    if (
      !formData.description ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (
      isNaN(parseFloat(formData.amount)) ||
      parseFloat(formData.amount) <= 0
    ) {
      toast.error("Amount must be a positive number.");
      return;
    }

    const transactionData = {
      ...(isEditing && { _id: editingTransaction._id }),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    try {
      toast.loading(`${isEditing ? "Updating" : "Saving"} transaction...`);
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      const data = await response.json();
      toast.dismiss();

      if (response.ok) {
        toast.success(
          `Transaction successfully ${isEditing ? "updated" : "added"}!`
        );

        await fetchTransactions();
        closeForm();
      } else {
        toast.error(
          `Failed to ${isEditing ? "update" : "add"} transaction: ${
            data.message || "Server error"
          }.`
        );
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`Network error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const openCreationForm = () => {
    setEditingTransaction(null);
    setFormData(defaultFormData);
    setIsModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>Financial Dashboard | Track Income & Expenses</title>
        <meta
          name="description"
          content="View and manage all your financial transactions, track total income, expenses, and net balance on the secure dashboard."
        />
        <meta
          name="keywords"
          content="financial dashboard, track income, track expenses, transaction history, net balance, personal finance"
        />
      </Head>

      <div
        className="min-h-screen bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95)), url('${BACKGROUND_IMAGE_URL}')`,
        }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              marginTop: "70px",
            },
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Demo Data Notice */}
          {useMockData && (
            <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl text-yellow-200 text-center">
              <strong>Demo Mode:</strong> Using sample data. API endpoint not
              available.
            </div>
          )}

          {/* Enhanced Header */}
          <div className="mb-8 pt-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                <ListChecks className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
              Transaction Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Manage all your financial transactions with beautiful insights and
              analytics
            </p>
          </div>

          {/* Enhanced KPI Cards */}
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

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Expense Distribution Bar Chart */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-500/20 rounded-xl">
                      <BarChart3 className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Expense Distribution
                    </h3>
                  </div>
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
                <BarChart
                  data={categoryData.expenses}
                  color="#ef4444"
                  title="Expenses by Category"
                />
                {categoryData.expenses.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h4 className="text-white font-semibold mb-3">
                      Top Expenses
                    </h4>
                    {categoryData.expenses.slice(0, 4).map((item, index) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-sm p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: "#ef4444" }}
                          ></div>
                          <span className="text-gray-300 truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-white font-semibold">
                          ${item.value.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Income Sources Bar Chart */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
              <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-xl">
                      <BarChart3 className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Income Sources
                    </h3>
                  </div>
                  <Download className="w-5 h-5 text-gray-400" />
                </div>
                <BarChart
                  data={categoryData.income}
                  color="#10b981"
                  title="Income by Source"
                />
                {categoryData.income.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h4 className="text-white font-semibold mb-3">
                      Top Income Sources
                    </h4>
                    {categoryData.income.slice(0, 4).map((item, index) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-sm p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: "#10b981" }}
                          ></div>
                          <span className="text-gray-300 truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-white font-semibold">
                          ${item.value.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden">
              {/* Header Section */}
              <div className="p-4 sm:p-6 border-b border-white/10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Title Section */}
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cyan-500/20 rounded-xl flex-shrink-0">
                      <ListChecks className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        Transaction History
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {transactions.length} transactions recorded
                        {useMockData && " (Demo Mode)"}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col xs:flex-row gap-3 items-stretch xs:items-center justify-start lg:justify-end">
                    <button
                      onClick={fetchTransactions}
                      disabled={isLoading}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2 text-sm"
                    >
                      <RefreshCw
                        className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                      />
                      <span>Refresh</span>
                    </button>
                    <button
                      onClick={openCreationForm}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 text-sm"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Add New</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="p-4 sm:p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-blue-400 text-base sm:text-lg font-semibold">
                      Loading transactions...
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Getting your financial data ready
                    </p>
                  </div>
                ) : transactions.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {transactions.map((t) => (
                      <TransactionRow
                        key={t._id}
                        _id={t._id}
                        date={new Date(t.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        description={t.description}
                        amount={t.amount}
                        type={t.type}
                        category={t.category}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-600/20 to-gray-800/20 rounded-3xl flex items-center justify-center mb-4 sm:mb-6">
                      <ListChecks className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      No transactions yet
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base max-w-sm mb-4 sm:mb-6 px-4">
                      Start tracking your finances by adding your first
                      transaction!
                    </p>
                    <button
                      onClick={openCreationForm}
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Add First Transaction</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ADD/EDIT MODAL - THIS WAS MISSING */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900/95 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    {editingTransaction ? (
                      <Edit className="w-5 h-5 mr-2 text-indigo-400" />
                    ) : (
                      <PlusCircle className="w-5 h-5 mr-2 text-indigo-400" />
                    )}
                    {editingTransaction
                      ? "Edit Transaction"
                      : "Add New Transaction"}
                  </h2>
                  <button
                    onClick={closeForm}
                    className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-3 py-2.5 rounded-lg bg-gray-800/80 text-white border focus:outline-none ${
                      formData.type === "Income"
                        ? "border-green-500/50"
                        : "border-red-500/50"
                    }`}
                  >
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                  </select>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800/80 text-white border border-gray-700/50 focus:outline-none"
                  >
                    {CATEGORIES[formData.type].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full px-3 py-2.5 rounded-lg bg-gray-800/80 text-white border border-gray-700/50 focus:outline-none placeholder-gray-500"
                  />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="$ Amount"
                      min="0.01"
                      step="0.01"
                      className="w-full px-3 py-2.5 rounded-lg bg-gray-800/80 text-white border border-gray-700/50 focus:outline-none placeholder-gray-500"
                    />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg bg-gray-800/80 text-white border border-gray-700/50 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition focus:outline-none"
                  >
                    {editingTransaction ? "Save Changes" : "Add Transaction"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Custom Styles */}
          <style jsx>{`
            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes growUp {
              from {
                opacity: 0;
                transform: scaleY(0);
              }
              to {
                opacity: 1;
                transform: scaleY(1);
              }
            }

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
      </div>
    </>
  );
}
