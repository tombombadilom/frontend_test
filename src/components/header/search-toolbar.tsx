'use client';
import type React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';
import games from '@/data/games.json';
import ToolbarDynamic from '../motion-primitives/toolbar-dynamic';
import { CommandItem } from '@/components/ui/command';

function IconButton({
  children,
  onClick,
  disabled,
  ariaLabel,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <button
      className={`relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${className}`}
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default function SearchToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<typeof games>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setSearchQuery('');
    setSuggestions([]);
  });

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredGames = games
        .filter(game => 
          game.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filteredGames);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.toLowerCase().replace(/\s+/g, '-')}`);
      setIsOpen(false);
      setSearchQuery('');
      setSuggestions([]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <ToolbarDynamic
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="search-button"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className='flex items-center justify-center'
            >
              <IconButton
                onClick={() => setIsOpen(true)}
                ariaLabel='Search'
              >
                <Search className='h-5 w-5' />
              </IconButton>
            </motion.div>
          ) : (
            <motion.div
              key="search-input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className='flex space-x-2'
            >
              <IconButton onClick={() => setIsOpen(false)} ariaLabel='Back'>
                <ArrowLeft className='h-5 w-5' />
              </IconButton>
              <form onSubmit={handleSearch} className='relative w-full'>
                <input
                  ref={inputRef}
                  className='h-9 w-full rounded-lg border border-zinc-950/10 bg-transparent p-2 text-zinc-900 placeholder-zinc-500 focus:outline-hidden'
                  placeholder='Search games...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 right-0 top-full mt-1 max-h-96 overflow-y-auto rounded-lg border border-zinc-950/10 bg-background shadow-lg"
                    >
                      {suggestions.map((game) => (
                        <CommandItem
                          key={game.id}
                          value={game.title}
                          onSelect={() => {
                            setIsOpen(false);
                            navigate(`/games/${game.id}`);
                          }}
                        >
                          <img
                            src={game.coverImage}
                            alt={game.title}
                            className="h-12 w-8 rounded object-cover"
                          />
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-medium">{game.title}</span>
                            <span className="text-xs text-zinc-500">{game.price}€</span>
                          </div>
                        </CommandItem>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </ToolbarDynamic>
    </div>
  );
} 