// ═══════════════════════════════════════════════════════
// GEOTREKS KENYA · SITE CONTENT DATA
// All content managed here — used by both public site
// and admin panel. In production, replace with API calls.
// ═══════════════════════════════════════════════════════

// ─── COMPANY INFO ────────────────────────────────────────
export const COMPANY = {
  name: 'GeoTreks Kenya',
  tagline: 'Precision Geospatial. Trusted Intelligence.',
  description: 'East Africa\'s leading geospatial, land survey, and remote sensing company. We turn spatial data into strategic decisions.',
  founded: '2023',
  employees: '3+',
  projects: '3+',
  clients: '13+',
  phone: '+254 717 406 799',
  email: 'info@geotreks.co.ke',
  salesEmail: 'projects@geotreks.co.ke',
  address: 'Virtual',
  poBox: 'P.O. Box 215 – 00200, Nairobi, Kenya',
  lat: -1.2674,
  lng: 36.8079,
  social: {
    twitter:   'https://twitter.com/GeoTreksKenya',
    linkedin:  'https://linkedin.com/company/geotreks-kenya',
    facebook:  'https://facebook.com/GeoTreksKenya',
    youtube:   'https://youtube.com/@GeoTreksKenya',
    instagram: 'https://instagram.com/geotrekskenya',
  }
}

// ─── SERVICES ────────────────────────────────────────────
export const SERVICES = [
  {
    id: 'land-survey',
    icon: 'Ruler',
    title: 'Land Surveying',
    subtitle: 'Boundary, topographic & engineering surveys',
    description: 'We conduct precise land boundary surveys, topographic mapping, and engineering surveys using state-of-the-art total stations and GNSS equipment. Our surveyors are registered with the Institution of Surveyors of Kenya (ISK).',
    features: ['Boundary delimitation & title surveys', 'Topographic surveys & DTM', 'Engineering & construction surveys', 'Subdivision & amalgamation', 'Court-admissible survey reports', 'Beacon replacement & restoration'],
    color: '#0a5c47',
    clients: 'Counties, developers, individuals',
  },
  {
    id: 'gis-solutions',
    icon: 'Map',
    title: 'GIS Solutions',
    subtitle: 'Spatial data management & analysis',
    description: 'End-to-end Geographic Information Systems services — from data collection and database design to advanced spatial analysis and custom web map applications. We build the tools your organisation needs to make location-informed decisions.',
    features: ['Spatial database design (PostGIS)', 'Custom web GIS applications', 'GIS training & capacity building', 'Geodatabase migration', 'Spatial data analysis & modelling', 'Location intelligence dashboards'],
    color: '#1d6fa4',
    clients: 'NGOs, government, utilities',
  },
  {
    id: 'remote-sensing',
    icon: 'Satellite',
    title: 'Remote Sensing',
    subtitle: 'Satellite imagery analysis & interpretation',
    description: 'Multi-spectral and hyperspectral satellite imagery analysis for agriculture, forestry, urban planning, and environmental monitoring. We work with Sentinel, Landsat, PlanetScope, and commercial VHR imagery.',
    features: ['Land use / land cover mapping', 'NDVI & vegetation analysis', 'Change detection studies', 'Flood & disaster mapping', 'Urban growth monitoring', 'Carbon stock assessment'],
    color: '#5a3d9e',
    clients: 'Research, agriculture, conservation',
  },
  {
    id: 'drone-survey',
    icon: 'Plane',
    title: 'Drone & UAV Surveys',
    subtitle: 'Aerial photogrammetry & LiDAR',
    description: 'High-resolution aerial surveys using DJI Phantom, Matrice, and fixed-wing UAVs. We produce orthomosaics, 3D point clouds, digital elevation models, and volumetric measurements with centimetre-level accuracy.',
    features: ['Orthomosaic mapping (2cm GSD)', '3D point cloud generation', 'Digital Elevation Models (DEM)', 'Volumetric calculations', 'Infrastructure inspection', 'KCAA-licensed operations'],
    color: '#b45309',
    clients: 'Mining, construction, agriculture',
  },
  {
    id: 'spatial-data',
    icon: 'Database',
    title: 'Spatial Data & Analytics',
    subtitle: 'Data products, APIs & intelligence',
    description: 'Proprietary and curated spatial datasets for Kenya and East Africa. From administrative boundaries to road networks, health facility locations, and population distribution data — ready for immediate integration.',
    features: ['Kenya administrative boundary datasets', 'Road & infrastructure networks', 'POI databases (health, education)', 'Population density grids', 'Custom data collection campaigns', 'Spatial API development'],
    color: '#0e7490',
    clients: 'Fintechs, developers, researchers',
  },
  {
    id: 'training',
    icon: 'GraduationCap',
    title: 'Training & Consultancy',
    subtitle: 'GIS, RS & survey capacity building',
    description: 'Structured training programmes for government staff, NGOs, and private sector teams. Our trainers are experienced practitioners who combine theory with hands-on fieldwork using industry-standard software.',
    features: ['QGIS fundamentals & advanced', 'ArcGIS Pro & ArcGIS Online', 'Remote sensing with Google Earth Engine', 'Field data collection (KoboToolbox, ODK)', 'Drone operation & processing', 'Custom in-house training'],
    color: '#065f46',
    clients: 'Counties, NGOs, universities',
  },
]

