export default function CountryCard({ currentItems }) {
  return (
    <>
      <div
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-6 my-4 md:mb-12"
      >
        {currentItems.map((country, index) => {

          return <div
            key={index}
            className="rounded-xl"
          >
            <div
              className="aspect-[1.5] p-4 cursor-pointer"

            >
              <img src={country.flags.png} className="w-full h-full" alt='flag' />
            </div>
            <div className="p-4">
              <div className="font-bold text-lg">
                {country.name.official}
              </div>
              <div><span className='font-bold'>CCA2</span>: {country.cca2}</div>
              <div><span className='font-bold'>CCA3</span>: {country.cca3}</div>
              <div><span className='font-bold'>Native Country Name</span>: {country?.name?.nativeName?.zho ? country?.name?.nativeName?.zho.officia : country?.translations?.zho.official}</div>
              <div><span className='font-bold'>Alternative Country Name</span>: {country?.altSpellings.join(",")}</div>
              <div><span className='font-bold'>IDD Root</span>: {country.idd?.root}</div>
              <div><span className='font-bold'>IDD Suffixes</span>: {country.idd.suffixes && country.idd.suffixes.join(", ")}</div>
            </div>
          </div>
        })}
      </div >
    </>
  );
}