import { Check, Download, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import pdf from '../assets/pack.pdf';
import residentialPDF from '../assets/RESIDENTIAL PACKAGE.pdf';
import commercialPDF from '../assets/COMMERCIAL PACKAGE.pdf';


interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

type PackageName = string;

const PackagesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [packageType, setPackageType] = useState<'residential' | 'commercial'>('residential');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedPackages, setSelectedPackages] = useState<PackageName[]>([]);
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);

  const residentialPackages = [
    {
      name: 'Basic',
      price: '₹1,899',
      description: 'per sq ft',
      features: [
        'Scheme drawing all floors (2D)',
        'Elevation design (3D)',
        'Electrical drawing all floors (2D)',
        'Plumbing drawing all floors (2D)',
        'Working drawing all floors (2D)',
        'Site engineer - One visit per day',
      ],
    },
    {
      name: 'Standard',
      price: '₹2,099',
      description: 'per sq ft',
      features: [
        'Scheme drawing all floors (2D)',
        'Elevation design (3D)',
        'Electrical drawing all floors (2D)',
        'Plumbing drawing all floors (2D)',
        'Working drawing all floors (2D)',
        'Site engineer - Dedicated full-time',
        'Architect support till design completion',
        'Daily photo update & Project status monitoring',
      ],
      highlighted: true,
    },
    {
      name: 'Premium',
      price: '₹2,399',
      description: 'per sq ft',
      features: [
        'Scheme drawing all floors (2D)',
        'Elevation design (3D)',
        'Electrical drawing all floors (2D)',
        'Plumbing drawing all floors (2D)',
        'Working drawing all floors (2D)',
        'Structural drawings',
        'Elevation detailed drawing',
        'Interior design all rooms (3D)',
        'Interior drawing all rooms (2D)',
        'Approval drawing',
        'Site engineer - Dedicated full-time site engineer',
        'Architect - Dedicated Architect, stage-wise site visits, material selection support',
        'Daily photo update & project status monitoring',
      ],
    },
    {
      name: 'Ultra Luxury',
      price: '₹2,999',
      description: 'per sq ft',
      features: [
        'Scheme drawing all floors (2D)',
        'Elevation design (3D)',
        'Electrical drawing all floors (2D)',
        'Plumbing drawing all floors (2D)',
        'Working drawing all floors (2D)',
        'Structural drawings',
        'Elevation detailed drawing',
        'Interior design all rooms (3D)',
        'Interior drawing all rooms (2D)',
        'Approval drawing',
        'Site engineer - Dedicated full-time site engineer',
        'Architect - Dedicated Architect, stage-wise site visits, material selection support',
        'Daily photo update & project status monitoring',
        'Premium material selection & execution',
      ],
    },
  ];

  const commercialPackages = [
    {
      name: 'Basic',
      price: '₹1,600',
      description: 'per sq ft',
      features: [
        '2D Floor Plan',
        'Basement height: Upto 2 feet',
        'Steel: Any ISI brand',
        'Ceramic Wall Tiles 2 Feet Above Kitchen Slab',
        'Sanitary Ware & CP Fitting Upto Rs 8,000',
        'Wires – Finolex, Switches – Penta or equivalent',
      ],
    },
    {
      name: 'Premium',
      price: '₹2,099',
      description: 'per sq ft',
      features: [
        '2D Floor Plan',
        '3D Elevation Design',
        'Steel: ARS',
        'Ceramic Wall Tiles 2 Feet Above Kitchen Slab Upto 45/sqft',
        'Sanitary Ware & CP Fitting Upto Rs 12,000',
        'Wires – Finolex, Switches – Anchor Roma',
        'Overhead Tank: 1000 ltrs Sintex',
      ],
      highlighted: true,
    },
    {
      name: 'Ultra Luxury',
      price: '₹2,999',
      description: 'per sq ft',
      features: [
        '2D Floor Plan',
        'Structural Designing',
        '3D Elevation Design',
        'Steel: Tata Tiscon, SAIL',
        'Ceramic Wall Tiles 2 Feet Above Kitchen Slab Upto 55/sqft',
        'Sanitary Ware & CP Fitting Upto Rs 18,000',
        'Wires – Finolex, Switches – GM or Legrand',
        'Overhead Tank: 2000 ltrs Sintex',
        'SS Staircase Railing',
      ],
    },
  ];

  const packages = packageType === 'residential' ? residentialPackages : commercialPackages;

  const allFeatures = Array.from(new Set(packages.flatMap((pkg) => pkg.features))).sort((a, b) =>
    a.localeCompare(b)
  );

  const handleToggle = (pkgName: string) => {
    setExpanded((prev) => ({ ...prev, [pkgName]: !prev[pkgName] }));
  };

  const handleSelectPackage = (pkgName: PackageName) => {
    setSelectedPackages((prev) =>
      prev.includes(pkgName) ? prev.filter((pkg) => pkg !== pkgName) : [...prev, pkgName]
    );
  };

  const handleDownloadClick = () => setShowModal(true);

  const handleFinalDownload = () => {
    const selectedPDF = packageType === 'residential' ? residentialPDF : commercialPDF;
    const link = document.createElement('a');
    link.href = selectedPDF;
    link.download = packageType === 'residential'
      ? 'Residential_Construction_Package.pdf'
      : 'Commercial_Construction_Package.pdf';
    link.click();
  };
  const handlecontactClick = () => {
    window.location.href = '/contact'; 
  }
  

  const handleFormSubmit = async () => {
    try {
      await fetch('https://ragulconstructions-backend.onrender.com/api/submit-inquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Error submitting contact info:', error);
    } finally {
      setShowModal(false);
      handleFinalDownload();
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    handleFinalDownload();
  };

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Construction Packages Tailored for You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect package that matches your construction vision and budget
          </p>
          {/* Package Type Toggle */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setPackageType('residential')}
                className={`px-6 py-3 text-sm font-medium rounded-l-lg ${
                  packageType === 'residential'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setPackageType('commercial')}
                className={`px-6 py-3 text-sm font-medium rounded-r-lg ${
                  packageType === 'commercial'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Commercial
              </button>
            </div>
          </div>
        </div>

        {/* Package Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                pkg.highlighted ? 'ring-4 ring-amber-400' : 'hover:shadow-xl'
              } ${hoveredPackage === pkg.name ? 'transform -translate-y-2' : ''}`}
              onMouseEnter={() => setHoveredPackage(pkg.name)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}

              <div className={`h-full flex flex-col ${pkg.highlighted ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-white'}`}>
                <div className="p-6 pb-0">
                  <h3 className={`text-2xl font-bold ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>{pkg.name}</h3>
                  <div className="flex items-baseline mt-2 mb-4">
                    <span className={`text-4xl font-bold ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>{pkg.price}</span>
                    <span className={`ml-2 text-sm ${pkg.highlighted ? 'text-amber-100' : 'text-gray-500'}`}>{pkg.description}</span>
                  </div>
                </div>

                <div className="flex-grow p-6 pt-0">
                  <ul className="space-y-3">
                    {(expanded[pkg.name] ? pkg.features : pkg.features.slice(0, 5)).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className={`flex-shrink-0 w-5 h-5 mt-0.5 mr-2 ${pkg.highlighted ? 'text-white' : 'text-amber-500'}`} />
                        <span className={`${pkg.highlighted ? 'text-amber-50' : 'text-gray-700'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.features.length > 5 && (
                    <button
                      onClick={() => handleToggle(pkg.name)}
                      className={`mt-4 flex items-center text-sm font-medium ${
                        pkg.highlighted ? 'text-white hover:text-amber-100' : 'text-amber-600 hover:text-amber-700'
                      }`}
                    >
                      {expanded[pkg.name] ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-1" />
                          Show More ({pkg.features.length - 5} more)
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="p-6 pt-0">
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => handleSelectPackage(pkg.name)}
                      className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                        selectedPackages.includes(pkg.name)
                          ? 'bg-amber-600 text-white hover:bg-amber-700'
                          : pkg.highlighted
                          ? 'bg-white text-amber-600 hover:bg-gray-100'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {selectedPackages.includes(pkg.name) ? 'Selected ✓' : 'Compare Packages'}
                    </button>
                    <button
                      onClick={handleDownloadClick}
                      className={`py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                        pkg.highlighted ? 'bg-amber-700 text-white hover:bg-amber-800' : 'bg-amber-500 text-white hover:bg-amber-600'
                      }`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Get Full Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {selectedPackages.length > 1 && (
          <div className="mt-16 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-2xl font-bold text-gray-900">Comparing {selectedPackages.length} Packages</h3>
                <p className="text-gray-600 mt-1">See the detailed feature comparison below</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-4 text-left text-lg font-semibold text-gray-900 min-w-[300px]">Features</th>
                      {selectedPackages.map((pkgName) => {
                        const pkg = packages.find((p) => p.name === pkgName);
                        return (
                          <th key={pkgName} className="px-6 py-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-lg font-semibold text-gray-900">{pkgName}</span>
                              <span className="text-sm text-gray-500 mt-1">{pkg?.price}</span>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {allFeatures.map((feature, idx) => (
                      <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}>
                        <td className="px-6 py-4 text-gray-700">{feature}</td>
                        {selectedPackages.map((pkgName) => {
                          const pkg = packages.find((p) => p.name === pkgName);
                          const hasFeature = pkg?.features.includes(feature);
                          return (
                            <td key={pkgName} className="px-6 py-4 text-center">
                              {hasFeature ? (
                                <Check className="w-6 h-6 text-green-500 mx-auto" />
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end">
                <button
                  onClick={() => setSelectedPackages([])}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Clear Comparison
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-center text-white shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Help Choosing the Right Package?</h3>
          <p className="text-amber-100 max-w-2xl mx-auto mb-6">
            Our construction experts are ready to guide you to the perfect solution for your project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleDownloadClick}
              className="px-6 py-3 bg-white text-amber-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full Brochure
            </button>
            <button
             onClick={handlecontactClick}
             className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-amber-600 transition-colors">
              Talk to an Expert
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
              <h3 className="text-xl font-bold mb-4">Get the Full Brochure</h3>
              <p className="text-gray-600 mb-4">Share your email & phone for updates. Or skip!</p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded px-4 py-2"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border rounded px-4 py-2"
                />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFormSubmit}
                  className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                >
                  Submit & Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesPage;
