import { motion } from 'framer-motion';



export function HeroBanner() {
  // Use the imported movie posters
const heroPosterImages = ['/bugonia.jpg', '/sinners.jpg', '/dune.jpg'];

return (
  <div className="relative mb-7 flex justify-center items-center h-64">
    <div className="relative flex items-center justify-center gap-0 h-full">
      {heroPosterImages.slice(0, 3).map((poster, index) => (
        <motion.div
          key={index}
          className="relative"
          initial={{ opacity: 0, y: 50, rotate: 0 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotate: index === 0 ? -15 : index === 1 ? 0 : 15
          }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.15,
            ease: 'easeOut' 
          }}
          style={{
            zIndex: index === 1 ? 3 : index,
            marginLeft: index === 0 ? 0 : '-60px',
          }}
        >
          <img
            src={poster}
            alt={`Hero poster ${index + 1}`}
            className="w-44 h-64 object-cover rounded-xl shadow-2xl border border-slate-700/50"
          />
        </motion.div>
      ))}
    </div>
  </div>
);
}