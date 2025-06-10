
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-gray-900 text-white py-4 z-10">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-sm">
            © {currentYear} CDAC. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
