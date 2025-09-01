import ProductCard from "../ProductCard/ProductCard";



const products = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        originalPrice: 399.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',

        category: 'electronics',
        rating: 4.5,
        reviews: 234,
        badge: 'Best Seller',
        description: 'High-quality wireless headphones with noise cancellation'
    },
    {
        id: 2,
        name: 'Minimalist Watch',
        price: 149.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        category: 'accessories',
        rating: 4.8,
        reviews: 189,
        badge: 'New',
        description: 'Elegant minimalist design with premium materials'
    },
    {
        id: 3,
        name: 'Smart Fitness Tracker',
        price: 89.99,
        originalPrice: 129.99,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6',
        category: 'electronics',
        rating: 4.3,
        reviews: 567,
        badge: 'Sale',
        description: 'Track your fitness goals with advanced sensors'
    },
    {
        id: 4,
        name: 'Leather Backpack',
        price: 199.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
        category: 'bags',
        rating: 4.7,
        reviews: 123,
        badge: null,
        description: 'Premium leather backpack for everyday use'
    },
    {
        id: 5,
        name: 'Wireless Earbuds',
        price: 159.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
        category: 'electronics',
        rating: 4.6,
        reviews: 456,
        badge: 'Hot',
        description: 'Crystal clear sound with long battery life'
    },
    {
        id: 6,
        name: 'Designer Sunglasses',
        price: 129.99,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
        category: 'accessories',
        rating: 4.4,
        reviews: 89,
        badge: null,
        description: 'UV protection with stylish design'
    }
]

 

const Main = () => {
  return (
    <>
    
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold"></span> products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      </main>
    </>
  );
};

export default Main;
