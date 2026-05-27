// script.js

const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");

const preview = document.getElementById("preview");

const uploadBtn = document.getElementById("uploadBtn");

const statusText = document.getElementById("status");

const linkInput = document.getElementById("link");

const copyBtn = document.getElementById("copyBtn");


// عرض اسم الصورة
fileInput.addEventListener("change", () => {

  const file = fileInput.files[0];

  if (!file) return;

  fileName.innerText = file.name;

  const reader = new FileReader();

  reader.onload = (e) => {

    preview.src = e.target.result;

    preview.hidden = false;

  };

  reader.readAsDataURL(file);

});


// رفع الصورة
uploadBtn.addEventListener("click", async () => {

  const file = fileInput.files[0];

  if (!file) {

    alert("اختر صورة أولاً");

    return;

  }

  statusText.innerText = "جارٍ رفع الصورة...";

  uploadBtn.disabled = true;

  const formData = new FormData();

  formData.append("reqtype", "fileupload");

  formData.append("fileToUpload", file);

  try {

    const response = await fetch(
      "https://catbox.moe/user/api.php",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.text();

    linkInput.value = data;

    statusText.innerText = "تم رفع الصورة بنجاح";

  } catch (error) {

    statusText.innerText = "حدث خطأ أثناء الرفع";

  }

  uploadBtn.disabled = false;

});


// نسخ الرابط
copyBtn.addEventListener("click", async () => {

  if (!linkInput.value) return;

  await navigator.clipboard.writeText(
    linkInput.value
  );

  copyBtn.innerText = "تم النسخ";

  setTimeout(() => {

    copyBtn.innerText = "نسخ";

  }, 2000);

});
