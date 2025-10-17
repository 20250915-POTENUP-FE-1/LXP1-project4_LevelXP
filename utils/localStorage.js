const LECTURE_STORAGE_KEY = "levelxp_lectures";
const LECTURE_DATA = {
  id: "00001",
  title: "자바스크립트 어쩌고저쩌고",
};
const data = [
  {
    id: "00001",
    title: "자바스크립트 어쩌고저쩌고",
  },
  {
    id: "00002",
    title: "HTML 기초",
  },
  {
    id: "00003",
    title: "CSS 기초",
  },
  {
    id: "00004",
    title: "프론트엔드 개발 시작하기",
  },
  {
    id: "00005",
    title: "웹 접근성 이해하기",
  },
];

function initializeLectureData() {
  // 배열로 되어있는 강의목록(data)를 로컬스토리지에 저장을 하기
  localStorage.setItem(LECTURE_STORAGE_KEY, JSON.stringify(data));
  //JSON.parse(localStorage.getItem(LECTURE_STORAGE_KEY)) ?? [];
}

function getLectureList() {
  return JSON.parse(localStorage.getItem(LECTURE_STORAGE_KEY)) ?? [];
}

function saveLecture(lecture) {
  localStorage.setItem(
    LECTURE_STORAGE_KEY,
    JSON.stringify([lecture, ...getLectureList()])
  );
}

// 개별적인 강의 하나 id를 통해 가져오기
function getLecture(lectureId) {
  const list = getLectureList();
  const target = list.find((l) => l.id === lectureId);
  return target || null;
}

// // 강의 데이터 삭제하기
function deleteLecture(lectureId) {
  if (!lectureId) {
    localStorage.removeItem(LECTURE_STORAGE_KEY);
    return;
  }
  const list = getLectureList();
  const newList = list.filter((l) => String(l.id) !== String(lectureId));
  localStorage.setItem(LECTURE_STORAGE_KEY, JSON.stringify(newList));
}

// // 강의 데이터 수정하기
function updateLecture(lectureID, newData) {
  const list = getLectureList();

  const index = list.findIndex((l) => String(l.id) === String(lectureID));
  if (index === -1) {
    console.warn("해당 강의가 존재하지 않습니다.");
    return null;
  }

  console.log(list[index]);

  list[index] = { ...list[index], ...newData };
  console.log(list[index]);
  console.log(list);

  localStorage.setItem(LECTURE_STORAGE_KEY, JSON.stringify(list));

  return list[index];
}

export {
  getLecture,
  initializeLectureData,
  getLectureList,
  saveLecture,
  deleteLecture,
  updateLecture,
};
