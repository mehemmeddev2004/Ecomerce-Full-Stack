import React from 'react'

const Social = () => {
  return (
    <div className='max-w-[1280px] h-auto mx-auto flex flex-col  gap-[30px] justify-center'>
      <div className='flex items-center  flex-col justify-center '>
        <div className='flex items-center gap-2 mb-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram h-8 w-8 text-amber-600 mr-3"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
        <h2 className='text-4xl font-light text-stone-900 tracking-wide'>@ETOR</h2>
        </div>
        <span className='max-w-[200px] h-[1px] bg-orange-400'></span>
      </div>
      <div className='max-w-[500px] h-auto flex items-center flex-col gap-[40px] justify-center mx-auto'>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptate ut, maxime illo autem dignissimos dolor exercitationem quibusdam aperiam nam cum necessitatibus blanditiis sit, omnis soluta quod assumenda nihil itaque. Dolore consequuntur itaque ratione neque doloremque at quasi praesentium eaque.
        </p>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptate ut, maxime illo autem dignissimos dolor exercitationem quibusdam aperiam nam cum necessitatibus blanditiis sit, omnis soluta quod assumenda nihil itaque. Dolore consequuntur itaque ratione neque doloremque at quasi praesentium eaque.
        </p>
         <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptate ut, maxime illo autem dignissimos dolor exercitationem quibusdam aperiam nam cum necessitatibus blanditiis sit, omnis soluta quod assumenda nihil itaque. Dolore consequuntur itaque ratione neque doloremque at quasi praesentium eaque.
        </p>
      </div>
    </div>
  )
}

export default Social
