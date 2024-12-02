// export const culturalgroups = [
//   { label: 'Dance'},
//   { label: 'Literary Arts'},
//   { label: 'Music'},
//   { label: 'Performing Arts'},
//   { label: 'Theatre'},
//   { label: 'Visual Arts'},
// ]; 

// export const campuses = [
//   { label: 'Pablo Borbon - Main I'},
//   { label: 'Alangilan - Main II'},
//   { label: 'Balayan'},
//   { label: 'Lemery'},
//   { label: 'Lipa'},
//   { label: 'Lobo'},
//   { label: 'Malvar'},
//   { label: 'Nasugbu'},
//   { label: 'Rosario'},
//   { label: 'San Juan'},
// ];

// export const departments = [
//   { label: 'COE'},
//   { label: 'CAFAD'},
//   { label: 'CICS'},
//   { label: 'CIT'},
// ]; 

// export const programs = {
//   CICS: [
//     { label: 'BS Computer Science' },
//     { label: 'BS Information Technology' },
//   ],
//   CAFAD: [
//     { label: 'BS Architecture' },
//     { label: 'Fine Arts and Design' },
//     { label: 'Interior Design' },
//   ],
//   COE: [
//     { label: 'BS Industrial Engineering' },
//     { label: 'BS Automotive Engineering' },
//     { label: 'BS Naval Architecture and Marine Engineering' },
//     { label: 'BS Mechanical Engineering' },
//     { label: 'BS Petroleum Engineering' },
//     { label: 'BS Aerospace Engineering' },
//     { label: 'BS Biomedical Engineering' },
//     { label: 'BS Electronics Engineering' },
//     { label: 'BS Instrumentation and Control Engineering' },
//     { label: 'BS Mechatronics Engineering' },
//     { label: 'BS Computer Engineering' },
//     { label: 'BS Electrical Engineering' },
//     { label: 'BS Civil Engineering' },
//     { label: 'BS Geodetic Engineering' },
//     { label: 'BS Geological Engineering' },
//     { label: 'BS Sanitary Engineering' },
//     { label: 'BS Transportation Engineering' },
//     { label: 'BS Ceramics Engineering' },
//     { label: 'BS Chemical Engineering' },
//     { label: 'BS Food Engineering' },
//     { label: 'BS Metallurgical Engineering' },
//   ],
//   CIT: [
//     { label: 'Bachelor of Industrial Technology - Automotive Technology' },
//     { label: 'Bachelor of Industrial Technology - Computer Technology' },
//     { label: 'Bachelor of Industrial Technology - Civil Technology' },
//     { label: 'Bachelor of Industrial Technology - Drafting Technology' },
//     { label: 'Bachelor of Industrial Technology - Electrical Technology' },
//     { label: 'Bachelor of Industrial Technology - Electronics Technology' },
//     { label: 'Bachelor of Industrial Technology - Food Technology' },
//     { label: 'Bachelor of Industrial Technology - Instrumentation and Control Technology' },
//     { label: 'Bachelor of Industrial Technology - Mechanical Technology' },
//     { label: 'Bachelor of Industrial Technology - Mechatronics Technology' },
//     { label: 'Bachelor of Industrial Technology - Welding and Fabrication Technology' },
//   ],
// };

import axios from 'axios';

export const culturalgroups = [];
export const campuses = [];
export const departments = [];
export const programs = {};

export const fetchRegistrationValues = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/performers/registration-values');
    const data = response.data;

    // Update the exported constants
    culturalgroups.push(...data.culturalgroups);
    campuses.push(...data.campuses);
    departments.push(...data.departments);
    Object.assign(programs, data.programs);
  } catch (error) {
    console.error('Error fetching registration values:', error);
  }
};