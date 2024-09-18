const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5N2NkMWY2ZDIwMjRkZjQ1NzM2MDJlYTQ3Nzg2OTg0NCIsIm5iZiI6MTcyNDUyMTI5NS45OTIxNzQsInN1YiI6IjYzY2EzYzAwYmIwNzBkMDA4NGU0NDQ0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uJv_NTm71exOuzM73L5r3Zsli-7pxcZzf80E9crPXJA",
    },
  };


  let pid;
  const baseImageUrl = "https://image.tmdb.org/t/p/w300";
function getPersonId(){
    let url=new URLSearchParams(window.location.search)
    pid=url.get("id")
    
    
    let pcId=pid.split('?')[0]
    // console.log('pid',pcId);
    let csN=+pcId
    
    return csN
}
let nameP;
function getName() {
    let url = new URLSearchParams(window.location.search);
    nameP = url.get('id',"name");  // Use 'name' instead of 'id' to get the name parameter from the URL
    let na=nameP.split('?')[1]
    let rname=na.split('=')[1]
   
    console.log('namep',rname);
    
    if (rname) {
      let decodedName = decodeURIComponent(rname.replace(/-/g, " "));
    //   console.log('decodedName',decodedName);
      return decodedName;
    }
    return "";
  }
function getPId(){
    let personIndvidialId=getPersonId()
    let persontoIdName=getName()
}
window.onload=getPId;

let pimage=document.querySelector('.personimageContainer')

let personInfor=document.querySelector('.personInfo')

let mainPersonBody=document.querySelector('.personDetails')

