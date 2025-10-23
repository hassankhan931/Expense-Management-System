// components/Contact.js
"use client";

import React, { useState } from "react";
// ✅ IMPORTED Head from next/head for SEO
import Head from "next/head";
import { Globe, Mail, MapPin, Phone, Send } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

// Use the consistent blue background URL for continuity
const BACKGROUND_IMAGE_URL =
  "https://media.istockphoto.com/id/2199620990/photo/black-macro-mesh-background-speaker-grill-texture-black-macro-texture-speaker-grille-abstract.jpg?s=612x612&w=0&k=20&c=0z-sOYM8BMn_zeCbg4_fn_7Mbqnlmnl61I1CIM_LWbQ=";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- Simple Form Validation ---
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in your name, email, and message.");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call for form submission
    toast.loading("Sending message...");
    try {
      // In a real application, you would make a POST request here:
      // const response = await fetch('/api/contact', { ... });
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 sec delay

      toast.dismiss();
      toast.success("Thank you! Your message has been sent successfully.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Globe,
      label: "Portfolio Website",
      text: "Visit Hassan's Portfolio",
      href: "https://hassan-khan-portfolio.netlify.app/",
    },
    {
      icon: Phone,
      label: "Contact Phone",
      text: "Phone",
      href: "tel:+923354232380",
    },
    {
      icon: Mail,
      label: "Support Email",
      text: "Email",
      href: "mailto:khandaulathassankhan@gmail.com",
    },
  ];

  // ✅ SEO: JSON-LD Structured Data for Contact Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Hassan Khan Contact Page",
    description:
      "Reach out to Hassan Khan for development inquiries, technical support, or project discussions via form, email, or phone.",
    url: "https://[your-domain.com]/contact",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+92-335-4232380",
        contactType: "customer service",
      },
      {
        "@type": "ContactPoint",
        email: "khandaulathassankhan@gmail.com",
        contactType: "technical support",
      },
    ],
    author: {
      "@type": "Person",
      name: "Hassan Khan",
    },
  };

  return (
    <>
      {/* =============================================== */}
      {/* ✅ NEXT.JS HEAD COMPONENT FOR SEO/METADATA */}
      {/* =============================================== */}
      <Head>
        <title>Contact Hassan Khan | Web Development & Support</title>
        <meta
          name="description"
          content="Get in touch with Hassan Khan for professional web development inquiries, support, or partnership opportunities. Contact via form, email, or phone."
        />
        <meta
          name="keywords"
          content="contact, hassan khan, web developer, support, inquiry form, email, phone"
        />

        {/* JSON-LD Script Tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          key="contact-jsonld"
        />
      </Head>

      <div
        className="min-h-screen bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
          backgroundColor: "#0f172a",
        }}
      >
        {/* Dark Overlay/Vignette for Contrast */}
        <div className="absolute inset-0 bg-black/70 backdrop-brightness-50"></div>

        <Toaster position="top-center" />

        {/* --- MAIN CONTENT AREA --- */}
        <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-8">
          {/* Header */}
          <header className="mb-10 pt-8 text-center">
            <Send className="w-12 h-12 mx-auto mb-3 text-indigo-400" />
            <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
              Get In Touch for Inquiries & Support
            </h1>
            <p className="text-gray-400 mt-2">
              We value your feedback and questions! Send us a message or find
              our direct contact details below for prompt assistance.
            </p>
          </header>

          {/* --- Contact Grid (Info and Form) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- Contact Information (Left Column) --- */}
            <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl p-8 rounded-xl shadow-2xl border border-white/10 h-fit">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-indigo-500/50 pb-2">
                Direct Contact Details
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <item.icon className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                    <div className="flex flex-col">
                      <p className="text-gray-300 font-medium">{item.label}</p>
                      <a
                        href={item.href}
                        target={item.icon === Globe ? "_blank" : "_self"}
                        rel={item.icon === Globe ? "noopener noreferrer" : ""}
                        className="text-white text-lg font-semibold break-words hover:text-indigo-400 transition"
                      >
                        {item.text}
                      </a>
                    </div>
                  </div>
                ))}
                {/* Added MapPin for location */}
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <p className="text-gray-300 font-medium">Location</p>
                    <p className="text-white text-lg font-semibold">
                      Lahore, Pakistan (Available Globally)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  Connect Professionally
                </h3>
                {/* Social Media Links */}
                <div className="flex space-x-4 text-gray-400">
                  <a
                    href="https://github.com/hassankhan931"
                    className="hover:text-indigo-400 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Profile
                  </a>
                  <a
                    href="https://www.linkedin.com/in/hassan-khan-93ace/"
                    className="hover:text-indigo-400 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* --- Contact Form (Right Column) --- */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl p-8 rounded-xl shadow-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-indigo-500/50 pb-2">
                Send a Quick Inquiry Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name *"
                    required
                    aria-label="Your Full Name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/80 text-white border border-gray-700/50 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 transition"
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email Address *"
                    required
                    aria-label="Your Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/80 text-white border border-gray-700/50 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 transition"
                  />
                </div>

                {/* Subject */}
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of Inquiry (e.g., Partnership, Technical Support)"
                  aria-label="Subject of Inquiry"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/80 text-white border border-gray-700/50 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 transition"
                />

                {/* Message */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your detailed message here... *"
                  required
                  rows="6"
                  aria-label="Your Message"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/80 text-white border border-gray-700/50 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 transition"
                ></textarea>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition focus:outline-none disabled:bg-indigo-700/50 disabled:cursor-wait flex items-center justify-center"
                >
                  <Send className="w-5 h-5 inline mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
