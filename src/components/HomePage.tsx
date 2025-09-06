import React from 'react';
import { BookOpen, Target, Brain, Trophy, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Notes',
      description: 'Detailed explanations covering all 4 units with practical examples',
      color: 'bg-blue-500'
    },
    {
      icon: Brain,
      title: '200+ Practice Questions',
      description: 'MCQs with detailed solutions and explanations',
      color: 'bg-purple-500'
    },
    {
      icon: Target,
      title: 'Interactive Tests',
      description: 'Real-time feedback and performance tracking',
      color: 'bg-green-500'
    },
    {
      icon: Trophy,
      title: 'Progress Analytics',
      description: 'Track your learning journey and identify weak areas',
      color: 'bg-orange-500'
    }
  ];

  const units = [
    {
      title: 'Unit I: Multithreading & Exception Handling',
      hours: '10 Hours',
      topics: ['Thread Lifecycle', 'Synchronization', 'Exception Types', 'Try-Catch Blocks'],
      difficulty: 'Intermediate'
    },
    {
      title: 'Unit II: File I/O & Collections',
      hours: '10 Hours',
      topics: ['Stream Classes', 'ArrayList', 'LinkedList', 'HashMap'],
      difficulty: 'Intermediate'
    },
    {
      title: 'Unit III: GUI Programming',
      hours: '15 Hours',
      topics: ['Swing Components', 'Event Handling', 'Layout Managers', 'Graphics'],
      difficulty: 'Advanced'
    },
    {
      title: 'Unit IV: JDBC',
      hours: '10 Hours',
      topics: ['Database Connectivity', 'ResultSet', 'PreparedStatement', 'Transactions'],
      difficulty: 'Advanced'
    }
  ];

  const stats = [
    { label: 'Study Hours', value: '45+', icon: Clock },
    { label: 'Code Examples', value: '100+', icon: BookOpen },
    { label: 'Practice Questions', value: '200+', icon: Brain },
    { label: 'Interactive Tests', value: '15+', icon: Trophy }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Master Java Programming
            <span className="block text-yellow-300">Language-II</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Complete BCA Semester IV study material with detailed notes, 
            practical examples, and comprehensive exam preparation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('notes')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Brain className="w-5 h-5" />
              <span>Take Practice Test</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          );
        })}
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive study materials designed to help you master Java Programming Language-II
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Course Units Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Course Curriculum
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Four comprehensive units covering all aspects of advanced Java programming
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {units.map((unit, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {unit.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {unit.hours}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      unit.difficulty === 'Advanced' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {unit.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {unit.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                    {topic}
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => setActiveTab('notes')}
                className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                Start Studying Unit {index + 1}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Java Journey?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of students who have mastered Java Programming with our comprehensive guide
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setActiveTab('notes')}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Access Notes</span>
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Trophy className="w-5 h-5" />
            <span>Practice Tests</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;