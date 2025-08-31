import Image from "next/image";
import MainAplication from "./components/MainApplication/MainAplication";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px]  min-h-screen p-5 pb-20  gap-16 sm:p-10   ">
       <MainAplication/>
    </div>
  );
}
