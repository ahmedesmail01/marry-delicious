'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);
const meals = [
  { image: '/images/grape-leaves.jpg', ar: 'لَفّة بحب، وطعم من القلب', en: 'Little rolls. A whole lot of love.', category: 1, titleAr: 'محاشي على أصولها', titleEn: 'Comfort, carefully rolled', labelAr: 'محاشي مشكلة', labelEn: 'Stuffed vegetables' },
  { image: '/images/kebab.jpg', ar: 'لَمّة حلوة تستاهل أكلة حلوة', en: 'Made for the whole table.', category: 2, titleAr: 'لحوم ونَفَس بيتي', titleEn: 'Rich flavors, warm gatherings', labelAr: 'لحوم', labelEn: 'Meats' },
  { image: '/images/chicken-pasta.jpg', ar: 'كل يوم ليه أكلة بتحبها', en: 'Your next delicious moment.', category: 3, titleAr: 'اختيارات لكل لَمّة', titleEn: 'A little something for everyone', labelAr: 'دواجن', labelEn: 'Poultry' },
  { image: '/images/baked-pasta.jpg', ar: 'من الفرن… على سفرتك', en: 'Golden moments, fresh from the oven.', category: 4, titleAr: 'طواجن تفتح النفس', titleEn: 'Oven-baked happiness', labelAr: 'مكرونات وطواجن', labelEn: 'Pasta & trays' },
];
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function HeroSlider({ en }: { en: boolean }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-slide.is-active img', { scale: 1.12 }, { scale: 1, duration: 1.2, ease: 'power2.out' });
      gsap.fromTo('.hero-slide.is-active', { opacity: 0 }, { opacity: 1, duration: .55 });
      gsap.fromTo('.slide-caption', { y: 18, opacity: 0 }, { y: 0, opacity: 1, delay: .15, duration: .6 });
    }, root);
    return () => ctx.revert();
  }, [active]);
  const next = (delta: number) => setActive(value => (value + delta + meals.length) % meals.length);
  return <div ref={root} className="hero-gallery" role="region" aria-roledescription="carousel" aria-label={en ? 'From our kitchen: meal inspiration' : 'من مطبخنا: صور للإلهام'} onTouchStart={e => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={e => { if (touchStart.current === null) return; const distance = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) next(distance < 0 ? 1 : -1); touchStart.current = null; }}>
    <div className="gallery-outline" />
    <div className="hero-slides">{meals.map((meal, i) => <div key={meal.image} className={`hero-slide ${active === i ? 'is-active' : ''}`} aria-hidden={active !== i}><img src={meal.image} alt={en ? meal.labelEn + ' — inspiration photo' : meal.labelAr + ' — صورة للإلهام'} loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} width={1200} height={900} /></div>)}<div className="gallery-shade" /><div className="gallery-topline"><span>THE GOODNESS OF HOME</span><span>✦</span></div><div className="slide-caption" aria-live="polite"><span>{en ? meals[active].labelEn : meals[active].labelAr}</span><h2>{en ? meals[active].en : meals[active].ar}</h2></div></div>
    <div className="gallery-controls" dir="ltr"><div className="slider-arrows"><button onClick={() => next(-1)} aria-label={en ? 'Previous photo' : 'الصورة السابقة'}><ArrowLeft size={20} /></button><button onClick={() => next(1)} aria-label={en ? 'Next photo' : 'الصورة التالية'}><ArrowRight size={20} /></button></div><div className="slider-dots">{meals.map((meal, i) => <button key={meal.image} onClick={() => setActive(i)} aria-label={`${en ? 'Show photo' : 'عرض الصورة'} ${i + 1}`} aria-current={active === i ? 'true' : undefined}><span /></button>)}</div><span className="slide-count">0{active + 1}<small> / 04</small></span></div>
    <span className="photo-disclaimer">{en ? 'A little inspiration for your table · Stock photography' : 'إلهام لسفرتك · صور توضيحية'}</span>
  </div>;
}

export function MealCarousel({ en, onCategory }: { en: boolean; onCategory: (category: number) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const move = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.visual-meal');
    gsap.to(el, { scrollTo: { x: Math.max(0, Math.min(el.scrollLeft + direction * ((card?.offsetWidth || 320) + 24), el.scrollWidth - el.clientWidth)), autoKill: true }, duration: reducedMotion() ? 0 : .7, ease: 'power3.inOut', overwrite: true });
  };
  return <section className="visual-section container scroll-reveal" aria-label={en ? 'Explore the kitchen' : 'اكتشف مطبخنا'}><div className="section-top"><div><div className="eyebrow">{en ? 'A FEAST FOR THE EYES' : 'العين بتاكل قبل أي حاجة'}</div><h2>{en ? 'Find your next favorite.' : 'أكلة حلوة لكل مزاج.'}<span className="gold-spark"> ✦</span></h2></div><div className="slider-arrows carousel-arrows" dir="ltr"><button disabled={position <= 2} onClick={() => move(-1)} aria-label={en ? 'Previous meals' : 'الأطباق السابقة'}><ArrowLeft size={21} /></button><button disabled={position >= 99} onClick={() => move(1)} aria-label={en ? 'Next meals' : 'الأطباق التالية'}><ArrowRight size={21} /></button></div></div><div ref={track} className="meal-track" dir="ltr" tabIndex={0} aria-label={en ? 'Swipe or use arrow buttons to explore food categories' : 'اسحب أو استخدم الأسهم لتصفح أقسام الأكل'} onScroll={e => { const el = e.currentTarget; const max = el.scrollWidth - el.clientWidth; setPosition(max > 0 ? el.scrollLeft / max * 100 : 100); }}>
    {meals.map((meal, i) => <button className="visual-meal" dir={en ? 'ltr' : 'rtl'} key={meal.category} onClick={() => onCategory(meal.category)}><div className="visual-meal-image"><img src={meal.image} alt={en ? meal.labelEn + ' inspiration' : meal.labelAr + ' — صورة توضيحية'} width={800} height={1000} loading="lazy" /><span className="meal-chip">0{i + 1} / {en ? meal.labelEn : meal.labelAr}</span><span className="meal-link-icon">{en ? <ArrowUpRight /> : <ArrowUpLeft />}</span></div><h3>{en ? meal.titleEn : meal.titleAr}</h3><span className="visual-meal-cta">{en ? 'Explore the menu' : 'شوف المنيو'} <span>↗</span></span></button>)}
  </div><div className="carousel-bottom"><span>{en ? 'Swipe to find your craving · Inspiration photos' : 'اسحب واختار اللي نفسك فيه · صور للإلهام'}</span><div className="carousel-progress"><span style={{ transform: `translateX(${position * .66}%)` }} /></div></div></section>;
}
