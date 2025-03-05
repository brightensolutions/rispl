"use client";

import type React from "react";

import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WhatsappButton } from "./whatsapp-button";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about/overview" },
    { name: "Our Team", href: "/about/team" },
    { name: "Our Values", href: "/about/our-values" },
    { name: "Why Us", href: "/about/why-us" },
  ],
  solutions: [
    { name: "Unitization and Bundling", href: "/solutions/unitization-bundling " },
    { name: "WH Solutions", href: "/solutions/warehouse-solutions" },
    { name: "Contract Packaging", href: "/solutions/contract-packaging" },
    { name: "Consultancy Services", href: "/solutions/consultancy" },
    { name: "Customized Automation", href: "/solutions/complete-automation-lines" },
  ],
  industries: [
    { name: "FMCG", href: "/services/one" },
    { name: "Foods & Beverages", href: "/services/two" },
    { name: "Fibre & Textile", href: "/services/three" },
    { name: "Automobile", href: "/services/four" },
    { name: "Logistics", href: "/services/five" },
  ],
};

export function Footer() {
  // const [email, setEmail] = useState("");

  // const handleSubscribe = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   Handle subscription logic here
  //   setEmail("");
  // };

  return (
    <footer className="relative bg-blue-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/images/logos/logoani.gif"
                alt="Company Logo"
                width={150}
                height={60}
                className="mb-6"
              />
              <p className="text-gray-300 mb-8">
                Leading provider of innovative packaging solutions and
                automation services. We deliver excellence through cutting-edge
                technology and sustainable practices.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold to-gold-light rounded-lg blur opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                    <div className="relative bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-gold flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-white font-semibold mb-6">Solutions</h3>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-gold flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Industries */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-white font-semibold mb-6">Industries</h3>
              <ul className="space-y-3">
                {footerLinks.industries.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-gold flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-white font-semibold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:info@example.com"
                    className="text-gray-300 hover:text-gold flex items-start gap-3 group"
                  >
                    <Mail className="w-5 h-5 mt-1 group-hover:text-gold transition-colors" />
                    <span>rajinder.vakil@rispl.co</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-300 hover:text-gold flex items-start gap-3 group"
                  >
                    <Phone className="w-5 h-5 mt-1 group-hover:text-gold transition-colors" />
                    <span>+91 9818879945</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-gold flex items-start gap-3 group"
                  >
                    <MapPin className="w-5 h-5 mt-1 group-hover:text-gold transition-colors" />
                    <span>
                    PLOT 47-50, BHATPORE GIDC, NR. GAIL COLONY, BHATPORE, SURAT-394510.
                    </span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        
        {/* Newsletter Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-white text-xl font-semibold mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-6">Stay updated with our latest news, updates, and exclusive offers</p>
            <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-gold to-gold-light text-white p-2 rounded-md hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div> */}

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="http://www.brightensolutions.com/" className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Brighten Solutions. All rights reserved.
            </Link>
           
          </div>
        </motion.div>
      </div>
      <WhatsappButton/>
    </footer>
  );
}
