import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Search, AlertTriangle, CheckCircle, XCircle, Zap } from 'lucide-react';

const TruthGuardApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [showPassword, setShowPassword] = useState(false);

  // Main app state
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const analyzeText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const score = Math.random();
      const isFake = score < 0.5;

      setResult({
        verdict: isFake ? 'Fake News Detected' : 'Likely Authentic',
        confidence: Math.round(score * 100),
        isFake,
        details: [
          { label: 'Source Credibility', score: Math.round(Math.random() * 100) },
          { label: 'Language Analysis', score: Math.round(Math.random() * 100) },
          { label: 'Fact Verification', score: Math.round(Math.random() * 100) },
          { label: 'Context Check', score: Math.round(Math.random() * 100) }
        ]
      });

      setLoading(false);
    }, 2000);
  };

  // LOGIN / SIGNUP PAGE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">TruthGuard</h1>
            <p className="text-gray-600">AI-Powered Fake News Detection</p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">

            {/* Tabs */}
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  !isLogin ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="John Doe"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleAuthSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // MAIN APP PAGE
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TruthGuard
            </h1>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 text-sm text-gray-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-12">

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the text you want to verify here..."
            className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl"
          />

          <div className="flex justify-between mt-4">
            <p className="text-sm text-gray-500">{text.length} characters</p>

            <button
              onClick={analyzeText}
              disabled={!text.trim() || loading}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold ${
                !text.trim() || loading
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              }`}
            >
              {loading ? (
                <>
                  <Zap className="w-5 h-5 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze Text
                </>
              )}
            </button>
          </div>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8">

            <div className="flex items-start gap-4 mb-6">
              {result.isFake ? (
                <div className="bg-red-100 p-3 rounded-xl">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              ) : (
                <div className="bg-green-100 p-3 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              )}

              <div>
                <h3 className={`text-2xl font-bold ${
                  result.isFake ? 'text-red-600' : 'text-green-600'
                }`}>
                  {result.verdict}
                </h3>
                <p className="text-gray-600">
                  Confidence Score: <strong>{result.confidence}%</strong>
                </p>
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Analysis Breakdown
            </h4>

            {result.details.map((detail, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>{detail.label}</span>
                  <span className="font-semibold">{detail.score}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`
                      h-2 rounded-full transition-all duration-1000
                      ${
                        detail.score >= 70
                          ? 'bg-green-500'
                          : detail.score >= 40
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }
                    `}
                    style={{ width: `${detail.score}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> AI analysis may not be 100% accurate. Always verify with trusted sources.
              </p>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};

export default TruthGuardApp;
