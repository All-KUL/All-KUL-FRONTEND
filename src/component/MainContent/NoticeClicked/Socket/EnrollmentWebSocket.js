// WebSocketClient.js

const SOCKET_URL = "ws://127.0.0.1:8081";

class WebSocketClient {
  constructor() {
    this.websocket = null;
    this.isConnected = false;
    this.username = ""; // 사용자 이름 추가
    this.onMessageCallback = null; // 메시지 수신 콜백 함수 추가
  }

  connect(onConnect) {
    this.websocket = new WebSocket(SOCKET_URL);

    this.websocket.onopen = () => {
      console.log("WebSocket connected");
      this.isConnected = true;
      // 연결되면 사용자 이름을 서버에 전달
      if (onConnect) {
        onConnect();
      }
    };

    this.websocket.onmessage = (event) => {
      console.log("Received message:", event.data);
      // 새로운 메시지 수신 시 콜백 함수 호출
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
    };

    this.websocket.onclose = () => {
      console.log("WebSocket disconnected");
      this.isConnected = false;
    };

    this.websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  // 채팅 메시지를 수신할 때 호출될 콜백 함수 설정
  setOnMessageCallback(callback) {
    this.onMessageCallback = callback;
  }

  sendUsername() {
    if (this.websocket && this.isConnected) {
      const message = "[username]" + this.username;
      this.websocket.send(message);
    }
  }

  sendMessage(command, data) {
    const message = `[${command}]${data}`;

    if (this.isConnected) {
      this.websocket.send(message);
    } else {
      console.error("WebSocket is not connected");
    }
  }

  close() {
    if (this.websocket) {
      this.websocket.close();
      this.isConnected = false;
    }
  }
}

const webSocketClient = new WebSocketClient();

export default webSocketClient;

