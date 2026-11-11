import { Author, Book, Category, Coupon, Department, Order, OrderItem, OrderStatus, Publisher } from '@/types';
import { DEPARTMENTS, DepartmentInfo, getEnrichedBooks, SEED_AUTHORS, SEED_CATEGORIES, SEED_COUPONS, SEED_PUBLISHERS } from './seedData';
import { createServerSupabaseClient } from '../supabase/server';

// In-memory runtime store for development and demo mode
let dynamicBooks: Book[] = [...getEnrichedBooks()];
const dynamicCategories: Category[] = [...SEED_CATEGORIES];
const dynamicAuthors: Author[] = [...SEED_AUTHORS];
const dynamicPublishers: Publisher[] = [...SEED_PUBLISHERS];
const dynamicCoupons: Coupon[] = [...SEED_COUPONS];
let dynamicOrders: Order[] = [
  {
    id: 'ord-101',
    order_number: 'PTG-84291',
    user_id: null,
    customer_name: 'Tanvir Hossain',
    customer_email: 'tanvir@example.com',
    customer_phone: '01712345678',
    status: 'shipped',
    payment_method: 'cod',
    payment_status: 'unpaid',
    subtotal: 620,
    discount_amount: 50,
    delivery_fee: 60,
    total_amount: 630,
    coupon_code: 'PATAGHOR50',
    shipping_division: 'Dhaka',
    shipping_district: 'Dhaka',
    shipping_upazila: 'Dhanmondi',
    shipping_street_address: 'House 42, Road 7A, Dhanmondi R/A',
    notes: 'Please call before delivery',
    tracking_notes: 'Dispatched via Pathao Courier (Tracking: PTH-99213)',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item-1',
        book_id: 'b0000000-0000-0000-0000-000000000001',
        book_title: 'Shonkhonil Karagar',
        book_title_bn: 'শঙ্খনীল কারাগার',
        book_cover_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
        unit_price: 240,
        quantity: 1,
        total_price: 240,
      },
      {
        id: 'item-2',
        book_id: 'b0000000-0000-0000-0000-000000000021',
        book_title: '1984',
        book_title_bn: '১৯৮৪',
        book_cover_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
        unit_price: 380,
        quantity: 1,
        total_price: 380,
      },
    ],
  },
  {
    id: 'ord-102',
    order_number: 'PTG-91024',
    user_id: null,
    customer_name: 'Farhana Akter',
    customer_email: 'farhana@example.com',
    customer_phone: '01898765432',
    status: 'delivered',
    payment_method: 'cod',
    payment_status: 'paid',
    subtotal: 410,
    discount_amount: 0,
    delivery_fee: 120,
    total_amount: 530,
    coupon_code: null,
    shipping_division: 'Chattogram',
    shipping_district: 'Chattogram',
    shipping_upazila: 'Panchlaish',
    shipping_street_address: 'Badurtala, Sholoshohor',
    notes: '',
    tracking_notes: 'Delivered successfully by RedX',
    created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    items: [
      {
        id: 'item-3',
        book_id: 'b0000000-0000-0000-0000-000000000009',
        book_title: 'Gora',
        book_title_bn: 'গোরা',
        book_cover_url: 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=600&q=80',
        unit_price: 410,
        quantity: 1,
        total_price: 410,
      },
    ],
  },
];

export interface BookFilterOptions {
  department?: Department | string;
  category?: string;
  author?: string;
  publisher?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sort?: string;
  limit?: number;
  offset?: number;
  isBestseller?: boolean;
  isFlashSale?: boolean;
}

