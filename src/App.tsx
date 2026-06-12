import { Cover } from './sections/01-cover'
import { Letter } from './sections/02-letter'
import { WhoWeAre } from './sections/03-who-we-are'
import { OurNumbers } from './sections/04-our-numbers'
import { Team } from './sections/05-team'
import { HowWeWork } from './sections/06-how-we-work'
import { WhatWeDeliver } from './sections/07-what-we-deliver'
import { WhereWeOperate } from './sections/08-where-we-operate'
import { SuccessCase } from './sections/09-success-case'
import { Portfolio } from './sections/10-portfolio'
import { DeliveryStructure } from './sections/11-delivery-structure'
import { ExpectedResults } from './sections/12-expected-results'
import { OperationalCommitments } from './sections/13-operational-commitments'
import { Contact } from './sections/14-contact'

function App() {
  return (
    <main className="flex flex-col">
      {/* Single page. Each <section> is a "session" of the presentation. */}
      <Cover />
      <Letter />
      <WhoWeAre />
      <OurNumbers />
      <Team />
      <HowWeWork />
      <WhatWeDeliver />
      <WhereWeOperate />
      <SuccessCase />
      <Portfolio />
      <DeliveryStructure />
      <ExpectedResults />
      <OperationalCommitments />
      <Contact />
    </main>
  )
}

export default App
