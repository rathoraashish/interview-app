import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FileText } from 'lucide-react';

interface Test {
  id: string;
  title: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get<Test[]>('/api/tests');
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Interview Tests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Link
            key={test.id}
            to={`/test/${test.id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">{test.title}</h2>
            </div>
            <p className="text-gray-600">{test.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;