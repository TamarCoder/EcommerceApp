


const Footer = () => {
    return  (
        <footer className="bg-white cursor-pointer border-t mt-12">
            <div className="max-w-7xl  cursor-pointer mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex cursor-pointer items-center justify-between">
                    <p className="text-gray-500 text-sm">
                        © 2025 ShopHub. All rights reserved.
                    </p>
                    <div className="flex  cursor-pointer items-center gap-6">
                        <a href="#" className="text-gray-500 cursor-pointer hover:text-gray-700 text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 cursor-pointer hover:text-gray-700 text-sm">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-500 cursor-pointer hover:text-gray-700 text-sm">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer