import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Heart, Flame, ShieldCheck, Users, Star, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Modern Sweets — 40+ years of handcrafting authentic Indian mithai with 100% pure cow desi ghee, zero preservatives, and generational recipes since 1985.",
  openGraph: {
    title: "Our Story | Modern Sweets",
    description:
      "Four decades of purity, passion, and unmatched mithai craftsmanship.",
  },
};

const HALWAIS = [
  {
    name: "Pandit Ramchandra Ji",
    role: "Founder & Master Halwai (1985–2010)",
    desc: "Started with 5 heritage recipes, a brass kadhai, and a vision to deliver honest Indian sweetness to every home.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Suresh Chandra Sharma",
    role: "Head Halwai & Quality Director",
    desc: "Carrying the generational torch — master of Kaju Katli, Motichoor Ladoo, and slow-simmered Gulab Jamun.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Priya Sharma",
    role: "Head of Gifting & Festive Design",
    desc: "Creative director behind all royal velvet hamper collections, bridal gift packaging, and corporate gifting lines.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
];

const TIMELINE = [
  { year: "1985", event: "Founded with 1 kadhai, 5 recipes, and a dream of pure Indian sweetness." },
  { year: "1992", event: "Expanded to Bengali Mithai range — fresh chhena Rasgulla and Sandesh." },
  { year: 2000, event: "Launched Royal Namkeen & Spiced Savories inspired by Ratlami traditions." },
  { year: "2008", event: "Introduced Festive Gift Hamper line for weddings and corporate events." },
  { year: "2016", event: "Sugar-Free Anjeer Dry Fruit Barfi launched for health-conscious families." },
  { year: "2024", event: "Launched pan-India express temperature-controlled delivery service." },
  { year: "2025", event: "Modern Sweets Online — bringing 40 years of tradition to every doorstep." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream text-dark-brown">
      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-dark-brown/70 hover:text-saffron transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-brown via-[#4E342E] to-dark-brown" />
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=60"
            alt="Traditional Indian sweets"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-cream">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/20 border border-saffron/40 text-saffron text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4" />
            <span>Established 1985 · New Delhi, India</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight mb-4">
            Our Story of <span className="text-saffron">Purity</span> &{" "}
            <span className="text-gold-light">Passion</span>
          </h1>
          <p className="text-sm sm:text-lg text-cream/80 max-w-2xl mx-auto leading-relaxed">
            Four decades of handcrafting authentic Indian mithai with 100% pure
            churned cow desi ghee, zero artificial preservatives, and
            generational recipes that have stood the test of time.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-saffron block mb-2">
              The Founding Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-dark-brown mb-6">
              Born From a Belief: Every Family Deserves Real Sweetness
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-dark-brown/80 leading-relaxed">
              <p>
                In the winter of 1985, Pandit Ramchandra Ji opened a small
                confectionery in Connaught Place, New Delhi, with a brass kadhai,
                a wood-fired chulha, and an unwavering belief: that Indian sweets
                are not just food — they are sacred expressions of love,
                celebration, and hospitality.
              </p>
              <p>
                At a time when commercial sweets were beginning to substitute pure
                cow desi ghee with hydrogenated palm oil and vanaspati, he chose
                to stand firm. Every single batch at Modern Sweets was — and
                remains — made with freshly churned cow desi ghee, hand-picked
                cashews, Kashmiri saffron threads, and slow-reduced whole milk
                khoya.
              </p>
              <p className="font-semibold text-dark-brown">
                Today, three generations later, that same promise rings true in
                every piece of Kaju Katli, every spongy Rasgulla, and every
                crumbly Motichoor Ladoo that leaves our kitchen.
              </p>
            </div>
          </div>

          <div className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-gold/40">
            <Image
              src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
              alt="Kaju Katli craftsmanship"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 inset-x-6 text-cream text-center">
              <p className="font-serif font-bold text-lg">
                &ldquo;Purity is not a choice — it is our identity.&rdquo;
              </p>
              <span className="text-xs text-gold-light">
                — Pandit Ramchandra Ji, Founder
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-dark-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "40+", label: "Years of Heritage" },
              { value: "15k+", label: "Happy Families" },
              { value: "50+", label: "Signature Recipes" },
              { value: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="p-4">
                <span className="text-3xl sm:text-4xl font-serif font-black text-saffron block">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-gold-light mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-saffron block mb-2">
            Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-dark-brown">
            40 Years of Sweet Milestones
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-saffron to-gold mx-auto mt-3 rounded-full" />
        </div>

        <div className="relative pl-8 border-l-2 border-gold/40 space-y-8">
          {TIMELINE.map((item) => (
            <div key={item.year} className="relative">
              <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-saffron border-4 border-cream block" />
              <div className="pl-6">
                <span className="text-xs font-black text-saffron uppercase tracking-wider block mb-1">
                  {item.year}
                </span>
                <p className="text-sm sm:text-base text-dark-brown/85 leading-relaxed">
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 sm:py-20 bg-cream-light/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-saffron block mb-2">
              The Craftspeople
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-dark-brown">
              Meet Our Master Halwais
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-saffron to-gold mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HALWAIS.map((h) => (
              <div
                key={h.name}
                className="bg-white rounded-3xl overflow-hidden border border-gold/30 shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-56">
                  <Image
                    src={h.image}
                    alt={h.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-black text-dark-brown text-lg">
                    {h.name}
                  </h3>
                  <span className="text-xs font-bold text-saffron block mb-2">
                    {h.role}
                  </span>
                  <p className="text-xs text-dark-brown/75 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-saffron block mb-2">
            What We Stand For
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-dark-brown">
            Our Core Values
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-saffron to-gold mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Flame className="w-6 h-6 text-saffron" />,
              title: "Authentic Purity",
              desc: "Only 100% churned cow desi ghee, fresh khoya, and hand-picked ingredients in every batch.",
            },
            {
              icon: <Heart className="w-6 h-6 text-red-500" />,
              title: "Made With Love",
              desc: "Every ladoo, every barfi, every roll — crafted with pride and the warmth of generational tradition.",
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
              title: "Zero Compromise",
              desc: "No artificial colors, no preservatives, no synthetic fats. Just the honest sweetness of India.",
            },
            {
              icon: <Users className="w-6 h-6 text-gold-dark" />,
              title: "Community First",
              desc: "15,000+ families trust us. We treat every order as a gift to a family we care about deeply.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="p-6 bg-white rounded-3xl border border-gold/30 shadow-md hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-cream border border-gold/20 flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="font-serif font-bold text-dark-brown text-base mb-2">
                {v.title}
              </h3>
              <p className="text-xs text-dark-brown/70 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-dark-brown to-[#4E342E] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-cream mb-4">
            Ready to Taste 40 Years of Purity?
          </h2>
          <p className="text-sm text-cream/75 mb-8">
            Order fresh daily batches of your favourite Indian sweets — delivered
            with love, trust, and 100% desi ghee guarantee.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-saffron hover:bg-saffron-dark text-white font-bold text-sm shadow-lg shadow-saffron/30 transition-all hover:-translate-y-0.5"
          >
            <Star className="w-4 h-4" />
            <span>Order Handcrafted Sweets</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
