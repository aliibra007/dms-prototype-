import React from 'react';
import { Download } from 'lucide-react';

export default function DownloadButton({
  prescription,
  theme,
  isDark,
  onClick
}) {
  const handleDownload = () => {
    // Create a simple HTML representation of the prescription
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Prescription - ${prescription.patientName}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #7C3AED;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #7C3AED;
      margin: 0;
    }
    .info-section {
      margin-bottom: 30px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #E5E7EB;
    }
    .medicines-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .medicines-table th,
    .medicines-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #E5E7EB;
    }
    .medicines-table th {
      background-color: #F3F4F6;
      font-weight: bold;
    }
    .notes {
      margin-top: 30px;
      padding: 15px;
      background-color: #F9FAFB;
      border-left: 4px solid #7C3AED;
    }
    .footer {
      margin-top: 40px;
      text-align: right;
      border-top: 2px solid #E5E7EB;
      padding-top: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>MEDICAL PRESCRIPTION</h1>
    <p style="color: #6B7280;">MediCare Clinic</p>
  </div>

  <div class="info-section">
    <div class="info-row">
      <strong>Patient Name:</strong>
      <span>${prescription.patientName}</span>
    </div>
    <div class="info-row">
      <strong>Date:</strong>
      <span>${new Date(prescription.date).toLocaleDateString()}</span>
    </div>
    <div class="info-row">
      <strong>Diagnosis:</strong>
      <span>${prescription.diagnosis}</span>
    </div>
    <div class="info-row">
      <strong>Prescribed By:</strong>
      <span>${prescription.doctor}</span>
    </div>
  </div>

  <h2 style="color: #7C3AED; margin-top: 30px;">Medications</h2>
  <table class="medicines-table">
    <thead>
      <tr>
        <th>Medicine</th>
        <th>Dosage</th>
        <th>Frequency</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      ${prescription.medicines.map(med => `
        <tr>
          <td><strong>${med.name}</strong></td>
          <td>${med.dosage}</td>
          <td>${med.frequency}</td>
          <td>${med.duration}</td>
        </tr>
        ${med.instructions ? `<tr><td colspan="4" style="padding-left: 30px; color: #6B7280;"><em>Instructions: ${med.instructions}</em></td></tr>` : ''}
      `).join('')}
    </tbody>
  </table>

  ${prescription.notes ? `
    <div class="notes">
      <strong>Additional Notes:</strong>
      <p>${prescription.notes}</p>
    </div>
  ` : ''}

  <div class="footer">
    <p><strong>${prescription.doctor}</strong></p>
    <p style="color: #6B7280;">MediCare Clinic</p>
  </div>
</body>
</html>
    `;

    // Create a blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Prescription_${prescription.patientName}_${prescription.date}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
        color: '#FFFFFF'
      }}
    >
      <Download size={18} />
      Download PDF
    </button>
  );
}


