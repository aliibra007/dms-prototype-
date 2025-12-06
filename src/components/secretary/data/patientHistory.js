// Mock patient history data

export const MOCK_PATIENT_HISTORY = {
  1: { // Emily Carter
    appointments: [
      { id: 1, date: '2025-12-05', doctor: 'Dr. Sarah Johnson', type: 'Consultation', diagnosis: 'Routine checkup - healthy', notes: 'Scheduled follow-up in 6 months' },
      { id: 2, date: '2025-10-15', doctor: 'Dr. James Wilson', type: 'Follow-up', diagnosis: 'Minor dental work completed', notes: 'Patient recovering well' },
      { id: 3, date: '2025-06-20', doctor: 'Dr. Sarah Johnson', type: 'Check-up', diagnosis: 'Annual dental exam', notes: 'No issues found' },
    ],
    prescriptions: [
      { id: 1, date: '2025-10-15', medication: 'Amoxicillin 500mg', dosage: '1 capsule 3 times daily', duration: '7 days', doctor: 'Dr. James Wilson' },
      { id: 2, date: '2025-06-20', medication: 'Ibuprofen 400mg', dosage: 'As needed for pain', duration: 'PRN', doctor: 'Dr. Sarah Johnson' },
    ],
  },
  2: { // Michael Brown
    appointments: [
      { id: 1, date: '2025-12-04', doctor: 'Dr. Sarah Johnson', type: 'Consultation', diagnosis: 'Diabetes management review', notes: 'Insulin dosage adjusted' },
      { id: 2, date: '2025-09-10', doctor: 'Dr. Emily Chen', type: 'Check-up', diagnosis: 'Routine diabetes checkup', notes: 'Blood sugar levels stable' },
    ],
    prescriptions: [
      { id: 1, date: '2025-12-04', medication: 'Insulin Glargine', dosage: '20 units at bedtime', duration: 'Ongoing', doctor: 'Dr. Sarah Johnson' },
      { id: 2, date: '2025-12-04', medication: 'Metformin 1000mg', dosage: '1 tablet twice daily', duration: '90 days', doctor: 'Dr. Sarah Johnson' },
    ],
  },
  3: { // Sophia Lee
    appointments: [
      { id: 1, date: '2025-12-03', doctor: 'Dr. James Wilson', type: 'Check-up', diagnosis: 'Orthodontic adjustment', notes: 'Braces tightened' },
      { id: 2, date: '2025-08-15', doctor: 'Dr. James Wilson', type: 'Consultation', diagnosis: 'Braces installation', notes: 'Treatment plan initiated' },
    ],
    prescriptions: [],
  },
  4: { // James Rodriguez
    appointments: [
      { id: 1, date: '2025-12-01', doctor: 'Dr. Michael Brown', type: 'Follow-up', diagnosis: 'Post-surgery recovery', notes: 'Healing well, continue medication' },
      { id: 2, date: '2025-11-01', doctor: 'Dr. Michael Brown', type: 'Surgery', diagnosis: 'Wisdom tooth extraction', notes: 'Successful procedure' },
    ],
    prescriptions: [
      { id: 1, date: '2025-11-01', medication: 'Paracetamol 500mg', dosage: '1-2 tablets every 4-6 hours', duration: '5 days', doctor: 'Dr. Michael Brown' },
      { id: 2, date: '2025-11-01', medication: 'Chlorhexidine Mouthwash', dosage: 'Rinse twice daily', duration: '7 days', doctor: 'Dr. Michael Brown' },
    ],
  },
  5: { // Olivia Martinez
    appointments: [
      { id: 1, date: '2025-11-28', doctor: 'Dr. Sarah Johnson', type: 'Consultation', diagnosis: 'Initial consultation', notes: 'New patient, baseline assessment' },
    ],
    prescriptions: [],
  },
  6: { // David Kim
    appointments: [
      { id: 1, date: '2025-11-25', doctor: 'Dr. Sarah Johnson', type: 'Check-up', diagnosis: 'Blood pressure monitoring', notes: 'Medication working well' },
      { id: 2, date: '2025-08-20', doctor: 'Dr. Emily Chen', type: 'Consultation', diagnosis: 'Hypertension management', notes: 'Lifestyle changes recommended' },
    ],
    prescriptions: [
      { id: 1, date: '2025-11-25', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', duration: '90 days', doctor: 'Dr. Sarah Johnson' },
    ],
  },
  7: { // Lisa Wang
    appointments: [
      { id: 1, date: '2025-11-20', doctor: 'Dr. Emily Chen', type: 'Check-up', diagnosis: 'Prenatal checkup', notes: 'Mother and baby healthy' },
      { id: 2, date: '2025-10-20', doctor: 'Dr. Emily Chen', type: 'Check-up', diagnosis: 'Prenatal checkup', notes: 'Ultrasound performed' },
    ],
    prescriptions: [
      { id: 1, date: '2025-11-20', medication: 'Prenatal Vitamins', dosage: '1 tablet daily', duration: 'Ongoing', doctor: 'Dr. Emily Chen' },
      { id: 2, date: '2025-11-20', medication: 'Folic Acid 400mcg', dosage: '1 tablet daily', duration: 'Ongoing', doctor: 'Dr. Emily Chen' },
    ],
  },
  8: { // Robert Garcia
    appointments: [
      { id: 1, date: '2025-11-15', doctor: 'Dr. Sarah Johnson', type: 'Check-up', diagnosis: 'Cardiac monitoring', notes: 'Stable condition' },
      { id: 2, date: '2025-09-15', doctor: 'Dr. Sarah Johnson', type: 'Follow-up', diagnosis: 'Heart medication review', notes: 'Continue current regimen' },
      { id: 3, date: '2025-07-10', doctor: 'Dr. Sarah Johnson', type: 'Consultation', diagnosis: 'Chest pain investigation', notes: 'ECG performed, minor irregularity' },
    ],
    prescriptions: [
      { id: 1, date: '2025-11-15', medication: 'Aspirin 81mg', dosage: '1 tablet daily', duration: 'Ongoing', doctor: 'Dr. Sarah Johnson' },
      { id: 2, date: '2025-11-15', medication: 'Atorvastatin 20mg', dosage: '1 tablet at bedtime', duration: '90 days', doctor: 'Dr. Sarah Johnson' },
      { id: 3, date: '2025-11-15', medication: 'Metoprolol 50mg', dosage: '1 tablet twice daily', duration: '90 days', doctor: 'Dr. Sarah Johnson' },
    ],
  },
};

export const MOCK_PATIENT_DOCUMENTS = {
  1: [
    { id: 1, name: 'X-Ray Results - Dec 2025.pdf', type: 'PDF', uploadDate: '2025-12-05', size: '2.4 MB' },
    { id: 2, name: 'Lab Report - Blood Work.pdf', type: 'PDF', uploadDate: '2025-10-15', size: '1.1 MB' },
    { id: 3, name: 'Insurance Card.jpg', type: 'Image', uploadDate: '2023-01-15', size: '450 KB' },
  ],
  2: [
    { id: 1, name: 'Diabetes Management Plan.pdf', type: 'PDF', uploadDate: '2025-12-04', size: '890 KB' },
    { id: 2, name: 'Blood Sugar Log - Nov 2025.xlsx', type: 'Spreadsheet', uploadDate: '2025-11-30', size: '125 KB' },
  ],
  3: [
    { id: 1, name: 'Orthodontic Treatment Plan.pdf', type: 'PDF', uploadDate: '2025-08-15', size: '3.2 MB' },
    { id: 2, name: 'Before Treatment Photos.zip', type: 'Archive', uploadDate: '2025-08-15', size: '8.5 MB' },
  ],
  4: [
    { id: 1, name: 'Surgery Consent Form.pdf', type: 'PDF', uploadDate: '2025-11-01', size: '540 KB' },
    { id: 2, name: 'Post-Op Instructions.pdf', type: 'PDF', uploadDate: '2025-11-01', size: '320 KB' },
  ],
  5: [
    { id: 1, name: 'New Patient Form.pdf', type: 'PDF', uploadDate: '2025-11-28', size: '280 KB' },
  ],
  6: [
    { id: 1, name: 'Blood Pressure Log.pdf', type: 'PDF', uploadDate: '2025-11-25', size: '450 KB' },
    { id: 2, name: 'ECG Results.pdf', type: 'PDF', uploadDate: '2025-08-20', size: '1.8 MB' },
  ],
  7: [
    { id: 1, name: 'Ultrasound Results.pdf', type: 'PDF', uploadDate: '2025-10-20', size: '4.2 MB' },
    { id: 2, name: 'Prenatal Care Plan.pdf', type: 'PDF', uploadDate: '2025-08-01', size: '650 KB' },
  ],
  8: [
    { id: 1, name: 'ECG Report - Nov 2025.pdf', type: 'PDF', uploadDate: '2025-11-15', size: '1.2 MB' },
    { id: 2, name: 'Cardiac History Summary.pdf', type: 'PDF', uploadDate: '2025-07-10', size: '890 KB' },
    { id: 3, name: 'Medication List.pdf', type: 'PDF', uploadDate: '2025-07-10', size: '150 KB' },
  ],
};
