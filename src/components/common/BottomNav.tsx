'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, ShoppingBag, Heart, Truck, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const { lang, t } = useLanguage();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { label: t.nav.home, href: '/', icon: Home },
    { label: t.nav.catalog, href: '/catalog', icon: BookOpen },
    {
      label: t.nav.cart,
      href: '/cart',
      icon: ShoppingBag,
      badge: itemCount > 0 ? itemCount : null,
    },
    {
      label: t.nav.wishlist,
      href: '/wishlist',
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : null,
    },
    { label: lang === 'bn' ? 'অ্যাকাউন্ট' : 'Account', href: '/account', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 md:hidden py-1 px-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 relative rounded-lg transition-colors ${
                isActive ? 'text-[#0B6E4F] font-bold' : 'text-gray-500 hover:text-[#0B6E4F]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {item.badge !== null && (
                  <span className="absolute -top-1.5 -right-2 bg-[#F4A300] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

