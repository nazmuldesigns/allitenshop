export type UserRole = 'customer' | 'admin';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'sslcommerz';

export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

export type DiscountType = 'percentage' | 'fixed';

export type Department =
  | 'books'
  | 'electronics'
  | 'stationery'
  | 'islamic'
  | 'kids'
  | 'gifts'
  | 'courses';

export interface Author {
  id: string;
  name: string;
  name_bn: string;
  slug: string;
  bio?: string | null;
  bio_bn?: string | null;
  photo_url?: string | null;
  is_featured: boolean;
  created_at?: string;
}

export interface Publisher {
  id: string;
  name: string;
  name_bn: string;
  slug: string;
  description?: string | null;
  website?: string | null;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  name_bn: string;
  slug: string;
  department?: Department;
  description?: string | null;
  description_bn?: string | null;
  icon?: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Book {
  id: string;
  title: string;
  title_bn: string;
  slug: string;
  department?: Department;
  brand?: string | null;
  warranty?: string | null;
  author_id?: string | null;
  publisher_id?: string | null;
  author?: Author;
  publisher?: Publisher;
  categories?: Category[];
  isbn?: string | null;
  price: number;
  discount_price?: number | null;
  stock_quantity: number;
  pages?: number | null;
  language?: 'bn' | 'en';
  published_year?: number | null;
  edition?: string | null;
  cover_url?: string | null;
  description?: string | null;
  description_bn?: string | null;
  is_featured: boolean;
  is_bestseller: boolean;
  is_flash_sale: boolean;
  flash_sale_end?: string | null;
  rating_avg: number;
  rating_count: number;
  created_at?: string;
  updated_at?: string;
}

// Product is an alias for Book to support full e-commerce beyond books
export type Product = Book;

export interface Address {
  id: string;
  user_id?: string;
  title: string;
  full_name: string;
  phone: string;
  alt_phone?: string | null;
  division: string;
  district: string;
  upazila: string;
  street_address: string;
  is_default: boolean;
  created_at?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  min_order_amount: number;
  max_discount_amount?: number | null;
  valid_from?: string;
  valid_until?: string | null;
  usage_limit?: number | null;
  times_used: number;
  is_active: boolean;
  created_at?: string;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  book_id?: string | null;
  book_title: string;
  book_title_bn: string;
  book_cover_url?: string | null;
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string | null;
  customer_name: string;
  customer_email?: string | null;
  customer_phone: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  subtotal: number;
  discount_amount: number;
  delivery_fee: number;
  total_amount: number;
  coupon_code?: string | null;
  shipping_division: string;
  shipping_district: string;
  shipping_upazila: string;
  shipping_street_address: string;
  notes?: string | null;
  tracking_notes?: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface Review {
  id: string;
  book_id: string;
  user_id?: string;
  reviewer_name: string;
  rating: number;
  comment?: string | null;
  is_approved: boolean;
  created_at: string;
}

export interface WishlistItem {
  id: string;
  user_id?: string;
  book_id: string;
  book?: Book;
  created_at: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  created_at: string;
}

export type Language = 'bn' | 'en';
