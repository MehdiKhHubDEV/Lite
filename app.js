// Family Task Management Dashboard - Complete Enhanced Version with Scores
class FamilyTaskDashboard {
  constructor() {
    this.data = {
      assetTypes: [],
      levels: [],
      tasks: [],
      families: [],
      familyTasks: [],
      scores: [],
      badges: [],
      rewards: [],
    };

    this.currentSection = "dashboard";
    this.currentModalSave = null;
    this.init();
  }

  init() {
    this.loadData();
    this.setupEventListeners();
    this.generateSampleData();
    this.updateDashboard();
  }

  // Data Management
  loadData() {
    const savedData = localStorage.getItem("familyTaskData");
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
  }

  saveData() {
    localStorage.setItem("familyTaskData", JSON.stringify(this.data));
  }

  generateSampleData() {
    if (this.data.assetTypes.length === 0) {
      // Asset Types
      this.data.assetTypes = [
        {
          id: 1,
          name: "Household",
          description: "Home and family related tasks",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Education",
          description: "Learning and educational activities",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: "Health",
          description: "Health and fitness activities",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      // Badges
      this.data.badges = [
        {
          id: 1,
          asset_type_id: 1,
          title: "Clean Master",
          description: "Completed 10 cleaning tasks",
          score_id: 1,
          icon_url: "fas fa-broom",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          asset_type_id: 1,
          title: "Kitchen Helper",
          description: "Helped with cooking 5 times",
          score_id: 2,
          icon_url: "fas fa-utensils",
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          asset_type_id: 2,
          title: "Study Champion",
          description: "Completed homework for 7 days straight",
          score_id: 3,
          icon_url: "fas fa-graduation-cap",
          created_at: new Date().toISOString(),
        },
        {
          id: 4,
          asset_type_id: 3,
          title: "Fitness Star",
          description: "Exercised for 30 minutes daily for a week",
          score_id: 4,
          icon_url: "fas fa-dumbbell",
          created_at: new Date().toISOString(),
        },
      ];

      // Scores
      this.data.scores = [
        { id: 1, asset_type_id: 1, value_point: 10, badge_id: 1 },
        { id: 2, asset_type_id: 1, value_point: 15, badge_id: 2 },
        { id: 3, asset_type_id: 2, value_point: 20, badge_id: 3 },
        { id: 4, asset_type_id: 3, value_point: 25, badge_id: 4 },
        { id: 5, asset_type_id: 1, value_point: 5, badge_id: null },
        { id: 6, asset_type_id: 2, value_point: 30, badge_id: null },
      ];

      // Levels with badge requirements
      this.data.levels = [
        {
          id: 1,
          asset_type_id: 1,
          level_number: 1,
          name: "Beginner Helper",
          required_points: 100,
          required_badges: [1], // Requires Clean Master badge
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          asset_type_id: 1,
          level_number: 2,
          name: "Active Helper",
          required_points: 300,
          required_badges: [1, 2], // Requires Clean Master + Kitchen Helper
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          asset_type_id: 1,
          level_number: 3,
          name: "Super Helper",
          required_points: 600,
          required_badges: [1, 2],
          created_at: new Date().toISOString(),
        },
        {
          id: 4,
          asset_type_id: 2,
          level_number: 1,
          name: "Student",
          required_points: 150,
          required_badges: [3],
          created_at: new Date().toISOString(),
        },
        {
          id: 5,
          asset_type_id: 2,
          level_number: 2,
          name: "Scholar",
          required_points: 400,
          required_badges: [3],
          created_at: new Date().toISOString(),
        },
        {
          id: 6,
          asset_type_id: 3,
          level_number: 1,
          name: "Health Conscious",
          required_points: 200,
          required_badges: [4],
          created_at: new Date().toISOString(),
        },
      ];

      // Tasks
      this.data.tasks = [
        {
          id: 1,
          title: "Clean Your Room",
          description: "Make bed, organize clothes, and clean surfaces",
          badge_id: 1,
          score_id: 1,
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Help with Dinner",
          description: "Assist with meal preparation and table setting",
          badge_id: 2,
          score_id: 2,
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          title: "Complete Homework",
          description: "Finish all assigned homework and review lessons",
          badge_id: 3,
          score_id: 3,
          created_at: new Date().toISOString(),
        },
        {
          id: 4,
          title: "Exercise Time",
          description: "30 minutes of physical activity",
          badge_id: 4,
          score_id: 4,
          created_at: new Date().toISOString(),
        },
        {
          id: 5,
          title: "Take Out Trash",
          description: "Empty all wastebaskets and take to curb",
          badge_id: null,
          score_id: 5,
          created_at: new Date().toISOString(),
        },
      ];

      // Families
      this.data.families = [
        {
          id: 1,
          name: "The Johnson Family",
          sum_score: 0,
          earned_badges: [],
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          name: "The Smith Family",
          sum_score: 0,
          earned_badges: [],
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          name: "The Brown Family",
          sum_score: 0,
          earned_badges: [],
          created_at: new Date().toISOString(),
        },
      ];

      // Family Tasks (some completed for demo)
      this.data.familyTasks = [
        {
          id: 1,
          family_id: 1,
          task_id: 1,
          is_completed: true,
          completed_at: new Date().toISOString(),
          assets_earned: 1,
        },
        {
          id: 2,
          family_id: 1,
          task_id: 2,
          is_completed: true,
          completed_at: new Date().toISOString(),
          assets_earned: 2,
        },
        {
          id: 3,
          family_id: 2,
          task_id: 1,
          is_completed: true,
          completed_at: new Date().toISOString(),
          assets_earned: 1,
        },
        {
          id: 4,
          family_id: 2,
          task_id: 3,
          is_completed: false,
          completed_at: null,
          assets_earned: 0,
        },
        {
          id: 5,
          family_id: 3,
          task_id: 4,
          is_completed: true,
          completed_at: new Date().toISOString(),
          assets_earned: 4,
        },
      ];

      // Enhanced Rewards with multiple requirement options
      this.data.rewards = [
        {
          id: 1,
          asset_type_id: 1,
          title: "Movie Night Choice",
          level_id: 1,
          score_id: 1,
          badge_id: 1,
          requirement_type: "all", // 'any' or 'all' or 'level_only' or 'score_only' or 'badge_only'
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          asset_type_id: 1,
          title: "Extra Allowance",
          level_id: 2,
          score_id: null,
          badge_id: null,
          requirement_type: "level_only",
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          asset_type_id: 2,
          title: "Educational Game",
          level_id: null,
          score_id: 3,
          badge_id: 3,
          requirement_type: "any", // Either score OR badge
          created_at: new Date().toISOString(),
        },
      ];

      this.calculateFamilyScores();
      this.updateFamilyBadges();
      this.saveData();
    }
  }

  calculateFamilyScores() {
    this.data.families.forEach((family) => {
      let totalScore = 0;
      const familyTasks = this.data.familyTasks.filter(
        (ft) => ft.family_id === family.id && ft.is_completed
      );

      familyTasks.forEach((familyTask) => {
        const task = this.data.tasks.find((t) => t.id === familyTask.task_id);
        if (task) {
          const score = this.data.scores.find((s) => s.id === task.score_id);
          if (score) {
            totalScore += score.value_point;
          }
        }
      });

      family.sum_score = totalScore;
    });
  }

  updateFamilyBadges() {
    this.data.families.forEach((family) => {
      if (!family.earned_badges) {
        family.earned_badges = [];
      }

      // Check for earned badges based on completed tasks
      const completedTasks = this.data.familyTasks.filter(
        (ft) => ft.family_id === family.id && ft.is_completed
      );

      completedTasks.forEach((familyTask) => {
        const task = this.data.tasks.find((t) => t.id === familyTask.task_id);
        if (
          task &&
          task.badge_id &&
          !family.earned_badges.includes(task.badge_id)
        ) {
          family.earned_badges.push(task.badge_id);
        }
      });
    });
  }

  // Event Listeners
  setupEventListeners() {
    // Navigation
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const section = e.currentTarget.dataset.section;
        this.switchSection(section);
      });
    });

    // Modal close events
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        this.closeModal();
      }
    });

    // Form submissions
    document.getElementById("modal-save-btn").addEventListener("click", () => {
      this.handleModalSave();
    });
  }

  switchSection(section) {
    // Update navigation
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(`[data-section="${section}"]`)
      .classList.add("active");

    // Update content
    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(section).classList.add("active");

    this.currentSection = section;
    this.renderSection(section);
  }

  renderSection(section) {
    switch (section) {
      case "dashboard":
        this.renderDashboard();
        break;
      case "families":
        this.renderFamilies();
        break;
      case "tasks":
        this.renderTasks();
        break;
      case "badges":
        this.renderBadges();
        break;
      case "scores":
        this.renderScores();
        break;
      case "levels":
        this.renderLevels();
        break;
      case "rewards":
        this.renderRewards();
        break;
      case "asset-types":
        this.renderAssetTypes();
        break;
    }
  }

  renderDashboard() {
    this.updateStats();
    this.renderLeaderboard();
    this.renderRecentActivities();
  }

  updateStats() {
    document.getElementById("total-families").textContent =
      this.data.families.length;
    document.getElementById("total-tasks").textContent = this.data.tasks.length;
    document.getElementById("completed-tasks").textContent =
      this.data.familyTasks.filter((ft) => ft.is_completed).length;
    document.getElementById("total-badges").textContent =
      this.data.badges.length;
    document.getElementById("total-scores").textContent =
      this.data.scores.length;
  }

  renderLeaderboard() {
    const leaderboard = document.getElementById("family-leaderboard");
    const sortedFamilies = [...this.data.families].sort(
      (a, b) => b.sum_score - a.sum_score
    );

    leaderboard.innerHTML = sortedFamilies
      .map((family, index) => {
        const completedTasks = this.data.familyTasks.filter(
          (ft) => ft.family_id === family.id && ft.is_completed
        ).length;

        const badgeCount = family.earned_badges
          ? family.earned_badges.length
          : 0;

        return `
                <div class="leaderboard-item">
                    <div class="leaderboard-rank rank-${index + 1}">${
          index + 1
        }</div>
                    <div class="leaderboard-info">
                        <h4>${family.name}</h4>
                        <p>${completedTasks} tasks • ${badgeCount} badges</p>
                    </div>
                    <div class="leaderboard-score">${family.sum_score}</div>
                </div>
            `;
      })
      .join("");
  }

  renderRecentActivities() {
    const activities = document.getElementById("recent-activities");
    const recentCompletions = this.data.familyTasks
      .filter((ft) => ft.is_completed && ft.completed_at)
      .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
      .slice(0, 5);

    activities.innerHTML = recentCompletions
      .map((completion) => {
        const family = this.data.families.find(
          (f) => f.id === completion.family_id
        );
        const task = this.data.tasks.find((t) => t.id === completion.task_id);
        const completedDate = new Date(completion.completed_at);

        return `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <div class="activity-info">
                        <p><strong>${family?.name}</strong> completed "${
          task?.title
        }"</p>
                        <div class="activity-time">${this.formatDate(
                          completedDate
                        )}</div>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  renderFamilies() {
    const tbody = document.querySelector("#families-table tbody");
    this.calculateFamilyScores();
    this.updateFamilyBadges();

    tbody.innerHTML = this.data.families
      .map((family) => {
        const completedTasks = this.data.familyTasks.filter(
          (ft) => ft.family_id === family.id && ft.is_completed
        ).length;

        const currentLevel = this.getCurrentLevel(
          family.sum_score,
          family.earned_badges,
          1
        );
        const badgeCount = family.earned_badges
          ? family.earned_badges.length
          : 0;

        return `
                <tr>
                    <td>${family.id}</td>
                    <td><strong>${family.name}</strong></td>
                    <td><span class="text-success"><strong>${
                      family.sum_score
                    }</strong></span></td>
                    <td>${currentLevel ? currentLevel.name : "No Level"}</td>
                    <td>${completedTasks} tasks<br><small class="text-muted">${badgeCount} badges</small></td>
                    <td>${this.formatDate(new Date(family.created_at))}</td>
                    <td class="actions">
                        <button class="btn btn-sm btn-primary" onclick="dashboard.editFamily(${
                          family.id
                        })">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-success" onclick="dashboard.showTaskAssignment(${
                          family.id
                        })">
                            <i class="fas fa-tasks"></i>
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="dashboard.showFamilyProgress(${
                          family.id
                        })">
                            <i class="fas fa-chart-line"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="dashboard.deleteFamily(${
                          family.id
                        })">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
      })
      .join("");
  }

  showFamilyProgress(familyId) {
    const family = this.data.families.find((f) => f.id === familyId);
    if (!family) return;

    const earnedBadges = family.earned_badges || [];
    const badgesList = earnedBadges
      .map((badgeId) => {
        const badge = this.data.badges.find((b) => b.id === badgeId);
        return badge
          ? `
                <div class="badge-mini">
                    <i class="${badge.icon_url}"></i>
                    <span>${badge.title}</span>
                </div>
            `
          : "";
      })
      .join("");

    const availableLevels = this.data.levels.filter((l) => {
      return this.checkLevelRequirements(family.sum_score, earnedBadges, l);
    });

    const content = `
            <div class="family-progress">
                <h4>${family.name} Progress</h4>
                <div class="progress-stats">
                    <div class="stat">
                        <strong>Score:</strong> ${family.sum_score}
                    </div>
                    <div class="stat">
                        <strong>Badges:</strong> ${earnedBadges.length}
                    </div>
                </div>
                
                <h5>Earned Badges:</h5>
                <div class="badges-list">
                    ${
                      badgesList ||
                      '<p class="text-muted">No badges earned yet</p>'
                    }
                </div>
                
                <h5>Available Levels:</h5>
                <div class="levels-list">
                    ${
                      availableLevels
                        .map(
                          (level) => `
                        <div class="level-item">
                            <strong>${level.name}</strong>
                            <small>(${level.required_points} points required)</small>
                        </div>
                    `
                        )
                        .join("") ||
                      '<p class="text-muted">No levels available</p>'
                    }
                </div>
            </div>
        `;

    this.showModal("Family Progress", content, null);
  }

  renderTasks() {
    const tbody = document.querySelector("#tasks-table tbody");

    tbody.innerHTML = this.data.tasks
      .map((task) => {
        const badge = this.data.badges.find((b) => b.id === task.badge_id);
        const score = this.data.scores.find((s) => s.id === task.score_id);

        return `
                <tr>
                    <td>${task.id}</td>
                    <td><strong>${task.title}</strong></td>
                    <td>${task.description}</td>
                    <td><span class="text-success"><strong>${
                      score?.value_point || 0
                    }</strong></span></td>
                    <td>
                        ${
                          badge
                            ? `
                            <span class="status-badge status-active">
                                <i class="${badge.icon_url}"></i> ${badge.title}
                            </span>
                        `
                            : "No Badge"
                        }
                    </td>
                    <td>${this.formatDate(new Date(task.created_at))}</td>
                    <td class="actions">
                        <button class="btn btn-sm btn-primary" onclick="dashboard.editTask(${
                          task.id
                        })">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="dashboard.deleteTask(${
                          task.id
                        })">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
      })
      .join("");
  }

  renderBadges() {
    const badgesGrid = document.getElementById("badges-grid");

    badgesGrid.innerHTML = this.data.badges
      .map((badge) => {
        const assetType = this.data.assetTypes.find(
          (at) => at.id === badge.asset_type_id
        );
        const relatedScores = this.data.scores.filter(
          (s) => s.badge_id === badge.id
        );
        const scoresList = relatedScores
          .map(
            (score) => `<span class="score-tag">${score.value_point} pts</span>`
          )
          .join("");

        return `
                <div class="badge-card">
                    <div class="badge-icon">
                        <i class="${badge.icon_url}"></i>
                    </div>
                    <h3>${badge.title}</h3>
                    <p>${badge.description}</p>
                    <div class="text-muted mb-2">Asset Type: ${
                      assetType?.name || "Unknown"
                    }</div>
                    <div class="scores-section mb-3">
                        <strong>Associated Scores:</strong>
                        <div class="scores-list">
                            ${
                              scoresList ||
                              '<span class="text-muted">No scores</span>'
                            }
                        </div>
                    </div>
                    <div class="badge-actions">
                        <button class="btn btn-sm btn-primary" onclick="dashboard.editBadge(${
                          badge.id
                        })">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="dashboard.deleteBadge(${
                          badge.id
                        })">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  renderScores() {
    const tbody = document.querySelector("#scores-table tbody");

    tbody.innerHTML = this.data.scores
      .map((score) => {
        const assetType = this.data.assetTypes.find(
          (at) => at.id === score.asset_type_id
        );
        const badge = this.data.badges.find((b) => b.id === score.badge_id);
        const tasksUsingThisScore = this.data.tasks.filter(
          (t) => t.score_id === score.id
        );

        return `
                <tr>
                    <td>${score.id}</td>
                    <td>${assetType?.name || "Unknown"}</td>
                    <td>
                        <span class="score-tag">${score.value_point} pts</span>
                    </td>
                    <td>
                        ${
                          badge
                            ? `
                            <span class="status-badge status-active">
                                <i class="${badge.icon_url}"></i> ${badge.title}
                            </span>
                        `
                            : '<span class="text-muted">No Badge</span>'
                        }
                    </td>
                    <td>
                        <div class="tasks-list">
                            ${
                              tasksUsingThisScore
                                .map(
                                  (task) =>
                                    `<span class="task-tag">${task.title}</span>`
                                )
                                .join("") ||
                              '<span class="text-muted">No tasks</span>'
                            }
                        </div>
                    </td>
                    <td class="actions">
                        <button class="btn btn-sm btn-primary" onclick="dashboard.editScore(${
                          score.id
                        })">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="dashboard.deleteScore(${
                          score.id
                        })" ${
          tasksUsingThisScore.length > 0
            ? 'disabled title="Cannot delete: Score is being used by tasks"'
            : ""
        }>
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
      })
      .join("");
  }

  renderLevels() {
    const tbody = document.querySelector("#levels-table tbody");

    tbody.innerHTML = this.data.levels
      .map((level) => {
        const assetType = this.data.assetTypes.find(
          (at) => at.id === level.asset_type_id
        );
        const requiredBadges = level.required_badges || [];
        const badgeNames = requiredBadges
          .map((badgeId) => {
            const badge = this.data.badges.find((b) => b.id === badgeId);
            return badge ? badge.title : "Unknown";
          })
          .join(", ");

        return `
                <tr>
                    <td>${level.id}</td>
                    <td>${assetType?.name || "Unknown"}</td>
                    <td><strong>${level.level_number}</strong></td>
                    <td>${level.name}</td>
                    <td><span class="text-warning"><strong>${
                      level.required_points
                    }</strong></span></td>
                    <td>
                        <small class="text-info">
                            ${badgeNames || "No badges required"}
                        </small>
                    </td>
                    <td>${this.formatDate(new Date(level.created_at))}</td>
                    <td class="actions">
                        <button class="btn btn-sm btn-primary" onclick="dashboard.editLevel(${
                          level.id
                        })">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="dashboard.deleteLevel(${
                          level.id
                        })">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
      })
      .join("");
  }

  renderRewards() {
    const rewardsGrid = document.getElementById("rewards-grid");

    rewardsGrid.innerHTML = this.data.rewards
      .map((reward) => {
        const assetType = this.data.assetTypes.find(
          (at) => at.id === reward.asset_type_id
        );
        const level = this.data.levels.find((l) => l.id === reward.level_id);
        const badge = this.data.badges.find((b) => b.id === reward.badge_id);
        const score = this.data.scores.find((s) => s.id === reward.score_id);

        const requirementText = this.getRequirementText(reward);

        return `
                <div class="reward-card">
                    <h3>${reward.title}</h3>
                    <div class="reward-info">
                        <div>
                            <strong>Asset Type</strong>
                            <span>${assetType?.name || "N/A"}</span>
                        </div>
                        <div>
                            <strong>Requirement Type</strong>
                            <span class="requirement-type">${
                              reward.requirement_type
                                ?.replace("_", " ")
                                .toUpperCase() || "ALL"
                            }</span>
                        </div>
                    </div>
                    <div class="requirements-details">
                        <strong>Requirements:</strong>
                        <div class="requirements-list">
                            ${
                              level
                                ? `<span class="req-item level-req"><i class="fas fa-layer-group"></i> ${level.name}</span>`
                                : ""
                            }
                            ${
                              score
                                ? `<span class="req-item score-req"><i class="fas fa-star"></i> ${score.value_point} pts</span>`
                                : ""
                            }
                            ${
                              badge
                                ? `<span class="req-item badge-req"><i class="${badge.icon_url}"></i> ${badge.title}</span>`
                                : ""
                            }
                        </div>
                    </div>
                    <div class="reward-actions">
                        <div class="text-muted">
                            <small>${requirementText}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary" onclick="dashboard.editReward(${
                              reward.id
                            })">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="dashboard.deleteReward(${
                              reward.id
                            })">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  renderAssetTypes() {
    const tbody = document.querySelector("#asset-types-table tbody");

    tbody.innerHTML = this.data.assetTypes
      .map((assetType) => {
        const levelCount = this.data.levels.filter(
          (l) => l.asset_type_id === assetType.id
        ).length;
        const badgeCount = this.data.badges.filter(
          (b) => b.asset_type_id === assetType.id
        ).length;

        return `
                <tr>
                    <td>${assetType.id}</td>
                    <td><strong>${assetType.name}</strong></td>
                    <td>${assetType.description}</td>
                    <td><span class="status-badge status-active">${levelCount}</span></td>
                    <td><span class="status-badge status-completed">${badgeCount}</span></td>
                    <td>${this.formatDate(new Date(assetType.created_at))}</td>
                    <td class="actions">
                        <button class="btn btn-sm btn-primary" onclick="dashboard.editAssetType(${
                          assetType.id
                        })">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="dashboard.deleteAssetType(${
                          assetType.id
                        })">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
      })
      .join("");
  }

  // Modal Functions
  showModal(title, content, saveCallback) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-body").innerHTML = content;
    document.getElementById("modal-overlay").classList.add("active");
    this.currentModalSave = saveCallback;
  }

  closeModal() {
    document.getElementById("modal-overlay").classList.remove("active");
    this.currentModalSave = null;
  }

  handleModalSave() {
    if (this.currentModalSave) {
      this.currentModalSave();
    }
  }

  // Family CRUD Operations
  showAddFamilyModal() {
    const content = `
            <form id="family-form">
                <div class="form-group">
                    <label for="family-name">Family Name:</label>
                    <input type="text" id="family-name" name="name" required>
                </div>
            </form>
        `;

    this.showModal("Add New Family", content, () => {
      const form = document.getElementById("family-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        const newFamily = {
          id: this.getNextId("families"),
          name: formData.get("name"),
          sum_score: 0,
          earned_badges: [],
          created_at: new Date().toISOString(),
        };

        this.data.families.push(newFamily);
        this.saveData();
        this.renderFamilies();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Family added successfully!", "success");
      }
    });
  }

  editFamily(id) {
    const family = this.data.families.find((f) => f.id === id);
    if (!family) return;

    const content = `
            <form id="family-form">
                <div class="form-group">
                    <label for="family-name">Family Name:</label>
                    <input type="text" id="family-name" name="name" value="${family.name}" required>
                </div>
            </form>
        `;

    this.showModal("Edit Family", content, () => {
      const form = document.getElementById("family-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        family.name = formData.get("name");
        family.updated_at = new Date().toISOString();

        this.saveData();
        this.renderFamilies();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Family updated successfully!", "success");
      }
    });
  }

  deleteFamily(id) {
    if (
      confirm(
        "Are you sure you want to delete this family? This will also remove all their task assignments."
      )
    ) {
      // Remove family tasks first
      this.data.familyTasks = this.data.familyTasks.filter(
        (ft) => ft.family_id !== id
      );
      // Remove family
      this.data.families = this.data.families.filter((f) => f.id !== id);

      this.saveData();
      this.renderFamilies();
      this.updateDashboard();
      this.showNotification("Family deleted successfully!", "success");
    }
  }

  // Task CRUD Operations
  showAddTaskModal() {
    const badgeOptions = this.data.badges
      .map((badge) => `<option value="${badge.id}">${badge.title}</option>`)
      .join("");

    const scoreOptions = this.data.scores
      .map(
        (score) =>
          `<option value="${score.id}">${score.value_point} points</option>`
      )
      .join("");

    const content = `
            <form id="task-form">
                <div class="form-group">
                    <label for="task-title">Task Title:</label>
                    <input type="text" id="task-title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="task-description">Description:</label>
                    <textarea id="task-description" name="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="task-badge">Badge (at least one of Badge or Score required):</label>
                    <select id="task-badge" name="badge_id">
                        <option value="">Select a badge</option>
                        ${badgeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="task-score">Score (at least one of Badge or Score required):</label>
                    <select id="task-score" name="score_id">
                        <option value="">Select score points</option>
                        ${scoreOptions}
                    </select>
                </div>
                <div id="task-validation-error" class="validation-error" style="display: none; color: #dc3545; margin-top: 10px; padding: 10px; background: #f8d7da; border-radius: 4px;">
                    <i class="fas fa-exclamation-circle"></i> At least one of Badge or Score must be selected.
                </div>
            </form>
        `;

    this.showModal("Add New Task", content, () => {
      const form = document.getElementById("task-form");
      const formData = new FormData(form);
      const badgeId = parseInt(formData.get("badge_id")) || null;
      const scoreId = parseInt(formData.get("score_id")) || null;
      const errorDiv = document.getElementById("task-validation-error");

      // Custom validation: at least one of badge_id or score_id must be non-null
      if (!badgeId && !scoreId) {
        errorDiv.style.display = "block";
        return;
      }

      errorDiv.style.display = "none";

      if (form.checkValidity()) {
        const newTask = {
          id: this.getNextId("tasks"),
          title: formData.get("title"),
          description: formData.get("description"),
          badge_id: badgeId,
          score_id: scoreId,
          created_at: new Date().toISOString(),
        };

        this.data.tasks.push(newTask);
        this.saveData();
        this.renderTasks();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Task added successfully!", "success");
      }
    });
  }

  editTask(id) {
    const task = this.data.tasks.find((t) => t.id === id);
    if (!task) return;

    const badgeOptions = this.data.badges
      .map(
        (badge) =>
          `<option value="${badge.id}" ${
            badge.id === task.badge_id ? "selected" : ""
          }>${badge.title}</option>`
      )
      .join("");

    const scoreOptions = this.data.scores
      .map(
        (score) =>
          `<option value="${score.id}" ${
            score.id === task.score_id ? "selected" : ""
          }>${score.value_point} points</option>`
      )
      .join("");

    const content = `
            <form id="task-form">
                <div class="form-group">
                    <label for="task-title">Task Title:</label>
                    <input type="text" id="task-title" name="title" value="${task.title}" required>
                </div>
                <div class="form-group">
                    <label for="task-description">Description:</label>
                    <textarea id="task-description" name="description" required>${task.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="task-badge">Badge (at least one of Badge or Score required):</label>
                    <select id="task-badge" name="badge_id">
                        <option value="">Select a badge</option>
                        ${badgeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="task-score">Score (at least one of Badge or Score required):</label>
                    <select id="task-score" name="score_id">
                        <option value="">Select score points</option>
                        ${scoreOptions}
                    </select>
                </div>
                <div id="task-validation-error" class="validation-error" style="display: none; color: #dc3545; margin-top: 10px; padding: 10px; background: #f8d7da; border-radius: 4px;">
                    <i class="fas fa-exclamation-circle"></i> At least one of Badge or Score must be selected.
                </div>
            </form>
        `;

    this.showModal("Edit Task", content, () => {
      const form = document.getElementById("task-form");
      const formData = new FormData(form);
      const badgeId = parseInt(formData.get("badge_id")) || null;
      const scoreId = parseInt(formData.get("score_id")) || null;
      const errorDiv = document.getElementById("task-validation-error");

      // Custom validation: at least one of badge_id or score_id must be non-null
      if (!badgeId && !scoreId) {
        errorDiv.style.display = "block";
        return;
      }

      errorDiv.style.display = "none";

      if (form.checkValidity()) {
        task.title = formData.get("title");
        task.description = formData.get("description");
        task.badge_id = badgeId;
        task.score_id = scoreId;

        this.saveData();
        this.renderTasks();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Task updated successfully!", "success");
      }
    });
  }

  deleteTask(id) {
    if (
      confirm(
        "Are you sure you want to delete this task? This will also remove all related family task assignments."
      )
    ) {
      // Remove family tasks first
      this.data.familyTasks = this.data.familyTasks.filter(
        (ft) => ft.task_id !== id
      );
      // Remove task
      this.data.tasks = this.data.tasks.filter((t) => t.id !== id);

      this.saveData();
      this.renderTasks();
      this.updateDashboard();
      this.showNotification("Task deleted successfully!", "success");
    }
  }

  // Badge CRUD Operations
  showAddBadgeModal() {
    const assetTypeOptions = this.data.assetTypes
      .map((at) => `<option value="${at.id}">${at.name}</option>`)
      .join("");

    const scoreOptions = this.data.scores
      .map(
        (score) =>
          `<option value="${score.id}">${score.value_point} points - ${
            this.data.assetTypes.find((at) => at.id === score.asset_type_id)
              ?.name || "Unknown"
          }</option>`
      )
      .join("");

    const iconOptions = [
      "fas fa-medal",
      "fas fa-trophy",
      "fas fa-star",
      "fas fa-crown",
      "fas fa-broom",
      "fas fa-utensils",
      "fas fa-graduation-cap",
      "fas fa-dumbbell",
      "fas fa-heart",
      "fas fa-thumbs-up",
      "fas fa-check-circle",
      "fas fa-fire",
    ]
      .map((icon) => `<option value="${icon}">${icon}</option>`)
      .join("");

    const content = `
            <form id="badge-form">
                <div class="form-group">
                    <label for="badge-asset-type">Asset Type:</label>
                    <select id="badge-asset-type" name="asset_type_id" required>
                        <option value="">Select asset type</option>
                        ${assetTypeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="badge-title">Badge Title:</label>
                    <input type="text" id="badge-title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="badge-description">Description:</label>
                    <textarea id="badge-description" name="description" required></textarea>
                </div>
                <div class="form-group">
                    <label for="badge-icon">Icon:</label>
                    <select id="badge-icon" name="icon_url" required>
                        <option value="">Select an icon</option>
                        ${iconOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="badge-scores">Associated Scores (hold Ctrl/Cmd to select multiple):</label>
                    <select id="badge-scores" name="score_ids" multiple>
                        ${scoreOptions}
                    </select>
                    <small class="text-muted">Select scores to associate with this badge</small>
                </div>
            </form>
        `;

    this.showModal("Add New Badge", content, () => {
      const form = document.getElementById("badge-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        const selectedScores = Array.from(
          document.getElementById("badge-scores").selectedOptions
        ).map((option) => parseInt(option.value));

        const newBadge = {
          id: this.getNextId("badges"),
          asset_type_id: parseInt(formData.get("asset_type_id")),
          title: formData.get("title"),
          description: formData.get("description"),
          score_id: null, // Kept for backwards compatibility, but associations managed via badge_id in Score objects
          icon_url: formData.get("icon_url"),
          created_at: new Date().toISOString(),
        };

        this.data.badges.push(newBadge);

        // Update selected scores to reference this badge
        selectedScores.forEach((scoreId) => {
          const score = this.data.scores.find((s) => s.id === scoreId);
          if (score) {
            score.badge_id = newBadge.id;
          }
        });

        this.saveData();
        this.renderBadges();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Badge added successfully!", "success");
      }
    });
  }

  editBadge(id) {
    const badge = this.data.badges.find((b) => b.id === id);
    if (!badge) return;

    const assetTypeOptions = this.data.assetTypes
      .map(
        (at) =>
          `<option value="${at.id}" ${
            at.id === badge.asset_type_id ? "selected" : ""
          }>${at.name}</option>`
      )
      .join("");

    // Get currently associated scores
    const associatedScores = this.data.scores.filter(
      (s) => s.badge_id === badge.id
    );
    const associatedScoreIds = associatedScores.map((s) => s.id);

    const scoreOptions = this.data.scores
      .map((score) => {
        const isSelected = associatedScoreIds.includes(score.id);
        const assetTypeName =
          this.data.assetTypes.find((at) => at.id === score.asset_type_id)
            ?.name || "Unknown";
        return `<option value="${score.id}" ${isSelected ? "selected" : ""}>${
          score.value_point
        } points - ${assetTypeName}</option>`;
      })
      .join("");

    const iconOptions = [
      "fas fa-medal",
      "fas fa-trophy",
      "fas fa-star",
      "fas fa-crown",
      "fas fa-broom",
      "fas fa-utensils",
      "fas fa-graduation-cap",
      "fas fa-dumbbell",
      "fas fa-heart",
      "fas fa-thumbs-up",
      "fas fa-check-circle",
      "fas fa-fire",
    ]
      .map(
        (icon) =>
          `<option value="${icon}" ${
            icon === badge.icon_url ? "selected" : ""
          }>${icon}</option>`
      )
      .join("");

    const content = `
            <form id="badge-form">
                <div class="form-group">
                    <label for="badge-asset-type">Asset Type:</label>
                    <select id="badge-asset-type" name="asset_type_id" required>
                        <option value="">Select asset type</option>
                        ${assetTypeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="badge-title">Badge Title:</label>
                    <input type="text" id="badge-title" name="title" value="${badge.title}" required>
                </div>
                <div class="form-group">
                    <label for="badge-description">Description:</label>
                    <textarea id="badge-description" name="description" required>${badge.description}</textarea>
                </div>
                <div class="form-group">
                    <label for="badge-icon">Icon:</label>
                    <select id="badge-icon" name="icon_url" required>
                        <option value="">Select an icon</option>
                        ${iconOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="badge-scores">Associated Scores (hold Ctrl/Cmd to select multiple):</label>
                    <select id="badge-scores" name="score_ids" multiple>
                        ${scoreOptions}
                    </select>
                    <small class="text-muted">Select scores to associate with this badge</small>
                </div>
            </form>
        `;

    this.showModal("Edit Badge", content, () => {
      const form = document.getElementById("badge-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        const selectedScores = Array.from(
          document.getElementById("badge-scores").selectedOptions
        ).map((option) => parseInt(option.value));

        badge.asset_type_id = parseInt(formData.get("asset_type_id"));
        badge.title = formData.get("title");
        badge.description = formData.get("description");
        badge.icon_url = formData.get("icon_url");

        // Update score associations: remove old associations
        this.data.scores.forEach((score) => {
          if (score.badge_id === badge.id) {
            score.badge_id = null;
          }
        });

        // Add new associations
        selectedScores.forEach((scoreId) => {
          const score = this.data.scores.find((s) => s.id === scoreId);
          if (score) {
            score.badge_id = badge.id;
          }
        });

        this.saveData();
        this.renderBadges();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Badge updated successfully!", "success");
      }
    });
  }

  deleteBadge(id) {
    if (
      confirm(
        "Are you sure you want to delete this badge? This will affect related tasks and scores."
      )
    ) {
      // Remove related scores
      this.data.scores = this.data.scores.filter((s) => s.badge_id !== id);
      // Update tasks that reference this badge
      this.data.tasks.forEach((task) => {
        if (task.badge_id === id) {
          task.badge_id = null;
        }
      });
      // Remove badge
      this.data.badges = this.data.badges.filter((b) => b.id !== id);

      this.saveData();
      this.renderBadges();
      this.renderTasks();
      this.updateDashboard();
      this.showNotification("Badge deleted successfully!", "success");
    }
  }

  // Score CRUD Operations
  showAddScoreModal() {
    const assetTypeOptions = this.data.assetTypes
      .map((at) => `<option value="${at.id}">${at.name}</option>`)
      .join("");

    const badgeOptions = this.data.badges
      .map(
        (badge) =>
          `<option value="${badge.id}">${badge.title} - ${badge.description}</option>`
      )
      .join("");

    const content = `
            <form id="score-form">
                <div class="form-group">
                    <label for="score-asset-type">Asset Type:</label>
                    <select id="score-asset-type" name="asset_type_id" required>
                        <option value="">Select asset type</option>
                        ${assetTypeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="score-points">Point Value:</label>
                    <input type="number" id="score-points" name="value_point" min="1" max="1000" required>
                    <small class="text-muted">Enter the point value for this score (1-1000)</small>
                </div>
                <div class="form-group">
                    <label for="score-badge">Associated Badge (Optional):</label>
                    <select id="score-badge" name="badge_id">
                        <option value="">No badge association</option>
                        ${badgeOptions}
                    </select>
                    <small class="text-muted">Link this score to a specific badge</small>
                </div>
            </form>
        `;

    this.showModal("Add New Score", content, () => {
      const form = document.getElementById("score-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        const newScore = {
          id: this.getNextId("scores"),
          asset_type_id: parseInt(formData.get("asset_type_id")),
          value_point: parseInt(formData.get("value_point")),
          badge_id: parseInt(formData.get("badge_id")) || null,
        };

        this.data.scores.push(newScore);
        this.saveData();
        this.renderScores();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Score added successfully!", "success");
      }
    });
  }

  editScore(id) {
    const score = this.data.scores.find((s) => s.id === id);
    if (!score) return;

    const assetTypeOptions = this.data.assetTypes
      .map(
        (at) =>
          `<option value="${at.id}" ${
            at.id === score.asset_type_id ? "selected" : ""
          }>${at.name}</option>`
      )
      .join("");

    const badgeOptions = this.data.badges
      .map(
        (badge) =>
          `<option value="${badge.id}" ${
            badge.id === score.badge_id ? "selected" : ""
          }>${badge.title} - ${badge.description}</option>`
      )
      .join("");

    const content = `
            <form id="score-form">
                <div class="form-group">
                    <label for="score-asset-type">Asset Type:</label>
                    <select id="score-asset-type" name="asset_type_id" required>
                        <option value="">Select asset type</option>
                        ${assetTypeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="score-points">Point Value:</label>
                    <input type="number" id="score-points" name="value_point" value="${score.value_point}" min="1" max="1000" required>
                    <small class="text-muted">Enter the point value for this score (1-1000)</small>
                </div>
                <div class="form-group">
                    <label for="score-badge">Associated Badge (Optional):</label>
                    <select id="score-badge" name="badge_id">
                        <option value="">No badge association</option>
                        ${badgeOptions}
                    </select>
                    <small class="text-muted">Link this score to a specific badge</small>
                </div>
            </form>
        `;

    this.showModal("Edit Score", content, () => {
      const form = document.getElementById("score-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        score.asset_type_id = parseInt(formData.get("asset_type_id"));
        score.value_point = parseInt(formData.get("value_point"));
        score.badge_id = parseInt(formData.get("badge_id")) || null;

        // Update family scores if needed
        this.calculateFamilyScores();

        this.saveData();
        this.renderScores();
        this.renderTasks(); // Update tasks display
        this.renderFamilies(); // Update families with new scores
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Score updated successfully!", "success");
      }
    });
  }

  deleteScore(id) {
    // Check if score is being used by any tasks
    const tasksUsingScore = this.data.tasks.filter((t) => t.score_id === id);

    if (tasksUsingScore.length > 0) {
      this.showNotification(
        "Cannot delete score: It is being used by active tasks.",
        "error"
      );
      return;
    }

    if (confirm("Are you sure you want to delete this score?")) {
      // Remove score
      this.data.scores = this.data.scores.filter((s) => s.id !== id);

      // Update badges that reference this score
      this.data.badges.forEach((badge) => {
        if (badge.score_id === id) {
          badge.score_id = null;
        }
      });

      // Update rewards that reference this score
      this.data.rewards.forEach((reward) => {
        if (reward.score_id === id) {
          reward.score_id = null;
        }
      });

      this.saveData();
      this.renderScores();
      this.renderBadges();
      this.renderRewards();
      this.updateDashboard();
      this.showNotification("Score deleted successfully!", "success");
    }
  }

  // Level CRUD Operations
  showAddLevelModal() {
    const assetTypeOptions = this.data.assetTypes
      .map((at) => `<option value="${at.id}">${at.name}</option>`)
      .join("");

    const badgeOptions = this.data.badges
      .map(
        (badge) =>
          `<option value="${badge.id}">${badge.title} (${badge.description})</option>`
      )
      .join("");

    const content = `
            <form id="level-form">
                <div class="form-group">
                    <label for="level-asset-type">Asset Type:</label>
                    <select id="level-asset-type" name="asset_type_id" required>
                        <option value="">Select asset type</option>
                        ${assetTypeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="level-number">Level Number:</label>
                    <input type="number" id="level-number" name="level_number" min="1" required>
                </div>
                <div class="form-group">
                    <label for="level-name">Level Name:</label>
                    <input type="text" id="level-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="level-points">Required Points:</label>
                    <input type="number" id="level-points" name="required_points" min="0" required>
                </div>
                <div class="form-group">
                    <label for="level-badges">Required Badges (hold Ctrl to select multiple):</label>
                    <select id="level-badges" name="required_badges" multiple>
                        ${badgeOptions}
                    </select>
                    <small class="text-muted">Select badges required to unlock this level</small>
                </div>
            </form>
        `;

    this.showModal("Add New Level", content, () => {
      const form = document.getElementById("level-form");
      const formData = new FormData(form);
      const selectedBadges = Array.from(
        document.getElementById("level-badges").selectedOptions
      ).map((option) => parseInt(option.value));

      if (form.checkValidity()) {
        const newLevel = {
          id: this.getNextId("levels"),
          asset_type_id: parseInt(formData.get("asset_type_id")),
          level_number: parseInt(formData.get("level_number")),
          name: formData.get("name"),
          required_points: parseInt(formData.get("required_points")),
          required_badges: selectedBadges,
          created_at: new Date().toISOString(),
        };

        this.data.levels.push(newLevel);
        this.saveData();
        this.renderLevels();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Level added successfully!", "success");
      }
    });
  }

  editLevel(id) {
    const level = this.data.levels.find((l) => l.id === id);
    if (!level) return;

    const assetTypeOptions = this.data.assetTypes
      .map(
        (at) =>
          `<option value="${at.id}" ${
            at.id === level.asset_type_id ? "selected" : ""
          }>${at.name}</option>`
      )
      .join("");

    const badgeOptions = this.data.badges
      .map((badge) => {
        const isSelected =
          level.required_badges && level.required_badges.includes(badge.id);
        return `<option value="${badge.id}" ${isSelected ? "selected" : ""}>${
          badge.title
        } (${badge.description})</option>`;
      })
      .join("");

    const content = `
            <form id="level-form">
                <div class="form-group">
                    <label for="level-asset-type">Asset Type:</label>
                    <select id="level-asset-type" name="asset_type_id" required>
                        <option value="">Select asset type</option>
                        ${assetTypeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="level-number">Level Number:</label>
                    <input type="number" id="level-number" name="level_number" value="${level.level_number}" min="1" required>
                </div>
                <div class="form-group">
                    <label for="level-name">Level Name:</label>
                    <input type="text" id="level-name" name="name" value="${level.name}" required>
                </div>
                <div class="form-group">
                    <label for="level-points">Required Points:</label>
                    <input type="number" id="level-points" name="required_points" value="${level.required_points}" min="0" required>
                </div>
                <div class="form-group">
                    <label for="level-badges">Required Badges (hold Ctrl to select multiple):</label>
                    <select id="level-badges" name="required_badges" multiple>
                        ${badgeOptions}
                    </select>
                    <small class="text-muted">Select badges required to unlock this level</small>
                </div>
            </form>
        `;

    this.showModal("Edit Level", content, () => {
      const form = document.getElementById("level-form");
      const formData = new FormData(form);
      const selectedBadges = Array.from(
        document.getElementById("level-badges").selectedOptions
      ).map((option) => parseInt(option.value));

      if (form.checkValidity()) {
        level.asset_type_id = parseInt(formData.get("asset_type_id"));
        level.level_number = parseInt(formData.get("level_number"));
        level.name = formData.get("name");
        level.required_points = parseInt(formData.get("required_points"));
        level.required_badges = selectedBadges;

        this.saveData();
        this.renderLevels();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Level updated successfully!", "success");
      }
    });
  }

  deleteLevel(id) {
    if (
      confirm(
        "Are you sure you want to delete this level? This will affect related rewards."
      )
    ) {
      // Update rewards that reference this level
      this.data.rewards.forEach((reward) => {
        if (reward.level_id === id) {
          reward.level_id = null;
        }
      });
      // Remove level
      this.data.levels = this.data.levels.filter((l) => l.id !== id);

      this.saveData();
      this.renderLevels();
      this.renderRewards();
      this.updateDashboard();
      this.showNotification("Level deleted successfully!", "success");
    }
  }

  // Reward CRUD Operations
  showAddRewardModal() {
    const assetTypeOptions = this.data.assetTypes
      .map((at) => `<option value="${at.id}">${at.name}</option>`)
      .join("");

    const levelOptions = this.data.levels
      .map(
        (level) =>
          `<option value="${level.id}">${level.name} (${level.required_points} pts)</option>`
      )
      .join("");

    const badgeOptions = this.data.badges
      .map((badge) => `<option value="${badge.id}">${badge.title}</option>`)
      .join("");

    const scoreOptions = this.data.scores
      .map(
        (score) =>
          `<option value="${score.id}">${score.value_point} points</option>`
      )
      .join("");

    const content = `
            <form id="reward-form">
                <div class="form-group">
                    <label for="reward-asset-type">Asset Type:</label>
                    <select id="reward-asset-type" name="asset_type_id" required>
                        <option value="">Select asset type</option>
                        ${assetTypeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="reward-title">Reward Title:</label>
                    <input type="text" id="reward-title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="requirement-type">Requirement Type:</label>
                    <select id="requirement-type" name="requirement_type" required onchange="toggleRewardRequirements()">
                        <option value="">Select requirement type</option>
                        <option value="all">All Requirements (Level + Score + Badge)</option>
                        <option value="any">Any Requirement (Level OR Score OR Badge)</option>
                        <option value="level_only">Level Only</option>
                        <option value="score_only">Score Only</option>
                        <option value="badge_only">Badge Only</option>
                    </select>
                </div>
                <div class="form-group" id="level-requirement">
                    <label for="reward-level">Required Level:</label>
                    <select id="reward-level" name="level_id">
                        <option value="">Select level</option>
                        ${levelOptions}
                    </select>
                </div>
                <div class="form-group" id="score-requirement">
                    <label for="reward-score">Required Score:</label>
                    <select id="reward-score" name="score_id">
                        <option value="">Select score</option>
                        ${scoreOptions}
                    </select>
                </div>
                <div class="form-group" id="badge-requirement">
                    <label for="reward-badge">Required Badge:</label>
                    <select id="reward-badge" name="badge_id">
                        <option value="">Select badge</option>
                        ${badgeOptions}
                    </select>
                </div>
            </form>
        `;

    this.showModal("Add New Reward", content, () => {
      const form = document.getElementById("reward-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        const newReward = {
          id: this.getNextId("rewards"),
          asset_type_id: parseInt(formData.get("asset_type_id")),
          title: formData.get("title"),
          level_id: parseInt(formData.get("level_id")) || null,
          score_id: parseInt(formData.get("score_id")) || null,
          badge_id: parseInt(formData.get("badge_id")) || null,
          requirement_type: formData.get("requirement_type"),
          created_at: new Date().toISOString(),
        };

        this.data.rewards.push(newReward);
        this.saveData();
        this.renderRewards();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Reward added successfully!", "success");
      }
    });
  }

  toggleRewardRequirements() {
    const requirementType = document.getElementById("requirement-type").value;
    const levelReq = document.getElementById("level-requirement");
    const scoreReq = document.getElementById("score-requirement");
    const badgeReq = document.getElementById("badge-requirement");

    // Show/hide requirements based on type
    switch (requirementType) {
      case "level_only":
        levelReq.style.display = "block";
        scoreReq.style.display = "none";
        badgeReq.style.display = "none";
        break;
      case "score_only":
        levelReq.style.display = "none";
        scoreReq.style.display = "block";
        badgeReq.style.display = "none";
        break;
      case "badge_only":
        levelReq.style.display = "none";
        scoreReq.style.display = "none";
        badgeReq.style.display = "block";
        break;
      case "all":
      case "any":
        levelReq.style.display = "block";
        scoreReq.style.display = "block";
        badgeReq.style.display = "block";
        break;
      default:
        levelReq.style.display = "block";
        scoreReq.style.display = "block";
        badgeReq.style.display = "block";
    }
  }

  editReward(id) {
    const reward = this.data.rewards.find((r) => r.id === id);
    if (!reward) return;

    const assetTypeOptions = this.data.assetTypes
      .map(
        (at) =>
          `<option value="${at.id}" ${
            at.id === reward.asset_type_id ? "selected" : ""
          }>${at.name}</option>`
      )
      .join("");

    const levelOptions = this.data.levels
      .map(
        (level) =>
          `<option value="${level.id}" ${
            level.id === reward.level_id ? "selected" : ""
          }>${level.name} (${level.required_points} pts)</option>`
      )
      .join("");

    const badgeOptions = this.data.badges
      .map(
        (badge) =>
          `<option value="${badge.id}" ${
            badge.id === reward.badge_id ? "selected" : ""
          }>${badge.title}</option>`
      )
      .join("");

    const scoreOptions = this.data.scores
      .map(
        (score) =>
          `<option value="${score.id}" ${
            score.id === reward.score_id ? "selected" : ""
          }>${score.value_point} points</option>`
      )
      .join("");

    const content = `
            <form id="reward-form">
                <div class="form-group">
                    <label for="reward-asset-type">Asset Type:</label>
                    <select id="reward-asset-type" name="asset_type_id" required>
                        <option value="">Select asset type</option>
                        ${assetTypeOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="reward-title">Reward Title:</label>
                    <input type="text" id="reward-title" name="title" value="${
                      reward.title
                    }" required>
                </div>
                <div class="form-group">
                    <label for="requirement-type">Requirement Type:</label>
                    <select id="requirement-type" name="requirement_type" required onchange="toggleRewardRequirements()">
                        <option value="">Select requirement type</option>
                        <option value="all" ${
                          reward.requirement_type === "all" ? "selected" : ""
                        }>All Requirements (Level + Score + Badge)</option>
                        <option value="any" ${
                          reward.requirement_type === "any" ? "selected" : ""
                        }>Any Requirement (Level OR Score OR Badge)</option>
                        <option value="level_only" ${
                          reward.requirement_type === "level_only"
                            ? "selected"
                            : ""
                        }>Level Only</option>
                        <option value="score_only" ${
                          reward.requirement_type === "score_only"
                            ? "selected"
                            : ""
                        }>Score Only</option>
                        <option value="badge_only" ${
                          reward.requirement_type === "badge_only"
                            ? "selected"
                            : ""
                        }>Badge Only</option>
                    </select>
                </div>
                <div class="form-group" id="level-requirement">
                    <label for="reward-level">Required Level:</label>
                    <select id="reward-level" name="level_id">
                        <option value="">Select level</option>
                        ${levelOptions}
                    </select>
                </div>
                <div class="form-group" id="score-requirement">
                    <label for="reward-score">Required Score:</label>
                    <select id="reward-score" name="score_id">
                        <option value="">Select score</option>
                        ${scoreOptions}
                    </select>
                </div>
                <div class="form-group" id="badge-requirement">
                    <label for="reward-badge">Required Badge:</label>
                    <select id="reward-badge" name="badge_id">
                        <option value="">Select badge</option>
                        ${badgeOptions}
                    </select>
                </div>
            </form>
        `;

    this.showModal("Edit Reward", content, () => {
      const form = document.getElementById("reward-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        reward.asset_type_id = parseInt(formData.get("asset_type_id"));
        reward.title = formData.get("title");
        reward.level_id = parseInt(formData.get("level_id")) || null;
        reward.score_id = parseInt(formData.get("score_id")) || null;
        reward.badge_id = parseInt(formData.get("badge_id")) || null;
        reward.requirement_type = formData.get("requirement_type");

        this.saveData();
        this.renderRewards();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Reward updated successfully!", "success");
      }
    });

    // Set initial visibility based on current requirement type
    setTimeout(() => {
      this.toggleRewardRequirements();
    }, 100);
  }

  deleteReward(id) {
    if (confirm("Are you sure you want to delete this reward?")) {
      this.data.rewards = this.data.rewards.filter((r) => r.id !== id);

      this.saveData();
      this.renderRewards();
      this.updateDashboard();
      this.showNotification("Reward deleted successfully!", "success");
    }
  }

  // Asset Type CRUD Operations
  showAddAssetTypeModal() {
    const content = `
            <form id="asset-type-form">
                <div class="form-group">
                    <label for="asset-type-name">Asset Type Name:</label>
                    <input type="text" id="asset-type-name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="asset-type-description">Description:</label>
                    <textarea id="asset-type-description" name="description" required></textarea>
                </div>
            </form>
        `;

    this.showModal("Add New Asset Type", content, () => {
      const form = document.getElementById("asset-type-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        const newAssetType = {
          id: this.getNextId("assetTypes"),
          name: formData.get("name"),
          description: formData.get("description"),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        this.data.assetTypes.push(newAssetType);
        this.saveData();
        this.renderAssetTypes();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Asset Type added successfully!", "success");
      }
    });
  }

  editAssetType(id) {
    const assetType = this.data.assetTypes.find((at) => at.id === id);
    if (!assetType) return;

    const content = `
            <form id="asset-type-form">
                <div class="form-group">
                    <label for="asset-type-name">Asset Type Name:</label>
                    <input type="text" id="asset-type-name" name="name" value="${assetType.name}" required>
                </div>
                <div class="form-group">
                    <label for="asset-type-description">Description:</label>
                    <textarea id="asset-type-description" name="description" required>${assetType.description}</textarea>
                </div>
            </form>
        `;

    this.showModal("Edit Asset Type", content, () => {
      const form = document.getElementById("asset-type-form");
      const formData = new FormData(form);

      if (form.checkValidity()) {
        assetType.name = formData.get("name");
        assetType.description = formData.get("description");
        assetType.updated_at = new Date().toISOString();

        this.saveData();
        this.renderAssetTypes();
        this.updateDashboard();
        this.closeModal();
        this.showNotification("Asset Type updated successfully!", "success");
      }
    });
  }

  deleteAssetType(id) {
    if (
      confirm(
        "Are you sure you want to delete this asset type? This will affect all related levels, badges, scores, and rewards."
      )
    ) {
      // Remove related data
      this.data.levels = this.data.levels.filter((l) => l.asset_type_id !== id);
      this.data.badges = this.data.badges.filter((b) => b.asset_type_id !== id);
      this.data.scores = this.data.scores.filter((s) => s.asset_type_id !== id);
      this.data.rewards = this.data.rewards.filter(
        (r) => r.asset_type_id !== id
      );
      // Remove asset type
      this.data.assetTypes = this.data.assetTypes.filter((at) => at.id !== id);

      this.saveData();
      this.renderAssetTypes();
      this.renderLevels();
      this.renderBadges();
      this.renderRewards();
      this.updateDashboard();
      this.showNotification("Asset Type deleted successfully!", "success");
    }
  }

  // Task Assignment Functions
  showTaskAssignment(familyId) {
    const family = this.data.families.find((f) => f.id === familyId);
    if (!family) return;

    const availableTasks = this.data.tasks.filter((task) => {
      const existingAssignment = this.data.familyTasks.find(
        (ft) => ft.family_id === familyId && ft.task_id === task.id
      );
      return !existingAssignment;
    });

    if (availableTasks.length === 0) {
      this.showNotification(
        "No available tasks to assign to this family.",
        "warning"
      );
      return;
    }

    // Populate family and task options
    document.getElementById("assignment-family").innerHTML = `
            <option value="${family.id}" selected>${family.name}</option>
        `;

    document.getElementById("assignment-task").innerHTML = `
            <option value="">Select a task</option>
            ${availableTasks
              .map(
                (task) => `<option value="${task.id}">${task.title}</option>`
              )
              .join("")}
        `;

    document.getElementById("task-assignment-modal").classList.add("active");
  }

  closeTaskAssignmentModal() {
    document.getElementById("task-assignment-modal").classList.remove("active");
  }

  assignTask() {
    const form = document.getElementById("task-assignment-form");
    const formData = new FormData(form);

    const familyId = parseInt(formData.get("family_id"));
    const taskId = parseInt(formData.get("task_id"));

    if (!familyId || !taskId) {
      this.showNotification("Please select both family and task.", "error");
      return;
    }

    // Check if assignment already exists
    const existingAssignment = this.data.familyTasks.find(
      (ft) => ft.family_id === familyId && ft.task_id === taskId
    );

    if (existingAssignment) {
      this.showNotification(
        "This task is already assigned to this family.",
        "error"
      );
      return;
    }

    const newFamilyTask = {
      id: this.getNextId("familyTasks"),
      family_id: familyId,
      task_id: taskId,
      is_completed: false,
      completed_at: null,
      assets_earned: 0,
    };

    this.data.familyTasks.push(newFamilyTask);
    this.saveData();
    this.renderFamilies();
    this.updateDashboard();
    this.closeTaskAssignmentModal();
    this.showNotification("Task assigned successfully!", "success");
  }

  // Utility Functions
  getNextId(entityType) {
    const entities = this.data[entityType];
    return entities.length > 0 ? Math.max(...entities.map((e) => e.id)) + 1 : 1;
  }

  getCurrentLevel(score, earnedBadges, assetTypeId) {
    const levels = this.data.levels
      .filter((l) => l.asset_type_id === assetTypeId)
      .sort((a, b) => a.required_points - b.required_points);

    let currentLevel = null;
    for (const level of levels) {
      if (this.checkLevelRequirements(score, earnedBadges, level)) {
        currentLevel = level;
      }
    }

    return currentLevel;
  }

  checkLevelRequirements(score, earnedBadges, level) {
    // Check point requirement
    if (score < level.required_points) {
      return false;
    }

    // Check badge requirements
    if (level.required_badges && level.required_badges.length > 0) {
      const hasAllBadges = level.required_badges.every((badgeId) =>
        earnedBadges.includes(badgeId)
      );
      if (!hasAllBadges) {
        return false;
      }
    }

    return true;
  }

  getRequirementText(reward) {
    switch (reward.requirement_type) {
      case "all":
        return "All requirements must be met";
      case "any":
        return "Any one requirement is enough";
      case "level_only":
        return "Level requirement only";
      case "score_only":
        return "Score requirement only";
      case "badge_only":
        return "Badge requirement only";
      default:
        return "All requirements must be met";
    }
  }

  formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Notification System
  showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    const messageElement = document.getElementById("notification-message");

    messageElement.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 4000);
  }

  closeNotification() {
    document.getElementById("notification").classList.remove("show");
  }

  // Refresh Data
  refreshData() {
    this.calculateFamilyScores();
    this.updateFamilyBadges();
    this.updateDashboard();
    this.renderSection(this.currentSection);
    this.showNotification("Data refreshed successfully!", "success");
  }

  updateDashboard() {
    if (this.currentSection === "dashboard") {
      this.renderDashboard();
    }
  }
}

// Global Functions (for onclick handlers)
function showAddFamilyModal() {
  dashboard.showAddFamilyModal();
}

function showAddTaskModal() {
  dashboard.showAddTaskModal();
}

function showAddBadgeModal() {
  dashboard.showAddBadgeModal();
}

function showAddScoreModal() {
  dashboard.showAddScoreModal();
}

function showAddLevelModal() {
  dashboard.showAddLevelModal();
}

function showAddRewardModal() {
  dashboard.showAddRewardModal();
}

function showAddAssetTypeModal() {
  dashboard.showAddAssetTypeModal();
}

function closeModal() {
  dashboard.closeModal();
}

function closeTaskAssignmentModal() {
  dashboard.closeTaskAssignmentModal();
}

function assignTask() {
  dashboard.assignTask();
}

function closeNotification() {
  dashboard.closeNotification();
}

function refreshData() {
  dashboard.refreshData();
}

function toggleRewardRequirements() {
  if (window.dashboard) {
    window.dashboard.toggleRewardRequirements();
  }
}

// Initialize Dashboard
const dashboard = new FamilyTaskDashboard();
window.dashboard = dashboard; // Make it globally available

// Export for potential use in modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = FamilyTaskDashboard;
}
