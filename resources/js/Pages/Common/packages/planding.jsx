import { Search, Calendar, ChevronDown, MapPin, Users, Star, ArrowRight, DollarSign, Tag, Heart, Plane, Sunrise, Coffee, X, Clock } from "lucide-react"
import { useState } from "react"
import packagesData from '../../../data/packages.json'
import { Link } from "react-router-dom"
import Navbar from '../Navbar'
import Footer from '../Footer'

const TravelPackages = () => {
  const [selectedPackageType, setSelectedPackageType] = useState("All Inclusive")
  const [travelers, setTravelers] = useState(2)
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false)
  const [likedPackages, setLikedPackages] = useState([])
  const [showSearchPage, setShowSearchPage] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Combine all packages into one array for search
  // Update package images with high-quality Unsplash images
  const allPackages = [
    ...(packagesData.dubai?.packages || []).map(pkg => ({
      ...pkg,
      image: pkg.id === 1 ? "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" :
             pkg.id === 2 ? "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" :
             pkg.id === 3 ? "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" :
             "https://images.unsplash.com/photo-1559599746-c0f31b4d2b8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    })),
    ...(packagesData.europe?.packages || []).map(pkg => ({
      ...pkg,
      image: pkg.id === 1 ? "https://images.unsplash.com/photo-1493707553966-283afac8c358?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" :
             pkg.id === 2 ? "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" :
             "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80"
    })),
    ...(packagesData.kashmir?.packages || []).map(pkg => ({
      ...pkg,
      image: pkg.id === 1 ? "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" :
             pkg.id === 2 ? "https://images.unsplash.com/photo-1626011352089-8b4700a539e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" :
             pkg.id === 3 ? "https://images.unsplash.com/photo-1572553073075-c8de74bc86df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2428&q=80" :
             "https://images.unsplash.com/photo-1576408048159-b471bd05e2fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
    })),
    ...(packagesData.northEast?.packages || []).map(pkg => ({
      ...pkg,
      image: pkg.id === 1 ? "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" :
             pkg.id === 2 ? "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80" :
             "https://images.unsplash.com/photo-1565019011521-254775ab7675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2369&q=80"
    }))
  ]

  const packageTypes = ["All Inclusive", "Flight + Hotel", "Activities Only", "Cruise Package"]

  const toggleLike = (packageId) => {
    setLikedPackages(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    )
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setShowSearchPage(true)
  }

  // Filter packages based on search query and package type
  const filteredPackages = allPackages.filter(pkg => {
    const matchesSearch = !searchQuery || 
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pkg.location && pkg.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pkg.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedPackageType === "All Inclusive" || 
      pkg.features.includes(selectedPackageType)

    return matchesSearch && matchesType
  })

  if (showSearchPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back to Landing Button */}
        <button
          onClick={() => setShowSearchPage(false)}
          className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-gray-700"
        >
          <ArrowRight className="rotate-180" size={20} />
          Back to Home
        </button>

        {/* Search Header */}
        <div className="bg-white shadow-md sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search destinations, packages, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>

              {/* Package Type Filter */}
              <div className="relative">
                <select
                  value={selectedPackageType}
                  onChange={(e) => setSelectedPackageType(e.target.value)}
                  className="appearance-none px-4 py-3 rounded-lg border border-gray-200 bg-white pr-10 cursor-pointer"
                >
                  {packageTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-4 py-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredPackages.length} packages found
            </h2>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedPackageType("All Inclusive")
                }}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                <X size={16} />
                Clear filters
              </button>
            )}
          </div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {/* Package Image */}
                <div className="relative h-48">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(pkg.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all"
                  >
                    <Heart
                      size={20}
                      className={`${likedPackages.includes(pkg.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    />
                  </button>

                  {/* Discount Tag */}
                  {pkg.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {pkg.discount}% OFF
                    </div>
                  )}

                  {/* Package Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{pkg.title}</h3>
                    {pkg.location && (
                      <div className="flex items-center gap-1 text-white/90">
                        <MapPin size={16} />
                        <span className="text-sm">{pkg.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Package Details */}
                <div className="p-4">
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {pkg.features?.slice(0, 3).map((feature, idx) => (
                      <span
                        key={`${pkg.id}-feature-${idx}`}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Rating & Duration */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                      <span className="text-gray-500 text-sm">({pkg.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock size={16} />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-end justify-between border-t pt-3">
                    <div>
                      <p className="text-gray-500 text-sm">Starting from</p>
                      <div className="flex items-center gap-1">
                        <DollarSign size={18} className="text-blue-600" />
                        <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link 
                        to="/packages/itinerary" 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-1 text-sm font-medium group"
                      >
                        View Itinerary
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <Plane className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No packages found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f8fafc] text-gray-800">
      <Navbar />
      
      {/* Hero Section */}
      <section
        className="relative h-[75vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>

        <div className="container mx-auto px-4 z-10">
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 drop-shadow-md">
              Explore our handpicked destinations and create unforgettable memories
            </p>
          </div>

          <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-sm rounded-xl p-8 max-w-5xl mx-auto shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-medium mb-2">Destination</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-medium mb-2">Package Type</label>
                <div className="relative">
                  <select
                    value={selectedPackageType}
                    onChange={(e) => setSelectedPackageType(e.target.value)}
                    className="w-full p-3 border rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {packageTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-medium mb-2">Travel Date</label>
                <div className="relative">
                  <div className="flex items-center justify-between p-3 border rounded-md hover:border-blue-500 cursor-pointer transition-all">
                    <span>Select dates</span>
                    <Calendar size={18} className="text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 text-sm font-medium mb-2">Travelers</label>
                <div className="relative">
                  <div 
                    className="flex items-center justify-between p-3 border rounded-md hover:border-blue-500 cursor-pointer transition-all"
                    onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
                  >
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-gray-500" />
                      <span>{travelers} Traveler{travelers !== 1 ? 's' : ''}</span>
                    </div>
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                  {showTravelersDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border z-50">
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div
                          key={`traveler-${num}`}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center justify-between"
                          onClick={() => {
                            setTravelers(num)
                            setShowTravelersDropdown(false)
                          }}
                        >
                          <span>{num} Traveler{num !== 1 ? 's' : ''}</span>
                          {travelers === num && <Star size={16} className="text-blue-500" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-end">
                <button type="submit" className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 group">
                  <Search size={20} />
                  <span className="hidden md:inline group-hover:translate-x-1 transition-transform">
                    Search
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{packagesData.stats.destinations}</div>
              <div className="text-gray-600">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{packagesData.stats.happyTravelers}</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{packagesData.stats.packages}</div>
              <div className="text-gray-600">Travel Packages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{packagesData.stats.support}</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dubai Packages Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 mb-2 uppercase tracking-wider font-medium">{packagesData.dubai.title}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{packagesData.dubai.subtitle}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packagesData.dubai.packages.map((item) => (
              <div 
                key={item.id}
                className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* Discount Tag */}
                  {item.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.discount}% OFF
                    </div>
                  )}
                  
                  {/* Like Button */}
                  <button 
                    onClick={() => toggleLike(item.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all"
                  >
                    <Heart 
                      size={20} 
                      className={`${likedPackages.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-white/80" />
                      <p className="text-white/80 text-sm">{item.location}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.features.map((feature, idx) => (
                      <span key={`${item.id}-feature-${idx}`} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Package Highlights:</h4>
                    <ul className="text-sm text-gray-500 space-y-1">
                      {item.highlights.map((highlight, idx) => (
                        <li key={`${item.id}-highlight-${idx}`} className="flex items-center gap-2">
                          <Sunrise size={14} className="text-blue-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rating & Duration */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-gray-500 text-sm">({item.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock size={16} />
                      <span className="text-sm">{item.duration}</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-end justify-between border-t pt-3">
                    <div>
                      <p className="text-gray-500 text-sm">Starting from</p>
                      <div className="flex items-center gap-1">
                        <DollarSign size={18} className="text-blue-600" />
                        <span className="text-2xl font-bold text-blue-600">{item.price}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link 
                        to="/packages/itinerary" 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-1 text-sm font-medium group"
                      >
                        View Itinerary
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Europe Packages Section */}
      <section className="py-16 bg-[#1e3a5f] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <p className="text-blue-300 mb-2 uppercase tracking-wider font-medium">{packagesData.europe.title}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{packagesData.europe.subtitle}</h2>
            <div className="w-20 h-1 bg-blue-300 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {packagesData.europe.packages.map((item) => (
              <div key={item.id} className="rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform group-hover:-translate-y-1 transition-all">
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-xl">{item.title}</h3>
                    <div className="flex items-center justify-between text-white/90">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span className="text-sm">{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} />
                        <span className="text-sm">{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kashmir Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 mb-2 uppercase tracking-wider font-medium">{packagesData.kashmir.title}</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{packagesData.kashmir.subtitle}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {packagesData.kashmir.packages.map((item) => (
              <div key={item.id} className="rounded-lg overflow-hidden shadow-md group">
                <div className="relative h-48">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-center group-hover:text-lg transition-all">{item.title}</h3>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-white/90">
                        <Clock size={14} />
                        <span className="text-sm">{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/90">
                        <DollarSign size={14} />
                        <span className="text-sm">{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* North East & Bhutan Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-600 mb-2 uppercase tracking-wider font-medium">{packagesData.northEast.title}</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{packagesData.northEast.subtitle}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packagesData.northEast.packages.map((item) => (
              <div key={item.id} className="rounded-xl overflow-hidden shadow-lg group">
                <div className="relative h-64">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-white/90">
                        <Clock size={14} />
                        <span className="text-sm">{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/90">
                        <DollarSign size={14} />
                        <span className="text-sm">${item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599640842225-85d111c60e6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Exclusive Travel Deals</h2>
            <p className="text-xl text-blue-100 mb-8">Subscribe to our newsletter and receive up to 50% off on your next adventure!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 text-lg shadow-lg"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg">
                Subscribe Now
              </button>
            </div>
            <p className="text-blue-200 mt-4 text-sm">*By subscribing, you agree to receive marketing emails from us.</p>
          </div>
        </div>
      </section>

      {/* Add custom styles for animations */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          50% { transform: translateY(6px); }
          100% { transform: translateY(0); }
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default TravelPackages;

