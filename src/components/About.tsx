import React from 'react';
import { Award, Users, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Clock, label: 'Projects Completed', value: '1000+' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">About Us</h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">
              Building Excellence Since 2008
            </h3>
            <p className="text-slate-600 mb-6">
              At Ragul Construction, we've been turning architectural dreams into reality for over 15 years. 
              Our commitment to quality, innovation, and customer satisfaction has made us one of the most 
              trusted names in the construction industry in Pondicherry.
            </p>
            <p className="text-slate-600 mb-8">
              We pride ourselves on our attention to detail, use of premium materials, and our team of 
              highly skilled professionals who bring expertise and dedication to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="text-center p-6 rounded-lg bg-slate-50 hover:shadow-lg transition-shadow duration-200"
              >
                <Icon className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                <div className="text-3xl font-bold text-slate-800 mb-2">{value}</div>
                <div className="text-slate-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;