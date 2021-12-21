const base_url = "http://127.0.0.1:9001/";

const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};
const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};
const key = "0e249adac7b8487982dbe5a732ef0227";
const currentYear = new Date().getFullYear();
const currentDay = getCurrentDay();
const currentMonth = getCurrentMonth();
const curentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
const popular_games = `games?key=${key}&dates=${lastYear},${curentDate}&ordering=-rating&page_size=10`;
const upcoming_games = `games?key=${key}&dates=${curentDate},${nextYear}&ordering=-added&page_size=10`;
const newGames = `games?key=${key}&dates=${lastYear},${curentDate}&ordering=-released&page_size=10`;
export const popularGamesURL = () => `${base_url}${popular_games}`;
export const upcomingGamesURL = () => `${base_url}${upcoming_games}`;
export const newGamesURL = () => `${base_url}${newGames}`;
export const gameDetailsURL = (game_id) =>
  `${base_url}games/${game_id}?key=${key}`;
export const gameScreenshotURL = (game_id) =>
  `${base_url}games/${game_id}/screenshots?key=${key}`;

export const imagesURL = () => "https://openslide-demo.s3.dualstack.us-east-1.amazonaws.com/info.json"

export const largeimageURL = (image_id) =>
  `${base_url}pathology/pathologypictureitems/${image_id}/history/?format=json`;


export const largeimageLabelitemsURL = (image_id) =>
`${base_url}pathology/pathologypictureitems/${image_id}/labelitems/`;

export const eachlargeimageLabelitemsURL = (image_id,id) =>
`${base_url}pathology/pathologypictureitems/${image_id}/labelitems/${id}/`;
