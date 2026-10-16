import React, { useState, useMemo } from 'react';
import { useSiteData } from '../../src/context/SiteDataContext';
import { RBAC_PAGES_CATALOG } from '../../src/data/initialData';
import { SystemUser, SystemRole, AccountStatus, ActionLogType, SecurityEventType } from '../../types';
import {
  Users,
  Shield,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Lock,
  Unlock,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Edit3,
  Trash2,
  Eye,
  Clock,
  Activity,
  Download,
  Check,
  RefreshCw,
  Plus,
  Laptop,
  Globe,
  Sliders,
  ChevronDown,
  Info,
  X,
  ExternalLink,
  ShieldQuestion,
  UserCheck,
} from 'lucide-react';

export const AdminSecurityRoles: React.FC = () => {
  const {
    users,
    roles,
    auditLogs,
    securityAuditLogs,
    currentUser,
    setCurrentUser,
    addUser,
    updateUser,
    toggleUserLock,
    deleteUser,
    addRole,
    updateRole,
    cloneRole,
    toggleRoleLock,
    deleteRole,
    logAction,
    logSecurityEvent,
  } = useSiteData();

  // Top-level Navigation Tabs
  type MainTab = 'system_users' | 'powers_roles' | 'history_actions' | 'security_audit';
  const [activeTab, setActiveTab] = useState<MainTab>('system_users');

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ==============================================================
  // TAB 1: SYSTEM USERS STATE & LOGIC
  // ==============================================================
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | AccountStatus>('all');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');

  // Modals for Tab 1
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isViewUserModalOpen, setIsViewUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);

  // New User Form State
  const [newFullName, setNewFullName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRoleId, setNewRoleId] = useState<string>(roles[1]?.id || 'content_editor');
  const [newStatus, setNewStatus] = useState<AccountStatus>('active');
  const [newNotes, setNewNotes] = useState('');
  const [enableSuperAdminOverrides, setEnableSuperAdminOverrides] = useState(false);
  const [customOverrides, setCustomOverrides] = useState<Record<string, Record<string, boolean>>>({});
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.fullName.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        u.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
      const matchesStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
      const matchesRole = userRoleFilter === 'all' || u.roleId === userRoleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, userSearchQuery, userStatusFilter, userRoleFilter]);

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newUsername.trim() || !newEmail.trim()) {
      showToast('Fadlan buuxi magaca, username-ka, iyo email-ka.', 'error');
      return;
    }

    setIsSubmittingUser(true);
    try {
      const res = await addUser({
        fullName: newFullName.trim(),
        username: newUsername.trim().toLowerCase().replace(/\s+/g, '_'),
        email: newEmail.trim().toLowerCase(),
        roleId: newRoleId,
        status: newStatus,
        notes: newNotes.trim() || undefined,
        customOverrides: enableSuperAdminOverrides ? customOverrides : undefined,
      });

      if (res.success) {
        showToast(res.message || 'Isticmaalaha cusub si guul leh ayaa loo diiwaangeliyay!');
        setIsRegisterModalOpen(false);
        // Reset form
        setNewFullName('');
        setNewUsername('');
        setNewEmail('');
        setNewRoleId(roles[1]?.id || 'content_editor');
        setNewStatus('active');
        setNewNotes('');
        setEnableSuperAdminOverrides(false);
        setCustomOverrides({});
      } else {
        showToast(res.message || 'Khalad ayaa dhacay.', 'error');
      }
    } finally {
      setIsSubmittingUser(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setIsSubmittingUser(true);
    try {
      const res = await updateUser(selectedUser.id, {
        fullName: selectedUser.fullName,
        username: selectedUser.username,
        email: selectedUser.email,
        roleId: selectedUser.roleId,
        status: selectedUser.status,
        notes: selectedUser.notes,
        customOverrides: selectedUser.customOverrides,
      });

      if (res.success) {
        showToast(res.message || 'Xogta isticmaalaha waa la cusboonaysiiyay!');
        setIsEditUserModalOpen(false);
        setSelectedUser(null);
      } else {
        showToast(res.message || 'Khalad ayaa dhacay.', 'error');
      }
    } finally {
      setIsSubmittingUser(false);
    }
  };

  const handleToggleLock = async (u: SystemUser) => {
    const res = await toggleUserLock(u.id);
    if (res.success) {
      showToast(res.message || 'Heerka qufulka isticmaalaha waa la beddelay.');
    } else {
      showToast(res.message || 'Lama beddeli karo xaaladda.', 'error');
    }
  };

  const handleDeleteUser = async (u: SystemUser) => {
    if (window.confirm(`Ma hubtaa inaad tirtirto isticmaalaha @${u.username} (${u.fullName})?`)) {
      const res = await deleteUser(u.id);
      if (res.success) {
        showToast(res.message || 'Isticmaalaha waa la tirtiray.');
      } else {
        showToast(res.message || 'Lama tirtiri karo.', 'error');
      }
    }
  };

  // ==============================================================
  // TAB 2: POWERS & ROLES STATE & LOGIC (Capability Matrix)
  // ==============================================================
  const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[0]?.id || 'super_admin');
  const activeRole = useMemo(() => {
    return roles.find((r) => r.id === selectedRoleId) || roles[0];
  }, [roles, selectedRoleId]);

  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleColor, setNewRoleColor] = useState('#10b981');
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [cloneTargetName, setCloneTargetName] = useState('');

  // Local draft capability matrix for unsaved changes feedback
  const [pendingPermissions, setPendingPermissions] = useState<Record<string, Record<string, boolean>>>({});
  const [isRoleSaving, setIsRoleSaving] = useState(false);

  // Sync permissions when selected role changes
  React.useEffect(() => {
    if (activeRole) {
      setPendingPermissions(activeRole.permissions || {});
    }
  }, [activeRole?.id]);

  const hasUnsavedRoleChanges = useMemo(() => {
    if (!activeRole?.permissions) return false;
    return JSON.stringify(activeRole.permissions) !== JSON.stringify(pendingPermissions);
  }, [activeRole, pendingPermissions]);

  const toggleTabPermission = (pageId: string, tabId: string) => {
    if (activeRole?.isCoreLocked && activeRole.id === 'super_admin') {
      showToast('Doorka Super Admin wuxuu leeyahay awoodda oo dhan (Unrestricted Access) mana laga xidhi karo tab-yada.', 'info');
      return;
    }

    setPendingPermissions((prev) => {
      const pagePerms = prev[pageId] || {};
      const currentVal = Boolean(pagePerms[tabId]);
      return {
        ...prev,
        [pageId]: {
          ...pagePerms,
          [tabId]: !currentVal,
        },
      };
    });
  };

  const handleToggleAllForPage = (pageId: string, enable: boolean) => {
    if (activeRole?.isCoreLocked && activeRole.id === 'super_admin') return;
    const pageCatalog = RBAC_PAGES_CATALOG.find((p) => p.id === pageId);
    if (!pageCatalog) return;

    setPendingPermissions((prev) => {
      const pagePerms = { ...(prev[pageId] || {}) };
      pageCatalog.tabs.forEach((tab) => {
        pagePerms[tab.id] = enable;
      });
      return {
        ...prev,
        [pageId]: pagePerms,
      };
    });
  };

  const handleSaveRolePermissions = async () => {
    if (!activeRole) return;
    setIsRoleSaving(true);
    try {
      const res = await updateRole(activeRole.id, {
        permissions: pendingPermissions,
      });
      if (res.success) {
        showToast(res.message || 'Capability Matrix si guul leh ayaa loo kaydiyay!');
      } else {
        showToast(res.message || 'Khalad ayaa dhacay.', 'error');
      }
    } finally {
      setIsRoleSaving(false);
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) {
      showToast('Fadlan geli magaca doorka.', 'error');
      return;
    }

    // Default permissions copied from Content Editor or blank
    const basePermissions: Record<string, Record<string, boolean>> = {};
    RBAC_PAGES_CATALOG.forEach((page) => {
      basePermissions[page.id] = {};
      page.tabs.forEach((tab) => {
        basePermissions[page.id][tab.id] = false;
      });
    });

    const res = await addRole({
      name: newRoleName.trim(),
      description: newRoleDesc.trim() || 'Custom Enterprise Role Preset',
      isCoreLocked: false,
      color: newRoleColor,
      permissions: basePermissions,
    });

    if (res.success && res.id) {
      showToast(res.message || 'Doorka cusub waa la abuuray!');
      setIsCreateRoleModalOpen(false);
      setSelectedRoleId(res.id);
      setNewRoleName('');
      setNewRoleDesc('');
    } else {
      showToast(res.message || 'Lama abuuri karin.', 'error');
    }
  };

  const handleCloneRole = async () => {
    if (!activeRole) return;
    const res = await cloneRole(activeRole.id, cloneTargetName);
    if (res.success && res.id) {
      showToast(res.message || 'Nuqulka doorka waa la abuuray!');
      setIsCloneModalOpen(false);
      setCloneTargetName('');
      setSelectedRoleId(res.id);
    } else {
      showToast(res.message || 'Lama samayn karin nuqulka.', 'error');
    }
  };

  const handleToggleRoleLock = async (r: SystemRole) => {
    const res = await toggleRoleLock(r.id);
    if (res.success) {
      showToast(res.message || 'Xaaladda ilaalinta doorka waa la beddelay.');
    } else {
      showToast(res.message || 'Khalad ayaa dhacay.', 'error');
    }
  };

  const handleDeleteRole = async (r: SystemRole) => {
    if (window.confirm(`Ma hubtaa inaad tirtirto doorka "${r.name}"?`)) {
      const res = await deleteRole(r.id);
      if (res.success) {
        showToast(res.message || 'Doorka waa la tirtiray.');
        setSelectedRoleId(roles[0]?.id || 'super_admin');
      } else {
        showToast(res.message || 'Lama tirtiri karo.', 'error');
      }
    }
  };

  // ==============================================================
  // TAB 3: HISTORY ACTIONS STATE & LOGIC
  // ==============================================================
  const [historySearch, setHistorySearch] = useState('');
  const [historyActionType, setHistoryActionType] = useState<'all' | ActionLogType>('all');
  const [historyDateRange, setHistoryDateRange] = useState<'all' | 'today' | '7days' | '30days'>('all');

  const filteredHistory = useMemo(() => {
    const now = new Date().getTime();
    return auditLogs.filter((log) => {
      const matchesSearch =
        log.userName.toLowerCase().includes(historySearch.toLowerCase()) ||
        log.targetPage.toLowerCase().includes(historySearch.toLowerCase()) ||
        log.details.toLowerCase().includes(historySearch.toLowerCase()) ||
        (log.targetTab && log.targetTab.toLowerCase().includes(historySearch.toLowerCase()));

      const matchesType = historyActionType === 'all' || log.actionType === historyActionType;

      let matchesDate = true;
      if (historyDateRange !== 'all') {
        const logTime = new Date(log.timestamp).getTime();
        const diffHours = (now - logTime) / (1000 * 60 * 60);
        if (historyDateRange === 'today') matchesDate = diffHours <= 24;
        else if (historyDateRange === '7days') matchesDate = diffHours <= 24 * 7;
        else if (historyDateRange === '30days') matchesDate = diffHours <= 24 * 30;
      }

      return matchesSearch && matchesType && matchesDate;
    });
  }, [auditLogs, historySearch, historyActionType, historyDateRange]);

  const handleExportAuditJson = () => {
    const jsonStr = JSON.stringify(filteredHistory, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-history-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Warbixinta Audit Log waxaa loo soo dejiyay qaab JSON ah!');
  };

  // ==============================================================
  // TAB 4: SECURITY AUDIT STATE & LOGIC
  // ==============================================================
  const [secSearch, setSecSearch] = useState('');
  const [secEventType, setSecEventType] = useState<'all' | SecurityEventType>('all');
  const [secSeverity, setSecSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const filteredSecurityLogs = useMemo(() => {
    return securityAuditLogs.filter((log) => {
      const matchesSearch =
        (log.userName && log.userName.toLowerCase().includes(secSearch.toLowerCase())) ||
        log.ipAddress.toLowerCase().includes(secSearch.toLowerCase()) ||
        log.device.toLowerCase().includes(secSearch.toLowerCase()) ||
        log.details.toLowerCase().includes(secSearch.toLowerCase());

      const matchesType = secEventType === 'all' || log.eventType === secEventType;
      const matchesSeverity = secSeverity === 'all' || log.severity === secSeverity;

      return matchesSearch && matchesType && matchesSeverity;
    });
  }, [securityAuditLogs, secSearch, secEventType, secSeverity]);

  const handleTriggerSecurityTest = async () => {
    await logSecurityEvent({
      eventType: 'failed_login',
      userName: 'simulated_intruder',
      severity: 'medium',
      ipAddress: '203.0.113.19',
      device: 'Chrome Automated Scanner / Linux',
      details: 'Simulated brute-force detection fired from Admin Security Console test probe.',
    });
    showToast('Tijaabada Amniga (Simulated Security Event) si toos ah ayaa loogu daray Security Log-ga!');
  };

  // Quick switch of simulated active administrator (for immediate permission testing in UI)
  const handleSwitchSimulatedUser = (u: SystemUser) => {
    setCurrentUser(u);
    showToast(`Hadda waxaad u muuqataa sidii @${u.username} (${u.fullName}) oo leh doorka "${roles.find((r) => r.id === u.roleId)?.name || u.roleId}".`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold backdrop-blur-md border animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toastMessage.type === 'error'
              ? 'bg-red-950/90 text-red-200 border-red-500/40'
              : toastMessage.type === 'info'
              ? 'bg-sky-950/90 text-sky-200 border-sky-500/40'
              : 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40'
          }`}
        >
          {toastMessage.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-red-400" />
          ) : toastMessage.type === 'info' ? (
            <Info className="w-4 h-4 text-sky-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          )}
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Security & Access Governance (RBAC)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Enterprise Ready
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Maamulka isticmaaleyaasha, jaangooyada doorarka (Role Presets), Capability Matrix-ka bog-ilaa-tab (Role → Page → Tabs), iyo xisaabinta amniga ee tooska ah.
          </p>
        </div>

        {/* Current Active User Simulation Selector */}
        <div className="flex items-center gap-3 bg-slate-950/80 p-2.5 rounded-xl border border-white/10 self-start lg:self-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs">
              {currentUser?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span>{currentUser?.fullName || 'Super Admin'}</span>
                <span className="text-[10px] text-amber-400 font-mono">(@{currentUser?.username || 'admin'})</span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <span>Doorka hadda:</span>
                <span className="font-semibold text-slate-300">
                  {roles.find((r) => r.id === currentUser?.roleId)?.name || currentUser?.roleId}
                </span>
              </div>
            </div>
          </div>

          <div className="border-l border-white/10 pl-2">
            <select
              value={currentUser?.id || ''}
              onChange={(e) => {
                const target = users.find((u) => u.id === e.target.value);
                if (target) handleSwitchSimulatedUser(target);
              }}
              title="Beddel akoonka aad ku tijaabinayso awoodaha"
              className="bg-slate-900 text-slate-200 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono focus:outline-none focus:border-primary cursor-pointer"
            >
              <option disabled value="">Tijaabi Door Kale...</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.fullName} ({roles.find((r) => r.id === u.roleId)?.name || u.roleId})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main 4 Enterprise Tabs Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-white/5 backdrop-blur-sm">
        <button
          onClick={() => setActiveTab('system_users')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'system_users'
              ? 'bg-slate-800 text-white shadow-md border border-white/10'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Users className={`w-4 h-4 ${activeTab === 'system_users' ? 'text-primary' : ''}`} />
          <span>1. System Users</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-slate-300">
            {users.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('powers_roles')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'powers_roles'
              ? 'bg-slate-800 text-white shadow-md border border-white/10'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Sliders className={`w-4 h-4 ${activeTab === 'powers_roles' ? 'text-emerald-400' : ''}`} />
          <span>2. Powers & Roles</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-slate-300">
            {roles.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('history_actions')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'history_actions'
              ? 'bg-slate-800 text-white shadow-md border border-white/10'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <Clock className={`w-4 h-4 ${activeTab === 'history_actions' ? 'text-sky-400' : ''}`} />
          <span>3. History Actions</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-slate-300">
            {auditLogs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('security_audit')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'security_audit'
              ? 'bg-slate-800 text-white shadow-md border border-white/10'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <ShieldAlert className={`w-4 h-4 ${activeTab === 'security_audit' ? 'text-amber-400' : ''}`} />
          <span>4. Security Audit</span>
          <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {securityAuditLogs.length}
          </span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* TAB 1: SYSTEM USERS VIEW                                       */}
      {/* ============================================================== */}
      {activeTab === 'system_users' && (
        <div className="space-y-4">
          {/* Controls Bar: Search, Filters, and Register Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
            <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Raadi magaca, @username, ama email..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all"
                />
                {userSearchQuery && (
                  <button
                    onClick={() => setUserSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value as any)}
                  className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Dhammaan Xaaladaha (All Status)</option>
                  <option value="active">Active (Firfircoon)</option>
                  <option value="locked">Locked (Xidhan)</option>
                  <option value="disabled">Disabled (Hawlgab)</option>
                </select>

                {/* Role Filter */}
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Dhammaan Doorarka (All Roles)</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action: Register New User */}
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-dark text-xs font-bold transition-all shadow-md shadow-primary/10 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Diiwaangeli Isticmaale Cusub</span>
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Full Name & Profile</th>
                    <th className="py-3.5 px-4 font-semibold">Username</th>
                    <th className="py-3.5 px-4 font-semibold">Email</th>
                    <th className="py-3.5 px-4 font-semibold">Role Preset (Read-Only)</th>
                    <th className="py-3.5 px-4 font-semibold">Account Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm font-medium">Lama helin isticmaale u dhigma shaandhadaada.</p>
                        <p className="text-xs text-slate-500 mt-1">Isku day inaad nadiifiso raadinta ama filter-ka.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const userRole = roles.find((r) => r.id === u.roleId);
                      const isSuperAdminUser = u.roleId === 'super_admin';

                      return (
                        <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                          {/* Full Name & Avatar */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase border"
                                style={{
                                  backgroundColor: `${userRole?.color || '#3b82f6'}20`,
                                  borderColor: `${userRole?.color || '#3b82f6'}50`,
                                  color: userRole?.color || '#3b82f6',
                                }}
                              >
                                {u.fullName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-white flex items-center gap-1.5">
                                  <span>{u.fullName}</span>
                                  {isSuperAdminUser && (
                                    <span className="p-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px]" title="Super Admin">
                                      <Shield className="w-3 h-3" />
                                    </span>
                                  )}
                                  {u.customOverrides && Object.keys(u.customOverrides).length > 0 && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30" title="Has super-admin custom overrides">
                                      Override
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-slate-500 font-mono">
                                  ID: {u.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Username */}
                          <td className="py-3.5 px-4 font-mono text-slate-300">
                            @{u.username}
                          </td>

                          {/* Email */}
                          <td className="py-3.5 px-4 font-mono text-slate-400">
                            {u.email}
                          </td>

                          {/* Role Preset (Read-Only Badge) */}
                          <td className="py-3.5 px-4">
                            <span
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border"
                              style={{
                                backgroundColor: `${userRole?.color || '#3b82f6'}15`,
                                borderColor: `${userRole?.color || '#3b82f6'}40`,
                                color: userRole?.color || '#3b82f6',
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: userRole?.color || '#3b82f6' }}
                              />
                              {userRole?.name || u.roleId}
                            </span>
                          </td>

                          {/* Account Status */}
                          <td className="py-3.5 px-4">
                            {u.status === 'active' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active
                              </span>
                            )}
                            {u.status === 'locked' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <Lock className="w-3 h-3 text-amber-400" />
                                Locked
                              </span>
                            )}
                            {u.status === 'disabled' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                                <XCircle className="w-3 h-3 text-red-400" />
                                Disabled
                              </span>
                            )}
                          </td>

                          {/* Actions: View, Edit, Lock/Unlock, Delete */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1">
                              {/* View User */}
                              <button
                                onClick={() => {
                                  setSelectedUser(u);
                                  setIsViewUserModalOpen(true);
                                }}
                                title="View User Details"
                                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* Edit User */}
                              <button
                                onClick={() => {
                                  setSelectedUser({ ...u });
                                  setIsEditUserModalOpen(true);
                                }}
                                title="Edit User"
                                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              {/* Lock / Unlock Toggle */}
                              <button
                                onClick={() => handleToggleLock(u)}
                                disabled={isSuperAdminUser}
                                title={u.status === 'locked' ? 'Fur Isticmaalaha (Unlock)' : 'Xidh Isticmaalaha (Lock)'}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  isSuperAdminUser
                                    ? 'opacity-30 cursor-not-allowed text-slate-600'
                                    : u.status === 'locked'
                                    ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400'
                                    : 'hover:bg-slate-800 text-slate-400 hover:text-amber-400'
                                }`}
                              >
                                {u.status === 'locked' ? (
                                  <Unlock className="w-4 h-4" />
                                ) : (
                                  <Lock className="w-4 h-4" />
                                )}
                              </button>

                              {/* Delete User */}
                              <button
                                onClick={() => handleDeleteUser(u)}
                                disabled={isSuperAdminUser}
                                title={isSuperAdminUser ? 'Lama tirtiri karo Super Admin' : 'Tirtir Isticmaalaha'}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  isSuperAdminUser
                                    ? 'opacity-30 cursor-not-allowed text-slate-600'
                                    : 'hover:bg-red-500/10 text-slate-400 hover:text-red-400'
                                }`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Summary */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 bg-slate-950/40 border-t border-white/5 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span>Wadarta: <strong className="text-white">{users.length}</strong> isticmaale</span>
                <span>•</span>
                <span>Active: <strong className="text-emerald-400">{users.filter((u) => u.status === 'active').length}</strong></span>
                <span>•</span>
                <span>Locked: <strong className="text-amber-400">{users.filter((u) => u.status === 'locked').length}</strong></span>
                <span>•</span>
                <span>Disabled: <strong className="text-red-400">{users.filter((u) => u.status === 'disabled').length}</strong></span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-2 sm:mt-0">
                Cloud Firestore & Local Synchronized
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: POWERS & ROLES VIEW (Capability Matrix)                  */}
      {/* ============================================================== */}
      {activeTab === 'powers_roles' && (
        <div className="space-y-6">
          {/* Role Presets Cards Row */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Role Presets ({roles.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Dooro door si aad u aragto una habayso Capability Matrix-ka bog-ilaa-tab (Role → Page → Tabs).
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCreateRoleModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/5 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-primary" />
                  <span>Abuur Door Cusub</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {roles.map((r) => {
                const isSelected = r.id === selectedRoleId;
                const assignedCount = users.filter((u) => u.roleId === r.id).length;

                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRoleId(r.id)}
                    className={`relative p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-slate-800/90 shadow-lg border-primary/50 ring-1 ring-primary/40'
                        : 'bg-slate-900/60 hover:bg-slate-800/50 border-white/5'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shadow-sm"
                          style={{ backgroundColor: r.color }}
                        />
                        <h4 className="font-bold text-white text-sm">{r.name}</h4>
                      </div>

                      <div className="flex items-center gap-1">
                        {r.isCoreLocked && (
                          <span
                            title="Core System Role - Protected"
                            className="p-1 rounded bg-amber-500/10 text-amber-400 text-[10px]"
                          >
                            <Lock className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-3 min-h-[32px]">
                      {r.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                      <span className="text-slate-400">
                        Isticmaaleyaal: <strong className="text-white font-mono">{assignedCount}</strong>
                      </span>

                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${r.color}15`,
                          color: r.color,
                        }}
                      >
                        {isSelected ? 'Active Selection' : 'Select Matrix'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Role Capability Matrix Console */}
          {activeRole && (
            <div className="bg-slate-900/60 rounded-2xl border border-white/5 p-5 space-y-6 backdrop-blur-sm">
              {/* Matrix Header & Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: activeRole.color }}
                    />
                    <h2 className="text-lg font-bold text-white">
                      Capability Matrix: {activeRole.name}
                    </h2>
                    {activeRole.isCoreLocked ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Core Role Locked
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Custom Role Editable
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    Awoodaha doorkani waxay si toos ah u xakameeyaan tab-yada ka muuqanaya dashboard-ka. Tab-yada la xidho (Disabled) gebi ahaanba waa la qariyaa oo lama geli karo.
                  </p>
                </div>

                {/* Role Operational Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Clone Role Button */}
                  <button
                    onClick={() => {
                      setCloneTargetName(`${activeRole.name} (Nuqul)`);
                      setIsCloneModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/5 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-sky-400" />
                    <span>Clone Role</span>
                  </button>

                  {/* Lock / Unlock Toggle Button */}
                  {activeRole.id !== 'super_admin' && (
                    <button
                      onClick={() => handleToggleRoleLock(activeRole)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/5 transition-all cursor-pointer"
                    >
                      {activeRole.isCoreLocked ? (
                        <>
                          <Unlock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Unlock Role</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Lock Core Role</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Delete Role Button (only if not core locked) */}
                  {!activeRole.isCoreLocked && activeRole.id !== 'super_admin' && (
                    <button
                      onClick={() => handleDeleteRole(activeRole)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Tirtir Doorka</span>
                    </button>
                  )}

                  {/* Save Matrix Button */}
                  <button
                    onClick={handleSaveRolePermissions}
                    disabled={isRoleSaving || !hasUnsavedRoleChanges}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                      hasUnsavedRoleChanges
                        ? 'bg-primary hover:bg-primary/90 text-dark animate-pulse shadow-primary/20'
                        : 'bg-slate-800 text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {isRoleSaving ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    <span>{hasUnsavedRoleChanges ? 'Keydi Isbeddellada Matrix-ka' : 'Waa La Kaydiyay'}</span>
                  </button>
                </div>
              </div>

              {/* Capability Matrix Pages & Tabs List */}
              <div className="space-y-5">
                {RBAC_PAGES_CATALOG.map((page) => {
                  const pagePermissions = pendingPermissions[page.id] || {};
                  const enabledCount = page.tabs.filter((t) => Boolean(pagePermissions[t.id])).length;
                  const allEnabled = enabledCount === page.tabs.length;

                  return (
                    <div
                      key={page.id}
                      className="bg-slate-950/60 rounded-2xl border border-white/5 p-4 space-y-3"
                    >
                      {/* Page Row Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                            {page.path}
                          </span>
                          <h3 className="font-bold text-white text-sm">
                            {page.name}
                          </h3>
                        </div>

                        {/* Quick Page Batch Toggles */}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400 text-[11px]">
                            {enabledCount}/{page.tabs.length} Tabs Allowed
                          </span>
                          {activeRole.id !== 'super_admin' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleToggleAllForPage(page.id, true)}
                                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 hover:text-white transition-colors"
                              >
                                Enable All
                              </button>
                              <button
                                type="button"
                                onClick={() => handleToggleAllForPage(page.id, false)}
                                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-400 hover:text-red-400 transition-colors"
                              >
                                Disable All
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Tabs Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                        {page.tabs.map((tab) => {
                          const isEnabled = Boolean(pagePermissions[tab.id]);
                          const isSuperAdmin = activeRole.id === 'super_admin';

                          return (
                            <div
                              key={tab.id}
                              onClick={() => !isSuperAdmin && toggleTabPermission(page.id, tab.id)}
                              className={`p-3 rounded-xl border flex items-start justify-between gap-3 transition-all ${
                                isSuperAdmin
                                  ? 'bg-slate-900/40 border-emerald-500/20 cursor-default'
                                  : isEnabled
                                  ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50 cursor-pointer'
                                  : 'bg-slate-900/30 border-white/5 hover:border-white/10 opacity-70 cursor-pointer'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                                  <h4 className="font-semibold text-xs text-white">
                                    {tab.name}
                                  </h4>
                                </div>
                                <p className="text-[11px] text-slate-400 line-clamp-2">
                                  {tab.description}
                                </p>
                              </div>

                              {/* Interactive Toggle Switch */}
                              <div className="flex-shrink-0 pt-0.5">
                                <button
                                  type="button"
                                  disabled={isSuperAdmin}
                                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    isEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                                  } ${isSuperAdmin ? 'opacity-80 cursor-not-allowed' : ''}`}
                                >
                                  <span
                                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                      isEnabled ? 'translate-x-4' : 'translate-x-0'
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: HISTORY ACTIONS VIEW (Audit Log)                        */}
      {/* ============================================================== */}
      {activeTab === 'history_actions' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
            <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Raadi isticmaalaha, bogga, ama faahfaahinta..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all"
                />
              </div>

              {/* Action Type Filter */}
              <select
                value={historyActionType}
                onChange={(e) => setHistoryActionType(e.target.value as any)}
                className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="all">Dhammaan Falalka (All Action Types)</option>
                <option value="create">Create (Abuurid)</option>
                <option value="update">Update (Wax Ka Beddel)</option>
                <option value="delete">Delete (Tirtirid)</option>
                <option value="login">Login (Soo Gelid)</option>
                <option value="permission_change">Permission Change (Awoodaha)</option>
              </select>

              {/* Date Range Filter */}
              <select
                value={historyDateRange}
                onChange={(e) => setHistoryDateRange(e.target.value as any)}
                className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="all">Dhammaan Taariikhaha (All Time)</option>
                <option value="today">24-kii Saac ee Ugu Dambeeyay (Today)</option>
                <option value="7days">7-dii Maalmood ee Ugu Dambeeyay</option>
                <option value="30days">30-kii Maalmood ee Ugu Dambeeyay</option>
              </select>
            </div>

            {/* Export JSON Button */}
            <button
              onClick={handleExportAuditJson}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/5 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-primary" />
              <span>Dhoofi Audit Log (JSON)</span>
            </button>
          </div>

          {/* Audit Log Table */}
          <div className="bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                    <th className="py-3.5 px-4 font-semibold">User</th>
                    <th className="py-3.5 px-4 font-semibold">Action Type</th>
                    <th className="py-3.5 px-4 font-semibold">Affected Page / Tab</th>
                    <th className="py-3.5 px-4 font-semibold">Details</th>
                    <th className="py-3.5 px-4 font-semibold">IP & Device</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm font-medium">Lama helin wax log ah oo u dhigma baadhitaankaaga.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map((log) => {
                      const dateObj = new Date(log.timestamp);
                      const formattedDate = dateObj.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      });
                      const formattedTime = dateObj.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      });

                      return (
                        <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                          {/* Timestamp */}
                          <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                            <div className="text-white font-medium">{formattedTime}</div>
                            <div className="text-[10px] text-slate-500">{formattedDate}</div>
                          </td>

                          {/* User */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-semibold text-white">{log.userName}</div>
                            <span className="text-[10px] font-mono text-slate-500">{log.userRole}</span>
                          </td>

                          {/* Action Type Badge */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {log.actionType === 'create' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                CREATE
                              </span>
                            )}
                            {log.actionType === 'update' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                                UPDATE
                              </span>
                            )}
                            {log.actionType === 'delete' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                                DELETE
                              </span>
                            )}
                            {log.actionType === 'login' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                LOGIN
                              </span>
                            )}
                            {log.actionType === 'permission_change' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                PERMISSION
                              </span>
                            )}
                          </td>

                          {/* Affected Page / Tab */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-medium text-slate-200">{log.targetPage}</div>
                            {log.targetTab && (
                              <div className="text-[11px] font-mono text-slate-400">
                                ↳ {log.targetTab}
                              </div>
                            )}
                          </td>

                          {/* Details */}
                          <td className="py-3.5 px-4 text-slate-300 max-w-xs break-words">
                            {log.details}
                          </td>

                          {/* IP & Device */}
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                            <div>{log.ipAddress || '127.0.0.1'}</div>
                            <div className="text-[10px] text-slate-500">{log.deviceInfo || 'System'}</div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Read-Only Banner Notice */}
            <div className="p-3 bg-slate-950/60 border-t border-white/5 text-center text-xs text-slate-400 font-mono">
              🔒 Read-Only History Audit Trail · All events are cryptographically hashed and unalterable.
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: SECURITY AUDIT VIEW                                     */}
      {/* ============================================================== */}
      {activeTab === 'security_audit' && (
        <div className="space-y-4">
          {/* Security Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5">
              <span className="text-xs text-slate-400 font-mono">Total Security Events</span>
              <div className="text-2xl font-bold text-white font-mono mt-1">
                {securityAuditLogs.length}
              </div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5">
              <span className="text-xs text-amber-400 font-mono">Failed Logins</span>
              <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
                {securityAuditLogs.filter((s) => s.eventType === 'failed_login').length}
              </div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5">
              <span className="text-xs text-red-400 font-mono">Account Locks</span>
              <div className="text-2xl font-bold text-red-400 font-mono mt-1">
                {securityAuditLogs.filter((s) => s.eventType === 'account_lock').length}
              </div>
            </div>
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5">
              <span className="text-xs text-sky-400 font-mono">Role Escalations</span>
              <div className="text-2xl font-bold text-sky-400 font-mono mt-1">
                {securityAuditLogs.filter((s) => s.eventType === 'role_change' || s.eventType === 'permission_escalation').length}
              </div>
            </div>
          </div>

          {/* Filter Bar & Test Security Probe */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-2xl border border-white/5">
            <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Raadi IP, User, ama faahfaahinta weerarka..."
                  value={secSearch}
                  onChange={(e) => setSecSearch(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all"
                />
              </div>

              {/* Event Type Filter */}
              <select
                value={secEventType}
                onChange={(e) => setSecEventType(e.target.value as any)}
                className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="all">Dhammaan Noocyada Dhacdooyinka</option>
                <option value="failed_login">Failed Logins</option>
                <option value="role_change">Role Changes</option>
                <option value="permission_escalation">Permission Escalations</option>
                <option value="account_lock">Account Locks</option>
              </select>

              {/* Severity Filter */}
              <select
                value={secSeverity}
                onChange={(e) => setSecSeverity(e.target.value as any)}
                className="bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="all">Dhammaan Heerarka (Severity)</option>
                <option value="critical">Critical (Aad u Khatar ah)</option>
                <option value="high">High (Khatar)</option>
                <option value="medium">Medium (Dhexdhexaad)</option>
                <option value="low">Low (Caadi)</option>
              </select>
            </div>

            <button
              onClick={handleTriggerSecurityTest}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/20 transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Tijaabi Security Probe</span>
            </button>
          </div>

          {/* Security Table */}
          <div className="bg-slate-900/60 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                    <th className="py-3.5 px-4 font-semibold">Event Type</th>
                    <th className="py-3.5 px-4 font-semibold">Target / User</th>
                    <th className="py-3.5 px-4 font-semibold">Severity</th>
                    <th className="py-3.5 px-4 font-semibold">IP Address & Device</th>
                    <th className="py-3.5 px-4 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {filteredSecurityLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-emerald-400 opacity-60" />
                        <p className="text-sm font-medium">Nidaamku waa nabad! Lama helin digniino amni oo u dhigma filter-ka.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredSecurityLogs.map((log) => {
                      const dateObj = new Date(log.timestamp);
                      const formattedTime = dateObj.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      });
                      const formattedDate = dateObj.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      });

                      return (
                        <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                          {/* Timestamp */}
                          <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                            <div className="text-white font-medium">{formattedTime}</div>
                            <div className="text-[10px] text-slate-500">{formattedDate}</div>
                          </td>

                          {/* Event Type */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-mono text-slate-200 font-semibold">
                              {log.eventType.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>

                          {/* Target / User */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="font-semibold text-white">
                              {log.userName || log.userId || 'Anonymous / Unknown'}
                            </div>
                          </td>

                          {/* Severity */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {log.severity === 'critical' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                                CRITICAL
                              </span>
                            )}
                            {log.severity === 'high' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                HIGH
                              </span>
                            )}
                            {log.severity === 'medium' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                                MEDIUM
                              </span>
                            )}
                            {log.severity === 'low' && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
                                LOW
                              </span>
                            )}
                          </td>

                          {/* IP & Device */}
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                            <div className="font-semibold">{log.ipAddress}</div>
                            <div className="text-[10px] text-slate-500">{log.device}</div>
                          </td>

                          {/* Details */}
                          <td className="py-3.5 px-4 text-slate-300 max-w-sm">
                            {log.details}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-950/60 border-t border-white/5 text-center text-xs text-slate-400 font-mono">
              🛡️ Read-Only Security Audit Log · Monitored for automated brute-force attacks and privilege escalation.
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: REGISTER NEW USER                                       */}
      {/* ============================================================== */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Diiwaangeli Isticmaale Cusub</h3>
                  <p className="text-xs text-slate-400">Assign a Role Preset and automatically inherit all permissions.</p>
                </div>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Magaca oo Dhammaystiran (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liban Ahmed"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Username *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. liban_ahmed"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. liban@agency.co"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Role Preset Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Assign Role Preset *
                  </label>
                  <select
                    value={newRoleId}
                    onChange={(e) => setNewRoleId(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary cursor-pointer"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Dhammaan ogolaanshaha doorkan si toos ah ayaa loo siinayaa isticmaalaha.
                  </p>
                </div>

                {/* Account Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Account Status *
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as AccountStatus)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="active">Active (Firfircoon)</option>
                    <option value="locked">Locked (Xidhan)</option>
                    <option value="disabled">Disabled (Hawlgab)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Notes / Description (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer / Reviewer"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              {/* Optional Super-Admin Privilege Overrides */}
              <div className="pt-2 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableSuperAdminOverrides}
                    onChange={(e) => setEnableSuperAdminOverrides(e.target.checked)}
                    className="rounded border-white/20 text-primary focus:ring-0"
                  />
                  <span className="text-xs font-semibold text-slate-200">
                    Oggolow Super-Admin Privilege Overrides (Custom Tab Access)
                  </span>
                </label>
                <p className="text-[11px] text-slate-400 mt-1 pl-6">
                  Ku dar awoodo dheeraad ah oo gaar u ah isticmaalahan oo ka baxsan doorkiisa caadiga ah.
                </p>

                {enableSuperAdminOverrides && (
                  <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-white/10 space-y-3 max-h-48 overflow-y-auto">
                    {RBAC_PAGES_CATALOG.map((p) => (
                      <div key={p.id} className="space-y-1.5">
                        <div className="text-[11px] font-bold text-slate-300">{p.name}</div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {p.tabs.map((t) => {
                            const isChecked = Boolean(customOverrides[p.id]?.[t.id]);
                            return (
                              <label
                                key={t.id}
                                className="flex items-center gap-1.5 text-[10px] text-slate-300 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    const val = e.target.checked;
                                    setCustomOverrides((prev) => ({
                                      ...prev,
                                      [p.id]: {
                                        ...(prev[p.id] || {}),
                                        [t.id]: val,
                                      },
                                    }));
                                  }}
                                  className="rounded border-white/20 text-primary"
                                />
                                <span className="truncate">{t.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Ka Noqo
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingUser}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-dark text-xs font-bold flex items-center gap-2"
                >
                  {isSubmittingUser && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Diiwaangeli Isticmaalaha</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: EDIT USER                                               */}
      {/* ============================================================== */}
      {isEditUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Wax ka Beddel Isticmaalaha</h3>
                  <p className="text-xs text-slate-400">Editing @{selectedUser.username}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditUserModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Magaca oo Dhammaystiran (Full Name)
                </label>
                <input
                  type="text"
                  required
                  value={selectedUser.fullName}
                  onChange={(e) => setSelectedUser({ ...selectedUser, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedUser.username}
                    onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Role Preset
                  </label>
                  <select
                    disabled={selectedUser.roleId === 'super_admin'}
                    value={selectedUser.roleId}
                    onChange={(e) => setSelectedUser({ ...selectedUser, roleId: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Account Status
                  </label>
                  <select
                    disabled={selectedUser.roleId === 'super_admin'}
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value as AccountStatus })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-primary disabled:opacity-50 cursor-pointer"
                  >
                    <option value="active">Active</option>
                    <option value="locked">Locked</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Notes
                </label>
                <input
                  type="text"
                  value={selectedUser.notes || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Ka Noqo
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingUser}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-dark text-xs font-bold flex items-center gap-2"
                >
                  {isSubmittingUser && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Kaydi Isbeddellada</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: VIEW USER DETAILS                                       */}
      {/* ============================================================== */}
      {isViewUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary text-base">
                  {selectedUser.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedUser.fullName}</h3>
                  <p className="text-xs text-slate-400 font-mono">@{selectedUser.username} · {selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsViewUserModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 font-mono text-[10px] block mb-1">ROLE PRESET</span>
                <span className="font-bold text-white">
                  {roles.find((r) => r.id === selectedUser.roleId)?.name || selectedUser.roleId}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 font-mono text-[10px] block mb-1">ACCOUNT STATUS</span>
                <span className="font-bold capitalize text-white">{selectedUser.status}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 font-mono text-[10px] block mb-1">LAST LOGIN IP</span>
                <span className="font-mono text-slate-300">{selectedUser.lastLoginIp || '197.231.18.42'}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 font-mono text-[10px] block mb-1">CREATED AT</span>
                <span className="font-mono text-slate-300">
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {selectedUser.notes && (
              <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 text-xs text-slate-300">
                <span className="text-slate-500 font-mono text-[10px] block mb-1">NOTES</span>
                {selectedUser.notes}
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-white/10">
              <button
                onClick={() => setIsViewUserModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Xidh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: CREATE ROLE PRESET                                      */}
      {/* ============================================================== */}
      {isCreateRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Abuur Role Preset Cusub</h3>
              </div>
              <button onClick={() => setIsCreateRoleModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Magaca Doorka (Role Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead QA / Reviewer"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Faahfaahinta Doorka (Description)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Access to test cases, project showcase reviews, and inquiries."
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Midabka Astaanta (Badge Color)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={newRoleColor}
                    onChange={(e) => setNewRoleColor(e.target.value)}
                    className="w-10 h-10 rounded-lg bg-transparent border-0 cursor-pointer"
                  />
                  <span className="font-mono text-xs text-slate-300">{newRoleColor}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCreateRoleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Ka Noqo
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-dark text-xs font-bold"
                >
                  Abuur Doorka
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: CLONE ROLE PRESET                                       */}
      {/* ============================================================== */}
      {isCloneModalOpen && activeRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Copy className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Nuqul Ka Samee Doorka (Clone Role)</h3>
              </div>
              <button onClick={() => setIsCloneModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Waxaad nuqul ka samaynaysaa doorka <strong className="text-white">{activeRole.name}</strong> iyo dhammaan awoodihiisa Capability Matrix-ka.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Magaca Doorka Cusub
              </label>
              <input
                type="text"
                required
                value={cloneTargetName}
                onChange={(e) => setCloneTargetName(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsCloneModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Ka Noqo
              </button>
              <button
                type="button"
                onClick={handleCloneRole}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold"
              >
                Abuur Nuqulka
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
