import re
import html

html_path = "designsystem.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. View Bar Controls
view_bar = """
  <!-- ========================================================
       COMPONENT INSPECTOR CONTROLS & REACT (TSX) CODE TOOLBAR
       ======================================================== -->
  <div class="ds-view-bar" id="dsViewBar">
    <div class="ds-view-bar-left">
      <div class="ds-view-title">
        <i data-lucide="code-2"></i>
        <span>Component Inspector &amp; React (TSX) Code Portal</span>
      </div>
      <div class="ds-mode-switcher">
        <button type="button" class="ds-mode-btn active" data-mode="preview">
          <i data-lucide="eye" style="width:13px;height:13px"></i>
          <span>Preview Only</span>
        </button>
        <button type="button" class="ds-mode-btn" data-mode="split">
          <i data-lucide="columns-2" style="width:13px;height:13px"></i>
          <span>Split (Preview + Code)</span>
        </button>
        <button type="button" class="ds-mode-btn" data-mode="code">
          <i data-lucide="terminal" style="width:13px;height:13px"></i>
          <span>React Code Only</span>
        </button>
      </div>
    </div>
    <div class="ds-view-bar-right">
      <div class="ds-search-box">
        <i data-lucide="search"></i>
        <input type="text" id="dsCompSearch" class="ds-search-input" placeholder="Search components & code..." />
      </div>
    </div>
  </div>
"""

if 'id="dsViewBar"' not in content:
    content = content.replace("</nav>\n", f"</nav>\n{view_bar}\n", 1)

def highlight_code(raw_code):
    # Escape HTML first
    escaped = html.escape(raw_code)
    # Highlight comments
    escaped = re.sub(r'(\/\/[^\n]*)', r'<span class="cmt">\1</span>', escaped)
    # Highlight keywords
    escaped = re.sub(r'\b(import|export|const|return|interface|type|from|as|function|default|let|var|if|else|true|false|null|undefined)\b', r'<span class="kwd">\1</span>', escaped)
    # Highlight strings
    escaped = re.sub(r'(&quot;[^&]*&quot;|&#39;[^&]*&#39;|`[^`]*`)', r'<span class="str">\1</span>', escaped)
    # Highlight JSX tags
    escaped = re.sub(r'(&lt;\/?[A-Z][a-zA-Z0-9]*)', r'<span class="tag">\1</span>', escaped)
    return escaped

