import React, { useState } from 'react';
import sharedCardImg from './assets/shared-card.png';

import {
  Heart,
  X,
  Home,
  Users,
  Wallet,
  User,
  MapPin,
  LogOut,
  Filter,
  Search,
  Settings,
  Bell,
  ChevronRight,
  Camera,
  MessageCircle,
} from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('roommates');
  const [showAuthForm, setShowAuthForm] = useState('login');
  const [showPreferences, setShowPreferences] = useState(false);
  const [currentRoommateIndex, setCurrentRoommateIndex] = useState(0);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const [matchedName, setMatchedName] = useState('');
  const [preferences, setPreferences] = useState({
    smoker: false,
    ageMin: 18,
    ageMax: 35,
    gender: 'any',
    budget: 5000,
  });

  // Demo data for roommates
  const roommates = [
    {
      id: 1,
      name: 'Sarah',
      age: 23,
      bio: 'Med student, clean & quiet. Love cooking and yoga 🧘‍♀️',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      smoker: false,
      budget: 4000,
      gender: 'female',
      interests: ['Yoga', 'Cooking', 'Reading'],
    },
    {
      id: 2,
      name: 'Ahmed',
      age: 25,
      bio: 'Software engineer, gamer, easy-going. Night owl 🦉',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      smoker: false,
      budget: 5000,
      gender: 'male',
      interests: ['Gaming', 'Tech', 'Coffee'],
    },
    {
      id: 3,
      name: 'Leila',
      age: 22,
      bio: 'Architecture student, loves plants and minimalist design 🌿',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      smoker: false,
      budget: 3500,
      gender: 'female',
      interests: ['Design', 'Plants', 'Art'],
    },
    {
      id: 4,
      name: 'Youssef',
      age: 28,
      bio: 'Marketing professional, fitness enthusiast, very organized 💪',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      smoker: false,
      budget: 6000,
      gender: 'male',
      interests: ['Fitness', 'Travel', 'Photography'],
    },
    {
      id: 5,
      name: 'Amina',
      age: 24,
      bio: 'Psychology student, love animals and good vibes only ✨',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      smoker: false,
      budget: 4500,
      gender: 'female',
      interests: ['Psychology', 'Pets', 'Music'],
    },
  ];

  // Wallet-related state
  const [wallets, setWallets] = useState([
    {
      id: 'rent',
      name: 'Rent',
      description: 'Shared rent wallet for the apartment',
      balance: 7200,
      target: 9000,
    },
    {
      id: 'bills',
      name: 'Bills',
      description: 'Electricity, water & internet',
      balance: 950,
      target: 1200,
    },
    {
      id: 'groceries',
      name: 'Groceries',
      description: 'Food & essentials for the month',
      balance: 1300,
      target: 2000,
    },
  ]);

  const [pendingBills, setPendingBills] = useState([
    {
      id: 1,
      from: 'Sarah',
      walletId: 'bills',
      walletName: 'Bills',
      amount: 250,
      description: 'Electricity bill - November',
      deadline: 'Due in 2 days',
    },
    {
      id: 2,
      from: 'Ahmed',
      walletId: 'groceries',
      walletName: 'Groceries',
      amount: 180,
      description: 'Groceries from last weekend',
      deadline: 'Due tomorrow',
    },
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      from: 'Ranya',
      to: 'Landlord',
      walletId: 'rent',
      walletName: 'Rent',
      amount: 4500,
      time: 'Today • 10:24',
      status: 'Completed via CIH',
    },
    {
      id: 2,
      from: 'Ranya',
      to: 'Youssef',
      walletId: 'groceries',
      walletName: 'Groceries',
      amount: 300,
      time: 'Yesterday • 18:05',
      status: 'Completed via CIH',
    },
  ]);

  // Demo list of roommates for transfers
  const demoRoommates = ['Sarah', 'Ahmed', 'Leila', 'Youssef', 'Amina'];

  // Simulate CIH transfer
  const handleWalletTransfer = ({ walletId, from, to, amount }) => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    setWallets((prev) =>
      prev.map((w) =>
        w.id === walletId ? { ...w, balance: w.balance + numericAmount } : w
      )
    );

    setTransactions((prev) => [
      {
        id: prev.length + 1,
        from,
        to,
        walletId,
        walletName: wallets.find((w) => w.id === walletId)?.name || '',
        amount: numericAmount,
        time: 'Just now',
        status: 'Simulated via CIH APIs',
      },
      ...prev,
    ]);
  };

  const ChatsTab = () => {
    const chats = [
      {
        id: 1,
        name: 'Hassan',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        lastMessage: 'The apartment is still available!',
        time: '10:30 AM',
        unread: 2,
        type: 'owner',
      },
      {
        id: 2,
        name: 'Sarah',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        lastMessage: "I'd love to be roommates! 😊",
        time: 'Yesterday',
        unread: 1,
        type: 'roommate',
      },
      {
        id: 3,
        name: 'Fatima',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
        lastMessage: 'We can schedule a viewing for tomorrow',
        time: 'Yesterday',
        unread: 0,
        type: 'owner',
      },
      {
        id: 4,
        name: 'Ahmed',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        lastMessage: 'Sounds good, see you then!',
        time: '2 days ago',
        unread: 0,
        type: 'roommate',
      },
      {
        id: 5,
        name: 'Karim',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
        lastMessage: 'The rent includes utilities',
        time: '3 days ago',
        unread: 0,
        type: 'owner',
      },
    ];

    return (
      <div className="h-full flex flex-col bg-white">
        <div className="p-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
          <p className="text-sm text-gray-500">Chat with owners & roommates</p>
        </div>

        <div className="flex-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="relative">
                <img
                  src={chat.image}
                  alt={chat.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p
                  className={`text-sm truncate ${chat.unread > 0
                    ? 'text-gray-800 font-medium'
                    : 'text-gray-500'
                    }`}
                >
                  {chat.lastMessage}
                </p>
                <span className="text-xs text-orange-500 mt-1 inline-block">
                  {chat.type === 'owner' ? '🏠 Owner' : '👤 Roommate'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Demo data for apartments
  const apartments = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600',
      owner: 'Hassan',
      ownerImage:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      price: 10000,
      capacity: 3,
      location: 'Agdal, Rabat',
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 2,
      area: '120m²',
      amenities: ['WiFi', 'Parking', 'Furnished'],
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
      owner: 'Fatima',
      ownerImage:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
      price: 5000,
      capacity: 5,
      location: 'Hay Riad, Rabat',
      type: 'Shared House',
      bedrooms: 5,
      bathrooms: 3,
      area: '200m²',
      amenities: ['WiFi, Garden', 'Kitchen'],
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
      owner: 'Karim',
      ownerImage:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      price: 8000,
      capacity: 2,
      location: 'Ocean, Rabat',
      type: 'Studio',
      bedrooms: 1,
      bathrooms: 1,
      area: '45m²',
      amenities: ['WiFi', 'Balcony', 'Modern'],
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600',
      owner: 'Nadia',
      ownerImage:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      price: 6500,
      capacity: 4,
      location: 'Hassan, Rabat',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: '90m²',
      amenities: ['WiFi', 'Elevator', 'Security'],
    },
  ];

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      setMatchedName(roommates[currentRoommateIndex].name);
      setShowMatchPopup(true);
      setTimeout(() => setShowMatchPopup(false), 2000);
    }
    setCurrentRoommateIndex((prev) => (prev + 1) % roommates.length);
  };

  const LoginScreen = () => {
    // ONE wizard with 9 steps (no more phases)
    const [signupStep, setSignupStep] = useState(1);
    const TOTAL_STEPS = 9;

    const [signupData, setSignupData] = useState({
      fullName: '',
      email: '',
      password: '',
      phone: '',
      dateOfBirth: '',
      gender: 'prefer-not-to-say',
      city: '',
      status: 'student',
      institution: '',
      budget: 5000,
      bio: '',
      interests: [],
      smoker: false,
      pets: false,
      lifestyle: 'balanced',

      matchGender: 'any',
      matchAgeMin: 18,
      matchAgeMax: 35,
      matchBudgetMin: 2000,
      matchBudgetMax: 8000,
      matchSmokerOk: true,
      matchPetsOk: true,
      matchCleanliness: 'balanced',
      matchNoiseTolerance: 'medium',
      matchSleepSchedule: 'any',
      matchGuests: 'sometimes',
      matchMaxRoommates: 3,
    });

    const handleSignupChange = (field, value) => {
      setSignupData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
      if (signupStep < TOTAL_STEPS) {
        setSignupStep(signupStep + 1);
      } else {
        setIsLoggedIn(true); // finish signup
      }
    };

    const prevStep = () => {
      if (signupStep > 1) {
        setSignupStep(signupStep - 1);
      } else {
        setShowAuthForm('login');
        setSignupStep(1);
      }
    };

    if (showAuthForm === 'login') {
      return (
        <div className="h-full bg-white flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md border border-gray-100">
            {/* Logo/Illustration */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-400 w-20 h-20 rounded-2xl shadow-lg">
                <Home size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
              </div>
            </div>

            {/* Login Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                />
              </div>

              <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">
                Forgot password?
              </button>

              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                Sign In
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setShowAuthForm('signup')}
                    className="text-orange-500 font-semibold hover:text-orange-600"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Single multi-step Signup (1–9)
    return (
      <div className="h-full bg-gradient-to-br from-orange-400 via-pink-400 to-purple-400 flex items-center justify-center p-6">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <div className="flex flex-col">

                <span className="text-sm font-medium text-gray-700">
                  Step {signupStep} of {TOTAL_STEPS}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {Math.round((signupStep / TOTAL_STEPS) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(signupStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1 – Basic account */}
          {signupStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Let&apos;s start with the basics
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={signupData.fullName}
                  onChange={(e) => handleSignupChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => handleSignupChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={signupData.password}
                  onChange={(e) => handleSignupChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={signupData.phone}
                  onChange={(e) => handleSignupChange('phone', e.target.value)}
                  placeholder="+212 600 000 000"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
          )}

          {/* STEP 2 – Personal details */}
          {signupStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Tell us a bit about yourself
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={signupData.dateOfBirth}
                  onChange={(e) => handleSignupChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={signupData.gender}
                  onChange={(e) => handleSignupChange('gender', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <select
                  value={signupData.city}
                  onChange={(e) => handleSignupChange('city', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Select City</option>
                  <option value="Rabat">Rabat</option>
                  <option value="Casablanca">Casablanca</option>
                  <option value="Marrakech">Marrakech</option>
                  <option value="Fes">Fes</option>
                  <option value="Tangier">Tangier</option>
                  <option value="Agadir">Agadir</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3 – Status + budget */}
          {signupStep === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Work & Budget</h2>
                <p className="text-sm text-gray-500 mt-1">
                  How do you live and what can you afford?
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleSignupChange('status', 'student')}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition ${signupData.status === 'student'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSignupChange('status', 'employed')}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition ${signupData.status === 'employed'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Employed
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {signupData.status === 'student' ? 'University' : 'Company'}
                </label>
                <input
                  type="text"
                  value={signupData.institution}
                  onChange={(e) => handleSignupChange('institution', e.target.value)}
                  placeholder={
                    signupData.status === 'student' ? 'e.g., UIR' : 'e.g., Company name'
                  }
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your monthly budget: {signupData.budget} DH
                </label>
                <input
                  type="range"
                  min="2000"
                  max="15000"
                  step="500"
                  value={signupData.budget}
                  onChange={(e) =>
                    handleSignupChange('budget', parseInt(e.target.value) || 2000)
                  }
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2,000 DH</span>
                  <span>15,000 DH</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 – About you */}
          {signupStep === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">About You</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Help others get to know you
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={signupData.bio}
                  onChange={(e) => handleSignupChange('bio', e.target.value)}
                  placeholder="Tell us about yourself, your interests, and what you're looking for..."
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Lifestyle
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                    <input
                      type="checkbox"
                      checked={signupData.smoker}
                      onChange={(e) =>
                        handleSignupChange('smoker', e.target.checked)
                      }
                      className="w-5 h-5 accent-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Smoker
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                    <input
                      type="checkbox"
                      checked={signupData.pets}
                      onChange={(e) =>
                        handleSignupChange('pets', e.target.checked)
                      }
                      className="w-5 h-5 accent-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Have Pets
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personality
                </label>
                <select
                  value={signupData.lifestyle}
                  onChange={(e) => handleSignupChange('lifestyle', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="quiet">Quiet & Calm</option>
                  <option value="balanced">Balanced</option>
                  <option value="social">Social & Outgoing</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 5 – Match basics: gender + age */}
          {signupStep === 5 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Match Basics</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Who would you feel comfortable sharing a place with?
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender preference
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'any', label: 'Any' },
                    { value: 'female', label: 'Female' },
                    { value: 'male', label: 'Male' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSignupChange('matchGender', opt.value)}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${signupData.matchGender === opt.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred age range
                </label>
                <div className="space-y-3">
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">Min age</span>
                    <input
                      type="number"
                      min="18"
                      max={signupData.matchAgeMax}
                      value={signupData.matchAgeMin}
                      onChange={(e) =>
                        handleSignupChange(
                          'matchAgeMin',
                          parseInt(e.target.value) || 18
                        )
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">Max age</span>
                    <input
                      type="number"
                      min={signupData.matchAgeMin}
                      max="60"
                      value={signupData.matchAgeMax}
                      onChange={(e) =>
                        handleSignupChange(
                          'matchAgeMax',
                          parseInt(e.target.value) || 35
                        )
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6 – Match budget */}
          {signupStep === 6 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Match Budget</h2>
                <p className="text-sm text-gray-500 mt-1">
                  What budget range should your roommate have?
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-3">
                  You&apos;ll be matched with people whose budget fits this range.
                </p>
                <div className="space-y-3">
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">Min (DH)</span>
                    <input
                      type="number"
                      min="1000"
                      max={signupData.matchBudgetMax}
                      value={signupData.matchBudgetMin}
                      onChange={(e) =>
                        handleSignupChange(
                          'matchBudgetMin',
                          parseInt(e.target.value) || 2000
                        )
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-500 mb-1">Max (DH)</span>
                    <input
                      type="number"
                      min={signupData.matchBudgetMin}
                      max="20000"
                      value={signupData.matchBudgetMax}
                      onChange={(e) =>
                        handleSignupChange(
                          'matchBudgetMax',
                          parseInt(e.target.value) || 8000
                        )
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7 – Smoker/pets tolerance */}
          {signupStep === 7 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Habits & Pets</h2>
                <p className="text-sm text-gray-500 mt-1">
                  How flexible are you about these habits?
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Okay with smokers?
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleSignupChange('matchSmokerOk', true)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${signupData.matchSmokerOk
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Yes, it&apos;s okay
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSignupChange('matchSmokerOk', false)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${!signupData.matchSmokerOk
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Prefer non-smoker
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Okay with pets?
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleSignupChange('matchPetsOk', true)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${signupData.matchPetsOk
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Yes, I love pets
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSignupChange('matchPetsOk', false)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${!signupData.matchPetsOk
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    Prefer no pets at home
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8 – Cleanliness + noise */}
          {signupStep === 8 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Home Vibes</h2>
                <p className="text-sm text-gray-500 mt-1">
                  What kind of environment do you want at home?
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How tidy should your roommate be?
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'relaxed', label: 'Relaxed' },
                    { value: 'balanced', label: 'Balanced' },
                    { value: 'strict', label: 'Very tidy' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        handleSignupChange('matchCleanliness', opt.value)
                      }
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${signupData.matchCleanliness === opt.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Noise & lifestyle vibe
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'low', label: 'Very calm' },
                    { value: 'medium', label: 'Balanced' },
                    { value: 'high', label: 'Lively' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        handleSignupChange('matchNoiseTolerance', opt.value)
                      }
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${signupData.matchNoiseTolerance === opt.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 9 – Sleep, guests, roommates */}
          {signupStep === 9 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Daily Rhythm</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Let&apos;s align on routines and guests
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep schedule
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'early-bird', label: 'Early bird' },
                    { value: 'night-owl', label: 'Night owl' },
                    { value: 'any', label: 'Either is fine' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        handleSignupChange('matchSleepSchedule', opt.value)
                      }
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${signupData.matchSleepSchedule === opt.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests at home
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'rarely', label: 'Rarely' },
                    { value: 'sometimes', label: 'Sometimes' },
                    { value: 'often', label: 'Often' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        handleSignupChange('matchGuests', opt.value)
                      }
                      className={`w-full py-2 rounded-xl text-sm font-semibold transition ${signupData.matchGuests === opt.value
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max roommates in flat
                </label>
                <select
                  value={signupData.matchMaxRoommates}
                  onChange={(e) =>
                    handleSignupChange(
                      'matchMaxRoommates',
                      parseInt(e.target.value) || 3
                    )
                  }
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value={1}>Just 1 roommate</option>
                  <option value={2}>Up to 2 roommates</option>
                  <option value={3}>Up to 3 roommates</option>
                  <option value={4}>4+ is okay</option>
                </select>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={prevStep}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              {signupStep === 1 ? 'Back to Login' : 'Previous'}
            </button>
            <button
              onClick={nextStep}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02]"
            >
              {signupStep === TOTAL_STEPS ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MatchPopup = () => (
    <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center animate-bounce">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          It's a Match!
        </h3>
        <p className="text-gray-600 mt-2">You matched with {matchedName}!</p>
      </div>
    </div>
  );

  const PreferencesModal = () => (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Changed your mind? Change preference!
          </h2>
          <button
            onClick={() => setShowPreferences(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Age Range
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={preferences.ageMin}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      ageMin: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Min"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={preferences.ageMax}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      ageMax: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Gender Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['any', 'male', 'female'].map((g) => (
                <button
                  key={g}
                  onClick={() =>
                    setPreferences({ ...preferences, gender: g })
                  }
                  className={`py-3 rounded-xl font-semibold capitalize transition ${preferences.gender === g
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Budget: {preferences.budget} DH/month
            </label>
            <input
              type="range"
              min="2000"
              max="10000"
              step="500"
              value={preferences.budget}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  budget: parseInt(e.target.value),
                })
              }
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2000 DH</span>
              <span>10000 DH</span>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!preferences.smoker}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    smoker: !e.target.checked,
                  })
                }
                className="w-5 h-5 accent-orange-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                Non-Smoker Only
              </span>
            </label>
          </div>
        </div>

        <button
          onClick={() => setShowPreferences(false)}
          className="w-full mt-6 py-3.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02]"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  const RoommateTab = () => {
    const currentRoommate = roommates[currentRoommateIndex];

    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-orange-50 to-white">
        <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Discover</h2>
            <p className="text-sm text-gray-500">Find your perfect roommate</p>
          </div>
          <button
            onClick={() => setShowPreferences(true)}
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition"
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Card Stack */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm">
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-y-auto">
              <div className="relative">
                <img
                  src={currentRoommate.image}
                  alt={currentRoommate.name}
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h3 className="text-3xl font-bold mb-1">
                    {currentRoommate.name}, {currentRoommate.age}
                  </h3>
                  <p className="text-sm opacity-90 mb-3">
                    {currentRoommate.bio}
                  </p>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {currentRoommate.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-600 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">
                    {currentRoommate.smoker ? '🚬 Smoker' : '🚭 Non-smoker'}
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {currentRoommate.budget} DH/mo
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-4">
              <button
                onClick={() => handleSwipe('left')}
                className="bg-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-gray-100"
              >
                <X size={24} className="text-red-500" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => handleSwipe('right')}
                className="bg-gradient-to-r from-orange-500 to-pink-500 w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Heart
                  size={26}
                  className="text-white"
                  strokeWidth={2.5}
                  fill="white"
                />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-1.5 mt-4">
              {roommates.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${idx === currentRoommateIndex
                    ? 'w-8 bg-gradient-to-r from-orange-500 to-pink-500'
                    : 'w-1.5 bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ApartmentTab = () => {
    if (selectedApartment) {
      const apt = apartments.find((a) => a.id === selectedApartment);
      return (
        <div className="h-full flex flex-col bg-white overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-4 flex items-center gap-3 z-10">
            <button
              onClick={() => setSelectedApartment(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ChevronRight size={24} className="rotate-180" />
            </button>
            <h2 className="text-xl font-bold">Apartment Details</h2>
          </div>

          {/* Image */}
          <img
            src={apt.image}
            alt={apt.type}
            className="w-full h-64 object-cover"
          />

          {/* Details */}
          <div className="p-5 space-y-5">
            {/* Type & Price */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {apt.type}
              </h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                {apt.price} DH<span className="text-lg">/month</span>
              </p>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2">
              <MapPin size={20} className="text-orange-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">{apt.location}</p>
                <p className="text-sm text-gray-500">Rabat, Morocco</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-orange-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {apt.bedrooms}
                </p>
                <p className="text-xs text-gray-600">Bedrooms</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-pink-600">
                  {apt.bathrooms}
                </p>
                <p className="text-xs text-gray-600">Bathrooms</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {apt.area}
                </p>
                <p className="text-xs text-gray-600">Area</p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="font-bold text-gray-800 mb-3">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {apt.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Owner */}
            <div className="border-t border-gray-100 pt-5">
              <h4 className="font-bold text-gray-800 mb-3">Owner</h4>
              <div className="flex items-center gap-3">
                <img
                  src={apt.ownerImage}
                  alt={apt.owner}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{apt.owner}</p>
                  <p className="text-sm text-gray-500">Property owner</p>
                </div>
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-5 py-2 rounded-full text-sm font-semibold">
                  Contact
                </button>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
              Request Viewing
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-orange-50 to-white">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Apartments</h2>
            <p className="text-sm text-gray-500">Find your perfect home</p>
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-full shadow-lg">
            <Search size={20} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full text-sm font-semibold whitespace-nowrap shadow-md">
            All
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold whitespace-nowrap border border-gray-200">
            Studio
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold whitespace-nowrap border border-gray-200">
            Apartment
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-semibold whitespace-nowrap border border-gray-200">
            Shared
          </button>
        </div>

        {/* Apartments Grid */}
        <div className="px-4 pb-4 space-y-4 overflow-y-auto flex-1">
          {apartments.map((apt) => (
            <div
              key={apt.id}
              onClick={() => setSelectedApartment(apt.id)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:scale-[1.02]"
            >
              <div className="relative">
                <img
                  src={apt.image}
                  alt={apt.type}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-sm font-bold text-orange-600">
                    {apt.type}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={apt.ownerImage}
                      alt={apt.owner}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800">{apt.owner}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={12} />
                        {apt.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                      {apt.price} DH
                    </p>
                    <p className="text-xs text-gray-500">/month</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>🛏️ {apt.bedrooms} beds</span>
                  <span>🚿 {apt.bathrooms} baths</span>
                  <span>👥 {apt.capacity} people</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const WalletTab = () => {
    const [showTransfer, setShowTransfer] = useState(false);
    const [showTransferOptions, setShowTransferOptions] = useState(false);
    const [transferType, setTransferType] = useState(null); // 'roommate' or 'landlord'

    const [transferForm, setTransferForm] = useState({
      walletId: 'rent',
      from: 'Ranya',
      to: 'Sarah',
      amount: '',
    });

    const handlePayBill = (bill) => {
      handleWalletTransfer({
        walletId: bill.walletId,
        from: 'Ranya',
        to: bill.from,
        amount: bill.amount,
      });

      setPendingBills((prev) => prev.filter((b) => b.id !== bill.id));
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const receiver =
        transferType === 'roommate'
          ? transferForm.to
          : transferForm.to || 'Landlord';

      handleWalletTransfer({
        walletId: transferForm.walletId,
        from: transferForm.from,
        to: receiver,
        amount: transferForm.amount,
      });

      setTransferForm((prev) => ({ ...prev, amount: '' }));
      setShowTransfer(false);
      setTransferType(null);
    };

    const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);

    return (
      <div className="h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Shared Wallet</h2>
          </div>
          <div className="px-3 py-1 rounded-full bg-orange-100 text-[11px] font-semibold text-orange-700 border border-orange-200">
            Secured by CIH
          </div>
        </div>

        {/* Main scrollable content */}
        <div className="flex-1 overflow-y-auto pb-4">
          {/* Group Balance Card */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl">
              {/* Credit card image */}
              <div className="mb-5">
                <img
                  src={sharedCardImg}
                  alt="Shared wallet card"
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-lg object-cover"
                />
              </div>

              <p className="text-sm opacity-90 mb-1">Total in shared wallets</p>
              <p className="text-4xl font-bold mb-1">
                {totalBalance.toLocaleString()} DH
              </p>
              <p className="text-xs opacity-80 mb-4">
                All transactions, payments go
                through CIH Bank APIs.
              </p>
              <div className="flex gap-3">
                {/* 🔹 TRANSFER button opens the options modal */}
                <button
                  onClick={() => setShowTransferOptions(true)}
                  className="flex-1 bg-white/90 text-orange-600 py-3 rounded-xl font-semibold hover:bg-white transition"
                >
                  Transfer
                </button>
                <button className="flex-1 bg-white/15 backdrop-blur-sm py-3 rounded-xl font-semibold hover:bg-white/25 transition">
                  Split a bill
                </button>
              </div>
            </div>
          </div>

          {/* Mini Wallets */}
          <div className="px-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Mini wallets
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {wallets.map((w) => {
                const progress = Math.min(
                  100,
                  Math.round((w.balance / w.target) * 100)
                );
                return (
                  <div
                    key={w.id}
                    className="min-w-[170px] bg-white rounded-2xl shadow-md p-4 border border-gray-100 flex-shrink-0"
                  >
                    <p className="text-xs text-gray-500 mb-1">{w.name}</p>
                    <p className="text-lg font-bold text-gray-800 mb-1">
                      {w.balance.toLocaleString()} DH
                    </p>
                    <p className="text-[11px] text-gray-400 mb-2">
                      Target {w.target.toLocaleString()} DH
                    </p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-pink-500 h-1.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-500">
                      {progress}% funded
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pending bills + Transactions */}
          <div className="px-4 mt-4 pb-4">
            {/* Pending Bills Section */}
            {pendingBills.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Pending bills
                </h3>
                <div className="space-y-2 mb-4">
                  {pendingBills.map((bill) => (
                    <div
                      key={bill.id}
                      className="bg-white rounded-2xl p-3 shadow-sm border border-orange-200 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {bill.from} requested {bill.amount.toLocaleString()} DH
                        </p>
                        <p className="text-xs text-gray-500">
                          {bill.walletName} • {bill.description}
                        </p>
                        <p className="text-[11px] text-orange-600 mt-0.5">
                          {bill.deadline} • waiting for your payment
                        </p>
                      </div>
                      <button
                        onClick={() => handlePayBill(bill)}
                        className="text-xs font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-full hover:shadow-md transition"
                      >
                        Pay now
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Transactions */}
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Recent activity
            </h3>

            {transactions.length === 0 ? (
              <p className="text-xs text-gray-400">
                No transactions yet. Start by sending money to a roommate.
              </p>
            ) : (
              <div className="space-y-2">
                {transactions.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {t.from} → {t.to}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t.walletName} • {t.time}
                      </p>
                      <p className="text-[11px] text-green-600 mt-0.5">
                        {t.status}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-800">
                      + {t.amount.toLocaleString()} DH
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Transfer TYPE modal (roommate / landlord) */}
        {showTransferOptions && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-40">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Choose transfer type
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setTransferType('roommate');
                    setShowTransfer(true);
                    setShowTransferOptions(false);
                    setTransferForm((prev) => ({ ...prev, to: 'Sarah' }));
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:shadow-md transition"
                >
                  Transfer to roommate
                </button>
                <button
                  onClick={() => {
                    setTransferType('landlord');
                    setShowTransfer(true);
                    setShowTransferOptions(false);
                    setTransferForm((prev) => ({ ...prev, to: 'Landlord' }));
                  }}
                  className="w-full py-3 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Transfer to landlord
                </button>
              </div>

              <button
                onClick={() => setShowTransferOptions(false)}
                className="w-full mt-4 text-xs text-gray-500 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Transfer Modal – content depends on transferType */}
        {showTransfer && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 z-40">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {transferType === 'landlord'
                    ? 'Transfer to landlord'
                    : 'Send money to a roommate'}
                </h3>
                <button
                  onClick={() => {
                    setShowTransfer(false);
                    setTransferType(null);
                  }}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Mini wallet
                  </label>
                  <select
                    value={transferForm.walletId}
                    onChange={(e) =>
                      setTransferForm({
                        ...transferForm,
                        walletId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {wallets.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.balance.toLocaleString()} DH)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      From
                    </label>
                    <input
                      type="text"
                      value={transferForm.from}
                      onChange={(e) =>
                        setTransferForm({
                          ...transferForm,
                          from: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  {transferType === 'roommate' ? (
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        To (roommate)
                      </label>
                      <select
                        value={transferForm.to}
                        onChange={(e) =>
                          setTransferForm({
                            ...transferForm,
                            to: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        {demoRoommates.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        To (landlord)
                      </label>
                      <input
                        type="text"
                        value={transferForm.to}
                        onChange={(e) =>
                          setTransferForm({
                            ...transferForm,
                            to: e.target.value,
                          })
                        }
                        placeholder="e.g. Landlord Hassan"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Amount (DH)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={transferForm.amount}
                    onChange={(e) =>
                      setTransferForm({
                        ...transferForm,
                        amount: e.target.value,
                      })
                    }
                    placeholder="e.g. 500"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Transfer
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };


  const ProfileTab = () => (
    <div className="h-full flex flex-col bg-gradient-to-b from-orange-50 to-white overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition">
            <Settings size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-16">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex flex-col items-center -mt-16 mb-4 relative">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400"
                alt="Ranya Laamari"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Camera button on avatar */}
            <button className="absolute top-16 right-24 bg-white p-2 rounded-full shadow-lg border-2 border-gray-100">
              <Camera size={16} className="text-gray-600" />
            </button>

            <h3 className="mt-4 text-2xl font-bold text-gray-800">
              Ranya Laamari
            </h3>
            <p className="text-gray-500">ranya.laamari@gmail.com</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-xs text-gray-500">Matches</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">5</p>
              <p className="text-xs text-gray-500">Favorites</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">3</p>
              <p className="text-xs text-gray-500">Views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 py-6 space-y-3">
        <button className="w-full bg-white border border-gray-200 py-4 rounded-2xl font-semibold hover:shadow-md transition flex items-center justify-between px-5">
          <span className="text-gray-700">Edit Profile</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        <button className="w-full bg-white border border-gray-200 py-4 rounded-2xl font-semibold hover:shadow-md transition flex items-center justify-between px-5">
          <span className="text-gray-700">Notifications</span>
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-gray-400" />
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </button>
        <button className="w-full bg-white border border-gray-200 py-4 rounded-2xl font-semibold hover:shadow-md transition flex items-center justify-between px-5">
          <span className="text-gray-700">Settings</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        <button className="w-full bg-white border border-gray-200 py-4 rounded-2xl font-semibold hover:shadow-md transition flex items-center justify-between px-5">
          <span className="text-gray-700">Help & Support</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2 mt-4"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );

  // ----------------- MAIN RENDER -----------------

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="relative">
          <div
            className="relative bg-black rounded-[3rem] p-2 shadow-2xl"
            style={{ width: '390px', height: '844px' }}
          >
            <div className="bg-white rounded-[2.5rem] overflow-hidden h-full relative">
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black rounded-b-3xl z-50"
                style={{ width: '120px', height: '30px' }}
              >
                <div
                  className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-full"
                  style={{ width: '60px', height: '6px' }}
                ></div>
              </div>
              <LoginScreen />
              <div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black rounded-full"
                style={{ width: '120px', height: '4px' }}
              ></div>
            </div>
          </div>
          <div
            className="absolute left-0 top-32 bg-black rounded-l-lg"
            style={{ width: '4px', height: '30px' }}
          ></div>
          <div
            className="absolute left-0 top-48 bg-black rounded-l-lg"
            style={{ width: '4px', height: '60px' }}
          ></div>
          <div
            className="absolute left-0 top-56 bg-black rounded-l-lg"
            style={{ width: '4px', height: '60px' }}
          ></div>
          <div
            className="absolute right-0 top-40 bg-black rounded-r-lg"
            style={{ width: '4px', height: '80px' }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      {/* iPhone Frame */}
      <div className="relative">
        {/* iPhone Body */}
        <div
          className="relative bg-black rounded-[3rem] p-2 shadow-2xl"
          style={{ width: '390px', height: '844px' }}
        >
          <div className="bg-white rounded-[2.5rem] overflow-hidden h-full relative">
            {/* Notch */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black rounded-b-3xl z-50"
              style={{ width: '120px', height: '30px' }}
            >
              <div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-full"
                style={{ width: '60px', height: '6px' }}
              ></div>
            </div>

            {/* App Content */}
            <div className="flex flex-col bg-gray-50 h-full w-full">
              {showPreferences && <PreferencesModal />}
              {showMatchPopup && <MatchPopup />}

              <div className="flex-1 overflow-y-auto">
                {activeTab === 'roommates' && <RoommateTab />}
                {activeTab === 'apartments' && <ApartmentTab />}
                {activeTab === 'wallet' && <WalletTab />}
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'chats' && <ChatsTab />}
              </div>

              {/* Bottom Nav */}
              <div className="bg-white border-t border-gray-100 px-1 py-2 flex justify-around shadow-lg">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${activeTab === 'profile'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <User size={20} strokeWidth={2.5} />
                  <span className="text-[10px] font-semibold">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('roommates')}
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${activeTab === 'roommates'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <Users size={20} strokeWidth={2.5} />
                  <span className="text-[10px] font-semibold">Roommates</span>
                </button>
                <button
                  onClick={() => setActiveTab('wallet')}
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${activeTab === 'wallet'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <Wallet size={20} strokeWidth={2.5} />
                  <span className="text-[10px] font-semibold">Wallet</span>
                </button>
                <button
                  onClick={() => setActiveTab('apartments')}
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${activeTab === 'apartments'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <Home size={20} strokeWidth={2.5} />
                  <span className="text-[10px] font-semibold">Homes</span>
                </button>
                <button
                  onClick={() => setActiveTab('chats')}
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all ${activeTab === 'chats'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  <MessageCircle size={20} strokeWidth={2.5} />
                  <span className="text-[10px] font-semibold">Chats</span>
                </button>

              </div>
            </div>

            {/* Home Indicator */}
            <div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black rounded-full"
              style={{ width: '120px', height: '4px' }}
            ></div>
          </div>

          {/* Side Buttons */}
          <div
            className="absolute left-0 top-32 bg-black rounded-l-lg"
            style={{ width: '4px', height: '30px' }}
          ></div>
          <div
            className="absolute left-0 top-48 bg-black rounded-l-lg"
            style={{ width: '4px', height: '60px' }}
          ></div>
          <div
            className="absolute left-0 top-56 bg-black rounded-l-lg"
            style={{ width: '4px', height: '60px' }}
          ></div>
          <div
            className="absolute right-0 top-40 bg-black rounded-r-lg"
            style={{ width: '4px', height: '80px' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