// ─── TEAM ─────────────────────────────────────────────────
export const TEAM = [
  {
    id: 'tm0',
    name: 'Collins Towett',
    role: 'Founder & Developer',
    bio: 'Experienced GIS professional specializing in spatial analysis, mapping, and geospatial system development. Founder of GeoTreks Kenya with a strong focus on delivering innovative and practical geospatial solutions across multiple sectors.',
    linkedin: 'Collins Towett',
    initials: 'CT',
    color: '#0a5c47',
    expertise: ['GIS analysis', 'Spatial data management', 'Geospatial solutions'],
  },
  // {
  //   id: 'tm1',
  //   name: 'Felix Mutua',
  //   role: 'Geomatic & Geospatial Engineer',
  //   bio: 'Professional geomatic and geospatial engineer with expertise in land surveying, spatial data acquisition, and geospatial analysis. Experienced in delivering accurate and reliable mapping solutions for engineering and planning projects.',
  //   linkedin: '#',
  //   initials: 'FM',
  //   color: '#1d6fa4',
  //   expertise: ['Geomatics', 'Surveying', 'Geospatial analysis'],
  // },
  {
    id: 'tm2',
    name: 'Lawrence Bii',
    role: 'Civil Engineer',
    bio: 'Qualified civil engineer with experience in infrastructure design, construction supervision, and project planning. Integrates engineering principles with geospatial data to support efficient and sustainable development.',
    linkedin: '#',
    initials: 'LB',
    color: '#b45309',
    expertise: ['Infrastructure design', 'Construction', 'Project planning'],
  },
  {
    id: 'tm3',
    name: 'Chrispus Gatia',
    role: 'IT Expert',
    bio: 'IT specialist with strong experience in software development, systems integration, and technical support. Focused on building and maintaining reliable digital solutions for geospatial and enterprise systems.',
    linkedin: '#',
    initials: 'CG',
    color: '#5a3d9e',
    expertise: ['Software development', 'Systems integration', 'IT support'],
  },
]

