import React, { useState, useEffect, createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Plus, 
  MessageCircle, 
  BarChart3, 
  Target, 
  Settings, 
  Euro, 
  TrendingUp, 
  TrendingDown, 
  Coffee, 
  Car, 
  Home, 
  ShoppingCart, 
  Utensils, 
  Gamepad2, 
  Heart, 
  GraduationCap, 
  X,
  ChevronDown,
  Calendar,
  Globe,
  Sparkles,
  Menu,
  ChevronLeft,
  ChevronRight,
  PieChart,
  Clock,
  DollarSign,
  Send,
  LogOut,
  User,
  Shield
} from 'lucide-react';

// Supabase configuration
const SUPABASE_URL = 'https://kwhupardradacmjrticp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3aHVwYXJkcmFkYWNtanJ0aWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzk1NjcsImV4cCI6MjA2MzY1NTU2N30.Y866C-FqiqJkcC5jAgU0ICoaYzpBfwpMZN6oogecJ7w';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth Context
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      // Check user count first
      const userCount = await getUserCount();
      if (userCount >= 50) {
        throw new Error('Dostignuli smo maksimalni broj korisnika (50). Molimo pokušajte kasnije.');
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error);
  };

  const getUserCount = async () => {
    try {
      const { count, error } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });
      
      if (error) return 0;
      return count || 0;
    } catch (error) {
      return 0;
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    getUserCount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Login Component
const LoginScreen = () => {
  const { signInWithGoogle, getUserCount } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserCount = async () => {
      const count = await getUserCount();
      setUserCount(count);
    };
    fetchUserCount();
  }, [getUserCount]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            KeshCheck
          </h1>
          <p className="text-gray-600 text-lg">Pametno upravljanje novcem</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Dobrodošli! 👋
          </h2>
          <p className="text-gray-600 mb-6">
            Prijavite se sa Google nalogom i počnite da pratite svoje finansije uz pomoć AI savetnika.
          </p>
        </div>

        {userCount >= 50 ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">Zatvorena Beta</h3>
            </div>
            <p className="text-sm text-red-700">
              Trenutno imamo maksimalni broj korisnika (50/50). 
              Molimo pokušajte kasnije kada se oslobodi mesto.
            </p>
          </div>
        ) : (
          <>
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-2xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-3 mb-6 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
                  <span>Povezujem...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Nastavite sa Google</span>
                </>
              )}
            </button>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-semibold text-green-800">
                  Mesto {userCount + 1}/50 dostupno
                </span>
              </div>
              <p className="text-xs text-green-700">
                Ograničena beta verzija - samo 50 korisnika
              </p>
            </div>
          </>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3 text-left">
            <MessageCircle className="w-5 h-5 text-purple-500 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-gray-800">AI Savetnik</h3>
              <p className="text-xs text-gray-600">Koji te neće osuđivati kad potrošiš na gluposti</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 text-left">
            <Shield className="w-5 h-5 text-green-500 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-gray-800">100% Bezbedno</h3>
              <p className="text-xs text-gray-600">Google OAuth + enkriptovani podaci</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 text-left">
            <Globe className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Balkan Friendly</h3>
              <p className="text-xs text-gray-600">EUR, RSD, BAM, HRK, MKD</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Prijavom se slažete sa našim uslovima korišćenja
          </p>
        </div>
      </div>
    </div>
  );
};

