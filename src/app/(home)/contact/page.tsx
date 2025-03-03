import { ContactForm } from '@/components/contact-form';
import { PageTitle } from '@/components/other-page-title';
import React from 'react'

 const Contact = () => {
  return (
    <div className='overflow-hidden'>
        <PageTitle
                title="Contact Us"
                backgroundImage="/images/aboutTeam.jpg"
                subtitle="Specialized Packaging Solutions for Automotive Parts"
              />
              

              <div>
                <ContactForm/>
              </div>
    </div>
  )
}


export default Contact;