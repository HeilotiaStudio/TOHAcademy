console.log("MAIN.JS LOADED");

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("notifyBtn");
    console.log("Button found:", btn);

    if (!btn) return;

    btn.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log("Notification button clicked");

        const permission = await Notification.requestPermission();
        console.log("Permission result:", permission);

        if (permission === "granted") {
            showToast("Notifications enabled!");
        } else if (permission === "denied") {
            showToast("Notifications blocked in browser settings.");
        } else {
            showToast("Notification permission dismissed.");
        }
    });
});

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.querySelector(".toast-body").textContent = message;

    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("show"), 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.classList.add("hidden"), 300);
    }, 3000);
}







