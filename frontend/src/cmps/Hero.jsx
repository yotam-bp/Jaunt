import { StayFilter } from "./StayFilter";
import { Header } from "./Header";

export function Hero({ order, setDates, setGuestAmount, setLocation }) {
  return (
    <section className="hero flex column full main-header home-container space-between">
      <>
        <section className="header-container">
          <Header />
        </section>
        <section className="search-container flex justify-center align-center">
          <StayFilter
            order={order}
            setDates={setDates}
            setGuestAmount={setGuestAmount}
            setLocation={setLocation}
          />
        </section>
        <div className="app-desc flex  ">
          Start a <br />
          New Journey
          {/* Jaunt <span>2021</span>
                <br />Enter a new journy
                <br /> <NavLink to="/stay">Get exploring</NavLink> */}
        </div>
      </>
    </section>
  );
}
