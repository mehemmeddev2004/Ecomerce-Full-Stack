import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Clothes from "@/components/main/Clothes";

import Kampaniya from "@/components/main/Welcome";


import NewIn from "@/components/main/NewIn";

import Sneakers from "@/components/main/Sneakers";
import Social from "@/components/main/Social";
import Welcome from "@/components/main/Welcome";


export default function Home() {
  return (
     <div className="flex flex-col min-h-screen">
   

      <main className='flex flex-col  gap-y-[30px] mb-[50px] justify-center items-center flex-1'>
        <Welcome />
        <NewIn />
        <Sneakers/>
        <Clothes/>
        <Social/>
      </main>

   

    </div>
  );
}