# React code mapping for all 25 components
react_components = {
    "Color Tokens (WCAG Calibrated)": {
        "name": "Color Tokens",
        "code": """// tailwind.config.ts / tokens.ts
// AquaPulse WCAG 2.1 Calibrated California Sunset Teal Scale
export const aquaPulseColors = {
  teal: {
    50: '#f0fafc',  // Subtle Tint
    100: '#d8f4f8', // Soft Tint
    200: '#b2ecf3', // Focus Ring
    300: '#84dfeb', // Tone
    400: '#4fcfe0', // Accent Tone
    500: '#1abdd2', // Hover State
    600: '#00a4b7', // Base Brand Anchor
    700: '#008292', // AA compliant text on white
    800: '#006c7a', // AAA compliant text (6.13:1) on white
    900: '#005662', // Deep Shade
    990: '#002d34', // Dark Navy/Teal Sidebar Surface (#002d34)
  },
  neutral: {
    black: '#000000',
    ink: '#111113',
    muted: '#6e6e73',
    soft: '#f5f5f7',
    canvas: '#f8f9fb',
    white: '#ffffff',
  },
  semantic: {
    success: { bg: '#eafaf1', text: '#056a38', border: '#a8e7c3' },
    warning: { bg: '#fff9e6', text: '#824d00', border: '#f7da94' },
    danger:  { bg: '#feeff1', text: '#b5152b', border: '#f9b0be' },
  }
};"""
    },

    "Typography Spec": {
        "name": "Typography Spec",
        "code": """import React from 'react';

// Noto Sans Fluid Typography & Tabular Figure Primitives
export const Display: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none ${className}`}>
    {children}
  </h1>
);

export const Heading: React.FC<{ level?: 1 | 2 | 3; children: React.ReactNode }> = ({ level = 1, children }) => {
  const styles = {
    1: 'text-2xl md:text-3xl font-bold tracking-tight text-slate-900',
    2: 'text-xl md:text-2xl font-bold tracking-tight text-slate-900',
    3: 'text-lg font-bold text-slate-900',
  }[level];
  return <div className={styles}>{children}</div>;
};

export const TabularMetric: React.FC<{ value: string | number; unit?: string; label?: string }> = ({ value, unit, label }) => (
  <div className="flex flex-col">
    {label && <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>}
    <span className="font-mono font-bold text-lg md:text-xl text-slate-900 tabular-nums">
      {value} {unit && <span className="text-xs font-sans text-slate-500 font-normal">{unit}</span>}
    </span>
  </div>
);"""
    },

    "Iconography": {
        "name": "Iconography",
        "code": """import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps extends LucideIcons.LucideProps {
  name: keyof typeof LucideIcons;
  size?: number;
  interactive?: boolean;
}

export const AquaIcon: React.FC<IconProps> = ({ name, size = 20, interactive = true, className = '', ...props }) => {
  const IconComponent = (LucideIcons[name] as React.ElementType) || LucideIcons.HelpCircle;
  return (
    <span className={`inline-flex items-center justify-center transition-colors duration-150 ${interactive ? 'text-slate-700 hover:text-[#006C7A] cursor-pointer' : 'text-slate-600'} ${className}`}>
      <IconComponent size={size} strokeWidth={1.75} {...props} />
    </span>
  );
};"""
    },

    "Button System & States": {
        "name": "Button System",
        "code": """import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'tealLight' | 'dark' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-150 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  
  const sizes = {
    sm: 'h-[38px] px-4 text-xs gap-1.5',
    md: 'h-[48px] px-6 text-sm gap-2',
    lg: 'h-[56px] px-8 text-base gap-2.5',
  }[size];

  const variants = {
    // Deep Teal 800 (AAA Contrast 6.13:1 with white text)
    primary: 'bg-[#006C7A] hover:bg-[#005662] text-white shadow-sm hover:shadow',
    // Anchor Teal 600 with crisp black text
    tealLight: 'bg-[#00A4B7] hover:bg-[#1ABDD2] text-black shadow-sm',
    dark: 'bg-[#000000] hover:bg-[#111113] text-white',
    secondary: 'bg-white hover:bg-slate-50 text-[#006C7A] border border-[#CBD5E1]',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
    danger: 'bg-[#B5152B] hover:bg-[#8F1022] text-white shadow-sm',
  }[variant];

  return (
    <button className={`${base} ${sizes} ${variants} ${className}`} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      <span>{children}</span>
    </button>
  );
};"""
    },

    "Avatars & Photos": {
        "name": "Avatars & Presence",
        "code": """import React from 'react';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name = 'User', size = 'md', online = false }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  }[size];

  return (
    <div className="relative inline-block select-none">
      {src ? (
        <img src={src} alt={name} className={`${sizes} rounded-full object-cover ring-2 ring-white shadow-xs`} />
      ) : (
        <div className={`${sizes} rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center ring-2 ring-white shadow-xs`}>
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] ring-2 ring-white shadow-xs" />
      )}
    </div>
  );
};

export const AvatarStack: React.FC<{ users: { src?: string; name: string }[]; max?: number }> = ({ users = [], max = 4 }) => (
  <div className="flex -space-x-2.5 overflow-hidden items-center">
    {users.slice(0, max).map((u, i) => (
      <Avatar key={i} {...u} size="md" />
    ))}
    {users.length > max && (
      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-xs">
        +{users.length - max}
      </div>
    )}
  </div>
);"""
    },

    "Inputs & Dropdowns": {
        "name": "Inputs & RichSelect",
        "code": """import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
  sub?: string;
  badge?: string;
}

export const RichSelect: React.FC<{
  label?: string;
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}> = ({ label, options, value, onChange, placeholder = 'Select option...' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);
  const filtered = options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      {label && <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200 hover:border-[#006C7A] flex items-center justify-between text-sm transition-all focus:ring-2 focus:ring-[#006C7A]/20"
      >
        <span className={selected ? 'font-bold text-slate-900' : 'text-slate-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in">
          <div className="p-2 border-b border-slate-100 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full text-xs outline-none bg-transparent"
              autoFocus
            />
          </div>
          <div className="max-h-56 overflow-y-auto p-1 divide-y divide-slate-50">
            {filtered.map(opt => (
              <div
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`px-3 py-2.5 rounded-lg text-xs cursor-pointer flex items-center justify-between hover:bg-[#F0FAFC] ${opt.value === value ? 'bg-[#F0FAFC] text-[#006C7A] font-bold' : 'text-slate-700'}`}
              >
                <div>
                  <div className="font-semibold">{opt.label}</div>
                  {opt.sub && <div className="text-[11px] text-slate-500 mt-0.5">{opt.sub}</div>}
                </div>
                {opt.value === value && <Check className="w-4 h-4 text-[#006C7A]" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};"""
    },

    "Status Beacons & Filter Tags": {
        "name": "Status Beacons",
        "code": """import React from 'react';

export const StatusBeacon: React.FC<{ status?: 'live' | 'warning' | 'critical' | 'offline'; label?: string }> = ({
  status = 'live',
  label
}) => {
  const configs = {
    live:     { bg: 'bg-[#10B981]', ring: 'ring-[#A7F3D0]', text: 'text-[#065F46]' },
    warning:  { bg: 'bg-[#F59E0B]', ring: 'ring-[#FDE68A]', text: 'text-[#92400E]' },
    critical: { bg: 'bg-[#EF4444]', ring: 'ring-[#FECACA]', text: 'text-[#991B1B]' },
    offline:  { bg: 'bg-[#94A3B8]', ring: 'ring-[#E2E8F0]', text: 'text-[#475569]' },
  }[status];

  return (
    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold">
      <span className={`w-2 h-2 rounded-full ${configs.bg} ring-4 ${configs.ring} animate-pulse`} />
      {label && <span className={configs.text}>{label}</span>}
    </span>
  );
};

export const FilterBadge: React.FC<{ label: string; active?: boolean; onRemove?: () => void }> = ({
  label,
  active = false,
  onRemove
}) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${active ? 'bg-[#F0FAFC] text-[#006C7A] border-[#B2ECF3]' : 'bg-slate-100 text-slate-600 border-transparent hover:border-slate-300'}`}>
    <span>{label}</span>
    {onRemove && (
      <button onClick={onRemove} className="hover:text-black">×</button>
    )}
  </span>
);"""
    },

    "Field-Level Validation": {
        "name": "Field Validation",
        "code": """import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({ label, error, success, className = '', ...props }) => (
  <div className="w-full">
    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">{label}</label>
    <div className="relative">
      <input
        className={`w-full h-12 px-4 rounded-xl border text-sm transition-all outline-none ${
          error
            ? 'border-[#B5152B] bg-[#FEF2F2] focus:ring-2 focus:ring-[#B5152B]/20 text-[#991B1B]'
            : success
            ? 'border-[#10B981] bg-[#ECFDF5] focus:ring-2 focus:ring-[#10B981]/20'
            : 'border-slate-200 bg-white focus:border-[#006C7A] focus:ring-2 focus:ring-[#006C7A]/20'
        } ${className}`}
        {...props}
      />
      {error && <AlertCircle className="w-4 h-4 text-[#B5152B] absolute right-3.5 top-4 pointer-events-none" />}
      {success && <CheckCircle className="w-4 h-4 text-[#10B981] absolute right-3.5 top-4 pointer-events-none" />}
    </div>
    {error && (
      <p className="mt-1.5 text-xs text-[#B5152B] font-semibold flex items-center gap-1">
        <span>{error}</span>
      </p>
    )}
  </div>
);"""
    },

    "Form Error Summary": {
        "name": "Error Summary Callout",
        "code": """import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const FormErrorSummary: React.FC<{ errors: string[]; title?: string }> = ({
  errors,
  title = 'There are issues requiring your correction:'
}) => {
  if (!errors || errors.length === 0) return null;
  return (
    <div className="p-4 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B] shadow-xs">
      <div className="flex items-center gap-2 font-bold text-sm mb-2">
        <AlertTriangle className="w-4 h-4 text-[#B5152B]" />
        <span>{title}</span>
      </div>
      <ul className="list-disc list-inside space-y-1 font-medium pl-1">
        {errors.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
    </div>
  );
};"""
    },

    "System Alert Callouts": {
        "name": "Alert Callouts",
        "code": """import React from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AlertCallout: React.FC<{
  type?: 'info' | 'warning' | 'danger' | 'success';
  title?: string;
  children: React.ReactNode;
}> = ({ type = 'info', title, children }) => {
  const configs = {
    info:    { bg: 'bg-[#F0FAFC]', border: 'border-[#B2ECF3]', text: 'text-[#005662]', icon: Info },
    warning: { bg: 'bg-[#FFFBEB]', border: 'border-[#FDE68A]', text: 'text-[#92400E]', icon: AlertTriangle },
    danger:  { bg: 'bg-[#FEF2F2]', border: 'border-[#FECACA]', text: 'text-[#991B1B]', icon: AlertCircle },
    success: { bg: 'bg-[#ECFDF5]', border: 'border-[#A7F3D0]', text: 'text-[#065F46]', icon: CheckCircle2 },
  }[type];

  const Icon = configs.icon;

  return (
    <div className={`p-4 rounded-2xl border flex gap-3 text-xs leading-relaxed ${configs.bg} ${configs.border} ${configs.text}`}>
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        {title && <h5 className="font-bold text-sm mb-1">{title}</h5>}
        <div>{children}</div>
      </div>
    </div>
  );
};"""
    },

    "Hardware & Network Fallback": {
        "name": "Hardware Fallback Banner",
        "code": """import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

export const NetworkFallbackBanner: React.FC<{ onRetry?: () => void; isRetrying?: boolean }> = ({
  onRetry,
  isRetrying = false
}) => (
  <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between gap-4 text-xs">
    <div className="flex items-center gap-3 text-[#92400E]">
      <WifiOff className="w-5 h-5 shrink-0" />
      <div>
        <span className="font-bold block">Pond Sensor Telemetry Offline</span>
        <span className="text-[11px] text-amber-700">Displaying cached local records from 14:15 IST. Sensor node reconnecting.</span>
      </div>
    </div>
    <button
      onClick={onRetry}
      disabled={isRetrying}
      className="px-3.5 py-1.5 rounded-lg bg-amber-800 text-white font-bold hover:bg-amber-900 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
    >
      <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
      <span>{isRetrying ? 'Retrying...' : 'Retry Connection'}</span>
    </button>
  </div>
);"""
    },

    "Search Bar": {
        "name": "Search Bar Molecule",
        "code": """import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export const SearchBar: React.FC<{
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}> = ({ value = '', onChange, placeholder = 'Search ponds, suppliers, arrivals...' }) => {
  const [query, setQuery] = useState(value);

  const handleClear = () => {
    setQuery('');
    onChange?.('');
  };

  return (
    <div className="relative flex items-center w-full max-w-sm">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
      <input
        type="text"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          onChange?.(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-12 rounded-xl bg-slate-100 border border-transparent focus:bg-white focus:border-[#006C7A] text-xs font-medium text-slate-800 transition-all outline-none"
      />
      {query ? (
        <button onClick={handleClear} className="absolute right-3 text-slate-400 hover:text-slate-600">
          <X className="w-3.5 h-3.5" />
        </button>
      ) : (
        <kbd className="absolute right-3 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400">⌘K</kbd>
      )}
    </div>
  );
};"""
    },

    "Navigation Tabs": {
        "name": "Navigation Tabs",
        "code": """import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export const NavTabs: React.FC<{
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pill';
}> = ({ tabs, activeTab, onChange, variant = 'underline' }) => {
  if (variant === 'pill') {
    return (
      <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.id ? 'bg-white text-[#006C7A] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <nav className="flex border-b border-slate-200 gap-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`pb-3 text-sm font-bold transition-all relative ${
            activeTab === tab.id
              ? 'text-[#006C7A] border-b-2 border-[#006C7A]'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
};"""
    },

    "Wayfinding & Pager": {
        "name": "Pagination Pager",
        "code": """import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Pager: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-between text-xs text-slate-600 py-3 border-t border-slate-200">
    <span>Page <b>{currentPage}</b> of <b>{totalPages}</b></span>
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none font-semibold flex items-center gap-1"
      >
        <ChevronLeft className="w-3.5 h-3.5" /> Previous
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none font-semibold flex items-center gap-1"
      >
        Next <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);"""
    },

    "Action Menu & Toasts": {
        "name": "Action Menu & Toasts",
        "code": """import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2, CheckCircle2 } from 'lucide-react';

export const ActionMenu: React.FC<{ onEdit?: () => void; onDelete?: () => void }> = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-1 text-xs">
          <button onClick={() => { onEdit?.(); setOpen(false); }} className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-700">
            <Edit2 className="w-3.5 h-3.5 text-[#006C7A]" /> Edit Record
          </button>
          <button onClick={() => { onDelete?.(); setOpen(false); }} className="w-full px-3 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600 font-semibold">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export const ToastNotification: React.FC<{ message: string; type?: 'teal' | 'success' }> = ({ message, type = 'teal' }) => (
  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xl">
    <CheckCircle2 className="w-4 h-4 text-[#4FCFE0]" />
    <span>{message}</span>
  </div>
);"""
    },

    "Stepper Indicator": {
        "name": "Stepper Wizard",
        "code": """import React from 'react';
import { Check } from 'lucide-react';

export const Stepper: React.FC<{
  steps: { id: string; label: string }[];
  currentStep: number;
}> = ({ steps, currentStep }) => (
  <div className="flex items-center w-full">
    {steps.map((step, idx) => {
      const isDone = idx < currentStep;
      const isCurrent = idx === currentStep;
      return (
        <React.Fragment key={step.id}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              isDone
                ? 'bg-[#006C7A] text-white'
                : isCurrent
                ? 'bg-[#00A4B7] text-black ring-4 ring-[#B2ECF3]'
                : 'bg-slate-200 text-slate-600'
            }`}>
              {isDone ? <Check className="w-4 h-4" /> : idx + 1}
            </div>
            <span className={`text-xs font-bold ${isCurrent ? 'text-slate-900' : 'text-slate-500'}`}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 ${isDone ? 'bg-[#006C7A]' : 'bg-slate-200'}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);"""
    },

    "Empty States (Multi-Scenario)": {
        "name": "Empty States",
        "code": """import React from 'react';
import { Search, FolderOpen, AlertCircle } from 'lucide-react';

export const EmptyState: React.FC<{
  scenario?: 'no-data' | 'no-search' | 'error';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}> = ({
  scenario = 'no-data',
  title = 'No records found',
  description = 'There are no active procurement arrivals recorded for this filter criteria.',
  actionText = 'Create New Intake',
  onAction
}) => {
  const Icon = scenario === 'no-search' ? Search : scenario === 'error' ? AlertCircle : FolderOpen;

  return (
    <div className="p-10 rounded-2xl border border-dashed border-slate-300 text-center flex flex-col items-center justify-center bg-slate-50/50">
      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#006C7A] shadow-xs mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-extrabold text-sm text-slate-900 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionText && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-full bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold transition-all shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};"""
    },

    "Filter Bar & Compound Inputs": {
        "name": "Filter Bar Organism",
        "code": """import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export const CompoundFilterBar: React.FC<{
  onReset?: () => void;
  onApply?: () => void;
}> = ({ onReset, onApply }) => (
  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5 font-bold text-slate-800">
        <Filter className="w-4 h-4 text-[#006C7A]" />
        <span>Filters</span>
      </div>
      <select className="h-9 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700">
        <option>All Centers (12)</option>
        <option>Bhimavaram Center #1</option>
        <option>Kakinada Sea Intake #2</option>
      </select>
      <select className="h-9 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700">
        <option>All Species (VM / BT)</option>
        <option>L. Vannamei (VM)</option>
        <option>Black Tiger (BT)</option>
      </select>
      <input type="date" className="h-9 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700" />
    </div>

    <div className="flex items-center gap-2">
      <button onClick={onReset} className="h-9 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold flex items-center gap-1">
        <RotateCcw className="w-3.5 h-3.5" /> Reset
      </button>
      <button onClick={onApply} className="h-9 px-4 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white font-bold">
        Apply Filter
      </button>
    </div>
  </div>
);"""
    },

    "Floating Rounded Sidebar": {
        "name": "Dark Sidebar (#002d34)",
        "code": """import React, { useState } from 'react';
import { LayoutDashboard, ShoppingCart, Activity, ShieldCheck, Warehouse, ChevronLeft } from 'lucide-react';

export const DarkSidebar: React.FC<{ activeRoute?: string; onNavigate?: (path: string) => void }> = ({
  activeRoute = '/purchase',
  onNavigate
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Raw Material', icon: ShoppingCart, path: '/purchase', badge: 12 },
    { label: 'Water Quality IoT', icon: Activity, path: '/iot' },
    { label: 'QC Lab Queue', icon: ShieldCheck, path: '/qc', badge: 3 },
    { label: 'Coldstore CS-2', icon: Warehouse, path: '/coldstore' },
  ];

  return (
    <aside className={`bg-[#002d34] text-white rounded-3xl p-4 flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} shadow-2xl border border-white/5`}>
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-[#00A4B7] text-black font-black flex items-center justify-center shrink-0">M</div>
          {!collapsed && (
            <div>
              <div className="font-extrabold text-sm leading-tight text-white">AquaPulse</div>
              <div className="text-[10px] text-[#4FCFE0] font-bold uppercase tracking-wider">Enterprise ERP</div>
            </div>
          )}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-full bg-[#003B44] text-[#B2D4D8] hover:text-white">
          <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="mt-4 space-y-1.5 flex-1">
        {menu.map(item => {
          const Icon = item.icon;
          const isActive = activeRoute.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => onNavigate?.(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive ? 'bg-[#006C7A] text-white shadow-sm' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};"""
    },

    "Metric Card System": {
        "name": "Metric KPI Cards",
        "code": """import React from 'react';
import { TrendingUp, TrendingDown, Wind } from 'lucide-react';

export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  delta?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon?: React.ReactNode;
}> = ({ title, value, delta, isPositive = true, subtitle, icon }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between text-slate-500 mb-2">
      <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
      {icon && <span className="p-1.5 rounded-lg bg-[#F0FAFC] text-[#006C7A]">{icon}</span>}
    </div>
    <div className="text-2xl font-black text-slate-900 tracking-tight tabular-nums">{value}</div>
    <div className="mt-3 flex items-center justify-between text-xs">
      {delta && (
        <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full ${
          isPositive ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {delta}
        </span>
      )}
      {subtitle && <span className="text-slate-400 font-medium">{subtitle}</span>}
    </div>
  </div>
);"""
    },

    "Data Visualizations & Telemetry": {
        "name": "Telemetry Visualizations",
        "code": """import React from 'react';

// Responsive SVG Mini Telemetry Chart
export const TelemetryLineChart: React.FC<{ data?: number[]; height?: number }> = ({
  data = [30, 45, 60, 52, 68, 74, 90],
  height = 80
}) => {
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 300},${height - (v / 100) * height}`).join(' ');

  return (
    <div className="w-full bg-white p-4 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center mb-2 text-xs">
        <span className="font-bold text-slate-800">Water Dissolved Oxygen (24h)</span>
        <span className="font-mono font-bold text-[#006C7A]">6.84 mg/L (Optimal)</span>
      </div>
      <svg viewBox={`0 0 300 ${height}`} className="w-full h-20 overflow-visible">
        <polyline fill="none" stroke="#00A4B7" strokeWidth="2.5" points={points} />
      </svg>
    </div>
  );
};"""
    },

    "Data Tables": {
        "name": "Data Tables",
        "code": """import React from 'react';
import { Download, Search } from 'lucide-react';

export const SimpleTable: React.FC<{ columns: { field: string; header: string }[]; data: any[] }> = ({
  columns,
  data
}) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
    <table className="w-full text-xs text-left">
      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
        <tr>
          {columns.map(c => <th key={c.field} className="px-4 py-3">{c.header}</th>)}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50">
            {columns.map(c => <td key={c.field} className="px-4 py-3">{row[c.field]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);"""
    },

    "Object Cards (Unsplash Imagery)": {
        "name": "Object Media Card",
        "code": """import React from 'react';

export const ObjectCard: React.FC<{
  title: string;
  image: string;
  tag: string;
  metric: string;
}> = ({ title, image, tag, metric }) => (
  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-md transition-shadow">
    <div className="relative h-44 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-[10px]">
        {tag}
      </span>
    </div>
    <div className="p-4">
      <h4 className="font-extrabold text-sm text-slate-900 mb-1">{title}</h4>
      <div className="text-xs text-slate-500 font-medium">{metric}</div>
    </div>
  </div>
);"""
    },

    "Slide-Over Inspector & Telemetry Matrix": {
        "name": "Slide-Over Inspector Drawer",
        "code": """import React from 'react';
import { X, Zap } from 'lucide-react';

export const SlideOverDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
};"""
    },

    "Data Grid Architecture": {
        "name": "Enterprise Data Grid",
        "code": """import React, { useState } from 'react';
import { Download, Search, ChevronDown } from 'lucide-react';

export interface Column<T> {
  field: keyof T;
  header: string;
  render?: (val: any, row: T) => React.ReactNode;
}

export function EnterpriseDataGrid<T extends { id: string | number }>({
  columns,
  data,
  title = 'Enterprise Explorer'
}: {
  columns: Column<T>[];
  data: T[];
  title?: string;
}) {
  const [search, setSearch] = useState('');

  const filtered = data.filter(row =>
    Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-4 flex-wrap">
        <h3 className="font-extrabold text-slate-900 text-sm">{title}</h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search records..."
            className="h-8 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-[#006C7A]"
          />
          <button className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5 text-[#006C7A]" /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
            <tr>
              {columns.map(col => <th key={String(col.field)} className="px-4 py-3">{col.header}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(row => (
              <tr key={row.id} className="hover:bg-[#F0FAFC]/60 transition-colors">
                {columns.map(col => (
                  <td key={String(col.field)} className="px-4 py-3">
                    {col.render ? col.render(row[col.field], row) : String(row[col.field])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}"""
    }
}

