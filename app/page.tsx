
import Image from 'next/image';
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fetchCars } from '@/utils';
import { fuels, manufacturers, yearsOfProduction } from '@/constants';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  
  console.log('=== DEBUG START ===');
  console.log('Search params:', params);
  
  const allCars = await fetchCars({
    manufacturer: (params.manufacturer as string) || "",
    year: Number(params.year) || 2022,
    fuel: (params.fuel as string) || "",
    model: (params.model as string) || "",
    limit: Number(params.limit) || 10,
  });

  // Get the current limit from params, default to 10
  const currentLimit = Number(params.limit) || 10;
  
  // Slice the cars to show only the current limit
  const displayedCars = allCars?.slice(0, currentLimit) || [];

  console.log('Fetched cars:', allCars);
  console.log('Is array?', Array.isArray(allCars));
  console.log('Cars length:', allCars?.length);
  console.log('=== DEBUG END ===');

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;
  const hasMoreCars = allCars && allCars.length > currentLimit;
  
  console.log('=== SHOW MORE DEBUG ===');
  console.log('Total cars:', allCars?.length);
  console.log('Current limit:', currentLimit);
  console.log('Has more cars:', hasMoreCars);
  console.log('isNext (should be false to show button):', !hasMoreCars);
  console.log('=== END DEBUG ===');

  // restul codului...

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels}/>
            <CustomFilter title="year" options={yearsOfProduction}/>
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {displayedCars?.map((car: any, index: number) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={currentLimit / 10}
              isNext={!hasMoreCars}
            />




          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              Oops, no results
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}



      </div>
    </main>
  );
}