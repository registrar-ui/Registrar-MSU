import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import Timeline from "@/components/Timeline";
import Statistics from "@/components/Statistics";
import Announcements from "@/components/Announcements";
import DownloadCenter from "@/components/DownloadCenter";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <Services />
      <WhyChoose />
      <Timeline />
      <Statistics /> */}
      <Announcements />
      {/* <DownloadCenter /> */}
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
