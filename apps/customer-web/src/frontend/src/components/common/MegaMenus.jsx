import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { skincareNavigation } from '../../constants/skincareNavigation';
import { cosmeticsNavigation } from '../../constants/cosmeticsNavigation';

const MenuPanel = ({ children, widthClass = "w-[800px]" }) => (
  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    className={`absolute top-full left-1/2 -translate-x-1/2 mt-6 ${widthClass} bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.07)] overflow-hidden z-[100] p-8 cursor-default`}
  >
    {children}
  </motion.div>
);

const MenuLink = ({ to, children }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (to && to !== '#') {
      navigate(to);
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className="block text-black/80 hover:text-theme-primary font-medium text-[14px] transition-colors py-1.5 cursor-pointer"
    >
      {children}
    </a>
  );
};

const MenuSectionTitle = ({ children }) => (
  <h4 className="text-[12px] font-bold uppercase tracking-widest text-black mb-4 border-b border-black/10 pb-2">{children}</h4>
);

export const ShopMegaMenu = ({ theme }) => {
  const data = theme === 'skincare' ? skincareNavigation : cosmeticsNavigation;
  
  return (
    <MenuPanel>
      <div className="grid grid-cols-4 gap-8">
        {data.shop.map((section, idx) => (
          <div key={idx}>
            <MenuSectionTitle>{section.title}</MenuSectionTitle>
            <div className="flex flex-col gap-1">
              {section.links.map((link, lIdx) => (
                <MenuLink key={lIdx} to={link.href}>{link.name}</MenuLink>
              ))}
            </div>
          </div>
        ))}
        
        <div className="bg-theme-bg/50 p-6 -m-4 rounded-2xl border border-white/50 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-lg mb-2 text-black">{data.bundles.title}</h4>
            <p className="text-sm opacity-70 mb-4">{data.bundles.description}</p>
            <div className="flex flex-col gap-1">
              {data.bundles.links.map((link, lIdx) => (
                <MenuLink key={lIdx} to={link.href}>{link.name}</MenuLink>
              ))}
            </div>
          </div>
          <Link to={data.bundles.shopAllHref} className="text-theme-primary font-bold text-sm hover:underline mt-4">
            {data.bundles.shopAllText}
          </Link>
        </div>
      </div>
    </MenuPanel>
  );
};

export const CategoriesMegaMenu = ({ theme }) => {
  const data = theme === 'skincare' ? skincareNavigation : cosmeticsNavigation;

  return (
    <MenuPanel widthClass="w-[750px]">
      <div className="grid grid-cols-3 gap-8">
        {data.categories.map((section, idx) => (
          <div key={idx}>
            <MenuSectionTitle>{section.title}</MenuSectionTitle>
            <div className="flex flex-col gap-1">
              {section.links.map((link, lIdx) => (
                <MenuLink key={lIdx} to={link.href}>{link.name}</MenuLink>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-theme-bg/50 p-6 -m-4 rounded-2xl border border-white/50 flex flex-col justify-between">
          <div>
            <MenuSectionTitle>{data.categoryHighlight.title}</MenuSectionTitle>
            <div className="flex flex-col gap-1">
              {data.categoryHighlight.links.map((link, lIdx) => (
                <MenuLink key={lIdx} to={link.href}>{link.name}</MenuLink>
              ))}
            </div>
          </div>
          {data.categoryHighlight.highlightTag && (
            <div className="mt-4 pt-4 border-t border-black/10">
              <span className="text-xs font-bold text-theme-primary uppercase tracking-widest">{data.categoryHighlight.highlightTag}</span>
              <p className="text-sm font-medium mt-1">{data.categoryHighlight.highlightText}</p>
            </div>
          )}
        </div>
      </div>
    </MenuPanel>
  );
};

export const RoutineMenu = ({ theme }) => {
  const data = theme === 'skincare' ? skincareNavigation : cosmeticsNavigation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[260px] bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.07)] overflow-hidden z-[100] py-4 cursor-default"
    >
      <div className="flex flex-col">
        {data.routines.map((routine, idx) => (
          <Link key={idx} to={routine.href} className="px-6 py-2.5 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">
            {routine.name}
          </Link>
        ))}
        <div className="border-t border-black/10 my-2"></div>
        <Link to="/routine" className="px-6 py-2.5 text-sm font-bold text-theme-primary hover:bg-theme-primary/10 transition-colors">
          Complete Routine →
        </Link>
      </div>
    </motion.div>
  );
};

export const JournalMenu = ({ theme }) => {
  const data = theme === 'skincare' ? skincareNavigation : cosmeticsNavigation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[240px] bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.07)] overflow-hidden z-[100] py-4 cursor-default"
    >
      <div className="flex flex-col">
        {data.journal.map((item, idx) => (
          <Link key={idx} to={item.href} className="px-6 py-2 text-sm font-medium text-black/80 hover:text-black hover:bg-theme-primary/10 transition-colors">
            {item.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};
