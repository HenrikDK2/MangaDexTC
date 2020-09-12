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
export function addTotalChaptersToDom(manga, chapterArr) {
  if (!manga.querySelector(".totalChapterElement")) {
    let chapterCountElm = document.createElement("li");
    chapterCountElm.classList.add("list-inline-item", "totalChapterElement");
    chapterCountElm.innerHTML = `<span>${chapterArr.length}</span>`;
    manga.querySelector(".list-inline").append(chapterCountElm);
  } else {
    chapterCountElm.innerHTML = `<span>${chapterArr.length}</span>`;
  }
}
