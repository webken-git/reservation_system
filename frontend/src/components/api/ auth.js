// テスト用のダミー関数
// 実際は API に対して非同期通信を行う
export function login(username, password) {
  return new Promise(resolve => {
    resolve({
      id: 123,
      username,
      email: "sample@email.com",
    });
  });
}
