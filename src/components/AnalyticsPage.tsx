import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Trophy, Target, Clock, BookOpen, TrendingUp, Award, Brain, CheckCircle } from 'lucide-react';

interface TestResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  correctAnswers: number[];
  wrongAnswers: number[];
  date: Date;
}

interface StudySession {
  date: Date;
  timeSpent: number;
  topicsStudied: string[];
  notesViewed: number;
}

const AnalyticsPage: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    // Load test results from localStorage
    const savedResults = localStorage.getItem('testResults');
    if (savedResults) {
      const results = JSON.parse(savedResults).map((result: any) => ({
        ...result,
        date: new Date(result.date)
      }));
      setTestResults(results);
    }

    // Load study sessions (simulated data for demo)
    const savedSessions = localStorage.getItem('studySessions');
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        date: new Date(session.date)
      }));
      setStudySessions(sessions);
    } else {
      // Generate some sample study sessions for demo
      generateSampleStudySessions();
    }
  }, []);

  const generateSampleStudySessions = () => {
    const sessions: StudySession[] = [];
    const topics = ['Multithreading', 'Exception Handling', 'File I/O', 'Collections', 'GUI Programming', 'JDBC'];
    
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      if (Math.random() > 0.3) { // 70% chance of studying each day
        sessions.push({
          date,
          timeSpent: Math.floor(Math.random() * 120) + 30, // 30-150 minutes
          topicsStudied: topics.slice(0, Math.floor(Math.random() * 3) + 1),
          notesViewed: Math.floor(Math.random() * 10) + 1
        });
      }
    }
    
    setStudySessions(sessions);
    localStorage.setItem('studySessions', JSON.stringify(sessions));
  };

  const getFilteredData = () => {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (selectedPeriod) {
      case 'week':
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case 'all':
        cutoffDate.setFullYear(2000); // Far in the past
        break;
    }

    return {
      tests: testResults.filter(result => result.date >= cutoffDate),
      sessions: studySessions.filter(session => session.date >= cutoffDate)
    };
  };

  const { tests, sessions } = getFilteredData();

  // Calculate statistics
  const totalTests = tests.length;
  const averageScore = totalTests > 0 ? Math.round(tests.reduce((sum, test) => sum + test.score, 0) / totalTests) : 0;
  const totalStudyTime = sessions.reduce((sum, session) => sum + session.timeSpent, 0);
  const totalNotesViewed = sessions.reduce((sum, session) => sum + session.notesViewed, 0);

  // Prepare chart data
  const scoreProgressData = tests.map((test, index) => ({
    test: `Test ${index + 1}`,
    score: test.score,
    date: test.date.toLocaleDateString()
  })).reverse();

  const studyTimeData = sessions.map(session => ({
    date: session.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    minutes: session.timeSpent,
    notes: session.notesViewed
  })).reverse();

  const performanceByUnit = [
    { unit: 'Unit I', score: 85, tests: 3 },
    { unit: 'Unit II', score: 78, tests: 4 },
    { unit: 'Unit III', score: 92, tests: 2 },
    { unit: 'Unit IV', score: 88, tests: 3 }
  ];

  const difficultyBreakdown = [
    { name: 'Easy', value: 65, color: '#10B981' },
    { name: 'Medium', value: 25, color: '#F59E0B' },
    { name: 'Hard', value: 10, color: '#EF4444' }
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'bg-green-500' };
    if (score >= 80) return { level: 'Good', color: 'bg-blue-500' };
    if (score >= 70) return { level: 'Average', color: 'bg-yellow-500' };
    return { level: 'Needs Improvement', color: 'bg-red-500' };
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Learning Analytics
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Track your progress and identify areas for improvement
        </p>

        {/* Period Selector */}
        <div className="flex space-x-2">
          {(['week', 'month', 'all'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {period === 'week' ? 'Last 7 Days' : period === 'month' ? 'Last 30 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</p>
              <p className="text-gray-600 dark:text-gray-400">Average Score</p>
            </div>
          </div>
          <div className="mt-4">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getPerformanceLevel(averageScore).color}`}>
              {getPerformanceLevel(averageScore).level}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTests}</p>
              <p className="text-gray-600 dark:text-gray-400">Tests Completed</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {totalTests > 0 ? `${Math.round((tests.filter(t => t.score >= 80).length / totalTests) * 100)}% above 80%` : 'No tests yet'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatTime(totalStudyTime)}</p>
              <p className="text-gray-600 dark:text-gray-400">Study Time</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {sessions.length > 0 ? `Avg ${formatTime(Math.round(totalStudyTime / sessions.length))} per session` : 'No sessions yet'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalNotesViewed}</p>
              <p className="text-gray-600 dark:text-gray-400">Notes Viewed</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Across {sessions.length} study sessions
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Score Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Score Progress
          </h3>
          {scoreProgressData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreProgressData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="test" className="text-xs" />
                <YAxis domain={[0, 100]} className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#1D4ED8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No test data available</p>
                <p className="text-sm">Take some tests to see your progress</p>
              </div>
            </div>
          )}
        </div>

        {/* Study Time Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Daily Study Time
          </h3>
          {studyTimeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={studyTimeData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value, name) => [
                    name === 'minutes' ? `${value} minutes` : value,
                    name === 'minutes' ? 'Study Time' : 'Notes Viewed'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="minutes" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No study data available</p>
                <p className="text-sm">Start studying to track your time</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Performance by Unit */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Performance by Unit
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceByUnit} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis type="number" domain={[0, 100]} className="text-xs" />
              <YAxis dataKey="unit" type="category" className="text-xs" width={60} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value, name) => [`${value}%`, 'Average Score']}
              />
              <Bar dataKey="score" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Difficulty Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Question Difficulty
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={difficultyBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {difficultyBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white'
                }}
                formatter={(value) => [`${value}%`, 'Correct']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {difficultyBreakdown.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {averageScore >= 90 && (
              <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">Excellence Award</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">90%+ average score</p>
                </div>
              </div>
            )}
            
            {totalTests >= 5 && (
              <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">Test Taker</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed 5+ tests</p>
                </div>
              </div>
            )}
            
            {totalStudyTime >= 300 && (
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">Dedicated Learner</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">5+ hours of study time</p>
                </div>
              </div>
            )}
            
            {totalNotesViewed >= 20 && (
              <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900 dark:text-white">Knowledge Seeker</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Viewed 20+ notes</p>
                </div>
              </div>
            )}
            
            {totalTests === 0 && totalStudyTime === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Start learning to unlock achievements!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Study Recommendations */}
      {(averageScore < 80 || totalTests < 3) && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            📚 Study Recommendations
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {averageScore < 80 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Improve Your Scores</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Your average score is {averageScore}%. Focus on reviewing notes before taking tests.
                </p>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                  Review Notes →
                </button>
              </div>
            )}
            
            {totalTests < 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Take More Practice Tests</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  You've only taken {totalTests} test{totalTests !== 1 ? 's' : ''}. Regular practice improves performance.
                </p>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                  Start Practice Test →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;