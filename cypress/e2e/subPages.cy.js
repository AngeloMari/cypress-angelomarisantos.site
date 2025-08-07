describe("Tesing sub pages", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(768, 480);
  });

  // ----- SCROLL-TO-TOP AND GO BACK BUTTONS ----- //
  it("Projects page buttons", () => {
    cy.get("#projects").click();
    cy.url().should("include", "/pages/projects.html");
    cy.getDataTest("go-back-btn").should("be.visible");
    cy.getDataTest("go-back-btn").should("have.css", "position", "static");
    cy.getDataTest("back-to-top-btn").should("not.be.visible");
    cy.scrollTo("bottom");
    cy.wait(500); // added wait throughout the test to see changes visually
    cy.getDataTest("back-to-top-btn").should("be.visible").click();
    cy.getDataTest("back-to-top-btn").should("not.be.visible");
    cy.getDataTest("go-back-btn").click();
    cy.wait(500);
  });

  it("Testing Grounds page buttons", () => {
    cy.get("#testing").click();
    cy.url().should("include", "/pages/testing-grounds.html");
    cy.getDataTest("go-back-btn").should("be.visible");
    cy.getDataTest("go-back-btn").should("have.css", "position", "static");
    cy.getDataTest("back-to-top-btn").should("not.be.visible");
    cy.scrollTo("bottom");
    cy.wait(500);
    cy.getDataTest("back-to-top-btn").should("be.visible").click();
    cy.getDataTest("back-to-top-btn").should("not.be.visible");
    cy.getDataTest("go-back-btn").click();
    cy.wait(500);
  });

  it("Certifications page buttons", () => {
    cy.get("#certifications").click();
    cy.url().should("include", "/pages/certifications.html");
    cy.getDataTest("go-back-btn").should("be.visible");
    cy.getDataTest("go-back-btn").should("have.css", "position", "static");
    cy.getDataTest("back-to-top-btn").should("not.be.visible");
    cy.scrollTo("bottom");
    cy.wait(500);
    cy.getDataTest("back-to-top-btn").should("be.visible").click();
    cy.getDataTest("back-to-top-btn").should("not.be.visible");
    cy.getDataTest("go-back-btn").click();
    cy.wait(500);
  });

  it("Artworks page buttons", () => {
    cy.get("#artworks").click();
    cy.url().should("include", "/pages/artworks.html");
    cy.getDataTest("go-back-btn").should("be.visible");
    cy.getDataTest("go-back-btn").should("have.css", "position", "static");
    cy.getDataTest("back-to-top-btn").should("not.be.visible");
    cy.scrollTo("bottom");
    cy.wait(500);
    cy.getDataTest("back-to-top-btn").should("be.visible").click();
    cy.getDataTest("back-to-top-btn").should("not.be.visible");
    cy.getDataTest("go-back-btn").click();
    cy.wait(500);
  });

  // ----- THEMES ----- //
  it("Subpages should inherit the main page theme", () => {
    cy.getDataTest("mobile-theme-bar").within(() => {
      cy.get("input#red").check();
    });
    cy.get("#projects").click();
    cy.get("html").should("have.class", "red-theme");
    cy.wait(500);
    cy.getDataTest("go-back-btn").click();
    cy.wait(500);

    cy.getDataTest("mobile-theme-bar").within(() => {
      cy.get("input#yellow").check();
    });
    cy.get("#testing").click();
    cy.get("html").should("have.class", "yellow-theme");
    cy.wait(500);
    cy.getDataTest("go-back-btn").click();
    cy.wait(500);

    cy.getDataTest("mobile-theme-bar").within(() => {
      cy.get("input#green").check();
    });
    cy.get("#certifications").click();
    cy.get("html").should("have.class", "green-theme");
    cy.wait(500);
    cy.getDataTest("go-back-btn").click();
    cy.wait(500);

    cy.get("#artworks").click();
    cy.get("body").should("not.have.class", "lightmode");
    cy.wait(500);
    cy.getDataTest("go-back-btn").click();
    cy.get('[data-test="mobile-theme-bar"] .theme-switch').click();
    cy.get("#projects").click();
    cy.get("body").should("not.have.class", "lightmode");
    cy.wait(500);
    cy.getDataTest("go-back-btn").click();
    cy.get('[data-test="mobile-theme-bar"] .theme-switch').click();
    cy.get("#projects").click();
    cy.get("body").should("not.have.class", "lightmode");
  });

  // ----- LINKS ----- //
  it("Each project tile should link to the correct URL", () => {
    cy.visit("/pages/projects.html");

    const projectLinks = [
      "https://angelomari.github.io/the-beatles-survey/",
      "https://angelomari.github.io/tribute-page-for-aiko/",
      "https://angelomari.github.io/basic-html-technical-documentation",
      "https://angelomari.github.io/fender-landing-page/",
      "https://angelomari.github.io/RockyRaccoon-personal-site",
      "https://angelomari.github.io/palindrome-checker",
      "https://angelomari.github.io/roman-numeral-converter",
      "https://angelomari.github.io/US-telephone-number-validator",
      "https://angelomari.github.io/cash-register",
      "https://angelomari.github.io/RPG-creature-search-app",
    ];
    cy.get(".project-tile").each(($el, index) => {
      cy.wrap($el)
        .should("have.attr", "href", projectLinks[index])
        .and("have.attr", "target", "_blank");
    });
  });

  it("Each certification tile should link to the correct URL", () => {
    cy.visit("/pages/certifications.html");

    const certificationLinks = [
      "https://www.freecodecamp.org/certification/RockyRaccoon08/responsive-web-design",
      "https://www.freecodecamp.org/certification/RockyRaccoon08/javascript-algorithms-and-data-structures-v8",
    ];
    cy.get(".certification-tile").each(($el, index) => {
      cy.wrap($el)
        .should("have.attr", "href", certificationLinks[index])
        .and("have.attr", "target", "_blank");
    });
  });
});
