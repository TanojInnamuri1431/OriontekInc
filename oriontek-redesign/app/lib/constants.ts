
export const COMPANY_INFO = {
  name: "Oriontek Inc",
  tagline: "Consultative Technology Partner",
  mission: "We deliver end-to-end software solutions that significantly reduce cost, increase productivity and enhance the market position of our clients.",
  description: "Not just a technology implementation partner, but a full-fledged, consultative partner focused on enabling our clients to achieve better performance and operational efficiency.",
  
  // Business Metrics
  metrics: {
    experience: "15+",
    projects: "500+",
    clients: "200+",
    countries: "15+",
    uptime: "99.9%"
  },

  // Global Offices
  offices: {
    us: {
      name: "United States",
      city: "Suwanee, Georgia",
      address: "5400 Laurel Springs Pkwy STE 204, Suwanee, GA 30024",
      phone: "+1 (678) 765-1678",
      fax: "732-909-2612",
      timezone: "EST"
    },
    canada: {
      name: "Canada",
      city: "Milton, Ontario", 
      address: "701 Peacock Lane, Milton, ON L9T 5L6",
      phone: "+1 (678) 765-1678",
      fax: "732-909-2612",
      timezone: "EST"
    },
    india: {
      name: "India",
      city: "Vijayawada, Andhra Pradesh",
      address: "D.No 48-13-3/18, 2nd Floor, CNR Complex, Ramachandra Nagar, Vijayawada, Andhra Pradesh, INDIA 520008",
      phone: "0866 351 0303",
      fax: "0866 351 0304",
      timezone: "IST"
    }
  },

  // Contact Information
  emails: {
    general: "hr@oriontekinc.com",
    insurance: "insurance_softwareservices@oriontekinc.com",
    web20: "ajax_opensource_services@oriontekinc.com"
  },

  // Notable Clients
  clients: [
    "Asurion",
    "Beckman Coulter",
    "Kelly Services",
    "Top-5 Insurance Companies in US",
    "Healthcare Leaders",
    "Financial Services Companies"
  ]
};

