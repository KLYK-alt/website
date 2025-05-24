import dynamic from 'next/dynamic';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

export const dynamicImport = (importFn, options = {}) => {
  return dynamic(importFn, {
    loading: () => <LoadingPlaceholder height={options.height} />,
    ssr: options.ssr ?? false,
    ...options
  });
};

// Common loading component
export const LoadingPlaceholder = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-full w-full" />
); 