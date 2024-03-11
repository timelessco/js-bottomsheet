export async function fetchAllShows() {
  const shows = await fetch(
    "https://strapi.tmls.dev/api/genres?sort[0]=id&fields[0]=name&populate[shows][sort][0]=id&populate[shows][fields][0]=key&populate[shows][fields][1]=name&populate[shows]&populate[shows][populate][poster][fields][0]=hash&populate[shows][populate][poster][fields][1]=src&populate[shows][populate][banner][fields][0]=hash&populate[shows][populate][banner][fields][1]=src",
  )
    .then(res => res.json())
    .then(async json => {
      const res = json.data[0].shows;
      return res;
    });
  return shows;
}
export async function getIndividualShows(key) {
  const products = await fetch(
    `https://strapi.tmls.dev/api/shows?filters[key][$eq]=${key}&populate=%2A`,
  )
    .then(res => res.json())
    .then(async json => {
      return json.data[0];
    });
  return products;
}
