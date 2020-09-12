import { getChapterArr, addTotalChaptersToDom } from "./util.js";

(async () => {
  const mangas = document.querySelectorAll(".manga-entry");
  const apiUrl = "https://mangadex.org/api/manga/";
  const lang = "English";

  //Create Stylesheet for Class
  let style = document.createElement("style");
  style.innerHTML =
    ".totalChapterElement { box-shadow: 0 0 2px 0 rgba(0,0,0,.4); color: red; font-weight:bold; padding: 0 .5rem; }";
  document.head.appendChild(style);

  for (let manga of mangas) {
    const id = manga.getAttribute("data-id");
    const data = await fetch(apiUrl + id).then((res) => res.json());
    let chapterArr = getChapterArr(data.chapter, lang);
    addTotalChaptersToDom(manga, chapterArr);
  }
})();
