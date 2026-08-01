import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  className?: string;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (sectionId: string, option: string) => void;
  onClearAll: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  className = '',
  selectedFilters,
  onFilterChange,
  onClearAll
}) => {
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
      options: ['Cleansers', 'Serums', 'Moisturisers', 'Masks', 'Sun Care', 'Eye Care', 'Face', 'Lips']
    },
    {
      id: 'Price',
      options: ['Under 2500', '2500 - 5000', 'Over 5000']
    },
    {
      id: 'Skin Type',
      options: ['Oily', 'Dry', 'Combination', 'Normal', 'Sensitive']
    },
    {
      id: 'Concern',
      options: ['Acne-Prone', 'Anti-Aging', 'Dark Circles', 'Fine Lines', 'Dullness', 'Uneven Texture', 'Dryness', 'Redness', 'Uneven Tone', 'Longevity']
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className={`text-xl font-bold ${isGlam ? 'font-serif text-[#2a2a2a]' : 'font-display text-[#2a2a2a]'}`}>
          Filter by
        </h3>
        <button 
          onClick={onClearAll}
          className={`text-xs font-bold underline ${isGlam ? 'text-[#7a1b26]' : 'text-[#ff9aa8]'}`}
        >
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
                {section.options.map((option, idx) => {
                  const isChecked = selectedFilters[section.id]?.includes(option) || false;
                  return (
                    <label key={idx} className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="peer sr-only"
                          checked={isChecked}
                          onChange={() => onFilterChange(section.id, option)}
                        />
                        <div className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                          isChecked 
                            ? (isGlam ? 'border-[#7a1b26] bg-[#7a1b26]' : 'border-[#ff9aa8] bg-[#ff9aa8]')
                            : 'border-gray-200'
                        }`}>
                          <svg className={`w-3 h-3 text-white transition-opacity ${isChecked ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className={`ml-3 text-sm transition-colors ${
                        isChecked 
                          ? (isGlam ? 'text-[#7a1b26] font-bold font-serif' : 'text-[#2a2a2a] font-bold font-sans')
                          : (isGlam ? 'text-gray-600 font-serif' : 'text-gray-600 font-sans')
                      }`}>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
