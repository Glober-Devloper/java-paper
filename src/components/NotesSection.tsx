import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Code, FileText, Bookmark, BookmarkCheck, Search, Filter } from 'lucide-react';
import { notesData } from '../data/notesData';

interface NotesSectionProps {
  searchQuery: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ searchQuery }) => {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [filterType, setFilterType] = useState<'all' | 'bookmarked'>('all');

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      setBookmarks(new Set(JSON.parse(savedBookmarks)));
    }
  }, []);

  const toggleBookmark = (topicId: string) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(topicId)) {
      newBookmarks.delete(topicId);
    } else {
      newBookmarks.add(topicId);
    }
    setBookmarks(newBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify([...newBookmarks]));
  };

  const filteredNotes = notesData.filter(unit => {
    return unit.topics.some(topic => {
      const matchesSearch = searchQuery === '' || 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.examples.some(ex => ex.code.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = filterType === 'all' || bookmarks.has(topic.id);
      
      return matchesSearch && matchesFilter;
    });
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Java Programming Language-II Notes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Comprehensive study material covering all four units with detailed explanations and practical examples
        </p>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'bookmarked')}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="all">All Topics</option>
              <option value="bookmarked">Bookmarked Only</option>
            </select>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {bookmarks.size} bookmarked topics
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Course Units
            </h3>
            <div className="space-y-2">
              {filteredNotes.map((unit) => (
                <div key={unit.id}>
                  <button
                    onClick={() => setActiveUnit(activeUnit === unit.id ? null : unit.id)}
                    className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{unit.title}</span>
                    {activeUnit === unit.id ? 
                      <ChevronDown className="w-4 h-4 text-gray-500" /> : 
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    }
                  </button>
                  {activeUnit === unit.id && (
                    <div className="ml-4 mt-2 space-y-1">
                      {unit.topics.map((topic) => (
                        <button
                          key={topic.id}
                          onClick={() => setActiveTopic(topic.id)}
                          className={`w-full text-left p-2 text-xs rounded-md transition-colors ${
                            activeTopic === topic.id
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {topic.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {activeTopic ? (
            // Show specific topic content
            (() => {
              const topic = filteredNotes
                .flatMap(unit => unit.topics)
                .find(t => t.id === activeTopic);
              
              if (!topic) return <div>Topic not found</div>;
              
              return (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  {/* Topic Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                          {topic.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">{topic.description}</p>
                      </div>
                      <button
                        onClick={() => toggleBookmark(topic.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {bookmarks.has(topic.id) ? 
                          <BookmarkCheck className="w-5 h-5 text-blue-600" /> :
                          <Bookmark className="w-5 h-5 text-gray-400" />
                        }
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    <div 
                      className="prose prose-lg max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: topic.content }}
                    />

                    {/* Examples */}
                    {topic.examples.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                          <Code className="w-5 h-5 mr-2" />
                          Code Examples
                        </h3>
                        <div className="space-y-4">
                          {topic.examples.map((example, index) => (
                            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                <h4 className="font-medium text-gray-900 dark:text-white">{example.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{example.explanation}</p>
                              </div>
                              <pre className="p-4 bg-gray-900 text-green-400 overflow-x-auto text-sm">
                                <code>{example.code}</code>
                              </pre>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Points */}
                    {topic.keyPoints.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                          Key Points to Remember
                        </h3>
                        <ul className="space-y-2">
                          {topic.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700 dark:text-gray-300">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
            // Show all units overview
            <div className="space-y-8">
              {filteredNotes.map((unit) => (
                <div key={unit.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{unit.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{unit.description}</p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>Duration: {unit.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{unit.topics.length} Topics</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {unit.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setActiveTopic(topic.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-white">{topic.title}</h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(topic.id);
                              }}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              {bookmarks.has(topic.id) ? 
                                <BookmarkCheck className="w-4 h-4 text-blue-600" /> :
                                <Bookmark className="w-4 h-4 text-gray-400" />
                              }
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {topic.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              {topic.examples.length} examples
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesSection;