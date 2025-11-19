'use client'

import { useState, useEffect } from 'react'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Video = {
  id: string
  title: string
  category: string
  videoUrl: string
  thumbnail?: string
}

export function WorkoutVideos() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const videosPerPage = 6

  const categories = ['All', 'Full body', 'Recipes']

  const videos: Video[] = [
    {
      id: '1',
      title: 'Cinnamon Swirl Protein Pancakes',
      category: 'Recipe',
      videoUrl: '/videos/Cinnamon Swirl Protein Pancakes.mp4',
    },
    {
      id: '2',
      title: 'Filet Mignon',
      category: 'Recipe',
      videoUrl: '/videos/Filet Mignon.mp4',
    },
    {
      id: '3',
      title: 'LC BBQ Chicken Pizza',
      category: 'Recipe',
      videoUrl: '/videos/LC BBQ Chicken Pizza.mp4',
    },
    {
      id: '4',
      title: 'LC pizza',
      category: 'Recipe',
      videoUrl: '/videos/LC pizza.mp4',
    },
    {
      id: '5',
      title: 'LC protein banana bread',
      category: 'Recipe',
      videoUrl: '/videos/LC protein banana bread.mp4',
    },
    {
      id: '6',
      title: 'Strawberry Italian Ice Protein bowl',
      category: 'Recipe',
      videoUrl: '/videos/Strawberry Italian Ice Protein bowl.mp4',
    },
    {
      id: '7',
      title: 'Super bowl snack',
      category: 'Recipe',
      videoUrl: '/videos/Super bowl snack.mp4',
    },
    {
      id: '8',
      title: 'Full body friday workout',
      category: 'Full body',
      videoUrl: '/videos/Full body friday workout.mp4',
    },
    {
      id: '9',
      title: 'Full body friday workout v2',
      category: 'Full body',
      videoUrl: '/videos/Full body friday workout v2.mp4',
    },
    {
      id: '10',
      title: 'Full body friday workout v3',
      category: 'Full body',
      videoUrl: '/videos/Full body friday workout v3.mp4',
    },
    {
      id: '11',
      title: 'Full body friday workout v4',
      category: 'Full body',
      videoUrl: '/videos/Full body friday workout v4.mp4',
    },
    {
      id: '12',
      title: 'Full body weekend workout',
      category: 'Full body',
      videoUrl: '/videos/Full body weekend workout.mp4',
    },
    {
      id: '13',
      title: 'KB Full body workout',
      category: 'Full body',
      videoUrl: '/videos/KB Full body friday workout.mp4',
    },
    {
      id: '14',
      title: 'Med Ball Full body workout',
      category: 'Full body',
      videoUrl: '/videos/Med Ball Full body workout.mp4',
    }
  ]

  useEffect(() => {
    const extractThumbnails = async () => {
      const newThumbnails: Record<string, string> = {}

      for (const video of videos) {
        try {
          const videoElement = document.createElement('video')
          videoElement.src = video.videoUrl
          videoElement.crossOrigin = 'anonymous'
          videoElement.muted = true

          await new Promise<void>((resolve, reject) => {
            videoElement.onloadedmetadata = () => {
              videoElement.currentTime = 1
            }

            videoElement.onseeked = () => {
              const canvas = document.createElement('canvas')
              canvas.width = videoElement.videoWidth
              canvas.height = videoElement.videoHeight

              const ctx = canvas.getContext('2d')
              if (ctx) {
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
                newThumbnails[video.id] = canvas.toDataURL('image/jpeg', 0.7)
              }
              resolve()
            }

            videoElement.onerror = () => {
              reject(new Error(`Failed to load video: ${video.videoUrl}`))
            }
          })
        } catch (error) {
          console.error(`Error extracting thumbnail for ${video.title}:`, error)
        }
      }

      setThumbnails(newThumbnails)
    }

    extractThumbnails()
  }, [])

  const filteredVideos =
    selectedCategory === 'All'
      ? videos
      : videos.filter((v) => v.category === selectedCategory)

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage)
  const startIndex = (currentPage - 1) * videosPerPage
  const endIndex = startIndex + videosPerPage
  const currentVideos = filteredVideos.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const featuredVideo = selectedVideo || videos[0]

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video)
    setIsPlaying(true)
  }

  const getThumbnail = (videoId: string) => {
    return thumbnails[videoId] || '/energetic-home-workout.png'
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-4">
          Workout Videos
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Get a taste of the training style
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={
                selectedCategory === category
                  ? 'bg-black text-white hover:bg-gray-800'
                  : ''
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Video Player */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
            {isPlaying ? (
              <div className="w-full">
                <video
                  key={featuredVideo.id}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[700px]"
                  poster={getThumbnail(featuredVideo.id)}
                >
                  <source src={featuredVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div
                className="relative aspect-[9/16] max-h-[600px] mx-auto group cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <img
                  src={getThumbnail(featuredVideo.id) || "/placeholder.svg"}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-black ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold text-black mt-4">
            {featuredVideo.title}
          </h3>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No videos available in this category yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Video Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {currentVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  className={`relative aspect-video rounded-lg overflow-hidden shadow-lg group cursor-pointer transition-all ${
                    selectedVideo?.id === video.id ? 'ring-4 ring-black' : ''
                  }`}
                >
                  <img
                    src={getThumbnail(video.id) || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-sm font-semibold line-clamp-1">
                      {video.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="icon"
                  className="disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <span className="text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="icon"
                  className="disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
