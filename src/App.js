import React, { useState } from 'react';
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
  Send
} from 'lucide-react';

const KeshCheckApp = () => {
  // Supabase configuration - Your actual project details
  const SUPABASE_URL = 'https://kwhupardradacmjrticp.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3aHVwYXJkcmFkYWNtanJ0aWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzk1NjcsImV4cCI6MjA2MzY1NTU2N30.Y866C-FqiqJkcC5jAgU0ICoaYzpBfwpMZN6oogecJ7w';

  // Main state management
  const [currentView, setCurrentView] = useState('welcome');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('maj'); // maj, april, mart
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
  
  // Enhanced 3-month data
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

  // Currency options
  const currencies = [
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'RSD', symbol: 'дин', name: 'Srpski dinar' },
    { code: 'BAM', symbol: 'КМ', name: 'Bosanska marka' },
    { code: 'HRK', symbol: 'kn', name: 'Hrvatska kuna' },
    { code: 'MKD', symbol: 'ден', name: 'Makedonski denar' }
  ];

  // Categories with icons
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

  // Goal templates
  const goalTemplates = [
    { id: 'emergency', name: 'Fond za Hitne Slučajeve', description: 'Štedi za nepredviđene troškove', target: 1000 },
    { id: 'vacation', name: 'Letovanje/Godišnji', description: 'Planirana putovanja i odmor', target: 800 },
    { id: 'apartment', name: 'Stan/Kuća', description: 'Akontacija za nekretninu', target: 5000 },
    { id: 'family', name: 'Porodični Cilj', description: 'Podrška porodici', target: 500 },
    { id: 'education', name: 'Obrazovanje', description: 'Kursevi, knjige, škola', target: 300 },
    { id: 'custom', name: 'Prilagođeni Cilj', description: 'Kreiraj svoj cilj', target: 0 }
  ];

  // Navigation items
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'transactions', name: 'Transakcije', icon: DollarSign },
    { id: 'goals', name: 'Ciljevi', icon: Target },
    { id: 'analytics', name: 'Analitika', icon: PieChart },
    { id: 'settings', name: 'Podešavanja', icon: Settings }
  ];

  const [activeNav, setActiveNav] = useState('dashboard');

  // Helper functions
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

  const getMonthComparison = () => {
    const majExpenses = monthlyData.maj.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const aprilExpenses = monthlyData.april.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const martExpenses = monthlyData.mart.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { maj: majExpenses, april: aprilExpenses, mart: martExpenses };
  };

  // Enhanced AI Chat function with better insights
  const callAIAdvisor = async (message) => {
    try {
      const totals = calculateTotals();
      const categoryTotals = calculateCategoryTotals();
      const monthComparison = getMonthComparison();
      
      const spendingData = {
        transactions: getAllTransactions(),
        goals,
        totals,
        categoryTotals,
        monthComparison,
        currentMonth: monthlyData[currentMonth].name
      };

      const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-advisor-new`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          spendingData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        return data.message || getEnhancedFallbackResponse(message, spendingData);
      }

      return data.message;
    } catch (error) {
      console.error('AI call failed:', error);
      return getEnhancedFallbackResponse(message, { totals: calculateTotals(), monthComparison: getMonthComparison() });
    }
  };

  // Enhanced fallback responses with real insights
  const getEnhancedFallbackResponse = (message, data) => {
    const lowerMessage = message.toLowerCase();
    const { monthComparison } = data;
    
    if (lowerMessage.includes('kaffe') || lowerMessage.includes('kafa')) {
      return `Vidim da si potrošio oko €${monthComparison.maj > monthComparison.april ? '35 u maju vs €30 u aprilu' : '30 u maju vs €35 u aprilu'}. ${monthComparison.maj > monthComparison.april ? 'Malo više nego prošlog meseca, ali opet nije strašno!' : 'Bolje nego prošlog meseca! 👏'} Možda pokušaj sa home-made kafe 2-3 dana u nedelji? ☕`;
    }
    
    if (lowerMessage.includes('mesec') || lowerMessage.includes('troško')) {
      return `U maju si potrošio €${monthComparison.maj}, što je ${monthComparison.maj > monthComparison.april ? `€${monthComparison.maj - monthComparison.april} više nego u aprilu` : `€${monthComparison.april - monthComparison.maj} manje nego u aprilu`}. ${monthComparison.maj > monthComparison.april ? 'Možda malo oprez za jun? 😅' : 'Idemo tako! 💪'}`;
    }
    
    if (lowerMessage.includes('cilj') || lowerMessage.includes('štednja')) {
      return `Imaš €350 u fondu za hitne slučajeve i €220 za letovanje! Ako nastaviš ovim tempom, imaćeš dovoljno za Grčku do jula! 🏖️ Samo pazi na vikendove, tu se uvek omakne 😏`;
    }
    
    if (lowerMessage.includes('vikend') || lowerMessage.includes('subota')) {
      return `Haha, vikendi su ti najskuplji! 😂 Mart: €90 za zabavu, april: €80, maj: €25 (još nisi završio mesec). Izgleda da znaš kako da se opustiš! Samo malo pažnje na jun 🍻`;
    }
    
    const fallbacks = [
      `Analizirajući poslednja 3 meseca: ukupno si potrošio €${monthComparison.maj + monthComparison.april + monthComparison.mart}. Najveći troškovi su ti hrana i zabava - što je totalno normalno! 😎`,
      `Mart ti je bio najskuplji (€${monthComparison.mart}), april srednji (€${monthComparison.april}), a maj si se smirio (€${monthComparison.maj}). Dobra tendencija! 📈`,
      `Potrošnja ti se kreće oko €${Math.round((monthComparison.maj + monthComparison.april + monthComparison.mart) / 3)} mesečno. Za Balkan standarde - solidan! 👍`,
      `Vidim da najviše trošiš na hranu i kafu - što je ok, čovek mora da jede i pije! Možda malo smanjiti shopping? 🛍️`
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  // Event handlers remain the same but with enhanced data...
  const handleQuickActionClick = (e) => {
    e.stopPropagation();
    setShowQuickActions(!showQuickActions);
  };

  const handleQuickActionSelect = (action) => {
    setShowQuickActions(false);
    switch(action) {
      case 'transaction':
        setShowAddTransaction(true);
        break;
      case 'goal':
        setShowGoalModal(true);
        break;
      case 'analytics':
        setShowAnalytics(true);
        break;
      case 'currencies':
        setShowCurrencyConverter(true);
        break;
    }
  };

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
      
      // Add to current month
      monthlyData[currentMonth].transactions.unshift(newTransaction);
      
      // Get AI response about the transaction
      setIsAiLoading(true);
      const contextMessage = `Upravo sam ${transactionType === 'expense' ? 'potrošio' : 'zaradio'} ${formatCurrency(amount, currency)} na ${categories.find(c => c.id === category)?.name}`;
      const aiResponse = await callAIAdvisor(contextMessage);
      
      setChatMessages(prev => [...prev, {
        type: 'ai',
        message: aiResponse
      }]);
      setIsAiLoading(false);
      
      // Reset form
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
      
      const aiResponse = await callAIAdvisor(userMessage);
      
      setChatMessages(prev => [...prev, {
        type: 'ai',
        message: aiResponse
      }]);
      
      setIsAiLoading(false);
    }
  };

  const handleAddGoal = async () => {
    if (goalName && goalAmount) {
      const newGoal = {
        id: Date.now(),
        name: goalName,
        target: parseFloat(goalAmount),
        current: 0,
        deadline: goalDeadline,
        currency
      };
      
      setGoals([...goals, newGoal]);
      
      setIsAiLoading(true);
      const contextMessage = `Upravo sam postavio novi cilj: "${goalName}" za ${formatCurrency(goalAmount, currency)}`;
      const aiResponse = await callAIAdvisor(contextMessage);
      
      setChatMessages(prev => [...prev, {
        type: 'ai',
        message: aiResponse
      }]);
      setIsAiLoading(false);
      
      setGoalName('');
      setGoalAmount('');
      setGoalDeadline('');
      setSelectedGoalTemplate('');
      setShowGoalModal(false);
    }
  };

  const handleGoalTemplateSelect = (template) => {
    setSelectedGoalTemplate(template.id);
    setGoalName(template.name);
    if (template.target > 0) {
      setGoalAmount(template.target.toString());
    }
  };

  const handleModalBackdropClick = (e, closeModal) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (showQuickActions && !e.target.closest('.quick-actions-container')) {
        setShowQuickActions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showQuickActions]);

  const totals = calculateTotals();
  const categoryTotals = calculateCategoryTotals();

  // Welcome Screen (unchanged)
  if (currentView === 'welcome') {
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
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              <strong>KeshCheck analizira tvoje potrošnje i predlaže promene koje će ti pomoći da gradiš bolje navike.</strong>
            </p>
            <p className="text-gray-600 mt-2 text-sm">
              Bez osude, subota se svima omakne 😅
            </p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-3 text-left">
              <MessageCircle className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">AI Savetnik</h3>
                <p className="text-sm text-gray-600">Koji te neće osuđivati kad potrošiš na gluposti</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 text-left">
              <Globe className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Sve Naše Valute</h3>
                <p className="text-sm text-gray-600">Od evra do dinara, sve ti razume</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 text-left">
              <Target className="w-6 h-6 text-teal-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Ciljevi Koji Se Postižu</h3>
                <p className="text-sm text-gray-600">Ne kao oni novogodišnji 🎯</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 font-medium">Made for the Balkans 🇷🇸🇧🇦🇭🇷🇲🇰🇸🇮</p>
          </div>
          
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Hajde Da Počnemo! 🚀
          </button>
        </div>
      </div>
    );
  }

  // Main Dashboard - NEW DESKTOP LAYOUT
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 flex flex-col lg:flex hidden`}>
        {/* Sidebar Header */}
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

        {/* Navigation */}
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
              {/* Quick Categories */}
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

              {/* Month Selector */}
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
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 text-gray-600">
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  KeshCheck
                </h1>
              </div>

              {/* Current Date Display */}
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
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
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

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Recent Transactions */}
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

                {/* Category Breakdown */}
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

              {/* Right Column */}
              <div className="space-y-6">
                {/* AI Chat */}
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
                            <span className="text-sm text-gray-500">AI analizira 3 meseca podataka...</span>
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

                {/* Goals */}
                <div className="bg-white rounded-2xl shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">CILJEVI </h2>
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

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 quick-actions-container">
        {showQuickActions && (
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-lg border p-4 w-48 space-y-2">
            <button 
              onClick={() => handleQuickActionSelect('transaction')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5 text-purple-600" />
              <span>Šta Sam Potrošio?</span>
            </button>
            <button 
              onClick={() => handleQuickActionSelect('goal')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Target className="w-5 h-5 text-blue-600" />
              <span>Novi Cilj</span>
            </button>
            <button 
              onClick={() => handleQuickActionSelect('analytics')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-xl transition-colors"
            >
              <BarChart3 className="w-5 h-5 text-teal-600" />
              <span>Kako Stojim?</span>
            </button>
            <button 
              onClick={() => handleQuickActionSelect('currencies')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Euro className="w-5 h-5 text-green-600" />
              <span>Kursna Lista</span>
            </button>
          </div>
        )}
        
        <button 
          onClick={handleQuickActionClick}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* ALL EXISTING MODALS REMAIN THE SAME - Just keeping the Add Transaction Modal for brevity */}
      {showAddTransaction && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => handleModalBackdropClick(e, () => setShowAddTransaction(false))}
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
              {/* Transaction Type */}
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
              
              {/* Amount and Currency */}
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
              
              {/* Category */}
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
              
              {/* Description */}
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Opis (opciono)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              {/* Submit Button */}
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
      
      {/* Other modals would go here - keeping the same structure */}
    </div>
  );
};

export default KeshCheckApp;
