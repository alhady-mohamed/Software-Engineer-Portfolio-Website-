# Enterprise RBAC & Security Management System

A production-grade Role-Based Access Control (RBAC), User Administration, Capability Matrix, and Security Audit system seamlessly integrated into Mohamed Alhady's Portfolio Admin Dashboard.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your clarification responses, this system is integrated into your Admin Dashboard under **"Security & Access Control"** (`/admin/users-roles`). It uses portfolio and agency role presets (**Super Admin**, **Content Editor**, **Project Manager**, and **Client / Reviewer**) and persists data directly to **Google Cloud Firestore** with an offline local storage backup.

- **Confirmed Location**: Integrated inside Admin Dashboard as `/admin/users-roles` with direct navigation in the admin sidebar.
- **Confirmed Role Presets**:
  - `Super Admin`: Unrestricted system access, role locking, privilege elevation.
  - `Content Editor`: Projects showcase, timeline milestones, and appearance styling.
  - `Project Manager`: Testimonials moderation, contact messages, and project scheduling.
  - `Client / Reviewer`: Read-only access to drafts, proposals, and project analytics.
- **Confirmed Persistence**: Cloud Firestore collections (`system_users`, `system_roles`, `audit_logs`, `security_audit_logs`) synchronized with `SiteDataContext`.

---

## 1. Overview & Core Concept

### What It Delivers
A unified enterprise governance console with 4 high-density operational tabs:
1. **System Users**: Complete user directory, account lifecycle (Active / Locked / Disabled), role inheritance, and super-admin privilege overrides.
2. **Powers & Roles**: Capability Matrix enabling granular Page-to-Tab access rules (`Role → Page → Tabs`). Disabled tabs are hidden from unauthorized roles, backed by route guards.
3. **History Actions**: Filterable, searchable audit trail logging user mutations (Create, Update, Delete, Login, Permission Change).
4. **Security Audit**: High-priority security log tracking failed authentication attempts, role modifications, permission escalations, and device/IP metadata.

### Target Audience & Value
- **Mohamed Alhady (Super Admin)**: Complete sovereignty over who can edit portfolio projects, review private client inquiries, or change live branding.
- **Collaborators & Clients**: Granted scoped access to specific operational modules without compromising sensitive Firebase credentials, system logs, or administrative controls.

---

## 2. User Experience & Visual Design

### Visual Identity & Theme
- **Surface Elevation**: High-density obsidian dark palette (`#090D16` and `#0F172A`) with subtle 1px slate borders (`border-white/10`).
- **Accent Signals**:
  - Emerald Green (`#10B981`): Active accounts, granted permissions, nominal audit states.
  - Amber Gold (`#F59E0B`): Locked accounts, warning alerts, role overrides.
  - Crimson Red (`#EF4444`): Disabled accounts, security escalations, failed logins.
  - Primary Brand Yellow (`#FACC15`): Super Admin badges and active tabs.
- **Tabular Figures**: Monospace timestamps and tabular numerals (`tabular-nums`) for clean vertical log alignment.
- **Anti-Slop Restraint**: Zero decorative candy pills; all metadata displayed with clean inline text separators (`·`), high-contrast icons, and functional interactive controls.

### Tab Breakdown & Key Flows

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ADMIN SECURITY & GOVERNANCE                           │
│  [ Users (4) ]   [ Powers & Roles (4) ]   [ History Log ]   [ Security ]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TAB 1: SYSTEM USERS                                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ 🔍 Search users...    [ Status Filter ▾ ]    [ + Register New User ]  │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │ Name             Username     Email            Role        Status     │  │
│  │ Mohamed Alhady   @alhady      admin@domain     Super Admin ● Active   │  │
│  │ Sarah Jenkins    @sjenkins    editor@domain    Editor      ● Active   │  │
│  │ Omar K.          @omark       client@brand     Client      ⊘ Locked   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  TAB 2: CAPABILITY MATRIX (Role → Page → Tabs)                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Selected Role: [ Content Editor ▾ ]        [ Clone Role ]  [ Lock ]   │  │
│  ├───────────────────────────────────────────────────────────────────────┤  │
│  │ Page: Projects Showcase (/admin/projects)                             │  │
│  │   ├── Tab: All Projects List        [ ENABLED ]                       │  │
│  │   ├── Tab: Create / Edit Form       [ ENABLED ]                       │  │
│  │   └── Tab: Category Manager         [ DISABLED - HIDDEN ]             │  │
│  │ Page: Appearance Settings (/admin/appearance)                         │  │
│  │   ├── Tab: Hero & Branding          [ ENABLED ]                       │  │
│  │   └── Tab: Security & DB Settings   [ DISABLED - HIDDEN ]             │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Hierarchical Permission Model (`Role → Page → Tab`)
- **Chosen Approach**: Tab-level access flags stored in an explicit permissions dictionary `{ [pageId]: { [tabId]: boolean } }`.
- **Why**: Allows fine-grained access without breaking standard routing. If a tab is disabled, it is cleanly excluded from the navigation bar and denied if directly requested.
- **Alternatives Considered**: Global wildcard strings (e.g. `projects:write`). Passed over because the prompt explicitly mandates Page → Tab capability matrix representation.

