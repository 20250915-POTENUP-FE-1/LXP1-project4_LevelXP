class LectureComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "강의 제목";
    const instructor = this.getAttribute("instructor") || "강사 이름";
    const price = this.getAttribute("price") || "₩100,000";
    const recommandedCompany =
      this.getAttribute("recommandedCompany") || undefined;

    const isAdmin = this.getAttribute("isAdmin") === "true";

    this.innerHTML = `
			<head>
				<link rel="stylesheet" href="/css/lecture.css" />				
			</head>
			<body>
				<div class="course-card">
					<div class="thumb">
						<img src="/assets/images/sub/lecture-02.png" alt="" />
					</div>
					<div class="meta">
						${isAdmin ? `<div class="btn-pack small cate bg-be">백엔드-java</div>` : ""}
						
						<h3 class="course-title">
							${title}
						</h3>
						<p class="instructor">${instructor}</p>
						<p class="price">${price}</p>
						<div class="co-recomm">
							<span>${
                recommandedCompany !== undefined
                  ? `<strong>${recommandedCompany}</strong> 추천 강의!`
                  : ""
              }</span>
						</div>
						${
              isAdmin
                ? `
								<div class="buttons">
									<div class="fr">
										<a href="#" class="btn-pack small btn-edit">수정</a>
										<a href="#" class="btn-pack small btn-delete">삭제</a>
									</div>
								</div>
							`
                : ""
            }
					</div>
				</div>
			</body>
		`;

    this.addEventListener;
  }
}

customElements.define("lecture-item", LectureComponent);
export { LectureComponent };