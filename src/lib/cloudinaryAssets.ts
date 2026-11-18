/**
 * Centralized Cloudinary Asset Directory
 * Synchronized with Cloudinary cloud: soakj9w7
 * Zero host-storage consumption; all assets served via Cloudinary CDN.
 */

export interface CloudinaryAsset {
  src: string;
  width?: number;
  height?: number;
  toString(): string;
}

export function cldAsset(url: string, width = 1200, height = 800): CloudinaryAsset {
  return {
    src: url,
    width,
    height,
    toString: () => url,
  };
}

// Hero & Promotional Banners
export const heroSpring = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760834/glorious_japan_skin_care/hero/Glorious_Japan_Skincare_Spring_Glow.png", 1920, 1080);
export const heroWhip = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760842/glorious_japan_skin_care/hero/Perfect_Whip_Fresh_Beauty_Ritual.png", 1920, 1080);
export const heroSakura = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760848/glorious_japan_skin_care/hero/hero-sakura.png", 1920, 1080);
export const heroSpa = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760843/glorious_japan_skin_care/hero/bright-spa-skincare-commercial-scene.png", 1920, 1080);
export const heroCulture = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760845/glorious_japan_skin_care/hero/hero-japanses-culture-bg.png", 1920, 1080);
export const heroSakuraPink = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760847/glorious_japan_skin_care/hero/hero-sakura-pink.png", 1920, 1080);
export const heroWithJapaneseGirl = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760850/glorious_japan_skin_care/hero/hero-with-japanese-girl.png", 1920, 1080);
export const pujaSale = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760853/glorious_japan_skin_care/hero/puja-sale.png", 1920, 1080);
export const sakuraSpa = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760854/glorious_japan_skin_care/hero/sakura-spa-skincare-trio.png", 1920, 1080);
export const foamingRitual = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760851/glorious_japan_skin_care/hero/japanese-inspired-foaming-skincare-ritual.png", 1920, 1080);
export const cozyRoutine = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760831/glorious_japan_skin_care/hero/Cozy_Japanese_Skincare_Routine.png", 1920, 1080);
export const serenityTrio = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760839/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio.png", 1920, 1080);
export const serenityTrio1 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760837/glorious_japan_skin_care/hero/Japanese_Skincare_Serenity_Trio_1.png", 1920, 1080);

// Brand Logos & Thumbnails
export const bGlorious = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760855/glorious_japan_skin_care/brands/glorious-japan.jpg", 600, 600);
export const bHada = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760856/glorious_japan_skin_care/brands/hada-labo.jpg", 600, 600);
export const bHikari = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760857/glorious_japan_skin_care/brands/hikari-beauty.jpg", 600, 600);
export const bKyoto = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760857/glorious_japan_skin_care/brands/kyoto-botanicals.jpg", 600, 600);
export const bSakura = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760858/glorious_japan_skin_care/brands/sakura-lab.jpg", 600, 600);
export const bShiseido = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760860/glorious_japan_skin_care/brands/shiseido.jpg", 600, 600);
export const bSkii = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760860/glorious_japan_skin_care/brands/sk-ii.jpg", 600, 600);
export const bYuzu = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760861/glorious_japan_skin_care/brands/yuzu-no-mori.jpg", 600, 600);

// Skin Concern / Type Thumbnails
export const acneImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760862/glorious_japan_skin_care/skin/acne.jpg", 800, 800);
export const agingImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760863/glorious_japan_skin_care/skin/anti-aging.jpg", 800, 800);
export const combImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760864/glorious_japan_skin_care/skin/combination.jpg", 800, 800);
export const spotsImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760865/glorious_japan_skin_care/skin/dark-spots.jpg", 800, 800);
export const dryImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760866/glorious_japan_skin_care/skin/dry.jpg", 800, 800);
export const hydrImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760867/glorious_japan_skin_care/skin/hydration.jpg", 800, 800);
export const normImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760867/glorious_japan_skin_care/skin/normal.jpg", 800, 800);
export const oilyImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760868/glorious_japan_skin_care/skin/oily.jpg", 800, 800);
export const pigmImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760869/glorious_japan_skin_care/skin/pigmentation.jpg", 800, 800);
export const sensImg = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760871/glorious_japan_skin_care/skin/sensitive.jpg", 800, 800);

