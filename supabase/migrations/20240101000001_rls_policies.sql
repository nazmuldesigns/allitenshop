-- ==============================================================================
-- Pataghor (পাতাঘর) - Row Level Security (RLS) Policies
-- Enabled on EVERY table for zero-trust security
-- ==============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publishers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.book_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- 2. PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by self or admin" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile or admin" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id OR public.is_admin())
WITH CHECK (auth.uid() = id OR public.is_admin());

-- 3. AUTHORS POLICIES (Public read, admin write)
CREATE POLICY "Authors are viewable by everyone" 
ON public.authors FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert authors" 
ON public.authors FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update authors" 
ON public.authors FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete authors" 
ON public.authors FOR DELETE 
USING (public.is_admin());

-- 4. PUBLISHERS POLICIES (Public read, admin write)
CREATE POLICY "Publishers are viewable by everyone" 
ON public.publishers FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert publishers" 
ON public.publishers FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update publishers" 
ON public.publishers FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete publishers" 
ON public.publishers FOR DELETE 
USING (public.is_admin());

-- 5. CATEGORIES POLICIES (Public read, admin write)
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert categories" 
ON public.categories FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update categories" 
ON public.categories FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete categories" 
ON public.categories FOR DELETE 
USING (public.is_admin());

-- 6. BOOKS POLICIES (Public read, admin write)
CREATE POLICY "Books are viewable by everyone" 
ON public.books FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert books" 
ON public.books FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update books" 
ON public.books FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete books" 
ON public.books FOR DELETE 
USING (public.is_admin());

-- 7. BOOK_CATEGORIES POLICIES
CREATE POLICY "Book categories are viewable by everyone" 
ON public.book_categories FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage book categories" 
ON public.book_categories FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 8. ADDRESSES POLICIES
CREATE POLICY "Users can view their own addresses or admin" 
ON public.addresses FOR SELECT 
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create their own addresses" 
ON public.addresses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addresses or admin" 
ON public.addresses FOR UPDATE 
USING (auth.uid() = user_id OR public.is_admin())
WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can delete their own addresses or admin" 
ON public.addresses FOR DELETE 
USING (auth.uid() = user_id OR public.is_admin());

-- 9. COUPONS POLICIES
CREATE POLICY "Active coupons are viewable by everyone, all by admin" 
ON public.coupons FOR SELECT 
USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins can manage coupons" 
ON public.coupons FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 10. ORDERS POLICIES
CREATE POLICY "Users can view their own orders or admin" 
ON public.orders FOR SELECT 
USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) 
    OR public.is_admin()
);

CREATE POLICY "Anyone can create an order (supports guest checkout)" 
ON public.orders FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update orders" 
ON public.orders FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 11. ORDER_ITEMS POLICIES
CREATE POLICY "Users can view order items for their own orders or admin" 
ON public.order_items FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.orders o 
        WHERE o.id = order_items.order_id 
        AND ((auth.uid() IS NOT NULL AND o.user_id = auth.uid()) OR public.is_admin())
    )
);

CREATE POLICY "Anyone can insert order items during checkout" 
ON public.order_items FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can manage order items" 
ON public.order_items FOR ALL 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 12. REVIEWS POLICIES
CREATE POLICY "Approved reviews are viewable by everyone" 
ON public.reviews FOR SELECT 
USING (is_approved = true OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Authenticated users can submit a review" 
ON public.reviews FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own review or admin" 
ON public.reviews FOR UPDATE 
USING (auth.uid() = user_id OR public.is_admin())
WITH CHECK (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can delete their own review or admin" 
ON public.reviews FOR DELETE 
USING (auth.uid() = user_id OR public.is_admin());

-- 13. WISHLISTS POLICIES
CREATE POLICY "Users can manage their own wishlist" 
ON public.wishlists FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

