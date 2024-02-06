export function IntroductionSection(){
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="relative z-30 flex flex-col items-center">
        <header>
          <h2 className="text-white pt-40 text-4xl font-medium">
            Tienda ropa urbana
          </h2>
        </header>

        <footer className="flex flex-col flex-grow justify-end pb-20">
          <span className="text-white">Tu estilo</span>
        </footer>
      </div>

      <div className="absolute top-0 bottom-0 h-full z-10"></div>
    </section>
  );
}
