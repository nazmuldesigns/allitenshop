'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { useLanguage } from '@/context/LanguageContext';
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  Phone,
  Mail,
  Plus,
  Truck,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import BDLocationPicker from '@/components/checkout/BDLocationPicker';

interface SavedAddress {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  streetAddress: string;
  isDefault: boolean;
}

export default function AccountPage() {
  const { lang, t, formatPrice } = useLanguage();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  // Customer Profile State
  const [profile, setProfile] = useState({
    name: 'তানভীর হাসান (Tanvir Hasan)',
    email: 'tanvir@example.com',
    phone: '01712345678',
  });

  // Saved Addresses State
  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: 'addr-1',
      title: 'বাসা (Home)',
      fullName: 'তানভীর হাসান',
      phone: '01712345678',
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Dhanmondi',
      streetAddress: 'House 42, Road 7A, Dhanmondi R/A',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'অফিস (Office)',
      fullName: 'তানভীর হাসান',
      phone: '01712345678',
      division: 'Dhaka',
      district: 'Dhaka',
      upazila: 'Motijheel',
      streetAddress: 'City Centre (Level 14), Motijheel C/A',
      isDefault: false,
    },
  ]);

  // New Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newTitle, setNewTitle] = useState('বাসা');
  const [newName, setNewName] = useState(profile.name);
  const [newPhone, setNewPhone] = useState(profile.phone);
  const [newDiv, setNewDiv] = useState('Dhaka');
  const [newDist, setNewDist] = useState('Dhaka');
  const [newUpazila, setNewUpazila] = useState('Dhanmondi');
  const [newStreet, setNewStreet] = useState('');

  // Sample order history
  const [orders] = useState([
    {
      id: 'ord-101',
      orderNumber: 'PTG-84291',
      date: '2026-11-09',
      status: 'shipped',
      totalAmount: 630,
      itemCount: 2,
      deliveryArea: 'Dhanmondi, Dhaka',
    },
    {
      id: 'ord-102',
      orderNumber: 'PTG-91024',
      date: '2026-11-04',
      status: 'delivered',
      totalAmount: 530,
      itemCount: 1,
      deliveryArea: 'Panchlaish, Chattogram',
    },
  ]);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet.trim()) return;

    const newAddr: SavedAddress = {
      id: `addr-${Date.now()}`,
      title: newTitle,
      fullName: newName,
      phone: newPhone,
      division: newDiv,
      district: newDist,
      upazila: newUpazila,
      streetAddress: newStreet,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddr]);
    setShowAddressModal(false);
    setNewStreet('');
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:py-8 w-full">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-6 flex items-center gap-2.5">
          <User className="w-7 h-7 text-[#0B6E4F]" />
          <span>{lang === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Account Menu Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm">
              <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-gray-100">
                <div className="w-14 h-14 rounded-full bg-[#E8F5EE] text-[#0B6E4F] flex items-center justify-center font-bold text-xl border-2 border-[#0B6E4F]/20">
                  {profile.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#1E293B]">{profile.name}</h3>
                  <p className="text-xs text-gray-500">{profile.phone}</p>
                  <p className="text-[11px] text-gray-400">{profile.email}</p>
                </div>
              </div>

              <nav className="space-y-1.5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full py-2.5 px-3 rounded-xl flex items-center gap-2.5 transition-colors text-left ${
                    activeTab === 'orders'
                      ? 'bg-[#0B6E4F] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'অর্ডার হিস্টোরি' : 'Order History'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full py-2.5 px-3 rounded-xl flex items-center gap-2.5 transition-colors text-left ${
                    activeTab === 'addresses'
                      ? 'bg-[#0B6E4F] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'সংরক্ষিত ঠিকানা (Addresses)' : 'Saved Addresses'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full py-2.5 px-3 rounded-xl flex items-center gap-2.5 transition-colors text-left ${
                    activeTab === 'profile'
                      ? 'bg-[#0B6E4F] text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'প্রোফাইল সেটিংস' : 'Profile Settings'}</span>
                </button>

                <Link
                  href="/wishlist"
                  className="w-full py-2.5 px-3 rounded-xl flex items-center gap-2.5 text-gray-600 hover:bg-gray-100 transition-colors text-left block"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{t.nav.wishlist}</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-8">
            {/* Tab 1: Order History */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-[#1E293B] pb-3 border-b border-gray-100">
                  {lang === 'bn' ? 'আমার অর্ডারসমূহ' : 'My Orders'}
                </h2>

                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl border border-gray-200/80 hover:border-[#0B6E4F]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#0B6E4F]">
                            {ord.orderNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5EE] text-[#0B6E4F] uppercase">
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-gray-500 mt-1">
                          তারিখ: {ord.date} • {ord.itemCount}টি বই • ডেলিভারি: {ord.deliveryArea}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="text-sm font-bold text-gray-900">
                          {formatPrice(ord.totalAmount)}
                        </span>
                        <Link
                          href={`/track?orderNumber=${ord.orderNumber}`}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#E8F5EE] text-[#0B6E4F] border border-[#0B6E4F]/30 font-bold text-xs flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>ট্র্যাক করুন</span>
                        </Link>
                        <Link
                          href={`/orders/${ord.orderNumber}/invoice`}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                        >
                          চালান
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h2 className="text-base font-bold text-[#1E293B]">
                    {lang === 'bn' ? 'সংরক্ষিত ঠিকানা সমূহ' : 'Saved Addresses'}
                  </h2>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-[#0B6E4F] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#074D37] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>নতুন ঠিকানা যোগ করুন</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-xl border border-gray-200 relative bg-gray-50/50 space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0B6E4F] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{addr.title}</span>
                        </span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            ডিফল্ট
                          </span>
                        )}
                      </div>
                      <p className="font-semibold text-gray-800">{addr.fullName}</p>
                      <p className="text-gray-500">{addr.phone}</p>
                      <p className="text-gray-600 leading-relaxed">
                        {addr.streetAddress}, {addr.upazila}, {addr.district}, {addr.division}
                      </p>
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Profile Settings */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-[#1E293B] pb-3 border-b border-gray-100">
                  {lang === 'bn' ? 'প্রোফাইল তথ্য' : 'Profile Information'}
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(lang === 'bn' ? 'প্রোফাইল আপডেট হয়েছে!' : 'Profile updated!');
                  }}
                  className="space-y-4 max-w-md text-xs"
                >
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">পূর্ণ নাম</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full border rounded-lg p-2.5 outline-none focus:border-[#0B6E4F]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">মোবাইল নম্বর</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full border rounded-lg p-2.5 outline-none focus:border-[#0B6E4F]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">ইমেইল অ্যাড্রেস</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full border rounded-lg p-2.5 outline-none focus:border-[#0B6E4F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0B6E4F] text-white font-bold text-xs hover:bg-[#074D37] transition-colors"
                  >
                    তথ্য সংরক্ষণ করুন
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* New Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-gray-900">নতুন ডেলিভারি ঠিকানা যোগ করুন</h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-gray-400 hover:text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">ঠিকানার নাম (যেমন: বাসা / অফিস)</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">প্রাপকের নাম</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">মোবাইল নম্বর</label>
                  <input
                    type="tel"
                    required
                    maxLength={11}
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full border rounded-lg p-2 outline-none"
                  />
                </div>
              </div>

              {/* Bangladesh Picker */}
              <BDLocationPicker
                division={newDiv}
                district={newDist}
                upazila={newUpazila}
                onDivisionChange={setNewDiv}
                onDistrictChange={setNewDist}
                onUpazilaChange={setNewUpazila}
              />

              <div>
                <label className="block font-semibold text-gray-700 mb-1">বিস্তারিত ঠিকানা (বাড়ি, রোড, এলাকা)</label>
                <textarea
                  required
                  rows={2}
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  className="w-full border rounded-lg p-2 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 border rounded-lg font-semibold hover:bg-gray-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B6E4F] text-white rounded-lg font-bold hover:bg-[#074D37]"
                >
                  ঠিকানা সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  );
}

