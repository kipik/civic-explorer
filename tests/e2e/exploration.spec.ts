import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function assertCleanAccessibility(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations).toEqual([]);
}

async function assertZeroPersistentStorage(page: Page, expectedCanaries: string[]) {
  const storageSnapshot = await page.evaluate(async () => {
    let indexedDbNames: string[] = [];
    if (typeof window.indexedDB?.databases === "function") {
      const databases = await window.indexedDB.databases();
      indexedDbNames = databases.map((db) => db.name ?? "");
    }

    return {
      localStorageLength: window.localStorage.length,
      localStorageDump: JSON.stringify(window.localStorage),
      sessionStorageLength: window.sessionStorage.length,
      sessionStorageDump: JSON.stringify(window.sessionStorage),
      cookieString: document.cookie,
      indexedDbNames,
      currentUrl: window.location.href,
    };
  });

  expect(storageSnapshot.localStorageLength).toBe(0);
  expect(storageSnapshot.sessionStorageLength).toBe(0);
  expect(storageSnapshot.cookieString).toBe("");
  expect(storageSnapshot.indexedDbNames).toEqual([]);

  for (const canary of expectedCanaries) {
    expect(storageSnapshot.localStorageDump).not.toContain(canary);
    expect(storageSnapshot.sessionStorageDump).not.toContain(canary);
    expect(storageSnapshot.currentUrl).not.toContain(canary);
  }
}

