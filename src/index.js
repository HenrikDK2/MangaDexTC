import { compareDate, getChapterArr, addTotalChaptersToDom, createDB } from "./util.js";

(async () => {
  const mangas = document.querySelectorAll(".manga-entry");
  const apiUrl = "https://mangadex.org/api/manga/";
  const lang = !localStorage.getItem("lang")
    ? prompt("Chapters language?", "English")
    : localStorage.getItem("lang");
  localStorage.setItem("lang", lang);
  const db = await createDB();

  //Create Stylesheet for Class
  let style = document.createElement("style");
  style.innerHTML = `.totalChapterElement { margin-top: .2rem; box-shadow: 0 0 2px 0 rgba(0,0,0,.4); color: red; font-weight:bold; padding: 0 .5rem; }`;
  document.head.appendChild(style);

  //From Database first
  for (let manga of mangas) {
    try {
      const id = manga.getAttribute("data-id");
      const obj = await db.get("mangas", id);
      addTotalChaptersToDom(manga, obj);
    } catch (error) {
      continue;
    }
  }

  //Update all data in Database
  for (let manga of mangas) {
    try {
      const id = manga.getAttribute("data-id");
      let test = await db.get("mangas", id);
      if (test && !compareDate(test.data)) continue;
      const data = await fetch(apiUrl + id).then((res) => res.json());
      let chapterArr = getChapterArr(data.chapter, lang);
      await db.put("mangas", { chaptersAmount: chapterArr.length, updated: new Date() }, id);
      addTotalChaptersToDom(manga, await db.get("mangas", id));
    } catch (error) {
      continue;
    }
  }
})();
