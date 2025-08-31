import {Search, ShoppingCart} from "lucide-react";
import {useState} from "react";


const Header = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cart] = useState();
    // const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className='sticky top-0 z-40 bg-red shadow-sm '>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/*logo*/}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-indigo-600">ShopHub</h1>
                    </div>

                    {/* Search Bar */}

                    <div className="flex-1 max-w-lg mx-8">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                            <input
                                type="tex"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Products...."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-transparent "/>
                        </div>
                    </div>

                    {/* Cart Button */}

                    <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer hover:bg-gray-100"/>
                        {/*{cartItemsCount > 0 && (*/}
                        {/*    <span*/}
                        {/*        className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">*/}
                        {/*        {cartItemsCount}*/}
                        {/*    </span>*/}
                        {/*)}*/}
                    </button>
                </div>
            </div>

        </header>



    )
}

export default Header;