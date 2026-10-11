# Qorshaha Hirgelinta: Admin Dashboard & CMS (Supabase)

Qorshahani wuxuu faahfaahinayaa dhismaha nidaam dhammaystiran oo **Admin Dashboard (Content Management System - CMS)** ah oo loogu talagalay websaytkaaga. Nidaamkan wuxuu ku xirnaan doonaa **Supabase** (Authentication & PostgreSQL Database), isagoo kuu oggolaanaya inaad si toos ah oo fudud uga maamusho dhammaan xogta websaytka adigoon koodh taaban.

---

## 1. Dulmar Guud & Ujeeddada Nidaamka (Overview)

Nidaamka CMS-ku wuxuu bixinayaa maamul toos ah oo loogu talagalay:
1. **Mashaariicda & Sawirradooda (Projects Showcase CRUD):** Ku dar, wax ka beddel, tirtir, geli sawirro, faahfaahin buuxda, teknoolojiyada la isticmaalay, iyo xiriirinta GitHub/Live Demo.
2. **Waayo-aragnimada & Waxbarashada (Experience & Education Timeline):** Maamul taariikhdaada xirfadeed (Software Engineering, jaamacadaha, shaqooyinkii hore, shahaadooyinka).
3. **Marag-furka Macaamiisha (Client Testimonials):** Maamul dib-u-eegisyada macaamiisha, qiimeynta xiddigaha (star ratings), iyo sawirrada qofka wax amaanay.
4. **Sanduuqa Farriimaha (Contact Inquiries Inbox):** Dhammaan farriimaha dadku kasoo diraan qaybta Contact-ka toos ayay usoo galayaan dashboard-ka iyadoo lagu arkayo xaaladda (Cusub/La Akhriyey), taariikhda, iyo faahfaahinta.

Waxaa kaloo jira **Demo/Fallback Mode** xariif ah oo u shaqaynaya xataa haddii furayaasha Supabase aan weli la gelin, si aad isla markiiba ugu tijaabiso dashboard-ka browser-kaaga!

---

## 2. Naqshadda Keydka Xogta Supabase (Database Schema & SQL)

Waxaan diyaarinaynaa SQL scripts-ka tooska loogu shubo Supabase SQL Editor:

```sql
-- 1. Jadwalka Mashaariicda (Projects Table)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  gallery_urls TEXT[] DEFAULT '{}',
  tech_stack TEXT[] NOT NULL,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  metrics JSONB DEFAULT '{}'::jsonb,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Jadwalka Waayo-aragnimada & Waxbarashada (Timeline Table)
CREATE TABLE IF NOT EXISTS public.timelines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT CHECK (type IN ('education', 'experience')) NOT NULL,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Jadwalka Marag-furka (Testimonials Table)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  company TEXT,
  avatar_url TEXT,
  rating INT DEFAULT 5,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Jadwalka Farriimaha Xiriirka (Inquiries / Messages Table)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

---

## 3. Qaab-dhismeedka Bogagga & Shaashadaha (Architecture & Pages)

### A. Waddooyinka Cusub (New Routing):
- `/admin/login` – Bogga gelitaanka ee sirta ah (Supabase Email/Password login ama One-Click Admin Master Key).
- `/admin` – Xarunta guud (Dashboard Overview: Stats, tirada mashaariicda, farriimaha cusub, hawlaha degdegga ah).
- `/admin/projects` – Maamulka mashaariicda (Liis, shaandheyn, ku-dar/wax-ka-beddel modal leh sawir preview).
- `/admin/timeline` – Maamulka taariikhda xirfadeed iyo waxbarashada (Degree, shaqooyin, sanado).
- `/admin/testimonials` – Maamulka faallooyinka macaamiisha (Darajooyinka xiddigaha, magacyada, xaaladda).
- `/admin/messages` – Sanduuqa farriimaha soo dhacay (Inbox leh shaandheyn Akhriyey/Maan-akhrin, tirtirid, iyo reply).
- `/admin/settings` – Meesha lagu xirayo Supabase URL & Anon Key haddii aad doonayso inaad toos browser-ka uga beddesho!

### B. Ilaalinta Amniga (Protected Route Guard):
- Haddii qofku uusan soo galin `admin`, waxaa toos loogu celinayaa `/admin/login`.
- Session token-ka waxa lagu xafidayaa hab sugan.
- Waxaa jira badhan "Log Out" oo ku dhex yaal Dashboard-ka.

### C. Xiriirka Frontend-ka Guud (Public Sync):
- Bogga weyn (`/`, `/about`, `/projects`) wuxuu si toos ah u akhrin doonaa xogta Supabase marka ay jirto xiriir, haddii kalena wuxuu si dabiici ah u isticmaalayaa xogtii asalka ahayd ee `constants.ts` iyadoo wax cilad ah ama shaashad bannaan aysan dhacayn.

---

## 4. Master Prompt-ka Diyaarka ah ee AI Studio (Copy & Paste / Execution Prompt)

Haddii aad rabto inaad prompt-kan toos u siiso Google AI Studio ama aad halkan kaga sii waddo adigoo riixaya **Proceed**, waa kan prompt-ka oo dhammaystiran:

```text
Build a production-grade Admin Dashboard and CMS for this developer portfolio website using Supabase for Authentication and Data Storage, with a seamless zero-friction local fallback:

