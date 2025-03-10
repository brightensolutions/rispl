"use client"

import { PageTitle } from "@/components/other-page-title"
import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Play, Expand, ChevronLeft, ChevronRight, X } from "lucide-react"
import { YouTubePlayerModal } from "@/components/youtube-player-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

export default function EnhancedGallery() {
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string
    title: string
  } | null>(null)
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})
  const [loadedThumbnails, setLoadedThumbnails] = useState<Record<number, boolean>>({})
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Intersection observer for animation
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Sample gallery images
  const galleryImages = [
    "/images/about-us.jpg",
    "/images/about-us.jpg",
    "/images/about-us.jpg",
    "/images/about-us.jpg",
    "/images/about-us.jpg",
    "/images/about-us.jpg",
  ]

  // YouTube videos - using YouTube video IDs
  const videos = [
    {
      thumbnail: "/placeholder.svg?height=400&width=600",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      title: "Product Packaging Process",
    },
    {
      thumbnail: "/placeholder.svg?height=400&width=600",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      title: "Sustainable Packaging Solutions",
    },
    {
      thumbnail: "/placeholder.svg?height=400&width=600",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      title: "Custom Packaging Showcase",
    },
    {
      thumbnail: "/placeholder.svg?height=400&width=600",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      title: "Packaging Innovation",
    },
    {
      thumbnail: "/placeholder.svg?height=400&width=600",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      title: "Client Success Stories",
    },
  ]

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }))
  }

  const handleThumbnailLoad = (index: number) => {
    setLoadedThumbnails((prev) => ({
      ...prev,
      [index]: true,
    }))
  }

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsDialogOpen(true)
  }

  const handlePrevImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex((currentImageIndex - 1 + galleryImages.length) % galleryImages.length)
    }
  }

  const handleNextImage = () => {
    if (currentImageIndex !== null) {
      setCurrentImageIndex((currentImageIndex + 1) % galleryImages.length)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDialogOpen) return

      if (e.key === "ArrowLeft") {
        handlePrevImage()
      } else if (e.key === "ArrowRight") {
        handleNextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isDialogOpen, currentImageIndex])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-xy"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl translate-x-1/3 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <PageTitle
        title="Our Gallery"
        backgroundImage="/images/our-gallery-header.jpg"
        subtitle="Our Packaging Solution protects your Product to scale up to Next Level"
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Image Gallery Section - First */}
        <section ref={sectionRef} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Photo Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div
                  className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
                  onClick={() => openImageModal(index)}
                >
                  {!loadedImages[index] && <Skeleton className="w-full h-full rounded-lg absolute inset-0" />}
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onLoad={() => handleImageLoad(index)}
                  />
                  {/* Blue overlay effect */}
                  <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-primary rounded-full p-2">
                      <Expand className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Slider Section - Below Photos */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Video Gallery</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {videos.map((video, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div
                    className="relative group rounded-xl overflow-hidden aspect-video p-1 cursor-pointer"
                    onClick={() => setSelectedVideo(video)}
                  >
                    {!loadedThumbnails[index] && (
                      <Skeleton className="w-full h-full rounded-lg absolute inset-0 z-10" />
                    )}
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                      loading="lazy"
                      onLoad={() => handleThumbnailLoad(index)}
                    />
                    {/* Blue overlay effect */}
                    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay transition-opacity duration-300 rounded-xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-primary rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                          <Play className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h3 className="text-white font-medium text-xl px-4">{video.title}</h3>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static translate-y-0 mr-2" />
              <CarouselNext className="relative static translate-y-0 ml-2" />
            </div>
          </Carousel>
        </section>
      </div>

      {/* Image Modal with Navigation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black/95">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="flex items-center justify-center relative">
              {currentImageIndex !== null && (
                <img
                  src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  className="max-h-[80vh] w-auto object-contain"
                />
              )}

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>

            <div className="p-4 text-center text-white">
              {currentImageIndex !== null && <p>{`Image ${currentImageIndex + 1} of ${galleryImages.length}`}</p>}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* YouTube Player Modal */}
      {selectedVideo && (
        <YouTubePlayerModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          videoTitle={selectedVideo.title}
        />
      )}
    </div>
  )
}