/// ─── PROJECTS / PORTFOLIO ─────────────────────────────────
export const PROJECTS = [
  {
    id: 'proj1',
    title: 'Mapping and Socioeconomic Survey of Slums and Informal Settlements',
    category: 'GIS Solutions',
    client: 'Multi-County Initiative',
    year: '2024',
    duration: '2 Years',
    description: 'Comprehensive mapping and socioeconomic survey of slums and informal settlements across 13 counties in the Eastern, Coastal, Central, and North Eastern regions of Kenya. Combined field data collection, GIS mapping, and spatial analysis to support planning and policy development.',
    outcomes: [
      'Mapped informal settlements across 13 counties',
      'Collected socioeconomic data from thousands of households',
      'Identified key service delivery gaps',
      'Delivered geospatial database and analytical reports'
    ],
    tags: ['GIS', 'Survey', 'Socioeconomic', 'Data Collection'],
    featured: true,
    color: '#0a5c47',
  },
  {
    id: 'proj2',
    title: 'GT Mapper – Field officer GPS tracking Data Collection App',
    category: 'GIS Software',
    client: 'Internal Product',
    year: '2024',
    duration: 'Ongoing',
    description: 'A custom-built mobile data collection application designed for efficient field mapping and survey workflows. GT Mapper supports offline data capture, GPS tracking, and seamless synchronization with cloud-based GIS systems. ',
    outcomes: [
      'Enabled offline-first data collection',
      'Improved field team efficiency and accuracy',
      'Integrated with GIS backend systems',
      'Deployed across multiple field projects'
    ],
    tags: ['Mobile App', 'GIS', 'Data Collection', 'Offline'],
    featured: true,
    color: '#065f46',
  },
  {
    id: 'proj3',
    title: 'Web-Based Land Registration System – Kericho County',
    category: 'Web GIS',
    client: 'Kericho County Government',
    year: '2024',
    duration: '4 months',
    description: 'Developed a web-based land registration platform for Kericho County to digitize land records, streamline application processes, and improve transparency in land administration.',
    outcomes: [
      'Digitized land registration workflows',
      'Reduced manual paperwork and processing time',
      'Improved data accessibility and transparency',
      'Delivered secure and scalable web platform'
    ],
    tags: ['Web App', 'Land Management', 'GIS', 'e-Government'],
    featured: true,
    color: '#1d6fa4',
  },
  {
    id: 'proj4',
    title: 'Custom Geospatial Solutions & Consultancy',
    category: 'Consultancy',
    client: 'Various Clients',
    year: '2023',
    duration: 'Ongoing',
    description: 'Provision of tailored geospatial consulting services including GIS analysis, mapping, remote sensing, and system development for diverse sectors such as urban planning, agriculture, and infrastructure.',
    outcomes: [
      'Delivered multiple client-specific GIS solutions',
      'Supported decision-making through spatial analysis',
      'Developed custom dashboards and mapping tools',
      'Built long-term client partnerships'
    ],
    tags: ['Consulting', 'GIS', 'Remote Sensing', 'Analytics'],
    featured: false,
    color: '#0e7490',
  },
]
// ─── BLOG POSTS ───────────────────────────────────────────
export const BLOG_POSTS = [
  {
    id: 'blog1',
    title: 'Land Registration in Kenya: The GIS Revolution in the Lands Ministry',
    slug: 'land-registration-kenya-gis-revolution',
    excerpt: 'The National Land Information Management System (NLIMS) is changing how land is registered in Kenya. What surveyors and landowners need to know about the digital transformation.',
    content: `Kenya's land registration system is undergoing its most significant transformation since independence. The National Land Information Management System (NLIMS), branded as Ardhisasa, has moved land transactions online — and GIS sits at the core of the platform.

## What Ardhisasa Means for Land Professionals

For registered surveyors, the shift is fundamental. Survey plans must now be submitted in digital format compatible with NLIMS. The Ministry of Lands has published technical specifications requiring plans in the Kenya Coordinate Reference System (KCRCS) using the Arc 1960 datum.

GeoTreks Kenya has been processing NLIMS-compliant survey plans since the platform's launch, and the workflow changes are significant but manageable with the right software setup.

## Technical Requirements for Digital Submission

Plans must be submitted as georeferenced PDFs with embedded coordinate data. The Ministry's current specifications require:
- Coordinate system: Kenya TM (EPSG:21037 or county-specific zone)
- Minimum accuracy: ±5cm for urban areas, ±50cm for rural
- File format: PDF/A with embedded geodata
- Supporting data: XML metadata file with parcel attributes

The GNSS field data must be processed against the Kenya National Survey Reference Frame (KNSRF) control points, which are accessible through Survey of Kenya's official network.

## Common Pitfalls We've Encountered

**Datum confusion**: Many practitioners are still working in WGS84 and not applying the proper transformation to Arc 1960. The shift in Nairobi is approximately 14m north and 3m east — significant enough to cause registration rejections.

**Boundary conflicts**: The digitised historical records in NLIMS frequently don't match physical boundaries on the ground. Any discrepancy requires an adjudication process before the plan can proceed.

**Title conversion delays**: If a property is still under a pre-2012 title (RTA, GLA, etc.), it must be converted to a title under the Land Registration Act 2012 before NLIMS transactions can proceed.

The transition is challenging but ultimately positive for the sector. Digital records reduce fraud, improve tenure security, and should eventually speed up transactions. We're happy to advise on NLIMS-compliant survey methodology for your specific project.`,
    author: 'Collins K. Towett',
    authorRole: 'Founder',
    category: 'Policy',
    tags: ['Land Registration', 'NLIMS', 'Ardhisasa', 'Kenya', 'Cadastral'],
    date: '2023-12-05',
    readTime: 7,
    featured: true,
    initials: 'CT',
    authorColor: '#1d6fa4',
  },
  {
    id: 'blog2',
    title: 'Introduction to QGIS for Beginners',
    slug: 'introduction-to-qgis-beginners',
    excerpt: 'QGIS is one of the most widely used open-source GIS tools. This guide introduces its core features and how beginners can start mapping quickly.',
    content: `QGIS is a powerful open-source Geographic Information System (GIS) that allows users to create, edit, visualize, and analyze geospatial data. It has become a preferred tool for many professionals due to its flexibility and zero licensing cost.

## Getting Started

After installing QGIS, users can load spatial data such as shapefiles, GeoJSON, or raster imagery. The interface is user-friendly, with panels for layers, processing tools, and map display.

## Key Features

- Data visualization and styling
- Spatial analysis tools
- Plugin support for extended functionality
- Integration with GPS and remote sensing data

## Why QGIS Matters

For students, researchers, and organizations with limited budgets, QGIS provides a robust alternative to commercial GIS software. It supports a wide range of applications including urban planning, environmental monitoring, and land management.

Learning QGIS opens the door to advanced geospatial analysis and mapping capabilities, making it an essential tool for anyone entering the GIS field.`,
    author: 'QGIS Documentation Team',
    authorRole: 'Open Source Contributors',
    category: 'Training',
    tags: ['QGIS', 'GIS', 'Open Source', 'Training'],
    date: '2023-10-10',
    readTime: 5,
    featured: false,
    initials: 'QG',
    authorColor: '#065f46',
  },
]

// ─── TESTIMONIALS ─────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 't1',
    quote: 'GeoTreks delivered our road corridor surveys on time and within budget. The accuracy of their drone-based DEM exceeded our engineering specifications. We\'ve used them on three KeNHA projects now.',
    name: 'Eng. Peter Kamau',
    role: 'Director of Engineering, KeNHA',
    org: 'Kenya National Highways Authority',
    initials: 'PK',
    color: '#b45309',
  },
  {
    id: 't2',
    quote: 'The farm boundary digitisation project transformed our agri-lending operations. We went from spending weeks on manual verification to having polygon data available within 48 hours of field collection.',
    name: 'Mary Atieno',
    role: 'Head of Agricultural Finance',
    org: 'Equity Group Foundation',
    initials: 'MA',
    color: '#065f46',
  },
  {
    id: 't3',
    quote: 'Their QGIS training programme for our county GIS unit was exactly what we needed — practical, well-paced, and tailored to our specific datasets and workflows. Highly recommended.',
    name: 'Dr. Samuel Omondi',
    role: 'County Director of Planning',
    org: 'Kisumu County Government',
    initials: 'SO',
    color: '#1d6fa4',
  },
]

// ─── STATS ────────────────────────────────────────────────
export const STATS = [
  { value: '3+', label: 'Projects completed', icon: 'FolderOpen' },
  { value: '13+',  label: 'Clients served',     icon: 'Users' },
  { value: '12',   label: 'Counties covered',   icon: 'Map' },
  { value: '3',    label: 'Years in operation', icon: 'Calendar' },
]

// ─── PARTNERS / CLIENTS ───────────────────────────────────
export const PARTNERS = [
  'Kenya National Highways Authority',
  'Nairobi City County',
  'UN-Habitat Kenya',
  'WWF Kenya',
  'Equity Group Foundation',
  'One Acre Fund',
  'Kenya Ports Authority',
  'Ministry of Lands',
]

// ─── ADMIN LOGS ───────────────────────────────────────────
export const INITIAL_LOGS = [
  { id: 'l1', type: 'info',    message: 'Website deployed successfully', time: new Date(Date.now() - 2*3600000) },
  { id: 'l2', type: 'info',    message: 'Newsletter form submission: james@example.com', time: new Date(Date.now() - 3600000) },
  { id: 'l3', type: 'success', message: 'Contact form submitted: David Mwangi', time: new Date(Date.now() - 1800000) },
  { id: 'l4', type: 'info',    message: 'PWA service worker registered', time: new Date(Date.now() - 900000) },
  { id: 'l5', type: 'warning', message: 'High traffic on /services page (240 visits/hr)', time: new Date(Date.now() - 300000) },
]