1. DEPENDENCIES & BACKEND SETUP:
   - Install `@supabase/supabase-js`.
   - Create `src/lib/supabase.ts` configured with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, with localStorage settings fallback so the user can easily paste their Supabase credentials directly from the Admin Settings tab without rebuilding.
   - Include sample SQL schema file `src/lib/schema.sql` ready to be copied into Supabase SQL editor.
   - If Supabase is not connected or in offline mode, smoothly fall back to a rich localStorage-backed mock store initialized with the website's default constants (so the dashboard is 100% interactive and testable immediately!).

2. AUTHENTICATION & SECURITY:
   - Create route `/admin/login` with dark cyber-themed authentication UI (email/password login with Supabase Auth, plus a quick developer demo bypass button).
   - Create an `AdminRouteGuard` component protecting all `/admin/*` routes.
   - Add a subtle, professional "Admin Portal" link or lock icon in the footer and quick key shortcut (Ctrl + Shift + A).

3. CMS ADMIN DASHBOARD MODULES (/admin):
   - Admin Layout: Sleek collapsible dark sidebar (Dashboard, Projects, Timeline/Education, Testimonials, Messages Inbox, Supabase Settings), top header with quick stats, user avatar, and Logout button.
   - Overview Tab: Quick analytics cards (Total Projects, Total Testimonials, Unread Inquiries, Timeline Entries), recent messages preview, and quick-action buttons.
   - Projects Management (/admin/projects): Full CRUD table and card grid with image preview, category filters, featured toggles, tech stack badge editor, GitHub/live URL fields, and rich description editor.
   - Timeline & Education Management (/admin/timeline): Manage work experience and education (B.S. in Software Engineering, roles, institutions, dates, bullet descriptions).
   - Testimonials Management (/admin/testimonials): Manage client reviews, rating stars (1-5), company/role, avatar image URLs, and live visibility toggles.
   - Inquiries & Contact Inbox (/admin/messages): Real-time list of messages submitted through the `/contact` form, with badge indicators for unread status, view details modal, mark-as-read, and delete actions.
   - Settings Tab (/admin/settings): Form to view or input Supabase Project URL and Anon Key, test connection button, and Export/Import JSON backup button.

4. LIVE SITE INTEGRATION:
   - Update `App.tsx` routes with the new Admin routes.
   - Wrap the application with a `SiteDataContext` provider that reactively serves projects, timeline, and testimonials to `Home.tsx`, `About.tsx`, `Projects.tsx`, and `ProjectDetail.tsx`.
   - Update `Contact.tsx` so form submissions write directly to the Supabase/Local inquiries store.
   - Maintain all existing animations (framer-motion), responsive styling, and modern UI theme.
```

---

## 5. Tallaabooyinka Xiga (Next Steps)

1. **Riiix "Proceed":** Haddii aad doonayso inaan hadda toos kuugu dhisno nidaamkan oo dhan, riix badhanka **Proceed** ee hoose.
2. **Haddii aad wax ku kordhinayso:** Qor faallo ama codsi dheeraad ah ka hor inta aynaan bilaabin koodhka.
