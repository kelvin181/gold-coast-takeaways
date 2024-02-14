import React from "react";
import locationMap from "../images/location-map.webp";

const Location = (props) => {
  const { currentLoad } = props;

  return (
    <div className={`google-map ${currentLoad ? "" : "map-padding"}`}>
      {currentLoad ? (
        <img
          src={locationMap}
          alt="Placeholder Map"
          className="placeholder-map"
        />
      ) : (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3185.8439386793066!2d174.8979262765675!3d-37.013519288729604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d4d7f05a4346f%3A0x19d873b7d24393e6!2sGold%20Coast%20Takeaways!5e0!3m2!1sen!2snz!4v1707879823287!5m2!1sen!2snz"
          width="600"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </div>
  );
};

export default Location;
