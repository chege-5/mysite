export const achievements = [
  {
    id: 'epra', event: 'EPRA Hackathon', title: 'FairGrid: data behind the price of power.',
    distinctions: ['3rd place', 'Best Use of Data'],
    description: 'Built FairGrid, a Python-based system for predicting electricity prices across different areas. The approach brings together multiple data sources and contextual factors, going beyond electricity consumption alone.',
    takeaway: 'A practical use of data to understand a complex energy problem.', projectId: 'fairgrid',
  },
  {
    id: 'zetech-datathon', event: 'GeoML Datathon · Zetech University', title: 'Finding meaning in geographical data.', date: '11 July 2026',
    distinctions: ['Datathon participant', 'Certificate of participation'],
    description: 'Built and shipped a project during the 12-hour GeoML Datathon at Zetech Technology Park on 11 July 2026. The geography-focused challenge brought geographical information systems and location-based data into a practical problem-solving sprint.',
    takeaway: 'Connecting data analysis with the places and communities behind the numbers.',
  },
]

export const training = [
  { id: 'cisco', course: 'CCNA studies', provider: 'Cisco', description: 'Networking foundations, network infrastructure, and practical network administration.', type: 'Networking coursework' },
  { id: 'huawei', course: 'HCIA studies', provider: 'Huawei', description: 'ICT foundations and technical training through the Huawei learning ecosystem.', type: 'ICT coursework' },
  { id: 'ics', course: 'Ethical Hacking & Cybersecurity', provider: 'ICS College', description: 'Security fundamentals, ethical hacking principles, and a practical foundation for cybersecurity work.', type: 'Security training' },
]

// Owner-requested self-assessment range; these are not examination scores.
export const proficiencyGroups = [
  { title: 'Languages', items: [
    { name: 'C#', percent: 94, color: '#b3a1cf' }, { name: 'Python', percent: 92, color: '#d8c28a' }, { name: 'JavaScript', percent: 90, color: '#cbb575' },
    { name: 'SQL', percent: 86, color: '#87afb9' }, { name: 'HTML & CSS', percent: 90, color: '#c69e8d' },
  ] },
  { title: 'Frameworks & runtimes', items: [
    { name: 'ASP.NET Core / .NET', percent: 94, color: '#b3a1cf' }, { name: 'FastAPI', percent: 92, color: '#8cb9af' }, { name: 'Node.js', percent: 90, color: '#a4b88e' },
    { name: 'React', percent: 90, color: '#87afb9' }, { name: 'Express.js', percent: 88, color: '#c5b7a7' },
  ] },
]
