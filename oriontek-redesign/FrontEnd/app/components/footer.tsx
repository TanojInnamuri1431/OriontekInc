
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-12 w-auto">
                <Image
                  src="/assets/oriontek-logo.png"
                  alt="Oriontek Inc"
                  width={140}
                  height={52}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </div>
              <div>
                <div className="text-sm text-gray-400">{COMPANY_INFO.tagline}</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {COMPANY_INFO.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Core Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/offshore-development" className="text-gray-300 hover:text-white transition-colors">
                  Offshore Development
                </Link>
              </li>
              <li>
                <Link href="/services/insurance-solutions" className="text-gray-300 hover:text-white transition-colors">
                  Insurance Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/oracle-services" className="text-gray-300 hover:text-white transition-colors">
                  Oracle Services
                </Link>
              </li>
              <li>
                <Link href="/services/microsoft-practice" className="text-gray-300 hover:text-white transition-colors">
                  Microsoft Practice
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a 
                  href={`mailto:${COMPANY_INFO.emails.general}`}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {COMPANY_INFO.emails.general}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">{COMPANY_INFO.offices.us.phone}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" />
                <span className="text-gray-300">
                  {COMPANY_INFO.offices.us.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Global Offices */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Global Presence</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <div className="font-medium text-white">United States</div>
                <div className="text-gray-400">{COMPANY_INFO.offices.us.city}</div>
              </li>
              <li>
                <div className="font-medium text-white">Canada</div>
                <div className="text-gray-400">{COMPANY_INFO.offices.canada.city}</div>
              </li>
              <li>
                <div className="font-medium text-white">India</div>
                <div className="text-gray-400">{COMPANY_INFO.offices.india.city}</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact Us
              </Link>
              <Link href="/hr/login" className="text-gray-400 hover:text-white text-sm transition-colors">
                HR Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