test.describe("Parcours P0.2 — Expression, structuration, confirmation et cartographie", () => {
  test("parcours complet avec test canari de confidentialité, non-transmission réseau, correction et effacement", async ({
    page,
    context,
  }) => {
    const canaries = [
      "CANARY_CIVIC_P02_SOINS_9F3A7C",
      "CANARY_CIVIC_P02_LOGEMENT_7B2E11",
      "CANARY_CIVIC_P02_OBJECTIF_4D88A0",
      "CANARY_CIVIC_P02_CONDITION_5E12C9",
    ];

    const consoleErrors: string[] = [];
    const consoleMessages: string[] = [];
    const pageErrors: string[] = [];
    const externalRequests: string[] = [];
    const nonGetRequests: string[] = [];
    const leakedRequests: string[] = [];

    page.on("console", (message) => {
      consoleMessages.push(message.text());
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
      if (request.method() !== "GET" && request.method() !== "HEAD") {
        nonGetRequests.push(`${request.method()} ${request.url()}`);
      }

      const serialized = [
        request.url(),
        request.postData() ?? "",
        JSON.stringify(request.headers()),
      ].join(" ");
      for (const canary of canaries) {
        if (serialized.includes(canary)) {
          leakedRequests.push(`${request.method()} ${request.url()}`);
        }
      }
    });

    await page.goto("/");
    await page.getByRole("link", { name: /commencer l'exploration/i }).click();
    await expect(page).toHaveURL(/\/parcours$/);

    // Écran 1 : Expression libre
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France \?/i,
      }),
    ).toBeVisible();
    await assertCleanAccessibility(page);

    const freeTextArea = page.getByRole("textbox", {
      name: /Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France \?/i,
    });
    await freeTextArea.fill(
      `- ${canaries[0]} concernant l'hôpital public\n- ${canaries[1]} sur le coût des loyers`,
    );

    await page.getByRole("button", { name: /continuer vers la structuration/i }).click();

    // Écran 2 : Structuration
    await expect(
      page.getByRole("heading", { level: 1, name: /relisez et organisez vos éléments/i }),
    ).toBeVisible();
    await assertCleanAccessibility(page);

    const structList = page.getByRole("list", { name: /éléments structurés/i });
    const structCards = structList.getByRole("article");
    await expect(structCards).toHaveCount(2);

    // Choisir un thème explicite pour le premier élément et "Je ne sais pas où classer" pour le second
    await structCards
      .nth(0)
      .getByRole("button", { name: /choisir ou modifier le thème/i })
      .click();
    await structCards
      .nth(0)
      .getByRole("checkbox", { name: /santé et protection sociale/i })
      .check();

    await structCards
      .nth(1)
      .getByRole("button", { name: /choisir ou modifier le thème/i })
      .click();
    await structCards
      .nth(1)
      .getByRole("button", { name: /je ne sais pas où classer/i })
      .click();

    await page.getByRole("button", { name: /continuer vers la confirmation/i }).click();

    // Écran 3 : Confirmation
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /vérifiez et confirmez ce qui reflète votre pensée/i,
      }),
    ).toBeVisible();
    await assertCleanAccessibility(page);

    const confirmList = page.getByRole("list", { name: /déclarations à confirmer/i });
    const confirmCards = confirmList.getByRole("article");
    await expect(confirmCards).toHaveCount(2);

    // Préciser l'objectif et une condition sur la 1ère déclaration puis la confirmer
    await confirmCards
      .nth(0)
      .getByLabel(/préciser l'objectif/i)
      .fill(canaries[2]!);
    await confirmCards
      .nth(0)
      .getByLabel(/conditions éventuelles/i)
      .fill(canaries[3]!);
    await confirmCards
      .nth(0)
      .getByRole("button", { name: /ajouter une condition/i })
      .click();
    await confirmCards
      .nth(0)
      .getByRole("button", { name: /confirmer cette déclaration/i })
      .click();

    // Laisser la 2e déclaration non confirmée (brouillon) pour vérifier qu'elle n'est pas attribuée
    await page.getByRole("button", { name: /voir la cartographie initiale/i }).click();

    // Écran 4 : Cartographie initiale
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /votre cartographie initiale de convictions confirmées/i,
      }),
    ).toBeVisible();
    await assertCleanAccessibility(page);

    await expect(
      page.getByRole("heading", { level: 2, name: /santé et protection sociale/i }),
    ).toBeVisible();
    await expect(page.getByText(new RegExp(canaries[0]!))).toBeVisible();
    await expect(page.getByText(new RegExp(canaries[2]!))).toBeVisible();
    await expect(page.getByText(new RegExp(canaries[3]!))).toBeVisible();

    // Le brouillon non confirmé ne doit pas apparaître comme conviction confirmée
    await expect(page.getByText(new RegExp(canaries[1]!))).toHaveCount(0);

    // Revenir modifier depuis la cartographie et confirmer aussi la 2e déclaration
    await page.getByRole("button", { name: /modifier cette déclaration/i }).click();
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /vérifiez et confirmez ce qui reflète votre pensée/i,
      }),
    ).toBeVisible();

    await confirmCards
      .nth(1)
      .getByRole("button", { name: /confirmer cette déclaration/i })
      .click();
    await page.getByRole("button", { name: /voir la cartographie initiale/i }).click();

    await expect(
      page.getByRole("heading", { level: 2, name: /je ne sais pas où classer/i }),
    ).toBeVisible();
    await expect(page.getByText(new RegExp(canaries[1]!))).toBeVisible();

    // Vérifier absence de stockage et de fuite réseau/console avant effacement
    expect(await context.cookies()).toEqual([]);
    await assertZeroPersistentStorage(page, canaries);
    expect(externalRequests).toEqual([]);
    expect(nonGetRequests).toEqual([]);
    expect(leakedRequests).toEqual([]);
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    for (const canary of canaries) {
      for (const msg of consoleMessages) {
        expect(msg).not.toContain(canary);
      }
    }

    // Effacer la session en mémoire
    await page.getByRole("button", { name: /effacer ma session/i }).click();
    await page.getByRole("button", { name: /confirmer l'effacement/i }).click();

    await expect(
      page.getByRole("textbox", {
        name: /Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France \?/i,
      }),
    ).toHaveValue("");
    await assertZeroPersistentStorage(page, canaries);
  });

  test("utilisable au clavier et lisible sur viewport mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/parcours");

    const freeTextArea = page.getByRole("textbox", {
      name: /Quelles sont les choses qui vous préoccupent le plus concernant l'avenir de la France \?/i,
    });
    await freeTextArea.focus();
    await expect(freeTextArea).toBeFocused();
    await page.keyboard.type("Garantir l'avenir de l'école publique");

    // Continuer au clavier
    await page.getByRole("button", { name: /continuer vers la structuration/i }).focus();
    await page.keyboard.press("Enter");

    await expect(
      page.getByRole("heading", { level: 1, name: /relisez et organisez vos éléments/i }),
    ).toBeVisible();
    await assertCleanAccessibility(page);

    // Vérifier l'absence de débordement horizontal sur mobile
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});
