const popup = document.getElementById('confirmPopup');
const popupMsg = document.getElementById('popupMsg');
const popupButtons = document.getElementById('popupButtons');

let targetUrl = null;

const openPopup = (msg, type, url = null) => {
  popupMsg.textContent = msg;
  targetUrl = url;

  if (type === "ok") {
    popupButtons.innerHTML = `<a id="popupOK">OK</a>`;
  } else {
    popupButtons.innerHTML = `
      <a id="popupYes">はい</a>
      <a id="popupNo">いいえ</a>
    `;
  }

  popup.classList.add('active');

  if (type === "ok") {
    document.getElementById("popupOK").onclick = () => {
      popup.classList.remove("active");
    };
  } else {
    document.getElementById("popupYes").onclick = () => {
      if (targetUrl) location.href = targetUrl;
      popup.classList.remove("active");
    };
    document.getElementById("popupNo").onclick = () => {
      popup.classList.remove("active");
      targetUrl = null;
    };
  }
};

document.addEventListener("click", e => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");

  if (link.classList.contains("coming-soon")) {
    e.preventDefault();
    openPopup("準備中です。", "ok");
    return;
  }

  if (href && href.startsWith("https://")) {
    e.preventDefault();
    const domain = new URL(href).hostname;
    openPopup(`外部のサイト（${domain}）に移動してもよろしいですか？`, "yesno", href);
  }
});
