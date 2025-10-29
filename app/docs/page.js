// components/APIDocs.js
"use client";

import React, { useState } from "react";
import {
  Code,
  GitBranch,
  Terminal,
  Copy,
  Check,
  Shield,
  Zap,
  Cpu,
  BookOpen,
  Key,
  Sparkles,
  ExternalLink,
  Search,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// Using the same background as your application for consistency
const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1911&q=80";

// Enhanced API Endpoints Data - CORRECTED AND ENDPOINT 5 REMOVED
const endpoints = [
  {
    id: 1,
    method: "GET",
    path: "/api/transactions",
    description:
      "Retrieve authenticated user's financial transactions with filtering and pagination",
    category: "Transactions",
    auth: true,
    query: {
      limit: "number (optional, default: 20)",
      page: "number (optional, default: 1)",
      type: "string (optional, 'income' or 'expense')",
      category: "string (optional)",
      startDate: "string (optional, ISO format YYYY-MM-DD)",
      endDate: "string (optional, ISO format YYYY-MM-DD)",
    },
    response: {
      status: 200,
      body: `{
  "success": true,
  "data": {
    "transactions": [
      {
        "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
        "amount": 1500.00,
        "type": "income",
        "category": "Salary",
        "description": "Monthly salary",
        "date": "2024-01-15T00:00:00.000Z",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "totalItems": 45,
      "currentPage": 1,
      "limit": 20,
      "totalPages": 3
    }
  }
}`,
    },
  },
  {
    id: 2,
    method: "POST",
    path: "/api/transactions",
    description: "Create a new financial transaction (income or expense)",
    category: "Transactions",
    auth: true,
    body: {
      amount: "number (required, positive)",
      type: "string (required, 'income' or 'expense')",
      category: "string (required)",
      description: "string (optional, max 100 chars)",
      date: "string (required, ISO format YYYY-MM-DD)",
    },
    response: {
      status: 201,
      body: `{
  "success": true,
  "message": "Transaction created successfully",
  "data": {
    "transaction": {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
      "amount": 1500.00,
      "type": "income",
      "category": "Salary",
      "description": "Monthly salary",
      "date": "2024-01-15T00:00:00.000Z",
      "user": "65a1b2c3d4e5f6a7b8c9d0e2"
    }
  }
}`,
    },
  },
  {
    id: 3,
    method: "PUT",
    path: "/api/transactions/[id]",
    description: "Update an existing transaction by ID",
    category: "Transactions",
    auth: true,
    body: {
      amount: "number (optional, positive)",
      type: "string (optional, 'income' or 'expense')",
      category: "string (optional)",
      description: "string (optional, max 100 chars)",
      date: "string (optional, ISO format YYYY-MM-DD)",
    },
    response: {
      status: 200,
      body: `{
  "success": true,
  "message": "Transaction updated successfully",
  "data": {
    "transaction": {
      "_id": "65a1b2c3d4e5f6a7b8c9d0e1",
      "amount": 1600.00,
      "type": "income",
      "category": "Salary",
      "description": "Monthly salary with bonus",
      "date": "2024-01-15T00:00:00.000Z"
    }
  }
}`,
    },
  },
  {
    id: 4,
    method: "DELETE",
    path: "/api/transactions/[id]",
    description: "Permanently delete a transaction by ID",
    category: "Transactions",
    auth: true,
    response: {
      status: 200,
      body: `{
  "success": true,
  "message": "Transaction deleted successfully",
  "data": {
    "deletedId": "65a1b2c3d4e5f6a7b8c9d0e1"
  }
}`,
    },
  },
  // Endpoint with ID 5 was removed as per user request (Analytics/reports/summary)
  {
    id: 6,
    method: "GET",
    path: "/api/categories",
    description:
      "Get available transaction categories for income and expense types",
    category: "Reference",
    auth: true,
    response: {
      status: 200,
      body: `{
  "success": true,
  "data": {
    "income": ["Salary", "Freelance", "Investment", "Gift", "Other"],
    "expense": ["Housing", "Food & Dining", "Transportation", "Utilities", "Entertainment", "Subscriptions", "Other"]
  }
}`,
    },
  },
  {
    id: 7, // New ID to maintain sequence
    method: "GET",
    path: "/api/user/balance",
    description:
      "Retrieve the authenticated user's current net balance and totals.",
    category: "User",
    auth: true,
    response: {
      status: 200,
      body: `{
  "success": true,
  "data": {
    "netBalance": 4050.00,
    "totalIncome": 12500.00,
    "totalExpense": 8450.00
  }
}`,
    },
  },
];

// Helper function to handle copying text
const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!", {
    duration: 2000,
    style: {
      background: "linear-gradient(135deg, #059669, #10b981)",
      color: "white",
      borderRadius: "12px",
    },
  });
};

