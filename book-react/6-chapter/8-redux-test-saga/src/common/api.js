//1초 뒤에 "이행됨"상태가되는 Promise 객체를 반환
export function callApiLike() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() * 10 < 5) {
        resolve();
      } else {
        reject("callApiLike 실패!");
      }
    }, 1000);
  });
}
