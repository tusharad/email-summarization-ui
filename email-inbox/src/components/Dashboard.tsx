import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import ReactPaginate from 'react-paginate';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [faqData, setFaqData] = useState<{ faq: string; freq: number }[]>([]);
  const [faqPageNumber, setFaqPageNumber] = useState(0);
  const [sopPageNumber, setSopPageNumber] = useState(0);
  const [gapsData, setGapsData] = useState<{ category: string; gap_type: string; id: number }[]>([]);
  const [countData, setCountData] = useState<{ [key: string]: number }>({});
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch FAQs with frequency
    const fetchFaqData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_faqs_with_freq');
        const data = await response.json();
        setFaqData(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    // Fetch SOP gaps
    const fetchGapData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_category_gap/1');
        const data = await response.json();
        setGapsData(data.gaps);
        setCountData(data.count);
      } catch (error) {
        console.error('Error fetching SOP gaps:', error);
      }
    };

    fetchFaqData();
    fetchGapData();
  }, []);

  const pieData = {
    labels: Object.keys(countData),
    datasets: [{
      label: 'SOP Coverage vs Customer Queries',
      data: Object.values(countData),
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

  const displayFaqs = faqData.slice(faqPageNumber * itemsPerPage, (faqPageNumber + 1) * itemsPerPage);
  const displaySops = gapsData.slice(sopPageNumber * itemsPerPage, (sopPageNumber + 1) * itemsPerPage);

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
          <h2 className="text-lg font-bold mb-2">Frequently Asked Questions</h2>
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
                  <td className="border border-gray-900 p-2">{faq.faq}</td>
                  <td className="border border-gray-900 p-2 text-center">{faq.freq}</td>
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
                <th className="border border-gray-900 p-2">Gap Type</th>
              </tr>
            </thead>
            <tbody>
              {displaySops.map((sop, index) => (
                <tr key={sop.id}>
                  <td className="border border-gray-900 p-2">{sop.category}</td>
                  <td className="border border-gray-900 p-2">{sop.gap_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={Math.ceil(gapsData.length / itemsPerPage)}
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