// Enhanced CodeBlock Component
const CodeBlock = ({ children, language = "json" }) => {
  const [copied, setCopied] = useState(false);
  const codeContent = children.toString();

  const handleCopyClick = () => {
    handleCopy(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <button
        onClick={handleCopyClick}
        className="absolute top-3 right-3 p-2 bg-gray-800/80 hover:bg-indigo-600 text-gray-300 hover:text-white rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 z-20 backdrop-blur-sm border border-gray-600/50 hover:border-indigo-500/50"
        aria-label="Copy code to clipboard"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="p-6 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 overflow-x-auto text-sm leading-relaxed">
        <code className={`language-${language} text-gray-200 font-mono`}>
          {children}
        </code>
      </pre>
    </div>
  );
};

// Enhanced MethodTag Component
const MethodTag = ({ method }) => {
  const colorMap = {
    GET: "from-green-500 to-emerald-500",
    POST: "from-blue-500 to-cyan-500",
    PUT: "from-yellow-500 to-amber-500",
    DELETE: "from-red-500 to-pink-500",
    PATCH: "from-purple-500 to-indigo-500",
  };

  return (
    <div
      className={`px-4 py-2 rounded-xl bg-gradient-to-r ${colorMap[method]} text-white font-bold text-sm tracking-wider shadow-lg flex-shrink-0`}
    >
      {method}
    </div>
  );
};

// Category Filter Component
const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex flex-wrap gap-2 mb-8 justify-start">
    <button
      onClick={() => onCategoryChange("all")}
      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
        activeCategory === "all"
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
          : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm"
      }`}
    >
      All Endpoints
    </button>
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
          activeCategory === category
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
            : "bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm"
        }`}
      >
        {category}
      </button>
    ))}
  </div>
);

// Generate Curl Example
const generateCurl = (endpoint) => {
  const hasBody =
    ["POST", "PUT", "PATCH"].includes(endpoint.method) && endpoint.body;

  const bodyData = hasBody
    ? JSON.stringify(
        Object.fromEntries(
          Object.keys(endpoint.body).map((k) => [
            k,
            // Provide more realistic default values for curl
            k === "type"
              ? "income"
              : k === "date"
              ? "2024-05-01"
              : endpoint.body[k].includes("number")
              ? 100.0
              : "example_value",
          ])
        ),
        null,
        2
      )
    : null;

  // Use a compact single-line body for curl for better readability on small screens
  const curlBody = hasBody
    ? `-d '${bodyData
        .replace(/\n/g, "\\n")
        .replace(/'/g, '\\"')
        .replace(/\s+/g, " ")}'` // Compact JSON
    : "";

  return (
    `curl -X ${endpoint.method} \\\n` +
    `  'https://api.expensetracker.com${endpoint.path.replace(
      "[id]",
      "transaction_id_123"
    )}' \\\n` +
    `  -H 'Authorization: Bearer your_api_token_here' \\\n` +
    `  -H 'Content-Type: application/json' \\\n` +
    (hasBody
      ? `  -d '${JSON.stringify(
          Object.fromEntries(
            Object.keys(endpoint.body).map((k) => [
              k,
              k === "type"
                ? "income"
                : k === "date"
                ? "2024-05-01"
                : endpoint.body[k].includes("number")
                ? 100.0
                : "example_value",
            ])
          )
        ).replace(/'/g, "\\'")}'`
      : "") // Ensure curl body is correctly escaped for single-line
  );
};

