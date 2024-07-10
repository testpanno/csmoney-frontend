import { motion } from 'framer-motion';

// Define a type for the sizes object
type LoaderSizes = {
  [key: string]: number;
};

export function Loader({ size = 'md' }: { size?: string }) {
  // Define size mappings
  const sizes: LoaderSizes = {
    sm: 32,
    md: 64,
    lg: 128,
  };

  // Set the size based on the prop, defaulting to 'md' if not provided
  const loaderSize = sizes[size] || sizes['md'];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={loaderSize}
      height={loaderSize}
      viewBox="0 0 64 64"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
    >
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        stroke="#FEFEFE"
        strokeWidth="8"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
      />
      <motion.circle
        cx="32"
        cy="32"
        r="14"
        stroke="#FFAD51"
        strokeWidth="8"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
