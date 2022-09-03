
export function Amenities({amenities, getAmenitiesIcons}) {
  return (
          <div className="amenities flex column">{amenities.map((txt, idx) =>
          <p className="flex align-center" key={idx}>
            <i className={getAmenitiesIcons(txt)}></i> {txt}</p>)}
          </div>
    
  )
}

