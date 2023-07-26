import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
import ReactPaginate from 'react-paginate';
import ClipLoader from "react-spinners/ClipLoader";
import { getCountries } from './services/country';
import CountryCard from './components/CountryCard';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css'

function App() {

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 25;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = countries.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(countries.length / itemsPerPage);
  const showNextButton = currentItems !== pageCount - 1;
  const showPrevButton = currentItems !== 0;
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

  useEffect(() => {
    getCountries().then((response) => {
      if (response.data) {
        setCountries(response.data)
      }
    })
      .finally(() => setLoading(false));
  }, [])

  if (<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-slate-700 h-10 w-10"></div>
      <div class="flex-1 space-y-6 py-1">
        <div class="h-2 bg-slate-700 rounded"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-700 rounded col-span-2"></div>
            <div class="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div class="h-2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>)

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
                    v-model="searchCriteria"
                    type="search"
                    className="block p-4 pl-10 w-full rounded-sm border border-gray-300 focus:outline-cyan-500 focus:rounded-sm"
                    placeholder="Country Name"
                  />
                  <div className="text-red-400 mt-2.5 absolute">
                  </div>
                </div>
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
                <CountryCard currentItems={currentItems} />
                <motion.div
                  variants={paginationVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ReactPaginate
                    breakLabel={<span className="mr-4">...</span>}
                    nextLabel={
                      showNextButton ? (
                        <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md">
                          <BsChevronRight />
                        </span>
                      ) : null
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel={
                      showPrevButton ? (
                        <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md mr-4">
                          <BsChevronLeft />
                        </span>
                      ) : null
                    }
                    containerClassName="flex items-center justify-center mt-8 mb-4"
                    pageClassName="block border- border-solid border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md mr-4"
                    activeClassName="bg-cyan-400 text-white"
                  />
                </motion.div>
              </>
          }

        </div >
      </main >
    );
}

export default App;
