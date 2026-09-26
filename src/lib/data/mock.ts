export interface BannerItem {
	id: string | number
	title: string
	subtitle?: string
	image: string
	link?: string
	ctaText?: string
}

export interface CategoryItem {
	id: string | number
	name: string
	icon?: any
	iconUrl?: string
	href?: string
	badge?: string
}

export interface ProductItem {
	id: string | number
	name: string
	title?: string
	price: number
	originalPrice?: number
	discountPercent?: number
	image?: string
	img?: string
	thumbnail?: string
	rating?: number
	ratingCount?: number
	reviewsCount?: number
	location?: string
	city?: string
	soldCount?: number
	badge?: string
	isOfficial?: boolean
	href?: string
	slug?: string
}

export interface BrandItem {
	id: string | number
	name: string
	logo?: string
	image?: string
	href?: string
	category?: string
}

export interface MallBanner {
	id: string | number
	title: string
	subtitle?: string
	image: string
	link?: string
}

export const banners: BannerItem[] = [
	{
		id: 1,
		title: 'Pesta Promo Gajian Diskon s/d 80%',
		subtitle: 'Ekstra cashback dan gratis ongkir ke seluruh Indonesia tanpa minimum belanja',
		image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
		link: '/products',
		ctaText: 'Serbu Promo'
	},
	{
		id: 2,
		title: 'Super Gadget & Electronic Fair',
		subtitle: 'Upgrade perangkat terbaik dengan cicilan 0% hingga 12 bulan',
		image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
		link: '/products',
		ctaText: 'Cek Gadget'
	},
	{
		id: 3,
		title: 'Official Mall Brand Festival',
		subtitle: '100% Produk Original bergaransi resmi dari brand favoritmu',
		image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
		link: '/products',
		ctaText: 'Kunjungi Mall'
	},
	{
		id: 4,
		title: 'Koleksi Fashion Terbaru Musim Ini',
		subtitle: 'Tampil percaya diri dengan tren outfit terkini dan diskon menarik',
		image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
		link: '/products',
		ctaText: 'Jelajahi Sekarang'
	}
]

export const categories: CategoryItem[] = [
	{ id: 1, name: 'Elektronik', icon: 'Smartphone', href: '/products?category=elektronik', badge: 'Populer' },
	{ id: 2, name: 'Komputer & Laptop', icon: 'Laptop', href: '/products?category=komputer' },
	{ id: 3, name: 'Fashion Pria', icon: 'Shirt', href: '/products?category=fashion-pria' },
	{ id: 4, name: 'Fashion Wanita', icon: 'ShoppingBag', href: '/products?category=fashion-wanita' },
	{ id: 5, name: 'Rumah Tangga', icon: 'Home', href: '/products?category=rumah-tangga' },
	{ id: 6, name: 'Kecantikan', icon: 'Sparkles', href: '/products?category=kecantikan', badge: 'Baru' },
	{ id: 7, name: 'Makanan & Minuman', icon: 'Utensils', href: '/products?category=kuliner' },
	{ id: 8, name: 'Kesehatan', icon: 'HeartPulse', href: '/products?category=kesehatan' },
	{ id: 9, name: 'Hobi & Gaming', icon: 'Gamepad2', href: '/products?category=gaming' },
	{ id: 10, name: 'Otomotif', icon: 'Car', href: '/products?category=otomotif' }
]

