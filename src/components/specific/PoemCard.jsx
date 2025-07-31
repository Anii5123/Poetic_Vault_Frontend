import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Eye, Heart, MessageCircle, Edit, Trash2, Share2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { formatDistanceToNow } from 'date-fns';

const PoemCard = ({ poem, onEdit, onDelete, onShare, showActions = true }) => {
  const handleShare = () => {
    const shareUrl = `${window.location.origin}/unlock/${poem._id}`;
    if (navigator.share) {
      navigator.share({
        title: poem.title,
        text: `Check out this beautiful poem: "${poem.title}"`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      // You could use a toast here to notify the user
    }
    if (onShare) onShare(poem);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-great-vibes text-poetic-purple line-clamp-2">
              {poem.title}
            </h3>
            <p className="text-sm text-gray-600 font-playfair">
              by {poem.author}
            </p>
            
            {/* Preview */}
            {poem.content && (
              <p className="text-gray-700 text-sm line-clamp-3 font-playfair leading-relaxed">
                {poem.content.substring(0, 100)}
                {poem.content.length > 100 && '...'}
              </p>
            )}
            
            {poem.pdfUrl && (
              <p className="text-gray-600 text-sm font-playfair italic">
                📄 PDF Document
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100 mt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{poem.viewCount || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span className="capitalize">{poem.category}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(poem.createdAt), { addSuffix: true })}
            </p>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(poem)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(poem)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default PoemCard;