### Decision 2: Cloud Firestore with Offline Local Fallback
- **Chosen Approach**: Users, roles, and logs are synchronized to Firestore collections with transparent local fallback when working offline.
- **Why**: Guarantees zero downtime while persisting user permissions across devices and browser sessions.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION STATE                                 │
│                                                                             │
│   Firestore DB ◄────► SiteDataContext ◄────► AdminAuthContext               │
│   (/system_users)     (Settings, Roles)     (Current Active User)           │
│   (/system_roles)                               │                           │
│   (/audit_logs)                                 │                           │
│                                                 ▼                           │
│                                       RolePermissionGuard                   │
│                                                 │                           │
│                    ┌────────────────────────────┴─────────────────────┐     │
│                    ▼                                                  ▼     │
│         Authorized View (Render Tabs)                      Access Denied    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Schema

#### 1. System User Entity (`SystemUser`)
```typescript
export interface SystemUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  roleId: string; // References SystemRole.id
  status: 'active' | 'locked' | 'disabled';
  customOverrides?: Record<string, Record<string, boolean>>; // Optional super-admin override
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt?: string;
  lastLoginIp?: string;
}
```

#### 2. System Role Preset (`SystemRole`)
```typescript
export interface SystemRole {
  id: string;
  name: string;
  description: string;
  isCoreLocked: boolean; // Super Admin protected core roles cannot be deleted
  color: string;
  permissions: {
    [pageId: string]: {
      [tabId: string]: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}
```

#### 3. Audit Log Entry (`AuditLogItem`)
```typescript
export interface AuditLogItem {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  actionType: 'create' | 'update' | 'delete' | 'login' | 'permission_change';
  targetPage: string;
  targetTab?: string;
  details: string;
  deviceInfo?: string;
  ipAddress?: string;
}
```

#### 4. Security Audit Log (`SecurityAuditItem`)
```typescript
export interface SecurityAuditItem {
  id: string;
  timestamp: string;
  eventType: 'failed_login' | 'role_change' | 'permission_escalation' | 'account_lock';
  userId?: string;
  userName?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  device: string;
  details: string;
}
```

---

## 5. Execution Steps

1. **Types & Schema**: Define `SystemUser`, `SystemRole`, `AuditLogItem`, and `SecurityAuditItem` in `types.ts`.
2. **Initial Data**: Seed initial core roles (**Super Admin**, **Content Editor**, **Project Manager**, **Client / Reviewer**) and initial admin user in `src/data/initialData.ts`.
3. **Context Store**: Add user and role CRUD actions + audit logging helpers to `SiteDataContext.tsx` with Firestore live sync.
4. **Management Component**: Build `components/admin/AdminSecurityRoles.tsx` with all 4 functional tabs:
   - Tab 1: User listing, search, status toggles, user registration modal with role selector and super-admin overrides.
   - Tab 2: Role Preset cards, Capability Matrix with Page-to-Tab interactive toggle switches, clone role, and core role locking.
   - Tab 3: History Actions filterable data table (by user, action type, date range) with export option.
   - Tab 4: Security Audit timeline monitoring failed attempts, escalations, and device fingerprints.
5. **Route & Navigation**: Register `/admin/users-roles` in `App.tsx` and add a high-priority "Security & Roles" menu item in `AdminLayout.tsx`.
6. **Enforcement Guard**: Implement `RolePermissionGuard` to enforce tab visibility and return a refined "Access Denied" view for restricted routes.
