import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, User, MessageSquare,PhoneCall } from 'lucide-react';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone:'',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch('https://ragulconstructions-backend.onrender.com/api/submit-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          msg: formState.message
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSubmitSuccess(true);
        setFormState({ name: '', email: '', phone: '', message: '' });
  
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } else {
        console.error('Submission failed:', data.message);
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '+919443602457',
      link: 'tel:+919443602457',
      bgColor: 'bg-gradient-to-br from-amber-100 to-amber-200',
      hoverEffect: 'hover:scale-105'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'constructionsragul@gmail.com',
      link: 'mailto:constructionsragul@gmail.com',
      bgColor: 'bg-gradient-to-br from-amber-200 to-amber-300',
      hoverEffect: 'hover:scale-105'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'No 36, GV Nagar, Alankuppam, Puducherry 605111',
      link: 'https://www.google.com/maps/search/location+:+no+36,+GV+nagar,+alankuppam,+Puducherry+605111/',
      bgColor: 'bg-gradient-to-br from-amber-300 to-amber-400',
      hoverEffect: 'hover:scale-105'
    }
  ];

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-4">Get In Touch</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We're ready to bring your construction dreams to life. Reach out and let's build something extraordinary together.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, title, details, link, bgColor, hoverEffect }) => (
                <a
                  key={title}
                  href={link}
                  className={`flex items-center p-6 rounded-xl shadow-lg transition-all duration-300 ${bgColor} ${hoverEffect} group`}
                  target={title === 'Visit Us' ? '_blank' : undefined}
                  rel={title === 'Visit Us' ? 'noopener noreferrer' : undefined}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
                    <Icon className="w-6 h-6 text-amber-500 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                    <p className="text-slate-700">{details}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border-l-4 border-amber-500">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Working Hours</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
            <form 
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-lg border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h3>
              
              {submitSuccess ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                  <p className="text-green-700 font-medium">Thank you! Your message has been sent successfully.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <label htmlFor="name" className="flex items-center text-sm font-medium text-slate-700 mb-2">
                      <User className="w-4 h-4 mr-2 text-amber-500" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="flex items-center text-sm font-medium text-slate-700 mb-2">
                      <Mail className="w-4 h-4 mr-2 text-amber-500" />
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                      placeholder="johndoe@example.com"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="name" className="flex items-center text-sm font-medium text-slate-700 mb-2">
                      <PhoneCall className="w-4 h-4 mr-2 text-amber-500" />
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                      placeholder="+91 987654112130"
                      required
                    />
                  </div>
                  
                  <div className="mb-8">
                    <label htmlFor="message" className="flex items-center text-sm font-medium text-slate-700 mb-2">
                      <MessageSquare className="w-4 h-4 mr-2 text-amber-500" />
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all resize-none"
                      placeholder="Tell us about your project requirements..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-6 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
            
            <div className="mt-8 bg-slate-800 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-medium mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-2"></div>
                  <p>Professional team with 30+ years of construction expertise</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-2"></div>
                  <p>Quality materials and timely project completion</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-2"></div>
                  <p>Transparent pricing with no hidden costs</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;