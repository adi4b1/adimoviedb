//  // Function to display content based on the URL path
//  function displayContentBasedOnURL() {
//     const path = window.location.pathname;  // Get the current path, e.g. /projects/adi_movie_db/about.html

//     // Hide all sections by default
//     document.getElementById('aboutSection').style.display = 'none';
//     document.getElementById('contactSection').style.display = 'none';

//     // Show content based on the path
//     if (path.includes('about.html')) {
//       document.getElementById('aboutSection').style.display = 'block';
//     } else if (path.includes('contact.html')) {
//       document.getElementById('contactSection').style.display = 'block';
//     } else {
//       // Default to About section (for example, if you're on the index page)
//       document.getElementById('aboutSection').style.display = 'block';
//     }
//   }

//   // Call the function to display content on page load
//   window.onload = displayContentBasedOnURL;


const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNDUyMTI5NS45OTIxNzQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uJv_NTm71exOuzM73L5r3Zsli-7pxcZzf80E9crPXJA",
    },
  };
  let mov = document.getElementById("searchMov");
  let res = document.querySelector(".forDisMov");
  let castDetails=document.querySelector('.casting')

  let sd=document.querySelector('.startDis')
  let spinMain = document.querySelector(".spinner-border");

  let filTre=document.querySelector('#filterTrend')
  spinMain.style.display = "none";
let forLabelMain=document.querySelector('.labelMainDis')

const baseImageUrl = "https://image.tmdb.org/t/p/w300";
let page=1;
// filTre.textContent=''

  filTre.addEventListener('change',(e)=>{
    sd.innerHTML = "";
    
    // console.log('page',page);
    
    page=+e.target.value
    console.log(e.target.value);
    
  //  spinMain.style.display = "block";
  //   spinMain.style.color="black"
    
    setTimeout(()=>{
      page=filTre.value
      if(e.target.value.length===0){
        
        page=1
      }
    //   spinMain.style.display = "block";
    // spinMain.style.color="black"
      getPopular(page)
    },3000)
    
  })

mov.addEventListener("input", (e) => {


res.innerHTML=''

  // vid.innerHTML="";
  // sd.style.display="none";
  if (e.target.value.length > 1) {
  //   getData(e.target.value);
  sd.style.display="none";
    debou(e.target.value||page)
    
  }
  else if(e.target.value.length===0){
    // sd.style.display="block";
    spinMain.style.display = "block";
    spinMain.style.color="black"
    forLabelMain.style.display="block"
    res.innerHTML=''
    // res.style.display="none"
    // sd.style.display="block";
    sd.style.display="flex";
    sd.style.flexDirection="row";
    sd.style.flexWrap="wrap";
    sd.style.gridGap="10px";
  }
});

// if(mov.value.length===0){
//   sd.style.display="block";
// }

const debounce=(fn,t)=>{
  let timer;
  return function(...content){
      clearTimeout(timer)
      timer=setTimeout(()=>{
          fn.apply(this,content)
      },t)
  }
}


