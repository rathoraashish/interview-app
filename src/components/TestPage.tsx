import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

interface Test {
  id: number;
  name: string;
  questions: Question[];
  slug: string;
  duration: number;
}

const TestPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get<Test>(`/api/tests/${slug}`);
        setTest(response.data);
        setTimeLeft(response.data.duration);
      } catch (error) {
        console.error('Error fetching test:', error);
      }
    };

    fetchTest();
  }, [slug]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === null || prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/tests/${slug}/submit`, { answers });
      setScore(response.data.score);
    } catch (error) {
      console.error('Error submitting test:', error);
    }
  };

  if (!test) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">{test.name}</h1>
      {score === null && timeLeft !== null && timeLeft > 0 && (
        <div className="fixed top-4 right-4 bg-white rounded-full shadow-md p-3 flex items-center">
          <Clock size={24} className="text-primary-600 mr-2" />
          <span className="text-xl font-semibold">{formatTime(timeLeft)}</span>
        </div>
      )}
      {score === null ? (
        <>
          {test.questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                <span className="text-primary-600 mr-2">Q{index + 1}.</span>
                {question.question}
              </h2>
              <div className="space-y-3">
                {/* {question.options.map((option, optionIndex) => ( */}
                  <label key={0} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value={question.option_a}
                      onChange={() => handleAnswerChange(question.id, "A")}
                      className="form-radio text-primary-600 focus:ring-primary-500 h-5 w-5"
                    />
                    <span className="text-gray-700">{question.option_a}</span>
                  </label>
                  <label key={1} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value={question.option_b}
                      onChange={() => handleAnswerChange(question.id, "B")}
                      className="form-radio text-primary-600 focus:ring-primary-500 h-5 w-5"
                    />
                    <span className="text-gray-700">{question.option_b}</span>
                  </label>
                  <label key={2} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value={question.option_c}
                      onChange={() => handleAnswerChange(question.id, "C")}
                      className="form-radio text-primary-600 focus:ring-primary-500 h-5 w-5"
                    />
                    <span className="text-gray-700">{question.option_c}</span>
                  </label>
                  <label key={3} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value={question.option_d}
                      onChange={() => handleAnswerChange(question.id, "D")}
                      className="form-radio text-primary-600 focus:ring-primary-500 h-5 w-5"
                    />
                    <span className="text-gray-700">{question.option_d}</span>
                  </label>
                {/* ))} */}
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition-colors text-lg font-medium shadow-md hover:shadow-lg"
            >
              Submit Test
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Test Completed!</h2>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <span className="text-4xl font-bold text-primary-600">{score}</span>
            <span className="text-xl text-gray-600">out of {test.questions.length}</span>
          </div>
          {score === test.questions.length ? (
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle size={64} className="text-red-500 mx-auto mb-4" />
          )}
          <p className="text-xl text-gray-700 mb-6">
            {score === test.questions.length
              ? "Congratulations! You've aced the test!"
              : "Great effort! Keep practicing to improve your score."}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-primary-700 transition-colors text-lg font-medium shadow-md hover:shadow-lg"
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;