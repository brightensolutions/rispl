"use client"

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

interface YouTubePlayerModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  videoTitle: string
}

export function YouTubePlayerModal({ isOpen, onClose, videoUrl, videoTitle }: YouTubePlayerModalProps) {
  const [embedUrl, setEmbedUrl] = useState("")

  useEffect(() => {
    if (videoUrl) {
      // Extract YouTube video ID from different URL formats
      let videoId = ""

      // Handle youtube.com/watch?v= format
      if (videoUrl.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(videoUrl).search)
        videoId = urlParams.get("v") || ""
      }
      // Handle youtu.be/ format
      else if (videoUrl.includes("youtu.be/")) {
        videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0] || ""
      }
      // Handle youtube.com/embed/ format
      else if (videoUrl.includes("youtube.com/embed/")) {
        videoId = videoUrl.split("youtube.com/embed/")[1]?.split("?")[0] || ""
      }

      if (videoId) {
        // Create embed URL with autoplay and related videos disabled
        setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`)
      }
    }
  }, [videoUrl])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
        <div className="relative">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
            <X className="h-5 w-5" />
          </DialogClose>

          <div className="w-full">
            {embedUrl && (
              <div className="aspect-video w-full">
                <iframe
                  src={embedUrl}
                  title={videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            )}

            <div className="bg-black p-4">
              <h3 className="text-white text-xl font-medium">{videoTitle}</h3>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