// Catalog Product Imagery
export const i1 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760872/glorious_japan_skin_care/new_products_images/i1.jpg", 800, 800);
export const i2 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760878/glorious_japan_skin_care/new_products_images/i2.jpg", 800, 800);
export const i3 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760879/glorious_japan_skin_care/new_products_images/i3.jpg", 800, 800);
export const i4 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760880/glorious_japan_skin_care/new_products_images/i4.jpg", 800, 800);
export const i5 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760881/glorious_japan_skin_care/new_products_images/i5.jpg", 800, 800);
export const i6 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760881/glorious_japan_skin_care/new_products_images/i6.jpg", 800, 800);
export const i7 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760883/glorious_japan_skin_care/new_products_images/i7.jpg", 800, 800);
export const i8 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760884/glorious_japan_skin_care/new_products_images/i8.jpg", 800, 800);
export const i9 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760884/glorious_japan_skin_care/new_products_images/i9.jpg", 800, 800);
export const i10 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760873/glorious_japan_skin_care/new_products_images/i10.jpg", 800, 800);
export const i11 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760874/glorious_japan_skin_care/new_products_images/i11.jpg", 800, 800);
export const i12 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760874/glorious_japan_skin_care/new_products_images/i12.jpg", 800, 800);
export const i13 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760875/glorious_japan_skin_care/new_products_images/i13.jpg", 800, 800);
export const i14 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760876/glorious_japan_skin_care/new_products_images/i14.jpg", 800, 800);
export const i15 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760877/glorious_japan_skin_care/new_products_images/i15.jpg", 800, 800);
export const i16 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760877/glorious_japan_skin_care/new_products_images/i16.jpg", 800, 800);

// Editorial & Story Assets
export const story = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760891/glorious_japan_skin_care/root/story.jpg", 1200, 1408);
export const heroRoot = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760885/glorious_japan_skin_care/root/hero.jpg", 1920, 1080);
export const p1 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760886/glorious_japan_skin_care/root/p1.jpg", 800, 800);
export const p2 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760887/glorious_japan_skin_care/root/p2.jpg", 800, 800);
export const p3 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760888/glorious_japan_skin_care/root/p3.jpg", 800, 800);
export const p4 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760888/glorious_japan_skin_care/root/p4.jpg", 800, 800);
export const p5 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760889/glorious_japan_skin_care/root/p5.jpg", 800, 800);
export const p6 = cldAsset("https://res.cloudinary.com/soakj9w7/image/upload/v1794760890/glorious_japan_skin_care/root/p6.jpg", 800, 800);

export const PRODUCT_IMAGE_URLS: string[] = [
  i1.src, i2.src, i3.src, i4.src, i5.src, i6.src, i7.src, i8.src,
  i9.src, i10.src, i11.src, i12.src, i13.src, i14.src, i15.src, i16.src
];

/**
 * Universal lookup mapping for all previously local relative paths to Cloudinary CDN URLs.
 */
