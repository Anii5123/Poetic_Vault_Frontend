import React, { useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { Heart, Download } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PoemDisplay = ({ poem, showAnimations = true }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (!poem) return null;

  const renderTextPoem = () => {
    const lines = poem.content.split('\n').filter(line => line.trim());
    return (
      <div className="space-y-4">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={showAnimations ? { opacity: 0, y: 20 } : {}}
            animate={showAnimations ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            className="poem-line"
          >
            <p className="poem-text text-center text-gray-800">
              {line}
            </p>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderPdfPoem = () => (
    <div className="flex flex-col items-center space-y-4">
      <Document
        file={poem.pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="border rounded-lg overflow-hidden"
      >
        <Page pageNumber={pageNumber} width={400} />
      </Document>
      {numPages > 1 && (
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            {pageNumber} of {numPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
            disabled={pageNumber >= numPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto">
      <motion.div
        initial={showAnimations ? { opacity: 0, scale: 0.9 } : {}}
        animate={showAnimations ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <motion.h1
          initial={showAnimations ? { opacity: 0, y: -20 } : {}}
          animate={showAnimations ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-great-vibes text-poetic-purple mb-4"
        >
          {poem.title}
        </motion.h1>

        <motion.p
          initial={showAnimations ? { opacity: 0 } : {}}
          animate={showAnimations ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-600 font-playfair italic"
        >
          by {poem.author}
        </motion.p>

        <motion.div
          initial={showAnimations ? { opacity: 0 } : {}}
          animate={showAnimations ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8"
        >
          {poem.content ? renderTextPoem() : renderPdfPoem()}
        </motion.div>

        <motion.div
          initial={showAnimations ? { opacity: 0, y: 20 } : {}}
          animate={showAnimations ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex items-center justify-center space-x-4 mt-8"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Heart className="w-4 h-4" />
            <span>Category: {poem.category}</span>
          </div>
          {poem.pdfUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(poem.pdfUrl, '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          )}
        </motion.div>
      </motion.div>
    </Card>
  );
};

PoemDisplay.propTypes = {
  poem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string,
    content: PropTypes.string,
    pdfUrl: PropTypes.string,
  }),
  showAnimations: PropTypes.bool,
};

export default PoemDisplay;
