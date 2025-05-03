'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Timer from './Timer';
import api from '@/utils/axios';

export interface FormData {
  document_type: string;
  business_name: string;
  business_type: string;
  country: string;
  language: string;
  industry: string;
  protection_level: string;
  clause_confidentiality?: boolean;
  clause_arbitration?: boolean;
  clause_termination?: boolean;
  clause_ip?: boolean;
  additional_instructions?: string;
}

const DOCUMENT_TYPES = {
  nda: "Non-Disclosure Agreement (NDA)",
  terms: "Website Terms of Service",
  privacy: "Privacy Policy",
  contract: "Freelance Contract",
  employee: "Employment Agreement",
  partnership: "Partnership Agreement"
};

const BUSINESS_TYPES = [
  "Sole Proprietorship",
  "Partnership",
  "Corporation",
  "Limited Liability Company (LLC)",
  "Non-Profit Organization"
];

const COUNTRIES = [
  "United Kingdom",
  "Germany",
  "Denmark",
  "Sweden"
];

const LANGUAGES = [
  "English",
  "German",
  "Danish",
  "Swedish"
];

const INDUSTRIES = [
  "Technology/Software",
  "E-commerce/Retail",
  "Healthcare",
  "Finance Services",
  "Education",
  "Consulting",
  "Marketing/Advertising",
  "Manufacturing",
  "Construction",
  "Food Service",
  "Entertainment",
  "Other"
];

export default function DocumentForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    document_type: '',
    business_name: '',
    business_type: '',
    country: '',
    language: '',
    industry: '',
    protection_level: '2',
    clause_confidentiality: false,
    clause_arbitration: false,
    clause_termination: false,
    clause_ip: false,
    additional_instructions: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/create-checkout-session', {
        // your request body here
      });
      const data = response.data;
      router.push(`/checkout?session_id=${data.sessionId}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create checkout session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const finalValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  return (
    <div className="max-w-xl max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden pl-0 px-4 sm:px-0">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-center text-primary mb-6">
          Generate Your Custom Legal Document
        </h2>
        
        <Timer />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="document_type" className="block text-sm font-medium text-secondary mb-1">
              Document Type
            </label>
            <select
              id="document_type"
              name="document_type"
              value={formData.document_type}
              onChange={handleChange}
              className="w-full p-2 border border-secondary/20 rounded-md focus:border-accent focus:ring-1 focus:ring-accent"
              required
            >
              <option value="">Select document type...</option>
              {Object.entries(DOCUMENT_TYPES).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="business_name" className="block text-sm font-medium text-secondary mb-1">
              Business Name
            </label>
            <input
              type="text"
              id="business_name"
              name="business_name"
              placeholder="Enter your business name"
              value={formData.business_name}
              onChange={handleChange}
              className="w-full p-2 border border-secondary/20 rounded-md focus:border-accent focus:ring-1 focus:ring-accent"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="business_type" className="block text-sm font-medium text-secondary mb-1">
                Business Type
              </label>
              <select
                id="business_type"
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                className="w-full p-2 border border-secondary/20 rounded-md focus:border-accent focus:ring-1 focus:ring-accent"
                required
              >
                <option value="">Select business type...</option>
                {BUSINESS_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-secondary mb-1">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full p-2 border border-secondary/20 rounded-md focus:border-accent focus:ring-1 focus:ring-accent"
                required
              >
                <option value="">Select industry...</option>
                {INDUSTRIES.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-secondary mb-1">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 border border-secondary/20 rounded-md focus:border-accent focus:ring-1 focus:ring-accent"
                required
              >
                <option value="">Select country...</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-secondary mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-2 border border-secondary/20 rounded-md focus:border-accent focus:ring-1 focus:ring-accent"
                required
              >
                <option value="">Select language...</option>
                {LANGUAGES.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Document Protection Level
            </label>
            <input
              type="range"
              name="protection_level"
              min="1"
              max="3"
              value={formData.protection_level}
              onChange={handleChange}
              className="w-full h-2 accent-[#b89457]"
            />
            <div className="flex justify-between text-xs text-secondary mt-1">
              <span>Standard</span>
              <span>Comprehensive</span>
              <span>Maximum</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Special Clauses (Optional)
            </label>
            <div className="space-y-2">
              {[
                { name: 'clause_confidentiality', label: 'Enhanced Confidentiality' },
                { name: 'clause_arbitration', label: 'Arbitration Provision' },
                { name: 'clause_termination', label: 'Advanced Termination Options' },
                { name: 'clause_ip', label: 'Intellectual Property Protection' }
              ].map(({ name, label }) => (
                <label key={name} className="flex items-center">
                  <input
                    type="checkbox"
                    name={name}
                    checked={formData[name as keyof FormData] as boolean}
                    onChange={handleChange}
                    className="rounded border-secondary/20 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 text-sm text-secondary">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="additional_instructions" className="block text-sm font-medium text-secondary mb-1">
              Additional Instructions (Optional)
            </label>
            <textarea
              id="additional_instructions"
              name="additional_instructions"
              value={formData.additional_instructions}
              onChange={handleChange}
              placeholder="Enter any specific requirements, details, or custom clauses you'd like to include in your document..."
              rows={4}
              className="w-full p-2 border border-secondary/20 rounded-md focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="bg-gray-200 rounded-lg p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
              <div className="text-2xl font-bold text-primary">£20</div>
              <div className="text-sm text-secondary line-through">Regular price: £40 - Save 55% today!</div>
            </div>
            <div className="space-y-1 mb-4">
              <div className="flex items-center text-sm text-secondary">
                <svg className="w-4 h-4 text-[#10b981] mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Enhanced document customization
              </div>
              <div className="flex items-center text-sm text-secondary">
                <svg className="w-4 h-4 text-[#10b981] mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                PDF + Word formats
              </div>
              <div className="flex items-center text-sm text-secondary">
                <svg className="w-4 h-4 text-[#10b981] mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                1 free revision
              </div>
              <div className="flex items-center text-sm text-secondary">
                <svg className="w-4 h-4 text-[#10b981] mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                Special clauses included
              </div>
            </div>
            <div className="text-[#f59e0b] font-semibold text-sm">
              Only 14 documents remaining at this price today!
            </div>
          </div>
          <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#b89457] hover:bg-primary-dark text-white font-medium rounded-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
              </svg>
              <span>{isLoading ? 'Processing...' : 'Generate Document Now'}</span>
            </button>
        </form>
      </div>
    </div>
  );
} 