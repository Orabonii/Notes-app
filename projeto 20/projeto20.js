const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, UpdateId;

addBox.addEventListener("click", () => {
  //팝업창이 열렸을 때 title Input에 focus
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach(note => note.remove());
  notes.forEach((note, index) => {
    let liTag = ` <li class="note">
    <div class="details">
      <p>${note.title}</p>
      <span>${note.description}</span>
    </div>
    <div class="bottom-content">
      <span>${note.date}</span>
      <div class="settings">
        <i onClick="showMenu(this)" class="uil uil-ellipsis-h"></i>
        <ul class="menu">
          <li onClick="updateNote(${index},'${note.title}','${note.title}','${note.description}')"><i class="uil uil-pen"></i>Edit</li>
          <li onClick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
        </ul>
      </div>
    </div>
  </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  //삭제 알림 확인 창
  let confirmDel = confirm("정말 삭제하시겠습니까?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update a Note";
  console.log(noteId, title, desc);
}
addBtn.addEventListener("click", e => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();
    console.log(month, day, year);

    let noteInfo = {
      title: noteTitle, description: noteDesc,
      date: `${month}, ${day}, ${year}`
    }
    if (!isUpdate) {
      //새 노트 추가
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    //로컬스토리지에 저장
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});
