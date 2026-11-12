// Fotos de cada producto para la vista rápida. Copiado de ketea-tienda/src/data/productImages.js.
// Son fotos oficiales de los fabricantes, enlazadas desde sus sitios (provisorias): sin conexión no cargan.
// Clave: id del producto.
const OFFICIAL_PHOTOS: Record<string, string[]> = {
  1: [
    "https://brand.maytronics.com/m/27c3e8f6cdb52ce/EP_Large-Dolphin-LIBERTY-400.jpg",
    "https://brand.maytronics.com/m/2e030de9c2ad599a/EP_Large-Dolphin-LIBERTY-400.jpg",
    "https://brand.maytronics.com/m/2e9ed1609e3e8b71/EP_Large-Dolphin-LIBERTY-400.jpg",
    "https://brand.maytronics.com/m/363ad84527925de8/EP_Large-Dolphin-LIBERTY-400.webp",
    "https://brand.maytronics.com/m/4f728484dff3d057/EP_Large-Dolphin-LIBERTY-400.jpg"
  ],
  2: [
    "https://brand.maytronics.com/m/26246acf48e89306/EP_Large-Dolphin-Pool-up.jpg",
    "https://brand.maytronics.com/m/348c73f9334dbb14/EP_Large-Dolphin-Pool-up.jpg",
    "https://brand.maytronics.com/m/54aa54484f717a7d/EP_Large-EN-POOL-up.webp"
  ],
  3: [
    "https://brand.maytronics.com/asset/63a9e418-61ff-41e3-b8ad-11a525e1b772/EP-Large/Dolphin-LIBERTY-600.webp"
  ],
  4: [
    "https://brand.maytronics.com/m/1582be3c09163578/EP_Large-Dolphin-Wave-90i.jpg",
    "https://brand.maytronics.com/m/46c1deb8386074ee/EP_Large-Dolphin-Wave-90i.jpg",
    "https://brand.maytronics.com/m/552d30b2563d6a12/EP_Large-Dolphin-Wave-90i.jpg",
    "https://brand.maytronics.com/m/61f8190709260f2e/EP_Large-Dolphin-Wave-90i.jpg",
    "https://brand.maytronics.com/m/76490910d6a1df2b/EP_Large-Dolphin-Wave-90i.jpg"
  ],
  6: [
    "https://brand.maytronics.com/m/17e0502b8506b4d7/EP_Large-Dolphin-LIBERTY-200.jpg",
    "https://brand.maytronics.com/m/1a7d1b1fac4edd06/EP_Large-Dolphin-LIBERTY-200.jpg",
    "https://brand.maytronics.com/m/1ae7c2014a6ed183/EP_Large-Dolphin-LIBERTY-200.jpg",
    "https://brand.maytronics.com/m/1f3a165e00510429/EP_Large-Dolphin-LIBERTY-200.webp",
    "https://brand.maytronics.com/m/7fb533bbe51f4ec2/EP_Large-Dolphin-LIBERTY-200.jpg"
  ],
  7: [
    "https://brand.maytronics.com/m/482e59aa718f0d28/EP_Large-DOLPHIN-M700-EU.jpg"
  ],
  8: [
    "https://brand.maytronics.com/m/2802a1dcc26e9f09/EP_Large-DOLPHIN-S400-EU.jpg",
    "https://brand.maytronics.com/m/3663160aa33c9fb2/EP_Large-DOLPHIN-S400-EU.jpg",
    "https://brand.maytronics.com/m/3c45d667b77baf5b/EP_Large-DOLPHIN-S400-EU.jpg",
    "https://brand.maytronics.com/m/3fc94c2f935a2e94/EP_Large-DOLPHIN-S400-EU.jpg",
    "https://brand.maytronics.com/m/482eabcfd59a3e47/EP_Large-DOLPHIN-S400-EU.jpg"
  ],
  9: [
    "https://brand.maytronics.com/m/11f9581e772fa16a/EP_Large-Dolphin-M600.jpg",
    "https://brand.maytronics.com/m/1919396a33bf0569/EP_Large-Dolphin-M600.jpg",
    "https://brand.maytronics.com/m/3b396a8416e5688/EP_Large-Dolphin-M600.jpg",
    "https://brand.maytronics.com/m/3bf64d96f3ac0897/EP_Large-Dolphin-M600.jpg",
    "https://brand.maytronics.com/m/47b538a10f10e551/EP_Large-Dolphin-M600.jpg"
  ],
  10: [
    "https://brand.maytronics.com/m/1c326c98eef4a131/EP_Large-DOLPHIN-S200.jpg"
  ],
  11: [
    "https://brand.maytronics.com/m/13830c706a7088a1/EP_Large-DOLPHIN-S100.jpg",
    "https://brand.maytronics.com/m/167f9c7b3309ea55/EP_Large-DOLPHIN-S100.jpg",
    "https://brand.maytronics.com/m/20690faf32f48eef/EP_Large-DOLPHIN-S100.jpg",
    "https://brand.maytronics.com/m/24db4ad2fca8db7/EP_Large-DOLPHIN-S100.jpg",
    "https://brand.maytronics.com/m/5e3fe1af1b7e59da/EP_Large-DOLPHIN-S100.jpg"
  ],
  12: [
    "https://brand.maytronics.com/m/1cacede6c00a919f/EP_Large-DOLPHIN-2X2-CB.jpg",
    "https://brand.maytronics.com/m/1dd5dc2194c44f9b/EP_Large-DOLPHIN-2X2-CB.jpg",
    "https://brand.maytronics.com/m/26c953b77022866f/EP_Large-DOLPHIN-2X2-CB.jpg",
    "https://brand.maytronics.com/m/4803e95a6accf164/EP_Large-DOLPHIN-2X2-CB.jpg",
    "https://brand.maytronics.com/m/56d5b92225b3333a/EP_Large-DOLPHIN-2X2-CB.jpg"
  ],
  14: [
    "https://brand.maytronics.com/m/11809d5362e23cd9/EP_Large-Dolphin-LIBERTY-300.jpg",
    "https://brand.maytronics.com/m/1efe72ae49912182/EP_Large-Dolphin-LIBERTY-300.jpg",
    "https://brand.maytronics.com/m/6febb5d2f81db4ca/EP_Large-Dolphin-LIBERTY-300.jpg",
    "https://brand.maytronics.com/m/7adafc25ad11a55d/EP_Large-Dolphin-LIBERTY-300.jpg"
  ],
  16: [
    "https://brand.maytronics.com/m/133451d1e0d4f045/EP_Large-Dolphin-Nautilus-CC-Plus.jpg",
    "https://brand.maytronics.com/m/1a1d389641f347b4/EP_Large-Dolphin-Nautilus-CC-Plus.jpg",
    "https://brand.maytronics.com/m/1e343e6c70047964/EP_Large-Dolphin-Nautilus-CC-Plus.jpg",
    "https://brand.maytronics.com/m/2e3cd6856fa6d384/EP_Large-Dolphin-Nautilus-CC-Plus.jpg",
    "https://brand.maytronics.com/m/2fcd383c53ad018a/EP_Large-Dolphin-Nautilus-CC-Plus.jpg"
  ],
  17: [
    "https://cdn.shopify.com/s/files/1/0586/2578/6021/files/300P_white.png",
    "https://cdn.shopify.com/s/files/1/0586/2578/6021/files/300P_suction.png",
    "https://cdn.shopify.com/s/files/1/0586/2578/6021/files/300P_corner_boost.png",
    "https://cdn.shopify.com/s/files/1/0586/2578/6021/files/300P_self-parking.png",
    "https://cdn.shopify.com/s/files/1/0586/2578/6021/files/300P_charging.png"
  ],
  18: [
    "https://cdn.shopify.com/s/files/1/0114/1935/3184/files/product1_1.png",
    "https://cdn.shopify.com/s/files/1/0114/1935/3184/files/back_1_98dca6f2-5b6e-4698-8c1c-a42938ef2d04.png",
    "https://cdn.shopify.com/s/files/1/0114/1935/3184/files/SE_with_Noodle_and_Bag_white_2.png",
    "https://cdn.shopify.com/s/files/1/0114/1935/3184/files/product2.jpg",
    "https://cdn.shopify.com/s/files/1/0114/1935/3184/products/product9.png"
  ],
  19: [
    "https://cdn.shopify.com/s/files/1/0812/9049/4250/files/E1ECN_New.webp",
    "https://cdn.shopify.com/s/files/1/0812/9049/4250/files/00010220_1.webp",
    "https://cdn.shopify.com/s/files/1/0812/9049/4250/files/20250209123515_1.webp",
    "https://cdn.shopify.com/s/files/1/0812/9049/4250/files/00010086_1.webp",
    "https://cdn.shopify.com/s/files/1/0812/9049/4250/files/00013558-1_1.webp"
  ],
  21: [
    "https://cdn.shopify.com/s/files/1/0714/0750/1589/files/1_4bc42e5b-8019-4e18-bb2d-52b1ee98a796.webp",
    "https://cdn.shopify.com/s/files/1/0714/0750/1589/files/1-1_48fadfea-6a42-4bc4-98e4-ae74dbda6447.webp",
    "https://cdn.shopify.com/s/files/1/0714/0750/1589/files/5_4007a006-3374-4fcd-a569-eefeeae20b26.webp",
    "https://cdn.shopify.com/s/files/1/0714/0750/1589/files/2_fdf4fd7c-6dad-4e9b-8283-fb1771e7c303.webp"
  ]
};


/** Foto principal (la de la card) + fotos oficiales, sin repetidos. */
export function getProductImages(id: string, main: string): string[] {
  return Array.from(new Set([main, ...(OFFICIAL_PHOTOS[id] ?? [])].filter(Boolean)))
}
