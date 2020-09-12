import { getChapterArr, addTotalChaptersToDom } from "./util.js";

(async () => {
  const mangas = document.querySelectorAll(".manga-entry");
  const apiUrl = "https://mangadex.org/api/manga/";
  const lang = !localStorage.getItem("lang")
    ? prompt("Chapters language?", "English")
    : localStorage.getItem("lang");
  localStorage.setItem("lang", lang);

  //Create Stylesheet for Class
  let style = document.createElement("style");
  style.innerHTML = `.totalChapterElement { margin-top: .2rem; box-shadow: 0 0 2px 0 rgba(0,0,0,.4); color: red; font-weight:bold; padding: 0 .5rem; }`;
  document.head.appendChild(style);

  for (let manga of mangas) {
    try {
      const id = manga.getAttribute("data-id");
      const data = await fetch(apiUrl + id).then((res) => res.json());
      let chapterArr = getChapterArr(data.chapter, lang);
      addTotalChaptersToDom(manga, chapterArr);
    } catch (error) {
      continue;
    }
  }
})();
