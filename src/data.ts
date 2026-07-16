import { ServiceCategory, FAQItem } from './types';

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'electrician',
    name: 'Electrician Services',
    icon: 'Zap',
    description: 'Aadhaar-verified expert electricians for fast, safe home electrical fixes and smart installations.',
    subServices: [
      'Switch Repair', 'Socket Repair', 'Fan Installation', 'Ceiling Fan Repair',
      'Light Installation', 'LED Installation', 'Wiring', 'MCB Repair',
      'Door Bell Installation', 'Inverter Installation', 'Power Backup', 'Home Electrical Inspection'
    ]
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    icon: 'Droplet',
    description: 'On-demand leak repairs, water systems maintenance, drainage, and expert sanitary installations.',
    subServices: [
      'Tap Repair', 'Pipe Leakage', 'Water Tank Cleaning', 'Toilet Repair',
      'Basin Installation', 'Shower Repair', 'Kitchen Sink Repair',
      'Water Motor Repair', 'Drain Cleaning', 'Bathroom Plumbing'
    ]
  },
  {
    id: 'ac-appliances',
    name: 'AC & Appliance Repair',
    icon: 'Tv',
    description: 'Expert repair and deep servicing for ACs, washing machines, refrigerators, purifiers, and home electronics.',
    subServices: [
      'AC Repair', 'AC Installation', 'AC Gas Refill', 'AC Service',
      'Washing Machine Repair', 'Refrigerator Repair', 'Microwave Repair',
      'Water Purifier Repair', 'RO Installation', 'Geyser Repair',
      'TV Repair', 'Dishwasher Repair', 'Chimney Repair'
    ]
  },
  {
    id: 'cleaning',
    name: 'Deep Cleaning',
    icon: 'Sparkles',
    description: 'Professional hygiene-focused home, office, upholstery, vehicle deep-cleaning, and sanitization.',
    subServices: [
      'Room Cleaning', 'Kitchen Cleaning', 'Bathroom Cleaning', 'Sofa Cleaning',
      'Carpet Cleaning', 'Deep Home Cleaning', 'Office Cleaning',
      'Car Cleaning', 'Bike Cleaning', 'Water Tank Cleaning', 'Window Cleaning'
    ]
  },
  {
    id: 'carpenter',
    name: 'Carpenter Services',
    icon: 'Hammer',
    description: 'Custom woodworking, modular furniture assemblies, lock installations, and heavy furniture restoration.',
    subServices: [
      'Furniture Repair', 'Door Repair', 'Window Repair', 'Wardrobe Installation',
      'Modular Furniture', 'Bed Repair', 'Table Repair', 'Wooden Shelf Installation'
    ]
  },
  {
    id: 'painter',
    name: 'Professional Painting',
    icon: 'Paintbrush',
    description: 'Stunning interior/exterior wall texture, waterproofing coatings, smooth putty finishes, and wood polishing.',
    subServices: [
      'Interior Painting', 'Exterior Painting', 'Wall Texture',
      'Putty Work', 'Waterproof Painting', 'Wood Polish'
    ]
  },
  {
    id: 'renovation',
    name: 'Home Renovation',
    icon: 'Layers',
    description: 'Elevate your spaces with state-of-the-art interior design, modular kitchen structures, and premium ceilings.',
    subServices: [
      'Tile Installation', 'Marble Installation', 'POP Work',
      'False Ceiling', 'Modular Kitchen', 'Interior Design',
      'Waterproofing', 'Civil Work'
    ]
  },
  {
    id: 'construction',
    name: 'Construction Services',
    icon: 'HardHat',
    description: 'Heavy structural mason work, boundary wall erections, concrete foundations, and floor setups.',
    subServices: [
      'Mason', 'Brick Work', 'Concrete Work', 'House Construction',
      'Building Renovation', 'Boundary Wall', 'Flooring'
    ]
  },
  {
    id: 'security',
    name: 'CCTV & Smart Security',
    icon: 'Shield',
    description: 'Keep your loved ones safe with smart security, high-res CCTV matching, and automated door lock installations.',
    subServices: [
      'CCTV Installation', 'CCTV Repair', 'Smart Door Lock',
      'Video Door Phone', 'Security Camera Setup'
    ]
  },
  {
    id: 'tech',
    name: 'Internet & Tech Support',
    icon: 'Laptop',
    description: 'Hyperlocal computer support, seamless WiFi installations, and certified router diagnostic repairs.',
    subServices: [
      'WiFi Installation', 'Router Setup', 'Broadband Repair',
      'Computer Repair', 'Laptop Repair', 'Printer Repair'
    ]
  },
  {
    id: 'beauty',
    name: 'Beauty & Wellness',
    icon: 'Scissors',
    description: 'Premium salon, spa therapies, professional hair care, and custom bridal makeups right at your home.',
    subServices: [
      'Salon at Home', 'Haircut', 'Facial', 'Makeup',
      'Spa', 'Massage', 'Bridal Makeup'
    ]
  },
  {
    id: 'helper',
    name: 'Helper',
    icon: 'Users',
    description: 'On-demand professional helper assistance, manual labor, loader, and experienced, verified drivers.',
    subServices: [
      'Labour', 'Driver', 'Catering'
    ]
  },
  {
    id: 'cooking',
    name: 'Cooking Services',
    icon: 'ChefHat',
    description: 'Expert, verified home cooks and professional chefs for daily home meals, part-time help, full-time culinary staffing, and events.',
    subServices: [
      'Daily Home Cook', 'Part-Time Cook', 'Full-Time Cook', 'Event & Catering Cook'
    ]
  },
  {
    id: 'gardening',
    name: 'Gardening & Landscape',
    icon: 'Flower2',
    description: 'Lawn styling, general pruning, professional garden cleanups, organic pest treatments, and soil plant care.',
    subServices: [
      'Lawn Maintenance', 'Plant Care', 'Garden Cleaning', 'Landscaping'
    ]
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'AI-Powered Worker Matching',
    description: 'Our proprietary hyper-matching algorithm instantly pairs you with the closest, best-rated specialist matching your exact criteria.',
    icon: 'Cpu'
  },
  {
    title: 'Aadhaar Verified Workers',
    description: 'Safety first. Every single professional undergoes double-layer background screening and mandatory Aadhaar registration.',
    icon: 'CheckSquare'
  },
  {
    title: 'Instant Booking & Live Tracking',
    description: 'No more waiting or coordinate haggling. Book in 10 seconds and track your service provider in real-time via high-accuracy GPS map.',
    icon: 'MapPin'
  },
  {
    title: 'Transparent, Fixed Pricing',
    description: 'Know exactly what you pay before booking. No surprise fees, no hidden labor rates, and completely digital invoices.',
    icon: 'Receipt'
  },
  {
    title: 'Multilingual Customer Support',
    description: '24/7 hyper-responsive support speaking your language, ensuring swift dispute resolutions and peace of mind.',
    icon: 'PhoneCall'
  },
  {
    title: 'Smart Digital History & Alerts',
    description: 'Track warranty of completed services, view past bills, and receive proactive, timely booking notifications.',
    icon: 'Bell'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'What is SkillnovaX?',
    answer: 'SkillnovaX is India’s next-generation, AI-powered hyperlocal home service marketplace. It connects homeowners and businesses with verified local service professionals like electricians, plumbers, painters, cleaners, and beauty therapists within minutes.'
  },
  {
    question: 'When will the SkillnovaX app launch?',
    answer: 'We are currently launching private beta access in selected metropolitan areas (Delhi NCR, Bengaluru, Mumbai, Pune, and Hyderabad) in Q3 2026. Join our early access waitlist today to be notified and receive exclusive launch discounts.'
  },
  {
    question: 'How are workers on the platform verified?',
    answer: 'Trust is our cornerstone. Every service provider undergoes a strict multi-step vetting process, including physical address checks, Aadhaar-based digital identity verification, reference checks, and mandatory skill evaluations before being allowed to accept tasks.'
  },
  {
    question: 'Is booking secure and how do payments work?',
    answer: 'Yes, absolutely. Payments are processed securely via encrypted UPI, card, or netbanking. SkillnovaX holds funds in a secure escrow system, releasing it to the worker only after you confirm the job is completed to your satisfaction.'
  },
  {
    question: 'Can I register as a worker/service professional?',
    answer: 'Yes! SkillnovaX is designed to empower skilled professionals. By signing up as a worker, you get direct access to hundreds of local customers without paying commission fees, manage your own schedule, build digital reputation, and withdraw earnings instantly.'
  },
  {
    question: 'Which cities will be supported at launch?',
    answer: 'Entire Indian cities will supported at launch'
  },
  {
    question: 'How can I join the waitlist and what benefits do I get?',
    answer: 'Early birds receive zero booking fees, and priority matching. Workers who join early get 0% commision fees for their first months!'
  }
];

