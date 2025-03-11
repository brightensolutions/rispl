import { AboutUs } from "@/components/about-us";
import { ContactForm } from "@/components/contact-form";
import Expertise from "@/components/expertise";
import { HeroSlider } from "@/components/hero-slider";
import { MissionVision } from "@/components/mission-vision";
import { Ourclient } from "@/components/ourclinet";


export default function Home()  {
    return(
        <div className="overflow-hidden">
          <HeroSlider/>
          <AboutUs/>  
          <Expertise/>  
          <MissionVision/>
          <Ourclient/>
          <ContactForm/>
        </div>
    )
}