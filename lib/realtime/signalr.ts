import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { store } from "@/lib/redux/store";
import { getApiUrl } from "@/lib/api/core";

export type SignalRStatus = HubConnectionState;

let connection: HubConnection | null = null;
let startPromise: Promise<void> | null = null;

function getBaseUrl(): string {
  return getApiUrl();
}

export function getHubUrl(): string {
  const base = getBaseUrl();
  const baseClean = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${baseClean}/hubs/app`;
}

function getAccessToken(): string | null {
  try {
    return store.getState().auth.token;
  } catch {
    return null;
  }
}

export function getHubConnection(): HubConnection {
  if (typeof window === "undefined") throw new Error("SignalR chỉ chạy trên browser");
  if (connection) return connection;

  connection = new HubConnectionBuilder()
    .withUrl(getHubUrl(), { accessTokenFactory: () => getAccessToken() || "" })
    .withAutomaticReconnect()
    .configureLogging(
      process.env.NODE_ENV === "development" ? LogLevel.Information : LogLevel.Warning
    )
    .build();

  connection.onreconnecting((err) => console.info("[SignalR] reconnecting...", err));
  connection.onreconnected((id) => console.info("[SignalR] reconnected:", id));
  connection.onclose((err) => console.info("[SignalR] closed", err));

  return connection;
}

export async function startHubConnection(): Promise<HubConnection> {
  const conn = getHubConnection();
  if (conn.state === HubConnectionState.Connected) return conn;

  if (conn.state === HubConnectionState.Connecting && startPromise) {
    await startPromise;
    return conn;
  }

  startPromise = conn
    .start()
    .then(() => {
      startPromise = null;
    })
    .catch((err) => {
      startPromise = null;
      throw err;
    });

  await startPromise;
  return conn;
}

export async function stopHubConnection(): Promise<void> {
  if (!connection) return;
  try {
    await connection.stop();
  } finally {
    connection = null;
  }
}
