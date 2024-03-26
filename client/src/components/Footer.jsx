import { Footer } from 'flowbite-react'
import React from 'react'
import {Link} from 'react-router-dom'
import {BsGithub,BsTwitter,BsLinkedin} from 'react-icons/bs'
const FooterCom = () => {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-4'>
            <Link to="/" className='font-bold text-lg dark:text-white'>
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white'>Sameer's</span>
      Blog
      </Link> 
            </div>
            <div className='grid grid-cols-2 gap-3 mt-3 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
            <Footer.Title title='About'/>
            <Footer.LinkGroup col>
            <Footer.Link href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                Follow me
            </Footer.Link>
            <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                Sameer's Blog
            </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>

            <Footer.Title title='Follow me'/>
            <Footer.LinkGroup col>
            <Footer.Link href='https://www.github.com/moham-sameer' target='_blank' rel='noopener noreferrer'>
                Github
            </Footer.Link>
            <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                Discord
            </Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
            <Footer.Title title='Legal'/>
            <Footer.LinkGroup col>
            <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                Privacy Policy
            </Footer.Link>
            <Footer.Link href='#' target='_blank' rel='noopener noreferrer'>
                Terms &amp; Conditions
            </Footer.Link>
            </Footer.LinkGroup>
            </div>
            </div>
        </div>
        <Footer.Divider/>
        <div className='w-full  sm:flex sm:items-center sm:justify-between'>
      <Footer.Copyright href='#' by="Sameer's blog" year={new Date().getFullYear()}/>
      <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
        <Footer.Icon href='#' icon={BsGithub} />
        <Footer.Icon href='#' icon={BsTwitter} />
        <Footer.Icon href='#' icon={BsLinkedin} />
      </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooterCom
