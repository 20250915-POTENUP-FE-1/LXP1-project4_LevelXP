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

const pageSize = 10;

/**
 * 강의 목록을 HTML element list로 변환하는 함수
 * @param {Array} lectureDataList localStorage에 등록된 lecture data list
 */
function getLectureElementList(lectureDataList, isAdmin = false) {
  // FIXME: localStorage에서 데이터 가져오기
  let lectureElementList = lectureDataList.map((lecture) => {
    // let lectureElementList = LECTURE_DATA.map((lecture) => {
    return `<li>
			<lecture-item
        data-index="${lecture.index}"
				title="${lecture.title}" 
				instructor="${lecture.instructor}" 
				price="₩${lecture.price.toLocaleString()}" 
				recommandedCompany="${lecture.recommandedCompany || ""}"
				isAdmin="${isAdmin}"
			/>
		</li>`;
  });

  return lectureElementList;
}

export { getLectureElementList };
