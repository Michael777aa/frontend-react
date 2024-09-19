import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import EventService from "../../services/EventService";
import { useEffect } from "react";
import { setEvents } from "./slice";
import { retrieveEvents } from "./selector";
import { Event, EventStatus } from "../../../lib/types/event";
import { serverApi } from "../../../lib/config";

const actionDispatch = (dispatch: Dispatch) => ({
  setEvents: (data: Event[]) => dispatch(setEvents(data)),
});

const eventRetriever = createSelector(retrieveEvents, (events) => ({
  events,
}));

export default function Events() {
  const dispatch = useDispatch();
  const { setEvents } = actionDispatch(dispatch);
  const { events } = useSelector(eventRetriever);

  useEffect(() => {
    // Data fetch
    const eventService = new EventService();

    eventService
      .getEvents()
      .then((data) => {
        console.log("data: ", data);
        setEvents(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filter events to only include those with PROCESS status
  const filteredEvents = events.filter(
    (event: Event) => event.eventStatus === EventStatus.PROCESS
  );

  return (
    <div className={"events-frame"}>
      <Stack data-aos="fade-up" className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Events</span>
        </Box>

        {filteredEvents.length !== 0 ? (
          <>
            <Swiper
              className={"events-info swiper-wrapper"}
              slidesPerView={"auto"}
              centeredSlides={true}
              spaceBetween={30}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
            >
              {filteredEvents.map((event: Event) => (
                <SwiperSlide key={event._id} className={"events-info-frame"}>
                  <div className={"events-img"}>
                    <img
                      src={`${serverApi}/${event.eventImages[0]}`}
                      className={"events-img"}
                      alt={event.eventName}
                    />
                  </div>
                  <Box className={"events-desc"}>
                    <Box className={"events-bott"}>
                      <Box className={"bott-left"}>
                        <div className={"event-title-speaker"}>
                          <strong>{event.eventName}</strong>
                          <div className={"event-organizator"}>
                            <img src={"/icons/speaker.svg"} alt="speaker" />
                            <p className={"spec-text-author"}>
                              {event.eventTopic}
                            </p>
                          </div>
                        </div>

                        <p className={"text-desc"}>{event.eventDesc}</p>

                        <div className={"bott-info"}>
                          <div className={"bott-info-main"}>
                            <img src={"/icons/calendar.svg"} alt="calendar" />
                            {new Date(event.createdAt).toLocaleDateString()}
                          </div>
                          <div className={"bott-info-main"}>
                            <img src={"/icons/location.svg"} alt="location" />
                            {event.eventLocation}
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            <Box className={"prev-next-frame"}>
              <img
                src={"/icons/arrow-right.svg"}
                className={"swiper-button-prev"}
                alt="previous"
              />
              <div className={"dot-frame-pagination swiper-pagination"}></div>
              <img
                src={"/icons/arrow-right.svg"}
                className={"swiper-button-next"}
                style={{ transform: "rotate(-180deg)" }}
                alt="next"
              />
            </Box>
          </>
        ) : (
          <Box className="no-events-now">
            Events are not available currently!
          </Box>
        )}
      </Stack>
    </div>
  );
}