const debou=debounce(getData,2000)
  async function getPopular(page){
    sd.innerHTML = "";
    
    const APIPOP=`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
    const popM=await fetch(APIPOP,options)
    const cpop=await popM.json()
    // console.log('cpop',cpop)
    
    res.innerHTML=''
    cpop.results.forEach(async(j)=>{
      
      const movieIdForVideo = `https://api.themoviedb.org/3/movie/${j.id}/videos?language=en-US`;
      const movieActors=`https://api.themoviedb.org/3/movie/${j.id}/credits?language=en-US`
      const [vData,actors] = await Promise.all([
       
        fetch(movieIdForVideo, options),
        fetch(movieActors,options)
      ]);
  
      
      const cvData = await vData.json();
      const credit=await actors.json()
// console.log('ssssssssssssssssssssssssss');
const video = cvData.results.find(
  (vid) => vid.type === "Trailer" || vid.type === "Teaser" && vid.site === "YouTube"
);

let videoEmbed = video
  ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  : "<p>No trailer available.</p>";
      const image_url = j.poster_path
      ? `${baseImageUrl}${j.poster_path}`
      : "images/download.png";

      sd.innerHTML+=`
            <div id="cardBody" class="card">
           <a href="https://adimoviedb-calagubtb-kesavs-projects-429bf22a.vercel.app/about.html?id=${j.id}" style="text-decoration:none;">
                <div>
                    <img src="${image_url}"  class="lazyload" alt="pic">
                </div>
                <div class="movie_title">
                    <p>${j.original_title.substr(0, 20)}</p>
                    <p class="casting"></p>
                    
                </div>
                 </a>
                <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="${
                  j.vote_average
                }" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-success" style="width: ${
                      j.vote_average
                    }%">${j.vote_average}</div>
                </div>
               
                <div class="info">
                    <button id="infoBut" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal-${
                      j.id
                    }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>
                    </button>
                   
                </div>  
            </div>


           


            <div class="modal fade" id="exampleModal-${
          j.id
        }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${j.id}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body movieInfoBody card card-body" style="background-color:black;color:white;">
            <div>
                <img src="${image_url}">
            </div>
            <div class="text-info">
                <h1>${j.title}(${j.release_date})</h1>
                <span>${j.original_language}|${j.release_date}|${j.id}</span>
                <h5>Overview</h5>
                <h3>${j.overview}</h3>
              
                <h5>VoteAverage</h5>
                 <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="${
                   j.vote_average
                 }" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-success" style="width: ${
                      j.vote_average
                    }%">${j.vote_average}%</div>
                </div>            
                   ${videoEmbed}
                  
                
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
      `

      let modals = document.querySelector(`#exampleModal-${j.id} .modal-body .text-info`);
      let modalactors=document.createElement('div')
      modalactors.classList.add('forAcTors_display')
      modals.append(modalactors)
      modalactors.innerHTML+=''
      credit.cast.forEach((actor)=>{
        const actorimage_url = actor.profile_path
        ? `${baseImageUrl}${actor.profile_path}`
        : "images/download.png";
        modalactors.innerHTML+= `           
            <div id="cardBodyActor" class="">
            <a href="https://adimoviedb-calagubtb-kesavs-projects-429bf22a.vercel.app/person.html?id=${actor.id}?name=${actor.name}">
                    <img src="${actorimage_url}" style="width:100px; height:100px;border-radius:50px;" alt="pic">
                    </a>
            </div>
     
        `;
      });
     
      modals.append(modalactors)
    })

  } 