export const LOCAL_TO_CLOUDINARY_MAP: Record<string, string> = {
  // Hero Banners
  "/hero/Cozy Japanese Skincare Routine.png": cozyRoutine.src,
  "hero/Cozy Japanese Skincare Routine.png": cozyRoutine.src,
  "Cozy Japanese Skincare Routine.png": cozyRoutine.src,

  "/hero/Glorious Japan Skincare Spring Glow.png": heroSpring.src,
  "hero/Glorious Japan Skincare Spring Glow.png": heroSpring.src,
  "Glorious Japan Skincare Spring Glow.png": heroSpring.src,

  "/hero/Japanese Skincare Serenity Trio (1).png": serenityTrio1.src,
  "hero/Japanese Skincare Serenity Trio (1).png": serenityTrio1.src,
  "Japanese Skincare Serenity Trio (1).png": serenityTrio1.src,

  "/hero/Japanese Skincare Serenity Trio.png": serenityTrio.src,
  "hero/Japanese Skincare Serenity Trio.png": serenityTrio.src,
  "Japanese Skincare Serenity Trio.png": serenityTrio.src,

  "/hero/Perfect Whip Fresh Beauty Ritual.png": heroWhip.src,
  "hero/Perfect Whip Fresh Beauty Ritual.png": heroWhip.src,
  "Perfect Whip Fresh Beauty Ritual.png": heroWhip.src,

  "/hero/bright-spa-skincare-commercial-scene.png": heroSpa.src,
  "hero/bright-spa-skincare-commercial-scene.png": heroSpa.src,
  "bright-spa-skincare-commercial-scene.png": heroSpa.src,

  "/hero/hero-japanses-culture-bg.png": heroCulture.src,
  "hero/hero-japanses-culture-bg.png": heroCulture.src,
  "hero-japanses-culture-bg.png": heroCulture.src,

  "/hero/hero-sakura-pink.png": heroSakuraPink.src,
  "hero/hero-sakura-pink.png": heroSakuraPink.src,
  "hero-sakura-pink.png": heroSakuraPink.src,

  "/hero/hero-sakura.png": heroSakura.src,
  "hero/hero-sakura.png": heroSakura.src,
  "hero-sakura.png": heroSakura.src,

  "/hero/hero-with-japanese-girl.png": heroWithJapaneseGirl.src,
  "hero/hero-with-japanese-girl.png": heroWithJapaneseGirl.src,
  "hero-with-japanese-girl.png": heroWithJapaneseGirl.src,

  "/hero/japanese-inspired-foaming-skincare-ritual.png": foamingRitual.src,
  "hero/japanese-inspired-foaming-skincare-ritual.png": foamingRitual.src,
  "japanese-inspired-foaming-skincare-ritual.png": foamingRitual.src,

  "/hero/puja-sale.png": pujaSale.src,
  "hero/puja-sale.png": pujaSale.src,
  "puja-sale.png": pujaSale.src,

  "/hero/sakura-spa-skincare-trio.png": sakuraSpa.src,
  "hero/sakura-spa-skincare-trio.png": sakuraSpa.src,
  "sakura-spa-skincare-trio.png": sakuraSpa.src,

  // Brands
  "assets/brands/glorious-japan.jpg": bGlorious.src,
  "assets/brands/hada-labo.jpg": bHada.src,
  "assets/brands/hikari-beauty.jpg": bHikari.src,
  "assets/brands/kyoto-botanicals.jpg": bKyoto.src,
  "assets/brands/sakura-lab.jpg": bSakura.src,
  "assets/brands/shiseido.jpg": bShiseido.src,
  "assets/brands/sk-ii.jpg": bSkii.src,
  "assets/brands/yuzu-no-mori.jpg": bYuzu.src,

  // Skin
  "assets/skin/acne.jpg": acneImg.src,
  "assets/skin/anti-aging.jpg": agingImg.src,
  "assets/skin/combination.jpg": combImg.src,
  "assets/skin/dark-spots.jpg": spotsImg.src,
  "assets/skin/dry.jpg": dryImg.src,
  "assets/skin/hydration.jpg": hydrImg.src,
  "assets/skin/normal.jpg": normImg.src,
  "assets/skin/oily.jpg": oilyImg.src,
  "assets/skin/pigmentation.jpg": pigmImg.src,
  "assets/skin/sensitive.jpg": sensImg.src,

  // Root Story
  "assets/story.jpg": story.src,
  "story.jpg": story.src,
};

