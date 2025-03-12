import { Marquee } from "./magicui/marquee"
import Image from "next/image"

const reviews = [
  {
    name: "John",
    img: "/client/aditya.png",
  },
  {
    name: "Jane",
    img: "/client/AMNS.png",
  },
  {
    name: "Jenny",
    img: "/client/capital.png",
  },
  {
    name: "Jamess",
    img: "/client/glpcl1.png",
  },
  {
    name: "Jamesss",
    img: "/client/gnfc.png",
  },
  {
    name: "Jamesss",
    img: "/client/gsecl.png",
  },
  {
    name: "Jamesss",
    img: "/client/heatex.png",
  },
  {
    name: "Jamesss",
    img: "/client/ibl.png",
  },
  {
    name: "Jamesss",
    img: "/client/jsw.png",
  },
  {
    name: "Jamesss",
    img: "/client/kribhco.png",
  },
  {
    name: "Jamesss",
    img: "/client/lnt.png",
  },
  {
    name: "Jamesss",
    img: "/client/reliance.png",
  },
  {
    name: "Jamesss",
    img: "/client/THERMAX.png",
  },
  {
    name: "Jamesss",
    img: "/client/vesuvius.png",
  },
]

const ReviewCard = ({
  img,
}: {
  img: string
}) => {
  return (
    <div className="mx-4">
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
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
    </div>
  )
}

    