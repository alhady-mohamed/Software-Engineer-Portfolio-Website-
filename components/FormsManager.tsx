import React, { useState, useEffect } from 'react';
import { FileText, LogOut, Search, ExternalLink, Layers, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { initAuth, googleSignIn, logout, getAccessToken } from '../firebaseAuth';
import { User } from 'firebase/auth';

/**
 * FormsManager Component
 * Allows the user to authenticate via Google, fetch a specific Google Form
 * using the Forms API by its ID, and view its details.
 */
const FormsManager: React.FC = () => {
  const [needsAuth, setNeedsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [formIdInput, setFormIdInput] = useState('');
  const [currentForm, setCurrentForm] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setUser(user);
        setToken(token);
        setNeedsAuth(false);
      },
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Failed to authenticate with Google.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setCurrentForm(null);
    setNeedsAuth(true);
  };

  const handleFetchForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !formIdInput.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setCurrentForm(null);
    
    // Extract ID from full URL if the user pastes a URL
    let extractedId = formIdInput.trim();
    if (extractedId.includes('forms/d/')) {
       const match = extractedId.match(/forms\/d\/([a-zA-Z0-9-_]+)/);
       if (match && match[1]) extractedId = match[1];
    }

    try {
      const res = await fetch(`https://forms.googleapis.com/v1/forms/${extractedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 403) throw new Error('Permission denied. Ensure you own this form or have edit access.');
        if (res.status === 404) throw new Error('Form not found. Check the ID and try again.');
        throw new Error('Failed to fetch the form data.');
      }
      const data = await res.json();
      setCurrentForm(data);
    } catch (err: any) {
      console.error('Error fetching form:', err);
      setError(err.message || 'An error occurred while fetching the form.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark relative overflow-hidden">
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-2 text-primary font-medium tracking-wider text-sm uppercase mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
             <FileText size={16} />
             <span>Google Forms API</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            View form <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Details</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Connect your Google account to fetch and inspect the structure of your Google Forms directly within your workspace without Drive API access.
          </p>
        </motion.div>

        {needsAuth ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center bg-slate-900/50 p-12 rounded-3xl border border-white/5 backdrop-blur-sm"
          >
             <h3 className="text-2xl font-bold text-white mb-4">Sign in required</h3>
             <p className="text-gray-400 text-center mb-8">
                Please sign in with Google to securely access your Workspace data. 
             </p>
             {error && <p className="text-red-400 mb-4">{error}</p>}
             
             <button
               onClick={handleLogin}
               disabled={isLoggingIn}
               className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-xl flex items-center gap-3 transition-all transform hover:scale-105 disabled:opacity-50"
             >
               <svg viewBox="0 0 48 48" className="w-6 h-6">
                 <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                 <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                 <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                 <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                 <path fill="none" d="M0 0h48v48H0z"></path>
               </svg>
               {isLoggingIn ? 'Signing in...' : 'Sign in with Google'}
             </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900/50 p-6 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
               <div className="flex items-center gap-4">
                 {user?.photoURL ? (
                    <img src={user.photoURL} alt="Profile avatar" className="w-12 h-12 rounded-full border-2 border-primary/20" referrerPolicy="no-referrer" />
                 ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">{user?.displayName?.charAt(0) || 'U'}</div>
                 )}
                 <div>
                   <h3 className="text-white font-bold text-lg">{user?.displayName}</h3>
                   <p className="text-gray-400 text-sm">{user?.email}</p>
                 </div>
               </div>
               <button 
                 onClick={handleLogout}
                 className="px-4 py-2 bg-white/5 hover:bg-red-500/10 text-gray-300 hover:text-red-400 border border-white/5 hover:border-red-500/20 rounded-xl flex items-center gap-2 font-medium transition-colors"
               >
                 <LogOut size={16} /> Sign out
               </button>
            </div>

            <form onSubmit={handleFetchForm} className="mb-10">
              <label htmlFor="formId" className="block text-sm font-medium text-gray-300 mb-2">Form ID or Link URL</label>
              <div className="flex flex-col sm:flex-row gap-4">
                 <input 
                   type="text" 
                   id="formId"
                   value={formIdInput}
                   onChange={e => setFormIdInput(e.target.value)}
                   placeholder="e.g. 1FAIpQLSf... or paste full link"
                   className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans"
                 />
                 <button 
                   type="submit"
                   disabled={!formIdInput.trim() || isLoading}
                   className="px-6 py-3 bg-primary text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-400 disabled:opacity-50 transition-all"
                 >
                    {isLoading ? <span className="animate-pulse">Loading...</span> : <><Search size={18} /> Fetch Form</>}
                 </button>
              </div>
              {error && <p className="text-red-400 mt-4 px-4 py-3 bg-red-400/10 rounded-xl border border-red-400/20 inline-block">{error}</p>}
            </form>

            <motion.div layout>
              {!currentForm && !isLoading && !error && (
                <div className="py-16 text-center bg-black/20 rounded-2xl border border-white/5 border-dashed">
                   <Layers className="text-gray-600 w-12 h-12 mx-auto mb-4" />
                   <h4 className="text-white font-medium text-lg mb-2">No Form Loaded</h4>
                   <p className="text-gray-400 max-w-md mx-auto">Enter a valid Google Form ID or link above to view its contents.</p>
                </div>
              )}

              {currentForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/40 p-6 md:p-8 rounded-2xl border border-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                     <div>
                       <h2 className="text-3xl font-bold text-white mb-3">{currentForm.info?.title || 'Untitled Form'}</h2>
                       {currentForm.info?.description && (
                         <p className="text-gray-400 whitespace-pre-wrap">{currentForm.info.description}</p>
                       )}
                     </div>
                     <a 
                        href={currentForm.responderUri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl flex items-center gap-2 font-medium shrink-0 transition-colors"
                     >
                        Open Form <ExternalLink size={16} />
                     </a>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-white mb-4 border-b border-white/10 pb-2">Questions ({currentForm.items?.length || 0})</h3>
                    {currentForm.items?.map((item: any, i: number) => {
                      const isQuestion = !!item.questionItem;
                      const qText = item.title || (isQuestion ? 'Untitled Question' : 'Untitled Section/Item');
                      return (
                        <div key={item.itemId || i} className="p-4 bg-slate-900/40 rounded-xl border border-white/5">
                          <div className="flex items-start gap-3">
                             <div className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-1 shrink-0">
                               {i + 1}
                             </div>
                             <div>
                               <p className="text-white font-medium mb-1">{qText}</p>
                               {item.description && <p className="text-sm text-gray-500 mb-2">{item.description}</p>}
                               {item.questionItem?.question?.required && (
                                  <span className="inline-flex items-center gap-1 text-xs text-secondary bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">
                                    <CheckCircle size={10} /> Required
                                  </span>
                               )}
                               {!isQuestion && <span className="text-xs text-gray-500 italic">Static block / Section</span>}
                             </div>
                          </div>
                        </div>
                      )
                    })}
                    {(!currentForm.items || currentForm.items.length === 0) && (
                       <p className="text-gray-500 italic p-4 text-center">This form has no items or questions.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FormsManager;

