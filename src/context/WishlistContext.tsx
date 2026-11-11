'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Book } from '@/types';

interface WishlistContextType {
  wishlist: Book[];
  isInWishlist: (bookId: string) => boolean;
  toggleWishlist: (book: Book) => void;
  removeFromWishlist: (bookId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Book[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pataghor_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      // Ignore JSON error
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('pataghor_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, mounted]);

  const isInWishlist = (bookId: string) => {
    return wishlist.some((b) => b.id === bookId);
  };

  const toggleWishlist = (book: Book) => {
    setWishlist((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      if (exists) {
        return prev.filter((b) => b.id !== book.id);
      }
      return [...prev, book];
    });
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist((prev) => prev.filter((b) => b.id !== bookId));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

