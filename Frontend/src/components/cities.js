var states = [
  "California",
  "Texas",
  "Florida",
  "New York",
  "Illinois",
  "Pennsylvania",
  "Ohio",
  "Georgia",
  "North Carolina",
  "Michigan"
];

var cities = new Array();
cities[0] = ""; // For empty selection

cities[1] = " Los Angeles | San Diego | San Francisco | Sacramento | San Jose | Fresno | Oakland | Long Beach | Anaheim | Santa Ana | Riverside ";
cities[2] = " Houston | San Antonio | Dallas | Austin | Fort Worth | El Paso | Arlington | Corpus Christi | Plano | Lubbock | Irving ";
cities[3] = " Miami | Orlando | Tampa | Jacksonville | Tallahassee | Fort Lauderdale | St. Petersburg | Hialeah | Gainesville | Boca Raton | Sarasota ";
cities[4] = " New York City | Buffalo | Rochester | Albany | Syracuse | Yonkers | Binghamton | Ithaca | White Plains | Schenectady | New Rochelle ";
cities[5] = " Chicago | Aurora | Naperville | Rockford | Joliet | Springfield | Elgin | Peoria | Waukegan | Champaign | Evanston ";
cities[6] = " Philadelphia | Pittsburgh | Allentown | Erie | Reading | Scranton | Bethlehem | Lancaster | Harrisburg | York | Altoona ";
cities[7] = " Columbus | Cleveland | Cincinnati | Toledo | Akron | Dayton | Parma | Canton | Youngstown | Lorain | Hamilton ";
cities[8] = " Atlanta | Augusta | Columbus | Savannah | Athens | Sandy Springs | Macon | Roswell | Albany | Marietta | Valdosta ";
cities[9] = " Charlotte | Raleigh | Greensboro | Durham | Winston-Salem | Fayetteville | Cary | Wilmington | High Point | Asheville | Concord ";
cities[10] = " Detroit | Grand Rapids | Warren | Sterling Heights | Ann Arbor | Lansing | Flint | Dearborn | Livonia | Troy | Westland ";

const newCity = print_city();

function print_city(city_id, city_index) {
  let newData = [];
  cities.forEach((element) => {
    let data = element.split("|");
    newData.push(data);
  });
  return newData;
}

export { newCity, states };
