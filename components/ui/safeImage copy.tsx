import {
  forwardRef,
  useCallback,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from "react";

export const SAFE_IMAGE_FALLBACK_SRC = "/assets/logo/logo_flower.png";

export type SafeImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | null | undefined;
  /** Override default fallback (e.g. another asset in `public/`). */
  fallbackSrc?: string;
  /** Custom fallback element to render if image fails to load. */
  fallback?: React.ReactNode;
};

/**
 * Image that swaps to a local logo when `src` is missing or fails to load.
 */
export const SafeImage = forwardRef<HTMLImageElement, SafeImageProps>(
    ({
      src,
      fallbackSrc = SAFE_IMAGE_FALLBACK_SRC,
      fallback,
      alt = "",
      className,
      onError,
      ...rest
    }, ref) => {
      const [loadFailed, setLoadFailed] = useState(false);

      const trimmed = typeof src === "string" ? src.trim() : "";
      const useFallback = !trimmed || loadFailed;

      const handleError = useCallback(
        (e: SyntheticEvent<HTMLImageElement>) => {
          if (!loadFailed) setLoadFailed(true);
          onError?.(e);
        },
        [loadFailed, onError]
      );

      if (useFallback && fallback) {
        return <>{fallback}</>;
      }

      const effectiveSrc = useFallback ? fallbackSrc : trimmed;

      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={effectiveSrc}
          alt={alt}
          className={className}
          onError={handleError}
          {...rest}
        />
      );
    }
);

SafeImage.displayName = "SafeImage";
