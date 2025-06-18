
-- Create flavors table
CREATE TABLE public.flavors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  ingredients TEXT[] NOT NULL,
  color VARCHAR(7) NOT NULL,
  category VARCHAR(50) NOT NULL,
  is_signature BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stores table
CREATE TABLE public.stores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  hours VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert flavor data
INSERT INTO public.flavors (name, description, ingredients, color, category, is_signature, image_url) VALUES
('Berry Bliss', 'A delightful mix of strawberries, blueberries, and raspberries', ARRAY['Strawberry puree', 'Blueberry bits', 'Raspberry swirl', 'Greek yogurt base'], '#FF6B9D', 'fruity', true, '/api/placeholder/300/300'),
('Tropical Paradise', 'Transport yourself to the tropics with mango, pineapple, and coconut', ARRAY['Mango chunks', 'Pineapple pieces', 'Coconut flakes', 'Passion fruit'], '#F1C40F', 'tropical', true, '/api/placeholder/300/300'),
('Choco Dream', 'Rich chocolate frozen yogurt with chocolate chips', ARRAY['Belgian chocolate', 'Cocoa powder', 'Chocolate chips', 'Vanilla extract'], '#8B4513', 'chocolate', true, '/api/placeholder/300/300'),
('Vanilla Delight', 'Classic vanilla with a modern twist', ARRAY['Madagascar vanilla', 'Organic yogurt', 'Natural sweeteners'], '#FFF8DC', 'classic', false, '/api/placeholder/300/300'),
('Mint Magic', 'Refreshing mint yogurt with chocolate chips', ARRAY['Fresh mint', 'Chocolate chips', 'Natural yogurt'], '#6BCF7F', 'creamy', false, '/api/placeholder/300/300'),
('Caramel Swirl', 'Smooth yogurt with ribbons of salted caramel', ARRAY['Salted caramel', 'Sea salt', 'Vanilla yogurt'], '#FF8C42', 'creamy', false, '/api/placeholder/300/300'),
('Pistachio Heaven', 'Creamy pistachio with real nut pieces', ARRAY['Ground pistachios', 'Pistachio oil', 'Vanilla base', 'Honey'], '#93C572', 'nutty', true, '/api/placeholder/300/300'),
('Cookies & Cream', 'Classic combination of vanilla and crushed cookies', ARRAY['Vanilla yogurt', 'Crushed cookies', 'Cream swirl'], '#2C3E50', 'classic', false, '/api/placeholder/300/300'),
('Passion Fruit Tango', 'Exotic passion fruit with a tangy kick', ARRAY['Passion fruit pulp', 'Lime zest', 'Natural yogurt', 'Orange essence'], '#FF7F50', 'tropical', false, '/api/placeholder/300/300'),
('Lemon Zest', 'Bright and zesty lemon frozen yogurt', ARRAY['Fresh lemon juice', 'Lemon zest', 'Greek yogurt', 'Natural sweeteners'], '#FFE135', 'citrus', false, '/api/placeholder/300/300'),
('Blueberry Cheesecake', 'Creamy cheesecake flavor with blueberry swirls', ARRAY['Cream cheese', 'Blueberry compote', 'Graham cracker bits', 'Vanilla'], '#6A5ACD', 'dessert', true, '/api/placeholder/300/300');

-- Insert store data
INSERT INTO public.stores (name, address, city, phone, hours, latitude, longitude, features) VALUES
('Rubis Gigiri', 'Gigiri Shopping Centre, UN Avenue', 'Nairobi', '+254 700 123 456', '9:00 AM - 9:00 PM', -1.2345, 36.8123, ARRAY['Drive-through', 'Outdoor seating', 'Kids area']),
('Galleria Mall', 'Galleria Shopping Mall, Langata Road', 'Nairobi', '+254 700 123 457', '10:00 AM - 10:00 PM', -1.3167, 36.7833, ARRAY['Food court', 'Family friendly', 'Free parking']),
('Junction Mall', 'Junction Mall, Ngong Road', 'Nairobi', '+254 700 123 458', '10:00 AM - 10:00 PM', -1.3030, 36.7828, ARRAY['Mall location', 'Air conditioned', 'Free WiFi']),
('Garden City Mall', 'Garden City Mall, Thika Road', 'Nairobi', '+254 700 123 459', '10:00 AM - 10:00 PM', -1.2167, 36.8833, ARRAY['Large seating area', 'Birthday parties', 'Catering']),
('Sarit Centre', 'Sarit Centre, Westlands', 'Nairobi', '+254 700 123 460', '9:00 AM - 9:00 PM', -1.2635, 36.8097, ARRAY['Premium location', 'Valet parking', 'Corporate orders']),
('Nyali Centre', 'Nyali Centre, Mombasa Road', 'Mombasa', '+254 700 123 461', '9:00 AM - 9:00 PM', -4.0435, 39.7123, ARRAY['Coastal location', 'Beach vibes', 'Tourist friendly']);

-- Enable Row Level Security (public read access for these tables)
ALTER TABLE public.flavors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view flavors" ON public.flavors FOR SELECT USING (true);
CREATE POLICY "Public can view stores" ON public.stores FOR SELECT USING (true);