export const recommendationProducts: ProductItem[] = [
	{
		id: 'rec-1',
		name: 'Logitech G502 HERO High Performance Gaming Mouse',
		price: 599000,
		originalPrice: 899000,
		discountPercent: 33,
		image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 1240,
		location: 'Jakarta Barat',
		soldCount: 3500,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'logitech-g502-hero'
	},
	{
		id: 'rec-2',
		name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
		price: 4899000,
		originalPrice: 5999000,
		discountPercent: 18,
		image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 820,
		location: 'Jakarta Pusat',
		soldCount: 1200,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'sony-wh-1000xm5'
	},
	{
		id: 'rec-3',
		name: 'Ergonomic Office Chair Kursi Kerja Jaring Breathable',
		price: 849000,
		originalPrice: 1250000,
		discountPercent: 32,
		image: 'https://images.unsplash.com/photo-1580481077195-c3a82105e3b5?auto=format&fit=crop&w=600&q=80',
		rating: 4.8,
		ratingCount: 540,
		location: 'Tangerang',
		soldCount: 950,
		isOfficial: false,
		badge: 'Terlaris',
		slug: 'ergonomic-office-chair'
	},
	{
		id: 'rec-4',
		name: 'Mechanical Keyboard RGB TKL Hot-Swappable Blue Switch',
		price: 389000,
		originalPrice: 550000,
		discountPercent: 29,
		image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
		rating: 4.7,
		ratingCount: 310,
		location: 'Bandung',
		soldCount: 780,
		isOfficial: false,
		slug: 'mechanical-keyboard-rgb'
	},
	{
		id: 'rec-5',
		name: 'Smartwatch AMOLED Display Heart Rate SpO2 Water Resistant',
		price: 649000,
		originalPrice: 999000,
		discountPercent: 35,
		image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
		rating: 4.8,
		ratingCount: 430,
		location: 'Jakarta Selatan',
		soldCount: 1100,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'smartwatch-amoled-display'
	},
	{
		id: 'rec-6',
		name: 'Stainless Steel Tumbler 500ml Vacuum Insulated 12 Jam',
		price: 129000,
		originalPrice: 199000,
		discountPercent: 35,
		image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 2150,
		location: 'Surabaya',
		soldCount: 5900,
		isOfficial: false,
		badge: 'Pilihan Editor',
		slug: 'stainless-steel-tumbler'
	}
]

export const mallProducts: ProductItem[] = [
	{
		id: 'mall-1',
		name: 'Samsung Galaxy S24 Ultra 5G 12GB/256GB Titanium Gray',
		price: 19999000,
		originalPrice: 21999000,
		discountPercent: 9,
		image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80',
		rating: 5.0,
		ratingCount: 640,
		location: 'Jakarta Pusat',
		soldCount: 850,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'samsung-galaxy-s24-ultra'
	},
	{
		id: 'mall-2',
		name: 'Apple iPad Air M2 11 Inch Wi-Fi 128GB Space Gray',
		price: 10499000,
		originalPrice: 11999000,
		discountPercent: 12,
		image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 320,
		location: 'Jakarta Utara',
		soldCount: 430,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'apple-ipad-air-m2'
	},
	{
		id: 'mall-3',
		name: 'Philips Air Fryer Digital XL 4.1L HD9252 Low Watt',
		price: 1199000,
		originalPrice: 1799000,
		discountPercent: 33,
		image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 1100,
		location: 'Jakarta Barat',
		soldCount: 1600,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'philips-air-fryer-digital'
	},
	{
		id: 'mall-4',
		name: 'ASUS ROG Zephyrus G14 Gaming Laptop Ryzen 9 RTX 4060',
		price: 26499000,
		originalPrice: 28999000,
		discountPercent: 8,
		image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 180,
		location: 'Jakarta Pusat',
		soldCount: 220,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'asus-rog-zephyrus-g14'
	},
	{
		id: 'mall-5',
		name: 'Nike Air Jordan 1 Low Retro Original Sneakers',
		price: 1799000,
		originalPrice: 2199000,
		discountPercent: 18,
		image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
		rating: 4.8,
		ratingCount: 410,
		location: 'Tangerang',
		soldCount: 530,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'nike-air-jordan-1-low'
	},
	{
		id: 'mall-6',
		name: 'Sony PlayStation 5 Slim Digital Edition Garansi Resmi',
		price: 7899000,
		originalPrice: 8499000,
		discountPercent: 7,
		image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
		rating: 5.0,
		ratingCount: 790,
		location: 'Jakarta Pusat',
		soldCount: 940,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'sony-playstation-5-slim'
	}
]

