import React from "react";
import Footer from "./components/Footer/Footer";
import Logo from "./components/Logo/Logo";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import styles from "./App.module.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className={styles.header}>
        {/* <Logo /> */}
      </header>

      <section className={styles.main}>
        <ServiceCard
          displayName="Netflix"
          url="https://netflix.com"
          imageUrl="https://bananabrann.nyc3.cdn.digitaloceanspaces.com/tv.bananabrann.dev%2Fnetflix-450x174jpg.jpg"
        />

        <ServiceCard
          displayName="Peacock"
          url="https://peacock.com"
          imageUrl="https://bananabrann.nyc3.cdn.digitaloceanspaces.com/tv.bananabrann.dev%2Fpeacock-450x174jpg.jpg"
        />

        <ServiceCard
          displayName="Hulu"
          url="https://hulu.com"
          imageUrl="https://bananabrann.nyc3.cdn.digitaloceanspaces.com/tv.bananabrann.dev%2Fhulu-450x174jpg.jpg"
        />

        <ServiceCard
          displayName="HBO Max"
          url="https://www.hbomax.com/"
          imageUrl="https://bananabrann.nyc3.cdn.digitaloceanspaces.com/tv.bananabrann.dev%2Fhbo-450x174.jpg"
        />
      </section>

      <Footer />
    </div>
  );
}

export default App;
