// app/features/page.js
"use client";
import {
  Shield,
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Download,
  Mail,
  Smartphone,
  Code,
  BookOpen,
  Sparkles,
  Target,
  Zap,
  Globe,
  Lock,
  BarChart3,
  Database,
  Cpu,
  Rocket,
  Award,
  CheckCircle,
  Infinity as InfinityIcon,
} from "lucide-react";
import Link from "next/link";

// Enhanced features data with more details and categories
const featuresData = [
  {
    category: "Core Financial Features",
    color: "from-cyan-500 to-blue-500",
    icon: DollarSign,
    items: [
      {
        icon: LayoutDashboard,
        title: "Intelligent Dashboard",
        description:
          "Real-time financial overview with smart insights and predictive analytics",
        highlights: ["Live metrics", "Smart suggestions", "Performance trends"],
      },
      {
        icon: TrendingUp,
        title: "Advanced Analytics",
        description:
          "Deep financial insights with interactive charts and spending patterns analysis",
        highlights: [
          "Category breakdowns",
          "Trend analysis",
          "Comparative reports",
        ],
      },
      {
        icon: BarChart3,
        title: "Visual Reporting",
        description:
          "Beautiful, interactive charts and graphs for comprehensive financial visualization",
        highlights: ["Donut charts", "Bar graphs", "Trend lines"],
      },
      {
        icon: DollarSign,
        title: "Smart Transaction Tracking",
        description:
          "AI-powered categorization and duplicate detection for accurate financial records",
        highlights: [
          "Auto-categorization",
          "Duplicate detection",
          "Smart tagging",
        ],
      },
    ],
  },
  {
    category: "Security & Performance",
    color: "from-green-500 to-emerald-500",
    icon: Shield,
    items: [
      {
        icon: Shield,
        title: "Bank-Grade Security",
        description:
          "Military-grade encryption and secure authentication protecting your financial data",
        highlights: ["256-bit encryption", "2FA ready", "Secure sessions"],
      },
      {
        icon: Lock,
        title: "Privacy First",
        description:
          "Your data remains yours with strict privacy controls and zero data sharing",
        highlights: [
          "Data ownership",
          "Privacy controls",
          "No third-party sharing",
        ],
      },
      {
        icon: Zap,
        title: "Lightning Performance",
        description:
          "Optimized for speed with instant updates and real-time synchronization",
        highlights: ["<100ms responses", "Real-time sync", "Offline ready"],
      },
      {
        icon: InfinityIcon,
        title: "Unlimited Scalability",
        description:
          "Enterprise-ready architecture handling millions of transactions effortlessly",
        highlights: ["No limits", "Auto-scaling", "High availability"],
      },
    ],
  },
  {
    category: "Developer Experience",
    color: "from-purple-500 to-pink-500",
    icon: Code,
    items: [
      {
        icon: Code,
        title: "RESTful API",
        description:
          "Complete REST API with comprehensive endpoints for seamless integration",
        highlights: ["REST standards", "Webhook support", "Rate limiting"],
      },
      {
        icon: BookOpen,
        title: "Developer Documentation",
        description:
          "Comprehensive API docs with interactive examples and SDK support",
        highlights: ["Interactive docs", "Code samples", "SDK libraries"],
      },
      {
        icon: Database,
        title: "Data Export & Integration",
        description:
          "Flexible data export options and third-party integration capabilities",
        highlights: ["CSV/JSON export", "API integration", "Webhook triggers"],
      },
      {
        icon: Cpu,
        title: "Webhook Support",
        description:
          "Real-time event notifications for automated workflows and integrations",
        highlights: ["Event triggers", "Custom payloads", "Retry logic"],
      },
    ],
  },
  {
    category: "User Experience",
    color: "from-orange-500 to-red-500",
    icon: Smartphone,
    items: [
      {
        icon: Smartphone,
        title: "Universal Accessibility",
        description:
          "Fully responsive design optimized for all devices and screen sizes",
        highlights: ["Mobile-first", "Tablet optimized", "Desktop enhanced"],
      },
      {
        icon: Globe,
        title: "Global Ready",
        description:
          "Multi-currency support and internationalization for global users",
        highlights: ["Multi-currency", "i18n ready", "Timezone support"],
      },
      {
        icon: Download,
        title: "Data Portability",
        description:
          "Easy data export and migration tools for complete user control",
        highlights: ["One-click export", "Data migration", "Backup tools"],
      },
      {
        icon: Mail,
        title: "Integrated Support",
        description:
          "Built-in help system with direct contact options and comprehensive FAQ",
        highlights: ["In-app help", "Live chat", "Email support"],
      },
    ],
  },
];

