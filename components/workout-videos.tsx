'use client'

import { useState, useEffect } from 'react'
import { Play, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Video = {
  id: string
  title: string
  category: string
  videoUrl: string
  description?: string
  thumbnail?: string
}

export function WorkoutVideos() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const videosPerPage = 6

  const categories = ['All', 'Full body Workouts', 'Push Workouts', 'Leg Workouts', 'Workout tips', 'Recipe']
  const videos: Video[] = [
    {
      id: '1',
      title: 'Cinnamon Swirl Protein Pancakes',
      category: 'Recipe',
      videoUrl: '/videos/Cinnamon Swirl Protein Pancakes.mp4',
      description: 'SIMPLE Protein Pancake Recipe🥞\n\nHappy Sunday! There’s no better way to start your morning than with protein-packed pancakes!\n\n@catalyst.supps Cinnamon Swirl Protein Pancakes:\n\nIngredients:\n- 2 Eggs✅\n- 1 Cup Plain Greek Yogurt\n- 1 Cup Oats (blended)✅\n- 1 Tbsp Baking Soda✅\n- 2 Tbsp Ground Cinnamon✅\n- 1 Tbsp Coconut Oil✅\n- 2 Scoops Catalyst Cinnamon Swirl Protein Powder✅\n- 2 Cups Almond Flour\n\nTop them off however you like — make it look pretty 🤩\n\nSave & Share so you can start your Sunday off right🔥'
    },
    {
      id: '2',
      title: 'Filet Mignon',
      category: 'Recipe',
      videoUrl: '/videos/Filet Mignon.mp4',
      description: 'My way of cooking my Filet Mignon steak🔥\n\nHere are some tips when cooking steak on a cast iron skillet:\n\n• Preheat the pan: Start with a hot skillet🔥\n• Season the meat: Apply your favorite rub before cooking for maximum flavor👌🏽\n• Add butter: Toss in some butter near the end to baste the steak and boost richness🧈\n• Let it rest: After cooking, let your steak rest for 5–10 minutes to lock in the juices😮‍💨\n• Adjust the heat: Start with high heat for that crispy crust, then lower to medium-low to finish perfectly🔥\n• Warm the meat: Let the steak reach room temperature before cooking for extra tenderness👌🏽\n\nTry this method for a juicy, flavorful Filet Mignon every time.\n\nSave this for your next cook-up and share it with someone who loves steak!😋🥩\n\nLet me know how yours turns out!🔥'
    },
    {
      id: '3',
      title: 'LC BBQ Chicken Pizza',
      category: 'Recipe',
      videoUrl: '/videos/LC BBQ Chicken Pizza.mp4',
      description: '🍕LOW CARB BBQ CHICKEN PIZZA🐓\n\nInspired by the great @stevehochman.driven 🔥\n\nUsing almond flour has completely transformed my diet. It lets me enjoy plenty of low-carb alternatives while staying lean — and the best part, I can eat more without feeling bloated👌🏽\n\nBenefits of using almond flour:\n- Gluten Friendly\n- Nutrient-Rich\n- High in Protein\n- Low Carb\n- Versatile to cook with\n- Keto Friendly\n\nThis pizza recipe is incredibly quick — you can make it in just 30 minutes! Give it a try and see how it turns out 😋🔥'
    },
    {
      id: '4',
      title: 'LC pizza',
      category: 'Recipe',
      videoUrl: '/videos/LC pizza.mp4',
      description: 'Craving pizza all weekend? 🍕\n\nHere’s your last chance to enjoy it without the guilt.\n\nWith 24g of protein per slice and only 600 calories for the entire pizza 🤔🔥\n\nSave✅ this low-carb, high-protein pizza recipe ⬇️⬇️⬇️\n\nIngredients:\n- 1 Egg\n- 2 Scoops Almond Flour\n- 1 Cup Plain Greek Yogurt\n(Mix all together)\n\nSpread your dough on a pizza pan — keep applying flour as you shape it.\nCook the crust at 400°F for 10–12 minutes.\n\nNow add your toppings🔥🔥\nI used:\n- Pizza sauce (tomato sauce)\n- Genoa Salami\n- Pepperoni\n- Lean Ground Beef\n- Cherry Tomatoes\n- White Onions\n- Chopped Garlic\n- Mushrooms\n- Shredded Cheese\n\nBake for 14 minutes at 400°F.\n\nIf you’re feeling adventurous, add fresh basil on top for an even brighter flavor 🍃🌱'
    },
    {
      id: '5',
      title: 'LC protein banana bread',
      category: 'Recipe',
      videoUrl: '/videos/LC protein banana bread.mp4',
      description: 'LOW CARB PROTEIN 🍌🍞\n\nIngredients:\n- 2 Cups Almond Flour\n- 2 Scoops Vanilla Isolate Protein\n- 1 Cup Greek Yogurt\n- 2 Eggs\n- 2 Ripe Bananas\n- 1 Tbsp Vanilla Extract\n- 1/2 Tbsp Baking Soda\n- 1/2 Cup Peanut Butter Chips\n- 1/2 Tbsp Salt\n- 3 Tbsp Chia Seeds\n\nThis is a GREAT low-carb substitute for regular banana bread 😇\n\nYou HAVE to try this!!\n\nMake sure to SAVE & SHARE this simple recipe — and feel free to add your own charm to it 😉❤️'
    },
    {
      id: '6',
      title: 'Strawberry Italian Ice Protein bowl',
      category: 'Recipe',
      videoUrl: '/videos/Strawberry Italian Ice Protein bowl.mp4',
      description: 'Using @1upnutrition Strawberry Italian Ice Clear Protein I was able to make the most simple post workout protein bowl with over 35 grams of protein in each bowl🔥🔥\n\nIngredients:\n\n-1 Cup Greek Yohgurt\n-1 Scoop of Strawberry Italian Ice Clear Protein by @1upnutrition\n-Strawberries\n-1/2 a Banana\n-Pecans\n-Crushed Walnuts\n-Organic Raw Honey\n-Hersheys 0 Sugar chocolate syrup\n\nThis is way more refreshing then a regular protien shake post workout.\n\nIf you don\'t save and share this with someone who struggles with taking in protein post workout, you ALL are missing out 👋🏽\n\nLet me know how it tastes 😋\n\nBecome better with @1upnutrition !\n\nUSE CODE: Kian20 when ordering'
    },
    {
      id: '7',
      title: 'Super bowl snack',
      category: 'Recipe',
      videoUrl: '/videos/Super bowl snack.mp4',
      description: 'Need a Last Minute Super Bowl Snack? ⏲️\n\nNeed a delicious, high-protein dish to bring to your Super Bowl party? I got you.\n\nMacros per serving (makes 12 servings):\n- Cals: 380\n- Fat: 16g\n- Carbs: 25g\n- Protein: 37g\n\nTip: Split the beef and chicken in half in the dish so guests can choose their preference.\n\nIngredients:\n- 2 lbs lean ground beef (95/5)\n- 2 lbs ground chicken\n- 2 servings taco seasoning\n- 16 oz plain fat-free Greek yogurt\n- 16 oz refried beans\n- 8 oz shredded Mexican blend cheese\n- 8 oz guacamole of choice\n- 8 oz chunky salsa of choice\n- 16 oz shredded cabbage OR lettuce\n\nInstructions:\n1. Cook ground beef over medium-high heat & drain fat onto a paper towel.\n2. Add 1/2 cup water to ground beef and evenly mix taco seasoning into both the beef and chicken.\n3. Remove seasoned beef from heat and let it cool.\n4. In a bowl, mix Greek yogurt and taco seasoning until fully combined.\n5. MAKE SURE to lick the spoon 🤣\n6. Spread the yogurt mixture evenly along the bottom of a glass serving dish.\n7. Add refried beans — stir well before spreading to avoid lumps!\n8. Remove tray from the refrigerator & layer your ground chicken, beef, refried beans, peppers, tomato, half your shredded cabbage or lettuce, cheese, guacamole, salsa, and the remaining shredded cheese.\n9. You did it. YOU ARE THE MVP of the party 🥇\n\nThis high-protein dish will set the tone for the Super Bowl.\n\nI know the swiftys are excited 🤣\n\nA MUST try!'
    },
    {
      id: '8',
      title: 'Full body friday workout',
      category: 'Full body Workouts',
      videoUrl: '/videos/Full body friday workout.mp4',
    },
    {
      id: '9',
      title: 'Full body friday workout v2',
      category: 'Full body Workouts',
      videoUrl: '/videos/Full body friday workout v2.mp4',
    },
    {
      id: '10',
      title: 'Full body friday workout v3',
      category: 'Full body Workouts',
      videoUrl: '/videos/Full body friday workout v3.mp4',
    },
    {
      id: '11',
      title: 'Full body friday workout v4',
      category: 'Full body Workouts',
      videoUrl: '/videos/Full body friday workout v4.mp4',
    },
    {
      id: '12',
      title: 'Full body weekend workout',
      category: 'Full body Workouts',
      videoUrl: '/videos/Full body weekend workout.mp4',
    },
    {
      id: '13',
      title: 'KB Full body workout',
      category: 'Full body Workouts',
      videoUrl: '/videos/KB Full body friday workout.mp4',
    },
    {
      id: '14',
      title: 'Med Ball Full body workout',
      category: 'Full body Workouts',
      videoUrl: '/videos/Med Ball Full body workout.mp4',
    },
    {
      id: '15',
      title: 'Crazy shoulder blast',
      category: 'Push Workouts',
      videoUrl: '/videos/Crazy shoulder blast.mp4',
    },
    {
      id: '16',
      title: 'Upper body workout',
      category: 'Push Workouts',
      videoUrl: '/videos/Upper body workout.mp4',
    },
    {
      id: '17',
      title: 'Strict Chest Workout',
      category: 'Push Workouts',
      videoUrl: '/videos/Strict Chest Workout.mp4',
    },
    {
      id: '18',
      title: 'DB Upper Body Workout',
      category: 'Push Workouts',
      videoUrl: '/videos/DB Upper Body Workout.mp4',
    },
    {
      id: '19',
      title: 'KB Leg Circuit',
      category: 'Leg Workouts',
      videoUrl: '/videos/KB Leg Circuit.mp4',
    },
    {
      id: '20',
      title: 'Leg day workout',
      category: 'Leg Workouts',
      videoUrl: '/videos/Leg day workout.mp4',
    },
    {
      id: '21',
      title: 'Underated leg day finisher',
      category: 'Leg Workouts',
      videoUrl: '/videos/Underated leg day finisher.mp4',
    },
    {
      id: '22',
      title: '3 reasons why your not building muscle',
      category: 'Workout tips',
      videoUrl: '/videos/3 reasons why your not building muscle.mp4',
    },
    {
      id: '23',
      title: '5 signs your calories are too low',
      category: 'Workout tips',
      videoUrl: '/videos/5 sign your calories are too low.mp4',
    },
    {
      id: '24',
      title: 'Benefits of kettlebell swings',
      category: 'Workout tips',
      videoUrl: '/videos/Benefits of kettlebell swings.mp4',
    },
    {
      id: '25',
      title: 'Benefits of pulse movements',
      category: 'Workout tips',
      videoUrl: '/videos/Benefits of pulse movements.mp4',
    },
    {
      id: '26',
      title: 'Why training hamstrings is so important',
      category: 'Workout tips',
      videoUrl: '/videos/Why training hamstrings is so important.mp4',
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
          videoElement.preload = 'metadata'

          await new Promise<void>((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              reject(new Error('Timeout loading video'))
            }, 5000)

            videoElement.onloadedmetadata = () => {
              clearTimeout(timeoutId)
              videoElement.currentTime = 1
            }

            videoElement.onseeked = () => {
              const canvas = document.createElement('canvas')
              canvas.width = videoElement.videoWidth || 640
              canvas.height = videoElement.videoHeight || 360

              const ctx = canvas.getContext('2d')
              if (ctx) {
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
                newThumbnails[video.id] = canvas.toDataURL('image/jpeg', 0.7)
              }
              resolve()
            }

            videoElement.onerror = () => {
              clearTimeout(timeoutId)
              resolve() // Resolve instead of reject to continue with other videos
            }
          })
        } catch (error) {
          console.log(`[v0] Could not extract thumbnail for ${video.title}, using fallback`)
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
    setIsDescriptionExpanded(false)
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

  const isLongDescription = (description?: string) => {
    return description && description.length > 150
  }

  const getTruncatedDescription = (description?: string) => {
    if (!description) return ''
    if (description.length <= 150) return description
    return description.substring(0, 150) + '...'
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-4">
          Fitness & Lifestyle Videos
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Your go-to place for workout routines, recipe ideas, and lifestyle content that keeps you feeling great.
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
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-black">
              {featuredVideo.title}
            </h3>
            <p className="text-gray-600 mb-2">{featuredVideo.category}</p>
            
            {featuredVideo.description && (
              <div className="mt-3">
                <p className="text-gray-700 whitespace-pre-line">
                  {isDescriptionExpanded
                    ? featuredVideo.description
                    : getTruncatedDescription(featuredVideo.description)}
                </p>
                {isLongDescription(featuredVideo.description) && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mt-2 text-black font-semibold hover:underline flex items-center gap-1"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        Show less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl text-center mb-8">
          <span className="font-bold text-black">{selectedCategory}</span>
        </h3>

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
