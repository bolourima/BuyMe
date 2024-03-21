import { CheckSvg } from '@/icon/CheckSvg';
import React from 'react'

export const PDDescription = () => {
  return (
    <div className='p-7'>
      <p className="mb-5">
        Discover our diverse range of stylish t-shirts, meticulously designed
        for comfort and versatility. Made from premium cotton blends, these
        shirts offer a luxurious feel and long-lasting quality. Whether you
        prefer classic solids or trendy prints, we have the perfect tee to
        elevate your wardrobe. Shop now for unbeatable style and comfort.
      </p>
      <div className="grid grid-cols-2 w-[400px] bg-[#EFF2F4] gap-3">
        <div>Model</div>
        <div>#8786867</div>
        <div>Style</div>
        <div>Classic style</div>
        <div>Certificate</div>
        <div>ISO-898921212</div>
        <div>Size</div>
        <div>34mm x 450mm x 19mm</div>
        <div>Memory</div>
        <div>36GB RAM</div>
      </div>
      <div className="my-5">
        <p>Feature</p>
        <div>
          <div className="flex items-center gap-3">
            <CheckSvg/>
            <p>Premium Cotton Blend Fabric: Luxurious feel, lasting comfort.</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckSvg />
            <p>
              Versatile Styling Options: Classic solids, trendy prints
              available.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CheckSvg />
            <p>
              Durable Construction for Longevity: Withstand daily wear and tear.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CheckSvg />
            <p>
              Timeless Designs for Every Occasion: Elevate any outfit
              effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
