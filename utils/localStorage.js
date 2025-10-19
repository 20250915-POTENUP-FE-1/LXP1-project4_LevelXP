const LECTURE_DATA = [
  {
    id: 1,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 123123,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 2,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 30000000000,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 3,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 4412412,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 4,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 123123,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 5,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 123123,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 6,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 123123,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 7,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 123123,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 8,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 123123,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 9,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 123123,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 10,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 123123,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
  {
    id: 11,
    title: "자바스크립트 어쩌고저쩌고",
    type: "typescript",
    price: 123123,
    isSoldout: true,
    teacher: "홍길동",
    img: "lecture-01.png",
    name: "(주)레벨업",
  },
];

const LECTURE_STORAGE_KEY = "levelxp_lectures";
const LECTURE_MY_STORAGE_KEY = "levelxp_my_lectures";

function initializeLectureData() {
  // 배열로 되어있는 강의목록(data)를 로컬스토리지에 저장을 하기
  localStorage.setItem(LECTURE_STORAGE_KEY, JSON.stringify(LECTURE_DATA));
  //JSON.parse(localStorage.getItem(LECTURE_STORAGE_KEY)) ?? [];
}

/**
 *
 * @returns {Array} 로컬스토리지에 저장된 강의목록 배열
 */
function getLectureList(category = "", categoryDetail = "") {
  if (category === "ADMIN") {
    return JSON.parse(localStorage.getItem(LECTURE_STORAGE_KEY)) ?? [];
  }

  if (category === "My") {
    return JSON.parse(localStorage.getItem(LECTURE_MY_STORAGE_KEY)) ?? [];
  }

  if (category && !categoryDetail) {
    return (
      JSON.parse(localStorage.getItem(LECTURE_STORAGE_KEY))?.filter(
        (lecture) => lecture.category === category
      ) ?? []
    );
  } else if (category && categoryDetail) {
    return (
      JSON.parse(localStorage.getItem(LECTURE_STORAGE_KEY))?.filter(
        (lecture) =>
          lecture.category === category &&
          lecture.categoryDetail === categoryDetail
      ) ?? []
    );
  } else {
    return JSON.parse(localStorage.getItem(LECTURE_STORAGE_KEY)) ?? [];
  }
}

function getLectureListLength() {
  return (JSON.parse(localStorage.getItem(LECTURE_STORAGE_KEY)) ?? []).length;
}

function saveLecture(lecture, isBuy = false) {
  if (isBuy) {
    return localStorage.setItem(
      LECTURE_MY_STORAGE_KEY,
      JSON.stringify([lecture, ...getLectureList("My")])
    );
  }

  return localStorage.setItem(
    LECTURE_STORAGE_KEY,
    JSON.stringify([lecture, ...getLectureList()])
  );
}

// 개별적인 강의 하나 id를 통해 가져오기
function getLecture(lectureIndex) {
  const list = getLectureList();
  const target = list.find((l) => l.id === lectureIndex);
  return target || null;
}

// // 강의 데이터 삭제하기
function deleteLecture(lectureIndex) {
  const list = getLectureList();

  const newList = list.filter(
    (lecture) => String(lecture.index) !== String(lectureIndex)
  );

  localStorage.setItem(LECTURE_STORAGE_KEY, JSON.stringify(newList));
}

// // 강의 데이터 수정하기
function updateLecture(lectureIndex, newData) {
  const list = getLectureList();

  const index = list.findIndex(
    (lecture) => String(lecture.index) === String(lectureIndex)
  );

  list[index] = { ...list[index], ...newData };

  localStorage.setItem(LECTURE_STORAGE_KEY, JSON.stringify(list));

  return list[index];
}

function searchLectures(keyword) {
  const list = getLectureList();
  if (!keyword) return list;

  return list.filter((lecture) =>
    lecture.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

window.initializeLectureData = initializeLectureData;
window.getLectureList = getLectureList;
window.getLecture = getLecture;
window.saveLecture = saveLecture;
window.deleteLecture = deleteLecture;
window.updateLecture = updateLecture;
window.searchLectures = searchLectures;
window.getLectureListLength = getLectureListLength;

export {
  getLecture,
  initializeLectureData,
  getLectureList,
  saveLecture,
  deleteLecture,
  updateLecture,
  searchLectures,
};
