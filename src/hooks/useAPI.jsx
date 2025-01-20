import { useEffect, useState } from 'react';

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
        const limit = 100; // Hent 100 poster per side (API-begrensning)

        while (true) {
          const paginatedUrl = `${url}?limit=${limit}&page=${page}`;
          const response = await fetch(paginatedUrl);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const json = await response.json();

          // Valider `media`-feltet og legg til fallback om nødvendig
          const validatedData = json.data.map((venue) => ({
            ...venue,
            media: venue.media?.filter((media) => media.url && media.url.startsWith('http')) || [],
          }));

          allData = [...allData, ...validatedData];

          if (json.data.length < limit) {
            break; // Slutt hvis vi har hentet siste side
          }

          page++; // Gå til neste side
        }

        // Sorter data hvis sorteringsalternativ er angitt
        if (sort) {
          allData.sort((a, b) => {
            if (sort === 'created:desc') {
              return new Date(b.created) - new Date(a.created); // Nyeste først
            } else if (sort === 'created:asc') {
              return new Date(a.created) - new Date(b.created); // Eldste først
            }
            return 0; // Ingen sortering
          });
        }

        if (isMounted) {
          setData(allData); // Lagre alle data lokalt
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error);
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






