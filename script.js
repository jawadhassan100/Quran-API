console.log("js connected");
const Form = document.querySelector("form");
const GetAll = document.getElementById("getAll");
const Detail = document.getElementById("detail-div");
const loading = document.getElementById("loading");

loading.style.display = "none";

GetAll.addEventListener("click", async (event) => {
  event.preventDefault();
  Detail.innerHTML = "";
  Detail.innerHTML;
  try {
    loading.style.display = "";

    const sn = Form.sn.value;
    // const res = await fetch(`http://api.alquran.cloud/v1/surah/${sn}`);
    const res = await fetch(`https://api.alquran.cloud/v1/surah`);
    const json = await res.json();
    console.log(json);
    if (json.code === 404) {
      Detail.innerHTML += `
        <div class="card p-3 mt-3" id="detail-section">
        <div class="d-flex  justify-content-center w-100">
        <p>${json.data}</p>
        </div>
        </div>
        `;
    } else {
      json.data.forEach((item) => {
        Detail.innerHTML += `
        <div class="card p-3 mt-3" id="detail-section">
        <h3>${item.englishName}</h3>
        <hr />
        <div class="d-md-flex justify-content-center w-100">

        <div class="d-flex  justify-content-center w-100">
        <p class="fw-bold mx-2">Name: </h2>
        <p>${item.name}</p>
        </div>

        <div class="d-flex  justify-content-center w-100">
        <p class="fw-bold mx-2">Meaning: </h2>
        <p>${item.englishNameTranslation}</p>
        </div>

        <div class="d-flex  justify-content-center w-100">
        <p class="fw-bold mx-2">No of Ayat: </h2>
        <p>${item.numberOfAyahs}</p>
        </div>

        <div class="d-flex  justify-content-center w-100">
        <p class="fw-bold mx-2">Revelation: </h2>
        <p>${item.revelationType}</p>
        </div>
  `;
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
  }
});
//

Form.addEventListener("submit", async (event) => {
  event.preventDefault();
  Detail.innerHTML = "";
  Detail.innerHTML;
  try {
    loading.style.display = "";
    const sn = Form.sn.value;
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${sn}`);
    // const res = await fetch(`http://api.alquran.cloud/v1/surah`);
    const json = await res.json();
    console.log(json);
    if (json.code === 404) {
      Detail.innerHTML += `
        <div class="card p-3 mt-3" id="detail-section">
        <div class="d-flex  justify-content-center w-100">
        <p>${json.data}</p>
        </div>
        </div>
        `;
    } else {
      Detail.innerHTML = `
        <div class="card p-3 mt-3 d-flex justify-content-between align-items-center" id="detail-section">
          <div class="d-flex w-100 justify-content-between">
            <h3 class="fw-bolder">${json.data.englishName}</h3> 
            <button class="btn btn-dark " id="getTrans" onclick="getTranslation()"><strong>Aduio</strong> </button>
          </div>   
          <hr />
          <div class="d-md-flex  justify-content-center w-100">
            <div class="d-flex  justify-content-center w-100">
              <p class="fw-bold mx-2">Name: </h2>
              <p class="fw-bold" >${json.data.name}</p>
            </div>

            <div class="d-flex  justify-content-center w-100">
              <p class="fw-bold mx-2">Meaning: </h2>
              <p class="fw-bold">${json.data.englishNameTranslation}</p>
            </div>

            <div class="d-flex  justify-content-center w-100">
              <p class="fw-bold mx-2">No of Ayat: </h2>
              <p class="fw-bold">${json.data.numberOfAyahs}</p>
            </div>

            <div class="d-flex  justify-content-center w-100">
              <p class="fw-bold mx-2">Revelation: </h2>
              <p class="fw-bold">${json.data.revelationType}</p>
            </div> 
          </div>
        </div>
        
  `;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
  }
});

async function getTranslation() {
  const sn = Form.sn.value;
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${sn}`);
  // const res = await fetch(`http://api.alquran.cloud/v1/surah`);
  const json = await res.json();
  Detail.innerHTML = `<div style="display:flex; justify-content:center;"><audio controls>
               <source src="https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${sn}.mp3" type="audio/mpeg">
               Your browser does not support the audio element.
               </audio></div> `;
}
