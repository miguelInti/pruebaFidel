import { setCookie } from "cookies-next";

export async function authenticate(authConfig) {
  try {
    const response = await fetch("/api/authentication", {
      method: "POST",
      body: JSON.stringify(authConfig),
    });
    const responseData = await response.json();
    if (response.ok) {
      setCookie("authConfig", JSON.stringify(authConfig));
      setCookie("token", JSON.stringify(responseData.token));
    } else {
      throw new Error(responseData.message);
    }
  } catch (error) {
    throw new Error("Error al enviar la solicitud");
  }
}
