import React from 'react';

export const GALLERY_IMAGES = [
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104530_521b2f85-c0f3-4d0e-9704-b578315b4cb9.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5.png&w=1920&q=85',
];

export function buildGridRows(count: number, cols: number) {
  const rows: number[][] = [];
  let imgIndex = 0;
  let r = 0;

  while (imgIndex < count) {
    const row = new Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = imgIndex++;

    if (r % 3 === 0 && imgIndex < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = imgIndex++;
    }
    rows.push(row);
    r++;
  }
  return rows;
}

interface GalleryGridProps {
  cols: number;
  innerRef: React.RefObject<HTMLDivElement | null>;
}

export function GalleryGrid({ cols, innerRef }: GalleryGridProps) {
  const rows = buildGridRows(GALLERY_IMAGES.length, cols);

  return (
    <div
      ref={innerRef}
      id="gallery-inner-wrapper"
      className="w-full pt-[min(400px,40vh)] pb-[40vh] px-4 sm:px-8 md:px-12"
      style={{ willChange: 'transform' }}
    >
      <div
        className="grid gap-4 sm:gap-6 md:gap-8 w-full max-w-[1800px] mx-auto"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {rows.map((row, rIdx) =>
          row.map((imgIdx, colIdx) => {
            if (imgIdx === -1) {
              return <div key={`spacer-${rIdx}-${colIdx}`} className="aspect-[2/3]" />;
            }

            const isLeftHalf = colIdx < cols / 2;
            const transformOrigin = isLeftHalf ? 'right bottom' : 'left bottom';

            return (
              <div key={`card-${imgIdx}`} className="aspect-[2/3] relative">
                <div
                  data-card-index={imgIdx}
                  className="bp-card w-full h-full rounded-lg overflow-hidden bg-neutral-900 shadow-2xl"
                  style={{
                    transformOrigin,
                    transform: 'scale(0)',
                  }}
                >
                  <img
                    src={GALLERY_IMAGES[imgIdx]}
                    alt={`Leon Archive Item ${imgIdx + 1}`}
                    className="w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
