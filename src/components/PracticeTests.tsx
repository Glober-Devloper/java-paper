import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, RotateCcw, Trophy, Target, Brain, BookOpen } from 'lucide-react';
import { questionsData } from '../data/questionsData';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  unit: string;
  topic: string;
}

interface TestResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  correctAnswers: number[];
  wrongAnswers: number[];
  date: Date;
}

const PracticeTests: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [testMode, setTestMode] = useState<'practice' | 'test' | 'review'>('practice');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isTestActive, setIsTestActive] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const savedResults = localStorage.getItem('testResults');
    if (savedResults) {
      setTestResults(JSON.parse(savedResults));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTestActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            handleSubmitTest();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive, timeLeft, showResults]);

  useEffect(() => {
    filterQuestions();
  }, [selectedUnit, selectedDifficulty]);

  const filterQuestions = () => {
    let filtered = questionsData;

    if (selectedUnit !== 'all') {
      filtered = filtered.filter(q => q.unit === selectedUnit);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // Shuffle questions for variety
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setFilteredQuestions(shuffled.slice(0, 20)); // Limit to 20 questions per test
  };

  const startTest = (mode: 'practice' | 'test') => {
    setTestMode(mode);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setIsTestActive(true);
    setTimeLeft(mode === 'test' ? 1800 : 3600); // 30 min for test, 60 min for practice
    filterQuestions();
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    setIsTestActive(false);
    setShowResults(true);
    
    const correctAnswers: number[] = [];
    const wrongAnswers: number[] = [];
    
    filteredQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers.push(index);
      } else {
        wrongAnswers.push(index);
      }
    });

    const result: TestResult = {
      score: Math.round((correctAnswers.length / filteredQuestions.length) * 100),
      totalQuestions: filteredQuestions.length,
      timeSpent: (testMode === 'test' ? 1800 : 3600) - timeLeft,
      correctAnswers,
      wrongAnswers,
      date: new Date()
    };

    const updatedResults = [result, ...testResults].slice(0, 10); // Keep last 10 results
    setTestResults(updatedResults);
    localStorage.setItem('testResults', JSON.stringify(updatedResults));
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setIsTestActive(false);
    setTimeLeft(1800);
    setTestMode('practice');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (!isTestActive && !showResults) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Practice Tests
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test your knowledge with our comprehensive question bank covering all units
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{questionsData.length}</p>
                <p className="text-gray-600 dark:text-gray-400">Total Questions</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4</p>
                <p className="text-gray-600 dark:text-gray-400">Units Covered</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{testResults.length}</p>
                <p className="text-gray-600 dark:text-gray-400">Tests Taken</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {testResults.length > 0 ? Math.round(testResults.reduce((acc, result) => acc + result.score, 0) / testResults.length) : 0}%
                </p>
                <p className="text-gray-600 dark:text-gray-400">Avg Score</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Test Configuration */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Configure Your Test</h2>
              
              {/* Filters */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Unit
                  </label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Units</option>
                    <option value="Unit I">Unit I: Multithreading & Exception Handling</option>
                    <option value="Unit II">Unit II: File I/O & Collections</option>
                    <option value="Unit III">Unit III: GUI Programming</option>
                    <option value="Unit IV">Unit IV: JDBC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Levels</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Test Mode Selection */}
              <div className="space-y-4">
                <div 
                  onClick={() => startTest('practice')}
                  className="p-4 border-2 border-blue-200 dark:border-blue-700 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Practice Mode</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Unlimited time, see explanations after each question
                      </p>
                    </div>
                    <div className="text-blue-600 dark:text-blue-400">
                      <Brain className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => startTest('test')}
                  className="p-4 border-2 border-green-200 dark:border-green-700 rounded-lg cursor-pointer hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Timed Test</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        30 minutes, exam-like conditions with final results
                      </p>
                    </div>
                    <div className="text-green-600 dark:text-green-400">
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Available Questions:</strong> {filteredQuestions.length} questions match your criteria
                </p>
              </div>
            </div>
          </div>

          {/* Recent Results */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Results</h2>
              
              {testResults.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No test results yet. Take your first test to see your progress!
                </p>
              ) : (
                <div className="space-y-3">
                  {testResults.slice(0, 5).map((result, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-semibold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {result.date.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {result.correctAnswers.length}/{result.totalQuestions} correct
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        Time: {formatTime(result.timeSpent)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const result = testResults[0];
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor(result.score)}`}>
              {result.score}%
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Test Completed!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You answered {result.correctAnswers.length} out of {result.totalQuestions} questions correctly
            </p>
          </div>

          {/* Results Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {result.correctAnswers.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
            </div>

            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {result.wrongAnswers.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Incorrect</div>
            </div>

            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatTime(result.timeSpent)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Time Spent</div>
            </div>
          </div>

          {/* Question Review */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Question Review</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredQuestions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer;
                const wasAnswered = selectedAnswers[index] !== undefined;
                
                return (
                  <div key={question.id} className={`p-4 rounded-lg border-l-4 ${
                    isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                    wasAnswered ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                    'border-gray-300 bg-gray-50 dark:bg-gray-700'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Q{index + 1}: {question.question}
                      </h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                    </div>
                    
                    {wasAnswered && !isCorrect && (
                      <div className="text-sm text-red-600 dark:text-red-400 mb-2">
                        <strong>Your Answer:</strong> {question.options[selectedAnswers[index]]}
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetTest}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Take Another Test
            </button>
            <button
              onClick={() => setTestMode('review')}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Review Questions
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Test/Practice Mode
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {testMode === 'practice' ? 'Practice Mode' : 'Timed Test'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {filteredQuestions.length}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Time Left</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex-1">
              {currentQuestion.question}
            </h2>
            <div className="ml-4 flex flex-col items-end space-y-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentQuestion.unit} • {currentQuestion.topic}
              </span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-900 dark:text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Show explanation in practice mode after answering */}
          {testMode === 'practice' && selectedAnswers[currentQuestionIndex] !== undefined && (
            <div className={`mt-6 p-4 rounded-lg ${
              selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
            }`}>
              <div className="flex items-center mb-2">
                {selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer ? (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                )}
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
              {selectedAnswers[currentQuestionIndex] !== currentQuestion.correctAnswer && (
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  <strong>Correct Answer:</strong> {currentQuestion.options[currentQuestion.correctAnswer]}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex space-x-4">
          {currentQuestionIndex === filteredQuestions.length - 1 ? (
            <button
              onClick={handleSubmitTest}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Question Navigator */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Question Navigator</h3>
        <div className="grid grid-cols-10 gap-2">
          {filteredQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : selectedAnswers[index] !== undefined
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeTests;