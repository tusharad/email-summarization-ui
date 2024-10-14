import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import ReactPaginate from 'react-paginate';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  // Static data for tables and chart
  const faqData = [
    { question: 'What is your return policy?', frequency: 120 },
    { question: 'How do I track my order?', frequency: 90 },
    { question: 'Can I purchase items in bulk?', frequency: 45 },
  ];

  const sopData = [
    { category: 'Shipping', gaps: 'Delayed delivery times' },
    { category: 'Payments', gaps: 'Limited payment options' },
    { category: 'Customer Support', gaps: 'Inconsistent response time' },
  ];

  const pieData = {
    labels: ['Not covered by SOP', 'Partially covered by SOP', 'Ambiguous SOP Guidance', 'Not covered by SOP', 'Inaccurate SOP information'],
    datasets: [{
      label: 'SOP Coverage vs Customer Queries',
      data: [10, 10, 15, 25, 40],
      backgroundColor: [
        '#4CAF50', // Green
        '#FF9800', // Amber
        '#2196F3', // Blue
        '#F44336', // Red
        '#9C27B0', // Purple
      ],
      hoverOffset: 2
    }]
  };

  const [faqPageNumber, setFaqPageNumber] = useState(0);
  const [sopPageNumber, setSopPageNumber] = useState(0);
  const itemsPerPage = 2;

  const displayFaqs = faqData.slice(faqPageNumber * itemsPerPage, (faqPageNumber + 1) * itemsPerPage);
  const displaySops = sopData.slice(sopPageNumber * itemsPerPage, (sopPageNumber + 1) * itemsPerPage);

  const handleFaqPageClick = ({ selected }: { selected: number }) => {
    setFaqPageNumber(selected);
  };

  const handleSopPageClick = ({ selected }: { selected: number }) => {
    setSopPageNumber(selected);
  };

  return (
    <div className="p-4 bg-white text-gray-900">
      <header className="flex justify-between items-center mb-6 p-6 border-b bg-red-600 text-white rounded-t-lg">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <Link to="/" className="bg-white text-red-500 px-4 py-2 rounded-lg shadow hover:bg-gray-300">
          Home
        </Link>
      </header>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-auto">
          <h2 className="text-lg mx-auto font-bold mb-2">Frequently Asked Questions</h2>
          <table className="w-full mb-4 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-900 p-2">Question</th>
                <th className="border border-gray-900 p-2">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {displayFaqs.map((faq, index) => (
                <tr key={index}>
                  <td className="border border-gray-900 p-2">{faq.question}</td>
                  <td className="border border-gray-900 p-2 text-center">{faq.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={Math.ceil(faqData.length / itemsPerPage)}
            onPageChange={handleFaqPageClick}
            previousLabel={'Previous'}
            nextLabel={'Next'}
            containerClassName={'flex justify-center mb-4 space-x-2'}
            pageClassName={'px-3 py-1 border rounded-lg cursor-pointer hover:bg-red-100'}
            activeClassName={'bg-red-500 text-white'}
            breakClassName={'px-3 py-1'}
            previousClassName={'px-3 py-1 border rounded-lg cursor-pointer hover:bg-red-100'}
            nextClassName={'px-3 py-1 border rounded-lg cursor-pointer hover:bg-red-100'}
          />

          <h2 className="text-lg font-bold mb-2">SOP Gaps and Areas of Development</h2>
          <table className="w-full mb-4 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-900 p-2">Category</th>
                <th className="border border-gray-900 p-2">Gaps</th>
              </tr>
            </thead>
            <tbody>
              {displaySops.map((sop, index) => (
                <tr key={index}>
                  <td className="border border-gray-900 p-2">{sop.category}</td>
                  <td className="border border-gray-900 p-2">{sop.gaps}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={Math.ceil(sopData.length / itemsPerPage)}
            onPageChange={handleSopPageClick}
            previousLabel={'Previous'}
            nextLabel={'Next'}
            containerClassName={'flex justify-center mb-4 space-x-2'}
            pageClassName={'px-3 py-1 border rounded-lg cursor-pointer hover:bg-red-100'}
            activeClassName={'bg-red-500 text-white'}
            breakClassName={'px-3 py-1'}
            previousClassName={'px-3 py-1 border rounded-lg cursor-pointer hover:bg-red-100'}
            nextClassName={'px-3 py-1 border rounded-lg cursor-pointer hover:bg-red-100'}
          />
        </div>
        <div className="flex-auto w-10">
          <h2 className="text-2xl font-bold mb-2">SOP Coverage vs Customer Queries</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;