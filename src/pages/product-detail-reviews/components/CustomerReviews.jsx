import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const CustomerReviews = ({ product }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  const ratingFilterOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c5e8b3?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      date: "2025-01-05",
      verified: true,
      title: "Excellent quality and fast shipping!",
      content: `I absolutely love this product! The quality exceeded my expectations and it arrived much faster than anticipated. The packaging was also very professional and secure. I've been using it for a week now and it's working perfectly. Highly recommend to anyone considering this purchase.`,
      helpful: 24,
      images: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop"
      ]
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4,
      date: "2025-01-03",
      verified: true,
      title: "Good value for money",
      content: `Overall satisfied with this purchase. The product works as described and the price point is reasonable. Only minor complaint is that the setup instructions could be clearer, but once you figure it out, it's great. Would buy again.`,
      helpful: 18,
      images: []
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      date: "2024-12-28",
      verified: true,
      title: "Perfect for my needs!",
      content: `This is exactly what I was looking for. The build quality is solid and it fits perfectly in my setup. Customer service was also very responsive when I had questions before purchasing. Definitely recommend!`,
      helpful: 31,
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150&h=150&fit=crop"
      ]
    },
    {
      id: 4,
      author: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 3,
      date: "2024-12-25",
      verified: false,
      title: "Average product, could be better",
      content: `It's an okay product but I expected more for the price. The functionality is there but the design could be improved. It does what it's supposed to do but nothing exceptional. Might look for alternatives next time.`,
      helpful: 7,
      images: []
    },
    {
      id: 5,
      author: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      date: "2024-12-20",
      verified: true,
      title: "Outstanding customer service!",
      content: `Not only is the product great, but the customer service is exceptional. I had an issue with my initial order and they resolved it immediately with no hassle. The product itself is top-notch quality and works perfectly. Will definitely shop here again!`,
      helpful: 42,
      images: []
    }
  ];

  const ratingDistribution = {
    5: 156,
    4: 89,
    3: 23,
    2: 8,
    1: 4
  };

  const totalReviews = Object.values(ratingDistribution).reduce((sum, count) => sum + count, 0);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const handleHelpfulClick = (reviewId) => {
    alert(`Marked review ${reviewId} as helpful!`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Customer Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-foreground">{product.rating}</span>
              <div className="flex items-center space-x-1">
                {renderStars(Math.floor(product.rating))}
              </div>
            </div>
            <p className="text-muted-foreground">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating];
              const percentage = (count / totalReviews) * 100;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground w-8">
                    {rating} ★
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select
            label="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Filter by rating"
            options={ratingFilterOptions}
            value={filterRating}
            onChange={setFilterRating}
          />
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-card border border-border rounded-lg p-6">
            {/* Review Header */}
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src={review.avatar}
                alt={`${review.author} avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-foreground">{review.author}</h4>
                  {review.verified && (
                    <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Icon name="CheckCircle" size={12} />
                      <span>Verified Purchase</span>
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review.date)}
                  </span>
                </div>
                
                <h5 className="font-medium text-foreground">{review.title}</h5>
              </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <p className="text-muted-foreground leading-relaxed">
                {review.content}
              </p>
            </div>

            {/* Review Images */}
            {review.images.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => alert('Image preview feature coming soon!')}
                  />
                ))}
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleHelpfulClick(review.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="ThumbsUp" size={16} className="mr-2" />
                Helpful ({review.helpful})
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Flag" size={16} className="mr-2" />
                Report
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default CustomerReviews;