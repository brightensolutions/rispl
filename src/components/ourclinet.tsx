import { Marquee } from "./magicui/marquee"
import Image from "next/image"

const reviews = [
  {
    name: "Jill",
    img: "/logo/01.avif",
  },
  {
    name: "John",
    img: "/logo/02.avif",
  },
  {
    name: "Jane",
    img: "/logo/03.avif",
  },
  {
    name: "Jenny",
    img: "/logo/04.avif",
  },
  {
    name: "Jamess",
    img: "/logo/05.avif",
  },
  {
    name: "Jamesss",
    img: "/logo/06.avif",
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
        className="h-16 w-auto object-contain"
        width={120}
        height={60}
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
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
    </div>
  )
}

    