// User Profile Component (for header)
const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors"
      >
        <img
          src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.email}&background=7c3aed&color=fff`}
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-800">
            {user.user_metadata?.full_name || user.email?.split('@')[0]}
          </p>
          <p className="text-xs text-gray-600">{user.email}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-gray-800">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
          
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Profil</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Podešavanja</span>
          </button>
          
          <hr className="my-2" />
          
          <button
            onClick={signOut}
            className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-red-50 transition-colors text-red-600"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Odjavi se</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">KeshCheck</h2>
          <p className="text-gray-600">Učitavam...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return children;
};

// Updated Main App Component with Authentication
const KeshCheckApp = () => {
  // All your existing state and logic remains the same...
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('maj');
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showCurrencyConverter, setShowCurrencyConverter] = useState(false);
  
  // Form states
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGoalTemplate, setSelectedGoalTemplate] = useState('');
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalDeadline, setGoalDeadline] = useState('');
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'ai',
      message: 'Eyyy! 👋 Ja sam tvoj AI drug za novac. Analiziraću tvoje troškove za poslednja 3 meseca i daću ti pametne savete. Kako ti ide?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // All your existing data structures remain the same...
  const monthlyData = {
    maj: {
      name: 'Maj 2025',
      transactions: [
        { id: 1, type: 'expense', amount: 15, currency: 'EUR', category: 'kaffe', description: 'Kaffe Zale', date: '29.05.2025' },
        { id: 2, type: 'expense', amount: 45, currency: 'EUR', category: 'food', description: 'Maxi', date: '28.05.2025' },
        { id: 3, type: 'income', amount: 800, currency: 'EUR', category: 'salary', description: 'Plata', date: '25.05.2025' },
        { id: 4, type: 'expense', amount: 30, currency: 'EUR', category: 'transport', description: 'NIS Petrol', date: '27.05.2025' },
        { id: 5, type: 'expense', amount: 25, currency: 'EUR', category: 'entertainment', description: 'Bioskop', date: '26.05.2025' },
        { id: 6, type: 'expense', amount: 20, currency: 'EUR', category: 'kaffe', description: 'Costa Coffee', date: '25.05.2025' },
        { id: 7, type: 'expense', amount: 60, currency: 'EUR', category: 'shopping', description: 'H&M', date: '24.05.2025' },
        { id: 8, type: 'expense', amount: 35, currency: 'EUR', category: 'food', description: 'Restoran', date: '23.05.2025' }
      ]
    },
    april: {
      name: 'April 2025',
      transactions: [
        { id: 9, type: 'income', amount: 800, currency: 'EUR', category: 'salary', description: 'Plata', date: '25.04.2025' },
        { id: 10, type: 'expense', amount: 50, currency: 'EUR', category: 'food', description: 'Groceries', date: '24.04.2025' },
        { id: 11, type: 'expense', amount: 40, currency: 'EUR', category: 'transport', description: 'Bus Pass', date: '23.04.2025' },
        { id: 12, type: 'expense', amount: 35, currency: 'EUR', category: 'kaffe', description: 'Coffee Shops', date: '22.04.2025' },
        { id: 13, type: 'expense', amount: 80, currency: 'EUR', category: 'entertainment', description: 'Weekend Out', date: '21.04.2025' },
        { id: 14, type: 'expense', amount: 25, currency: 'EUR', category: 'health', description: 'Apoteka', date: '20.04.2025' },
        { id: 15, type: 'expense', amount: 70, currency: 'EUR', category: 'shopping', description: 'Shoes', date: '19.04.2025' },
        { id: 16, type: 'expense', amount: 45, currency: 'EUR', category: 'food', description: 'Dinner Out', date: '18.04.2025' }
      ]
    },
    mart: {
      name: 'Mart 2025',
      transactions: [
        { id: 17, type: 'income', amount: 800, currency: 'EUR', category: 'salary', description: 'Plata', date: '25.03.2025' },
        { id: 18, type: 'expense', amount: 55, currency: 'EUR', category: 'food', description: 'Supermarket', date: '24.03.2025' },
        { id: 19, type: 'expense', amount: 45, currency: 'EUR', category: 'transport', description: 'Taxi + Gas', date: '23.03.2025' },
        { id: 20, type: 'expense', amount: 40, currency: 'EUR', category: 'kaffe', description: 'Monthly Coffee', date: '22.03.2025' },
        { id: 21, type: 'expense', amount: 90, currency: 'EUR', category: 'entertainment', description: 'Clubbing', date: '21.03.2025' },
        { id: 22, type: 'expense', amount: 30, currency: 'EUR', category: 'health', description: 'Gym', date: '20.03.2025' },
        { id: 23, type: 'expense', amount: 85, currency: 'EUR', category: 'shopping', description: 'Spring Clothes', date: '19.03.2025' },
        { id: 24, type: 'expense', amount: 65, currency: 'EUR', category: 'food', description: 'Restaurant Week', date: '18.03.2025' }
      ]
    }
  };
  
  const [goals, setGoals] = useState([
    { id: 1, name: 'Fond za Hitne Slučajeve', target: 1000, current: 350, deadline: '2025-12-31', currency: 'EUR' },
    { id: 2, name: 'Letovanje u Grčkoj', target: 800, current: 220, deadline: '2025-07-01', currency: 'EUR' },
    { id: 3, name: 'Novi Laptop', target: 1200, current: 180, deadline: '2025-09-01', currency: 'EUR' }
  ]);

  // All your existing functions remain the same...
  const currencies = [
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'RSD', symbol: 'дин', name: 'Srpski dinar' },
    { code: 'BAM', symbol: 'КМ', name: 'Bosanska marka' },
    { code: 'HRK', symbol: 'kn', name: 'Hrvatska kuna' },
    { code: 'MKD', symbol: 'ден', name: 'Makedonski denar' }
  ];

  const categories = [
    { id: 'kaffe', name: 'Kaffe', icon: Coffee },
    { id: 'food', name: 'Hrana', icon: Utensils },
    { id: 'transport', name: 'Transport', icon: Car },
    { id: 'shopping', name: 'Kupovina', icon: ShoppingCart },
    { id: 'home', name: 'Dom', icon: Home },
    { id: 'entertainment', name: 'Zabava', icon: Gamepad2 },
    { id: 'health', name: 'Zdravlje', icon: Heart },
    { id: 'education', name: 'Obrazovanje', icon: GraduationCap }
  ];

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', name: 'Transakcije', icon: DollarSign },
    { id: 'goals', name: 'Ciljevi', icon: Target },
    { id: 'analytics', name: 'Analitika', icon: PieChart },
    { id: 'settings', name: 'Podešavanja', icon: Settings }
  ];

  const [activeNav, setActiveNav] = useState('dashboard');

  // All your helper functions remain exactly the same...
  const formatCurrency = (amount, currencyCode) => {
    const currencyObj = currencies.find(c => c.code === currencyCode);
    return `${amount} ${currencyObj?.symbol || currencyCode}`;
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : ShoppingCart;
  };

  const getCurrentTransactions = () => {
    return monthlyData[currentMonth].transactions;
  };

  const getAllTransactions = () => {
    return [
      ...monthlyData.maj.transactions,
      ...monthlyData.april.transactions, 
      ...monthlyData.mart.transactions
    ];
  };

  const calculateTotals = () => {
    const currentTransactions = getCurrentTransactions();
    const allTransactions = getAllTransactions();
    
    const total = allTransactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - t.amount;
    }, 0);
    
    const thisMonth = currentTransactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - t.amount;
    }, 0);
    
    const thisWeek = currentTransactions
      .filter(t => parseInt(t.date.split('.')[0]) >= 23)
      .reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0);
    
    const today = currentTransactions
      .filter(t => t.date === '29.05.2025')
      .reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0);
    
    return { total, thisMonth, thisWeek, today };
  };

  const calculateCategoryTotals = () => {
    const allTransactions = getAllTransactions();
    const categoryTotals = {};
    
    allTransactions.filter(t => t.type === 'expense').forEach(t => {
      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }
      categoryTotals[t.category] += t.amount;
    });
    
    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
        name: categories.find(c => c.id === category)?.name || category
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  // All your event handlers remain the same...
  const handleAddTransaction = async () => {
    if (amount && category) {
      const newTransaction = {
        id: Date.now(),
        type: transactionType,
        amount: parseFloat(amount),
        currency,
        category,
        description: description || categories.find(c => c.id === category)?.name,
        date: new Date().toLocaleDateString('sr-RS')
      };
      
      monthlyData[currentMonth].transactions.unshift(newTransaction);
      
      setIsAiLoading(true);
      const contextMessage = `Upravo sam ${transactionType === 'expense' ? 'potrošio' : 'zaradio'} ${formatCurrency(amount, currency)} na ${categories.find(c => c.id === category)?.name}`;
      
      // Simple fallback response for now
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          type: 'ai',
          message: `Zabeleženo! ${transactionType === 'expense' ? 'Potrošio' : 'Zaradio'} si ${formatCurrency(amount, currency)} na ${categories.find(c => c.id === category)?.name}. Nastavi tako! 💪`
        }]);
        setIsAiLoading(false);
      }, 1000);
      
      setAmount('');
      setCategory('');
      setDescription('');
      setShowAddTransaction(false);
    }
  };

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      const userMessage = chatInput.trim();
      
      setChatMessages(prev => [...prev, {
        type: 'user',
        message: userMessage
      }]);
      
      setChatInput('');
      setIsAiLoading(true);
      
      // Simple AI response for now
      setTimeout(() => {
        const responses = [
          "Analiziraću tvoje podatke i javim ti šta mislim! 🤖",
          "Dobro pitanje! Na osnovu tvojih troškova prethodnih meseci, preporučujem...",
          "Vidim da si prilično dobar sa novcem! Nastavi tako! 💪",
          "Možda malo manje na kafu, ali ko sam ja da sudim? ☕😅"
        ];
        
        setChatMessages(prev => [...prev, {
          type: 'ai',
          message: responses[Math.floor(Math.random() * responses.length)]
        }]);
        setIsAiLoading(false);
      }, 1500);
    }
  };

  const totals = calculateTotals();
  const categoryTotals = calculateCategoryTotals();

  // Welcome Screen (simplified since we have login)
  if (currentView === 'welcome') {
    setCurrentView('dashboard');
  }

  // Main Dashboard Layout (same as before but with UserProfile in header)
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Same as before */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 flex flex-col lg:flex hidden`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  KeshCheck
                </h1>
              </div>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-colors ${
                    activeNav === item.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {!sidebarCollapsed && <span className="font-medium">{item.name}</span>}
                </button>
              );
            })}
          </nav>

          {!sidebarCollapsed && (
            <>
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">BRZE KATEGORIJE</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 4).map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setCategory(cat.id);
                          setShowAddTransaction(true);
                        }}
                        className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center space-y-1"
                      >
                        <IconComponent className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">PERIOD</h3>
                <select 
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="maj">Maj 2025</option>
                  <option value="april">April 2025</option>
                  <option value="mart">Mart 2025</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with User Profile */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden p-2 text-gray-600">
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="lg:hidden flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  KeshCheck
                </h1>
              </div>

              <div className="hidden lg:flex items-center space-x-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{monthlyData[currentMonth].name}</span>
                <Clock className="w-4 h-4 ml-4" />
                <span className="text-sm">Ažurirano: Danas u 14:30</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAddTransaction(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Dodaj Trošak</span>
              </button>
              
              {/* User Profile Dropdown */}
              <UserProfile />
            </div>
          </div>
        </header>

        {/* Dashboard Content - Same as before */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Financial Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-600 mb-2">UKUPNO</h3>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totals.total, 'EUR')}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12%</span>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-600 mb-2">{monthlyData[currentMonth].name.toUpperCase()}</h3>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totals.thisMonth, 'EUR')}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-5%</span>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-600 mb-2">OVE SEDMICE</h3>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totals.thisWeek, 'EUR')}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8%</span>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-600 mb-2">DANAS</h3>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(totals.today, 'EUR')}</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-15€</span>
                </div>
              </div>
            </div>

            {/* Two Column Layout - Same content as before */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Left Column - Transactions & Categories */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Potrošnja - {monthlyData[currentMonth].name}</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {getCurrentTransactions().slice(0, 6).map((transaction) => {
                        const IconComponent = getCategoryIcon(transaction.category);
                        return (
                          <div key={transaction.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                transaction.type === 'expense' ? 'bg-red-50' : 'bg-green-50'
                              }`}>
                                <IconComponent className={`w-5 h-5 ${
                                  transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                                }`} />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{transaction.description}</p>
                                <p className="text-sm text-gray-600">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-semibold ${
                                transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {transaction.type === 'expense' ? '-' : '+'}
                                {formatCurrency(transaction.amount, transaction.currency)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">Troškovi po Kategorijama (3 meseca)</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {categoryTotals.slice(0, 5).map((cat, index) => (
                        <div key={cat.category} className="flex items-center space-x-3">
                          <div className="w-12 text-sm text-gray-600">{cat.name}</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                              style={{ width: `${(cat.amount / categoryTotals[0].amount) * 100}%` }}
                            ></div>
                          </div>
                          <div className="w-16 text-sm font-medium text-right">€{cat.amount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - AI Chat & Goals */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                      <MessageCircle className="w-6 h-6 text-purple-600 mr-2" />
                      AI Savetnik 💬
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="h-80 overflow-y-auto space-y-4 mb-4">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-md px-4 py-2 rounded-2xl ${
                            msg.type === 'user' 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {msg.message}
                          </div>
                        </div>
                      ))}
                      
                      {isAiLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-md px-4 py-2 rounded-2xl bg-gray-100 text-gray-800 flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm text-gray-500">AI analizira...</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !isAiLoading && handleSendMessage()}
                        disabled={isAiLoading}
                        placeholder="Pitaj me o potrošnji za 3 meseca..."
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                      />
                      <button 
                        onClick={handleSendMessage}
                        disabled={isAiLoading || !chatInput.trim()}
                        className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">CILJEVI (koji se zaista postižu) 🎯</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {goals.map((goal) => {
                        const progress = (goal.current / goal.target) * 100;
                        return (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-gray-800">{goal.name}</h3>
                              <span className="text-sm text-gray-600">
                                {formatCurrency(goal.current, goal.currency)} / {formatCurrency(goal.target, goal.currency)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                              <span>{Math.round(progress)}% završeno</span>
                              <span>Do: {new Date(goal.deadline).toLocaleDateString('sr-RS')}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal - Same as before */}
      {showAddTransaction && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && setShowAddTransaction(false)}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Šta Si Potrošio/la? 💸</h2>
              <button 
                onClick={() => setShowAddTransaction(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setTransactionType('expense')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                    transactionType === 'expense' 
                      ? 'bg-red-100 text-red-700 border-2 border-red-200' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Trošak
                </button>
                <button 
                  onClick={() => setTransactionType('income')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                    transactionType === 'income' 
                      ? 'bg-green-100 text-green-700 border-2 border-green-200' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Prihod
                </button>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Iznos"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>{curr.symbol}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-xl flex flex-col items-center space-y-1 transition-colors ${
                        category === cat.id 
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-200' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-xs">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
              
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Opis (opciono)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <button 
                onClick={handleAddTransaction}
                disabled={!amount || !category}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Dodaj Transakciju
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App with Authentication
const App = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <KeshCheckApp />
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default App;
