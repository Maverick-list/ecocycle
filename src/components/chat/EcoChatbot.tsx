import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeminiService, ChatMessage } from '../../services/geminiService';
import { AgentActionCard } from '../../services/ecoAgentService';
import { SpeechService } from '../../services/speechService';
import { EcocycleLogo } from '../brand/EcocycleLogo';
import { Icon } from '../ui/Icon';
import { useAuth } from '../../context/AuthContext';
import { wasteDepositService } from '../../services/wasteDepositService';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: 'Selamat datang di ECOCYCLE Desk (Agentic Advisory). Didukung arsitektur Gemini 2.5 Flash & EcoAgent Otonom, saya siap menganalisis material, menghitung reduksi emisi US EPA WARM v15, dan menerbitkan draf registrasi setoran langsung dalam 1 klik.',
    timestamp: 'Baru saja',
  },
];

const SUGGESTED_PROMPTS = [
  'Buatkan draf setoran 4 kg plastik di Menteng',
  'Berapa tarif komoditas sampah terpilah?',
  'Hitung reduksi karbon 10 kg kardus EPA WARM',
  'Di mana saja lokasi drop-point terdekat?',
];

export const EcoChatbot: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [hasCustomKey, setHasCustomKey] = useState<boolean>(false);
  const [confirmedDrafts, setConfirmedDrafts] = useState<Set<string>>(new Set());
  const [expandedTraces, setExpandedTraces] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
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

  const toggleTraceExpansion = (msgId: string) => {
    setExpandedTraces((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const handleExecuteAction = async (card: AgentActionCard) => {
    if (card.type === 'deposit_draft' && card.data) {
      const draft = card.data;
      if (confirmedDrafts.has(draft.draftId)) return;

      try {
        await wasteDepositService.submitDeposit(user?.uid || user?.id || null, {
          wasteType: draft.wasteType,
          weightKg: draft.weightKg,
          dropPoint: draft.dropPoint,
          notes: draft.notes || 'Dikonfirmasi via EcoAgent Desk',
        });

        setConfirmedDrafts((prev) => new Set(prev).add(draft.draftId));

        const confirmationMsg: ChatMessage = {
          id: `bot-conf-${Date.now()}`,
          sender: 'bot',
          text: `✅ Setoran berhasil dicatat ke Bank Sampah Digital Anda!\n\n• No. Registrasi: ${draft.manifestCode}\n• Komoditas: ${draft.weightKg} kg ${draft.wasteType}\n• Estimasi Nilai: Rp ${draft.estimatedValueIdr?.toLocaleString('id-ID')} (+${draft.estimatedPoints} EcoPoints)\n• Lokasi Drop-Point: ${draft.dropPoint}\n\nTransaksi telah tersinkronisasi dan dapat dilihat pada buku tabungan digital Anda di menu "Bank Sampah".`,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, confirmationMsg]);
        SpeechService.speak(`Setoran Anda berhasil dikonfirmasi dan dicatat ke buku tabungan digital.`);
      } catch (err) {
        console.error('Error confirming deposit:', err);
      }
    }
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
      const history = messages.slice(-4).map((m) => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.text }],
      }));

      // Generate autonomous Agentic response via Gemini 2.5 Flash + EcoAgent
      const result = await GeminiService.generateAgenticResponse(query, history);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: result.text,
        agentCalls: result.agentCalls,
        actionCard: result.actionCard,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Speak with Google Indonesian voice concurrently
      SpeechService.speak(result.text);
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
      {/* 1. Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleToggleOpen}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-[#062c1d]/90 backdrop-blur-xl border border-white/50 dark:border-emerald-500/30 text-xs font-extrabold text-[#062B1D] dark:text-emerald-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>EcoAgent Desk</span>
          </motion.button>
        )}

        <motion.button
          type="button"
          id="ecocycle-ai-trigger"
          onClick={handleToggleOpen}
          aria-label={isOpen ? 'Tutup Konsultan' : 'Buka Layanan Konsultasi Sirkular'}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center p-2 transition-all duration-300 shadow-2xl cursor-pointer ${
            isOpen
              ? 'bg-[#062B1D] text-white rotate-90 ring-4 ring-emerald-500/30'
              : 'bg-gradient-to-tr from-[#063321] via-[#006C48] to-[#10b981] hover:scale-108 active:scale-95 ring-4 ring-emerald-400/20'
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" />

          {isOpen ? (
            <Icon name="close" size={26} className="text-white" />
          ) : (
            <div className="relative flex items-center justify-center pointer-events-none">
              <EcocycleLogo size="sm" variant="dark" iconOnly={true} showTagline={false} />
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

      {/* 2. Floating Apple-Style Chatbot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[470px] h-[640px] max-h-[84vh] flex flex-col rounded-3xl bg-white/85 dark:bg-[#031d13]/95 backdrop-blur-3xl border border-white/60 dark:border-emerald-500/35 shadow-[0_30px_70px_-15px_rgba(0,30,15,0.5)] overflow-hidden select-none"
          >
            {/* Header: Logo, Status, Model & Controls */}
            <div className="relative px-4 py-3.5 border-b border-black/5 dark:border-emerald-500/20 flex items-center justify-between bg-white/60 dark:bg-black/30 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-sm p-1">
                  <EcocycleLogo size="sm" variant="auto" iconOnly={true} showTagline={false} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-display font-black text-xs sm:text-sm text-primary dark:text-white shrink-0">
                      ECOCYCLE Desk
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase shrink-0">
                      Gemini 2.5 Flash
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-teal-500/15 text-teal-600 dark:text-teal-400 font-extrabold uppercase shrink-0">
                      Agentic Active
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant dark:text-emerald-200/70 truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="truncate">{isSpeaking ? 'Membaca Suara Google...' : 'Autonomous Advisory Ready'}</span>
                    {isSpeaking && (
                      <span className="inline-flex items-center gap-0.5 ml-1 shrink-0">
                        <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-0.5 h-4 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-0.5 h-2 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleToggleMute}
                  title={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    isMuted
                      ? 'bg-black/10 dark:bg-white/10 text-outline'
                      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25'
                  }`}
                >
                  <Icon name={isMuted ? 'volume_off' : 'volume_up'} size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  title="Pengaturan Kunci Gemini"
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    showSettings || hasCustomKey
                      ? 'bg-emerald-500 text-white'
                      : 'bg-black/5 dark:bg-white/10 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Icon name="settings" size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Bersihkan Percakapan"
                  className="w-8 h-8 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/10 text-on-surface-variant hover:text-rose-500 transition-all cursor-pointer"
                >
                  <Icon name="refresh" size={16} />
                </button>

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

            {/* Optional Settings Drawer */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-secondary/10 dark:bg-[#072d1e] p-4 border-b border-secondary/20 text-xs space-y-2.5 overflow-hidden"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-secondary">Koneksi Gemini 2.5 Flash API</span>
                    <span className="text-[10px] text-outline">Maven JARVIS Architecture</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant dark:text-emerald-200/70 leading-relaxed">
                    Sistem otomatis menjalankan tool otonom secara deterministik. Anda dapat memasukkan custom Google Gemini API Key jika diinginkan.
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
                const isExpanded = Boolean(expandedTraces[msg.id]);

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full bg-emerald-500/15 dark:bg-[#062c1d] border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-sm p-1">
                        <EcocycleLogo size="sm" variant="auto" iconOnly={true} showTagline={false} />
                      </div>
                    )}

                    <div className="flex flex-col space-y-1.5 max-w-[88%]">
                      {/* Agent Tool Calling Badges */}
                      {!isUser && msg.agentCalls && msg.agentCalls.length > 0 && (
                        <div className="space-y-1">
                          <button
                            type="button"
                            onClick={() => toggleTraceExpansion(msg.id)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-[10px] font-bold cursor-pointer hover:bg-emerald-500/15 transition-all"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>⚡ EcoAgent: {msg.agentCalls.length} Platform Tools Dieksekusi</span>
                            <span className="text-[9px] opacity-60 ml-0.5">{isExpanded ? '▲ Sembunyikan' : '▼ Lihat Jejak'}</span>
                          </button>

                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="p-2.5 rounded-xl bg-black/5 dark:bg-[#02180e] border border-emerald-500/15 text-[10px] space-y-1.5 overflow-hidden"
                            >
                              {msg.agentCalls.map((call, idx) => (
                                <div key={idx} className="flex flex-col gap-0.5 pb-1 border-b border-black/5 dark:border-white/5 last:border-0 last:pb-0">
                                  <div className="flex items-center justify-between font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                    <span>⚙️ {call.tool}()</span>
                                    <span className="text-[9px] text-slate-400">({call.executionTimeMs}ms) ✓</span>
                                  </div>
                                  <p className="text-[10px] text-slate-600 dark:text-slate-300">{call.title}</p>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      )}

                      {/* Message Bubble with Apple Aesthetics */}
                      <div
                        className={`rounded-2xl px-4 py-3 leading-relaxed text-xs sm:text-sm ${
                          isUser
                            ? 'bg-gradient-to-r from-emerald-500 to-[#059669] text-white rounded-tr-xs shadow-md font-medium'
                            : 'bg-white/90 dark:bg-[#072a1c]/90 backdrop-blur-xl border border-white/60 dark:border-emerald-500/25 text-slate-800 dark:text-emerald-50 rounded-tl-xs shadow-sm font-normal'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                      </div>

                      {/* Interactive Action Card (e.g. 1-Click Deposit Draft Confirmation) */}
                      {!isUser && msg.actionCard && (
                        <div className="p-3.5 rounded-2xl glass-panel-elevated border border-emerald-500/35 bg-gradient-to-br from-emerald-500/15 via-surface/60 to-teal-500/15 dark:from-emerald-950/40 dark:to-teal-950/40 space-y-2.5 shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                              <Icon name="verified" size={14} className="text-emerald-500" />
                              <span>{msg.actionCard.title}</span>
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold uppercase">
                              Tervalidasi SNI
                            </span>
                          </div>

                          {msg.actionCard.type === 'deposit_draft' && (
                            <div className="space-y-2 text-xs">
                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div className="p-2 rounded-xl bg-white/60 dark:bg-black/30 border border-black/5 dark:border-white/5">
                                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Estimasi Nilai</span>
                                  <span className="font-extrabold text-primary dark:text-white">
                                    Rp {msg.actionCard.data.estimatedValueIdr?.toLocaleString('id-ID')}
                                  </span>
                                </div>
                                <div className="p-2 rounded-xl bg-white/60 dark:bg-black/30 border border-black/5 dark:border-white/5">
                                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Reward Poin</span>
                                  <span className="font-extrabold text-secondary">
                                    +{msg.actionCard.data.estimatedPoints} EcoPoints
                                  </span>
                                </div>
                              </div>

                              <div className="p-2 rounded-xl bg-white/60 dark:bg-black/30 border border-black/5 dark:border-white/5 text-[10px] space-y-0.5">
                                <span className="text-slate-500 dark:text-slate-400 block">Tujuan Drop-Point:</span>
                                <span className="font-bold text-slate-800 dark:text-slate-100">{msg.actionCard.data.dropPoint}</span>
                              </div>

                              {msg.actionCard.actionButton && (
                                <button
                                  type="button"
                                  onClick={() => handleExecuteAction(msg.actionCard!)}
                                  disabled={confirmedDrafts.has(msg.actionCard.data.draftId)}
                                  className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                                    confirmedDrafts.has(msg.actionCard.data.draftId)
                                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 cursor-default'
                                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md hover:scale-[1.01] active:scale-[0.98] cursor-pointer'
                                  }`}
                                >
                                  {confirmedDrafts.has(msg.actionCard.data.draftId) ? (
                                    <>
                                      <Icon name="check_circle" size={15} />
                                      <span>Tersimpan di Bank Sampah Anda!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Icon name="bolt" size={15} />
                                      <span>{msg.actionCard.actionButton.label}</span>
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Bubble Footer */}
                      <div
                        className={`flex items-center gap-2 text-[11px] text-slate-400 dark:text-emerald-400/70 px-1 pt-0.5 ${
                          isUser ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {!isUser && (
                          <>
                            <span className="opacity-40">•</span>
                            <button
                              type="button"
                              onClick={() => handleReplaySpeech(msg.text)}
                              title="Dengarkan Suara"
                              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1 cursor-pointer transition-colors font-medium"
                            >
                              <Icon name="volume_up" size={13} />
                              <span>Dengarkan</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Bot Loading Dots */}
              {isLoading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 dark:bg-[#062c1d] border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-sm p-1">
                    <EcocycleLogo size="sm" variant="auto" iconOnly={true} showTagline={false} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/80 dark:bg-[#072a1c]/80 backdrop-blur-md border border-white/40 dark:border-emerald-500/20 rounded-tl-xs shadow-sm flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="ml-1 text-[11px] text-slate-400">EcoAgent sedang menalar & mengeksekusi tools...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Pills */}
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

            {/* Input Bar */}
            <div className="p-3 border-t border-black/5 dark:border-emerald-500/20 bg-white/50 dark:bg-black/30 backdrop-blur-xl flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Perintahkan EcoAgent (contoh: 'Setorkan 4 kg kardus di Menteng')..."
                className="flex-1 h-11 px-4 rounded-full bg-white/80 dark:bg-[#052418]/80 border border-outline-variant/30 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-secondary text-primary dark:text-white placeholder:text-outline/70 shadow-inner"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#063321] via-[#006C48] to-[#10b981] text-white flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <Icon name="send" size={17} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
