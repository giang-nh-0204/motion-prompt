import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <main className="relative min-h-screen bg-white text-black">
      <BackgroundVideo />
      <Navbar />
      <Hero />
    </main>
  );
}