let known=document.querySelector('.knownFor')
let pin=document.querySelector('.PersonalInform')
let am=document.querySelector('.allMovies')
let er=document.querySelector('.extraRoles')
async function getPersonData() {
  known.innerHTML=``
    let personIndvidialId = getPersonId();
    let persontoIdName=getName()
    // console.log('sdsds',persontoIdName);
    
    const personIdApi = `https://api.themoviedb.org/3/person/${personIndvidialId}?language=en-US`;
    const personToId = `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(persontoIdName)}&include_adult=false&language=en-US&page=1`;
   console.log(personToId);
    const allMovies=`https://api.themoviedb.org/3/person/${personIndvidialId}/combined_credits?language=en-US`
   
    try {

        const[p1,p2,p3]=await Promise.all([
            fetch(personIdApi,options),
            fetch(personToId,options),
            fetch(allMovies,options)
        ]);


      
      const cpd=await p1.json()
      console.log('sdfsdfs',cpd);
      const ctod=await p2.json()
      // console.log('sdfsdf',ctod);
      
      const allM=await p3.json()
      console.log(allM);
      
   
      const perimage = cpd.profile_path
      ? `${baseImageUrl}${cpd.profile_path}`
      : "images/download.png";
     
    pimage.innerHTML=`
    <img src="${perimage}" class="per_image_photo lazyload"/>
    
    `;
      let d=allM.cast.slice(0,5)
      // console.log(d);
      
    // personInfor.insertAdjacentHTML('afterend',known)
    d.forEach((i)=>{

      const pcimage = i.poster_path
          ? `${baseImageUrl}${i.poster_path}`
          : "images/download.png";
      
         
      known.innerHTML+=`

        <div id="pcardBody" class="card">
        
           <a href="https://adimoviedb-calagubtb-kesavs-projects-429bf22a.vercel.app/projects/adi_movie_db/about.html?id=${i.id}" style="text-decoration:none;">
                <div>
                    <img src="${pcimage}" class="card_image_photo lazyload" alt="pic">
                </div>
                <div class="movie_title">
                    <p>${i.original_title}</p>
                   
                    
                </div>
                 </a>
        </div>
      
      `
    })
    
    let akai=''
    for(let i in cpd.also_known_as){
      
        akai+=cpd.also_known_as[i]+' , '
       
    }
    console.log(akai);
    

    let gen=`${cpd.gender}`==='2'?'Male':'Female';
    pin.innerHTML+=`
    
        <h3>${cpd.name}</h3>
        <h6><b>Gender</b></h6>
        <small>${gen}</small>
        <h6><b>Known For Department</b></h6>
        <small>${cpd.known_for_department}</small>
        <hr>
        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cake2" viewBox="0 0 16 16">
  <path d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683q-.224.051-.432.107c-.702.187-1.305.418-1.745.696C.408 5.56 0 5.954 0 6.5v7c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 15.773 5.898 16 8 16s4.022-.227 5.432-.603c.701-.187 1.305-.418 1.745-.696.415-.261.823-.655.823-1.201v-7c0-.546-.408-.94-.823-1.201-.44-.278-1.043-.51-1.745-.696A12 12 0 0 0 13 4.496v-2.69a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 12 1.813V4.3a22 22 0 0 0-2-.23V1.806a.747.747 0 0 0 .092-1.004l-.598-.79-.595.792A.747.747 0 0 0 9 1.813v2.204a29 29 0 0 0-2 0V1.806A.747.747 0 0 0 7.092.802l-.598-.79-.595.792A.747.747 0 0 0 6 1.813V4.07c-.71.05-1.383.129-2 .23V1.806A.747.747 0 0 0 4.092.802zm-.668 5.556L3 5.524v.967q.468.111 1 .201V5.315a21 21 0 0 1 2-.242v1.855q.488.036 1 .054V5.018a28 28 0 0 1 2 0v1.964q.512-.018 1-.054V5.073c.72.054 1.393.137 2 .242v1.377q.532-.09 1-.201v-.967l.175.045c.655.175 1.15.374 1.469.575.344.217.356.35.356.356s-.012.139-.356.356c-.319.2-.814.4-1.47.575C11.87 7.78 10.041 8 8 8c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 6.639 1 6.506 1 6.5s.012-.139.356-.356c.319-.2.814-.4 1.47-.575M15 7.806v1.027l-.68.907a.94.94 0 0 1-1.17.276 1.94 1.94 0 0 0-2.236.363l-.348.348a1 1 0 0 1-1.307.092l-.06-.044a2 2 0 0 0-2.399 0l-.06.044a1 1 0 0 1-1.306-.092l-.35-.35a1.935 1.935 0 0 0-2.233-.362.935.935 0 0 1-1.168-.277L1 8.82V7.806c.42.232.956.428 1.568.591C3.978 8.773 5.898 9 8 9s4.022-.227 5.432-.603c.612-.163 1.149-.36 1.568-.591m0 2.679V13.5c0 .006-.012.139-.356.355-.319.202-.814.401-1.47.576C11.87 14.78 10.041 15 8 15c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575-.344-.217-.356-.35-.356-.356v-3.02a1.935 1.935 0 0 0 2.298.43.935.935 0 0 1 1.08.175l.348.349a2 2 0 0 0 2.615.185l.059-.044a1 1 0 0 1 1.2 0l.06.044a2 2 0 0 0 2.613-.185l.348-.348a.94.94 0 0 1 1.082-.175c.781.39 1.718.208 2.297-.426"/>
</svg>&nbsp;&nbsp;${cpd.birthday}</p>

<p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg>&nbsp;&nbsp;${cpd.place_of_birth}</p>

<small><b>Nicknames:</b></small><br>
${akai}

    `
    personInfor.innerHTML+=`
     <p class="bioClass">${cpd.biography}</p>
        
    
    `

 am.innerHTML+=''
 er.innerHTML+=''
    allM.cast.forEach((i)=>{
     
      const allcimage = i.poster_path
          ? `${baseImageUrl}${i.poster_path}`
          : "images/download.png";
      
      am.innerHTML+=`
       <div id="pcardBody" class="">
        
           <a href="https://adimoviedb-calagubtb-kesavs-projects-429bf22a.vercel.app/projects/adi_movie_db/about.html?id=${i.id}" style="text-decoration:none;">
                <div>
                    <img src="${allcimage}" class="card_image_photo lazyload" alt="pic">
                </div>
                <div class="movie_title">
                    <p>${i.original_title||i.original_name}</p> 
                </div>
                 </a>
        </div>
      
      
      `

      
    })


    allM.crew.forEach((i)=>{
     
      const allcimage = i.poster_path
          ? `${baseImageUrl}${i.poster_path}`
          : "images/download.png";
      
      er.innerHTML+=`
       <div id="pcrecardBody" class="card">
        
           <a href="https://adimoviedb-calagubtb-kesavs-projects-429bf22a.vercel.app/projects/adi_movie_db/about.html?id=${i.id}" style="text-decoration:none;">
                <div>
                    <img src="${allcimage}" class="card_image_photo lazyload" alt="pic">
                </div>
                <div class="movie_title">
                    <p>${i.original_title||i.original_name}</p> 
                    <p>${i.job}</p> 
                </div>
                 </a>
        </div>
      
      
      `

      
    })



    } catch (error) {
      console.log(error);
    } 
  }
  
  getPersonData();
