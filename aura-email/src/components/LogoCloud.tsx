import { motion } from 'motion/react';

export function LogoCloud() {
  const logos = ['Linear', 'Vercel', 'Figma', 'Stripe', 'Ramp', 'Notion', 'Loom', 'Arc'];

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20 text-center">
      <h3 className="text-xs uppercase tracking-widest text-white/40 font-semibold">
        Trusted by the world's most thoughtful teams
      </h3>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
        {logos.map((logo, i) => (
          <motion.div
            key={logo}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="text-sm font-semibold tracking-tight text-white/50 hover:text-white transition-colors cursor-pointer text-center"
          >
            {logo}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
