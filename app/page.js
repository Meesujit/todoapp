
import TodoList from '@/components/TodoList'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const Home = async () => {
  
  return (
    <>

  <main>
  <div className='flex flex-row'>
    <div>
    <Link href='/' className="md:flex-1">
    <Image 
      src="/assets/icons/logo-icon.svg"
      alt="Logo with name"
      width={70}
      height={32}
      className="hidden md:block mx-10 my-8"
      />
  </Link>
</div>
  <div className=' text-4xl text-slate-300 font-san flex justify-center items-center'>
    <h1 className=''>Document Project</h1>
  </div>
</div>

  <div>
    <TodoList />
  </div>
 </main>
</>
  )
}

export default Home