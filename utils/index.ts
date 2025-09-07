import { CarProps } from "@/types";

export async function fetchCars() {
    const headers = {
		'x-rapidapi-key': '3d067fc9b8mshe08079f7b1a32efp13ae65jsnfd1437f59edf',
		'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
    const response = await fetch ( 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=q3', {
        headers: headers,
    });

    const result = await response.json();
    return result;
}

export const calculateCarRent = (
  city_mpg: number | string | undefined,
  year: number | string | undefined
) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

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