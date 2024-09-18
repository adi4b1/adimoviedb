const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNDUyMTI5NS45OTIxNzQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uJv_NTm71exOuzM73L5r3Zsli-7pxcZzf80E9crPXJA",
  },
};
let urlid;
const baseImageUrl = "https://image.tmdb.org/t/p/w300";
let image = document.querySelector(".imageContainer");
let info = document.querySelector(".movieInfo");
let im = document.createElement("img");
let castCon = document.querySelector(".castConatainer");
let crewCon = document.querySelector(".crewConatainer");
let movieVideo = document.querySelector(".videos");
let img = document.createElement("img");
let spin = document.querySelector(".d-flex .spinner-border");
let firstBlock = document.querySelector(".aboutBody");
function getId() {
  let url = new URLSearchParams(window.location.search);

  urlid = +url.get("id");
  // console.log(typeof urlid);
  return urlid;
}

function disId() {
  let movieId = getId();
  // document.querySelector('.movieId').innerText=`Movie ID: ${movieId}`;
}

window.onload = disId;

// setTimeout(()=>{
//     getMovieData()
// },2000)

async function getMovieData() {
  let movieId = getId();
  const movieIdApi = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const movieIdForVideo = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  const movieActors = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  spin.style.display = "block";
  // firstBlock.style.display="none"
  try {
    const [movieData, vData, actors] = await Promise.all([
      fetch(movieIdApi, options),
      fetch(movieIdForVideo, options),
      fetch(movieActors, options),
    ]);

    const midata1 = await movieData.json();
    const cvData1 = await vData.json();
    const credit1 = await actors.json();
    // console.log("dfdff", midata1);
    // console.log(cvData1);
    //   castCon=' '
    credit1.cast.forEach((i) => {
      let name_type=i.name.split(' ').join('-')
      let upgrade_name=name_type
      const actor_image = i.profile_path
        ? `${baseImageUrl}${i.profile_path}`
        : "images/download.png";

      castCon.innerHTML += `
         <a href="/projects/adi_movie_db/person.html?id=${i.id}?name=${upgrade_name}" style="text-decoration:none;">
        <div id="cardBodyActorI" class="card">
                        <img src="${actor_image}" class="lazyload"  style="width:100px; height:100px;border-radius:50px;" alt="pic">               
                        <p>${i.name.substr(0, 15)}</p>
                        <small>${i.character.substr(0, 15)}</small>
                </div>
                </a>
        `;
    });

    ////crewwwwwwwwwwwww
// let name="adi kesavulu mitnala"
// let rest=name.split(' ').join('@')
// console.log('name',rest);

    credit1.crew.forEach((i) => {
      let name_type=i.name.split(' ').join('-')
      let upgrade_name=name_type
      const actor_image = i.profile_path
        ? `${baseImageUrl}${i.profile_path}`
        : "images/download.png";

      crewCon.innerHTML += `
        <a href="/projects/adi_movie_db/person.html?id=${i.id}?name=${upgrade_name}" style="text-decoration:none;">
        <div id="cardBodyActorI" class="card">
                        <img src="${actor_image}" class="lazyload"  style="width:100px; height:100px;border-radius:50px;" alt="pic">               
                        <p>${i.name.substr(0, 15)}</p>
                        <small>${i.job.substr(0, 20)}</small>
                </div>
                </a>
        `;
    });

    //   console.log(cvData1)
    const image_url = midata1.poster_path
      ? `${baseImageUrl}${midata1.poster_path}`
      : "images/download.png";

    im.src = `${image_url}`;
    //   console.log(im);
    im.classList.add('posteR_size')
    image.append(im);

    let ge = "";

    let gen_ = document.createElement("small");
    let gen_res = midata1.genres.map((i) => " " + i.name);
    for (let j of gen_res) {
      // console.log(j);
      ge += j + ",";
    }
    gen_ = ge;

    let pc = "";
    let product_companies = document.createElement("p");
    let pro_com = midata1.production_companies.map((pc) => pc.name + `\n`);
    for (let i of pro_com) {
      pc += "🎥 " + i;
    }
    product_companies = pc;
    let h1 = document.createElement("h1");
    h1.classList.add("movie_title");
    h1.innerHTML = `${midata1.title} (${midata1.original_title.substr(
      0,
      15
    )}...)`;


  
    // let h2 = document.createElement("small");
    // h2.classList.add("date");
    // h2.textContent = midata1.release_date;

    let overview = document.createElement("p");
    overview.classList.add('ovw')
    overview.textContent = midata1.overview;

    let budget = document.createElement("small");
    budget.classList.add('bud')
    budget.innerHTML = `Budget : $ ` + midata1.budget + ` Revenue : $`+ midata1.revenue;

    let release_date = document.createElement("small");
    release_date.classList.add('rd')

    release_date.innerHTML = `release date : `+ midata1.release_date.toLocaleString();

    let tag_line = document.createElement("small");
    tag_line.classList.add('tl')
    tag_line.innerHTML = (midata1.tagline)?`🏷️ ` + midata1.tagline:'';
    //   gen_.textContent=`${gen}`
    info.append(
      h1,
      // h2,
      overview,
      gen_,
      budget,
      release_date,
      tag_line,
      product_companies
    );
    let s = document.createElement("strong");
    s.classList.add("tick");
    cvData1.results.forEach((i) => {
      let icon = "";
      if (i.official === true) {
        icon += true;
      }
      

      let icondis = icon
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>`
        : "";
      movieVideo.innerHTML += `
        <div style="display:flex;flex-direction:column;" class="videos_sub">
         <iframe width="560" height="315"  class="lazyload mVideo"
                 src="https://www.youtube.com/embed/${i.key}?enablejsapi=1" 
                   frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen></iframe>
        <p class="movie__title" data-bs-toggle="tooltip" data-bs-title="aeraer">${i.name.substr(0, 100)}</p>
        <small class="movie__pub_date">⏱️ ${i.published_at.toLocaleString(
          "en-GB"
        )}&nbsp; ${icondis}</small>
        </div>
        `;

        // Function to pause all videos

 // Function to pause all videos
function pauseAllVideos() {
  const allIframes = document.querySelectorAll('.videos_sub iframe');
  allIframes.forEach((iframe) => {
    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  });
}

// Event listener for hover
movieVideo.addEventListener('mouseenter', (e) => {
  // Check if the target or its parent has the "videos_sub" class
  const videosSub = e.target.closest('.videos_sub');
  
  if (videosSub) {
    // Pause all other videos first
    pauseAllVideos();
    
    // Get the specific iframe within the hovered .videos_sub
    const ve = videosSub.querySelector('iframe');
    
    if (ve) {
      ve.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  }
}, true); // Use capturing to ensure it applies to descendants

// Event listener for leaving hover
movieVideo.addEventListener('mouseleave', (e) => {
  const videosSub = e.target.closest('.videos_sub');
  
  if (videosSub) {
    const iframeElement = videosSub.querySelector('iframe');
    
    if (iframeElement) {
      iframeElement.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }
}, true); // Use capturing to ensure it applies to descendants
        

          });
  } catch (error) {
    console.log(error);
  } finally {
    spin.style.display = "none";
  }
}

getMovieData();
