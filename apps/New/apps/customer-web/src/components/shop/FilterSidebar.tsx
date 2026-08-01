import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ className = '' }) => {
  const { mode } = useTheme();
  const isGlam = mode === 'glam';

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'Category': true,
    'Price': true,
    'Skin Type': true,
    'Concern': false,
    'Flavour': false
  });

  const toggleSection = (section: string) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filters = [
    {
      id: 'Category',
      options: ['Cleansers', 'Serums', 'Moisturisers', 'Masks', 'Sun Care']
    },
    {
      id: 'Price',
      options: ['Under $25', '$25 - $50', '$50 - $100', 'Over $100']
    },
    {
      id: 'Skin Type',
      options: ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive']
    },
    {
      id: 'Concern',
      options: ['Acne', 'Aging', 'Pigmentation', 'Texture', 'Redness', 'Dullness']
    },
    {
      id: 'Flavour',
      options: ['Peach', 'Watermelon', 'Strawberry', 'Avocado', 'Plum']
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className={`text-xl font-bold ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-[#2a2a2a]'}`}>
          Filter by
        </h3>
        <button className={`text-xs font-bold underline ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}>
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {filters.map((section) => (
          <div key={section.id} className="border-b border-gray-100 pb-4">
            <button 
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between py-2 group"
            >
              <span className={`text-sm font-bold uppercase tracking-wider ${isGlam ? 'text-gray-800' : 'text-gray-700'}`}>
                {section.id}
              </span>
              <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
                {expanded[section.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>
            
            {expanded[section.id] && (
              <div className="pt-4 space-y-3">
                {section.options.map((option, idx) => (
                  <label key={idx} className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="peer sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                        isGlam 
                          ? 'border-gray-200 peer-checked:border-[#7a1b26] peer-checked:bg-[#7a1b26]' 
                          : 'border-gray-200 peer-checked:border-[#ff9aa8] peer-checked:bg-[#ff9aa8]'
                      }`}></div>
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className={`ml-3 text-sm transition-colors ${
                      isGlam 
                        ? 'text-gray-600 font-serif peer-checked:text-[#7a1b26] peer-checked:font-bold' 
                        : 'text-gray-600 font-sans peer-checked:text-[#2a2a2a] peer-checked:font-bold'
                    }`}>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
