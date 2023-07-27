import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react'

export default forwardRef(function Modal(_, ref) {
  const divRef = useRef(null);
  const [country, setCountry] = useState({})

  const handleClick = () => {
    divRef.current.style.display = "none";
  };
  useImperativeHandle(ref, () => {
    return {
      openModal(countryItem) {
        divRef.current.style.display = "block";
        setCountry(countryItem)
      },
    };
  }, []);

  return (
    <div ref={divRef} className="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div
                className="aspect-[1.5] p-4  w-full h-full"

              >
                <img src={country?.flags?.png} className="w-full h-full" alt='flag' />
              </div>
              <div className="px-4 pt-0 lg:p-4">
                <div className="font-bold text-lg">
                  <span>Country Name: </span>
                  {country?.name?.official}
                </div>
                <div><span className='font-bold'>CCA2</span>: {country?.cca2 ? country?.cca2 : "N/A"}</div>
                <div><span className='font-bold'>CCA3</span>: {country?.cca3 ? country?.cca3 : "N/A"}</div>
                <div><span className='font-bold'>CCN3</span>: {country?.ccn3 ? country?.ccn3 : "N/A"}</div>
                <div><span className='font-bold'>CIOC</span>: {country?.cioc ? country?.cioc : "N/A"}</div>
                <div><span className='font-bold'>Independent</span>: {`${country?.independent}`}</div>
                <div><span className='font-bold'>Area</span>: {country?.area ? country?.area : "N/A"}</div>
                <div><span className='font-bold'>Fifa</span>: {country?.fifa ? country?.fifa : "N/A"}</div>
                <div><span className='font-bold'>Native Country Name</span>: {country?.name?.nativeName?.zho ? country?.name?.nativeName?.zho.officia : country?.translations?.zho.official}</div>
                <div><span className='font-bold'>Alternative Country Name</span>: {country.altSpellings && country.altSpellings.join(",")}</div>
                <div><span className='font-bold'>IDD Root</span>: {country?.idd?.root}</div>
                <div><span className='font-bold'>Capital City</span>: {country?.capital}</div>
                <div><span className='font-bold'>Region</span>: {country?.region}</div>
                <div><span className='font-bold'>Subregion</span>: {country?.subregion}</div>
                <div><span className='font-bold'>Population</span>: {country?.population}</div>
                <div><span className='font-bold'>Borders</span>: {country.borders ? country.borders.join(", ") : "N/A"}</div>
                <div><span className='font-bold'>Start of Week</span>: {country?.startOfWeek}</div>
                <div><span className='font-bold'>Postal Code Format</span>: {country?.postalCode?.format ? country?.postalCode?.format : "N/A"}</div>
                <div><span className='font-bold'>Postal Code regex</span>: {country?.postalCode?.regex ? country?.postalCode?.regex : "N/A"}</div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button onClick={handleClick} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
