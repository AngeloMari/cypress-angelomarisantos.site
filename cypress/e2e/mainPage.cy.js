describe("Tesing the main page (text content, links, buttons, and theme)", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1440, 660);
  });

  // ----- TEXT CONTENT ----- //
  it("Testing text content for different sections", () => {
    // Introduction
    cy.getDataTest("intro")
      .invoke("text")
      .then((text) => {
        const normalized = text.replace(/\s+/g, " ").trim();
        expect(normalized).to.equal(
          "Hello! I’m Angelo, a computer engineer focused on system development and software quality assurance. Feel free to explore and try my projects — I promise everything has been tested! 👾👾👾"
        );
      });

    // About Me
    cy.getDataTest("about")
      .invoke("text")
      .then((text) => {
        const normalized = text.replace(/\s+/g, " ").trim();
        expect(normalized).to.equal(
          "About Me I enjoy figuring out how systems work and how to improve them. As an SQA tester, I’ve designed and executed manual test cases using tools like LambdaTest. I'm currently deepening my skills in automation with Cypress. Outside of tech, you’ll likely find me sketching, playing music, or diving into random topics that spark my curiosity."
        );
      });

    // Skills
    cy.getDataTest("skills")
      .invoke("text")
      .then((text) => {
        const normalized = text.replace(/\s+/g, " ").trim();
        expect(normalized).to.equal(
          "Skills Tools: LambdaTest, Cypress, and OpenProject Languages: HTML, CSS, and JavaScript Testing Types: Manual, Black Box, Regression, Integration, and System Testing Methodology: Agile (Scrum Framework) Others: Test Case Design and Bug Reporting"
        );
      });

    // Projects, Testing Grounds, Certifications, and Artworks Tiles
    const expectedTitles = [
      "Projects",
      "Testing Grounds",
      "Certifications",
      "Artworks",
    ];
    cy.get(".my-works").each(($card, index) => {
      cy.wrap($card).find("h2").should("have.text", expectedTitles[index]);
    });

    // Contact Section
    cy.getDataTest("contact").contains("Let's Connect!");
    cy.get('[title="GitHub"]').should("exist");
    cy.get('[title="LinkedIn"]').should("exist");
    cy.get('[title="Email"]').should("exist");
    cy.get('[title="Phone"]').should("exist");
  });

  // ----- MAIN PAGE BUTTONS ----- //
  it("Scroll-to-top button", () => {
    cy.viewport(768, 480);

    cy.getDataTest("back-to-top-btn").should("not.be.visible");
    cy.scrollTo("bottom");
    cy.getDataTest("back-to-top-btn").should("be.visible").click();
    cy.getDataTest("back-to-top-btn").should("not.be.visible");
  });

  it("Download resume button", () => {
    cy.intercept("GET", "/assets/pdf/Angelo-Mari-Santos-Resume.pdf").as(
      "pdfDownload"
    );
    cy.getDataTest("download-resume").click();
    cy.wait("@pdfDownload").then((interception) => {
      // Check that it's a PDF file
      expect(interception.response.headers["content-type"]).to.include(
        "application/pdf"
      );
    });
  });

  // ----- THEMES ----- //
  it("Mobile theme color picker", () => {
    cy.viewport(768, 480);

    cy.getDataTest("mobile-theme-bar").within(() => {
      cy.get("input#red").check();
    });
    cy.get("html").should("have.class", "red-theme");
    cy.wait(1000);
    cy.getDataTest("mobile-theme-bar").within(() => {
      cy.get("input#yellow").check();
    });
    cy.get("html").should("have.class", "yellow-theme");
    cy.wait(1000);
    cy.getDataTest("mobile-theme-bar").within(() => {
      cy.get("input#green").check();
    });
    cy.get("html").should("have.class", "green-theme");
    cy.wait(1000);
  });

  it("Desktop theme color picker", () => {
    cy.getDataTest("desktop-theme-bar").within(() => {
      cy.get("input#red").check();
    });
    cy.get("html").should("have.class", "red-theme");
    cy.wait(1000); // to visually see theme changes
    cy.getDataTest("desktop-theme-bar").within(() => {
      cy.get("input#yellow").check();
    });
    cy.get("html").should("have.class", "yellow-theme");
    cy.wait(1000);
    cy.getDataTest("desktop-theme-bar").within(() => {
      cy.get("input#green").check();
    });
    cy.get("html").should("have.class", "green-theme");
    cy.wait(1000);
  });

  it("Desktop light mode theme", () => {
    cy.get("body").should("not.have.class", "lightmode");
    cy.get('[data-test="desktop-theme-bar"] .theme-switch').click();
    cy.get("body").should("have.class", "lightmode");
    cy.wait(1000);
    cy.get('[data-test="desktop-theme-bar"] .theme-switch').click();
    cy.get("body").should("not.have.class", "lightmode");
    cy.wait(1000);
  });

  it("Mobile light mode theme", () => {
    cy.viewport(768, 480);

    cy.get("body").should("not.have.class", "lightmode");
    cy.get('[data-test="mobile-theme-bar"] .theme-switch').click();
    cy.get("body").should("have.class", "lightmode");
    cy.wait(1000);
    cy.get('[data-test="mobile-theme-bar"] .theme-switch').click();
    cy.get("body").should("not.have.class", "lightmode");
    cy.wait(1000);
  });

  // ----- LINKS ----- //
  it("Social/Contact links", () => {
    cy.get('a[aria-label="GitHub"]')
      .should("have.attr", "href", "https://github.com/AngeloMari")
      .and("have.attr", "target", "_blank");
    cy.get('a[aria-label="LinkedIn"]')
      .should(
        "have.attr",
        "href",
        "https://linkedin.com/in/engr-angelo-mari-santos/"
      )
      .and("have.attr", "target", "_blank");
    cy.get('a[aria-label="Email"]').should(
      "have.attr",
      "href",
      "mailto:santosangelomari@gmail.com"
    );
    cy.get('a[aria-label="Call +639762407495"]').should(
      "have.attr",
      "href",
      "tel:+639762407495"
    );
  });
});
