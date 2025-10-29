// components/ReportsPage.js
"use client";

import React, { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { toast, Toaster } from "react-hot-toast";
import {
  PackageX,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Crown,
  Trophy,
  TrendingUp as Growth,
  Clock,
  Eye,
  Filter,
} from "lucide-react";

//==============================================================================
// 1. CONSTANTS & UTILITY FUNCTIONS
//==============================================================================

const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1911&q=80";

/**
 * Formats a number as US currency.
 * @param {number} amount
 */
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

//==============================================================================
// 2. PRESENTATIONAL SUB-COMPONENTS
//==============================================================================

/**
 * Radial Progress Chart (Top 4 Categories).
 */
const RadialProgressChart = ({ data, title, color }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-white mb-6 text-center">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {data.slice(0, 4).map((item) => {
          const percentage = (item.value / (maxValue || 1)) * 100;
          return (
            <div
              key={item.name}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-gray-600 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent"
                    style={{
                      background: `conic-gradient(${color} ${percentage}%, transparent 0%)`,
                      mask: "radial-gradient(white 55%, transparent 56%)",
                      WebkitMask: "radial-gradient(white 55%, transparent 56%)",
                    }}
                  />
                  <span className="text-xs font-bold text-white relative z-10">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-semibold truncate">
                  {item.name}
                </div>
                <div className="text-gray-400 text-xs">
                  {formatCurrency(item.value)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Sparkline Chart for Income Trends.
 */
const SparklineChart = ({ data, color, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-bold text-white mb-4 text-center">
          {title}
        </h3>
        <div className="h-32 flex items-center justify-center bg-gradient-to-b from-gray-800/50 to-gray-900/30 rounded-xl">
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-2">📊</div>
            <div>No data available</div>
          </div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((item) => item.value));
  const safeMaxValue = maxValue === 0 ? 1 : maxValue;

  // Generate points for the sparkline
  const points = data
    .map((item, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * 100;
      const y = 100 - (item.value / safeMaxValue) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-white mb-4 text-center">{title}</h3>
      <div className="relative h-32 bg-gradient-to-b from-gray-800/50 to-gray-900/30 rounded-xl p-4">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Sparkline path */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / Math.max(data.length - 1, 1)) * 100;
            const y = 100 - (item.value / safeMaxValue) * 100;

            if (isNaN(x) || isNaN(y)) return null;

            return (
              <circle
                key={index}
                cx={x.toString()}
                cy={y.toString()}
                r="2"
                fill={color}
                className="hover:r-3 transition-all duration-200"
              />
            );
          })}
        </svg>

        {/* Value labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 px-2">
          {data.map((item, index) => (
            <div key={index} className="text-center flex-1">
              <div className="font-semibold text-white text-sm">
                {formatCurrency(item.value)}
              </div>
              <div className="truncate text-xs mt-1">
                {item.name.split(" ")[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Simple Bar Chart (Alternative view for Income).
 */
const SimpleBarChart = ({ data, color, title }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-bold text-white mb-4 text-center">
          {title}
        </h3>
        <div className="h-48 flex items-center justify-center bg-gradient-to-b from-gray-800/50 to-gray-900/30 rounded-xl">
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-2">📊</div>
            <div>No data available</div>
          </div>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((item) => item.value));
  const safeMaxValue = maxValue === 0 ? 1 : maxValue;

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-white mb-4 text-center">{title}</h3>
      <div className="h-48 flex items-end justify-between space-x-2 px-4 mb-6">
        {data.map((item) => {
          const barHeight = Math.max((item.value / safeMaxValue) * 80, 10);
          return (
            <div
              key={item.name}
              className="flex flex-col items-center flex-1 group"
            >
              <div className="text-white text-xs font-semibold mb-1">
                {formatCurrency(item.value)}
              </div>
              <div
                className="w-8 rounded-t-lg transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: color,
                  background: `linear-gradient(to top, ${color}60, ${color})`,
                }}
              />
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

/**
 * Insight Card for Key Metrics.
 */
const InsightCard = ({
  title,
  value,
  description,
  icon: Icon,
  color,
  trend,
}) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
    <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div
          className={`p-1 rounded-full ${
            trend === "positive" ? "bg-green-500/20" : "bg-red-500/20"
          }`}
        >
          {trend === "positive" ? (
            <ArrowUpRight className="w-4 h-4 text-green-400" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-400" />
          )}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
      <p className="text-sm font-medium text-gray-300 mb-1">{title}</p>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  </div>
);

/**
 * Achievement Badge for Milestones.
 */
const AchievementBadge = ({ title, unlocked, description, icon: Icon }) => (
  <div
    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
      unlocked
        ? "bg-green-500/10 border-green-500/30 hover:border-green-500/50"
        : "bg-gray-500/10 border-gray-500/20 opacity-60"
    }`}
  >
    <div className="flex items-center space-x-3">
      <div
        className={`p-2 rounded-xl ${
          unlocked ? "bg-green-500/20" : "bg-gray-500/20"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${unlocked ? "text-green-400" : "text-gray-400"}`}
        />
      </div>
      <div className="flex-1">
        <h4
          className={`font-semibold text-sm ${
            unlocked ? "text-white" : "text-gray-400"
          }`}
        >
          {title}
        </h4>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>
      {unlocked && <Crown className="w-4 h-4 text-yellow-400" />}
    </div>
  </div>
);

/**
 * Empty/No Data State Component.
 */
const CreativeNoData = () => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
    <div className="relative flex flex-col items-center justify-center p-12 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 min-h-[500px] text-gray-300 shadow-2xl">
      <div className="relative mb-8">
        <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl animate-pulse">
          <PackageX className="w-20 h-20 text-indigo-400" />
        </div>
        <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
      </div>
      <h2 className="text-3xl font-bold text-white text-center mb-4">
        Awaiting Your Financial Story
      </h2>
      <p className="text-gray-400 text-center max-w-md text-lg mb-6">
        Your financial insights dashboard is ready to paint a picture of your
        spending habits and income patterns.
      </p>
      <div className="flex items-center space-x-2 text-yellow-400">
        <Zap className="w-5 h-5" />
        <span className="font-semibold">
          Start adding transactions to unlock insights
        </span>
      </div>
    </div>
  </div>
);

//==============================================================================
// 3. DATA PROCESSING FUNCTIONS
//==============================================================================

/**
 * Aggregates transaction amounts by category and type.
 * @param {Array<Object>} transactions
 * @returns {Array<Object>} Aggregated category totals.
 */
const aggregateCategoryBreakdown = (transactions) => {
  const categoryTotals = {};

  transactions.forEach((tx) => {
    const amount = Number(tx.amount);
    if (isNaN(amount)) return;

    const transactionType = tx.type.toLowerCase();
    const key = `${tx.category}_${transactionType}`;

    if (!categoryTotals[key]) {
      categoryTotals[key] = {
        category: tx.category,
        type: transactionType,
        amount: 0,
      };
    }
    categoryTotals[key].amount += amount;
  });

  return Object.values(categoryTotals);
};

/**
 * Calculates total income, total expense, and net cash flow.
 * @param {Array<Object>} transactions
 * @returns {Object} Calculated totals.
 */
const calculateTotals = (transactions) => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((tx) => {
    const amount = Number(tx.amount);
    if (isNaN(amount)) return;

    const transactionType = tx.type.toLowerCase();

    if (transactionType === "income") {
      totalIncome += amount;
    } else if (transactionType === "expense") {
      totalExpense += amount;
    }
  });

  return {
    totalIncome,
    totalExpense,
    netFlow: totalIncome - totalExpense,
  };
};

/**
 * Exports transaction data to a CSV file.
 * @param {Array<Object>} transactions
 */
const exportReportToCSV = (transactions) => {
  if (!transactions || transactions.length === 0) {
    toast.error("No data to export!");
    return;
  }

  try {
    const headers = ["ID", "Date", "Type", "Amount", "Category", "Description"];
    const dataKeys = [
      "_id",
      "date",
      "type",
      "amount",
      "category",
      "description",
    ];

    const csvRows = transactions.map((tx) => {
      const values = dataKeys.map((key) => {
        let value = tx[key] || "";

        if (key === "amount") {
          value = Number(value).toFixed(2);
        } else if (key === "date" && value) {
          value = new Date(value).toISOString().split("T")[0];
        }

        // CSV escaping logic
        if (
          typeof value === "string" &&
          (value.includes(",") || value.includes('"') || value.includes("\n"))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      return values.join(",");
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);

    const date = new Date().toISOString().split("T")[0];
    link.setAttribute("download", `financial_insights_${date}.csv`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Insights exported successfully!");
  } catch (err) {
    console.error("Export Error:", err);
    toast.error("Failed to export insights");
  }
};

//==============================================================================
// 4. MAIN COMPONENT
//==============================================================================

export default function ReportsPage() {
  // --- State Hooks ---
  const [rawTransactions, setRawTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("all");
  const [useSimpleChart, setUseSimpleChart] = useState(false);

  // --- Handlers ---
  const handleExportReport = () => {
    exportReportToCSV(rawTransactions);
  };

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/transaction", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Authentication Required: Please sign in.");
          } else {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
              errorData.message || `HTTP error! status: ${res.status}`
            );
          }
        }

        const data = await res.json();
        const transactions = data.transactions || data || [];
        setRawTransactions(Array.isArray(transactions) ? transactions : []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Failed to load financial insights");
        toast.error("Error loading financial insights");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // --- Memoized Report Data Processing ---
  const reportData = useMemo(() => {
    if (!rawTransactions || rawTransactions.length === 0) {
      return null;
    }

    try {
      const totals = calculateTotals(rawTransactions);
      const categoryBreakdown = aggregateCategoryBreakdown(rawTransactions);

      const expenseData = categoryBreakdown
        .filter((item) => item.type === "expense")
        .map((item) => ({ name: item.category, value: item.amount }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

      const incomeData = categoryBreakdown
        .filter((item) => item.type === "income")
        .map((item) => ({ name: item.category, value: item.amount }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

      // Calculate insights
      const savingsRate =
        totals.totalIncome > 0
          ? ((totals.netFlow / totals.totalIncome) * 100).toFixed(1) + "%"
          : "0%";

      const avgTransaction =
        rawTransactions.length > 0
          ? (totals.totalIncome + totals.totalExpense) / rawTransactions.length
          : 0;

      const largestIncome = Math.max(
        ...rawTransactions
          .filter((tx) => tx.type.toLowerCase() === "income")
          .map((tx) => Number(tx.amount))
      );

      const largestExpense = Math.max(
        ...rawTransactions
          .filter((tx) => tx.type.toLowerCase() === "expense")
          .map((tx) => Number(tx.amount))
      );

      return {
        categoryBreakdown,
        totalTransactions: rawTransactions.length,
        analytics: {
          ...totals,
          expenseData,
          incomeData,
          savingsRate,
          avgTransaction,
          largestIncome: isFinite(largestIncome) ? largestIncome : 0,
          largestExpense: isFinite(largestExpense) ? largestExpense : 0,
        },
      };
    } catch (error) {
      console.error("Error processing report data:", error);
      return null;
    }
  }, [rawTransactions]);

  // --- Conditional Renders (Loading, Error) ---
  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-blue-400 text-lg font-semibold">
            Unlocking Financial Insights
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Analyzing your financial patterns...
          </p>
        </div>
      </div>
    );

  const hasData =
    rawTransactions && rawTransactions.length > 0 && reportData !== null;

  // --- Main Render Logic ---
  return (
    <>
      <Head>
        <title>Financial Insights & Analytics | Smart Reports</title>
      </Head>

      <div
        className="min-h-screen bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95)), url('${BACKGROUND_IMAGE_URL}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              marginTop: "80px",
            },
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
          {/* Creative Header */}
          <div className="mb-12 pt-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl">
                <Growth className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
              Financial Insights
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover patterns, track progress, and unlock your financial
              potential
            </p>
          </div>

          {/* Interactive Control Panel */}
          <div className="group relative px-2 sm:px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center space-y-6 xl:space-y-0 gap-4">
                {/* Left Section (Title) */}
                <div className="flex items-center space-x-4 sm:space-x-6 flex-wrap">
                  <div className="p-3 sm:p-4 bg-blue-500/20 rounded-2xl">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl">
                      Insight Dashboard
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base">
                      {rawTransactions.length} transactions analyzed
                    </p>
                  </div>
                </div>

                {/* Right Controls (Filter, Toggle, Export) */}
                <div className="flex flex-wrap justify-start sm:justify-end items-center gap-3 sm:gap-4 w-full xl:w-auto">
                  {/* Filter Dropdown */}
                  <div className="flex items-center space-x-2 bg-white/5 rounded-xl p-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="bg-transparent text-white border-none outline-none w-full sm:w-auto text-sm sm:text-base"
                    >
                      <option value="all">All Time</option>
                      <option value="month">This Month</option>
                      <option value="quarter">This Quarter</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>

                  {/* Toggle Chart View */}
                  <button
                    onClick={() => setUseSimpleChart(!useSimpleChart)}
                    className="flex items-center justify-center px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 space-x-2 text-sm sm:text-base w-full sm:w-auto"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>{useSimpleChart ? "Sparkline" : "Bar"} View</span>
                  </button>

                  {/* Export Button */}
                  <button
                    onClick={handleExportReport}
                    className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 space-x-2 shadow-lg text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Export Insights</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Content */}
          {hasData ? (
            <div className="space-y-12 px-2 sm:px-4">
              {/* Insight Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                <InsightCard
                  title="Savings Rate"
                  value={reportData.analytics.savingsRate}
                  description="Of your income saved"
                  icon={Target}
                  color="from-green-500 to-emerald-500"
                  trend="positive"
                />
                <InsightCard
                  title="Avg Transaction"
                  value={formatCurrency(reportData.analytics.avgTransaction)}
                  description="Average amount per transaction"
                  icon={DollarSign}
                  color="from-blue-500 to-cyan-500"
                  trend="positive"
                />
                <InsightCard
                  title="Largest Income"
                  value={formatCurrency(reportData.analytics.largestIncome)}
                  description="Biggest single income"
                  icon={TrendingUp}
                  color="from-purple-500 to-pink-500"
                  trend="positive"
                />
                <InsightCard
                  title="Largest Expense"
                  value={formatCurrency(reportData.analytics.largestExpense)}
                  description="Biggest single expense"
                  icon={TrendingDown}
                  color="from-orange-500 to-red-500"
                  trend="positive"
                />
              </div>

              {/* Creative Charts Section (Expense and Income) */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Expense Analysis (Radial Chart) */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
                  <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-red-500/20 rounded-2xl">
                          <PieChart className="w-6 h-6 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Expense Analysis
                        </h3>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {formatCurrency(reportData.analytics.totalExpense)}
                      </div>
                    </div>
                    {reportData.analytics.expenseData.length > 0 ? (
                      <RadialProgressChart
                        data={reportData.analytics.expenseData}
                        title="Spending Distribution"
                        color="#ef4444"
                      />
                    ) : (
                      <div className="text-center p-10 text-gray-400">
                        No Expense Data
                      </div>
                    )}
                  </div>
                </div>

                {/* Income Trends (Sparkline/Bar Chart) */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
                  <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-500/20 rounded-2xl">
                          <BarChart3 className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Income Trends
                        </h3>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {formatCurrency(reportData.analytics.totalIncome)}
                      </div>
                    </div>
                    {reportData.analytics.incomeData.length > 0 ? (
                      useSimpleChart ? (
                        <SimpleBarChart
                          data={reportData.analytics.incomeData}
                          color="#10b981"
                          title="Income Sources"
                        />
                      ) : (
                        <SparklineChart
                          data={reportData.analytics.incomeData}
                          color="#10b981"
                          title="Income Sources"
                        />
                      )
                    ) : (
                      <div className="text-center p-10 text-gray-400">
                        No Income Data
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievements Section */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-yellow-500/20 rounded-xl">
                      <Crown className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Financial Milestones
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AchievementBadge
                      title="First Transaction"
                      unlocked={rawTransactions.length > 0}
                      description="Record your first financial activity"
                      icon={Zap}
                    />
                    <AchievementBadge
                      title="Savings Starter"
                      unlocked={reportData.analytics.netFlow > 0}
                      description="Maintain positive cash flow"
                      icon={Target}
                    />
                    <AchievementBadge
                      title="Income Champion"
                      unlocked={reportData.analytics.totalIncome > 1000}
                      description="Earn over $1,000"
                      icon={Trophy}
                    />
                    <AchievementBadge
                      title="Consistency Pro"
                      unlocked={rawTransactions.length >= 10}
                      description="Track 10+ transactions"
                      icon={Clock}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Stats Footer */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
                <div className="bg-white/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">
                    {rawTransactions.length}
                  </div>
                  <div className="text-gray-400 text-sm">Total Records</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {reportData.analytics.incomeData.length}
                  </div>
                  <div className="text-gray-400 text-sm">Income Sources</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {reportData.analytics.expenseData.length}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Spending Categories
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {reportData.analytics.savingsRate}
                  </div>
                  <div className="text-gray-400 text-sm">Savings Rate</div>
                </div>
              </div>
            </div>
          ) : (
            // No Data State
            <div className="p-4">
              <CreativeNoData />
            </div>
          )}
        </div>
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
        `}</style>{" "}
      </div>
    </>
  );
}
