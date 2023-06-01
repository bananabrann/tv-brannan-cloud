import React, { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
// import Logo from "./components/Logo/Logo";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import styles from "./App.module.css";
import "./App.css";

function App() {
  // const [notes, setNotes] = useState<string>("");
  const [time, setTime] = useState<string>(formatDateTime(Date.now()));

  useEffect(() => {
    /*
    async function fetchNotes() {
      try {
        const response = await fetch(
          // Don't use the CDN endpoint
          "https://files.brannan.cloud/tv/MESSAGE.txt",
          { mode: "cors" },
        );
        const text = await response.text();
        console.log(text);
        setNotes(text);
      } catch (error: any) {
        console.error(error);
        setNotes("ERR");
      }
    }

    fetchNotes();
    */

    // Update the time every 30 seconds.
    const updateDateTime = () => setTime(formatDateTime(Date.now()));

    const interval = setInterval(updateDateTime, 30 * 1000); // 30 seconds

    // Clean up the interval when the component is unmounted.
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Converts a timestamp to a more readable format. Do this manually
  // so that I don't have to install a package.
  function formatDateTime(timestamp: number) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(timestamp);

    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const daySuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    const formattedHour = hour % 12 || 12;
    const amPm = hour < 12 ? "am" : "pm";
    const formattedMinute = minute.toString().padStart(2, "0");

    return `${month} ${day}${daySuffix}, ${formattedHour}:${formattedMinute}${amPm}`;
  }

  return (
    <div className="App">
      <header className={styles.header}>
        {/* <Logo /> */}
        <h2>{time}</h2>
      </header>

      <section className={styles.main}>
        <ServiceCard
          displayName="Netflix"
          url="https://netflix.com"
          imageUrl="https://files.brannan.cloud/tv/netflix-450x174.jpg"
        />

        <ServiceCard
          displayName="YouTube"
          url="https://youtube.com"
          imageUrl="https://files.brannan.cloud/tv/youtube-450x174.jpg"
        />

        <ServiceCard
          displayName="Hulu"
          url="https://hulu.com"
          imageUrl="https://files.brannan.cloud/tv/hulu-450x174.jpg"
        />

        {/*         
        <ServiceCard
          displayName="Peacock"
          url="https://peacock.com"
          imageUrl="https://files.brannan.cloud/tv/peacock-450x174.jpg"
        />
      */}

        {/*
        <ServiceCard
          displayName="HBO Max"
          url="https://www.hbomax.com/"
          imageUrl="https://files.brannan.cloud/tv/hbo-450x174.jpg"
        />
        */}

        <ServiceCard
          displayName="Paramount+"
          url="https://www.paramountplus.com/"
          imageUrl="https://files.brannan.cloud/tv/paramount-450x174.jpg"
        />
      </section>

      <Footer />
    </div>
  );
}

export default App;
