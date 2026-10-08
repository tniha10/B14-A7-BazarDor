import Hero from "./components/Banner";

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="সব-পণ্য" className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-gray-900">সব পণ্য</h2>
        </div>
      </section>
    </main>
  );
}