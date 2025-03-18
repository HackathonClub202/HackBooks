import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Users, ArrowRight, ChevronDown, Twitter } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Books array for featured books section
  const featuredBooks = [
    {
      id: 1,
      title: "React Design Patterns",
      author: "Alex Johnson",
      cover: "/api/placeholder/240/320",
      category: "Frontend"
    },
    {
      id: 2,
      title: "Advanced Node.js",
      author: "Sarah Parker",
      cover: "/api/placeholder/240/320",
      category: "Backend"
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      author: "Michael Chen",
      cover: "/api/placeholder/240/320",
      category: "AI"
    },
    {
      id: 4,
      title: "Full Stack Development",
      author: "Emma Rodriguez",
      cover: "/api/placeholder/240/320",
      category: "Web Development"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900">
        {/* Animated Particles */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full bg-white opacity-30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated Gradient Circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>
      
      {/* Content Container with Glass Effect */}
      <div className="relative z-10">
        {/* Navbar with Glassmorphism */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${
  isScrolled 
    ? 'bg-white/90 shadow-lg py-2 border-b border-indigo-100' 
    : 'bg-transparent py-4'
}`}>
  <div className="container mx-auto px-4 md:px-6">
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <BookOpen className={`h-8 w-8 transition-colors ${
          isScrolled ? 'text-indigo-600' : 'text-indigo-300 animate-pulse'
        }`} />
        <span className={`ml-2 text-xl font-bold ${
          isScrolled 
            ? 'text-indigo-800' 
            : 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300'
        }`}>
          HackBooks
        </span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <a href="#features" className={`transition-colors ${
          isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-300'
        }`}>Features</a>
        <a href="#books" className={`transition-colors ${
          isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-300'
        }`}>Books</a>
        <a href="#community" className={`transition-colors ${
          isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-300'
        }`}>Community</a>
        <Link to="/google-login" className={`px-4 py-2 rounded-md transition-colors ${
          isScrolled 
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
            : 'bg-indigo-600/80 hover:bg-indigo-700/90 text-white backdrop-blur-sm'
        }`}>
          Log In
        </Link>
        <Link to="/signup" className={`px-4 py-2 rounded-md transition-colors ${
          isScrolled 
            ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 border border-indigo-200' 
            : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm'
        }`}>
          Sign Up
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className={`focus:outline-none ${
            isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-300'
          }`}
        >
          {showMobileMenu ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </div>
    
    {/* Mobile Menu with Glassmorphism */}
    {showMobileMenu && (
      <div className={`md:hidden mt-4 rounded-lg shadow-lg p-4 animate-fadeIn ${
        isScrolled 
          ? 'bg-white' 
          : 'backdrop-blur-xl bg-black/30'
      }`}>
        <div className="flex flex-col space-y-3">
          <a href="#features" className={`py-2 ${
            isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-300'
          }`}>Features</a>
          <a href="#books" className={`py-2 ${
            isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-300'
          }`}>Books</a>
          <a href="#community" className={`py-2 ${
            isScrolled ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-indigo-300'
          }`}>Community</a>
          <div className="pt-2 flex flex-col space-y-2">
            <Link to="/google-login" className={`px-4 py-2 rounded-md transition-colors text-center ${
              isScrolled 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-indigo-600/80 hover:bg-indigo-700/90 text-white'
            }`}>
              Log In
            </Link>
            <Link to="/signup" className={`px-4 py-2 rounded-md transition-colors text-center ${
              isScrolled 
                ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600 border border-indigo-200' 
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/30'
            }`}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    )}
  </div>
</nav>
        
        {/* Hero Section with Animated Text and Floating Elements */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white relative inline-block">
                <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                Welcome to the Hackathon Club's Digital Library 
                </span>
                <div className="absolute -top-8 -right-8 w-16 h-16 text-yellow-300 animate-spin-slow opacity-70">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.75L5.82804 20.995L7.00704 14.122L2.00704 9.25495L8.90404 8.25495L12 2.00195L15.096 8.25495L21.993 9.25495L16.993 14.122L18.172 20.995L12 17.75Z" fill="currentColor"/>
                  </svg>
                </div>
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 mb-10 animate-fadeIn opacity-90">
                Access programming books, share knowledge, and level up your coding skills with our collaborative platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-float">
                <Link to="/explore" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                  Explore Books <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/signup" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/20">
                  Join the Club
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-16 px-4 relative">
            <div className="rounded-xl overflow-hidden shadow-2xl transform-gpu animate-float">
              <img src="/api/placeholder/1200/600" alt="Platform Preview" className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Animated code snippets floating around the image */}
            <div className="absolute -right-4 top-1/4 bg-gray-900/80 p-3 rounded-lg backdrop-blur-sm shadow-xl transform rotate-3 animate-float-delay-1 hidden md:block">
              <div className="text-indigo-300 text-xs font-mono">const book = new Book();</div>
            </div>
            <div className="absolute -left-4 bottom-1/4 bg-gray-900/80 p-3 rounded-lg backdrop-blur-sm shadow-xl transform -rotate-2 animate-float-delay-2 hidden md:block">
              <div className="text-green-300 text-xs font-mono">import  knowledge  from 'hackbooks';</div>
            </div>
          </div>
        </section>
        
        {/* Features Section with Glassmorphism Cards */}
        <section id="features" className="py-20 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Why Choose HackBooks?</h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl border border-white/20">
                <div className="bg-indigo-500/30 p-3 rounded-lg inline-block mb-4">
                  <BookOpen className="h-6 w-6 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Extensive Library</h3>
                <p className="text-indigo-100">Access hundreds of programming books across various technologies and skill levels.</p>
              </div>
              
              <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl border border-white/20">
                <div className="bg-indigo-500/30 p-3 rounded-lg inline-block mb-4">
                  <Code className="h-6 w-6 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Code Examples</h3>
                <p className="text-indigo-100">Interactive code snippets to help you implement what you learn right away.</p>
              </div>
              
              <div className="backdrop-blur-xl bg-white/10 p-6 rounded-xl shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl border border-white/20">
                <div className="bg-indigo-500/30 p-3 rounded-lg inline-block mb-4">
                  <Users className="h-6 w-6 text-indigo-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Community Notes</h3>
                <p className="text-indigo-100">Collaborate with club members by sharing notes and insights on each resource.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Books Section with Hover Effects */}
        <section id="books" className="py-20 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Featured Books</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBooks.map((book) => (
                <div key={book.id} className="group">
                  <div className="backdrop-blur-md bg-white/5 rounded-xl shadow-md overflow-hidden transform transition-all group-hover:-translate-y-2 group-hover:shadow-xl border border-white/10">
                    <div className="relative">
                      <img src={book.cover} alt={book.title} className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/50 to-transparent group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link to={`/book/${book.id}`} className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all border border-white/30">
                          View Book
                        </Link>
                      </div>
                      <div className="absolute top-2 right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs px-2 py-1 rounded">
                        {book.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1 text-white">{book.title}</h3>
                      <p className="text-indigo-200 text-sm">{book.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/explore" className="inline-flex items-center text-indigo-300 hover:text-indigo-100 font-semibold transition-colors">
                Browse All Books <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Community Section with Animated Gradient */}
        <section id="community" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 animate-gradient-xy"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Join Our Hackathon Club</h2>
              <p className="text-xl text-indigo-100 mb-10">
                Connect with like-minded developers, participate in coding events, and level up your skills together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg">
                  Get Started For Free
                </Link>
                <Link to="/events" className="bg-transparent hover:bg-indigo-700/30 border border-white/50 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg">
                  Upcoming Events
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section with Glassmorphism */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "Who can join the HackBooks platform?",
                  answer: "Any member of our hackathon club can join. If you're not yet a member, you can sign up for the club and get immediate access to the platform."
                },
                {
                  question: "Can I contribute my own books or resources?",
                  answer: "Yes! We encourage members to contribute educational resources. All submissions go through a quick review process before being added to the library."
                },
                {
                  question: "Is there a mobile app available?",
                  answer: "We currently offer a responsive web application that works well on mobile devices. A dedicated mobile app is on our roadmap."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-white/20 py-4">
                  <button 
                    className="flex justify-between items-center w-full text-left font-medium text-lg text-white hover:text-indigo-300 transition-colors"
                    onClick={() => {
                      // Toggle FAQ logic would go here
                    }}
                  >
                    {faq.question}
                    <ChevronDown className="h-5 w-5 text-indigo-300" />
                  </button>
                  <div className="mt-2 text-indigo-100">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action with Animated Gradient */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 animate-gradient-xy"></div>
          <div className="absolute inset-0 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full mix-blend-overlay"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
                }}
              />
            ))}
          </div>
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Expand Your Knowledge?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join HackBooks today and get access to our ever-growing library of programming resources.
            </p>
            <Link to="/signup" className="bg-white text-indigo-600 hover:bg-indigo-100 px-8 py-4 rounded-lg transition-all transform hover:scale-105 font-bold text-lg inline-block shadow-xl animate-pulse">
              Create Your Account
            </Link>
          </div>
        </section>
        
        {/* Footer with Glassmorphism */}
        <footer className="backdrop-blur-xl bg-black/40 text-gray-300 relative z-10">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <BookOpen className="h-6 w-6 text-indigo-400" />
                  <span className="ml-2 text-xl font-bold text-white">HackBooks</span>
                </div>
                <p className="text-sm text-gray-400">
                  Your hackathon club's digital library for programming resources and knowledge sharing.
                </p>
                <div className="mt-4 flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaGithub className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Books</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Code Samples</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-4">Community</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hackathons</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Meetups</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discussion Forum</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contributors</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-white mb-4">Help</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700/50 mt-8 pt-8 text-sm text-gray-400 text-center">
              <p>&copy; {new Date().getFullYear()} HackBooks. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -10px) scale(1.05); }
          50% { transform: translate(0, 20px) scale(0.95); }
          75% { transform: translate(-20px, -15px) scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-50px) translateX(25px); }
          50% { transform: translateY(-100px) translateX(-25px); }
          75% { transform: translateY(-50px) translateX(-50px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 7s ease-in-out 1s infinite;
        }
        
        .animate-float-delay-2 {
          animation: float 8s ease-in-out 2s infinite;
        }
        
        .animate-blob {
          animation: blob 10s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
          background-size: 400% 400%;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .particle {
          animation: particle-float 20s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;