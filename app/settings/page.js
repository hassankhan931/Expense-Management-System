// components/Settings.js
"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  Settings,
  Trash2,
  AlertTriangle,
  Bell,
  Download,
  Shield,
  Database,
  Palette,
  RefreshCw,
  Zap,
  Target,
  Clock,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// Using the same background as your other pages for consistency
const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1911&q=80";

// Enhanced SettingsCard with glass morphism
const SettingsCard = ({
  title,
  icon: Icon,
  children,
  gradient = "from-blue-500/10 to-purple-500/10",
  badge,
}) => (
  <div className="group relative">
    <div
      className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70`}
    ></div>
    <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
        {badge && (
          <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full animate-pulse">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  </div>
);

// Enhanced SettingItem with better styling
const SettingItem = ({
  label,
  description,
  children,
  isDanger = false,
  icon: Icon,
  isPremium = false,
}) => (
  <div
    className={`group relative p-4 rounded-xl transition-all duration-300 ${
      isDanger
        ? "hover:bg-red-500/10 border-l-4 border-red-400"
        : isPremium
        ? "hover:bg-yellow-500/10 border-l-4 border-yellow-400"
        : "hover:bg-white/5 border-l-4 border-blue-400"
    }`}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4 flex-1">
        {Icon && (
          <div
            className={`p-2 rounded-xl ${
              isDanger
                ? "bg-red-500/20"
                : isPremium
                ? "bg-yellow-500/20"
                : "bg-blue-500/20"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${
                isDanger
                  ? "text-red-400"
                  : isPremium
                  ? "text-yellow-400"
                  : "text-blue-400"
              }`}
            />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <p
              className={`font-semibold ${
                isDanger
                  ? "text-red-300"
                  : isPremium
                  ? "text-yellow-300"
                  : "text-white"
              }`}
            >
              {label}
            </p>
            {isPremium && (
              <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full">
                PRO
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <div className="ml-4">{children}</div>
    </div>
  </div>
);

// Toggle Switch Component
const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
  <button
    onClick={onChange}
    disabled={disabled}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
      enabled ? "bg-green-500" : "bg-gray-600"
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

// Progress Bar Component
const ProgressBar = ({ value, max, color = "from-blue-500 to-cyan-500" }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Main Settings Component
export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [dataExport, setDataExport] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [grouping, setGrouping] = useState("Monthly");
  const [privacyMode, setPrivacyMode] = useState(false);
  const [quickActions, setQuickActions] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(false);
  const [storageUsed, setStorageUsed] = useState(0);
  const [exportFormat, setExportFormat] = useState("CSV");

  // Initialize settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("appSettings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotifications(settings.notifications ?? true);
      setAutoSync(settings.autoSync ?? true);
      setPrivacyMode(settings.privacyMode ?? false);
      setQuickActions(settings.quickActions ?? true);
      setAnalytics(settings.analytics ?? true);
      setBudgetAlerts(settings.budgetAlerts ?? false);
      setGrouping(settings.grouping ?? "Monthly");
    }

    // Simulate storage usage calculation
    const calculateStorage = () => {
      const transactions = JSON.parse(
        localStorage.getItem("transactions") || "[]"
      );
      const usage = Math.min((transactions.length / 1000) * 100, 100);
      setStorageUsed(usage);
    };

    calculateStorage();
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    const settings = {
      notifications,
      autoSync,
      privacyMode,
      quickActions,
      analytics,
      budgetAlerts,
      grouping,
    };
    localStorage.setItem("appSettings", JSON.stringify(settings));
  }, [
    notifications,
    autoSync,
    privacyMode,
    quickActions,
    analytics,
    budgetAlerts,
    grouping,
  ]);

  // Handler for Grouping Select
  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
    toast.success(`Reports grouping set to ${e.target.value}`, {
      icon: "📊",
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "white",
        borderRadius: "12px",
      },
    });
  };

  // Handler for Notifications Toggle
  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    toast.success(`Notifications ${!notifications ? "enabled" : "disabled"}`, {
      icon: notifications ? "🔕" : "🔔",
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "white",
        borderRadius: "12px",
      },
    });
  };

  // Handler for Auto Sync Toggle
  const handleAutoSyncToggle = () => {
    setAutoSync(!autoSync);
    toast.success(`Auto-sync ${!autoSync ? "enabled" : "disabled"}`, {
      icon: "🔄",
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "white",
        borderRadius: "12px",
      },
    });
  };

  // Handler for Privacy Mode Toggle
  const handlePrivacyModeToggle = () => {
    setPrivacyMode(!privacyMode);
    toast.success(`Privacy mode ${!privacyMode ? "enabled" : "disabled"}`, {
      icon: privacyMode ? "👁️" : "🔒",
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "white",
        borderRadius: "12px",
      },
    });
  };

  // Handler for Quick Actions Toggle
  const handleQuickActionsToggle = () => {
    setQuickActions(!quickActions);
    toast.success(`Quick actions ${!quickActions ? "enabled" : "disabled"}`, {
      icon: "⚡",
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "white",
        borderRadius: "12px",
      },
    });
  };

  // Handler for Analytics Toggle
  const handleAnalyticsToggle = () => {
    setAnalytics(!analytics);
    toast.success(`Usage analytics ${!analytics ? "enabled" : "disabled"}`, {
      icon: "📈",
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "white",
        borderRadius: "12px",
      },
    });
  };

  // Handler for Budget Alerts Toggle
  const handleBudgetAlertsToggle = () => {
    setBudgetAlerts(!budgetAlerts);
    toast.success(`Budget alerts ${!budgetAlerts ? "enabled" : "disabled"}`, {
      icon: "🎯",
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "white",
        borderRadius: "12px",
      },
    });
  };

  // Handler for Export Format Change
  const handleExportFormatChange = (e) => {
    setExportFormat(e.target.value);
    toast.success(`Export format set to ${e.target.value}`, {
      icon: "💾",
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "white",
        borderRadius: "12px",
      },
    });
  };

  // Enhanced Data Export Handler
  const handleDataExport = async () => {
    setDataExport(true);
    toast.loading(`Preparing ${exportFormat} export...`, {
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        borderRadius: "12px",
      },
    });

    // Simulate export process
    setTimeout(() => {
      setDataExport(false);
      toast.success(`Data exported as ${exportFormat} successfully! 📥`, {
        style: {
          background: "linear-gradient(135deg, #059669, #10b981)",
          color: "white",
          borderRadius: "12px",
        },
      });
    }, 2000);
  };

  // Enhanced Data Deletion Handler
  const handleDeleteData = () => {
    toast(
      (t) => (
        <div className="flex flex-col space-y-4 p-2 min-w-[300px]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Confirm Deletion</h3>
              <p className="text-sm text-gray-300 mt-1">
                This action cannot be undone. All your financial data will be
                permanently erased.
              </p>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                confirmDeletion();
              }}
              className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-200 flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Everything</span>
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        style: {
          background: "linear-gradient(135deg, #1f2937, #374151)",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: "12px",
        },
      }
    );
  };

  // Enhanced Deletion Confirmation
  const confirmDeletion = async () => {
    setIsDeleting(true);
    toast.loading("Securely erasing all your financial data...", {
      id: "delete-loading",
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        borderRadius: "12px",
      },
    });

    try {
      const response = await fetch("/api/transaction", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      toast.dismiss("delete-loading");

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem("transactions");
        localStorage.removeItem("appSettings");

        // Reset states
        setStorageUsed(0);

        toast.success("All data has been permanently deleted 🗑️", {
          style: {
            background: "linear-gradient(135deg, #059669, #10b981)",
            color: "white",
            borderRadius: "12px",
          },
        });
      } else {
        toast.error(
          result.message || "Failed to delete data. Please try again.",
          {
            style: {
              background: "linear-gradient(135deg, #dc2626, #ef4444)",
              color: "white",
              borderRadius: "12px",
            },
          }
        );
      }
    } catch (error) {
      console.error("Deletion error:", error);
      toast.dismiss("delete-loading");
      toast.error("Network error: Could not reach the server.", {
        style: {
          background: "linear-gradient(135deg, #dc2626, #ef4444)",
          color: "white",
          borderRadius: "12px",
        },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Quick Setting Reset
  const handleResetSettings = () => {
    localStorage.removeItem("appSettings");
    setNotifications(true);
    setAutoSync(true);
    setPrivacyMode(false);
    setQuickActions(true);
    setAnalytics(true);
    setBudgetAlerts(false);
    setGrouping("Monthly");

    toast.success("All settings reset to defaults! 🔄", {
      style: {
        background: "linear-gradient(135deg, #1f2937, #374151)",
        color: "white",
        borderRadius: "12px",
      },
    });
  };

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

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              marginTop: "70px",
            },
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Enhanced Header */}
          <div className="mb-12 pt-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
              Control Center
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Fine-tune your financial experience with powerful customization
              options
            </p>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interface & Display */}
            <SettingsCard
              title="Interface & Display"
              icon={Palette}
              gradient="from-blue-500/10 to-cyan-500/10"
              badge="NEW"
            >
              <SettingItem
                label="Privacy Mode"
                description="Hide sensitive amounts in overview"
                icon={privacyMode ? Lock : Eye}
              >
                <ToggleSwitch
                  enabled={privacyMode}
                  onChange={handlePrivacyModeToggle}
                />
              </SettingItem>

              <SettingItem
                label="Quick Actions"
                description="Show quick action buttons throughout the app"
                icon={Zap}
              >
                <ToggleSwitch
                  enabled={quickActions}
                  onChange={handleQuickActionsToggle}
                />
              </SettingItem>

              <SettingItem
                label="Report Grouping"
                description="Default grouping for financial reports"
                icon={Database}
              >
                <select
                  value={grouping}
                  onChange={handleGroupingChange}
                  className="px-4 py-2 text-sm rounded-xl bg-gray-900/80 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </SettingItem>
            </SettingsCard>

            {/* Notifications & Alerts */}
            <SettingsCard
              title="Notifications & Alerts"
              icon={Bell}
              gradient="from-green-500/10 to-emerald-500/10"
            >
              <SettingItem
                label="Push Notifications"
                description="Receive alerts for important updates"
                icon={Bell}
              >
                <ToggleSwitch
                  enabled={notifications}
                  onChange={handleNotificationsToggle}
                />
              </SettingItem>

              <SettingItem
                label="Budget Alerts"
                description="Get notified when approaching budget limits"
                icon={Target}
                isPremium={true}
              >
                <ToggleSwitch
                  enabled={budgetAlerts}
                  onChange={handleBudgetAlertsToggle}
                />
              </SettingItem>

              <SettingItem
                label="Auto Sync"
                description="Automatically sync data across devices"
                icon={RefreshCw}
              >
                <ToggleSwitch
                  enabled={autoSync}
                  onChange={handleAutoSyncToggle}
                />
              </SettingItem>
            </SettingsCard>

            {/* Data & Storage */}
            <SettingsCard
              title="Data & Storage"
              icon={Database}
              gradient="from-purple-500/10 to-pink-500/10"
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">Storage Usage</span>
                  <span className="text-sm font-bold text-white">
                    {Math.round(storageUsed)}%
                  </span>
                </div>
                <ProgressBar value={storageUsed} max={100} />
                <p className="text-xs text-gray-400 mt-1">
                  {Math.round(storageUsed * 10)}MB of 1GB used
                </p>
              </div>

              <SettingItem
                label="Export Format"
                description="Choose your preferred export format"
                icon={Download}
              >
                <select
                  value={exportFormat}
                  onChange={handleExportFormatChange}
                  className="px-3 py-1 text-sm rounded-xl bg-gray-900/80 text-white border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm"
                >
                  <option value="CSV">CSV</option>
                  <option value="JSON">JSON</option>
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel</option>
                </select>
              </SettingItem>

              <SettingItem
                label="Export Data"
                description={`Download all data as ${exportFormat}`}
                icon={Download}
              >
                <button
                  onClick={handleDataExport}
                  disabled={dataExport}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{dataExport ? "Exporting..." : "Export"}</span>
                </button>
              </SettingItem>
            </SettingsCard>

            {/* Analytics & Privacy */}
            <SettingsCard
              title="Analytics & Privacy"
              icon={TrendingUp}
              gradient="from-orange-500/10 to-red-500/10"
            >
              <SettingItem
                label="Usage Analytics"
                description="Help us improve by sharing anonymous usage data"
                icon={TrendingUp}
              >
                <ToggleSwitch
                  enabled={analytics}
                  onChange={handleAnalyticsToggle}
                />
              </SettingItem>

              <SettingItem
                label="Data Encryption"
                description="Advanced encryption for sensitive data"
                icon={Shield}
                isPremium={true}
              >
                <button
                  className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                  onClick={() =>
                    toast.success(
                      "Upgrade to PRO to enable advanced encryption! 🚀"
                    )
                  }
                >
                  <Lock className="w-4 h-4" />
                  <span>Enable PRO</span>
                </button>
              </SettingItem>

              <SettingItem
                label="Reset All Settings"
                description="Restore all settings to default values"
                icon={RefreshCw}
              >
                <button
                  onClick={handleResetSettings}
                  className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </SettingItem>
            </SettingsCard>

            {/* Danger Zone */}
            <SettingsCard
              title="Danger Zone"
              icon={Shield}
              gradient="from-red-500/10 to-pink-500/10"
            >
              <SettingItem
                label="Delete All Data"
                description="Permanently erase all your financial records"
                isDanger={true}
                icon={Trash2}
              >
                <button
                  onClick={handleDeleteData}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isDeleting ? "Deleting..." : "Delete All"}</span>
                </button>
              </SettingItem>
            </SettingsCard>
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-12 group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {Math.round(storageUsed)}%
                  </div>
                  <div className="text-sm text-gray-400">Storage Used</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {notifications ? "ON" : "OFF"}
                  </div>
                  <div className="text-sm text-gray-400">Notifications</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {autoSync ? "ON" : "OFF"}
                  </div>
                  <div className="text-sm text-gray-400">Auto Sync</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    {privacyMode ? "ON" : "OFF"}
                  </div>
                  <div className="text-sm text-gray-400">Privacy Mode</div>
                </div>
              </div>
            </div>
          </div>

          {/* Version Info */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Secure Connection 🔒</span>
              </span>
              <span>•</span>
              <span>Version 2.1.0</span>
              <span>•</span>
              <span>Data Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .settings-grid > * {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
          }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
