"use client";

import Link from "next/link";
import { SlidePanel } from "./slide-panel";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="Menu"
      ariaLabel="Mobile navigation"
    >
      <ul className="space-y-4">
        <li>
          <Link
            href="/"
            onClick={onClose}
            className="block py-3 text-lg font-medium hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            onClick={onClose}
            className="block py-3 text-lg font-medium hover:text-gray-600 transition-colors"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            onClick={onClose}
            className="block py-3 text-lg font-medium hover:text-gray-600 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            onClick={onClose}
            className="block py-3 text-lg font-medium hover:text-gray-600 transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>
    </SlidePanel>
  );
}

