import React, { useState } from "react";
import {
  Search, MapPin, ShoppingBag, Star, Clock, Pizza, Soup, Sandwich,
  Coffee, IceCream2, Salad, Fish, Beef, Cookie, Flame, ChevronRight
} from "lucide-react";

const PALETTE = {
  ivory: "#FFF8EE",
  ink: "#241C15",
  chili: "#E8462A",
  chiliDark: "#C23A22",
  turmeric: "#F2B705",
  curry: "#4C7A4A",
  card: "#FFFFFF",
};

const categories = [
  { name: "Pizza", icon: Pizza },
  { name: "Curry", icon: Soup },
  { name: "Rolls", icon: Sandwich },
  { name: "Cafe", icon: Coffee },
  { name: "Desserts", icon: IceCream2 },
  { name: "Salads", icon: Salad },
  { name: "Seafood", icon: Fish },
  { name: "Kebabs", icon: Beef },
  { name: "Bakery", icon: Cookie },
];

// Verified real, directly-linkable food photos — used as an instant fallback
// while the live API call (below) resolves. Works over normal internet access
// (e.g. running `npm run dev` locally); this in-chat preview sandbox blocks
// external network calls, so images won't show up here.
const PHOTOS = {
  pizza: "https://foodish-api.com/images/pizza/pizza77.jpg",
  biryani: "https://foodish-api.com/images/biryani/biryani32.jpg",
  burger: "https://foodish-api.com/images/burger/burger101.jpg",
  pasta: "https://foodish-api.com/images/pasta/pasta28.jpg",
  dosa: "https://foodish-api.com/images/dosa/dosa23.jpg",
  dessert: "https://foodish-api.com/images/dessert/dessert34.jpg",
};

const restaurants = [
  { name: "Spice Junction", cuisine: "North Indian · Mughlai", rating: 4.4, time: "25-30", avg: 300, tag: "TRENDING", accent: PALETTE.chili, icon: Soup, category: "butter-chicken", fallback: PHOTOS.biryani },
  { name: "Wok This Way", cuisine: "Chinese · Thai", rating: 4.2, time: "30-35", avg: 350, tag: "NEW", accent: PALETTE.curry, icon: Soup, category: "pasta", fallback: PHOTOS.pasta },
  { name: "Tandoor Tales", cuisine: "Kebabs · Grills", rating: 4.6, time: "20-25", avg: 400, tag: "BESTSELLER", accent: PALETTE.chiliDark, icon: Beef, category: "biryani", fallback: PHOTOS.biryani },
  { name: "Crust & Co.", cuisine: "Pizza · Italian", rating: 4.3, time: "25-30", avg: 320, tag: "TRENDING", accent: PALETTE.turmeric, icon: Pizza, category: "pizza", fallback: PHOTOS.pizza },
  { name: "Southern Comfort", cuisine: "South Indian · Dosa", rating: 4.5, time: "15-20", avg: 180, tag: "FAST", accent: PALETTE.curry, icon: Soup, category: "dosa", fallback: PHOTOS.dosa },
  { name: "Sundae Best", cuisine: "Desserts · Ice Cream", rating: 4.7, time: "20-25", avg: 150, tag: "SWEET", accent: PALETTE.chili, icon: IceCream2, category: "dessert", fallback: PHOTOS.dessert },
];

const dishes = [
  { name: "Butter Chicken", restaurant: "Spice Junction", price: 280, category: "butter-chicken", fallback: PHOTOS.biryani, icon: Soup, accent: PALETTE.chili },
  { name: "Margherita Pizza", restaurant: "Crust & Co.", price: 260, category: "pizza", fallback: PHOTOS.pizza, icon: Pizza, accent: PALETTE.turmeric },
  { name: "Hakka Noodles", restaurant: "Wok This Way", price: 220, category: "pasta", fallback: PHOTOS.pasta, icon: Soup, accent: PALETTE.curry },
  { name: "Seekh Kebab", restaurant: "Tandoor Tales", price: 240, category: "biryani", fallback: PHOTOS.biryani, icon: Beef, accent: PALETTE.chiliDark },
  { name: "Masala Dosa", restaurant: "Southern Comfort", price: 130, category: "dosa", fallback: PHOTOS.dosa, icon: Soup, accent: PALETTE.curry },
  { name: "Chocolate Sundae", restaurant: "Sundae Best", price: 140, category: "dessert", fallback: PHOTOS.dessert, icon: IceCream2, accent: PALETTE.chili },
];

