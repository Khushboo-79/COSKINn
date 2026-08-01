import { useState, useRef, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface CannedResponseWidgetProps {
  onSelect: (text: string) => void;
}

const CANNED_RESPONSES = [
  { id: '1', title: 'Greeting', text: 'Hi there! Thank you for reaching out to COSKIN support. How can I help you today?' },
  { id: '2', title: 'Refund Policy', text: 'Our refund policy allows returns within 30 days of purchase for unopened items. Would you like me to initiate a return request for you?' },
  { id: '3', title: 'Order Tracking', text: 'I have checked your order status. It is currently with our delivery partner and should reach you within the next 48 hours.' },
  { id: '4', title: 'Closing', text: 'Thank you for choosing COSKIN! If you need any more help, feel free to ask. Have a great day!' },
];

export const CannedResponseWidget = ({ onSelect }: CannedResponseWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
        title="Quick Responses"
      >
        <Zap className="h-4 w-4" />
        <span className="text-xs font-medium">Quick Reply</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-10 animate-in fade-in slide-in-from-bottom-2">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-100">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Canned Responses</h4>
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {CANNED_RESPONSES.map((response) => (
              <button
                key={response.id}
                onClick={() => {
                  onSelect(response.text);
                  setIsOpen(false);
                }}
                className="w-full text-left p-3 hover:bg-slate-50 rounded-lg transition-colors group"
              >
                <div className="font-medium text-slate-800 text-sm mb-1">{response.title}</div>
                <div className="text-xs text-slate-500 line-clamp-2">{response.text}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
