import { StayFilter } from "./StayFilter";
import { Header } from "./Header";

export function NavBar({
  order,
  setDates,
  setGuestAmount,
  setLocation,
  startDate,
  endDate,
  updateSearch,
  onLoadStays
}) {
  return (
    <section className="full">
      <section className="navbar-container header-container">
        <Header />
        <section className="search-container hero flex justify-center align-center">
          <StayFilter
            order={order}
            setDates={setDates}
            setGuestAmount={setGuestAmount}
            setLocation={setLocation}
            startDate={startDate}
            endDate={endDate}
            updateSearch={updateSearch}
            onLoadStays={onLoadStays}
          />
        </section>
      </section>
    </section>
  );
}
