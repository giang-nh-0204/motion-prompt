import { motion } from 'framer-motion';
import AutoplayVideo from '../components/AutoplayVideo';

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4';

const METRICS = [
  { value: '2.4ms', label: 'Synaptic Latency' },
  { value: '99.7%', label: 'Signal Accuracy' },
  { value: '140B', label: 'Neural Parameters' },
];

export default function Metrics() {
  return (
    <section id="metrics" className="relative min-h-screen overflow-hidden">
      <AutoplayVideo src={VIDEO} className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative z-10 flex min-h-screen items-center justify-center pt-32 pb-32 px-6">
        <div className="w-full max-w-6xl">
          <motion.p
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
          >
            Performance Metrics
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <div className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                  {metric.value}
                </div>
                <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
