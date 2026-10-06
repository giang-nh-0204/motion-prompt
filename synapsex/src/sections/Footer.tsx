import AutoplayVideo from '../components/AutoplayVideo';
import SynapseXLogo from '../components/SynapseXLogo';

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4';

export default function Footer() {
  return (
    <footer className="bg-black overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* the clip fills its half; absolute so object-cover follows the row height on md */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-auto">
          <AutoplayVideo src={VIDEO} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex w-full md:w-1/2 flex-col justify-between p-10 sm:p-16">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <SynapseXLogo size={18} className="text-white/70" />
              <span className="text-[15px] font-medium text-white/70 tracking-tight">SynapseX</span>
            </div>
            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm">
              The next evolution of human-machine interaction. Built for those who refuse to be limited by biology
              alone.
            </p>
          </div>
          <p className="text-white/25 text-[12px] mt-12">© 2026 SynapseX Labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
