-- ==============================================================================
-- Pataghor (পাতাঘর) - Seed Data
-- 30 Realistic Books (Bangla & English), Authors, Publishers, Categories, Coupons
-- ==============================================================================

-- 1. SEED CATEGORIES
INSERT INTO public.categories (id, name, name_bn, slug, description, description_bn, icon, is_featured, sort_order)
VALUES
('c0000000-0000-0000-0000-000000000001', 'Fiction', 'উপন্যাস ও কথাসাহিত্য', 'fiction', 'Novels and story collections', 'জনপ্রিয় বাংলা ও বিশ্ব সাহিত্যের সেরা উপন্যাস', 'BookOpen', true, 1),
('c0000000-0000-0000-0000-000000000002', 'Poetry', 'কবিতা ও কাব্যগ্রন্থ', 'poetry', 'Poetic anthologies and verses', 'কালজয়ী ও আধুনিক কবিদের কবিতা', 'Feather', true, 2),
('c0000000-0000-0000-0000-000000000003', 'Thriller & Mystery', 'রহস্য ও রোমাঞ্চ', 'thriller-mystery', 'Detective, crime, and suspense thrillers', 'রোমাঞ্চকর গোয়েন্দা ও রহস্য উপন্যাস', 'Compass', true, 3),
('c0000000-0000-0000-0000-000000000004', 'Science Fiction', 'বৈজ্ঞানিক কল্পকাহিনী', 'sci-fi', 'Science fiction and futuristic worlds', 'রোমাঞ্চকর সাই-ফাই ও মহাকাশ অভিযানের গল্প', 'Sparkles', true, 4),
('c0000000-0000-0000-0000-000000000005', 'History & Liberation War', 'ইতিহাস ও মুক্তিযুদ্ধ', 'history-liberation-war', 'Bangladesh liberation war & world history', 'বাংলাদেশের মুক্তিযুদ্ধ এবং রক্তক্ষয়ী সংগ্রামের ইতিহাস', 'Landmark', true, 5),
('c0000000-0000-0000-0000-000000000006', 'Self Development & Career', 'আত্মউন্নয়ন ও ক্যারিয়ার', 'self-development', 'Productivity, career growth, and mindfulness', 'ব্যক্তিগত দক্ষতা ও জীবন গড়ার সহায়ক বই', 'Lightbulb', true, 6),
('c0000000-0000-0000-0000-000000000007', 'Children & Teen', 'কিশোর ও শিশু সাহিত্য', 'children-teen', 'Books for young minds and adolescents', 'কিশোর ক্লাসিক, রূপকথা ও মজার গল্প', 'Smile', true, 7),
('c0000000-0000-0000-0000-000000000008', 'English Literature', 'ইংরেজি সাহিত্য', 'english-literature', 'Classics, contemporary bestsellers in English', 'বিশ্বখ্যাত ইংরেজি উপন্যাস ও ক্লাসিক সংগ্রহ', 'Globe', true, 8)
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED AUTHORS
INSERT INTO public.authors (id, name, name_bn, slug, bio, bio_bn, photo_url, is_featured)
VALUES
('a0000000-0000-0000-0000-000000000001', 'Humayun Ahmed', 'হুমায়ূন আহমেদ', 'humayun-ahmed', 'Prolific Bangladeshi author, dramatist, screenwriter, and filmmaker.', 'বাংলা সাহিত্যের নন্দিত কথাসাহিত্যিক, নাট্যকার ও চলচ্চিত্র নির্মাতা।', 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80', true),
('a0000000-0000-0000-0000-000000000002', 'Rabindranath Tagore', 'রবীন্দ্রনাথ ঠাকুর', 'rabindranath-tagore', 'Nobel laureate polymath who reshaped Bengali literature and music.', 'নোবেল বিজয়ী বিশ্বকবি, গীতিকার, সুরকার ও চিন্তাবিদ।', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', true),
('a0000000-0000-0000-0000-000000000003', 'Kazi Nazrul Islam', 'কাজী নজরুল ইসলাম', 'kazi-nazrul-islam', 'The National Poet of Bangladesh, pioneer of rebel literature.', 'বাংলাদেশের জাতীয় কবি, বিদ্রোহী কবি ও মানবতার অমর কণ্ঠস্বর।', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', true),
('a0000000-0000-0000-0000-000000000004', 'Muhammad Zafar Iqbal', 'মুহম্মদ জাফর ইকবাল', 'muhammad-zafar-iqbal', 'Renowned science fiction writer, academic, and activist.', 'বাংলাদেশের বিশিষ্ট লেখক, পদার্থবিদ, শিক্ষাবিদ ও জনপ্রিয় বৈজ্ঞানিক কল্পকাহিনীর স্রষ্টা।', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', true),
('a0000000-0000-0000-0000-000000000005', 'Rokeya Sakhawat Hossain', 'বেগম রোকেয়া', 'rokeya-sakhawat-hossain', 'Pioneer of Bengali feminist thinking, visionary educator and writer.', 'বাঙালি নারী জাগরণের অগ্রদূত, শিক্ষাবিদ ও দূরদর্শী লেখিকা।', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', true),
('a0000000-0000-0000-0000-000000000006', 'Akhteruzzaman Elias', 'আখতারুজ্জামান ইলিয়াস', 'akhteruzzaman-elias', 'Master novelist of Bengali socio-political realism.', 'বাংলা সাহিত্যের অন্যতম শক্তিমান কথাসাহিত্যিক।', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', true),
('a0000000-0000-0000-0000-000000000007', 'Tahmima Anam', 'তাহমিমা আনাম', 'tahmima-anam', 'Award-winning British-Bangladeshi author of the Bengal Trilogy.', 'কমনওয়েলথ রাইটার্স প্রাইজ বিজয়ী খ্যাতিমান লেখক।', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80', false),
('a0000000-0000-0000-0000-000000000008', 'George Orwell', 'জর্জ অরওয়েল', 'george-orwell', 'English novelist and essayist renowned for dystopian visions.', 'বিশ্বখ্যাত ব্রিটিশ ঔপন্যাসিক ও রাজনৈতিক বিশ্লেষক।', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', false),
('a0000000-0000-0000-0000-000000000009', 'Haruki Murakami', 'হারুকি মুরাকামি', 'haruki-murakami', 'Acclaimed contemporary Japanese writer of surrealist fiction.', 'জাপানের পরাবাস্তববাদী ও বিশ্বনন্দিত সমকালীন লেখক।', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80', false),
('a0000000-0000-0000-0000-000000000010', 'Shamsur Rahman', 'শামসুর রাহমান', 'shamsur-rahman', 'Foremost modernist poet of modern Bangladesh.', 'আধুনিক বাংলা কবিতার অন্যতম প্রধান পুরোধা কবি।', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80', false)
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED PUBLISHERS
INSERT INTO public.publishers (id, name, name_bn, slug, description, website)
VALUES
('p0000000-0000-0000-0000-000000000001', 'Anyaprokash', 'অন্যপ্রকাশ', 'anyaprokash', 'One of the leading publication houses of Bangladesh.', 'https://anyaprokash.com'),
('p0000000-0000-0000-0000-000000000002', 'Somoy Prokashon', 'সময় প্রকাশন', 'somoy-prokashon', 'Renowned for literature and liberation war historical works.', 'https://somoyprokashon.com'),
('p0000000-0000-0000-0000-000000000003', 'Prothoma Prokashan', 'প্রথমা প্রকাশন', 'prothoma-prokashan', 'Publisher of award-winning non-fiction, politics, and literary gems.', 'https://prothoma.com'),
('p0000000-0000-0000-0000-000000000004', 'Kakoli Prokashoni', 'কাকলী প্রকাশনী', 'kakoli-prokashoni', 'Famous for classic fiction, teenage adventures and drama.', 'https://kakoli.com.bd'),
('p0000000-0000-0000-0000-000000000005', 'Batighar', 'বাতিঘর', 'batighar', 'Celebrated for high-quality literary productions and translations.', 'https://batighar.com'),
('p0000000-0000-0000-0000-000000000006', 'Penguin Classics', 'পেঙ্গুইন ক্লাসিকস', 'penguin-classics', 'Global home of classic literature.', 'https://penguin.com')
ON CONFLICT (slug) DO NOTHING;

-- 4. SEED COUPONS
INSERT INTO public.coupons (code, discount_type, discount_value, min_order_amount, max_discount_amount, valid_until, is_active)
VALUES
('BOIMELA20', 'percentage', 20.00, 500.00, 200.00, timezone('utc'::text, now() + interval '90 days'), true),
('PATAGHOR50', 'fixed', 50.00, 300.00, NULL, timezone('utc'::text, now() + interval '60 days'), true),
('READER100', 'fixed', 100.00, 1000.00, NULL, timezone('utc'::text, now() + interval '30 days'), true)
ON CONFLICT (code) DO NOTHING;

-- 5. SEED 30 SAMPLE BOOKS
INSERT INTO public.books (
    id, title, title_bn, slug, author_id, publisher_id, isbn, price, discount_price, 
    stock_quantity, pages, language, published_year, edition, cover_url, 
    description, description_bn, is_featured, is_bestseller, is_flash_sale, 
    flash_sale_end, rating_avg, rating_count
) VALUES
-- 1. Shonkhonil Karagar
('b0000000-0000-0000-0000-000000000001', 'Shonkhonil Karagar', 'শঙ্খনীল কারাগার', 'shonkhonil-karagar',
 'a0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', '978-9844120150',
 280.00, 240.00, 45, 128, 'bn', 1973, '12th Edition',
 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
 'The debut masterpiece novel by Humayun Ahmed capturing the pathos of a middle-class Dhaka family.',
 'হুমায়ূন আহমেদের প্রথম উপন্যাস। মধ্যবিত্ত পরিবারের আবেগ, টানাপোড়েন ও বিষাদের এক হৃদয়স্পর্শী উপাখ্যান।',
 true, true, false, NULL, 4.85, 142),

-- 2. Debi (Misir Ali)
('b0000000-0000-0000-0000-000000000002', 'Debi', 'দেবী', 'debi-misir-ali',
 'a0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', '978-9844120228',
 250.00, 200.00, 38, 144, 'bn', 1985, '18th Edition',
 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80',
 'First psychological thriller featuring the iconic psychoanalyst detective Misir Ali and Ranu.',
 'মিসির আলি সিরিজের প্রথম ও অবিস্মরণীয় মনস্তাত্ত্বিক রহস্য উপন্যাস। রানু ও মিসির আলির রহস্যময় দ্বৈরথ।',
 true, true, true, timezone('utc'::text, now() + interval '5 days'), 4.90, 210),

-- 3. Moyurakkhi (Himu)
('b0000000-0000-0000-0000-000000000003', 'Moyurakkhi', 'ময়ূরাক্ষী', 'moyurakkhi-himu',
 'a0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', '978-9844120303',
 220.00, 180.00, 60, 112, 'bn', 1990, '25th Edition',
 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
 'The genesis of yellow-clad vagabond Himu wandering barefoot across the streets of Dhaka.',
 'হলুদ পাঞ্জাবি গায়ে খালি পায়ে ঢাকা শহরের রাজপথে হাঁটা ভবঘুরে কাল্ট চরিত্র হিমুর প্রথম উপন্যাস।',
 true, true, false, NULL, 4.88, 315),

-- 4. Josna O Jononir Golpo
('b0000000-0000-0000-0000-000000000004', 'Josna O Jononir Golpo', 'জোছনা ও জননীর গল্প', 'josna-o-jononir-golpo',
 'a0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', '978-9844123502',
 850.00, 680.00, 25, 520, 'bn', 2004, '8th Edition',
 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
 'Epic historical fiction based on the 1971 Bangladesh Liberation War by Humayun Ahmed.',
 '১৯৭১ সালের মহান মুক্তিযুদ্ধকে উপজীব্য করে রচিত হুমায়ূন আহমেদের মহাকাব্যিক উপন্যাস।',
 true, true, false, NULL, 4.95, 420),

-- 5. Moddhanho
('b0000000-0000-0000-0000-000000000005', 'Moddhanho (Part 1 & 2)', 'মধ্যাহ্ন (১ম ও ২য় খণ্ড)', 'moddhanho',
 'a0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000001', '978-9844125506',
 700.00, 560.00, 20, 480, 'bn', 2008, '5th Edition',
 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&q=80',
 'A sweeping historical saga depicting early 20th century Bengal and notable historical figures.',
 'বিংশ শতাব্দীর সূচনাপর্বের অবিভক্ত বাংলার সামাজিক পটভূমি ও ঐতিহাসিক চরিত্রের অসাধারণ কোলাজ।',
 false, false, false, NULL, 4.70, 85),

-- 6. Gitanjali (Rabindranath Tagore)
('b0000000-0000-0000-0000-000000000006', 'Gitanjali', 'গীতাঞ্জলি', 'gitanjali',
 'a0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000005', '978-9844010017',
 350.00, 290.00, 50, 220, 'bn', 1910, 'Centenary Edition',
 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
 'The timeless Song Offerings that earned Asia its first Nobel Prize in Literature in 1913.',
 'রবীন্দ্রনাথ ঠাকুরের নোবেল বিজয়ী অমর কাব্যগ্রন্থ। ভক্তি ও আধ্যাত্মিকতার অপূর্ব মেলবন্ধন।',
 true, true, false, NULL, 4.98, 510),

-- 7. Shesher Kobita
('b0000000-0000-0000-0000-000000000007', 'Shesher Kobita', 'শেষের কবিতা', 'shesher-kobita',
 'a0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000005', '978-9844010154',
 260.00, 220.00, 40, 160, 'bn', 1929, 'New Edition',
 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&q=80',
 'Poetic modern romance exploring love vs marriage between Amit Ray and Labanya.',
 'অমিত রায় ও লাবণ্যর অমলিন ভালোবাসার রোমান্টিক উপন্যাস। আধুনিক মনন ও কাব্যের যুগলবন্দী।',
 true, false, true, timezone('utc'::text, now() + interval '3 days'), 4.82, 195),

-- 8. Chokher Bali
('b0000000-0000-0000-0000-000000000008', 'Chokher Bali', 'চোখের বালি', 'chokher-bali',
 'a0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000005', '978-9844010291',
 300.00, 255.00, 30, 240, 'bn', 1903, 'Special Edition',
 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80',
 'A groundbreaking psychological novel exploring widowhood, desire, and jealousy.',
 'বিনোদিনী, মহেন্দ্র ও আশালতার মনস্তাত্ত্বিক দ্বন্দ্ব ও জটিল মানবিক সম্পর্কের কালজয়ী উপন্যাস।',
 false, false, false, NULL, 4.65, 110),

-- 9. Gora
('b0000000-0000-0000-0000-000000000009', 'Gora', 'গোরা', 'gora',
 'a0000000-0000-0000-0000-000000000002', 'p0000000-0000-0000-0000-000000000005', '978-9844010321',
 480.00, 410.00, 18, 490, 'bn', 1910, 'Hardcover',
 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=600&q=80',
 'Epic philosophical novel of national identity, religion, and human unity.',
 'জাতীয়তাবাদ, ধর্ম ও মানবমুক্তির প্রশ্নে রবীন্দ্রনাথের অন্যতম বৃহত্তম দার্শনিক উপন্যাস।',
 false, false, false, NULL, 4.80, 75),

-- 10. Agnibeena (Kazi Nazrul Islam)
('b0000000-0000-0000-0000-000000000010', 'Agnibeena', 'অগ্নিবীণা', 'agnibeena',
 'a0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000002', '978-9844200055',
 220.00, 185.00, 55, 96, 'bn', 1922, 'Commemorative Edition',
 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80',
 'Iconic first anthology containing revolutionary poems like Bidrohi (The Rebel).',
 'বিদ্রোহী কবির প্রথম কাব্যগ্রন্থ। এতে রয়েছে কালজয়ী কবিতা "বিদ্রোহী" ও "প্রলয়োল্লাস"।',
 true, true, false, NULL, 4.95, 380),

-- 11. Sanchita
('b0000000-0000-0000-0000-000000000011', 'Sanchita', 'সঞ্চিতা', 'sanchita',
 'a0000000-0000-0000-0000-000000000003', 'p0000000-0000-0000-0000-000000000002', '978-9844200185',
 400.00, 340.00, 35, 310, 'bn', 1928, 'Deluxe Edition',
 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80',
 'The comprehensive collection of Nazruls best-loved poems and songs.',
 'কাজী নজরুল ইসলামের শ্রেষ্ঠ ও জনপ্রিয় কবিতার প্রামাণ্য সংকলন।',
 false, false, false, NULL, 4.89, 140),

-- 12. Dipu Number Two (Muhammad Zafar Iqbal)
('b0000000-0000-0000-0000-000000000012', 'Dipu Number Two', 'দীপু নাম্বার টু', 'dipu-number-two',
 'a0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004', '978-9844300109',
 240.00, 200.00, 70, 160, 'bn', 1984, '22nd Edition',
 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=600&q=80',
 'Beloved coming-of-age adolescent adventure novel about school life, friendship, and bravery.',
 'কিশোর দীপুর রোমাঞ্চকর স্কুল জীবন, বন্ধুত্ব ও সাহসিকতার অবিস্মরণীয় কিশোর উপন্যাস।',
 true, true, true, timezone('utc'::text, now() + interval '4 days'), 4.92, 450),

-- 13. Koptronic Sukh
('b0000000-0000-0000-0000-000000000013', 'Koptronic Sukh', 'কপোট্রনিক সুখ-দুঃখ', 'koptronic-sukh',
 'a0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004', '978-9844300253',
 200.00, 170.00, 40, 110, 'bn', 1976, '15th Edition',
 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
 'Groundbreaking science fiction novel heralding modern Bangladeshi Sci-Fi.',
 'বাংলাদেশের আধুনিক বৈজ্ঞানিক কল্পকাহিনীর মাইলফলক গ্রন্থ। এক রোবটের আবেগ ও মানবিক অনুভূতির গল্প।',
 true, false, false, NULL, 4.78, 185),

-- 14. Tukunjil
('b0000000-0000-0000-0000-000000000014', 'Tukunjil', 'টুকুঞ্জিল', 'tukunjil',
 'a0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004', '978-9844300451',
 210.00, 180.00, 32, 120, 'bn', 1993, '10th Edition',
 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
 'A captivating sci-fi story about an alien miniature creature on earth.',
 'অন্য গ্রহের এক আশ্চর্য ক্ষুদ্র প্রাণীর পৃথিবীতে আগমন নিয়ে অসাধারণ বৈজ্ঞানিক কল্পকাহিনী।',
 false, false, false, NULL, 4.75, 120),

-- 15. Sultana''s Dream (Rokeya Sakhawat Hossain)
('b0000000-0000-0000-0000-000000000015', 'Sultanas Dream', 'সুলতানার স্বপ্ন', 'sultanas-dream',
 'a0000000-0000-0000-0000-000000000005', 'p0000000-0000-0000-0000-000000000003', '978-9844400018',
 180.00, 150.00, 48, 80, 'bn', 1905, 'Bilingual Classic',
 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80',
 'Early 20th century feminist science fiction utopia Ladyland where women rule with solar tech.',
 '১৯০৫ সালে রচিত পৃথিবীর অন্যতম প্রথম নারীবাদী কল্পবিজ্ঞান। নারীশিক্ষা ও মুক্তির দূরদর্শী স্বপ্ন।',
 true, true, false, NULL, 4.90, 260),

-- 16. Motichur
('b0000000-0000-0000-0000-000000000016', 'Motichur', 'মতিচূর', 'motichur',
 'a0000000-0000-0000-0000-000000000005', 'p0000000-0000-0000-0000-000000000003', '978-9844400155',
 240.00, 200.00, 25, 175, 'bn', 1904, 'New Print',
 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
 'A fierce collection of socio-critical essays addressing women oppression and education.',
 'বাঙালি নারীর আত্মমর্যাদা ও অধিকার প্রতিষ্ঠায় বেগম রোকেয়ার শাণিত প্রবন্ধ সংকলন।',
 false, false, false, NULL, 4.72, 80),

-- 17. Chilekothar Sepai (Akhteruzzaman Elias)
('b0000000-0000-0000-0000-000000000017', 'Chilekothar Sepai', 'চিলেকোঠার সেপাই', 'chilekothar-sepai',
 'a0000000-0000-0000-0000-000000000006', 'p0000000-0000-0000-0000-000000000003', '978-9844500021',
 550.00, 465.00, 22, 380, 'bn', 1986, '7th Edition',
 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&q=80',
 'Monumental novel chronicling the 1969 Mass Uprising in East Pakistan with raw realism.',
 '১৯৬৯-এর গণঅভ্যুত্থানের প্রেক্ষাপটে রচিত বাংলা সাহিত্যের এক অসামান্য মহাকাব্যিক উপন্যাস।',
 true, true, false, NULL, 4.94, 215),

-- 18. Khowabnama
('b0000000-0000-0000-0000-000000000018', 'Khowabnama', 'খোয়াবনামা', 'khowabnama',
 'a0000000-0000-0000-0000-000000000006', 'p0000000-0000-0000-0000-000000000003', '978-9844500144',
 520.00, 440.00, 19, 360, 'bn', 1996, '5th Edition',
 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
 'Magnum opus interweaving magical realism, rural myth, and the Tebhaga peasant movement.',
 'তেভাগা আন্দোলন ও গ্রামীণ জনজীবনের মিথ নিয়ে রচিত জাদুকরী বাস্তবতার এক শ্রেষ্ঠ উপন্যাস।',
 false, false, false, NULL, 4.88, 160),

-- 19. A Golden Age (Tahmima Anam)
('b0000000-0000-0000-0000-000000000019', 'A Golden Age', 'আ গোল্ডেন এইজ', 'a-golden-age',
 'a0000000-0000-0000-0000-000000000007', 'p0000000-0000-0000-0000-000000000006', '978-0061478901',
 650.00, 520.00, 30, 288, 'en', 2007, 'Paperback',
 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&q=80',
 'Commonwealth Writers Prize winner; an unforgettable story of a mother love during the 1971 war.',
 '১৯৭১ সালের মুক্তিযুদ্ধ নিয়ে রচিত আন্তর্জাতিক খ্যাতিসম্পন্ন উপন্যাস। এক মায়ের আত্মত্যাগের গল্প।',
 true, false, true, timezone('utc'::text, now() + interval '2 days'), 4.79, 130),

-- 20. The Good Muslim
('b0000000-0000-0000-0000-000000000020', 'The Good Muslim', 'দ্য গুড মুসলিম', 'the-good-muslim',
 'a0000000-0000-0000-0000-000000000007', 'p0000000-0000-0000-0000-000000000006', '978-0061478956',
 600.00, 499.00, 16, 304, 'en', 2011, 'Paperback',
 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80',
 'The powerful sequel to A Golden Age tracing post-war trauma and faith in Bangladesh.',
 'মুক্তিযুদ্ধ-পরবর্তী বাংলাদেশের পুনর্গঠন, আদর্শিক সংঘাত ও পরিবারের গল্প।',
 false, false, false, NULL, 4.60, 65),

-- 21. 1984 (George Orwell)
('b0000000-0000-0000-0000-000000000021', '1984', '১৯৮৪', '1984-george-orwell',
 'a0000000-0000-0000-0000-000000000008', 'p0000000-0000-0000-0000-000000000006', '978-0451524935',
 450.00, 380.00, 50, 328, 'en', 1949, 'Modern Classics',
 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
 'The seminal dystopian novel introducing Big Brother, Thought Police, and totalitarianism.',
 'বিশ্ব কাঁপানো ডিস্টোপিয়ান ক্লাসিক উপন্যাস। নজরদারি রাষ্ট্র ও মতপ্রকাশের স্বাধীনতার দ্বন্দ্ব।',
 true, true, false, NULL, 4.88, 720),

-- 22. Animal Farm
('b0000000-0000-0000-0000-000000000022', 'Animal Farm', 'অ্যানিম্যাল ফার্ম', 'animal-farm',
 'a0000000-0000-0000-0000-000000000008', 'p0000000-0000-0000-0000-000000000006', '978-0451526342',
 300.00, 250.00, 42, 144, 'en', 1945, 'Centennial Edition',
 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
 'A brilliant political satire allegorizing the rise of tyranny among farmyard creatures.',
 'রাজনৈতিক রূপকধর্মী মাস্টারপিস। ক্ষমতা ও স্বৈরতন্ত্রের জন্ম নিয়ে ক্ষুরধার ব্যঙ্গ উপন্যাস।',
 false, true, false, NULL, 4.84, 530),

-- 23. Norwegian Wood (Haruki Murakami)
('b0000000-0000-0000-0000-000000000023', 'Norwegian Wood', 'নরওয়েজিয়ান উড', 'norwegian-wood',
 'a0000000-0000-0000-0000-000000000009', 'p0000000-0000-0000-0000-000000000006', '978-0307744661',
 580.00, 480.00, 28, 296, 'en', 1987, 'Vintage Edition',
 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80',
 'A nostalgic journey through grief, mental health, and youth in 1960s Tokyo.',
 'হারুকি মুরাকামির কাল্ট রোমান্টিক উপন্যাস। নিঃসঙ্গতা ও ভালোবাসার এক অবিস্মরণীয় উপাখ্যান।',
 true, true, false, NULL, 4.75, 340),

-- 24. Kafka on the Shore
('b0000000-0000-0000-0000-000000000024', 'Kafka on the Shore', 'কাফকা অন দ্য শোর', 'kafka-on-the-shore',
 'a0000000-0000-0000-0000-000000000009', 'p0000000-0000-0000-0000-000000000006', '978-1400079278',
 650.00, 550.00, 20, 505, 'en', 2002, 'Vintage Edition',
 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
 'A metaphysical mind-bending tour-de-force with talking cats and fish raining from sky.',
 'পরাবাস্তব ধাঁচের অনন্য সাহিত্যকর্ম। অলৌকিক ও রহস্যময় এক আত্মানুসন্ধান।',
 false, false, true, timezone('utc'::text, now() + interval '6 days'), 4.81, 290),

-- 25. Roudro Korotite (Shamsur Rahman)
('b0000000-0000-0000-0000-000000000025', 'Roudro Korotite', 'রৌদ্র করোটিতে', 'roudro-korotite',
 'a0000000-0000-0000-0000-000000000010', 'p0000000-0000-0000-0000-000000000002', '978-9844600118',
 250.00, 210.00, 30, 112, 'bn', 1963, '5th Edition',
 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
 'One of the defining modernist poetry books of 1960s East Bengal.',
 'কবি শামসুর রাহমানের আধুনিক নাগরিক জীবনের রূপকার হয়ে ওঠার অন্যতম স্মরণীয় কাব্যগ্রন্থ।',
 false, false, false, NULL, 4.68, 62),

-- 26. Bondi Shibir Theke
('b0000000-0000-0000-0000-000000000026', 'Bondi Shibir Theke', 'বন্দী শিবির থেকে', 'bondi-shibir-theke',
 'a0000000-0000-0000-0000-000000000010', 'p0000000-0000-0000-0000-000000000002', '978-9844600224',
 220.00, 190.00, 35, 96, 'bn', 1972, 'Commemorative Edition',
 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80',
 'Written secretly under occupied Dhaka in 1971; includes "Tomake Paowar Jonno He Swadhinata".',
 '১৯৭১ সালে অবরুদ্ধ ঢাকায় বসে রচিত বিখ্যাত কবিতা "তোমাকে পাওয়ার জন্যে, হে স্বাধীনতা"-র উৎস।',
 true, false, false, NULL, 4.91, 145),

-- 27. Ekattorer Dinguli (Jahanara Imam)
('b0000000-0000-0000-0000-000000000027', 'Ekattorer Dinguli', 'একাত্তরের দিনগুলি', 'ekattorer-dinguli',
 'a0000000-0000-0000-0000-000000000005', 'p0000000-0000-0000-0000-000000000002', '978-9844700015',
 380.00, 320.00, 60, 272, 'bn', 1986, '24th Edition',
 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
 'Heartbreaking diary of the 1971 liberation war by Shahid Janani Jahanara Imam.',
 'শহীদ জননী জাহানারা ইমামের রচিত ১৯৭১ সালের অবরুদ্ধ ঢাকার অশ্রুসজল দিনলিপি।',
 true, true, false, NULL, 4.96, 610),

-- 28. Parashonar Sahaj Niyom
('b0000000-0000-0000-0000-000000000028', 'Parashonar Sahaj Niyom', 'পড়াশোনার সহজ নিয়ম', 'parashonar-sahaj-niyom',
 'a0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000004', '978-9844300888',
 180.00, 150.00, 50, 110, 'bn', 2013, '14th Edition',
 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=600&q=80',
 'A practical and encouraging guide for students to master learning, memory, and focus.',
 'শিক্ষার্থীদের পড়াশোনায় মনোযোগ, স্মরণশক্তি বৃদ্ধি ও সহজ পদ্ধতির চমৎকার ব্যবহারিক নির্দেশিকা।',
 true, false, false, NULL, 4.82, 190),

-- 29. Time Management O Career
('b0000000-0000-0000-0000-000000000029', 'Time Management O Career', 'টাইম ম্যানেজমেন্ট ও ক্যারিয়ার', 'time-management-career',
 'a0000000-0000-0000-0000-000000000004', 'p0000000-0000-0000-0000-000000000003', '978-9844800331',
 260.00, 220.00, 40, 160, 'bn', 2020, '4th Edition',
 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80',
 'Crucial strategies for productivity, overcoming procrastination, and career success in Bangladesh.',
 'সময়ের সঠিক ব্যবস্থাপনা, দীর্ঘসূত্রিতা পরিহার ও ক্যারিয়ারে সাফল্য লাভের কার্যকরী কলাকৌশল।',
 false, false, true, timezone('utc'::text, now() + interval '5 days'), 4.70, 95),

-- 30. Borof Gola Nodi (Zahir Raihan)
('b0000000-0000-0000-0000-000000000030', 'Borof Gola Nodi', 'বরফ গলা নদী', 'borof-gola-nodi',
 'a0000000-0000-0000-0000-000000000001', 'p0000000-0000-0000-0000-000000000002', '978-9844900552',
 290.00, 245.00, 35, 180, 'bn', 1969, '11th Edition',
 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&q=80',
 'Zahir Raihans poignant portrayal of middle-class struggles and societal decay in Dhaka.',
 'জহির রায়হানের কালজয়ী উপন্যাস। মধ্যবিত্ত পরিবারের অর্থনৈতিক সংগ্রাম ও মানবিক অবক্ষয়ের দলিল।',
 true, true, false, NULL, 4.89, 280)
ON CONFLICT (slug) DO NOTHING;

-- 6. MAP BOOKS TO CATEGORIES
INSERT INTO public.book_categories (book_id, category_id) VALUES
('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000003'),
('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000005'),
('b0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000002'),
('b0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000002'),
('b0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000002'),
('b0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000002'),
('b0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000007'),
('b0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000004'),
('b0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000004'),
('b0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000007'),
('b0000000-0000-0000-0000-000000000015', 'c0000000-0000-0000-0000-000000000004'),
('b0000000-0000-0000-0000-000000000016', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000017', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000017', 'c0000000-0000-0000-0000-000000000005'),
('b0000000-0000-0000-0000-000000000018', 'c0000000-0000-0000-0000-000000000001'),
('b0000000-0000-0000-0000-000000000019', 'c0000000-0000-0000-0000-000000000005'),
('b0000000-0000-0000-0000-000000000019', 'c0000000-0000-0000-0000-000000000008'),
('b0000000-0000-0000-0000-000000000020', 'c0000000-0000-0000-0000-000000000008'),
('b0000000-0000-0000-0000-000000000021', 'c0000000-0000-0000-0000-000000000008'),
('b0000000-0000-0000-0000-000000000022', 'c0000000-0000-0000-0000-000000000008'),
('b0000000-0000-0000-0000-000000000023', 'c0000000-0000-0000-0000-000000000008'),
('b0000000-0000-0000-0000-000000000024', 'c0000000-0000-0000-0000-000000000008'),
('b0000000-0000-0000-0000-000000000025', 'c0000000-0000-0000-0000-000000000002'),
('b0000000-0000-0000-0000-000000000026', 'c0000000-0000-0000-0000-000000000002'),
('b0000000-0000-0000-0000-000000000026', 'c0000000-0000-0000-0000-000000000005'),
('b0000000-0000-0000-0000-000000000027', 'c0000000-0000-0000-0000-000000000005'),
('b0000000-0000-0000-0000-000000000028', 'c0000000-0000-0000-0000-000000000006'),
('b0000000-0000-0000-0000-000000000029', 'c0000000-0000-0000-0000-000000000006'),
('b0000000-0000-0000-0000-000000000030', 'c0000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;
