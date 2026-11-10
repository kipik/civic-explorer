import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Accueil Civic Explorer (P0.2)", () => {
  test("affiche la présentation du parcours sans requête externe, stockage ni erreur d'accessibilité", async ({
    page,
    context,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const externalRequests: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    page.on("request", (request) => {
      const url = new URL(request.url());
      if (url.hostname !== "127.0.0.1" && url.hostname !== "localhost") {
        externalRequests.push(request.url());
      }
    });

    const response = await page.goto("/");
    expect(response?.ok()).toBe(true);

    const headers = response?.headers() ?? {};
    expect(headers["x-powered-by"]).toBeUndefined();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["permissions-policy"]).toContain("camera=()");

    await expect(page).toHaveTitle(/Civic Explorer/);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /espace sobre pour clarifier vos convictions/i,
      }),
    ).toBeVisible();

    await expect(page.getByRole("link", { name: /commencer l'exploration/i })).toHaveAttribute(
      "href",
      "/parcours",
    );

    // Navigation clavier : le lien d'évitement doit recevoir le focus dès la première tabulation
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Aller au contenu principal" });
    await expect(skipLink).toBeFocused();

    // Vérification des stockages navigateur et cookies (aucun stockage persistant ou traceur)
    const cookies = await context.cookies();
    expect(cookies).toEqual([]);

    const storageState = await page.evaluate(() => ({
      localStorageLength: window.localStorage.length,
      sessionStorageLength: window.sessionStorage.length,
      cookieString: document.cookie,
    }));
    expect(storageState).toEqual({
      localStorageLength: 0,
      sessionStorageLength: 0,
      cookieString: "",
    });

    // Vérification absence d'erreurs et de requêtes tierces
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(externalRequests).toEqual([]);

    // Contrôle automatisé WCAG 2.2 AA (ne remplace pas un audit manuel)
    const accessibilityResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(accessibilityResults.violations).toEqual([]);
  });
});
