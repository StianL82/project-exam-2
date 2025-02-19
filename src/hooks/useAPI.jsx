import { useEffect, useState } from 'react';

/**
 * useAPI Hook
 *
 * Fetches paginated data from an API, validates media URLs, and optionally sorts results.
 *
 * @param {string} url - The API endpoint to fetch data from.
 * @param {string|null} [sort=null] - Optional sorting parameter. Supports:
 *  - `"created:desc"` (Newest first)
 *  - `"created:asc"` (Oldest first)
 *
 * @returns {Object} API response state.
 * @returns {Array<Object>} return.data - The fetched data.
 * @returns {boolean} return.isLoading - Indicates if the data is currently being fetched.
 * @returns {boolean} return.isError - Indicates if an error occurred during the fetch.
 */

export default function useAPI(url, sort = null) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchAllData() {
      try {
        setIsLoading(true);
        setIsError(false);

        let allData = [];
        let page = 1;
        const limit = 100;

        while (true) {
          const paginatedUrl = `${url}?limit=${limit}&page=${page}`;
          const response = await fetch(paginatedUrl);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const json = await response.json();

          const validatedData = json.data.map((venue) => ({
            ...venue,
            media:
              venue.media?.filter(
                (media) => media.url && media.url.startsWith('http')
              ) || [],
          }));

          allData = [...allData, ...validatedData];

          if (json.data.length < limit) {
            break;
          }

          page++;
        }

        if (sort) {
          allData.sort((a, b) => {
            if (sort === 'created:desc') {
              return new Date(b.created) - new Date(a.created);
            } else if (sort === 'created:asc') {
              return new Date(a.created) - new Date(b.created);
            }
            return 0;
          });
        }

        if (isMounted) {
          setData(allData);
        }
      } catch {
        if (isMounted) {
          setIsError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, [url, sort]);

  return { data, isLoading, isError };
}
