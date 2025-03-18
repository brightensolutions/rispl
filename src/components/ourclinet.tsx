import { Marquee } from "./magicui/marquee"
import Image from "next/image"

const reviews = [
  {
    img: "/client/AMNS.png",
  },
  {
    img: "/client/reliance.png",
  },
  {
    img: "/client/bhilosa.png",
  },
  {
    img: "/client/Garden-logo-1.jpg",
  },
  {
    img: "/client/shree-durga.png",
  },
  {
    img: "/client/jiwarajka_textile_industries_logo.jpeg",
  },
  {
    img: "/client/snowman.png",
  },
  {
    img: "/client/wellknown.avif",
  },
  {
    img: "/client/alok.png",
  },
  {
    img: "/client/sanathan.png",
  },
  
]

const ReviewCard = ({
  img,
}: {
  img: string
}) => {
  return (
    <div className="mx-4 h-64 flex flex-col justify-center items-center">
      <Image
        className=" w-auto object-contain"
        width={150}
        height={150}
        alt="Client logo"
        src={img || "/placeholder.svg"}
      />
    </div>
  )
}

export function Ourclient() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
        <div className="mb-9">
         <h2 className="text-4xl md:text-5xl font-nunito font-bold text-blue mb-4">Our Clients</h2>
         <div className="w-20 h-1 bg-gradient-to-r from-gold via-gold-light to-gold mx-auto" />
        </div>
      <Marquee pauseOnHover className="[--duration:40s]">
        {reviews.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
    </div>
  )
}

    