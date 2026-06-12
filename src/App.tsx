import { Cover } from './sections/01-cover'
import { Letter } from './sections/02-letter'
import { Contact } from './sections/14-contact'

function App() {
  return (
    <main className="flex flex-col">
      {/* Single page. Each <section> is a "session" of the presentation. */}
      <Cover />
      <Letter />
      <Contact />
    </main>
  )
}

export default App
