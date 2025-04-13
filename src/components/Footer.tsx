import React from 'react';
import logo from "../assets/ragulconstruction.jpg";
import stone from "./premium_vector-1683133917118-b6c.jpg";

const Footer = () => {
  return (
    <footer className="relative bg-slate-800 text-white py-12 overflow-hidden">
      {/* Pattern background overlay using Unsplash link */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{
          backgroundImage: `url(${stone})`,
        }}
      ></div>

      {/* Footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-10 rounded-lg"
              />
              <span className="ml-2 text-xl font-bold">Ragul Construction</span>
            </div>
            <p className="text-slate-400">
              Building dreams into reality with excellence and precision since 1994.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Packages', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={
                      link === 'Home'
                        ? '/'
                        : link === 'Contact'
                        ? '/contact'
                        : link === 'Services'
                        ? '/services'
                        : link === 'Packages'
                        ? '/packages'
                        : link === 'About'
                        ? '/about'
                        : `#${link.toLowerCase()}`
                    }
                    className="text-slate-400 hover:text-[#D4AF37] transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                'Residential Construction',
                'Commercial Projects',
                'Industrial Construction',
                'Project Management',
                'Renovation',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-[#D4AF37] transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <ul className="space-y-2 text-slate-400">
              <li>Monday - Saturday: 9:00 AM - 6:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Ragul Construction. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
