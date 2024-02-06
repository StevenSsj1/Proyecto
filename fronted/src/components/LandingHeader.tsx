import Link from 'next/link';
import ButtonAuth from './ButtonAuth';
export function LandingHeader(){
    return(
     <header className="py-3 px-10 flex items-center fixed top-0 w-full justify-between z-40 text-white">
       
     <div className="flex flex-grow basis-0">
       <img src='/colaboraciones/logo.png' width="50 px"></img>
     </div>
 
     <nav className="hidden xl:block sm:hidden">
       <ul
         className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2"
       >
         <li><a href="/">Inicio</a></li>
         <li><a href="#Catalogo">Catalogo Colaboraciones</a></li>
         <li><a href="#Colaboraciones">Colaboraciones</a></li>
       </ul>
     </nav>
 
     <nav className="flex flex-grow justify-end basis-0">
       <ul
         className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2"
       >
         <li className="hidden xl:block sm:hidden">
          <ButtonAuth/>
         </li>
          
       </ul>
     </nav>
     
  </header>
    )
 }