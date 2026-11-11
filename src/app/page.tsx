export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-cream text-dark-brown">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight text-dark-brown sm:text-6xl mb-4">
          Modern <span className="text-saffron">Sweets</span>
        </h1>
        <p className="text-lg text-dark-brown/80 mb-6 font-medium">
          Taste & Purity Since 1985
        </p>
        <div className="inline-block px-4 py-2 bg-saffron text-white rounded-full font-semibold shadow-md">
          Project Initialized Successfully
        </div>
      </div>
    </main>
  );
}
