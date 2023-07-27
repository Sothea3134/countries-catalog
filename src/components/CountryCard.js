import { memo } from "react";
function CountryCard({ currentItems }) {

  return (
    <>
      <div
        className=" my-4 md:mb-12"
      >
        {currentItems.map((country, index) => {
          return <div
            key={index}
            className="rounded-xl flex flex-col  lg:flex-row"
          >
            <div
              className="aspect-[1.5] p-4  w-full h-full lg:w-80 lg:h-60"

            >
              <img src={country.flags.png} className="w-full h-full" alt='flag' />
            </div>
            <div className="px-4 pt-0 lg:p-4">
              <div className="font-bold text-lg cursor-pointer">
                <span>Country Name:   </span>
                {country.name.official}
              </div>
              <div><span className='font-bold'>CCA2</span>: {country.cca2}</div>
              <div><span className='font-bold'>CCA3</span>: {country.cca3}</div>
              <div><span className='font-bold'>Native Country Name</span>: {country?.name?.nativeName?.zho ? country?.name?.nativeName?.zho.officia : country?.translations?.zho.official}</div>
              <div><span className='font-bold'>Alternative Country Name</span>: {country?.altSpellings.join(",")}</div>
              <div><span className='font-bold'>IDD Root</span>: {country.idd?.root}</div>
              <div><span className='font-bold'>IDD Suffixes</span>: {country.idd.suffixes && country.idd.suffixes[0]} {country.idd.suffixes && country.idd.suffixes[1]}</div>
            </div>
          </div>
        })}
      </div >
    </>
  );
}

export default memo(CountryCard);