export async function getBooks(options: BookFilterOptions = {}): Promise<{ books: Book[]; total: number }> {
  const supabase = await createServerSupabaseClient();

  // If Supabase is connected, query Supabase
  if (supabase) {
    try {
      let query = supabase.from('books').select('*, author:authors(*), publisher:publishers(*)', { count: 'exact' });

      if (options.language) {
        query = query.eq('language', options.language);
      }
      if (options.author) {
        query = query.eq('authors.slug', options.author);
      }
      if (options.minPrice !== undefined) {
        query = query.gte('price', options.minPrice);
      }
      if (options.maxPrice !== undefined) {
        query = query.lte('price', options.maxPrice);
      }
      if (options.inStock) {
        query = query.gt('stock_quantity', 0);
      }
      if (options.search) {
        query = query.or(`title.ilike.%${options.search}%,title_bn.ilike.%${options.search}%`);
      }

      // Sort
      if (options.sort === 'price-asc') {
        query = query.order('price', { ascending: true });
      } else if (options.sort === 'price-desc') {
        query = query.order('price', { ascending: false });
      } else if (options.sort === 'rating') {
        query = query.order('rating_avg', { ascending: false });
      } else if (options.sort === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else {
        query = query.order('is_bestseller', { ascending: false });
      }

      const limit = options.limit || 24;
      const offset = options.offset || 0;
      query = query.range(offset, offset + limit - 1);

      const { data, count, error } = await query;
      if (!error && data) {
        return { books: data as Book[], total: count || data.length };
      }
    } catch {
      // Fall through to in-memory fallback
    }
  }

  // Robust In-Memory / Seed Filtering (supports bilingual text search)
  let results = [...dynamicBooks];

  if (options.department && options.department !== 'all') {
    results = results.filter((b) => b.department === options.department);
  }

  if (options.search) {
    const q = options.search.toLowerCase().trim();
    results = results.filter((b) => {
      const titleMatch = b.title.toLowerCase().includes(q) || b.title_bn.includes(q);
      const authorMatch = b.author?.name.toLowerCase().includes(q) || b.author?.name_bn.includes(q);
      const publisherMatch = b.publisher?.name.toLowerCase().includes(q) || b.publisher?.name_bn.includes(q);
      const brandMatch = b.brand?.toLowerCase().includes(q);
      const isbnMatch = b.isbn?.toLowerCase().includes(q);
      return titleMatch || authorMatch || publisherMatch || brandMatch || isbnMatch;
    });
  }

  if (options.category) {
    results = results.filter((b) =>
      b.categories?.some((c) => c.slug === options.category || c.id === options.category)
    );
  }

  if (options.author) {
    results = results.filter((b) => b.author?.slug === options.author || b.author_id === options.author);
  }

  if (options.publisher) {
    results = results.filter((b) => b.publisher?.slug === options.publisher || b.publisher_id === options.publisher);
  }

  if (options.language) {
    results = results.filter((b) => b.language === options.language);
  }

  if (options.minPrice !== undefined) {
    results = results.filter((b) => (b.discount_price ?? b.price) >= options.minPrice!);
  }

  if (options.maxPrice !== undefined) {
    results = results.filter((b) => (b.discount_price ?? b.price) <= options.maxPrice!);
  }

  if (options.inStock) {
    results = results.filter((b) => b.stock_quantity > 0);
  }

  if (options.isBestseller) {
    results = results.filter((b) => b.is_bestseller);
  }

  if (options.isFlashSale) {
    results = results.filter((b) => b.is_flash_sale);
  }

  // Sort
  if (options.sort === 'price-asc') {
    results.sort((a, b) => (a.discount_price ?? a.price) - (b.discount_price ?? b.price));
  } else if (options.sort === 'price-desc') {
    results.sort((a, b) => (b.discount_price ?? b.price) - (a.discount_price ?? a.price));
  } else if (options.sort === 'rating') {
    results.sort((a, b) => b.rating_avg - a.rating_avg);
  } else if (options.sort === 'newest') {
    results.sort((a, b) => (b.published_year ?? 0) - (a.published_year ?? 0));
  } else {
    // Default: bestsellers first
    results.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
  }

  const total = results.length;
  const limit = options.limit || 24;
  const offset = options.offset || 0;
  const paginated = results.slice(offset, offset + limit);

  return { books: paginated, total };
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const book = dynamicBooks.find((b) => b.slug === slug || b.id === slug);
  return book || null;
}

export async function getFeaturedBooks(): Promise<Book[]> {
  return dynamicBooks.filter((b) => b.is_featured).slice(0, 8);
}

export async function getBestsellerBooks(): Promise<Book[]> {
  return dynamicBooks.filter((b) => b.is_bestseller).slice(0, 8);
}

export async function getFlashSaleBooks(): Promise<Book[]> {
  return dynamicBooks.filter((b) => b.is_flash_sale).slice(0, 6);
}

export async function getNewArrivals(): Promise<Book[]> {
  // Sort by published year desc
  return [...dynamicBooks]
    .sort((a, b) => (b.published_year ?? 0) - (a.published_year ?? 0))
    .slice(0, 8);
}

export async function getRelatedBooks(bookId: string, authorId?: string | null, limit: number = 4): Promise<Book[]> {
  return dynamicBooks
    .filter((b) => b.id !== bookId && (b.author_id === authorId || b.is_featured))
    .slice(0, limit);
}

export async function getDepartments(): Promise<DepartmentInfo[]> {
  return DEPARTMENTS;
}

export async function getProductsByDepartment(
  department: Department | string,
  limit: number = 8
): Promise<Book[]> {
  return dynamicBooks.filter((b) => b.department === department).slice(0, limit);
}

export async function getCategoriesByDepartment(department?: Department | string): Promise<Category[]> {
  if (!department || department === 'all') return dynamicCategories;
  return dynamicCategories.filter((c) => c.department === department);
}

export async function getCategories(): Promise<Category[]> {
  return dynamicCategories;
}

export async function getAuthors(): Promise<Author[]> {
  return dynamicAuthors;
}

export async function getPublishers(): Promise<Publisher[]> {
  return dynamicPublishers;
}

export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<{ valid: boolean; coupon?: Coupon; discount: number; message?: string }> {
  const normalized = code.toUpperCase().trim();
  const coupon = dynamicCoupons.find((c) => c.code === normalized && c.is_active);

  if (!coupon) {
    return { valid: false, discount: 0, message: 'Invalid or inactive coupon code' };
  }

  if (subtotal < coupon.min_order_amount) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order amount of ৳${coupon.min_order_amount} required for this coupon`,
    };
  }

  let discount = 0;
  if (coupon.discount_type === 'percentage') {
    discount = (subtotal * coupon.discount_value) / 100;
    if (coupon.max_discount_amount && discount > coupon.max_discount_amount) {
      discount = coupon.max_discount_amount;
    }
  } else {
    discount = coupon.discount_value;
  }

  discount = Math.min(discount, subtotal);

  return {
    valid: true,
    coupon,
    discount: Math.round(discount),
  };
}

export async function createOrder(orderData: Partial<Order>, items: OrderItem[]): Promise<Order> {
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const orderNumber = `PTG-${randomSuffix}`;

  const subtotal = items.reduce((acc, item) => acc + item.total_price, 0);
  const discount = orderData.discount_amount || 0;
  const delivery = orderData.delivery_fee || 60;
  const total = Math.max(0, subtotal - discount + delivery);

  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    order_number: orderNumber,
    user_id: orderData.user_id || null,
    customer_name: orderData.customer_name || 'Valued Customer',
    customer_email: orderData.customer_email || null,
    customer_phone: orderData.customer_phone || '',
    status: 'pending',
    payment_method: orderData.payment_method || 'cod',
    payment_status: 'unpaid',
    subtotal,
    discount_amount: discount,
    delivery_fee: delivery,
    total_amount: total,
    coupon_code: orderData.coupon_code || null,
    shipping_division: orderData.shipping_division || 'Dhaka',
    shipping_district: orderData.shipping_district || 'Dhaka',
    shipping_upazila: orderData.shipping_upazila || '',
    shipping_street_address: orderData.shipping_street_address || '',
    notes: orderData.notes || null,
    tracking_notes: 'Order received. Waiting for verification.',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    items,
  };

  dynamicOrders = [newOrder, ...dynamicOrders];

  // Reduce book stock quantities
  items.forEach((item) => {
    const book = dynamicBooks.find((b) => b.id === item.book_id);
    if (book) {
      book.stock_quantity = Math.max(0, book.stock_quantity - item.quantity);
    }
  });

  return newOrder;
}

export async function getOrderByIdOrNumber(identifier: string, phone?: string): Promise<Order | null> {
  const norm = identifier.toUpperCase().trim();
  const order = dynamicOrders.find((o) => o.order_number === norm || o.id === identifier);

  if (!order) return null;

  if (phone) {
    const cleanPhone = phone.trim().replace(/\D/g, '');
    const cleanOrderPhone = order.customer_phone.replace(/\D/g, '');
    if (!cleanOrderPhone.includes(cleanPhone) && !cleanPhone.includes(cleanOrderPhone)) {
      return null;
    }
  }

  return order;
}

export async function getAllOrders(statusFilter?: string): Promise<Order[]> {
  if (statusFilter && statusFilter !== 'all') {
    return dynamicOrders.filter((o) => o.status === statusFilter);
  }
  return dynamicOrders;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus, trackingNotes?: string): Promise<Order | null> {
  const order = dynamicOrders.find((o) => o.id === orderId || o.order_number === orderId);
  if (!order) return null;

  order.status = status;
  if (status === 'delivered') {
    order.payment_status = 'paid';
  }
  if (trackingNotes) {
    order.tracking_notes = trackingNotes;
  }
  order.updated_at = new Date().toISOString();
  return order;
}

export async function addBook(bookData: Partial<Book>): Promise<Book> {
  const newBook: Book = {
    id: `book-${Date.now()}`,
    title: bookData.title || 'Untitled',
    title_bn: bookData.title_bn || 'নামহীন পণ্য',
    slug: bookData.slug || `product-${Date.now()}`,
    department: (bookData.department as Department) || 'books',
    brand: bookData.brand || null,
    warranty: bookData.warranty || null,
    author_id: bookData.author_id || null,
    publisher_id: bookData.publisher_id || null,
    price: Number(bookData.price) || 200,
    discount_price: bookData.discount_price ? Number(bookData.discount_price) : null,
    stock_quantity: Number(bookData.stock_quantity) || 10,
    pages: bookData.pages ? Number(bookData.pages) : 150,
    language: (bookData.language as 'bn' | 'en') || 'bn',
    published_year: bookData.published_year ? Number(bookData.published_year) : new Date().getFullYear(),
    edition: bookData.edition || '1st Edition',
    cover_url: bookData.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    description: bookData.description || '',
    description_bn: bookData.description_bn || '',
    is_featured: Boolean(bookData.is_featured),
    is_bestseller: Boolean(bookData.is_bestseller),
    is_flash_sale: Boolean(bookData.is_flash_sale),
    flash_sale_end: bookData.flash_sale_end || null,
    rating_avg: 5.0,
    rating_count: 1,
    created_at: new Date().toISOString(),
  };

  dynamicBooks = [newBook, ...dynamicBooks];
  return newBook;
}

export async function updateBook(id: string, updates: Partial<Book>): Promise<Book | null> {
  const idx = dynamicBooks.findIndex((b) => b.id === id);
  if (idx === -1) return null;

  dynamicBooks[idx] = {
    ...dynamicBooks[idx],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return dynamicBooks[idx];
}

export async function deleteBook(id: string): Promise<boolean> {
  const initialLen = dynamicBooks.length;
  dynamicBooks = dynamicBooks.filter((b) => b.id !== id);
  return dynamicBooks.length < initialLen;
}

export async function importBooksFromCsv(rows: Record<string, string>[]): Promise<{ count: number; errors: string[] }> {
  let count = 0;
  const errors: string[] = [];

  rows.forEach((row, idx) => {
    try {
      if (!row.title && !row.title_bn) {
        errors.push(`Row ${idx + 1}: Missing title`);
        return;
      }
      const title = row.title || row.title_bn;
      const title_bn = row.title_bn || row.title;
      const slug = (row.slug || title.toLowerCase().replace(/[^a-z0-9]/g, '-')).replace(/-+/g, '-');

      addBook({
        title,
        title_bn,
        slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
        department: (row.department as Department) || 'books',
        brand: row.brand || null,
        warranty: row.warranty || null,
        price: parseFloat(row.price) || 250,
        discount_price: row.discount_price ? parseFloat(row.discount_price) : null,
        stock_quantity: parseInt(row.stock_quantity) || 20,
        language: (row.language as 'bn' | 'en') || 'bn',
        pages: parseInt(row.pages) || 160,
        isbn: row.isbn || null,
        description: row.description || '',
        description_bn: row.description_bn || '',
      });
      count++;
    } catch (err: unknown) {
      errors.push(`Row ${idx + 1}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  });

  return { count, errors };
}

