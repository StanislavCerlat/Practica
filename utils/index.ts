import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, fuel } = filters;
  
  const headers = {
    'x-rapidapi-key': '3d067fc9b8mshe08079f7b1a32efp13ae65jsnfd1437f59edf',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
  };

  // If a specific manufacturer is selected, fetch only that manufacturer's cars
  if (manufacturer) {
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}`, {
      headers: headers,
    });

    const result = await response.json();
    console.log('API Response (specific manufacturer):', result);
    return result;
  }

  // If no manufacturer is selected, fetch cars from multiple popular manufacturers
  const popularManufacturers = [
    'Honda', 'Toyota', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Hyundai',
    'Chevrolet', 'Volkswagen', 'Kia', 'Mazda', 'Subaru', 'Lexus', 'Infiniti', 'Acura',
    'Volvo', 'Jaguar', 'Land Rover', 'Porsche', 'Tesla', 'Genesis', 'Lincoln', 'Cadillac',
    'Buick', 'Chrysler', 'Dodge', 'Jeep', 'Ram', 'GMC', 'Mitsubishi', 'Suzuki'
  ];
  const allCars: CarProps[] = [];

  try {
    // Fetch cars from multiple manufacturers in parallel
    const promises = popularManufacturers.map(async (make) => {
      try {
        const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&year=${year}&fuel_type=${fuel}`, {
          headers: headers,
        });
        const result = await response.json();
        return Array.isArray(result) ? result : [];
      } catch (error) {
        console.error(`Error fetching cars for ${make}:`, error);
        return [];
      }
    });

    const results = await Promise.all(promises);
    
    // Flatten the results and combine all cars
    results.forEach(cars => {
      if (Array.isArray(cars)) {
        allCars.push(...cars);
      }
    });

    console.log('API Response (multiple manufacturers):', allCars);
    console.log('Total cars fetched:', allCars.length);
    
    return allCars;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

export const calculateCarRent = (
  city_mpg: number | string | undefined,
  year: number | string | undefined
) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  // Handle the case where city_mpg might be a premium subscription message
  if (typeof city_mpg === 'string' && city_mpg.includes('premium subscribers only')) {
    // Use a default MPG value for premium-only fields
    city_mpg = 25;
  }

  const cityMpgNumber = Number(city_mpg);
  const yearNumber = Number(year);

  if (!Number.isFinite(cityMpgNumber) || !Number.isFinite(yearNumber)) {
    return String(basePricePerDay);
  }

  const mileageRate = cityMpgNumber * mileageFactor;
  const ageRate = (new Date().getFullYear() - yearNumber) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

  export const generateCarImageUrl = (car: CarProps, angle? : string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");

    const { make, year, model } = car;

    url.searchParams.append("customer", "img");
    url.searchParams.append("make", make);
    url.searchParams.append("modelFamily", model.split(" ")[0]);
    url.searchParams.append("zoomType", "fullscreen");
    url.searchParams.append("modelYear", String(year));
    if (angle) {
      url.searchParams.append("angle", angle);
    }
   
    return url.toString();
  }

export const updateSearchParams = (type: string, value: string) => {
  const params = new URLSearchParams(window.location.search);
  
  if (value) {
    params.set(type, value.toLowerCase());
  } else {
    params.delete(type);
  }
  
  const newPathname = `${window.location.pathname}?${params.toString()}`;
  return newPathname;
}