export const SERVICES = [
  {
    id: "offshore-development",
    title: "Offshore Development",
    shortDescription: "O-3 Delivery Model with global team approach for seamless software development.",
    description: "Our proprietary O-3 (Onsite-Offsite-Offshore) delivery model ensures seamless project execution with strong US market presence and coast-to-coast consultants. We maintain a satellite delivery center in Georgia and offshore center in Vijayawada, India.",
    icon: "Globe",
    features: [
      "O-3 Delivery Model (Onsite-Offsite-Offshore)",
      "Coast-to-coast US consultants",
      "Satellite delivery center in Georgia", 
      "Offshore center in Vijayawada, India",
      "Requirements gathering onsite",
      "Oriontek USA as interim client for QA",
      "24/7 development support"
    ],
    benefits: [
      "Significant cost reduction through offshore model",
      "Seamless communication across time zones",
      "Quality assurance through US validation",
      "Scalable development teams",
      "Risk mitigation through geographic distribution"
    ],
    technologies: ["J2EE", "Oracle", "Microsoft .NET", "Python", "GoLang"],
    industries: ["Insurance", "Healthcare", "Financial Services", "Technology"],
    caseStudy: {
      title: "Enterprise Claims Management System",
      description: "3000+ person-days project executed in 10 months for Top-5 Insurance Company in US",
      metrics: "20+ developers, 5+ QA testers, enterprise-scale system"
    }
  },
  {
    id: "insurance-solutions", 
    title: "Insurance Solutions",
    shortDescription: "Specialized insurance industry solutions with deep domain expertise.",
    description: "We specialize in complex insurance business operations, transforming paper-intensive models into efficient digital systems. Our expertise spans health & life insurance and property & casualty insurance.",
    icon: "Shield",
    features: [
      "Health & Life Insurance systems",
      "Property & Casualty Insurance",
      "Policy management systems",
      "Claims processing automation", 
      "Multi-product line management",
      "Enterprise-scale implementations",
      "Regulatory compliance solutions"
    ],
    benefits: [
      "Reduced operational costs",
      "Faster claims processing",
      "Improved compliance",
      "Enhanced customer experience",
      "Scalable architecture"
    ],
    specializations: [
      "Term Life, Universal Life, Variable Life",
      "Medical Insurance, Disability Insurance",
      "Commercial Lines, Automobile Insurance",
      "Homeowners, Excess Liability",
      "Workers Compensation, Marine Insurance"
    ],
    technologies: ["Oracle", "J2EE", ".NET", "SQL Server", "Web Services"],
    industries: ["Insurance", "Healthcare"],
    caseStudy: {
      title: "Enterprise Claims Management System",
      description: "Complete insurance administration system used by Top-5 Insurance Companies in US",
      metrics: "3000+ person-days, 10 months delivery, global team"
    }
  },
  {
    id: "sdlc-consulting",
    title: "SDLC Consulting Services", 
    shortDescription: "Multiple SDLC methodologies with collaborative project management approach.",
    description: "We support multiple SDLC models including Waterfall, V-Shaped, Incremental, and Spiral methodologies. Our collaborative project management portal ensures transparency and quality throughout the development lifecycle.",
    icon: "Settings",
    features: [
      "Waterfall methodology",
      "V-Shaped model implementation",
      "Incremental development approach", 
      "Spiral model expertise",
      "Collaborative Project Management Portal",
      "Work-in-progress checkpoints",
      "Interim demos and validation"
    ],
    benefits: [
      "Predictable project outcomes",
      "Clear milestone tracking",
      "Risk mitigation through iterative approach",
      "Transparent communication",
      "Quality assurance at each phase"
    ],
    methodologies: ["Waterfall", "V-Shaped", "Incremental", "Spiral", "Agile"],
    technologies: ["Project Management Tools", "Version Control", "Testing Frameworks"],
    industries: ["All Industries"],
    caseStudy: {
      title: "Multi-Phase Enterprise Implementation",
      description: "Complex enterprise system delivered using hybrid SDLC approach",
      metrics: "Multiple phases, seamless delivery, quality checkpoints"
    }
  },
  {
    id: "oracle-services",
    title: "Oracle Services",
    shortDescription: "Oracle R12 implementations with comprehensive financials and BI solutions.",
    description: "Complete Oracle solutions including R12 implementations, financials modules, and business intelligence. We provide end-to-end Oracle services from implementation to support.",
    icon: "Database",
    features: [
      "Oracle R12 implementation consulting",
      "Oracle Financials (GL, AP, AR)",
      "EBTAX, FAH, Oracle Payments",
      "Oracle BI Publisher",
      "Workflow/AME implementation",
      "Oracle Discoverer Administration",
      "Oracle Business Intelligence"
    ],
    benefits: [
      "Streamlined financial processes",
      "Improved business intelligence",
      "Automated workflows", 
      "Enhanced reporting capabilities",
      "Integrated enterprise systems"
    ],
    modules: ["GL", "AP", "AR", "EBTAX", "FAH", "Oracle Payments", "BI Publisher"],
    technologies: ["Oracle Database", "Oracle Applications", "PL/SQL", "Oracle BI"],
    industries: ["Financial Services", "Manufacturing", "Healthcare", "Government"],
    caseStudy: {
      title: "Enterprise Oracle R12 Implementation",
      description: "Complete Oracle financials implementation with BI integration",
      metrics: "Full module deployment, training, ongoing support"
    }
  },
  {
    id: "web20-development",
    title: "Web 2.0 Development", 
    shortDescription: "Rich Internet Applications with Ajax, Flash, and open source technologies.",
    description: "We create engaging Rich Internet Applications using Ajax, Flash, and open source platforms. Our Web 2.0 solutions include interactive features, APIs, and modern web technologies.",
    icon: "Globe",
    features: [
      "Ajax-based applications",
      "Flash development",
      "Rich Internet Applications (RIAs)", 
      "PHP and MySQL development",
      "Python applications",
      "API development and integration",
      "Interactive web experiences"
    ],
    benefits: [
      "Enhanced user experience",
      "Interactive interfaces",
      "Cross-platform compatibility",
      "Scalable architecture", 
      "Cost-effective solutions"
    ],
    technologies: ["Ajax", "Flash", "PHP", "MySQL", "Python", "Perl", "JavaScript"],
    platforms: ["Web Browsers", "Mobile Devices", "Cross-Platform"],
    industries: ["Media", "E-commerce", "Education", "Entertainment"],
    caseStudy: {
      title: "Interactive Web Platform",
      description: "Rich internet application with advanced Ajax features and API integrations",
      metrics: "Multiple APIs, real-time features, responsive design"
    }
  },
  {
    id: "microsoft-practice",
    title: "Microsoft Practice",
    shortDescription: "Microsoft Strategic Alliance with SharePoint, .NET, and Azure expertise.",
    description: "As a Microsoft Strategic Alliance partner, we provide comprehensive Microsoft solutions including SharePoint 2007 (MOSS), .NET development, and Azure cloud services with our Microsoft Center of Excellence.",
    icon: "Monitor", 
    features: [
      "SharePoint 2007 (MOSS) solutions",
      ".NET development expertise",
      "Azure cloud services",
      "Microsoft Center of Excellence",
      "Enterprise architecture design",
      "Large certified talent pool",
      "Strategic alliance benefits"
    ],
    benefits: [
      "Enterprise-grade solutions",
      "Seamless Microsoft integration",
      "Cloud scalability",
      "Certified expertise",
      "Ongoing Microsoft support"
    ],
    technologies: [".NET Framework", "SharePoint", "Azure", "SQL Server", "C#", "PowerBI"],
    certifications: ["Microsoft Strategic Alliance", "Azure Certified", "SharePoint Specialist"],
    industries: ["Enterprise", "Government", "Healthcare", "Financial Services"],
    caseStudy: {
      title: "Enterprise SharePoint Implementation", 
      description: "Complete SharePoint platform with custom .NET integrations and Azure deployment",
      metrics: "Enterprise-wide deployment, custom features, cloud migration"
    }
  }
];

