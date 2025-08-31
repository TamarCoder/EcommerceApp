"use client"
import Header from "../Header/Header";
import HeaderFilters from "../HeaderFilters/HeaderFilters";
import Main from "../Main/Main";
import Footer from "../footer/Footer";




const  MainAplication = () => {
    return(
        <section className=" w-full h-auto bg-gray-50 flex flex-col gap-[32px]">
             <Header/>
             <HeaderFilters/>
             <Main/>
            {/*<ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />*/}
           <Footer/>
        </section>
    )
}

export  default  MainAplication;