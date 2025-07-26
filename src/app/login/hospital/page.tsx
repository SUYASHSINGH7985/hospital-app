'use client';

import { useState } from 'react';
import { FaHospitalAlt, FaLock, FaEnvelope, FaUser, FaShieldAlt, FaMapMarkerAlt, FaPhone, FaIdCard, FaClinicMedical, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function HospitalRegistrationPortal() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    hospitalName: '',
    adminName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
    licenseNumber: '',
    facilityType: 'general',
    beds: '',
    specialties: '',
    verificationMethod: '',
    termsAccepted: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-white text-gray-100 font-['Inter']">
      {/* Futuristic header */}
      <header className="border-b border-gray-800 bg-pink-800 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaHospitalAlt className="text-2xl text-white" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-white from-emerald-400 to-teal-300">
              MEDICERT
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Step {step} of 3
          </div>
        </div>
      </header>

      {/* Full-screen form container */}
      <main className="container mx-auto px-6 py-12">
        <AnimatePresence mode='wait'>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step > 1 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step > 1 ? -50 : 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="max-w-4xl mx-auto"
          >
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-[#E02476]">Hospital Registration</h1>
                  <p className="text-gray-800">Please provide your facility&#39;s basic information</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-black">Hospital Name*</label>
                    <div className="relative">
                      <FaHospitalAlt className="absolute left-3 top-3 text-black" />
                      <input
                        type="text"
                        name="hospitalName"
                        value={form.hospitalName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-black">Administrator Name*</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 text-gray-500" />
                      <input
                        type="text"
                        name="adminName"
                        value={form.adminName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-black">Email*</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-black">Phone Number*</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-gray-500" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-black"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-sm font-medium text-black">Full Address*</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none min-h-[100px] text-black"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-black">City*</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-black"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-black">Country*</label>
                    <input
                      type="text"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-black"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-6 py-3 bg-pink-800 from-emerald-500 to-teal-400 rounded-lg font-medium text-white shadow-lg"
                  >
                    Continue
                    <FaChevronRight className="ml-2" />
                  </motion.button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2 text-[#E02476]  ">Facility Details</h1>
                  <p className="text-black">Provide additional information about your healthcare facility</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-black">License Number*</label>
                    <div className="relative">
                      <FaIdCard className="absolute left-3 top-3 text-gray-500" />
                      <input
                        type="text"
                        name="licenseNumber"
                        value={form.licenseNumber}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-black"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-900 mt-1">Official healthcare facility license number</p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-black">Facility Type*</label>
                    <div className="relative">
                      <FaClinicMedical className="absolute left-3 top-3 text-black" />
                      <select
                        name="facilityType"
                        value={form.facilityType}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none appearance-none text-black"
                        required
                      >
                        <option value="general">General Hospital</option>
                        <option value="specialty">Specialty Hospital</option>
                        <option value="clinic">Clinic</option>
                        <option value="diagnostic">Diagnostic Center</option>
                        <option value="research">Research Facility</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-black">Number of Beds</label>
                    <input
                      type="number"
                      name="beds"
                      min="0"
                      value={form.beds}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-whit border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-800">Specialties</label>
                    <input
                      type="text"
                      name="specialties"
                      value={form.specialties}
                      onChange={handleChange}
                      placeholder="Cardiology, Neurology, etc."
                      className="w-full px-4 py-3 bg-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-black "
                    />
                  </div>
                </div>

                <div className="flex items-start mt-6">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="termsAccepted"
                      type="checkbox"
                      checked={form.termsAccepted}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-600 bg-gray-900 text-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-900">
                      I certify that all information provided is accurate and accept the{' '}
                      <a href="#" className="text-pink-700 hover:text-black">
                        Terms of Service
                      </a>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <motion.button
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg font-medium text-white shadow-lg"
                    disabled={!form.termsAccepted}
                  >
                    Continue
                    <FaChevronRight className="ml-2" />
                  </motion.button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Verification</h1>
                  <p className="text-gray-400">Select your preferred verification method</p>
                </div>

                <div className="space-y-4">
                  <motion.div 
                    className="p-6 bg-gray-800 border border-gray-700 rounded-xl"
                    whileHover={{ y: -2 }}
                  >
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="verificationMethod"
                        value="license"
                        checked={form.verificationMethod === 'license'}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-emerald-500 focus:ring-emerald-500"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-100">License Document Upload</h3>
                        <p className="text-sm text-gray-400 mt-1">Upload your official healthcare facility license for verification</p>
                        <div className="mt-4">
                          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                            <p className="text-sm text-gray-400">Upload PDF or image of your license</p>
                            <button 
                              type="button"
                              className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium"
                            >
                              Select File
                            </button>
                          </div>
                        </div>
                      </div>
                    </label>
                  </motion.div>

                  <motion.div 
                    className="p-6 bg-gray-800 border border-gray-700 rounded-xl"
                    whileHover={{ y: -2 }}
                  >
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="verificationMethod"
                        value="government"
                        checked={form.verificationMethod === 'government'}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-emerald-500 focus:ring-emerald-500"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-100">Government Database Verification</h3>
                        <p className="text-sm text-gray-400 mt-1">We&#39;ll verify your facility through official government healthcare registries</p>
                      </div>
                    </label>
                  </motion.div>

                  <motion.div 
                    className="p-6 bg-gray-800 border border-gray-700 rounded-xl"
                    whileHover={{ y: -2 }}
                  >
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="verificationMethod"
                        value="phone"
                        checked={form.verificationMethod === 'phone'}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-emerald-500 focus:ring-emerald-500"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-100">Phone Verification</h3>
                        <p className="text-sm text-gray-400 mt-1">We&#39;ll call your official hospital number to verify your identity</p>
                      </div>
                    </label>
                  </motion.div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FaShieldAlt className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-100">Secure Verification</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        All verification methods are encrypted and secure. Your information will only be used for authentication purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <motion.button
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg font-medium text-white shadow-lg"
                    disabled={!form.verificationMethod}
                  >
                    Complete Registration
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Futuristic footer */}
      <footer className="border-t border-gray-800 bg-pink-800 backdrop-blur-md py-6">
        <div className="container mx-auto px-6 text-center text-sm text-white">
          <p>© {new Date().getFullYear()} Medicert Healthcare Solutions. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-20">
            <a href="#" className="hover:text-emerald-400">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400">Terms of Service</a>
            <a href="#" className="hover:text-emerald-400">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}