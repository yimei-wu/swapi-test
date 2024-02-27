
/*
  Fate una funzione per rispondere a ciiascuna domanda
    - fetchare della risorsa
    - manipolare il dato per arrivare alla risposta
    - inserire la risposta dentro al footer della carta
  
*/


window.addEventListener('DOMContentLoaded', () => {
    main();
  });
  
  async function main(resource) {
    answerTwo()
    
  }
  
  async function answerTwo() {
    // fetch dei dati
      
    const starships = await fetchAll('starships')
  
    /*
  
    // manipolazione dei dati
      // ricavare i dati specifici di starships (crew e passengers)
      for (const starship of starships) {
        let crew = await parseInt(starship.crew)
        // console.log(crew)
        let passengers = parseInt(starship.passengers)
        // console.log(passengers)
        // sommare i due dati
          // se sommo crew e passengers mi darà la somma di tutto?
        let sum = crew + passengers
        console.log(sum)
      }
  
    */
    
    /*
    const capacity = parseInt(starships.crew + starships.passengers)
    console.log(capacity)
    for (const starship of starships) {
  
    }
    */
  
    // RISPOSTA 1
  
    async function answer1() {
      const starships = await fetchAll('starships');
      const speeds = starships
        .map(({ MGLT, name }) => ({ speed: parseInt(MGLT), name }))
        .filter(s => !isNaN(s.speed))
        .sort((a, b) => b.speed - a.speed);
      // console.log({ speeds });
    
      injectAnswer(speeds[0], 1);
    }
  
   
    // RISPOSTA 2
  
    async function answer2() {
      let starships = await fetchAll('starships');
      starships = starships.map(s => ({
        name: s.name,
        capacity: parseInt(s.crew.replace(',', '')) + parseInt(s.passengers.replace(',', ''))
      }))
      starships = starships.filter(s => !isNaN(s.capacity))
    
      let maxStarship = starships[0];
      for (const starship of starships) {
        if (starship.capacity > maxStarship.capacity) {
          maxStarship = starship;
        }
      }
      console.log({maxStarship})
    
      injectAnswer(`${maxStarship.name}'s capacity: ${maxStarship.capacity}`, 2);
    }
  
  }
  
  async function fetchAll(resource) {
    const res = await fetch(`https://swapi.dev/api/${resource}/`);
    const json = await res.json();
  
    const count = json.count;
  
    const promises = [];
    for (let i = 1; i <= count; i++) {
      promises.push(fetch(`https://swapi.dev/api/${resource}/${i}/`));
    }
    const response = (await Promise.all(
      promises
        .map(p => p.then(r => r.json())))
    ).filter(starship => starship.name);
    // const starships = response.filter(s => s.name)
  
    return response;
  }