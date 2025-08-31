"use client"
import Header from "../Header/Header";
import HeaderFilters from "../HeaderFilters/HeaderFilters";
import Main from "../Main/Main";



const  MainAplication = () => {
    return(
        <section className=" w-full h-auto bg-gray-50 flex flex-col gap-[32px]">
             <Header/>
             <HeaderFilters/>
             <Main/>
            {/*<ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />*/}
        </section>
    )
}

export  default  MainAplication;