const TechnologyStack = [
  {
    name: "Next.js 15",
    description: "React Framework",
    icon: Rocket,
    color: "text-white",
    bgColor: "bg-gray-800",
    features: ["App Router", "Server Components", "Edge Runtime"],
  },
  {
    name: "Tailwind CSS",
    description: "Styling Framework",
    icon: Zap,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    features: ["Utility-first", "Responsive", "Customizable"],
  },
  {
    name: "MongoDB",
    description: "Database",
    icon: Database,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    features: ["Document-based", "Scalable", "Flexible"],
  },
  {
    name: "Clerk Auth",
    description: "Authentication",
    icon: Shield,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    features: ["Secure", "Customizable", "Multi-factor"],
  },
  {
    name: "React Hot Toast",
    description: "Notifications",
    icon: Award,
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    features: ["Elegant", "Customizable", "Accessible"],
  },
  {
    name: "Lucide Icons",
    description: "Icon Library",
    icon: Sparkles,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    features: ["Consistent", "Tree-shakeable", "Customizable"],
  },
];

const FeatureCard = ({ feature, color }) => (
  <div className="group relative">
    <div
      className={`absolute inset-0 bg-gradient-to-r ${color} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-20`}
    ></div>
    <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 h-full">
      <div className="flex items-start space-x-4 mb-4">
        <div
          className={`p-3 rounded-2xl bg-gradient-to-r ${color} shadow-lg flex-shrink-0`}
        >
          <feature.icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-300 leading-relaxed">{feature.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {feature.highlights.map((highlight, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10"
          >
            {highlight}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const TechnologyCard = ({ tech }) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
    <div className="relative bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 h-full">
      <div className="flex items-center space-x-4 mb-4">
        <div className={`p-3 rounded-2xl ${tech.bgColor} shadow-lg`}>
          <tech.icon className={`w-6 h-6 ${tech.color}`} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{tech.name}</h3>
          <p className="text-gray-400 text-sm">{tech.description}</p>
        </div>
      </div>

      <div className="space-y-2">
        {tech.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm text-gray-300"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FeatureSection = ({ section }) => (
  <section className="mb-16">
    <div className="flex items-center space-x-4 mb-8">
      <div
        className={`p-3 rounded-2xl bg-gradient-to-r ${section.color} shadow-lg`}
      >
        <section.icon className="w-6 h-6 text-white" />
      </div>
      <h2 className="text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {section.category}
      </h2>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {section.items.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          feature={feature}
          color={section.color}
        />
      ))}
    </div>
  </section>
);

export default function FeaturesPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95)), url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1911&q=80')`,
      }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16 pt-12">
          <div className="flex justify-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6">
            Powerful Features
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Enterprise-grade financial management platform with cutting-edge
            technology, designed for performance, security, and exceptional user
            experience.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
            {[
              { number: "99.9%", label: "Uptime" },
              { number: "256-bit", label: "Encryption" },
              { number: "<100ms", label: "Response Time" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Sections */}
        <div className="space-y-20">
          {featuresData.map((section) => (
            <FeatureSection key={section.category} section={section} />
          ))}
        </div>

        {/* Technology Stack Section */}
        <section className="my-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-4">
              Built With Modern Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powered by the latest web technologies for performance,
              scalability, and developer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TechnologyStack.map((tech) => (
              <TechnologyCard key={tech.name} tech={tech} />
            ))}
          </div>
        </section>

        {/* Final CTA Section */}
        <div className="group relative mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl p-12 rounded-2xl shadow-2xl border border-white/20 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <Rocket className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-4xl font-black text-white mb-4">
              Ready to Transform Your Financial Management?
            </h2>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have revolutionized their financial
              tracking with our enterprise-grade platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-3 shadow-2xl"
              >
                <LayoutDashboard className="w-6 h-6" />
                <span>Launch Dashboard</span>
              </Link>

              <Link
                href="/docs"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/20 transition-all duration-300 hover:scale-105 flex items-center space-x-3"
              >
                <BookOpen className="w-6 h-6" />
                <span>View API Docs</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Global Infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
