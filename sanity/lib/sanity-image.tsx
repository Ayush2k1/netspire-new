import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { getImageDimensions } from "@sanity/asset-utils";
import imageUrlBuilder from "@sanity/image-url";
import config from "./config";
import Image from "next/image";

const isDev = process.env.NODE_ENV === "development";

const imageConfig = {
  dataset: config.sanity.dataset,
  projectId: config.sanity.projectId,
};

export type SanityImageProps = {
  data?: SanityImageSource & {
    asset?: {
      _ref?: string;
    };
    crop?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    hotspot?: {
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    };
    alt?: string;
  };
  alt?: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
};

export function SanityImage({
  data,
  aspectRatio,
  className,
  priority = false,
  sizes,
  quality = 75,
  fill = false,
}: SanityImageProps) {
  const imageData = resolveImageData({ aspectRatio, data });

  if (!imageData || !data) {
    return null;
  }

  const alt = data.alt || "";

  if (fill) {
    return (
      <Image
        src={imageData.src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        quality={quality}
      />
    );
  }

  return (
    <Image
      src={imageData.src}
      alt={alt}
      width={imageData.width}
      height={imageData.height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
    />
  );
}

export function resolveImageData({ aspectRatio, data }: SanityImageProps) {
  if (!data || !data.asset) {
    return null;
  }

  const _ref = data.asset._ref;
  if (!_ref) {
    return null;
  }

  const { height, width } = getImageDimensions(_ref);
  const aspectRatioValues = aspectRatio?.split("/");

  if (aspectRatio && aspectRatioValues?.length !== 2 && isDev) {
    console.warn(
      `Invalid aspect ratio: ${aspectRatio}. Using the original aspect ratio. The aspect ratio should be in the format "width/height".`,
    );
  }

  const aspectRatioWidth = aspectRatioValues
    ? parseFloat(aspectRatioValues[0])
    : undefined;
  const aspectRatioHeight = aspectRatioValues
    ? parseFloat(aspectRatioValues[1])
    : undefined;

  const urlBuilder = imageUrlBuilder(imageConfig)
    .image({
      _ref,
      crop: data.crop,
      hotspot: data.hotspot,
    })
    .auto("format");

  // Values used for srcset attribute of image tag (in pixels)
  const srcSetValues = [
    50, 100, 200, 450, 600, 750, 900, 1000, 1250, 1500, 1750, 2000, 2500, 3000,
    3500, 4000, 5000,
  ];

  const src = generateImageUrl({
    aspectRatioHeight,
    aspectRatioWidth,
    urlBuilder,
    width,
  });

  // Create srcset attribute
  const srcSet = srcSetValues
    .filter((value) => value < width)
    .map((value) => {
      const imageUrl = generateImageUrl({
        aspectRatioHeight,
        aspectRatioWidth,
        urlBuilder,
        width: value,
      });
      if (width >= value) {
        return `${imageUrl} ${value}w`;
      }
      return "";
    })
    .join(", ")
    .concat(`, ${src} ${width}w`);

  return {
    height,
    src,
    srcSet,
    width,
  };
}

function generateImageUrl(args: {
  aspectRatioHeight?: number;
  aspectRatioWidth?: number;
  blur?: number;
  urlBuilder: ImageUrlBuilder;
  width: number;
}) {
  const {
    aspectRatioHeight,
    aspectRatioWidth,
    blur = 0,
    urlBuilder,
    width,
  } = args;
  let imageUrl = urlBuilder.width(width);
  const imageHeight =
    aspectRatioHeight && aspectRatioWidth
      ? Math.round((width / aspectRatioWidth) * aspectRatioHeight)
      : undefined;

  if (imageHeight) {
    imageUrl = imageUrl.height(imageHeight);
  }

  if (blur && blur > 0) {
    imageUrl = imageUrl.blur(blur);
  }

  return imageUrl.url();
}
