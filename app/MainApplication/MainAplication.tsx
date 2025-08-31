"use client"
import Header from "../Header/Header";
import HeaderFilters from "../HeaderFilters/HeaderFilters";



const  MainAplication = () => {
    return(
        <section className=" w-full h-auto bg-gray-50 flex flex-col gap-[32px]">
             <Header/>
             <HeaderFilters/>
        </section>
    )
}

export  default  MainAplication;