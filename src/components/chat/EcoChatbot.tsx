import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeminiService, ChatMessage } from '../../services/geminiService';
import { SpeechService } from '../../services/speechService';
import { EcocycleLogo } from '../brand/EcocycleLogo';
import { Icon } from '../ui/Icon';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: 'Halo! Saya ECOCYCLE AI, asisten cerdas sirkular Anda. Tanyakan apa saja seputar tarif 6 material sampah, alur setor mandiri, sains reduksi karbon US EPA WARM v15, atau hub drop-point terdekat.',
    timestamp: 'Baru saja',
  },
];

const SUGGESTED_PROMPTS = [
  'Berapa tarif sampah plastik & kardus?',
  'Bagaimana alur setor sampah mandiri?',
  'Jelaskan rumus reduksi karbon EPA WARM',
  'Di mana saja lokasi drop-point resmi?',
];

export const EcoChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [hasCustomKey, setHasCustomKey] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Listen to speech synthesis state
    const unsubscribe = SpeechService.addListener((speaking) => {
      setIsSpeaking(speaking);
    });

    setHasCustomKey(GeminiService.hasApiKey());

    return () => {
      unsubscribe();
      SpeechService.stop();
    };
  }, []);

  useEffect(() => {
    // Auto scroll to bottom of chat
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleToggleOpen = () => {
    if (isOpen) {
      SpeechService.stop();
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  const handleToggleMute = () => {
    const muted = SpeechService.toggleMute();
    setIsMuted(muted);
  };

  const handleSaveApiKey = () => {
    GeminiService.setCustomApiKey(apiKeyInput);
    setHasCustomKey(GeminiService.hasApiKey());
    setShowSettings(false);
    setApiKeyInput('');
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.slice(-4).map((m) => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.text }],
      }));

      // Generate response from Gemini API / local intelligence engine
      const responseText = await GeminiService.generateResponse(query, history);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Speak with Google Indonesian voice concurrently as text is presented
      SpeechService.speak(responseText);
    } catch (err) {
      console.error('Chatbot error:', err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'Mohon maaf, sistem sedang memproses data. Silakan coba kembali sesaat lagi.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReplaySpeech = (text: string) => {
    SpeechService.speak(text);
  };

  const handleClearChat = () => {
    SpeechService.stop();
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* 1. Floating Trigger Button with Website Logo & Equalizer Glow */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Floating Tooltip Pill */}
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleToggleOpen}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-[#062c1d]/90 backdrop-blur-xl border border-white/50 dark:border-emerald-500/30 text-xs font-extrabold text-[#062B1D] dark:text-emerald-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>Tanya AI ECOCYCLE</span>
          </motion.button>
        )}

        {/* Main Circular Floating Orb */}
        <motion.button
          type="button"
          id="ecocycle-ai-trigger"
          onClick={handleToggleOpen}
          aria-label={isOpen ? 'Tutup Asisten AI' : 'Buka Asisten AI ECOCYCLE'}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-2 transition-all duration-300 shadow-2xl cursor-pointer ${
            isOpen
              ? 'bg-[#062B1D] text-white rotate-90 ring-4 ring-emerald-500/30'
              : 'bg-gradient-to-tr from-[#063321] via-[#006C48] to-[#10b981] hover:scale-108 active:scale-95 ring-4 ring-emerald-400/20'
          }`}
        >
          {/* Animated circular aura */}
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" />

          {isOpen ? (
            <Icon name="close" size={26} className="text-white" />
          ) : (
            <div className="relative flex items-center justify-center pointer-events-none">
              <EcocycleLogo size="sm" variant="dark" showTagline={false} />
              {/* Voice active badge */}
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
              )}
            </div>
          )}
        </motion.button>
      </div>

      {/* 2. Apple visionOS Translucent Glass Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[450px] h-[620px] max-h-[82vh] flex flex-col rounded-3xl bg-white/80 dark:bg-[#031d13]/90 backdrop-blur-3xl border border-white/60 dark:border-emerald-500/35 shadow-[0_30px_70px_-15px_rgba(0,30,15,0.5)] overflow-hidden select-none"
          >
            {/* Header: Logo, Status, Audio Wave & Actions */}
            <div className="relative px-5 py-4 border-b border-black/5 dark:border-emerald-500/20 flex items-center justify-between bg-white/40 dark:bg-black/20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-xl bg-white/60 dark:bg-[#062c1d] border border-white/40 dark:border-emerald-500/30 shadow-sm">
                  <EcocycleLogo size="sm" variant="auto" showTagline={false} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-sm text-primary dark:text-white">
                      ECOCYCLE AI
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-secondary/15 text-secondary font-extrabold uppercase">
                      Gemini
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant dark:text-emerald-200/70">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{isSpeaking ? 'Sedang Berbicara...' : 'Suara Google Aktif'}</span>
                    {/* Real-time audio wave equalizer */}
                    {isSpeaking && (
                      <span className="inline-flex items-center gap-0.5 ml-1">
                        <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-0.5 h-4 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-0.5 h-2 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1.5">
                {/* Voice Mute / Unmute */}
                <button
                  type="button"
                  onClick={handleToggleMute}
                  title={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isMuted
                      ? 'bg-black/10 dark:bg-white/10 text-outline'
                      : 'bg-secondary/15 text-secondary hover:bg-secondary/25'
                  }`}
                >
                  <Icon name={isMuted ? 'volume_off' : 'volume_up'} size={16} />
                </button>

                {/* Settings / API Key */}
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  title="Pengaturan Kunci Gemini"
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    showSettings || hasCustomKey
                      ? 'bg-secondary text-white'
                      : 'bg-black/5 dark:bg-white/10 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Icon name="settings" size={16} />
                </button>

                {/* Reset Conversation */}
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Bersihkan Percakapan"
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/10 text-on-surface-variant hover:text-error transition-all cursor-pointer"
                >
                  <Icon name="refresh" size={16} />
                </button>

                {/* Minimize / Close */}
                <button
                  type="button"
                  onClick={handleToggleOpen}
                  title="Tutup Chat"
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/10 text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            </div>

            {/* Optional Settings Drawer for Custom Gemini Key */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-secondary/10 dark:bg-[#072d1e] p-4 border-b border-secondary/20 text-xs space-y-2.5 overflow-hidden"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-secondary">Kunci API Google Gemini (Opsional)</span>
                    <span className="text-[10px] text-outline">v2.8 / 1.5 Flash</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant dark:text-emerald-200/70 leading-relaxed">
                    Masukkan API Key Gemini Anda untuk memproses inferensi AI langsung ke Google Cloud. Jika kosong, asisten tetap berfungsi dengan basis pengetahuan lokal ECOCYCLE.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="AIzaSy..."
                      className="flex-1 h-9 px-3 rounded-lg bg-white dark:bg-[#042015] border border-outline-variant/30 text-xs outline-none focus:ring-2 focus:ring-secondary text-on-surface dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={handleSaveApiKey}
                      className="h-9 px-3.5 rounded-lg bg-secondary text-white font-bold text-xs cursor-pointer hover:bg-secondary/90 transition-all active:scale-95"
                    >
                      Simpan
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Messages Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* Bot Avatar */}
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-white dark:bg-[#062c1d] border border-white/50 dark:border-emerald-500/30 flex items-center justify-center shrink-0 shadow-sm p-0.5">
                        <EcocycleLogo size="sm" variant="auto" showTagline={false} />
                      </div>
                    )}

                    <div className="flex flex-col space-y-1 max-w-[85%]">
                      {/* Bubble with Apple Style Aesthetics */}
                      <div
                        className={`rounded-2xl px-4 py-3 leading-relaxed text-xs sm:text-sm ${
                          isUser
                            ? 'bg-gradient-to-r from-emerald-500 to-[#059669] text-white rounded-tr-xs shadow-md font-medium'
                            : 'bg-white/85 dark:bg-[#072a1c]/85 backdrop-blur-xl border border-white/60 dark:border-emerald-500/20 text-on-surface dark:text-emerald-50 rounded-tl-xs shadow-sm font-normal'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>

                      {/* Bubble Footer: Timestamp & Re-play Voice Button */}
                      <div
                        className={`flex items-center gap-2 text-[10px] text-outline px-1 ${
                          isUser ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => handleReplaySpeech(msg.text)}
                            title="Dengarkan Suara"
                            className="hover:text-secondary flex items-center gap-0.5 cursor-pointer transition-colors"
                          >
                            <Icon name="volume_up" size={12} />
                            <span>Dengarkan</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Bot Loading Dots */}
              {isLoading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white dark:bg-[#062c1d] border border-white/50 dark:border-emerald-500/30 flex items-center justify-center shrink-0 shadow-sm p-0.5">
                    <EcocycleLogo size="sm" variant="auto" showTagline={false} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/80 dark:bg-[#072a1c]/80 backdrop-blur-md border border-white/40 dark:border-emerald-500/20 rounded-tl-xs shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Pills (Horizontal scrollable chips) */}
            <div className="px-4 py-2 border-t border-black/5 dark:border-emerald-500/15 overflow-x-auto flex items-center gap-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-semibold glass-pill text-on-surface-variant dark:text-emerald-200/80 hover:text-secondary hover:border-secondary/40 transition-all cursor-pointer shrink-0 active:scale-95"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar: Translucent Apple Pill with Send CTA */}
            <div className="p-3 border-t border-black/5 dark:border-emerald-500/20 bg-white/50 dark:bg-black/30 backdrop-blur-xl flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanyakan apapun ke AI ECOCYCLE..."
                className="flex-1 h-11 px-4 rounded-2xl bg-white/90 dark:bg-[#052216]/90 border border-outline-variant/25 dark:border-emerald-500/25 text-xs sm:text-sm text-on-surface dark:text-white placeholder:text-outline outline-none focus:ring-2 focus:ring-secondary/50 shadow-inner transition-all"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                aria-label="Kirim Pesan"
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  inputText.trim() && !isLoading
                    ? 'bg-gradient-to-tr from-emerald-600 to-[#10b981] text-white hover:scale-105 active:scale-95 shadow-emerald-500/30'
                    : 'bg-black/10 dark:bg-white/10 text-outline cursor-not-allowed'
                }`}
              >
                <Icon name="send" size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
