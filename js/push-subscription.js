// Push Notification Subscription Handler
async function initPushNotifications() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      console.log('No active push subscription');
      return;
    }

    console.log('Push subscription active:', subscription.endpoint);
  } catch (error) {
    console.error('Push notification error:', error);
  }
}

// Request notification permission
async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    console.log('Notification permission already granted');
    return true;
  }

  if (Notification.permission === 'denied') {
    console.log('Notification permission denied');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted');
      return true;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
  }

  return false;
}

// Subscribe to push notifications
async function subscribeToPushNotifications() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const publicKey = document.querySelector('meta[name="vapid-public-key"]')?.content;

    if (!publicKey) {
      console.error('VAPID public key not found in meta tag');
      return null;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    });

    console.log('Push subscription successful:', subscription.endpoint);

    // Send subscription to Netlify function
    await sendSubscriptionToServer(subscription);

    return subscription;
  } catch (error) {
    console.error('Push subscription error:', error);
    return null;
  }
}

// Convert VAPID key from base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Send subscription to server
async function sendSubscriptionToServer(subscription) {
  try {
    const response = await fetch('/.netlify/functions/send-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Subscription sent to server:', data);
    return data;
  } catch (error) {
    console.error('Error sending subscription to server:', error);
    return null;
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPushNotifications);
} else {
  initPushNotifications();
}