export interface MonthlySalesData {
  month_bn: string;
  month_en: string;
  revenue: number;
  orders: number;
  growth: number;
}

export interface DepartmentSalesData {
  department: string;
  name_bn: string;
  sales: number;
  percentage: number;
  count: number;
  color: string;
}

export async function getAdminStats() {
  const totalRevenue = dynamicOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total_amount, 0);

  const totalOrders = dynamicOrders.length;
  const totalBooks = dynamicBooks.length;
  const lowStockCount = dynamicBooks.filter((b) => b.stock_quantity <= 10).length;
  const outOfStockCount = dynamicBooks.filter((b) => b.stock_quantity === 0).length;
  const recentOrders = dynamicOrders.slice(0, 8);

  const pendingOrders = dynamicOrders.filter((o) => o.status === 'pending').length;
  const deliveredOrders = dynamicOrders.filter((o) => o.status === 'delivered').length;
  const processingOrders = dynamicOrders.filter((o) => o.status === 'processing' || o.status === 'shipped').length;

  // Monthly Sales trends for current year
  const monthlySales: MonthlySalesData[] = [
    { month_bn: 'বৈশাখ', month_en: 'Jan', revenue: 64200, orders: 84, growth: 12 },
    { month_bn: 'জ্যৈষ্ঠ', month_en: 'Feb', revenue: 78500, orders: 102, growth: 22 },
    { month_bn: 'আষাঢ়', month_en: 'Mar', revenue: 89300, orders: 118, growth: 14 },
    { month_bn: 'শ্রাবণ', month_en: 'Apr', revenue: 95400, orders: 125, growth: 7 },
    { month_bn: 'ভাদ্র', month_en: 'May', revenue: 112000, orders: 146, growth: 17 },
    { month_bn: 'আশ্বিন', month_en: 'Jun', revenue: 104500, orders: 138, growth: -6 },
    { month_bn: 'কার্তিক', month_en: 'Jul', revenue: 123800, orders: 164, growth: 18 },
    { month_bn: 'অগ্রহায়ণ', month_en: 'Aug', revenue: 138200, orders: 182, growth: 12 },
    { month_bn: 'পৌষ', month_en: 'Sep', revenue: 154000, orders: 205, growth: 11 },
    { month_bn: 'মাঘ', month_en: 'Oct', revenue: 168900, orders: 224, growth: 10 },
    { month_bn: 'ফাল্গুন', month_en: 'Nov', revenue: 194500, orders: 256, growth: 15 },
    { month_bn: 'চৈত্র', month_en: 'Dec', revenue: 215000, orders: 288, growth: 11 },
  ];

  // Sales by Department
  const departmentSales: DepartmentSalesData[] = [
    { department: 'books', name_bn: 'বই ও সাহিত্য', sales: 420000, percentage: 38, count: 540, color: '#0B6E4F' },
    { department: 'electronics', name_bn: 'স্মার্ট ইলেকট্রনিক্স', sales: 310000, percentage: 28, count: 210, color: '#2563EB' },
    { department: 'islamic', name_bn: 'ইসলামিক ও আতর', sales: 175000, percentage: 16, count: 260, color: '#D97706' },
    { department: 'stationery', name_bn: 'স্টেশনারি ও অফিস', sales: 110000, percentage: 10, count: 185, color: '#9333EA' },
    { department: 'kids', name_bn: 'কিডস ও খেলনা', sales: 88000, percentage: 8, count: 140, color: '#E11D48' },
  ];

  return {
    totalRevenue,
    totalOrders,
    totalBooks,
    lowStockCount,
    outOfStockCount,
    pendingOrders,
    deliveredOrders,
    processingOrders,
    recentOrders,
    monthlySales,
    departmentSales,
  };
}