# Find each spec-grid
matches = list(re.finditer(r'<div class="spec-grid">', content))
print(f"Total spec-grids found: {len(matches)}")

# Process from last to first so offsets don't shift!
for i in reversed(range(len(matches))):
    start = matches[i].start()
    end = matches[i+1].start() if i+1 < len(matches) else content.find("</section>", start)
    chunk = content[start:end]

    title_match = re.search(r'<div class="spec-title">(.*?)</div>', chunk)
    if not title_match:
        continue
    title_raw = title_match.group(1).replace("&amp;", "&").strip()

    # Look up in react_components
    comp_info = react_components.get(title_raw)
    if not comp_info:
        # Try finding key containing title
        for k, v in react_components.items():
            if k.replace("&amp;", "&") == title_raw:
                comp_info = v
                break

    if not comp_info:
        print(f"[{i+1}] No React code defined for: {title_raw}")
        continue

    # Find the content div inside this chunk
    content_match = re.search(r'<div class="spec-content[^"]*"[^>]*>', chunk)
    if not content_match:
        print(f"[{i+1}] No spec-content found for: {title_raw}")
        continue

    content_open_start = start + content_match.start()
    content_open_end = start + content_match.end()

    # The content closing tag is the last </div> before the end of the spec-grid
    content_close = content.rfind('</div>', start, end)
    if content_close == -1:
        continue

    inner_content = content[content_open_end:content_close].strip()

    highlighted = highlight_code(comp_info['code'])

    wrapped = f"""
        <div class="ds-comp-box" data-comp-name="{comp_info['name']}">
          <div class="ds-comp-header">
            <div class="ds-comp-tabs">
              <button type="button" class="ds-tab-btn active" data-tab="preview">
                <i data-lucide="eye" style="width:13px;height:13px"></i>
                <span>Preview</span>
              </button>
              <button type="button" class="ds-tab-btn" data-tab="react">
                <i data-lucide="code-2" style="width:13px;height:13px"></i>
                <span>React (TSX)</span>
              </button>
            </div>
            <div class="ds-comp-actions">
              <button type="button" class="ds-copy-btn" title="Copy {comp_info['name']} React Code">
                <i data-lucide="copy" style="width:13px;height:13px"></i>
                <span>Copy React</span>
              </button>
            </div>
          </div>

          <div class="ds-comp-preview">
            {inner_content}
          </div>

          <div class="ds-comp-code">
            <pre class="ds-code-pre"><code>{highlighted}</code></pre>
          </div>
        </div>"""

    content = content[:content_open_end] + wrapped + content[content_close:]
    print(f"[{i+1}] Successfully wrapped: {comp_info['name']}")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done updating designsystem.html!")