// Fetches a fresh random photo for a category from the Foodish API at runtime.
// Starts from `fallback` (if given) so something real shows immediately,
// then swaps in a freshly-fetched photo once the request resolves.
function useFoodImage(category, fallback) {
  const [src, setSrc] = React.useState(fallback || null);

  React.useEffect(() => {
    let cancelled = false;
    fetch(`https://foodish-api.com/api/images/${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        let url = null;
        if (Array.isArray(data) && data.length) {
          url = data[Math.floor(Math.random() * data.length)];
        } else if (data && typeof data.image === "string") {
          url = data.image;
        } else if (data && Array.isArray(data.images) && data.images.length) {
          url = data.images[Math.floor(Math.random() * data.images.length)];
        }
        if (url) setSrc(url);
      })
      .catch(() => {
        // Network blocked (e.g. this in-chat preview) — keep the fallback, if any
      });
    return () => {
      cancelled = true;
    };
  }, [category]);

  return src;
}

function FoodPhoto({ category, fallback, alt, accent, Icon, className, style }) {
  const src = useFoodImage(category, fallback);

  if (src) {
    return <img src={src} alt={alt} className={className} style={style} />;
  }

  return (
    <div
      className={className}
      style={{
        ...style,
        background: `${accent}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Icon ? <Icon size={28} color={accent} strokeWidth={1.5} /> : null}
    </div>
  );
}

function TicketCard({ r }) {
  const Icon = r.icon;
  return (
    <div
      className="relative flex flex-col overflow-hidden"
      style={{
        background: PALETTE.card,
        borderRadius: "14px",
        boxShadow: "0 1px 2px rgba(36,28,21,0.08), 0 8px 20px rgba(36,28,21,0.06)",
      }}
    >
      <div className="relative" style={{ height: "140px" }}>
        <FoodPhoto
          category={r.category}
          fallback={r.fallback}
          alt={`${r.name} signature dish`}
          accent={r.accent}
          Icon={Icon}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${r.accent}00 40%, ${r.accent}CC 100%)` }}
        />
        <div className="relative flex items-center justify-between px-4 pt-4">
          <span
            className="px-2 py-1 text-[10px] tracking-widest font-bold"
            style={{ background: "rgba(255,255,255,0.9)", color: r.accent, borderRadius: "4px", letterSpacing: "0.12em" }}
          >
            {r.tag}
          </span>
          <div className="w-8 h-8 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.85)", borderRadius: "999px" }}>
            <Icon size={16} color={r.accent} strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="relative" style={{ height: "14px" }}>
        <div
          className="absolute left-0 right-0"
          style={{
            top: "-7px",
            height: "14px",
            backgroundImage: `radial-gradient(circle 7px, ${PALETTE.ivory} 7px, transparent 7.5px)`,
            backgroundSize: "24px 14px",
            backgroundRepeat: "repeat-x",
          }}
        />
        <div
          className="absolute left-4 right-4"
          style={{ top: "0px", borderTop: `2px dashed ${PALETTE.ink}22` }}
        />
      </div>

      <div className="px-4 pt-2 pb-4 flex-1 flex flex-col">
        <h3
          className="leading-none mb-1"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", letterSpacing: "0.01em", color: PALETTE.ink }}
        >
          {r.name}
        </h3>
        <p className="text-sm mb-3" style={{ color: `${PALETTE.ink}99` }}>{r.cuisine}</p>

        <div className="flex items-center gap-3 text-sm mb-4" style={{ color: PALETTE.ink }}>
          <span className="flex items-center gap-1 px-2 py-0.5" style={{ background: `${PALETTE.turmeric}33`, borderRadius: "999px" }}>
            <Star size={13} fill={PALETTE.turmeric} color={PALETTE.turmeric} />
            <span className="font-medium">{r.rating}</span>
          </span>
          <span className="flex items-center gap-1" style={{ color: `${PALETTE.ink}99` }}>
            <Clock size={13} /> {r.time} min
          </span>
        </div>

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: `1px dashed ${PALETTE.ink}22`, fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-xs" style={{ color: `${PALETTE.ink}80` }}>AVG FOR TWO</span>
          <span className="text-sm font-bold" style={{ color: PALETTE.chiliDark }}>₹{r.avg}</span>
        </div>
      </div>
    </div>
  );
}

export default function HomePreview() {
  const [activeCategory, setActiveCategory] = useState("Curry");

  return (
    <div style={{ background: PALETTE.ivory, minHeight: "100%", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
      `}</style>

      <header className="flex items-center justify-between px-6 md:px-10 py-4" style={{ background: PALETTE.ivory }}>
        <div className="flex items-center gap-1">
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "30px", color: PALETTE.chili, letterSpacing: "0.02em" }}>DABBA</span>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5" style={{ border: `1px solid ${PALETTE.ink}22`, borderRadius: "999px", color: PALETTE.ink }}>
          <MapPin size={15} />
          <span className="text-sm font-medium">Jaipur, Rajasthan</span>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 font-semibold text-sm"
          style={{ background: PALETTE.ink, color: PALETTE.ivory, borderRadius: "999px" }}
        >
          <ShoppingBag size={16} /> Cart
        </button>
      </header>

      <section className="relative mx-4 md:mx-10 overflow-hidden" style={{ background: PALETTE.chili, borderRadius: "20px" }}>
        <div className="relative flex flex-col md:flex-row items-stretch">
          <div className="px-6 md:px-12 pt-10 pb-8 md:pt-14 md:pb-10 md:w-3/5">
            <span
              className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest"
              style={{ background: PALETTE.turmeric, color: PALETTE.ink, borderRadius: "4px", letterSpacing: "0.1em" }}
            >
              TODAY&apos;S SPECIAL
            </span>
            <h1
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(38px, 6vw, 62px)",
                lineHeight: 0.95,
                color: PALETTE.ivory,
                letterSpacing: "0.01em",
              }}
            >
              HUNGRY? THE KITCHEN&apos;S OPEN.
            </h1>
            <p className="mt-4 mb-7 text-base md:text-lg" style={{ color: "rgba(255,248,238,0.85)", maxWidth: "440px" }}>
              Order from the best kitchens near you — hot, fast, and straight to your door.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-2 p-2 max-w-xl"
              style={{ background: PALETTE.ivory, borderRadius: "14px" }}
            >
              <div className="flex items-center gap-2 flex-1 px-3 py-2">
                <Search size={18} color={`${PALETTE.ink}88`} />
                <input
                  placeholder="Search restaurants or dishes"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: PALETTE.ink }}
                />
              </div>
              <button
                className="px-6 py-2.5 font-semibold text-sm"
                style={{ background: PALETTE.ink, color: PALETTE.ivory, borderRadius: "10px" }}
              >
                Find food
              </button>
            </div>
          </div>

          <div className="relative hidden md:block md:w-2/5 min-h-[280px]">
            <FoodPhoto
              category="biryani"
              fallback={PHOTOS.biryani}
              alt="Today's special dish"
              accent={PALETTE.chiliDark}
              Icon={Flame}
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "cover" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(90deg, ${PALETTE.chili} 0%, ${PALETTE.chili}00 35%)` }}
            />
          </div>
        </div>

        <div
          className="flex items-center gap-8 px-6 py-2.5 overflow-hidden whitespace-nowrap"
          style={{ background: PALETTE.chiliDark }}
        >
          {["Free delivery over ₹199", "20% off first order", "500+ kitchens near you", "Live order tracking"].map((t, i) => (
            <span key={i} className="flex items-center gap-2 text-xs font-medium" style={{ color: PALETTE.ivory }}>
              <Flame size={13} color={PALETTE.turmeric} /> {t}
            </span>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 pt-8">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {categories.map((c) => {
            const Icon = c.icon;
            const active = activeCategory === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setActiveCategory(c.name)}
                className="flex items-center gap-2 px-4 py-2.5 shrink-0 text-sm font-medium transition-colors"
                style={{
                  background: active ? PALETTE.ink : PALETTE.card,
                  color: active ? PALETTE.ivory : PALETTE.ink,
                  borderRadius: "999px",
                  border: `1px solid ${active ? PALETTE.ink : PALETTE.ink + "1A"}`,
                }}
              >
                <Icon size={16} /> {c.name}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-10 pt-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-xs font-bold tracking-widest" style={{ color: PALETTE.chili, letterSpacing: "0.1em" }}>NEAR YOU</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "30px", color: PALETTE.ink }}>Open kitchens right now</h2>
          </div>
          <button className="flex items-center gap-1 text-sm font-semibold" style={{ color: PALETTE.chiliDark }}>
            View all <ChevronRight size={15} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {restaurants.map((r) => <TicketCard key={r.name} r={r} />)}
        </div>
      </section>

      <section className="px-6 md:px-10 pt-10 pb-4">
        <span className="text-xs font-bold tracking-widest" style={{ color: PALETTE.curry, letterSpacing: "0.1em" }}>CROWD FAVORITES</span>
        <h2 className="mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "30px", color: PALETTE.ink }}>Popular dishes today</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {dishes.map((d) => (
            <div
              key={d.name}
              className="shrink-0 overflow-hidden"
              style={{ width: "180px", background: PALETTE.card, borderRadius: "12px", border: `1px solid ${PALETTE.ink}14` }}
            >
              <div style={{ height: "100px" }}>
                <FoodPhoto
                  category={d.category}
                  fallback={d.fallback}
                  alt={d.name}
                  accent={d.accent}
                  Icon={d.icon}
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-col justify-between p-3" style={{ minHeight: "76px" }}>
                <div>
                  <p className="font-semibold text-sm leading-tight" style={{ color: PALETTE.ink }}>{d.name}</p>
                  <p className="text-xs mt-1" style={{ color: `${PALETTE.ink}80` }}>{d.restaurant}</p>
                </div>
                <p className="text-sm font-bold mt-1" style={{ fontFamily: "'JetBrains Mono', monospace", color: PALETTE.chiliDark }}>₹{d.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-10 px-6 md:px-10 py-10" style={{ background: PALETTE.ink }}>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px", color: PALETTE.ivory }}>DABBA</span>
        <p className="text-sm mt-2 max-w-xs" style={{ color: "rgba(255,248,238,0.6)" }}>
          Homestyle kitchens, delivered hot. Order in seconds, track every step.
        </p>
        <p className="text-xs mt-6" style={{ color: "rgba(255,248,238,0.4)" }}>© 2026 Dabba. All rights reserved.</p>
      </footer>
    </div>
  );
}
