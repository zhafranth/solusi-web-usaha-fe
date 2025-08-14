import Header from '../components/Header'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import AnimatedSection from '../components/AnimatedSection'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AnimatedSection>
          <section id="home">
            <Hero />
          </section>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <section id="services">
            <Services />
          </section>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <section id="about">
            <About />
          </section>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <section id="contact">
            <Contact />
          </section>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage