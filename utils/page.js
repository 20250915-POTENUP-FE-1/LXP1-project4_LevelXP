function getCurrentPageQueryParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = parseInt(urlParams.get("page")) || 1;

  return { page };
}

function setCurrentPageQueryParams(page) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("page", page);

  const newUrl =
    window.location.pathname +
    "?" +
    urlParams.toString() +
    window.location.hash;
  window.history.pushState({ path: newUrl }, "", newUrl);
}
