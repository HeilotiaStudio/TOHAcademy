document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("notifyBtn");

    if (!btn) {
        console.warn("notifyBtn not found in DOM");
        return;
    }

    btn.addEventListener("click", async () => {
        console.log("Notification button clicked");

        if (!("Notification" in window)) {
            console.error("Notifications are not supported in this browser.");
            alert("Notifications are not supported on this device.");
            return;
        }

        console.log("Requesting notification permission...");
        const permission = await Notification.requestPermission();
        console.log("Permission result:", permission);

        if (permission === "granted") {
            console.log("Permission granted. Showing test notification...");
            new Notification("Notifications enabled!", {
                body: "You will receive alerts from TOH Academy.",
                icon: "/TOHAcademy/img/favicon.png"
            });
        } else if (permission === "denied") {
            console.warn("Permission denied by user.");
            alert("You blocked notifications. Enable them in browser settings.");
        } else {
            console.log("Permission dismissed by user.");
            alert("Notification permission dismissed.");
        }
    });
});




