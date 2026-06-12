import { Cover } from './sections/Cover'
import { Letter } from './sections/Letter'

function App() {
  return (
    <main className="flex flex-col">
      {/* Single page. Each <section> is a "session" of the presentation. */}
      <Cover />
      <Letter />

      <section
        id="section-3"
        className="flex min-h-screen items-center justify-center p-8"
      >
        <h1 className="text-4xl font-bold">Sessão 3</h1>
      </section>
    </main>
  )
}

export default App
