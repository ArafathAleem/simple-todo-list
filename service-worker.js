importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js");

// Initialize Firebase (Configuration is already set up separately)
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Push notification handling from Firebase Cloud Messaging
self.addEventListener("push", (event) => {
  const notificationData = event.data.json();
  const options = {
    body: notificationData.notification.body,
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-192x192.png",
    vibrate: [200, 100, 200],
    actions: [
      { action: "open", title: "Open App" },
      { action: "dismiss", title: "Dismiss" }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.notification.title, options)
  );
});

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/")
  );
});
