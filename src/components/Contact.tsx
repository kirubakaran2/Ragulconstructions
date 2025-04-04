import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+919443602457',
      link: 'tel:+919443602457',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'constructionsragul@gmail.com',
      link: 'mailto:constructionsragul@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'location : no 36, GV nagar, alankuppam, Puducherry 605111',
      link: 'https://www.google.com/maps/search/location+:+no+36,+GV+nagar,+alankuppam,+Puducherry+605111/@12.0205893,79.7959306,905m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI1MDQwMS4wIKXMDSoASAFQAw%3D%3D',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Contact Us</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get in touch with us for your construction needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="grid gap-8 mb-8">
              {contactInfo.map(({ icon: Icon, title, details, link }) => (
                <a
                  key={title}
                  href={link}
                  className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <Icon className="w-8 h-8 text-[#D4AF37]" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                    <p className="text-slate-600">{details}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-white py-3 px-6 rounded-lg hover:bg-[#B59030] transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;