// Quick Start Component
const QuickStartGuide = () => (
  <div className="group relative mb-12">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
    <div className="relative bg-white/10 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Quick Start Guide
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Key className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold">Authentication</h3>
          </div>
          <p className="text-gray-300 text-sm">
            All endpoints require **Bearer token** authentication. Include your
            API token in the{" "}
            <code className="bg-gray-800 px-1 rounded text-green-400">
              Authorization
            </code>{" "}
            header.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-green-400" />
            </div>
            <h3 className="text-white font-semibold">Base URL</h3>
          </div>
          <p className="text-gray-300 text-sm">
            Use{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-blue-400 break-all inline-block">
              https://api.expensetracker.com
            </code>{" "}
            as your base URL for all API calls.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold">Rate Limits</h3>
          </div>
          <p className="text-gray-300 text-sm">
            A limit of **100 requests per hour** per token is enforced. Monitor
            your usage with response headers.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Main Component
export default function APIDocs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [...new Set(endpoints.map((ep) => ep.category))];

  const filteredEndpoints = endpoints.filter(
    (ep) =>
      (activeCategory === "all" || ep.category === activeCategory) &&
      (ep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.method.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95)), url('${BACKGROUND_IMAGE_URL}')`,
        }}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

        <Toaster position="top-right" />

        <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Enhanced Header */}
          <div className="mb-12 pt-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl">
                <Cpu className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
              API Documentation 🚀
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Build powerful financial applications with our REST API. Complete
              reference with examples and interactive guides.
            </p>
          </div>

          {/* Quick Start Guide */}
          <QuickStartGuide />

          {/* Search and Filter Section */}
          <div className="group relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search endpoints by method, path, or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                    />
                  </div>
                </div>
                {/* Status Badge - made it responsive to stack on small screens */}
                <div className="flex items-center space-x-4 text-sm text-gray-400 flex-shrink-0 mt-2 lg:mt-0">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>All endpoints require authentication</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter - already uses flex-wrap, adding justify-start for better alignment on small screens */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Endpoints Grid */}
          <div className="space-y-8">
            {filteredEndpoints.map((endpoint) => (
              <div key={endpoint.id} className="group relative endpoint-card">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                  {/* Endpoint Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 pb-6 border-b border-white/10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-4 mb-4 lg:mb-0 space-y-3 sm:space-y-0">
                      <MethodTag method={endpoint.method} />
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white font-mono break-all">
                          {endpoint.path}
                        </h2>
                        <p className="text-gray-300 mt-1 text-sm sm:text-base">
                          {endpoint.description}
                        </p>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                        {endpoint.category}
                      </span>
                      {endpoint.auth && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>Auth Required</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Two Column Layout - Stacks on small screens */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Request Details */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-500/20 rounded-xl">
                          <Terminal className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Request
                        </h3>
                      </div>

                      {/* Request Parameters */}
                      {(endpoint.body || endpoint.query) && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-200 mb-3">
                            {endpoint.body
                              ? "Request Body (JSON)"
                              : "Query Parameters"}
                          </h4>
                          <CodeBlock>
                            {JSON.stringify(
                              endpoint.body || endpoint.query,
                              null,
                              2
                            )}
                          </CodeBlock>
                        </div>
                      )}

                      {/* Curl Example */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-200 mb-3">
                          cURL Example
                        </h4>
                        <CodeBlock language="bash">
                          {generateCurl(endpoint)}
                        </CodeBlock>
                      </div>
                    </div>

                    {/* Response Details */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-500/20 rounded-xl">
                          <GitBranch className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Response
                        </h3>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-200 mb-3">
                          Status:{" "}
                          <span className="text-green-400">
                            {endpoint.response.status}
                          </span>
                        </h4>
                        <CodeBlock>{endpoint.response.body}</CodeBlock>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Footer CTA */}
          <div className="group relative mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/20 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Ready to Get Started?
              </h3>
              <p className="text-gray-300 text-sm sm:text-lg mb-6 max-w-2xl mx-auto">
                Explore our comprehensive API documentation, download SDKs, and
                join our developer community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>Get API Keys</span>
                </button>
                <button className="px-6 py-3 bg-transparent hover:bg-white/10 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <ExternalLink className="w-5 h-5" />
                  <span>View SDK Documentation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .endpoint-card {
          animation: fadeInUp 0.6s ease-out;
        }

        code {
          font-family: "Fira Code", "Monaco", "Cascadia Code", monospace;
        }
      `}</style>
    </>
  );
}
