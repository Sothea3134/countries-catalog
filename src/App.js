import { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { getCountries, getCountryByName } from './services/country';
import CountryCard from './components/CountryCard';
import NotFound from './components/NotFound';
import Enum from './common/enum';
import Pagination from './components/Pagination';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css'

function App() {

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [orderName, setOrderName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 25;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = countries.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(countries.length / itemsPerPage);
  const showNextButton = currentItems !== pageCount - 1;
  const showPrevButton = currentItems !== 0;
  let timer = null;
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % countries.length;
    setCurrentPage(event.selected);
    setItemOffset(newOffset);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  const handleSearchByName = (events) => {
    clearTimeout(timer);
    if (events.target.value) {
      timer = setTimeout(() => {
        fetchCountryByName(events.target.value)
        setItemOffset(0)
        setCurrentPage(0)
      }, 1000);
    } else {
      timer = setTimeout(() => {
        fetchCountries();
      }, 1000);
    }
  }

  const fetchCountryByName = (name) => {
    setLoading(true);
    getCountryByName(name).then((response) => {
      if (response.data) {
        const data = response.data;
        if (orderName) {
          if (orderName === Enum.ODDERNAME.ASC) {
            data.sort((a, b) => a.name.official.localeCompare(b.name.official));
          }
          else {
            data.sort((a, b) => b.name.official.localeCompare(a.name.official));
          }
        }
        setCountries([...data])
        setNotFound(false);
      }
    })
      .catch((error) => {
        if (error.response.data.status === 404) {
          setCountries([])
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }

  const fetchCountries = () => {
    setLoading(true);
    getCountries().then((response) => {
      if (response.data) {
        const data = response.data;
        if (orderName) {
          if (orderName === Enum.ODDERNAME.ASC) {
            data.sort((a, b) => a.name.official.localeCompare(b.name.official));
          }
          else {
            data.sort((a, b) => b.name.official.localeCompare(a.name.official));
          }
        }
        setCountries(data);
        setItemOffset(0)
        setCurrentPage(0)
        setNotFound(false);
      }
    })
      .finally(() => setLoading(false));
  }

  const handleSortByCountryName = (value) => {
    let sortArray = [];
    if (value === Enum.ODDERNAME.ASC) {
      sortArray = countries.toSorted((a, b) => a.name.official.localeCompare(b.name.official));
    } else {
      sortArray = countries.toSorted((a, b) => b.name.official.localeCompare(a.name.official));
    }
    setCountries(sortArray);
    setItemOffset(0)
    setCurrentPage(0);
    setOrderName(value)
  }

  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line
  }, [])

  return (
    <main>
      <div className="container mx-auto sm:px-12">
        <header>
          <div className="px-4">
            <div className="text-4xl font-bold mt-10 inline-block">
              Countries Catalog
            </div>
            <div className="relative mt-8">
              <div>
                <div
                  className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  id="default-search"
                  onChange={(event) => handleSearchByName(event)}
                  type="search"
                  className="block p-4 pl-10 w-full rounded-sm border border-gray-300 focus:outline-cyan-500 focus:rounded-sm"
                  placeholder="Country Name"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 px-4">Sort by country name</div>
          <div className="flex px-4 mt-3">
            <div className="flex gap-x-2 flex-wrap">
              <button
                className={
                  orderName === Enum.ODDERNAME.ASC ? "bg-sky-500 text-white rounded-sm border border-cyan-500 h-12 w-36" : "bg-sky-50 rounded-sm border border-gray-300 h-12 w-36"
                }
                onClick={() => handleSortByCountryName(Enum.ODDERNAME.ASC)}
              >
                Ascending
              </button>

              <button
                className={
                  orderName === Enum.ODDERNAME.DESC ? "bg-sky-500 text-white rounded-sm border border-cyan-500 h-12 w-36" : "bg-sky-50 rounded-sm border border-gray-300 h-12 w-36"
                }
                onClick={() => handleSortByCountryName(Enum.ODDERNAME.DESC)}
              >
                Descending
              </button>

            </div>
          </div>
        </header>

        {
          loading ?
            <div className="mt-20">
              <ClipLoader
                color={"rgb(34 211 238 / 1)"}
                loading={loading}
                cssOverride={{
                  display: "block",
                  margin: "0 auto",
                }}
                size={30}
              />
            </div>
            :
            <>
              {
                notFound ? <NotFound />
                  :
                  <>
                    <CountryCard currentItems={currentItems} />
                    <Pagination paginationVariants={paginationVariants} showNextButton={showNextButton} handlePageClick={handlePageClick} pageCount={pageCount} showPrevButton={showPrevButton} currentPage={currentPage} />
                  </>
              }
            </>
        }

      </div >

    </main >
  );
}

export default App;