getPopular(page)
// forLabelMain.style.display="block"
// let sp=document.querySelector('.spinner-grow')
  async function getData(value) {
    // document.querySelector('.labelMainDis').style.display="none"
    const trAPI=`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
    const tData=await fetch(trAPI,options)
    const ctData=await tData.json()
    const API = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
    // sp.style.display = "block";
    
      try{
  sd.innerHTML='';
  forLabelMain.innerHTML=''
        // sp.style.display = "block";
    let getData = await fetch(API, options);
    let cd = await getData.json();
  
    // console.log(cd.results)
    let out = cd.results.sort();
    // let src_data="data:image/jpeg;base64,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xVHyiMAJLN3vg08LP1W1A9FlqjEcLO0aJ7HU3owpSHENZu95qNri1tVlGnh2qYnhtdg8Iy6+nc8TXdug0HToeOOkcrkKtFZm1Svw2rweIZedTl4mu7dNYHaND+ekcr2VZqxK7W00jo9TWPI8dJt8bWXSDccFsdszF8h0t/8ARn8Tl7MWyjQ4vc19LGSebgNL/wCNlj96mr8tZkVz4tscp5hfCZ5Ij3B43jf6td96h+K7K8Robmmaydv2HWd/C+33Eq6mVCFeuxH9DnftD/wsVJ1+GzYdJpxCGSI/bY5vwJFj7ldmxH9DnftD/wALFKT1YCIiy2IiICIiAiIgIiICIiDhL80fIrUwcltsoVV7LsNqqlzzE9pcbkNkcGgnnYd3krKlmtf0V9fmnw36kv8ANcn5p8N+pL/NcrrPyoVFetZssw2Gje5jZbtYSPWu5gEqho36owb8wrpY7EXHUPFNQ8URyRT/AGV5Tpc0RVBxQOO7LA3S8t9oPve3PkFO/wA0+G/Ul/muU1cUKivr80+G/Ul/muX0bJ8Mv7Ev81yafNZLZl+glL/uz+JylC6KGkjoKRkVG0MYxoa1o5ADkF3rLYiIg6aumbV07mVDQ5rgQQe8HgV4cuYBBlzDtxhYIZqLu04uJJtc3PkPgsoiAiIgIiICIiAiIgIiICIiAiIgIiIPhFwuv0dn1W/ALtRB1ejs+q34BPR2fVb8Au1EHBkYZ7AA8hZc0RAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf//Z"
    out.forEach(async (i) => {
      // let modal=document.querySelector(`#exampleModal`)
      // modal.append('id is ',i.id)
      // console.log(modal);
      
      const movieIdApi = `https://api.themoviedb.org/3/movie/${i.id}?language=en-US`;
      const movieIdForVideo = `https://api.themoviedb.org/3/movie/${i.id}/videos?language=en-US`;
      const movieActors=`https://api.themoviedb.org/3/movie/${i.id}/credits?language=en-US`
     
      try{
      const [movieData, vData,actors] = await Promise.all([
          fetch(movieIdApi, options),
          fetch(movieIdForVideo, options),
          fetch(movieActors,options)
        ]);
    
        const midata = await movieData.json();
        const cvData = await vData.json();
        const credit=await actors.json()

       
        //for getting movie details based on movie id
        // console.log(credit);
        
      //   console.log("getdata", midata);
    
        ////for getting movie videos based on movie id
        // console.log("this is the v", cvData);
        castDetails=' '
        castDetails.className='mainActorDisplay'
       
        
        credit.cast.forEach((actor)=>{
            const actorimage_url = actor.profile_path
            ? `${baseImageUrl}${actor.profile_path}`
            : "images/download.png";
            castDetails += `           
                <div id="cardBodyActor" class="">
                        <img src="${actorimage_url}" style="width:100px; height:100px;border-radius:50px;" alt="pic">
                        
                </div>
         
            `;
        })
        // forVid=' ';
        // cvData.results.forEach((video) => {
        //     if (video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")) {
        //       forVid+= `
        //         <iframe width="560" height="315" 
        //           src="https://www.youtube.com/embed/${video.key}" 
        //           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        //           allowfullscreen></iframe>`;
        //     }
        //   });
        // cvData.results.forEach((i)=>{
        //     forVid+=`<iframe width="560" height="315" src="https://www.youtube.com/embed/${i.key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        // })
        // console.log(castDetails);
       
       
        const video = cvData.results.find(
            (vid) => vid.type === "Trailer" || vid.type === "Teaser" && vid.site === "YouTube"
        );

        let videoEmbed = video
            ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            : "<p>No trailer available.</p>";
        // let castNames=cast?
        // `<p class="casting">${credit.cast.name}</p>`:'no cast found';
    //   let datag;
      
    //   let vidDiv=document.createElement('div')
    //     vidDiv.classList.add('videoBody')
    //     vidDiv.classList.add('videoBody')

     
    //    getMovieVideos(cvData,i.id)

        const image_url = i.poster_path
          ? `${baseImageUrl}${i.poster_path}`
          : "images/download.png";

        //console.log(i.title)
        res.innerHTML += `
         
            <div id="cardBody" class="card">
           <a href="https://adimoviedb-calagubtb-kesavs-projects-429bf22a.vercel.app/about.html?id=${i.id}" style="text-decoration:none;">
                <div>
                    <img src="${image_url}"  alt="pic">
                </div>
                <div class="movie_title">
                    <p>${i.original_title.substr(0, 20)}</p>
                    <p class="casting"></p>
                    
                </div>
                 </a>
                <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="${
                  i.vote_average
                }" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-success" style="width: ${
                      i.vote_average
                    }%">${i.vote_average}</div>
                </div>
               
                <div class="info">
                    <button id="infoBut" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal-${
                      i.id
                    }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>
                    </button>
                   
                </div>  
            </div>






            <!-- Modal -->
    <div class="modal fade" id="exampleModal-${
          i.id
        }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${i.id}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body movieInfoBody card card-body" style="background-color:black;color:white;">
            <div>
                <img src="${image_url}">
            </div>
            <div class="text-info">
                <h1>${i.title}(${i.release_date})</h1>
                <span>${i.original_language}|${i.release_date}|${i.id}</span>
                <h5>Overview</h5>
                <h3>${i.overview}</h3>
              
                <h5>VoteAverage</h5>
                 <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="${
                   i.vote_average
                 }" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-success" style="width: ${
                      i.vote_average
                    }%">${i.vote_average}%</div>
                </div>            
                   ${videoEmbed}
                  
                
            </div>
            
            
          </div>
        </div>
      </div>
    </div>`
    let modal = document.querySelector(`#exampleModal-${i.id} .modal-body .text-info`);
    let modalactors=document.createElement('div')
    modalactors.classList.add('forAcTors_display')
    modal.append(modalactors)
    modalactors.innerHTML+=''
    credit.cast.forEach((actor)=>{
      const actorimage_url = actor.profile_path
      ? `${baseImageUrl}${actor.profile_path}`
      : "images/download.png";
      modalactors.innerHTML+= `           
          <div id="cardBodyActor" class="">
          <a href="https://adimoviedb-calagubtb-kesavs-projects-429bf22a.vercel.app/person.html?id=${actor.id}?name=${actor.name}">
                  <img src="${actorimage_url}" style="width:100px; height:100px;border-radius:50px;" alt="pic">
                  </a>
          </div>
   
      `;
    });
   
    modal.append(modalactors)
    // if (modal) {
    //   modal.innerHTML = `
        
    //   `;
    // } else {
    //   console.error(`Modal with ID exampleModal-${i.id} not found`);
    // }
    
    
    
            ;  
     }catch(err){
      console.error('Error fetching search results:', err);
     }
    });
  }catch (err) {
      console.error('Error fetching search results:', err);
  }finally{
    // sp.style.display = "none";
    console.log('spinner');
    
   }
  }


