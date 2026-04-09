
/* === Wudo Blog Base JS (IIFE safety net) === */
(function() {
  // Clean up any inline max-height/padding on FAQ answers set by AI-generated JS
  document.querySelectorAll('.wudo-blog-faq-answer, .faq-answer').forEach(function(a) {
    a.style.maxHeight = '';
    a.style.padding = '';
  });

  // FAQ Accordion — uses stopImmediatePropagation to prevent duplicate handlers
  // (AI may generate its own FAQ JS; this base handler takes priority)
  // Uses pure class toggle — CSS handles expansion via max-height: 2000px
  document.querySelectorAll('.wudo-blog-faq-question, .faq-question').forEach(function(btn) {
    btn.setAttribute('data-wudo-faq', '1');
    btn.addEventListener('click', function(e) {
      e.stopImmediatePropagation();
      var item = btn.closest('.wudo-blog-faq-item, .faq-item');
      if (!item) { var ans = btn.nextElementSibling; if(ans) ans.classList.toggle('open'); return; }
      var wasActive = item.classList.contains('active');
      // Close all — also clear any inline styles AI JS may have set
      document.querySelectorAll('.wudo-blog-faq-item, .faq-item').forEach(function(el) {
        el.classList.remove('active');
        var a = el.querySelector('.wudo-blog-faq-answer, .faq-answer');
        if (a) { a.classList.remove('open'); a.style.maxHeight = ''; a.style.padding = ''; }
        var ic = el.querySelector('.wudo-blog-faq-icon');
        if (ic) { ic.style.transform = ''; ic.textContent = '+'; }
      });
      // Toggle current
      if (!wasActive) {
        item.classList.add('active');
        var answer = item.querySelector('.wudo-blog-faq-answer, .faq-answer');
        if (answer) { answer.classList.add('open'); answer.style.maxHeight = ''; answer.style.padding = ''; }
        var icon = item.querySelector('.wudo-blog-faq-icon');
        if (icon) { icon.style.transform = 'rotate(180deg)'; icon.textContent = '\u2212'; }
      }
    });
  });

  // TOC smooth scroll
  document.querySelectorAll('.wudo-blog-toc a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
})();

(function() {
        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.wudo-blog-faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const icon = question.querySelector('.wudo-blog-icon');

                // Toggle active class on question button
                question.classList.toggle('active');
                // Toggle 'open' class on answer for height transition
                answer.classList.toggle('open');

                if (answer.classList.contains('open')) {
                    // Set max-height to scrollHeight to allow smooth transition
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = "0";
                }

                // Toggle icon rotation
                if (question.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });

        // Automation Strategy Selector
        const quizSteps = document.querySelectorAll('.wudo-blog-interactive-step');
        const nextButton = document.getElementById('next-button');
        const restartButton = document.getElementById('restart-quiz');
        const progressBar = document.getElementById('progress-bar');
        const interactiveTitle = document.getElementById('interactive-title');
        const interactiveDescription = document.getElementById('interactive-description');
        const progressContainer = document.getElementById('progress-container');
        const navigationButtons = document.getElementById('navigation-buttons');

        let currentStep = 0;
        let answers = {};
        const totalSteps = quizSteps.length - 2; // Index of last question step (excludes results step)

        function updateProgressBar() {
            progressBar.style.width = ((currentStep / totalSteps) * 100) + '%';
        }

        function showStep(stepIndex) {
            quizSteps.forEach((step, index) => {
                step.classList.remove('active');
                if (index === stepIndex) {
                    step.classList.add('active');
                }
            });

            // Hide insights for previous steps
            document.querySelectorAll('.wudo-blog-insight').forEach(insight => insight.classList.remove('active'));

            // Enable/disable next button based on selection for current step
            const currentStepElement = quizSteps[stepIndex];
            const selectedOption = currentStepElement.querySelector('.wudo-blog-option-card.selected');
            nextButton.disabled = !selectedOption;

            updateProgressBar();
        }

        function handleOptionClick(event) {
            const card = event.currentTarget;
            const currentStepElement = card.closest('.wudo-blog-interactive-step');
            const stepIndex = parseInt(currentStepElement.dataset.step) - 1;

            // Clear previous selection for this step
            currentStepElement.querySelectorAll('.wudo-blog-option-card').forEach(option => {
                option.classList.remove('selected');
            });

            // Select current card
            card.classList.add('selected');
            answers[stepIndex] = card.dataset.answer;

            // Show relevant insight
            document.querySelectorAll('.wudo-blog-insight').forEach(insight => insight.classList.remove('active'));
            const insightElement = currentStepElement.querySelector(`.wudo-blog-insight[data-insight="${stepIndex + 1}"]`);
            if (insightElement) {
                insightElement.classList.add('active');
            }

            // Enable next button
            nextButton.disabled = false;
        }

        quizSteps.forEach(step => {
            step.querySelectorAll('.wudo-blog-option-card').forEach(option => {
                option.addEventListener('click', handleOptionClick);
            });
        });

        nextButton.addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            } else if (currentStep === totalSteps) {
                displayResults();
            }
        });

        restartButton.addEventListener('click', () => {
            currentStep = 0;
            answers = {};
            quizSteps.forEach(step => {
                step.querySelectorAll('.wudo-blog-option-card').forEach(option => option.classList.remove('selected'));
            });
            document.querySelectorAll('.wudo-blog-insight').forEach(insight => insight.classList.remove('active'));
            showStep(currentStep);

            // Show intro text and progress bar again
            interactiveTitle.style.display = 'block';
            interactiveDescription.style.display = 'block';
            progressContainer.style.display = 'block';
            navigationButtons.style.display = 'flex';
        });

        function displayResults() {
            let resultType = '';
            let detailsHtml = '';

            // Logic based on answers (simplified example)
            const task = answers[0];
            const data = answers[1];
            const goal = answers[2];
            const budget = answers[3];

            if (task === 'repetitive' && data === 'little' && budget === 'low_budget') {
                resultType = "Rule-Based Automation Master!";
                detailsHtml = `
                    <h5>Why Rule-Based Automation is perfect for you:</h5>
                    <ul>
                        <li><strong>High efficiency for structured tasks:</strong> Ideal for repetitive operations.</li>
                        <li><strong>Cost-effective and easy to implement:</strong> Get started quickly without massive investment.</li>
                        <li><strong>Predictable outcomes:</strong> Ensures consistency and compliance without complex data.</li>
                    </ul>
                    <p>Focus on tasks like data entry, invoicing, and basic customer inquiries. You'll see immediate ROI!</p>
                `;
            } else if (task === 'dynamic' && data === 'plenty' && (goal === 'innovation' || budget === 'high_budget')) {
                resultType = "AI Agent Innovator!";
                detailsHtml = `
                    <h5>Why AI Agents are your next step:</h5>
                    <ul>
                        <li><strong>Adaptive learning & decision-making:</strong> Excel in complex, uncertain environments.</li>
                        <li><strong>Personalization at scale:</strong> Leverage your data for tailored customer experiences.</li>
                        <li><strong>Competitive advantage:</strong> Drive innovation and predictive insights.</li>
                    </ul>
                    <p>Consider advanced customer support, dynamic marketing, or supply chain optimization. Prepare for a transformative journey!</p>
                `;
            } else {
                resultType = "Hybrid Automation Strategist!";
                detailsHtml = `
                    <h5>Why a Hybrid Approach is your winning move:</h5>
                    <ul>
                        <li><strong>Best of both worlds:</strong> Combine predictability with adaptability.</li>
                        <li><strong>Optimize across processes:</strong> Use rule-based for routine, AI for complex.</li>
                        <li><strong>Balanced investment:</strong> Scale up intelligent automation gradually.</li>
                    </ul>
                    <p>Start by automating your structured tasks, then introduce AI agents to enhance areas needing dynamic intelligence, like personalized outreach or advanced analytics.</p>
                `;
            }

            document.getElementById('result-summary').textContent = `Based on your responses, we recommend a ${resultType.toLowerCase()} approach.`;
            document.getElementById('result-details').innerHTML = detailsHtml;

            showStep(quizSteps.length - 1); // Show results step

            // Hide intro text and progress bar on results screen
            interactiveTitle.style.display = 'none';
            interactiveDescription.style.display = 'none';
            progressContainer.style.display = 'none';
            navigationButtons.style.display = 'none';
        }

        // Initial setup
        showStep(currentStep);
    })();