export async function addCategory(categoryData: Partial<Category>): Promise<Category> {
  const newCat: Category = {
    id: `cat-${Date.now()}`,
    name: categoryData.name || 'New Category',
    name_bn: categoryData.name_bn || 'নতুন ক্যাটাগরি',
    slug: categoryData.slug || `category-${Date.now()}`,
    department: (categoryData.department as Department) || 'books',
    description: categoryData.description || null,
    description_bn: categoryData.description_bn || null,
    icon: categoryData.icon || 'Folder',
    is_featured: Boolean(categoryData.is_featured),
    sort_order: categoryData.sort_order || 99,
  };
  dynamicCategories.push(newCat);
  return newCat;
}

export async function addAuthor(authorData: Partial<Author>): Promise<Author> {
  const newAuthor: Author = {
    id: `author-${Date.now()}`,
    name: authorData.name || 'Author Name',
    name_bn: authorData.name_bn || 'লেখক/ব্র্যান্ড নাম',
    slug: authorData.slug || `author-${Date.now()}`,
    bio: authorData.bio || null,
    bio_bn: authorData.bio_bn || null,
    photo_url: authorData.photo_url || null,
    is_featured: Boolean(authorData.is_featured),
  };
  dynamicAuthors.push(newAuthor);
  return newAuthor;
}

