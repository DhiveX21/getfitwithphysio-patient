const timeStamp = () => Math.floor(new Date().getTime() / 1000);

export function setLocalStorage(key, value, duration = 300) {
  localStorage.setItem(key, JSON.stringify(value));
  localStorage.setItem(`${key}_expire`, timeStamp() + duration);
}

export function getLocalStorage(key) {
  let item = localStorage.getItem(key);
  let item_expire = localStorage.getItem(`${key}_expire`);

  if (item && item_expire && item_expire < timeStamp()) {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_expire`);
    return "expire";
  } else if (item) {
    return { item: JSON.parse(item), expire: item_expire };
  } else if (!item) {
    return false;
  }
}
