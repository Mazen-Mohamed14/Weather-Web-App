import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export interface City {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}

function HeadlessUI() {
  const [cityArr, setCityArr] = useState<City[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("a");
  const [debouncedInput, setDebouncedInput] = useState<string>("a"); // Debounced input

  const navigate = useNavigate();

  // Debounce function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInput(userInput);
    }, 1300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userInput]);

  useEffect(() => {
    const getCities = async () => {
      const headersList = {
        Accept: "*/*",
        "X-RapidAPI-Key": "176e4daa48mshd2048cb345d3ad3p1c3a60jsncdafc48f6a69",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      };

      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${debouncedInput}`,
        {
          method: "GET",
          headers: headersList,
        }
      );

      const { data } = await response.json();
      setCityArr(data);
    };
    getCities();
  }, [debouncedInput]);

  const filteredCityArr =
    query === ""
      ? cityArr
      : cityArr?.filter((city) =>
          city.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className=" top-16 w-72 sm:w-96">
      <Combobox
        value={selected}
        onChange={(event: any) => {
          setSelected(event);
          navigate(
            `/${event?.name}?lat=${event?.latitude}&long=${event?.longitude}`
          );
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none outline-0	 py-3 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              placeholder="ex: London"
              displayValue={(city: City) => city.name}
              onChange={(event) => {
                setQuery(event.target.value);
                if (event.target.value.length !== 0) {
                  setUserInput(event.target.value);
                } else {
                  setUserInput("a");
                }
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredCityArr?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredCityArr?.map((city) => (
                  <Combobox.Option
                    key={city.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={city}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {city.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default HeadlessUI;
