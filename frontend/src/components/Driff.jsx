import React from 'react'

const Driff = () => {
  return (
    <figure className="diff aspect-16/9" tabIndex={0}  style={{borderRadius: "10px"}}>
  <div className="diff-item-1" role="img" tabIndex={0}>
  <div className="bg-primary text-primary-content grid place-content-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black">
  ATTEND
</div>

  </div>
  <div className="diff-item-2" role="img">
    <div className="bg-base-200/50 grid place-content-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black">. TRACK</div>
  </div>
  <div className="diff-resizer"></div>
</figure>
  )
}

export default Driff