export const CUSTOMER_FEATURES = [
  { name: 'Mobile OTP Login', desc: 'Secure, passwordless mobile registration.' },
  { name: 'Google Sign In', desc: 'Single-click authentication on the go.' },
  { name: 'Location Detection', desc: 'Precise GPS-based service pinpointing.' },
  { name: 'Browse Services', desc: 'Search and navigate 100+ micro-categories.' },
  { name: 'AI Recommendations', desc: 'Smart suggestions based on home health history.' },
  { name: 'Instant Booking', desc: 'One-tap dispatching for urgent repairs.' },
  { name: 'Live Worker Tracking', desc: 'High-accuracy real-time map tracking.' },
  { name: 'Booking Timeline', desc: 'Visual milestones from accept to invoice.' },
  { name: 'Digital Payments', desc: 'UPI, cards, and secure Escrow releases.' },
  { name: 'Booking History', desc: 'Keep track of work records and warranty cards.' },
  { name: 'Favourite Workers', desc: 'Save and re-book preferred local technicians.' },
  { name: 'Ratings & Reviews', desc: '100% genuine peer-rated performance stars.' }
];

export const WORKER_FEATURES = [
  { name: 'Worker Registration', desc: 'Quick professional onboarding wizard.' },
  { name: 'Aadhaar Verification', desc: 'Automated instant digital KYC validation.' },
  { name: 'Profile Management', desc: 'Build a premium digital resume with ease.' },
  { name: 'Skill Selection', desc: 'Configure multiple trades and custom pricing.' },
  { name: 'Experience Details', desc: 'Showcase certifications, portfolio, and years.' },
  { name: 'Service Area Selection', desc: 'Define your desired working radius on maps.' },
  { name: 'Instant Job Alerts', desc: 'Get matched with high-paying local requests.' },
  { name: 'Accept or Reject Jobs', desc: 'Absolute freedom to choose your work times.' },
  { name: 'Earnings Dashboard', desc: 'Real-time daily payouts and instant withdrawals.' },
  { name: 'Booking History', desc: 'Details of all finished jobs and customer feedback.' },
  { name: 'Performance Analytics', desc: 'Track your growth, target metrics, and ratings.' },
  { name: 'Availability Toggle', desc: 'Go online/offline with a simple slider.' }
];

export const ADMIN_FEATURES = [
  { name: 'User Management', desc: 'Unified customer & worker directory control.' },
  { name: 'Worker Verification', desc: 'Approve Aadhaar KYC, certifications, background.' },
  { name: 'Service Management', desc: 'Dynamically add service categories and price tabs.' },
  { name: 'Booking Management', desc: 'Real-time overview of current bookings and disputes.' },
  { name: 'Revenue Analytics', desc: 'Track platform volumes, payouts, and commissions.' },
  { name: 'Reports Dashboard', desc: 'Visual charts representing geographic booking trends.' },
  { name: 'Complaint Management', desc: 'High-priority ticketing for rapid issue resolution.' },
  { name: 'Smart Broadcasts', desc: 'Blast push notifications and seasonal discount codes.' }
];