export async function addPublisher(pubData: Partial<Publisher>): Promise<Publisher> {
  const newPub: Publisher = {
    id: `pub-${Date.now()}`,
    name: pubData.name || 'Publisher Name',
    name_bn: pubData.name_bn || 'প্রকাশনী নাম',
    slug: pubData.slug || `publisher-${Date.now()}`,
    website: pubData.website || null,
    description: pubData.description || null,
  };
  dynamicPublishers.push(newPub);
  return newPub;
}

export async function getCoupons(): Promise<Coupon[]> {
  return dynamicCoupons;
}

export async function addCoupon(couponData: Partial<Coupon>): Promise<Coupon> {
  const newCoupon: Coupon = {
    id: `cpn-${Date.now()}`,
    code: (couponData.code || 'SPECIAL').trim().toUpperCase(),
    discount_type: couponData.discount_type || 'percentage',
    discount_value: Number(couponData.discount_value) || 10,
    min_order_amount: Number(couponData.min_order_amount) || 0,
    max_discount_amount: couponData.max_discount_amount ? Number(couponData.max_discount_amount) : null,
    valid_until: couponData.valid_until || null,
    times_used: 0,
    is_active: true,
    created_at: new Date().toISOString(),
  };
  dynamicCoupons.unshift(newCoupon);
  return newCoupon;
}

export async function updateCoupon(id: string, updates: Partial<Coupon>): Promise<Coupon | null> {
  const idx = dynamicCoupons.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  dynamicCoupons[idx] = { ...dynamicCoupons[idx], ...updates };
  return dynamicCoupons[idx];
}

export async function deleteCoupon(id: string): Promise<boolean> {
  const len = dynamicCoupons.length;
  const idx = dynamicCoupons.findIndex((c) => c.id === id);
  if (idx !== -1) {
    dynamicCoupons.splice(idx, 1);
  }
  return dynamicCoupons.length < len;
}

