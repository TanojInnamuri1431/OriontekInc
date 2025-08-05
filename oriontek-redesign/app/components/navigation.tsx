
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Building2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SERVICES, INDUSTRIES } from '@/lib/constants';

interface NavigationProps {
  isHRSection?: boolean;
}

export default function Navigation({ isHRSection = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services', hasDropdown: true },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-auto">
              <Image
                src="/assets/oriontek-logo.png"
                alt="Oriontek Inc - Consultative Technology Partner"
                width={120}
                height={44}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex items-center space-x-1",
                          isActive(link.href) && "text-blue-600 bg-blue-50"
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuItem asChild>
                        <Link href="/services" className="w-full">
                          All Services
                        </Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t" />
                      {SERVICES.slice(0, 6).map((service) => (
                        <DropdownMenuItem key={service.id} asChild>
                          <Link href={`/services/${service.id}`} className="w-full">
                            {service.title}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(link.href) && "text-blue-600 bg-blue-50"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}

            {/* HR Portal Button */}
            {!isHRSection && (
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/hr/login">HR Portal</Link>
              </Button>
            )}
            
            {isHRSection && (
              <Button variant="outline" asChild>
                <Link href="/">← Back to Website</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                      isActive(link.href)
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.hasDropdown && (
                    <div className="ml-4 space-y-1">
                      {SERVICES.slice(0, 4).map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.id}`}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/hr/login" onClick={() => setIsOpen(false)}>
                    HR Portal
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
