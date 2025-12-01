import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Finance from '../finance/Finance.jsx';

export default function FinancePage() {
  const { isDark } = useOutletContext();
  return <Finance isDark={isDark} />;
}