export const brands: BrandItem[] = [
	{ id: 1, name: 'Samsung', category: 'Elektronik', logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=200&q=80', href: '/products?brand=samsung' },
	{ id: 2, name: 'Apple', category: 'Gadget', logo: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=200&q=80', href: '/products?brand=apple' },
	{ id: 3, name: 'Xiaomi', category: 'Smartphone & IoT', logo: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=200&q=80', href: '/products?brand=xiaomi' },
	{ id: 4, name: 'Sony', category: 'Audio & Kamera', logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80', href: '/products?brand=sony' },
	{ id: 5, name: 'ASUS', category: 'Laptop & Komputer', logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=200&q=80', href: '/products?brand=asus' },
	{ id: 6, name: 'Logitech', category: 'Aksesoris PC', logo: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80', href: '/products?brand=logitech' },
	{ id: 7, name: 'Philips', category: 'Peralatan Rumah', logo: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=200&q=80', href: '/products?brand=philips' },
	{ id: 8, name: 'Nike', category: 'Sportswear & Sepatu', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80', href: '/products?brand=nike' },
	{ id: 9, name: 'Adidas', category: 'Sepatu & Pakaian', logo: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=200&q=80', href: '/products?brand=adidas' },
	{ id: 10, name: 'Uniqlo', category: 'Pakaian Kasual', logo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80', href: '/products?brand=uniqlo' },
	{ id: 11, name: 'Eiger', category: 'Outdoor & Adventure', logo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=200&q=80', href: '/products?brand=eiger' },
	{ id: 12, name: 'Erigo', category: 'Streetwear Lokal', logo: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80', href: '/products?brand=erigo' }
]

export const favProducts: ProductItem[] = [
	{
		id: 'fav-1',
		name: 'Anker Soundcore Space One Active Noise Cancelling Headphones',
		price: 1150000,
		originalPrice: 1599000,
		discountPercent: 28,
		image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 980,
		location: 'Jakarta Utara',
		soldCount: 2400,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'anker-soundcore-space-one'
	},
	{
		id: 'fav-2',
		name: 'Baseus Powerbank 20000mAh 65W Fast Charging PD QC',
		price: 449000,
		originalPrice: 699000,
		discountPercent: 35,
		image: 'https://images.unsplash.com/photo-1609592426504-9844f2ef6849?auto=format&fit=crop&w=600&q=80',
		rating: 4.8,
		ratingCount: 1500,
		location: 'Jakarta Barat',
		soldCount: 4100,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'baseus-powerbank-20000mah'
	},
	{
		id: 'fav-3',
		name: 'Xiaomi Smart Air Purifier 4 Compact True HEPA Filter',
		price: 999000,
		originalPrice: 1299000,
		discountPercent: 23,
		image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 780,
		location: 'Jakarta Selatan',
		soldCount: 1800,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'xiaomi-smart-air-purifier-4'
	},
	{
		id: 'fav-4',
		name: 'Ugreen USB-C Hub 7 in 1 4K HDMI 100W PD SD Card Reader',
		price: 329000,
		originalPrice: 499000,
		discountPercent: 34,
		image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 2100,
		location: 'Tangerang',
		soldCount: 5200,
		isOfficial: true,
		badge: 'Official Store',
		slug: 'ugreen-usb-c-hub-7-in-1'
	},
	{
		id: 'fav-5',
		name: 'Divoom Ditoo Pro Bluetooth Speaker Pixel Art Retro',
		price: 949000,
		originalPrice: 1299000,
		discountPercent: 26,
		image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
		rating: 4.8,
		ratingCount: 340,
		location: 'Bandung',
		soldCount: 620,
		isOfficial: false,
		badge: 'Favorit',
		slug: 'divoom-ditoo-pro-speaker'
	},
	{
		id: 'fav-6',
		name: 'Coffee Maker Espresso Machine 20 Bar Semi Automatic Retro',
		price: 1499000,
		originalPrice: 2199000,
		discountPercent: 31,
		image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80',
		rating: 4.9,
		ratingCount: 610,
		location: 'Jakarta Pusat',
		soldCount: 1300,
		isOfficial: false,
		badge: 'Favorit',
		slug: 'coffee-maker-espresso-20-bar'
	}
]
