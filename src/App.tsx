import React from "react";
import Footer from "./components/Footer/Footer";
// import Logo from "./components/Logo/Logo";
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
          imageUrl="https://files.brannan.cloud/tv/netflix-450x174.jpg"
        />

        <ServiceCard
          displayName="Peacock"
          url="https://peacock.com"
          imageUrl="https://files.brannan.cloud/tv/peacock-450x174.jpg"
        />

        <ServiceCard
          displayName="Hulu"
          url="https://hulu.com"
          imageUrl="https://files.brannan.cloud/tv/hulu-450x174.jpg"
        />

        <ServiceCard
          displayName="HBO Max"
          url="https://www.hbomax.com/"
          imageUrl="https://files.brannan.cloud/tv/hbo-450x174.jpg"
        />

        <ServiceCard
          displayName="YouTube"
          url="https://youtube.com"
          imageUrl="https://files.brannan.cloud/tv/youtube-450x174.jpg"
        />
      </section>

      <Footer />
    </div>
  );
}

export default App;
