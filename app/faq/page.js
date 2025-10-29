// components/FAQ.js

"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

// Use the consistent blue background URL for continuity
const BACKGROUND_IMAGE_URL =
  "https://media.istockphoto.com/id/545263898/photo/black-leather-texture.jpg?s=612x612&w=0&k=20&c=Z2xD-QdldE507QZz-ofxXPK-y9S7mqV_QfFSbvRV-T_k=";

// --- Enhanced FAQ Data ---
const faqItems = [
  {
    id: 1,
    question: "How do I add a new transaction?",
    answer:
      "Navigate to the 'Transactions' page. Use the 'Record New Entry' form on the left side. Select the type (Income or Expense), category, enter a description, the amount, and the date. Click 'Add Transaction' to save it to your history.",
  },
  {
    id: 2,
    question: "How is the Net Balance calculated?",
    answer:
      "The Net Balance is calculated by taking your Total Income and subtracting your Total Expense. It provides a quick view of your current financial standing based on the data you've logged in the system.",
  },
  {
    id: 3,
    question: "Can I edit or delete past transactions?",
    answer:
      "Yes! You can edit or delete any transaction. Click the edit (pencil) icon to modify a transaction or the delete (trash) icon to remove it. All changes are saved immediately and reflected in your financial analytics.",
  },
  {
    id: 4,
    question: "Is my financial data secure?",
    answer:
      "Yes. We prioritize security. All data transmission between your browser and our servers is encrypted using modern protocols. User authentication is required for all data access and modifications. Your data is never shared with third parties.",
  },
  {
    id: 5,
    question: "How do I update my categories list?",
    answer:
      "The default categories are fixed for consistency across the platform. If you require highly customized categories, you can use the 'Other Expense' or 'Other Income' options. Future versions may include user-defined categories based on user feedback.",
  },
  {
    id: 6,
    question: "How often should I update my transactions?",
    answer:
      "For best results, we recommend updating your transactions daily or weekly. Regular updates ensure your financial dashboard reflects accurate, real-time data and helps you make informed financial decisions based on current information.",
  },
  {
    id: 7,
    question: "Can I export my financial data?",
    answer:
      "Yes! You can export your transaction history and reports. On the Reports page, click the 'Export Report' button to download your data in CSV format. This allows you to analyze your finances in spreadsheet applications or share with financial advisors.",
  },
  {
    id: 8,
    question: "What's the difference between Reports and Transactions pages?",
    answer:
      "The Transactions page is for managing individual entries (adding, editing, deleting). The Reports page provides analytical insights with charts, trends, and category breakdowns to help you understand your financial patterns over time.",
  },
  {
    id: 9,
    question: "How far back does my transaction history go?",
    answer:
      "Your transaction history includes all entries you've added since creating your account. There's no automatic data deletion, so you can maintain a complete financial record for as long as you use the application.",
  },
  {
    id: 10,
    question: "Can I set financial goals or budgets?",
    answer:
      "Currently, the focus is on tracking and analyzing existing transactions. Budgeting and goal-setting features are planned for future updates. You can use the current analytics to manually track progress toward your financial objectives.",
  },
  {
    id: 11,
    question: "Why can't I see my recent transactions in reports?",
    answer:
      "Reports update in real-time. If you don't see recent transactions, try refreshing the page. Ensure your transactions are properly categorized and dated. If issues persist, check your internet connection or contact support.",
  },
  {
    id: 12,
    question: "Is there a mobile app available?",
    answer:
      "Currently, the application is web-based and fully responsive, working seamlessly on mobile browsers. A dedicated mobile app is under consideration based on user demand and feedback from our community.",
  },
  {
    id: 13,
    question: "How do I reset my financial data?",
    answer:
      "To reset your data, you would need to manually delete all transactions. There's no bulk delete feature currently, but you can remove transactions individually. Contact support if you need assistance with large-scale data management.",
  },
  {
    id: 14,
    question: "What happens if I forget to log a transaction?",
    answer:
      "You can add past-dated transactions at any time. Simply set the transaction date to when it actually occurred when filling out the form. The system will properly categorize it in historical reports and analytics.",
  },
];

// --- Enhanced Collapsible FAQ Item Component ---
const FAQItem = ({ question, answer, isFirst, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = isOpen ? ChevronUp : ChevronDown;

  return (
    <div className={`border-b border-white/10 ${isLast ? "border-b-0" : ""}`}>
      {/* Question Header */}
      <button
        className="w-full text-left py-6 px-6 flex justify-between items-center transition-all duration-300 hover:bg-white/5 focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start space-x-4">
          <div className="w-2 h-2 bg-indigo-400 rounded-full mt-3 flex-shrink-0"></div>
          <span className="font-semibold text-white text-lg pr-4 text-left group-hover:text-indigo-100 transition-colors">
            {question}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400 hidden sm:block">
            {isOpen ? "Hide" : "Show"}
          </span>
          <Icon className="w-5 h-5 text-indigo-400 flex-shrink-0 transition-transform group-hover:scale-110" />
        </div>
      </button>

      {/* Answer Content (Collapsible) */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6">
          <div className="border-l-2 border-indigo-400 pl-4 ml-2">
            <p className="text-gray-300 text-base leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Enhanced Support Section Component ---
const SupportSection = () => (
  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="group relative bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-6 rounded-xl border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 hover:scale-105">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <Mail className="w-5 h-5 text-indigo-400" />
        </div>
        <h3 className="text-white font-semibold">Email Support</h3>
      </div>
      <p className="text-gray-300 text-sm mb-3">
        Get detailed assistance via email
      </p>
      <a
        href="mailto:khandaulathassankhan@gmail.com"
        className="text-indigo-400 hover:text-indigo-300 text-sm font-medium inline-flex items-center space-x-1 transition-colors"
      >
        <span>Email</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>

    <div className="group relative bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-6 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Phone className="w-5 h-5 text-green-400" />
        </div>
        <h3 className="text-white font-semibold">Live Chat</h3>
      </div>
      <p className="text-gray-300 text-sm mb-3">Quick answers in real-time</p>
      <div className="text-green-400 text-sm font-medium">
        Available 9AM-6PM EST
      </div>
    </div>

    <div className="group relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-6 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
      <div className="flex items-center space-x-3 mb-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <ExternalLink className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="text-white font-semibold">Documentation</h3>
      </div>
      <p className="text-gray-300 text-sm mb-3">
        Browse our comprehensive guides
      </p>
      <a
        href="https://hassan-khan-portfolio.netlify.app/"
        className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center space-x-1 transition-colors"
      >
        <span>Visit Help Center</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  </div>
);

// --- Main FAQ Component ---
export default function FAQPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
        backgroundColor: "#0f172a",
      }}
    >
      {/* Enhanced Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-900/80"></div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-8">
        {/* Enhanced Header */}
        <header className="mb-12 pt-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about managing your finances with our
            application. Cannot find the answer you are looking for? Contact our
            support team.
          </p>
        </header>

        {/* --- Enhanced FAQ List Container --- */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isFirst={index === 0}
              isLast={index === faqItems.length - 1}
            />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-white">
              {faqItems.length}
            </div>
            <div className="text-gray-400 text-sm">Questions Answered</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-gray-400 text-sm">Support Available</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-gray-400 text-sm">Satisfaction Rate</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="text-2xl font-bold text-white">&lt;1h</div>
            <div className="text-gray-400 text-sm">Avg. Response Time</div>
          </div>
        </div>

        {/* Enhanced Support Section */}
        <SupportSection />

        {/* Final Call to Action */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl border border-indigo-500/30">
          <h3 className="text-2xl font-bold text-white mb-3">
            Still Have Questions?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you get the most out of your
            financial tracking experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:khandaulathassankhan@gmail.com"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </a>
            <a
              href="https://hassan-khan-portfolio.netlify.app/"
              className="px-6 py-3 bg-transparent hover:bg-white/10 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Portfolio</span>
            </a>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .faq-item {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
