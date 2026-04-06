import React from 'react';
import { Link } from 'react-router-dom';

import logoUrl from '@src/assets/logo.png';
import { BadgeIcon } from '@/components/ui/badge-icon';

import { INITIAL_PAGE_FEATURES } from './initialPageFeatures';

export const InitialPageBrandPanel: React.FC = () => (
  <div className="flex flex-col justify-center gap-8 lg:gap-10">
    <div className="flex items-center gap-3">
      <img src={logoUrl} alt="Show Time logo" className="h-10 w-10 object-contain" />
      <span className="text-base font-semibold text-white md:text-2xl">Show Time</span>
    </div>

    <div className="space-y-2 md:space-y-3">
      <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-5xl">
        Gerencie seus shows
        <br />
        <span className="text-purple-400">de forma simples.</span>
      </h1>
      <p className="max-w-md text-sm text-gray-400 sm:text-base md:text-lg">
        Organize sua agenda, acompanhe seus cachês e tenha o controle total da sua carreira musical em
        um só lugar.
      </p>
    </div>

    <ul className="space-y-3 md:space-y-4">
      {INITIAL_PAGE_FEATURES.map(({ icon, title, subtitle }) => (
        <li key={title} className="flex items-center gap-3 md:gap-4">
          <BadgeIcon icon={icon} bgColor="bg-purple-900/30" textColor="text-purple-400" />
          <div>
            <p className="text-xs font-semibold text-white sm:text-sm">{title}</p>
            <p className="text-xs text-gray-400 sm:text-sm">{subtitle}</p>
          </div>
        </li>
      ))}
    </ul>

    <div className="flex flex-col gap-3 sm:flex-row md:hidden">
      <Link
        to="/login"
        className="flex-1 inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-purple-700"
      >
        Entrar
      </Link>
      <Link
        to="/signup"
        className="flex-1 inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        Criar conta
      </Link>
    </div>
  </div>
);
