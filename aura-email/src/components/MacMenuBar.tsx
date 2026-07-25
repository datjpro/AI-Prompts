import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { AppleLogo } from './Primitives';

export function MacMenuBar() {
  const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
      className="relative z-10 w-full h-10 bg-black/40 backdrop-blur-md border-t border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs font-medium">
        {/* Left items */}
        <div className="flex items-center gap-4 text-white/70">
          <AppleLogo className="w-3.5 h-3.5 text-white" />
          <span className="font-bold text-white">Aura</span>
          {menuItems.map((item, i) => (
            <span
              key={item}
              className={`hover:text-white cursor-pointer transition-colors ${
                i > 3 ? 'hidden md:inline' : i > 2 ? 'hidden sm:inline' : 'inline'
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Right items */}
        <div className="flex items-center gap-3 text-white/70">
          <Search className="w-3.5 h-3.5 text-white/80" />
          <span>Wed May 6 1:09 PM</span>
        </div>
      </div>
    </motion.div>
  );
}
