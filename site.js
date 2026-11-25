const frames = Array.from(document.querySelectorAll(".film-frame"));
const viewer = document.querySelector("#frame-dialog");
const viewerTitle = document.querySelector("#frame-title");
const viewerImage = document.querySelector("#frame-image");
const previous = document.querySelector("#frame-prev");
const next = document.querySelector("#frame-next");
let currentFrame = 0;

function showFrame(index) {
  const frame = frames[index];
  if (!frame) return;

  currentFrame = index;
  const image = frame.querySelector("img");
  viewerTitle.textContent = frame.closest("figure").querySelector("figcaption").textContent;
  viewerImage.src = image.src;
  viewerImage.alt = image.alt;
  previous.setAttribute("aria-disabled", String(index === 0));
  next.setAttribute("aria-disabled", String(index === frames.length - 1));
}

frames.forEach((frame, index) => {
  frame.addEventListener("click", () => {
    showFrame(index);
    viewer.showModal();
  });
});

previous.addEventListener("click", () => showFrame(currentFrame - 1));
next.addEventListener("click", () => showFrame(currentFrame + 1));
viewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showFrame(currentFrame + (event.key === "ArrowLeft" ? -1 : 1));
  }
});
