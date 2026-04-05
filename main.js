document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("notifyBtn");

    if (!btn) {
        console.warn("notifyBtn not found in DOM");
        return;
    }

    btn.addEventListener("click", async () => {
        if (!("Notification" in window)) {
            alert("Notifications are not supported on this device.");
            return;
        }

        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            new Notification("Notifications enabled!", {
                body: "You will receive alerts from TOH Academy.",
                icon: "/TOHAcademy/img/favicon.png"
            });
        } else if (permission === "denied") {
            alert("You blocked notifications. Enable them in browser settings.");
        } else {
            alert("Notification permission dismissed.");
        }
    });
});


