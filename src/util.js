import { openDB } from "idb";

//Filter by Language and removes Chapter duplicates.
export function getChapterArr(chapterObj, lang) {
  let mySet = new Set();

  return Object.keys(chapterObj).filter((id) => {
    if (chapterObj[id]["lang_name"].toLowerCase().search(lang.toLowerCase()) > -1) {
      let key = chapterObj[id].chapter,
        isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    }
  });
}

//Add chapterCount into DOM
export function addTotalChaptersToDom(manga, obj) {
  if (!manga.querySelector(".totalChapterElement") && obj.chaptersAmount !== undefined) {
    let chapterCountElm = document.createElement("li");
    chapterCountElm.classList.add("list-inline-item", "totalChapterElement");
    chapterCountElm.innerHTML = `<span>${obj.chaptersAmount}</span>`;
    manga.querySelector(".list-inline").append(chapterCountElm);
  } else {
    manga.querySelector(".totalChapterElement > span").textContent = obj.chaptersAmount;
  }
}

export const compareDate = (date, minutes) => {
  const HOUR = 1000 * minutes * minutes;
  const anHourAgo = Date.now() - HOUR;
  return date > anHourAgo;
};

export async function createDB() {
  try {
    return await openDB("MangaDexTC", 1, {
      upgrade(idb) {
        idb.createObjectStore("mangas");
      },
    });
  } catch (error) {
    alert("Browser doesn't support IndexDB, so MangaDexTC doesn't work");
  }
}
