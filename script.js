const fileInput = document.getElementById("fileInput");
const fileName = document.getElementById("fileName");
const preview = document.getElementById("preview");
const uploadBtn = document.getElementById("uploadBtn");
const statusText = document.getElementById("status");
const linkInput = document.getElementById("link");
const copyBtn = document.getElementById("copyBtn");

// عرض اسم الصورة + preview
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
    alert("اختر صورة الأول");
    return;
  }

  statusText.innerText = "جارٍ رفع الصورة...";
  uploadBtn.disabled = true;

  const formData = new FormData();
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", file);

  try {

    // الحل الجديد (بدون CORS proxy)
    const response = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: formData
    });

    const text = await response.text();

    if (!text.startsWith("http")) {
      throw new Error("Upload failed");
    }

    linkInput.value = text;
    statusText.innerText = "تم الرفع بنجاح 🔥";

  } catch (err) {

    statusText.innerText = "فشل الرفع 😢 جرّب مرة تانية";

  }

  uploadBtn.disabled = false;

});


// نسخ الرابط
copyBtn.addEventListener("click", async () => {

  if (!linkInput.value) return;

  await navigator.clipboard.writeText(linkInput.value);

  copyBtn.innerText = "تم النسخ ✔";

  setTimeout(() => {
    copyBtn.innerText = "نسخ";
  }, 2000);

});
