import React from 'react'
import {motion} from 'framer-motion';
import {styles} from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className='relative w-full h-screen
    mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[200px] max-w-7-xl
       mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-[#f6fca1] justify-center`}>Hi, I'm <span className='text-[#fc8d72]'>Raghu</span></h1>
          <p className={`${styles.heroSubText} text-white-100 justify-center`}>I am a software engineer and develop <br className='sm:block hidden'/>full stack web applications </p>
        </div>
      </div>
      {/* <ComputersCanvas /> */}
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary
          flex justify-center items-start p-2'>
            <motion.dev 
              animate={{
                y:[0,24,0]
              }}
              transition={{
                duration:1.5,
                repeat:Infinity,
                repeatType:'loop'
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
          />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero