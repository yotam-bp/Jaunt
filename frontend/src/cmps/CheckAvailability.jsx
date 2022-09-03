import DatePicker from "react-datepicker";
import { GuestModal } from "../cmps/GuestModal";
import { utilService } from "../services/utilService";

export function CheckAvailability({
  state,
  props,
  getGuestsNum,
  openModal,
  closeModal,
  updateGuestsAmount,
  setDates,
  changeBtn,
  getTotalDays,
  isMobile,
}) {
  const { startDate, endDate, isModalShown, isChargeShown } = state;
  const { stay, order } = props;
  const { guestAmount } = order;

  return (
    <div className="availability flex column">
      <form className="check-availability flex column align-center">
        <div className="value-rate flex space-between">
          <span>
            <b className="fs22">${stay.price}</b> / night
          </span>
          <span className="stay-rate flex align-center">
            <i className="fa fa-star"></i>
            <span className="reviews-rate">{stay.reviews[0].rate}</span>
            {stay.reviews.length === 1 && (
              <span className="reviews-amount">
                ({stay.reviews.length} review)
              </span>
            )}
            {stay.reviews.length > 1 && (
              <span className="reviews-amount">
                ({stay.reviews.length} reviews)
              </span>
            )}
          </span>
        </div>
        <div className="order-details details-container flex column align-center">
          <DatePicker
          
            className="date-picker"
            placeholderText={
              props.order.startDate && props.order.endDate
                ? utilService.formatTime(props.order.startDate) +
                  "-" +
                  utilService.formatTime(props.order.endDate)
                : "Choose dates"
            }
            onChange={(date) => setDates(date)}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            monthsShown={isMobile ? 1 : 2}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            selectsRange
            shouldCloseOnSelect={true}
          />
          <div className="guests flex column">
            <div className="guestAmount">
              <p>
                {getGuestsNum() >= 1
                  ? `${getGuestsNum()} Guests`
                  : "Add guests"}{" "}
              </p>
            </div>
            <div className="guest-modal">
              <GuestModal
                isModalShown={isModalShown}
                guestAmount={guestAmount}
                updateGuestsAmount={updateGuestsAmount}
                closeModal={closeModal}
                openModal={openModal}
              />
            </div>
          </div>
        </div>
        {changeBtn()}
        {isChargeShown && (
          <div className="trip-reserve flex column">
            <p className="charge-msg">You won't be charged yet</p>
            <p>Non-refundable • $ {stay.price}</p>
            <p>
              {getGuestsNum() >= 1
                ? `${getGuestsNum()} Guests`
                : "No guests added"}{" "}
            </p>
            <p>
              $ {stay.price} x{" "}
              {getTotalDays(props.order.endDate, props.order.startDate)} nights{" "}
            </p>
            <div className="divider"></div>
            <section className="total-price flex space-between">
              <p>Total</p>
              <p>
                $
                {stay.price *
                  getTotalDays(props.order.endDate, props.order.startDate)}
              </p>
            </section>
          </div>
        )}
      </form>
    </div>
  );
}
