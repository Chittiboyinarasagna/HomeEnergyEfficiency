document.addEventListener("DOMContentLoaded", function () {
    const questionsContainer = document.getElementById("questions-container");
    const form = document.getElementById("audit-form");
    const resultDiv = document.getElementById("result");

    // Efficiency display
    const efficiencyDiv = document.createElement("div");
    efficiencyDiv.id = "efficiency-result";
    efficiencyDiv.classList.add("hidden");
    resultDiv.appendChild(efficiencyDiv);

    // Container for buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("result-container");

    // "View Suggestions" Button
    const suggestionButton = document.createElement("button");
    suggestionButton.textContent = "🔍 View Suggestions";
    suggestionButton.id = "suggestion-btn";
    suggestionButton.classList.add("hidden", "styled-btn");

    buttonContainer.appendChild(suggestionButton);
    resultDiv.appendChild(buttonContainer);

    // 📌 "View Suggestions" button click - Redirects to suggestions page
    suggestionButton.addEventListener("click", function () {
        let efficiency = efficiencyDiv.textContent.match(/\d+(\.\d+)?/)[0]; // Extract efficiency percentage
        window.location.href = `suggestions.html?efficiency=${efficiency}`;
    });

    // Sections and Questions
    const sections = [
        {
            title: "💡 Lighting",
            questions: [
                "Are energy-efficient lighting systems installed?",
                "Are lighting controls (e.g., sensors, timers) in place?",
                "Is there a regular maintenance schedule for lighting systems?",
                "Is there a backup lighting plan in case of power outages?",
                "Are exterior lights optimized for energy savings?",
                "Is lighting usage monitored for energy efficiency?",
                "Are LED alternatives considered for replacements?"
            ]
        },
        {
            title: "🌡️ Heating, Ventilation, and Air Conditioning (HVAC)",
            questions: [
                "Are HVAC systems regularly inspected and maintained?",
                "Are programmable thermostats installed and used effectively?",
                "Is the building properly insulated to reduce HVAC loads?",
                "Are there energy management systems to control HVAC usage?",
                "Is the air filtration system working optimally?",
                "Are seasonal adjustments made to HVAC operations?",
                "Is energy consumption data for HVAC systems tracked?"
            ]
        },
        {
            title: "💻 Appliances and Equipment",
            questions: [
                "Are energy-efficient appliances and equipment in use?",
                "Is there a policy for turning off equipment when not in use?",
                "Are there regular energy audits for major equipment?",
                "Are outdated appliances scheduled for replacement?",
                "Is equipment energy performance regularly monitored?",
                "Are power-saving modes activated on electronic devices?",
                "Is staff trained on energy-efficient equipment usage?"
            ]
        },
        {
            title: "🏠 Building Insulation & Air Leaks",
            questions: [
                "Are windows and doors properly sealed?",
                "Is the insulation adequate for the building type and climate?",
                "Are there any noticeable drafts or areas of heat loss?",
                "Are windows double-glazed to reduce energy loss?",
                "Is there a plan for upgrading the building envelope if needed?",
                "Are roof and wall insulation inspected regularly?",
                "Is moisture control effectively managed to protect insulation?"
            ]
        },
        {
            title: "🌿 Renewable Energy",
            questions: [
                "Has the potential for on-site renewable energy generation been assessed?",
                "Are there any renewable energy systems currently in place?",
                "Is there a plan for future renewable energy projects?",
                "Is the renewable energy system regularly monitored?",
                "Are there incentives in place to support renewable energy adoption?",
                "Is energy storage (e.g., batteries) considered as part of the plan?",
                "Are renewable energy performance metrics tracked over time?"
            ]
        }
    ];

    function toggleSection(event) {
        const sectionDiv = event.currentTarget.nextElementSibling;
        sectionDiv.classList.toggle("hidden");
    }

    sections.forEach((section, sectionIndex) => {
        const sectionHeader = document.createElement("h2");
        sectionHeader.textContent = section.title;
        sectionHeader.addEventListener("click", toggleSection);
        questionsContainer.appendChild(sectionHeader);

        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("section", "hidden");

        section.questions.forEach((question, questionIndex) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");

            questionDiv.innerHTML = `
                <p><strong>${question}</strong></p>
                <div class="option-buttons">
                    <button type="button" class="option-btn" data-value="yes">Yes</button>
                    <button type="button" class="option-btn" data-value="no">No</button>
                </div>
            `;

            sectionDiv.appendChild(questionDiv);
        });

        questionsContainer.appendChild(sectionDiv);
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("option-btn")) {
            const buttons = event.target.parentElement.querySelectorAll(".option-btn");
            buttons.forEach(btn => btn.classList.remove("selected"));
            event.target.classList.add("selected");
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let yesCount = 0;
        let totalQuestions = 0;
        let noResponses = [];

        document.querySelectorAll(".option-btn.selected").forEach(button => {
            const questionText = button.closest(".question").querySelector("p").textContent;
            if (button.getAttribute("data-value") === "yes") {
                yesCount++;
            } else {
                noResponses.push(questionText); // Store "No" responses
            }
            totalQuestions++;
        });

        if (totalQuestions === 0) {
            alert("⚠️ Please answer all questions before submitting.");
            return;
        }

        let efficiency = ((yesCount / totalQuestions) * 100).toFixed(2);
        let rating = efficiency <= 40 ? "🚨 Bad ⚠️" :
                     efficiency <= 70 ? "😐 Average 🔶" :
                     "✅ Good 🌟";

        // Show efficiency result
        efficiencyDiv.innerHTML = `<h3>⚡ Energy Efficiency Score: ${efficiency}%</h3>
                                   <h2>${rating}</h2>`;
        efficiencyDiv.classList.remove("hidden");
        resultDiv.classList.remove("hidden");

        // Store "No" responses in localStorage for use in suggestions.html
        localStorage.setItem("noResponses", JSON.stringify(noResponses));

        // Show "View Suggestions" button if efficiency ≤70%
        suggestionButton.classList.toggle("hidden", efficiency > 70);
    });
});
