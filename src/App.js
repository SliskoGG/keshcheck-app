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
  Sparkles
} from 'lucide-react';

const KeshCheckApp = () => {
  // Supabase configuration - Your actual project details
  const SUPABASE_URL = 'https://kwhupardradacmjrticp.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3aHVwYXJkcmFkYWNtanJ0aWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNzk1NjcsImV4cCI6MjA2MzY1NTU2N30.Y866C-FqiqJkcC5jAgU0ICoaYzpBfwpMZN6oogecJ7w';

  // Main state management
  const [currentView, setCurrentView] = useState('welcome');
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
      message: 'Eyyy! 👋 Ja sam tvoj AI drug za novac. Neću te pljuvati zbog onih 5 evra za kafu jutros, obećavam! Kako ti ide?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Data state
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'expense', amount: 15, currency: 'EUR', category: 'kaffe', description: 'Kaffe Zale', date: '23.05.2025' },
    { id: 2, type: 'expense', amount: 45, currency: 'EUR', category: 'food', description: 'Maxi', date: '22.05.2025' },
    { id: 3, type: 'income', amount: 800, currency: 'EUR', category: 'salary', description: 'Plata', date: '20.05.2025' },
    { id: 4, type: 'expense', amount: 30, currency: 'EUR', category: 'transport', description: 'NIS Petrol', date: '21.05.2025' }
  ]);
  
  const [goals, setGoals] = useState([
    { id: 1, name: 'Fond za Hitne Slučajeve', target: 1000, current: 250, deadline: '2025-12-31', currency: 'EUR' },
    { id: 2, name: 'Letovanje u Grčkoj', target: 800, current: 120, deadline: '2025-07-01', currency: 'EUR' }
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

  // Helper functions
  const formatCurrency = (amount, currencyCode) => {
    const currencyObj = currencies.find(c => c.code === currencyCode);
    return `${amount} ${currencyObj?.symbol || currencyCode}`;
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : ShoppingCart;
  };

  const calculateTotals = () => {
    const total = transactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - t.amount;
    }, 0);
    
    const thisMonth = transactions
      .filter(t => t.date.includes('05.2025'))
      .reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0);
    
    const thisWeek = transactions
      .filter(t => ['21.05.2025', '22.05.2025', '23.05.2025'].includes(t.date))
      .reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0);
    
    const today = transactions
      .filter(t => t.date === '23.05.2025')
      .reduce((sum, t) => t.type === 'income' ? sum + t.amount : sum - t.amount, 0);
    
    return { total, thisMonth, thisWeek, today };
  };

  // AI Chat function
  const callAIAdvisor = async (message) => {
    try {
      const totals = calculateTotals();
      const spendingData = {
        transactions,
        goals,
        totals
      };

      const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-advisor`, {
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
        // Use fallback message if provided
        return data.fallback || 'Ups! Nešto nije u redu sa mojom AI glavom 🤖 Pokušaj ponovo!';
      }

      return data.message;
    } catch (error) {
      console.error('AI call failed:', error);
      
      // Fallback to witty error messages
      const fallbackResponses = [
        'Opa! Internet me izdao... Možeš li da ponoviš? 😅',
        'Hm, čini mi se da sam se zaglavilo... Ajde ponovo! 🤖',
        'Error 404: Pametnost not found 😂 Pokušaj ponovo!',
        'Ups! Možda sam popio previše digitalnog kafe... ☕'
      ];
      
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  };

  // Event handlers
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
      
      setTransactions([newTransaction, ...transactions]);
      
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
      
      // Add user message immediately
      setChatMessages(prev => [...prev, {
        type: 'user',
        message: userMessage
      }]);
      
      // Clear input and show loading
      setChatInput('');
      setIsAiLoading(true);
      
      // Get AI response
      const aiResponse = await callAIAdvisor(userMessage);
      
      // Add AI response
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
      
      // Get AI response about the goal
      setIsAiLoading(true);
      const contextMessage = `Upravo sam postavio novi cilj: "${goalName}" za ${formatCurrency(goalAmount, currency)}`;
      const aiResponse = await callAIAdvisor(contextMessage);
      
      setChatMessages(prev => [...prev, {
        type: 'ai',
        message: aiResponse
      }]);
      setIsAiLoading(false);
      
      // Reset form
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

  // Close modals when clicking outside
  const handleModalBackdropClick = (e, closeModal) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Close quick actions when clicking outside
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

  // Welcome Screen
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
                <h3 className="font-semibold text-gray-800">Tvoj AI Drug</h3>
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

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              KeshCheck
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* TOP THIRD - Financial Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">UKUPNO</h3>
            <p className="text-2xl font-bold text-gray-800">{formatCurrency(totals.total, 'EUR')}</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12%</span>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 mb-2">OVAJ MESEC</h3>
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

        {/* MID THIRD - AI Trener */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <MessageCircle className="w-6 h-6 text-purple-600 mr-2" />
              Tvoj AI Drug 💬
            </h2>
          </div>
          
          <div className="p-6">
            <div className="h-64 overflow-y-auto space-y-4 mb-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${
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
                  <div className="max-w-xs px-4 py-2 rounded-2xl bg-gray-100 text-gray-800 flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500">AI razmišlja...</span>
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
                placeholder="Pitaj me bilo šta... ili se žali na račune 😅"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isAiLoading || !chatInput.trim()}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAiLoading ? '...' : 'Pošalji'}
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM THIRD - Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Transactions */}
          <div className="bg-white rounded-2xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">ŠTA SI RADIO/LA? 🤔</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => {
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

          {/* Right: Goals */}
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

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 quick-actions-container">
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

      {/* Add Transaction Modal */}
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
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-5 gap-2">
                {[5, 10, 20, 50, 100].map(quickAmount => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    {quickAmount}
                  </button>
                ))}
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

      {/* Add Goal Modal */}
      {showGoalModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => handleModalBackdropClick(e, () => setShowGoalModal(false))}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Hajde Da Postavimo Cilj! 🎯</h2>
              <button 
                onClick={() => setShowGoalModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Goal Templates */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Izaberi šablon:</label>
                <div className="grid grid-cols-1 gap-2">
                  {goalTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleGoalTemplateSelect(template)}
                      className={`p-3 text-left rounded-xl border transition-colors ${
                        selectedGoalTemplate === template.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-800">{template.name}</div>
                      <div className="text-sm text-gray-600">{template.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Goal Name */}
              <input
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Naziv cilja"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              {/* Goal Amount and Currency */}
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  placeholder="Ciljni iznos"
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
              
              {/* Deadline */}
              <input
                type="date"
                value={goalDeadline}
                onChange={(e) => setGoalDeadline(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              {/* Submit Button */}
              <button 
                onClick={handleAddGoal}
                disabled={!goalName || !goalAmount}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Kreiraj Cilj
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => handleModalBackdropClick(e, () => setShowAnalytics(false))}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tvoja Finansijska Analiza 📈</h2>
              <button 
                onClick={() => setShowAnalytics(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Monthly Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Mesečni Pregled - Maj 2025</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Ukupni Prihodi</p>
                    <p className="text-lg font-semibold text-green-600">€800</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ukupni Troškovi</p>
                    <p className="text-lg font-semibold text-red-600">€90</p>
                  </div>
                </div>
              </div>
              
              {/* Category Breakdown */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Troškovi po Kategorijama</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Hrana', amount: 45, color: 'bg-blue-500' },
                    { name: 'Transport', amount: 30, color: 'bg-green-500' },
                    { name: 'Kaffe', amount: 15, color: 'bg-yellow-500' }
                  ].map((cat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-12 text-sm text-gray-600">{cat.name}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className={`${cat.color} h-3 rounded-full`}
                          style={{ width: `${(cat.amount / 90) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-sm font-medium">€{cat.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AI Insights */}
              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="font-semibold text-purple-800 mb-3">Šta Tvoj AI Drug Misli 🤖</h3>
                <div className="space-y-2 text-sm text-purple-700">
                  <p>• Potrošio si €45 u Beogradu tokom vikenda. Nije loše, video sam i gore! 😅</p>
                  <p>• €15 na kafu ovaj mesec? Ma bravo! Možda ipak ne trebaš onaj aparat za kafu 😏</p>
                  <p>• Vikendom trošiš najviše - što je totalno normalno za Balkan. Subota je za život! 🎉</p>
                  <p>• Hajde da pokušamo sa €50 štednje mesečno? Ništa preterano, samo da vidiš kako ide</p>
                </div>
              </div>
              
              {/* Regional Comparison */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Kako Si U Odnosu Na Ostale? 📊</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-2">Tvoja potrošnja vs. ostali Beograđani:</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Ti: €90/mesec</span>
                    <span className="text-sm text-gray-600">Prosek: €120/mesec</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Troši 25% manje od proseka! Svaka čast! 🎉</p>
                  <p className="text-xs text-gray-500 mt-1">Možda možeš da poučiš ostale kako se to radi? 😎</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Currency Converter Modal */}
      {showCurrencyConverter && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={(e) => handleModalBackdropClick(e, () => setShowCurrencyConverter(false))}
        >
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Koliko Je To U...? 💱</h2>
              <button 
                onClick={() => setShowCurrencyConverter(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center text-gray-600">
                <p>Trenutni kursevi (ilustrativno):</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium">1 EUR</span>
                  <span className="text-gray-600">=</span>
                  <span className="font-medium">117.50 RSD</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium">1 EUR</span>
                  <span className="text-gray-600">=</span>
                  <span className="font-medium">1.96 BAM</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium">1 EUR</span>
                  <span className="text-gray-600">=</span>
                  <span className="font-medium">7.53 HRK</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="font-medium">1 EUR</span>
                  <span className="text-gray-600">=</span>
                  <span className="font-medium">61.45 MKD</span>
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-500 mt-4">
                Kursevi se ažuriraju u realnom vremenu
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeshCheckApp;