//   function getMovieVideos(cvData,out){
//     // let d=cvData.results.filter((j)=>j.id===i.id)

//     console.log(out,'outttttttttttt');
//     let vidBody=document.querySelector(`.vb`)
//     console.log(vidBody,'adi');
//     if (!vidBody) {
//         console.log('No existing .vb element found, creating one.');
//         vidBody = document.createElement('div');
//         vidBody.classList.add('vb');
//         document.body.appendChild(vidBody); // Append to body (or another parent element)
//     } else {
//         console.log('Found existing .vb element:', vidBody);
//     }
//     //   console.log('dddddddddddddddddddd',d);
//     // let vidBody='';
      
//       if(cvData.id===out){
        
//         //   datag=cvData.results
//           // console.log('datag',datag);
//           if(cvData.results.length>0){
//             vidBody.innerHTML = '';
//             // console.log('vidBody',vidBody);
            
//             // if(!vidBody){
//             //     vidBody = document.createElement('div');
//             //     // vidBody.textContent+="hlo"
//             //     // console.log(vidBody);
                
//             //     vidBody.classList.add('vb');
//             //     // document.body.appendChild(vidBody)
//             //     // vidBody.appendChild(videoElement)
//             //     // console.log('sdsds',vidBody);
//             //     // vidBody.append(videoElement)
//             //     // document.body.appendChild(vidBody); 
//             // }
//             // vidBody.innerHTML=''
//                 cvData.results.forEach((item)=>{
//                 const videoKey = item.key;  // Assuming this is the YouTube video key
//                 // const videoURL = `https://www.youtube.com/embed/${videoKey}`;  // Full embed URL
//                 // console.log(videoURL);
//                 const videoElement = document.createElement("iframe");
//                 videoElement.width = 560; // Set video width
//                 videoElement.height = 315; // Set video height
//                 videoElement.src = `https://www.youtube.com/embed/${videoKey}`; // Correct YouTube embed URL with "https"
//                 videoElement.frameborder = 0;
//                 videoElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
//                 videoElement.allowfullscreen= true;
                
//                 // vidBody.textContent+="adi"
             
//                 vidBody.appendChild(videoElement)
                
//               }) 
//           }else{
//               console.log('no trailers found');
//               vidBody.innerHTML = `<p>No trailers available for this movie.</p>`;
//           } 
//       }
//       return vidBody
//       //   return data;
//    }
