import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, ChevronRight, Clock } from 'lucide-react';

interface Test {
  id: number;
  name: string;
  description: string;
  slug:string;
  duration: number;
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

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="space-y-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">Interview Challenges</h1>
      <p className="text-xl text-gray-600 text-center mb-8">Boost your skills with our timed tests</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tests.map((test) => (
          <Link
            key={test.id}
            to={`/test/${test.slug}`}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow card-hover"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <FileText className="text-primary-600" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{test.name}</h2>
            </div>
            <p className="text-gray-600 mb-4">{test.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-primary-600 font-medium">
                Start Test
                <ChevronRight size={20} className="ml-1" />
              </div>
              <div className="flex items-center text-gray-500">
                  <Clock size={18} className="mr-2" />
                  {formatDuration(test.duration)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;