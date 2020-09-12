const mangas = document.querySelectorAll(".manga-entry");
const apiUrl = "https://mangadex.org/api/manga/";
const lang = "English";
(async () => {
  //Create Stylesheet for Class
  let style = document.createElement("style");
  style.innerHTML =
    ".totalChapterElement { box-shadow: 0 0 2px 0 rgba(0,0,0,.4); color: red; font-weight:bold; padding: 0 .5rem; }";
  document.head.appendChild(style);

  for (let manga of mangas) {
    const id = manga.getAttribute("data-id");
    const data = await fetch(apiUrl + id).then((res) => res.json());
    let chapterArr = getChapterArr(data.chapter);
    addTotalChaptersToDom(manga, chapterArr);
  }
})();

function addTotalChaptersToDom(manga, chapterArr) {
  //Add chapterCount into DOM
  if (!manga.querySelector(".totalChapterElement")) {
    let chapterCountElm = document.createElement("li");
    chapterCountElm.classList.add("list-inline-item", "totalChapterElement");
    chapterCountElm.innerHTML = `<span>${chapterArr.length}</span>`;
    manga.querySelector(".list-inline").append(chapterCountElm);
  } else {
    chapterCountElm.innerHTML = `<span>${chapterArr.length}</span>`;
  }
}

function getChapterArr(chapterObj) {
  let mySet = new Set();

  //Filter by Language and removes Chapter duplicates.
  return Object.keys(chapterObj).filter((id) => {
    if (chapterObj[id]["lang_name"] === lang) {
      let key = chapterObj[id].chapter,
        isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    }
  });
}