export const INDUSTRIES = [
  {
    id: "insurance",
    name: "Insurance",
    description: "Comprehensive insurance solutions for health & life, property & casualty insurance companies.",
    specializations: [
      "Health & Life Insurance",
      "Property & Casualty Insurance", 
      "Claims Management",
      "Policy Administration",
      "Regulatory Compliance"
    ]
  },
  {
    id: "healthcare", 
    name: "Healthcare",
    description: "Technology solutions for healthcare providers, pharmaceuticals, and medical device companies.",
    specializations: [
      "Electronic Health Records",
      "Medical Device Integration",
      "Pharmaceutical Systems",
      "Compliance Solutions",
      "Patient Management"
    ]
  },
  {
    id: "financial-services",
    name: "Financial Services", 
    description: "Banking, investment, and financial technology solutions with regulatory compliance.",
    specializations: [
      "Banking Systems",
      "Investment Platforms",
      "Risk Management", 
      "Regulatory Reporting",
      "Payment Processing"
    ]
  },
  {
    id: "technology",
    name: "Technology Companies",
    description: "Support for Independent Software Vendors (ISVs) and small-to-mid sized technology companies.",
    specializations: [
      "ISV Support",
      "Product Development",
      "Platform Integration",
      "Scalability Solutions", 
      "Technical Consulting"
    ]
  }
];

// HR Portal Specific Constants
export const HR_PREDEFINED_PASSWORDS = {
  "Anil@oriontek": "ANIL@oriontekinc.com",
  "Subha@oriontek": "subha@oriontekinc.com",
  "Nageswararao@ORIONTEKINC.COM": "Nageswararao@ORIONTEKINC.COM"
};

export const PASSWORD_RESET_EMAIL = "subha@oriontekinc.com";

export const EMPLOYEE_DEPARTMENTS = [
  "Engineering",
  "Human Resources", 
  "Finance",
  "Operations",
  "Sales",
  "Marketing",
  "Quality Assurance",
  "Project Management"
];

export const DEPARTMENTS = EMPLOYEE_DEPARTMENTS; // Alias for backward compatibility

export const EMPLOYEE_POSITIONS = [
  "Software Engineer",
  "Senior Software Engineer",
  "Tech Lead",
  "Project Manager",
  "HR Manager",
  "Business Analyst",
  "QA Engineer",
  "DevOps Engineer",
  "Consultant"
];

export const EMPLOYEE_STATUS_OPTIONS = [
  "Active",
  "Inactive",
  "On Leave",
  "Terminated"
];

export const EMPLOYEE_STATUS = EMPLOYEE_STATUS_OPTIONS; // Alias for backward compatibility

export const DOCUMENT_CATEGORIES = [
  "Contract",
  "Certificate", 
  "Policy",
  "Training Material",
  "Compliance Document",
  "Project Document",
  "Employee Handbook",
  "Other"
];

export const TIMESHEET_TASK_TYPES = [
  "Development",
  "Testing",
  "Documentation",
  "Meeting",
  "Training", 
  "Support",
  "Planning",
  "Research"
];

export const TASK_TYPES = TIMESHEET_TASK_TYPES; // Alias for backward compatibility

export const TIMESHEET_STATUS_OPTIONS = [
  "Pending",
  "Approved", 
  "Rejected"
];

export const TIMESHEET_STATUS = TIMESHEET_STATUS_OPTIONS; // Alias for backward compatibility

export const NOTIFICATION_TYPES = {
  INFO: "Info",
  WARNING: "Warning", 
  ERROR: "Error",
  SUCCESS: "Success"
};
