export interface Upazila {
  id: string;
  name: string;
  name_bn: string;
}

export interface District {
  id: string;
  name: string;
  name_bn: string;
  upazilas: Upazila[];
}

export interface Division {
  id: string;
  name: string;
  name_bn: string;
  districts: District[];
}

export const BANGLADESH_DIVISIONS: Division[] = [
  {
    id: 'dhaka',
    name: 'Dhaka',
    name_bn: 'ঢাকা',
    districts: [
      {
        id: 'dhaka-city',
        name: 'Dhaka',
        name_bn: 'ঢাকা',
        upazilas: [
          { id: 'dhanmondi', name: 'Dhanmondi', name_bn: 'ধানমন্ডি' },
          { id: 'gulshan', name: 'Gulshan', name_bn: 'গুলশান' },
          { id: 'banani', name: 'Banani', name_bn: 'বনানী' },
          { id: 'mirpur', name: 'Mirpur', name_bn: 'মিরপুর' },
          { id: 'uttara', name: 'Uttara', name_bn: 'উত্তরা' },
          { id: 'motijheel', name: 'Motijheel', name_bn: 'মতিঝিল' },
          { id: 'mohammadpur', name: 'Mohammadpur', name_bn: 'মোহাম্মদপুর' },
          { id: 'shahbagh', name: 'Shahbagh', name_bn: 'শাহবাগ' },
          { id: 'badda', name: 'Badda', name_bn: 'বাড্ডা' },
          { id: 'khilgaon', name: 'Khilgaon', name_bn: 'খিলগাঁও' },
          { id: 'paltan', name: 'Paltan', name_bn: 'পল্টন' },
          { id: 'savar', name: 'Savar', name_bn: 'সাভার' },
          { id: 'keraniganj', name: 'Keraniganj', name_bn: 'কেরানীগঞ্জ' },
          { id: 'dhamrai', name: 'Dhamrai', name_bn: 'ধামরাই' },
        ],
      },
      {
        id: 'gazipur',
        name: 'Gazipur',
        name_bn: 'গাজীপুর',
        upazilas: [
          { id: 'gazipur-sadar', name: 'Gazipur Sadar', name_bn: 'গাজীপুর সদর' },
          { id: 'tongie', name: 'Tongi', name_bn: 'টঙ্গী' },
          { id: 'sreepur', name: 'Sreepur', name_bn: 'শ্রীপুর' },
          { id: 'kaliakair', name: 'Kaliakair', name_bn: 'কালিয়াকৈর' },
          { id: 'kapasia', name: 'Kapasia', name_bn: 'কাপাসিয়া' },
        ],
      },
      {
        id: 'narayanganj',
        name: 'Narayanganj',
        name_bn: 'নারায়ণগঞ্জ',
        upazilas: [
          { id: 'narayanganj-sadar', name: 'Narayanganj Sadar', name_bn: 'নারায়ণগঞ্জ সদর' },
          { id: 'sonargaon', name: 'Sonargaon', name_bn: 'সোনারগাঁও' },
          { id: 'rupganj', name: 'Rupganj', name_bn: 'রূপগঞ্জ' },
          { id: 'araihazar', name: 'Araihazar', name_bn: 'আড়াইহাজার' },
          { id: 'bandar', name: 'Bandar', name_bn: 'বন্দর' },
        ],
      },
      {
        id: 'tangail',
        name: 'Tangail',
        name_bn: 'টাঙ্গাইল',
        upazilas: [
          { id: 'tangail-sadar', name: 'Tangail Sadar', name_bn: 'টাঙ্গাইল সদর' },
          { id: 'mirzapur', name: 'Mirzapur', name_bn: 'মির্জাপুর' },
          { id: 'madhupur', name: 'Madhupur', name_bn: 'মধুপুর' },
          { id: 'ghatail', name: 'Ghatail', name_bn: 'ঘাটাইল' },
        ],
      },
      {
        id: 'narsingdi',
        name: 'Narsingdi',
        name_bn: 'নরসিংদী',
        upazilas: [
          { id: 'narsingdi-sadar', name: 'Narsingdi Sadar', name_bn: 'নরসিংদী সদর' },
          { id: 'palash', name: 'Palash', name_bn: 'পলাশ' },
          { id: 'shibpur', name: 'Shibpur', name_bn: 'শিবপুর' },
          { id: 'raipura', name: 'Raipura', name_bn: 'রায়পুরা' },
        ],
      },
      {
        id: 'faridpur',
        name: 'Faridpur',
        name_bn: 'ফরিদপুর',
        upazilas: [
          { id: 'faridpur-sadar', name: 'Faridpur Sadar', name_bn: 'ফরিদপুর সদর' },
          { id: 'bhanga', name: 'Bhanga', name_bn: 'ভাঙ্গা' },
          { id: 'boalmari', name: 'Boalmari', name_bn: 'বোয়ালমারী' },
        ],
      },
      {
        id: 'gopalganj',
        name: 'Gopalganj',
        name_bn: 'গোপালগঞ্জ',
        upazilas: [
          { id: 'gopalganj-sadar', name: 'Gopalganj Sadar', name_bn: 'গোপালগঞ্জ সদর' },
          { id: 'tungipara', name: 'Tungipara', name_bn: 'টুঙ্গিপাড়া' },
          { id: 'kashiani', name: 'Kashiani', name_bn: 'কাশিয়ানী' },
        ],
      },
      {
        id: 'kishoreganj',
        name: 'Kishoreganj',
        name_bn: 'কিশোরগঞ্জ',
        upazilas: [
          { id: 'kishoreganj-sadar', name: 'Kishoreganj Sadar', name_bn: 'কিশোরগঞ্জ সদর' },
          { id: 'bhairab', name: 'Bhairab', name_bn: 'ভৈরব' },
          { id: 'kuliarchar', name: 'Kuliarchar', name_bn: 'কুলিয়ারচর' },
        ],
      },
      {
        id: 'manikganj',
        name: 'Manikganj',
        name_bn: 'মানিকগঞ্জ',
        upazilas: [
          { id: 'manikganj-sadar', name: 'Manikganj Sadar', name_bn: 'মানিকগঞ্জ সদর' },
          { id: 'singair', name: 'Singair', name_bn: 'সিংগাইর' },
        ],
      },
      {
        id: 'munshiganj',
        name: 'Munshiganj',
        name_bn: 'মুন্সীগঞ্জ',
        upazilas: [
          { id: 'munshiganj-sadar', name: 'Munshiganj Sadar', name_bn: 'মুন্সীগঞ্জ সদর' },
          { id: 'sreenagar', name: 'Sreenagar', name_bn: 'শ্রীনগর' },
        ],
      },
    ],
  },
  {
    id: 'chattogram',
    name: 'Chattogram',
    name_bn: 'চট্টগ্রাম',
    districts: [
      {
        id: 'chattogram-district',
        name: 'Chattogram',
        name_bn: 'চট্টগ্রাম',
        upazilas: [
          { id: 'chittagong-sadar', name: 'Chattogram Sadar / Kotwali', name_bn: 'চট্টগ্রাম সদর / কোতোয়ালী' },
          { id: 'panchlaish', name: 'Panchlaish', name_bn: 'পাঁচলাইশ' },
          { id: 'halishahar', name: 'Halishahar', name_bn: 'হালিশহর' },
          { id: 'hathazari', name: 'Hathazari', name_bn: 'হাটহাজারী' },
          { id: 'sitakunda', name: 'Sitakunda', name_bn: 'সীতাকুণ্ড' },
          { id: 'mirsharai', name: 'Mirsharai', name_bn: 'মীরসরাই' },
          { id: 'patiya', name: 'Patiya', name_bn: 'পটিয়া' },
        ],
      },
      {
        id: 'coxs-bazar',
        name: "Cox's Bazar",
        name_bn: 'কক্সবাজার',
        upazilas: [
          { id: 'coxsbazar-sadar', name: "Cox's Bazar Sadar", name_bn: 'কক্সবাজার সদর' },
          { id: 'ramu', name: 'Ramu', name_bn: 'রামু' },
          { id: 'teknaf', name: 'Teknaf', name_bn: 'টেকনাফ' },
          { id: 'chakaria', name: 'Chakaria', name_bn: 'চকোরিয়া' },
        ],
      },
      {
        id: 'cumilla',
        name: 'Cumilla',
        name_bn: 'কুমিল্লা',
        upazilas: [
          { id: 'cumilla-sadar', name: 'Cumilla Sadar', name_bn: 'কুমিল্লা সদর' },
          { id: 'daudkandi', name: 'Daudkandi', name_bn: 'দাউদকান্দি' },
          { id: 'laksham', name: 'Laksham', name_bn: 'লাকসাম' },
          { id: 'chandina', name: 'Chandina', name_bn: 'চান্দিনা' },
        ],
      },
      {
        id: 'noakhali',
        name: 'Noakhali',
        name_bn: 'নোয়াখালী',
        upazilas: [
          { id: 'noakhali-sadar', name: 'Noakhali Sadar', name_bn: 'নোয়াখালী সদর' },
          { id: 'begumganj', name: 'Begumganj', name_bn: 'বেগমগঞ্জ' },
          { id: 'senbagh', name: 'Senbagh', name_bn: 'সেনবাগ' },
        ],
      },
      {
        id: 'brahmanbaria',
        name: 'Brahmanbaria',
        name_bn: 'ব্রাহ্মণবাড়িয়া',
        upazilas: [
          { id: 'brahmanbaria-sadar', name: 'Brahmanbaria Sadar', name_bn: 'ব্রাহ্মণবাড়িয়া সদর' },
          { id: 'ashuganj', name: 'Ashuganj', name_bn: 'আশুগঞ্জ' },
          { id: 'kasba', name: 'Kasba', name_bn: 'কসবা' },
        ],
      },
      {
        id: 'feni',
        name: 'Feni',
        name_bn: 'ফেনী',
        upazilas: [
          { id: 'feni-sadar', name: 'Feni Sadar', name_bn: 'ফেনী সদর' },
          { id: 'chhagalnaiya', name: 'Chhagalnaiya', name_bn: 'ছাগলনাইয়া' },
        ],
      },
    ],
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi',
    name_bn: 'রাজশাহী',
    districts: [
      {
        id: 'rajshahi-district',
        name: 'Rajshahi',
        name_bn: 'রাজশাহী',
        upazilas: [
          { id: 'boalia', name: 'Boalia / City Center', name_bn: 'বোয়ালিয়া' },
          { id: 'motihar', name: 'Motihar / University', name_bn: 'মতিহার' },
          { id: 'paba', name: 'Paba', name_bn: 'পবা' },
          { id: 'godagari', name: 'Godagari', name_bn: 'গোদাগাড়ী' },
        ],
      },
      {
        id: 'bogura',
        name: 'Bogura',
        name_bn: 'বগুড়া',
        upazilas: [
          { id: 'bogura-sadar', name: 'Bogura Sadar', name_bn: 'বগুড়া সদর' },
          { id: 'sherpur', name: 'Sherpur', name_bn: 'শেরপুর' },
          { id: 'shibganj-bogura', name: 'Shibganj', name_bn: 'শিবগঞ্জ' },
        ],
      },
      {
        id: 'pabna',
        name: 'Pabna',
        name_bn: 'পাবনা',
        upazilas: [
          { id: 'pabna-sadar', name: 'Pabna Sadar', name_bn: 'পাবনা সদর' },
          { id: 'ishwardi', name: 'Ishwardi', name_bn: 'ঈশ্বরদী' },
        ],
      },
      {
        id: 'sirajganj',
        name: 'Sirajganj',
        name_bn: 'সিরাজগঞ্জ',
        upazilas: [
          { id: 'sirajganj-sadar', name: 'Sirajganj Sadar', name_bn: 'সিরাজগঞ্জ সদর' },
          { id: 'shahjadpur', name: 'Shahjadpur', name_bn: 'শাহজাদপুর' },
        ],
      },
      {
        id: 'naogaon',
        name: 'Naogaon',
        name_bn: 'নওগাঁ',
        upazilas: [
          { id: 'naogaon-sadar', name: 'Naogaon Sadar', name_bn: 'নওগাঁ সদর' },
          { id: 'patnitala', name: 'Patnitala', name_bn: 'পত্নীতলা' },
        ],
      },
    ],
  },
  {
    id: 'khulna',
    name: 'Khulna',
    name_bn: 'খুলনা',
    districts: [
      {
        id: 'khulna-district',
        name: 'Khulna',
        name_bn: 'খুলনা',
        upazilas: [
          { id: 'khulna-sadar', name: 'Khulna Sadar', name_bn: 'খুলনা সদর' },
          { id: 'sonadanga', name: 'Sonadanga', name_bn: 'সোনাডাঙ্গা' },
          { id: 'khalishpur', name: 'Khalishpur', name_bn: 'খালিশপুর' },
          { id: 'dumuria', name: 'Dumuria', name_bn: 'ডুমুরিয়া' },
        ],
      },
      {
        id: 'jashore',
        name: 'Jashore',
        name_bn: 'যশোর',
        upazilas: [
          { id: 'jashore-sadar', name: 'Jashore Sadar', name_bn: 'যশোর সদর' },
          { id: 'jhikargachha', name: 'Jhikargachha', name_bn: 'ঝিকরগাছা' },
          { id: 'benapole', name: 'Benapole / Sharsha', name_bn: 'বেনাপোল / শার্শা' },
        ],
      },
      {
        id: 'kushtia',
        name: 'Kushtia',
        name_bn: 'কুষ্টিয়া',
        upazilas: [
          { id: 'kushtia-sadar', name: 'Kushtia Sadar', name_bn: 'কুষ্টিয়া সদর' },
          { id: 'kumarkhali', name: 'Kumarkhali', name_bn: 'কুমারখালী' },
        ],
      },
      {
        id: 'satkhira',
        name: 'Satkhira',
        name_bn: 'সাতক্ষীরা',
        upazilas: [
          { id: 'satkhira-sadar', name: 'Satkhira Sadar', name_bn: 'সাতক্ষীরা সদর' },
          { id: 'kaliganj-satkhira', name: 'Kaliganj', name_bn: 'কালিগঞ্জ' },
        ],
      },
    ],
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    name_bn: 'সিলেট',
    districts: [
      {
        id: 'sylhet-district',
        name: 'Sylhet',
        name_bn: 'সিলেট',
        upazilas: [
          { id: 'sylhet-sadar', name: 'Sylhet Sadar', name_bn: 'সিলেট সদর' },
          { id: 'beanibazar', name: 'Beanibazar', name_bn: 'বিয়ানীবাজার' },
          { id: 'golapganj', name: 'Golapganj', name_bn: 'গোলাপগঞ্জ' },
        ],
      },
      {
        id: 'moulvibazar',
        name: 'Moulvibazar',
        name_bn: 'মৌলভীবাজার',
        upazilas: [
          { id: 'moulvibazar-sadar', name: 'Moulvibazar Sadar', name_bn: 'মৌলভীবাজার সদর' },
          { id: 'sreemangal', name: 'Sreemangal', name_bn: 'শ্রীমঙ্গল' },
          { id: 'kulaura', name: 'Kulaura', name_bn: 'কুলাউড়া' },
        ],
      },
      {
        id: 'habiganj',
        name: 'Habiganj',
        name_bn: 'হবিগঞ্জ',
        upazilas: [
          { id: 'habiganj-sadar', name: 'Habiganj Sadar', name_bn: 'হবিগঞ্জ সদর' },
          { id: 'madhabpur', name: 'Madhabpur', name_bn: 'মাধবপুর' },
        ],
      },
      {
        id: 'sunamganj',
        name: 'Sunamganj',
        name_bn: 'সুনামগঞ্জ',
        upazilas: [
          { id: 'sunamganj-sadar', name: 'Sunamganj Sadar', name_bn: 'সুনামগঞ্জ সদর' },
          { id: 'tahirpur', name: 'Tahirpur', name_bn: 'তাহিরপুর' },
        ],
      },
    ],
  },
  {
    id: 'barishal',
    name: 'Barishal',
    name_bn: 'বরিশাল',
    districts: [
      {
        id: 'barishal-district',
        name: 'Barishal',
        name_bn: 'বরিশাল',
        upazilas: [
          { id: 'barishal-sadar', name: 'Barishal Sadar', name_bn: 'বরিশাল সদর' },
          { id: 'bakerganj', name: 'Bakerganj', name_bn: 'বাকেরগঞ্জ' },
          { id: 'gournadi', name: 'Gournadi', name_bn: 'গৌরনদী' },
        ],
      },
      {
        id: 'patuakhali',
        name: 'Patuakhali',
        name_bn: 'পটুয়াখালী',
        upazilas: [
          { id: 'patuakhali-sadar', name: 'Patuakhali Sadar', name_bn: 'পটুয়াখালী সদর' },
          { id: 'kalapara', name: 'Kalapara / Kuakata', name_bn: 'কলাপাড়া / কুয়াকাটা' },
        ],
      },
      {
        id: 'bhola',
        name: 'Bhola',
        name_bn: 'ভোলা',
        upazilas: [
          { id: 'bhola-sadar', name: 'Bhola Sadar', name_bn: 'ভোলা সদর' },
          { id: 'charfasson', name: 'Char Fasson', name_bn: 'চরফ্যাশন' },
        ],
      },
    ],
  },
  {
    id: 'rangpur',
    name: 'Rangpur',
    name_bn: 'রংপুর',
    districts: [
      {
        id: 'rangpur-district',
        name: 'Rangpur',
        name_bn: 'রংপুর',
        upazilas: [
          { id: 'rangpur-sadar', name: 'Rangpur Sadar', name_bn: 'রংপুর সদর' },
          { id: 'pirganj', name: 'Pirganj', name_bn: 'পীরগঞ্জ' },
          { id: 'badarganj', name: 'Badarganj', name_bn: 'বদরগঞ্জ' },
        ],
      },
      {
        id: 'dinajpur',
        name: 'Dinajpur',
        name_bn: 'দিনাজপুর',
        upazilas: [
          { id: 'dinajpur-sadar', name: 'Dinajpur Sadar', name_bn: 'দিনাজপুর সদর' },
          { id: 'birganj', name: 'Birganj', name_bn: 'বীরগঞ্জ' },
          { id: 'parbatipur', name: 'Parbatipur', name_bn: 'পার্বতীপুর' },
        ],
      },
    ],
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh',
    name_bn: 'ময়মনসিংহ',
    districts: [
      {
        id: 'mymensingh-district',
        name: 'Mymensingh',
        name_bn: 'ময়মনসিংহ',
        upazilas: [
          { id: 'mymensingh-sadar', name: 'Mymensingh Sadar', name_bn: 'ময়মনসিংহ সদর' },
          { id: 'muktagachha', name: 'Muktagachha', name_bn: 'মুক্তাগাছা' },
          { id: 'trishal', name: 'Trishal', name_bn: 'ত্রিশাল' },
          { id: 'bhaluka', name: 'Bhaluka', name_bn: 'ভালুকা' },
        ],
      },
      {
        id: 'jamalpur',
        name: 'Jamalpur',
        name_bn: 'জামালপুর',
        upazilas: [
          { id: 'jamalpur-sadar', name: 'Jamalpur Sadar', name_bn: 'জামালপুর সদর' },
          { id: 'sarishabari', name: 'Sarishabari', name_bn: 'সরিষাবাড়ী' },
        ],
      },
    ],
  },
];

// Delivery fee configuration (BDT ৳)
export const DELIVERY_FEES = {
  INSIDE_DHAKA: 60,
  OUTSIDE_DHAKA: 120,
  FREE_DELIVERY_THRESHOLD: 1500, // Free delivery for orders >= ৳1500
};

/**
 * Check if the address is inside Dhaka city / district
 */
export function isInsideDhaka(divisionNameOrId: string, districtNameOrId: string): boolean {
  const normDiv = divisionNameOrId.toLowerCase().trim();
  const normDist = districtNameOrId.toLowerCase().trim();

  return (
    (normDiv.includes('dhaka') || normDiv.includes('ঢাকা')) &&
    (normDist.includes('dhaka') || normDist.includes('ঢাকা'))
  );
}

/**
 * Calculate the exact delivery fee based on location and subtotal
 */
export function calculateDeliveryFee(
  division: string,
  district: string,
  subtotal: number = 0
): number {
  if (subtotal >= DELIVERY_FEES.FREE_DELIVERY_THRESHOLD) {
    return 0;
  }
  return isInsideDhaka(division, district)
    ? DELIVERY_FEES.INSIDE_DHAKA
    : DELIVERY_FEES.OUTSIDE_DHAKA;
}

