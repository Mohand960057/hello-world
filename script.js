const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// The contact form opens WhatsApp with a pre-filled message (no backend needed).
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const label = (name) => form.querySelector(`[name="${name}"]`).closest("label").querySelector("span").textContent;
    const selected = (name) => form[name].options[form[name].selectedIndex].textContent;
    const lines = [
      `${form.dataset.intro} ${selected("service")}`,
      `${label("name")}: ${form.name.value}`,
      `${label("phone")}: ${form.phone.value}`,
      form.email.value && `${label("email")}: ${form.email.value}`,
      `${label("country")}: ${selected("country")}`,
      form.message.value,
    ].filter(Boolean);
    window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
  });
}
